import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import { Search, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

const Discover = () => {
    const { t } = useTranslation();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: 'all',
        duration: 'all',
        rating: 'all'
    });

    const categories = ['All', 'AgriRural', 'HeritageCulture', 'EcoAdventure'];

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchListings();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [activeCategory, searchTerm, i18n.language]); // Add i18n.language dependency

    const fetchListings = async () => {
        try {
            setLoading(true);
            const params = {};
            if (activeCategory !== 'All') params.category = activeCategory;
            if (searchTerm) params.search = searchTerm;
            params.lang = i18n.language; // Add language parameter

            const response = await api.get('/listings', { params });
            setListings(response.data.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-outfit font-black mb-4">{t('discover_experiences').split(' ')[0]} <span className="gradient-text">{t('discover_experiences').split(' ').slice(1).join(' ')}</span></h1>
                    <p className="text-slate-500">{t('discover_description')}</p>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-[24px] opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500"></div>
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5 pointer-events-none z-10 transition-colors" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="relative w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-[24px] border-2 border-white/20 shadow-xl shadow-black/10 focus:outline-none focus:border-emerald-500 focus:bg-white/15 focus:shadow-2xl focus:shadow-emerald-500/30 transition-all duration-300 placeholder:text-white/50 placeholder:font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${activeCategory === cat
                            ? 'bg-primary-600 text-white premium-shadow'
                            : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                            }`}
                    >
                        {cat === 'All' ? t('all_experiences') : t(cat === 'AgriRural' ? 'agri_rural' : cat === 'HeritageCulture' ? 'heritage_culture' : 'eco_adventure')}
                    </button>
                ))}

                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ml-auto ${showFilters 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                        : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    {t('filters')}
                </button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-10 overflow-hidden"
                    >
                        <div className="glass p-8 rounded-[32px] border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-white">{t('filters')}</h3>
                                <button 
                                    onClick={() => {
                                        setFilters({ priceRange: 'all', duration: 'all', rating: 'all' });
                                        setShowFilters(false);
                                    }}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Price Range */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 block">
                                        Price Range
                                    </label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                        className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                                    >
                                        <option value="all" className="bg-slate-900">All Prices</option>
                                        <option value="budget" className="bg-slate-900">Budget (₹0 - ₹1000)</option>
                                        <option value="moderate" className="bg-slate-900">Moderate (₹1000 - ₹3000)</option>
                                        <option value="premium" className="bg-slate-900">Premium (₹3000+)</option>
                                    </select>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 block">
                                        Duration
                                    </label>
                                    <select
                                        value={filters.duration}
                                        onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                                        className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                                    >
                                        <option value="all" className="bg-slate-900">Any Duration</option>
                                        <option value="short" className="bg-slate-900">Short (1-2 hours)</option>
                                        <option value="half" className="bg-slate-900">Half Day (3-5 hours)</option>
                                        <option value="full" className="bg-slate-900">Full Day (6+ hours)</option>
                                    </select>
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 block">
                                        Rating
                                    </label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                        className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                                    >
                                        <option value="all" className="bg-slate-900">All Ratings</option>
                                        <option value="4plus" className="bg-slate-900">4+ Stars</option>
                                        <option value="3plus" className="bg-slate-900">3+ Stars</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => setFilters({ priceRange: 'all', duration: 'all', rating: 'all' })}
                                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-slate-100 rounded-3xl h-[450px] animate-pulse"></div>
                    ))}
                </div>
            ) : listings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map(listing => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('no_experiences_found')}</h3>
                    <p className="text-slate-500">{t('try_adjusting_filters')}</p>
                </div>
            )}
        </div>
    );
};

export default Discover;
