import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import i18n from "../i18n/config";

const FeaturedExperiences = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedExperiences = async () => {
      try {
        const response = await api.get("/listings", {
          params: {
            limit: 6,
            lang: i18n.language,
          },
        });
        setExperiences(response.data.data);
      } catch (error) {
        console.error("Error fetching featured experiences:", error);
        // Fallback to empty array if error
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedExperiences();
  }, [i18n.language]);

  if (loading) {
    return (
      <section className="bg-[#46041F] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#FFD595]/30 rounded-full text-[#FFD595] font-bold text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              FEATURED EXPERIENCES
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 jaro">
              Start Your Journey
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Discover handpicked experiences that showcase the best of Tamil
              Nadu's heritage, culture, and natural beauty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-[#FFD595]/20 rounded-[32px] overflow-hidden animate-pulse"
              >
                <div className="h-72 bg-[#FFD595]/20" />
                <div className="p-6">
                  <div className="h-4 bg-[#FFD595]/20 rounded mb-4" />
                  <div className="h-6 bg-white/20 rounded mb-4" />
                  <div className="h-4 bg-white/10 rounded mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-[#FFD595]/20 rounded w-20" />
                    <div className="w-12 h-12 bg-[#FFD595]/20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!experiences.length) {
    return null;
  }

  return (
    <section className="bg-[#46041F] py-20 relative overflow-hidden">
      {/* Decorative SVGs */}
      <div className="absolute top-8 left-0 w-40 opacity-20">
        <img src="/left.svg" alt="decorative left" className="h-full w-auto" />
      </div>
      <div className="absolute top-8 right-0 w-40 opacity-20">
        <img
          src="/right.svg"
          alt="decorative right"
          className="h-full w-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#FFD595]/30 rounded-full text-[#FFD595] font-bold text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            FEATURED EXPERIENCES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-white mb-6 jaro"
          >
            Start Your Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl max-w-3xl mx-auto mb-8"
          >
            Discover handpicked experiences that showcase the best of Tamil
            Nadu's heritage, culture, and natural beauty
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-[#FFD595]/20 rounded-[32px] overflow-hidden group hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#FFD595]/20 transition-all duration-500"
            >
              <Link to={`/listings/${experience._id}`}>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      experience.images?.[0] ||
                      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FFD595]/90 backdrop-blur-sm text-[#46041F] text-xs font-bold rounded-full">
                    {experience.categoryDisplay || experience.category}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      <Star className="w-3 h-3 text-[#FFD595] fill-current" />
                      {experience.rating || "4.8"}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#46041F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location?.city || "Tamil Nadu"}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#FFD595] transition-colors leading-tight line-clamp-2">
                    {experience.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-6 text-sm text-white/60 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FFD595]" />
                      <span>
                        {Math.floor(experience.duration / 60)}h{" "}
                        {experience.duration % 60}m
                      </span>
                    </div>
                    {experience.difficulty && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">
                          {experience.difficulty}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex-1">
                      <div className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">
                        Starting from
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-[#FFD595]">
                          ₹{experience.price}
                        </span>
                        <span className="text-white/70 text-xs">/ person</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FFD595] hover:bg-[#FFD595]/80 text-[#46041F] flex items-center justify-center transition-all duration-500">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/discover"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFD595] hover:bg-[#FFD595]/90 text-[#46041F] rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#FFD595]/30"
          >
            View All Experiences
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
