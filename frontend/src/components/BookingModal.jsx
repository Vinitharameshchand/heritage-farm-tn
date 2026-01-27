import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const BookingModal = ({ isOpen, onClose, listing, onConfirm }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays * listing.price * numGuests;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to book this listing");
      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 2000);
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // 1. Load Razorpay Script
      const res = await loadRazorpay();
      if (!res) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // 2. Create Initial Booking (Status: pending)
      const bookingResponse = await onConfirm({
        listingId: listing._id,
        startDate,
        endDate,
        numGuests,
        totalPrice: calculateTotal(),
      });

      const bookingId = bookingResponse.data._id;

      // 3. Create Razorpay Order
      const { data: orderData } = await api.post("/payments/order", {
        bookingId,
      });
      const order = orderData.order;

      // 4. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Heritage Farm",
        description: `Booking for ${listing.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            setIsProcessing(true);
            // 5. Verify Payment
            await api.post("/payments/verify", {
              ...response,
              bookingId,
            });
            setIsSuccess(true);
            setTimeout(() => {
              onClose();
              setIsSuccess(false);
            }, 2500);
          } catch (err) {
            setError("Payment verification failed. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#10b981",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Payment initiation failed.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        >
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </motion.div>
              <h3 className="text-3xl font-outfit font-black mb-4">Secured!</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Your journey at{" "}
                <span className="text-emerald-400">{listing.title}</span> has
                been successfully indexed.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-8 border-b border-white/5">
                <h3 className="text-2xl font-outfit font-black">Reserve Arc</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-all text-slate-500 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {!user && (
                  <div className="p-5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl text-sm font-medium flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold mb-1">Authentication Required</p>
                      <p className="text-xs opacity-90">
                        You need to login before booking.{" "}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            navigate("/login");
                          }}
                          className="underline font-bold hover:text-amber-300"
                        >
                          Click here to login
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {error}
                  </div>
                )}
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <p className="text-sm text-emerald-400 font-medium">
                    Listing
                  </p>
                  <p className="font-semibold">{listing.title}</p>
                  <p className="text-sm text-slate-400">
                    ₹{listing.price} / person / day
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-3 py-2 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-800 border border-white/5 rounded-xl px-3 py-2 outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Number of Guests
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={numGuests}
                      onChange={(e) => setNumGuests(parseInt(e.target.value))}
                      className="flex-1 accent-emerald-500"
                    />
                    <span className="w-8 text-center font-bold">
                      {numGuests}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400">Total Price</span>
                    <span className="text-2xl font-bold text-emerald-500">
                      ₹{calculateTotal()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Confirm & Pay
                      </>
                    )}
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Secured by Razorpay
                  </div>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
