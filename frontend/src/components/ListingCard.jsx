import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SafetyBadgesMini } from "./SafetyBadges";

const ListingCard = ({ listing }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-xl border border-[#FFD595]/20 rounded-[32px] overflow-hidden group hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FFD595]/20 transition-all duration-500"
    >
      <Link to={`/listings/${listing._id}`}>
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={
              listing.images?.[0] ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
            }
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FFD595]/90 backdrop-blur-sm text-[#46041F] text-sm font-bold rounded-full">
            {listing.categoryDisplay || listing.category}
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/40 backdrop-blur-sm text-white text-sm font-bold rounded-full">
              <Star className="w-3.5 h-3.5 text-[#FFD595] fill-current" />
              {listing.rating || "4.8"}
            </div>
          </div>

          {/* Safety Badges */}
          <div className="absolute bottom-4 left-4">
            <SafetyBadgesMini
              womenFriendly={listing.womenFriendly}
              verified={listing.verified !== false}
              insured={listing.insured}
              firstAid={listing.firstAid}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#46041F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{listing.location?.city || "Tamil Nadu"}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FFD595] transition-colors leading-tight min-h-[3rem] line-clamp-2">
            {listing.title}
          </h3>

          <div className="flex items-center gap-4 mb-6 text-sm text-white/60 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FFD595]" />
              <span>
                {Math.floor(listing.duration / 60)}h {listing.duration % 60}m
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">
              {listing.difficulty}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex-1">
              <div className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">
                Starting from
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#FFD595]">
                  ₹{listing.price}
                </span>
                <span className="text-white/70 text-sm">/ person</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FFD595] hover:bg-[#FFD595]/80 text-[#46041F] flex items-center justify-center transition-all duration-500">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
