import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden premium-shadow border border-slate-100 group cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={listing.images?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary-700 uppercase tracking-wider">
                    {listing.category}
                </div>
                <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.location?.city || 'Tamil Nadu'}</span>
                </div>

                <h3 className="text-xl font-outfit font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {listing.title}
                </h3>

                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.floor(listing.duration / 60)}h {listing.duration % 60}m</span>
                    </div>
                    <div className="px-2 py-0.5 bg-slate-100 rounded text-xs capitalize">
                        {listing.difficulty}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                        <span className="text-2xl font-black text-slate-900">₹{listing.price}</span>
                        <span className="text-slate-400 text-xs ml-1">/ person</span>
                    </div>
                    <Link
                        to={`/listings/${listing._id}`}
                        className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"
                    >
                        <Star className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ListingCard;
