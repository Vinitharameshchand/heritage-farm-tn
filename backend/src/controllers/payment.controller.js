import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

// Lazy initialization of Razorpay
let razorpay = null;
const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// @desc    Create Razorpay Order
// @route   POST /api/payments/order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const options = {
      amount: booking.totalPrice * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `rcpt_${booking._id}`,
      payment_capture: 1,
    };

    const order = await getRazorpay().orders.create(options);

    // Save order ID to booking
    booking.razorpayOrderId = order.id;
    await booking.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });
      }

      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;

      await booking.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Razorpay Subscription Plan (Optional - for recurring bookings)
// @route   POST /api/payments/plan
// @access  Private
export const createSubscriptionPlan = async (req, res) => {
  try {
    const { period, interval, amount } = req.body;

    const plan = await getRazorpay().plans.create({
      period: period || "monthly",
      interval: interval || 1,
      item: {
        name: "Heritage Farm Premium Pass",
        amount: amount * 100, // in paise
        currency: "INR",
        description: "Monthly access to premium experiences",
      },
    });

    res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create Razorpay Subscription
// @route   POST /api/payments/subscription
// @access  Private
export const createSubscription = async (req, res) => {
  try {
    const { planId, totalCount, customerNotify, startAt } = req.body;

    const subscription = await getRazorpay().subscriptions.create({
      plan_id: planId,
      total_count: totalCount || 12,
      customer_notify: customerNotify !== undefined ? customerNotify : 1,
      start_at: startAt,
      notes: {
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      subscription,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Subscription Payment
// @route   POST /api/payments/subscription/verify
// @access  Private
export const verifySubscriptionPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_payment_id + "|" + razorpay_subscription_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      res.status(200).json({
        success: true,
        message: "Subscription payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
