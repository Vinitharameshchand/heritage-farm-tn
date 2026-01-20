import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Calendar, Users, Shield, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const ListingDetail = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/listings/${id}`);
                setListing(response.data.data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-outfit text-2xl animate-pulse">Loading experience...</div>;
    if (!listing) return <div className="min-h-screen flex items-center justify-center">Experience not found.</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <Link
                    to="/discover"
                    className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/20"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="absolute bottom-12 left-12 right-12 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                            {listing.category}
                        </span>
                        <div className="flex items-center gap-1 text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                            <MapPin className="w-3 h-3" />
                            {listing.location?.city}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-outfit font-black text-white mb-4">{listing.title}</h1>
                    <div className="flex items-center gap-6 text-white/90">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-400 fill-current" />
                            <span className="font-bold">{listing.rating}</span>
                            <span className="text-white/60">({listing.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                            <Clock className="w-5 h-5" />
                            <span>{Math.floor(listing.duration / 60)}h {listing.duration % 60}m</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-outfit mb-6">About the Experience</h2>
                        <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                            {listing.description}
                        </p>
                    </section>

                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <Users className="w-6 h-6 text-primary-600 mb-3" />
                            <div className="text-sm text-slate-500 mb-1">Capacity</div>
                            <div className="font-bold">{listing.capacity} people</div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <Shield className="w-6 h-6 text-primary-600 mb-3" />
                            <div className="text-sm text-slate-500 mb-1">Safety</div>
                            <div className="font-bold">Verified</div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <Calendar className="w-6 h-6 text-primary-600 mb-3" />
                            <div className="text-sm text-slate-500 mb-1">Difficulty</div>
                            <div className="font-bold capitalize">{listing.difficulty}</div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <MapPin className="w-6 h-6 text-primary-600 mb-3" />
                            <div className="text-sm text-slate-500 mb-1">Location</div>
                            <div className="font-bold">{listing.location?.district}</div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-outfit mb-6">What's included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(listing.inclusions?.length > 0 ? listing.inclusions : ['Local guide', 'Safety equipment', 'Refreshments']).map((inc, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-primary-600" />
                                    {inc}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 bg-white rounded-[40px] p-8 premium-shadow border border-slate-100">
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-4xl font-black text-slate-900">₹{listing.price}</span>
                            <span className="text-slate-400">/ person</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <button className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
                                Book Experience
                            </button>
                            <button className="w-full h-14 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                                Add to Itinerary
                            </button>
                        </div>

                        <div className="text-center text-xs text-slate-400">
                            Free cancellation up to 24 hours before
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;
