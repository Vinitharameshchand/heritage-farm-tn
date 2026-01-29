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
  Minus,
  Plus,
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
              navigate("/my-bookings");
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
          color: "#46041F",
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
      <div className="fixed inset-0 z-50 bg-[#46041F]/90 backdrop-blur-md overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#46041F] rounded-[2.5rem] border border-[#FFD595]/20 shadow-2xl shadow-black/50"
          >
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-[#FFD595]/20 rounded-full flex items-center justify-center mb-8"
              >
                <CheckCircle className="w-12 h-12 text-[#FFD595]" />
              </motion.div>
              <h3 className="text-4xl jaro font-black mb-4 text-[#FFD595] italic">Secured!</h3>
              <p className="text-white/70 text-lg font-medium leading-relaxed mb-4">
                Your journey at{" "}
                <span className="text-[#FFD595] font-bold">{listing.title}</span> has
                been successfully confirmed.
              </p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
                Redirecting to your bookings...
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center p-8 border-b border-[#FFD595]/10">
                <h3 className="text-3xl jaro font-black text-[#FFD595] italic tracking-tight">Reserve Arc</h3>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-[#FFD595]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Authentication Warning */}
                {!user && (
                  <div className="p-5 bg-[#FFD595]/10 border border-[#FFD595]/30 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#FFD595]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-[#FFD595]" />
                    </div>
                    <div>
                      <p className="font-black text-[#FFD595] uppercase text-xs tracking-widest mb-1">Authentication Required</p>
                      <p className="text-white/60 text-sm">
                        You need to login before booking.{" "}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            navigate("/login");
                          }}
                          className="underline font-bold text-[#FFD595] hover:text-white transition-colors"
                        >
                          Click here to login
                        </button>
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3">
                    <X className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm font-bold">{error}</p>
                  </div>
                )}

                {/* Listing Info Card */}
                <div className="p-5 bg-[#FFD595]/10 rounded-2xl border border-[#FFD595]/20">
                  <p className="text-[10px] text-[#FFD595]/60 font-black uppercase tracking-widest mb-2">
                    Listing
                  </p>
                  <p className="font-bold text-white text-lg mb-1">{listing.title}</p>
                  <p className="text-[#FFD595] font-black text-xl">
                    ₹{listing.price} <span className="text-sm font-medium text-white/50">/ person / day</span>
                  </p>
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FFD595]/60 font-black uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white/5 border border-[#FFD595]/20 rounded-xl px-4 py-3 outline-none focus:border-[#FFD595]/50 transition-colors text-white placeholder-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#FFD595]/60 font-black uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white/5 border border-[#FFD595]/20 rounded-xl px-4 py-3 outline-none focus:border-[#FFD595]/50 transition-colors text-white placeholder-white/30"
                    />
                  </div>
                </div>

                {/* Guest Counter */}
                <div className="space-y-3">
                  <label className="text-[10px] text-[#FFD595]/60 font-black uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3 h-3" /> Number of Guests
                  </label>
                  <div className="flex items-center justify-between bg-white/5 border border-[#FFD595]/20 rounded-xl p-2">
                    <button
                      type="button"
                      onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                      className="w-12 h-12 rounded-xl bg-[#FFD595]/10 hover:bg-[#FFD595]/20 text-[#FFD595] flex items-center justify-center transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-3xl font-black text-white jaro">
                      {numGuests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNumGuests(Math.min(10, numGuests + 1))}
                      className="w-12 h-12 rounded-xl bg-[#FFD595]/10 hover:bg-[#FFD595]/20 text-[#FFD595] flex items-center justify-center transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-6 border-t border-[#FFD595]/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/50 font-bold uppercase text-xs tracking-widest">Total Price</span>
                    <span className="text-4xl font-black text-[#FFD595] jaro">
                      ₹{calculateTotal()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-5 bg-[#FFD595] text-[#46041F] rounded-full font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-[#46041F]/30 border-t-[#46041F] rounded-full"
                      />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Confirm & Pay
                      </>
                    )}
                  </button>

                  {/* Razorpay Badge */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#FFD595]" />
                    Secured by Razorpay
                  </div>
                </div>
              </form>
            </>
          )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
