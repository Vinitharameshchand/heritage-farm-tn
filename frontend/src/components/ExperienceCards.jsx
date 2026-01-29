import React, { useState, useEffect } from "react";
import {
  FaSeedling,
  FaLandmark,
  FaMountain,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, ArrowRight as LucideArrow } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import i18n from "../i18n/config";

const cards = [
  {
    title: "Agri & Rural",
    titleTamil: "விவசாயம் & கிராமப்புறம்",
    desc: "Engage with traditional farming practices and rural experiences.",
    descTamil:
      "பாரம்பரிய விவசாய முறைகள் மற்றும் கிராமப்புற அனுபவங்களை அனுபவியுங்கள்",
    icon: <FaSeedling className="w-8 h-8" />,
    category: "AgriRural",
  },
  {
    title: "Heritage & Culture",
    titleTamil: "பாரம்பரியம் & கலாச்சாரம்",
    desc: "Journey through ancient temples, local art, and living history.",
    descTamil:
      "பண்டைய கோயில்கள், உள்ளூர் கலை மற்றும் வாழும் வரலாற்றின் வழியாக பயணம்",
    icon: <FaLandmark className="w-8 h-8" />,
    category: "HeritageCulture",
  },
  {
    title: "Eco & Adventure",
    titleTamil: "சுற்றுச்சூழல் & சாகசம்",
    desc: "Scenic paths, cycling trails, and eco-friendly adventures.",
    descTamil:
      "இயற்கை பாதைகள், சைக்கிள் பாதைகள் மற்றும் சுற்றுச்சூழல் சாகசங்கள்",
    icon: <FaMountain className="w-8 h-8" />,
    category: "EcoAdventure",
  },
];

export default function ExperienceCards() {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.get("/listings", {
          params: {
            limit: 6,
            lang: i18n.language,
          },
        });
        setExperiences(response.data.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [i18n.language]);

  return (
    <section className="bg-[#ce9f49] py-16 pb-20 relative overflow-hidden">
      {/* Decorative SVGs */}
      <div className="absolute top-8 left-0 w-40 opacity-30">
        <img src="/left.svg" alt="decorative left" className="h-full w-auto" />
      </div>
      <div className="absolute top-8 right-0 w-40 opacity-30">
        <img
          src="/right.svg"
          alt="decorative right"
          className="h-full w-auto"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#540726] mb-4 jaro">
            Explore Tamil Nadu
          </h2>
          <h3 className="text-3xl font-semibold text-[#540726] mb-2">
            தமிழ்நாட்டை ஆராயுங்கள்
          </h3>
          <p className="text-black/80 max-w-2xl mx-auto">
            Discover authentic experiences across three unique categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-6 mb-16">
          {cards.map((c, index) => (
            <Link
              key={c.title}
              to={`/discover?category=${c.category}`}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#540726]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group block"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-[#540726]/10 rounded-full mb-6 text-[#540726] group-hover:bg-[#540726]/20 transition-colors">
                {c.icon}
              </div>

              <h3 className="font-bold text-2xl text-[#540726] mb-2 jaro">
                {c.title}
              </h3>
              <h4 className="font-semibold text-lg text-[#540726]/80 mb-4">
                {c.titleTamil}
              </h4>

              <p className="text-black text-sm leading-relaxed mb-2">
                {c.desc}
              </p>
              <p className="text-black/80 text-sm leading-relaxed mb-6">
                {c.descTamil}
              </p>

              <div className="flex items-center gap-2 text-[#540726] font-bold text-sm group-hover:gap-3 transition-all group-hover:text-[#540726]/80">
                Explore {c.title}
                <FaArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Experiences Section */}
        <div className="text-center mb-12 mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#540726]/30 rounded-full text-[#540726] font-bold text-sm mb-8">
            ✨ FEATURED EXPERIENCES
          </div>
          <h2 className="text-4xl font-bold text-[#540726] mb-4 jaro">
            Start Your Journey
          </h2>
          <p className="text-black/80 max-w-3xl mx-auto">
            Discover handpicked experiences that showcase the best of Tamil
            Nadu's heritage, culture, and natural beauty
          </p>
        </div>

        {/* Experience Listings */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-sm rounded-[32px] overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-[#540726]/20" />
                <div className="p-6">
                  <div className="h-4 bg-[#540726]/20 rounded mb-4" />
                  <div className="h-6 bg-[#540726]/30 rounded mb-4" />
                  <div className="h-4 bg-[#540726]/20 rounded mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-[#540726]/20 rounded w-20" />
                    <div className="w-12 h-12 bg-[#540726]/20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : experiences.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mb-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-[32px] overflow-hidden group hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#540726]/20 transition-all duration-500 border border-[#540726]/20"
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
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#540726]/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                      {experience.categoryDisplay || experience.category}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-2.5 py-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {experience.rating || "4.8"}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#540726]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#540726]/80 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location?.city || "Tamil Nadu"}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#540726] mb-4 group-hover:text-[#540726]/80 transition-colors leading-tight line-clamp-2">
                      {experience.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-6 text-sm text-[#540726]/60 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#540726]" />
                        <span>
                          {Math.floor(experience.duration / 60)}h{" "}
                          {experience.duration % 60}m
                        </span>
                      </div>
                      {experience.difficulty && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-[#540726]/30" />
                          <div className="px-3 py-1 bg-[#540726]/10 rounded-full text-xs font-bold">
                            {experience.difficulty}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#540726]/20">
                      <div className="flex-1">
                        <div className="text-xs text-[#540726]/50 font-bold uppercase tracking-wider mb-1">
                          Starting from
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-[#540726]">
                            ₹{experience.price}
                          </span>
                          <span className="text-[#540726]/70 text-xs">
                            / person
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#540726] hover:bg-[#540726]/80 text-white flex items-center justify-center transition-all duration-500">
                        <LucideArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : null}

        {/* View All Button */}
        {!loading && experiences.length > 0 && (
          <div className="text-center px-6">
            <Link
              to="/discover"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#540726] hover:bg-[#540726]/90 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              View All Experiences
              <LucideArrow className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
