import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, listing, onConfirm }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numGuests, setNumGuests] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        return diffDays * listing.price * numGuests;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            onConfirm({
                listingId: listing._id,
                startDate,
                endDate,
                numGuests,
                totalPrice: calculateTotal()
            });
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
            }, 2000);
        }, 1500);
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
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-emerald-500" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                            <p className="text-slate-400">Your experience at {listing.title} has been booked.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <h3 className="text-xl font-bold">Book Experience</h3>
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                    <p className="text-sm text-emerald-400 font-medium">Listing</p>
                                    <p className="font-semibold">{listing.title}</p>
                                    <p className="text-sm text-slate-400">₹{listing.price} / person / day</p>
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
                                        <span className="w-8 text-center font-bold">{numGuests}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-slate-400">Total Price</span>
                                        <span className="text-2xl font-bold text-emerald-500">₹{calculateTotal()}</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                                    >
                                        {isProcessing ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5" />
                                                Confirm & Pay
                                            </>
                                        )}
                                    </button>
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
