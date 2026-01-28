import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Calendar, Users, Shield, ArrowLeft, Box, Sparkles } from 'lucide-react';
import api from '../services/api';
import BookingModal from '../components/BookingModal';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const ListingDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/listings/${id}?lang=${i18n.language}`);
                setListing(response.data.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, i18n.language]); // Add i18n.language dependency

    const handleBookingConfirm = async (bookingData) => {
        try {
            const response = await api.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            console.error('Booking failed:', error);
            throw error;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-outfit text-2xl text-emerald-500 animate-pulse bg-slate-950">{t('loading_experience')}</div>;
    if (!listing) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">{t('experience_not_found')}</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Header */}
            <div className="relative h-[70vh] overflow-hidden">
                <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600'}
                    alt={listing.title}
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <Link
                    to="/discover"
                    className="absolute top-8 left-8 p-3 glass rounded-full text-white hover:bg-white/20 transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                                {listing.categoryDisplay || listing.category}
                            </span>
                            <div className="flex items-center gap-1.5 glass px-4 py-1.5 rounded-full text-xs">
                                <MapPin className="w-4 h-4 text-emerald-400" />
                                {listing.location?.city}
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-outfit font-black mb-4 leading-tight">{listing.title}</h1>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Star className="w-6 h-6 text-amber-400 fill-current" />
                                <span className="font-bold text-xl">{listing.rating}</span>
                                <span className="text-white/60">({listing.reviewCount} {t('reviews')})</span>
                            </div>
                            <div className="hidden md:block h-8 w-px bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Clock className="w-6 h-6 text-emerald-400" />
                                <span className="text-xl">{Math.floor(listing.duration / 60)}h {listing.duration % 60}m</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <h2 className="text-4xl font-outfit font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                            {t('about_experience')}
                        </h2>
                        <p className="text-slate-400 text-xl leading-relaxed whitespace-pre-line">
                            {listing.description}
                        </p>
                    </section>

                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Users, label: t('capacity'), value: `${listing.capacity} ${t('people')}` },
                            { icon: Shield, label: t('safety'), value: t('verified') },
                            { icon: Calendar, label: t('difficulty'), value: listing.difficulty },
                            { icon: MapPin, label: t('location'), value: listing.location?.district }
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card p-8 rounded-[32px] group">
                                <item.icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-sm text-slate-500 mb-1">{item.label}</div>
                                <div className="font-bold text-lg capitalize">{item.value}</div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-3xl font-outfit font-bold mb-8">{t('whats_included')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(listing.inclusions?.length > 0 ? listing.inclusions : [t('local_guide'), t('safety_equipment'), t('refreshments')]).map((inc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                                >
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-slate-300 font-medium">{inc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 glass-card rounded-[48px] p-10 border-emerald-500/10">
                        <div className="flex items-baseline gap-2 mb-10">
                            <span className="text-5xl font-black text-emerald-500 font-outfit">₹{listing.price}</span>
                            <span className="text-slate-400 text-lg">{t('per_person')}</span>
                        </div>

                        <div className="space-y-4 mb-10">
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="w-full h-16 btn-primary text-lg"
                            >
                                {t('book_experience')}
                            </button>
                            <button className="w-full h-16 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-all border border-white/5">
                                {t('add_to_journey')}
                            </button>
                            {listing.hasAR && (
                                <Link
                                    to={`/heritage-vision/${id}`}
                                    className="w-full h-16 bg-emerald-500/10 text-emerald-500 rounded-full font-bold hover:bg-emerald-500/20 transition-all border border-emerald-500/20 flex items-center justify-center gap-3"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    {t('enter_heritage_vision')}
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-emerald-400/60 font-medium">
                            <Shield className="w-4 h-4" />
                            {t('secure_booking')}
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                listing={listing}
                onConfirm={handleBookingConfirm}
            />
        </div>
    );
};

export default ListingDetail;

