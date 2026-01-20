import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

const Discover = () => {
    const { t } = useTranslation();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'AgriRural', 'HeritageCulture', 'EcoAdventure'];

    useEffect(() => {
        fetchListings();
    }, [activeCategory]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const categoryParam = activeCategory !== 'All' ? `?category=${activeCategory}` : '';
            const response = await api.get(`/listings${categoryParam}`);
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
                    <h1 className="text-5xl font-outfit font-black mb-4">Discover <span className="gradient-text">Experiences</span></h1>
                    <p className="text-slate-500">Explore authentic Tamil Nadu through our curated local experiences.</p>
                </div>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search activities, locations..."
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 premium-shadow focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
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
                        {cat === 'All' ? 'All Experiences' : t(cat.toLowerCase().replace('rural', '_rural').replace('culture', '_culture').replace('adventure', '_adventure'))}
                    </button>
                ))}

                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

                <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-100 rounded-full font-bold text-slate-600 hover:bg-slate-50 transition-all ml-auto">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>
            </div>

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
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No experiences found</h3>
                    <p className="text-slate-500">Try adjusting your filters or searching for something else.</p>
                </div>
            )}
        </div>
    );
};

export default Discover;
