import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-[32px] overflow-hidden group hover:-translate-y-2 transition-all duration-500"
        >
            <Link to={`/listings/${listing._id}`}>
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={listing.images?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 font-outfit"
                    />
                    <div className="absolute top-4 left-4 right-4 px-4 py-1.5 bg-emerald-600/90 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] truncate text-center">
                        {listing.categoryDisplay || listing.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="flex items-center gap-2 text-emerald-400/60 text-xs font-bold uppercase tracking-wider mb-3 overflow-hidden">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{listing.location?.city || 'Tamil Nadu'}</span>
                    </div>

                    <h3 className="text-2xl font-outfit font-bold mb-4 group-hover:text-emerald-400 transition-colors leading-tight min-h-[3.5rem] line-clamp-2">
                        {listing.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-8 text-sm text-slate-400 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            <span className="whitespace-nowrap">{Math.floor(listing.duration / 60)}h {listing.duration % 60}m</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-700 flex-shrink-0" />
                        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold tracking-wider truncate max-w-[120px]">
                            {listing.difficulty}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="overflow-hidden flex-1 pr-4">
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 truncate">Starting from</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white font-outfit truncate">₹{listing.price}</span>
                                <span className="text-slate-500 text-xs whitespace-nowrap flex-shrink-0">/ person</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-500 flex-shrink-0">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ListingCard;

