import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    TrendingUp,
    Users,
    Star,
    Eye,
    Edit3, // Changed from Edit to Edit3
    Trash2,
    MapPin,
    Calendar,
    ChevronRight,
    Search,
    LayoutDashboard, // Added
    ShieldCheck // Added
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import KYCForm from '../components/KYCForm'; // Added

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
    // StatCard component is removed as the new stats grid is inline

            return (
            <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            </div>
                )}
        </div>
        </div >
    );
};

export default CreatorDashboard;
