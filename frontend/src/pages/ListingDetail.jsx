import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  Users,
  Shield,
  ArrowLeft,
  Sparkles,
  User,
  BadgeCheck,
  Heart,
  Share2,
  Info,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";
import BookingModal from "../components/BookingModal";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config";
import {
  SafetyBadges,
  SafetyScore,
  HostVerificationBadge,
} from "../components/SafetyBadges";
import WeatherWidget from "../components/WeatherWidget";
import NearbyEmergency from "../components/NearbyEmergency";

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
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, i18n.language]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#46041F]">
        <div className="w-16 h-16 border-4 border-[#FFD595]/20 border-t-[#FFD595] rounded-full animate-spin mb-4" />
        <span className="jaro text-[#FFD595] text-2xl tracking-widest animate-pulse">
          Arriving...
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#46041F] text-white font-sans">
      {/* 1. Cinematic Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={listing.images?.[0] || "/api/placeholder/1200/800"}
          className="w-full h-full object-cover opacity-60"
          alt={listing.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#46041F] via-[#46041F]/20 to-transparent" />

        {/* Navigation Overlays */}
        <div className="absolute top-20 left-8 right-8 flex justify-between items-center z-20">
          <Link
            to="/discover"
            className="p-4 bg-[#46041F]/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-[#FFD595] hover:text-[#46041F] transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-3">
            <button className="p-4 bg-[#46041F]/40 backdrop-blur-xl border border-white/10 rounded-full hover:text-red-400 transition-all">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-4 bg-[#46041F]/40 backdrop-blur-xl border border-white/10 rounded-full hover:text-[#FFD595] transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-12 left-8 right-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-[#FFD595] text-[#46041F] rounded-full text-[10px] font-black uppercase tracking-widest">
                {listing.categoryDisplay || listing.category}
              </span>
              {listing.hasAR && (
                <span className="px-4 py-1 bg-blue-500/20 text-blue-300 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> AR Enabled
                </span>
              )}
            </div>
            <h1 className="text-6xl md:text-8xl jaro font-bold leading-none mb-6 italic">
              {listing.title}
            </h1>
            <div className="flex flex-wrap gap-8 text-[#FFD595]/80 font-bold uppercase text-xs tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {listing.location?.city}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#FFD595]" /> {listing.rating} (
                {listing.reviewCount} Reviews)
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />{" "}
                {Math.floor(listing.duration / 60)}h {listing.duration % 60}m
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Details (8 cols) */}
          <div className="lg:col-span-8 space-y-24">
            {/* Description */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-black italic uppercase jaro tracking-tighter">
                  The Experience
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#FFD595]/40 to-transparent" />
              </div>
              <p className="text-[#FFD595]/70 text-xl leading-relaxed font-medium first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#FFD595]">
                {listing.description}
              </p>
            </section>

            {/* Quick Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Users,
                  label: "Capacity",
                  val: `${listing.capacity} People`,
                },
                { icon: Shield, label: "Safety", val: "Verified" },
                {
                  icon: Calendar,
                  label: "Difficulty",
                  val: listing.difficulty,
                },
                {
                  icon: Info,
                  label: "District",
                  val: listing.location?.district,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all group"
                >
                  <s.icon className="w-6 h-6 text-[#FFD595] mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase text-white/40 mb-1">
                    {s.label}
                  </p>
                  <p className="text-sm font-bold text-[#FFD595]">{s.val}</p>
                </div>
              ))}
            </section>

            {/* Trusted Safety Section */}
            <section className="bg-white/5 rounded-[3rem] p-10 border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-black italic uppercase jaro text-[#FFD595]">
                    Safety & Environment
                  </h2>
                  <p className="text-white/40 text-sm mt-1">
                    Real-time data for your peace of mind
                  </p>
                </div>
                <div className="bg-[#46041F] px-8 py-4 rounded-3xl border border-[#FFD595]/20 flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FFD595]/60">
                    Trust Score
                  </span>
                  <SafetyScore score={listing.safetyScore || 92} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Safety Badges - Horizontal Layout */}
                  <div className="p-6 bg-black/20 rounded-2xl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#FFD595]/60 mb-4">
                      Safety Features
                    </h3>
                    <SafetyBadges
                      womenFriendly={listing.womenFriendly !== false}
                      verified={listing.verified !== false}
                      insured={listing.insured}
                      firstAid={listing.firstAid}
                      familyFriendly={listing.familyFriendly}
                      size="lg"
                    />
                  </div>
                  <div className="p-6 bg-black/20 rounded-2xl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#FFD595]/60 mb-4">
                      Host Verification
                    </h3>
                    <HostVerificationBadge
                      hostName={listing.host?.name}
                      isVerified={listing.host?.verified}
                      rating={listing.host?.rating}
                    />
                  </div>
                </div>
                <div className="bg-[#FFD595]/10 rounded-[2rem] p-2 overflow-hidden border border-[#FFD595]/10">
                  <WeatherWidget location={listing.location?.city} />
                </div>
              </div>
            </section>

            {/* Emergency & Community */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NearbyEmergency location={listing.location?.city} />
            </section>
          </div>

          {/* Right Column: Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-12">
              <div className="bg-[#FFD595] text-[#46041F] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
                {/* Decorative BG for Card */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#46041F]/5 rounded-full blur-3xl group-hover:bg-[#46041F]/10 transition-all" />

                <div className="relative z-10">
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-6xl font-black jaro tracking-tighter">
                      ₹{listing.price}
                    </span>
                    <span className="text-[#46041F]/60 font-bold uppercase text-xs">
                      / {t("per_person")}
                    </span>
                  </div>

                  <div className="space-y-4 mb-10">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-6 bg-[#46041F] text-[#FFD595] rounded-full font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      {t("book_experience")}
                    </button>

                    <button className="w-full py-6 bg-transparent border-2 border-[#46041F]/20 text-[#46041F] rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#46041F]/5 transition-all">
                      {t("add_to_journey")}
                    </button>

                    {listing.hasAR && (
                      <Link
                        to={`/heritage-vision/${id}`}
                        className="w-full py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                      >
                        <Sparkles className="w-5 h-5" /> Launch Heritage AR
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-[#46041F]/5 rounded-3xl border border-[#46041F]/10">
                    <div className="w-10 h-10 rounded-full bg-[#46041F] flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-[#FFD595]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase leading-none mb-1">
                        Secure Booking
                      </p>
                      <p className="text-[9px] font-bold opacity-60 uppercase">
                        Encrypted Payment Gateway
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Support Link */}
              <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 text-white/40 hover:text-[#FFD595] transition-colors text-xs font-black uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4" /> Report this listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        listing={listing}
        onConfirm={async (data) => {
          const res = await api.post("/bookings", data);
          return res.data;
        }}
      />
    </div>
  );
};

export default ListingDetail;
