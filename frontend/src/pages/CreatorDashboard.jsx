import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    TrendingUp,
    Users,
    Star,
    Eye,
    Edit,
    Trash2,
    MapPin,
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const CreatorDashboard = () => {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalViews: '1.2k',
        activeBookings: '12',
        totalRevenue: '₹45,000',
        avgRating: '4.9'
    });

    useEffect(() => {
        fetchCreatorListings();
    }, []);

    const fetchCreatorListings = async () => {
        try {
            setLoading(true);
            // Assuming we have an endpoint for current creator listings or we filter by creator id
            const response = await api.get(`/listings?creator=${user?._id}`);
            setListings(response.data.data);
        } catch (error) {
            console.error('Error fetching creator listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await api.delete(`/listings/${id}`);
                setListings(listings.filter(l => l._id !== id));
            } catch (error) {
                console.error('Error deleting listing:', error);
            }
        }
    };

    const StatCard = ({ icon: Icon, label, value, trend }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-3xl border border-white/10 shadow-xl"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    <Icon className="w-6 h-6 text-emerald-500" />
                </div>
                {trend && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {trend}
                    </span>
                )}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
            <p className="text-2xl font-outfit font-black">{value}</p>
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-outfit font-black mb-2">Hello, <span className="gradient-text">{user?.name}</span></h1>
                    <p className="text-slate-500">Welcome to your creator console. Here's your performance snapshot.</p>
                </div>
                <Link
                    to="/creator/create"
                    className="btn-primary flex items-center gap-2 py-3 px-8 shadow-emerald-500/20 shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Create New Experience
                </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={Users} label="Active Bookings" value={stats.activeBookings} trend="+15%" />
                <StatCard icon={TrendingUp} label="Total Revenue" value={stats.totalRevenue} trend="+22%" />
                <StatCard icon={Eye} label="Experience Views" value={stats.totalViews} />
                <StatCard icon={Star} label="Average Rating" value={stats.avgRating} />
            </div>

            {/* Listings Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-outfit font-black">Your <span className="text-emerald-500">Experiences</span></h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Filter experiences..."
                            className="pl-10 pr-4 py-2.5 bg-slate-900 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 glass rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : listings.length > 0 ? (
                    <div className="grid gap-6">
                        {listings.map(listing => (
                            <motion.div
                                key={listing._id}
                                layout
                                className="glass p-4 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-6 hover:border-emerald-500/20 transition-all group"
                            >
                                <div className="w-full md:w-32 h-24 rounded-2xl overflow-hidden shadow-2xl relative">
                                    <img
                                        src={listing.images?.[0] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400'}
                                        alt={listing.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 bg-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                        {listing.category}
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-bold mb-1">{listing.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {listing.location?.city}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 2h duration</span>
                                        <span className="text-emerald-500 font-bold font-mono">₹{listing.price}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Link
                                        to={`/listings/${listing._id}`}
                                        className="flex-1 md:flex-none p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group/btn"
                                        title="View Details"
                                    >
                                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to={`/creator/edit/${listing._id}`}
                                        className="flex-1 md:flex-none p-3 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-2xl transition-all"
                                        title="Edit Listing"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(listing._id)}
                                        className="flex-1 md:flex-none p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all"
                                        title="Delete Listing"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="glass py-20 rounded-[40px] text-center border border-white/5 border-dashed">
                        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No experiences yet</h3>
                        <p className="text-slate-500 mb-8 max-w-xs mx-auto">Start sharing your culture and farm stories with the world today.</p>
                        <Link to="/creator/create" className="btn-secondary px-8 py-3">Create First Experience</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatorDashboard;
