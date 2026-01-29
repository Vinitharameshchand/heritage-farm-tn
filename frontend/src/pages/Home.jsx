import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin,
  Sprout,
  Landmark,
  Mountain,
  ArrowRight,
  Play,
  Camera,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "./Hero";
import ExperienceCards from "../components/ExperienceCards";
import QuoteSection from "../components/QuoteSection";

const Home = () => {
  const { t } = useTranslation();

  const sectors = [
    {
      title: t("agri_rural"),
      icon: <Sprout className="w-8 h-8" />,
      color: "bg-emerald-500/10 text-emerald-500",
      slug: "AgriRural",
      desc: "Engage with traditional farming, organic gardens, and rural craftsmanship.",
    },
    {
      title: t("heritage_culture"),
      icon: <Landmark className="w-8 h-8" />,
      color: "bg-amber-500/10 text-amber-500",
      slug: "HeritageCulture",
      desc: "Journey through ancient temples, colonial architecture, and living history.",
    },
    {
      title: t("eco_adventure"),
      icon: <Mountain className="w-8 h-8" />,
      color: "bg-sky-500/10 text-sky-500",
      slug: "EcoAdventure",
      desc: "Scale peaks, explore wildlife sanctuaries, and navigate untouched trails.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />

      {/* Experience Cards Section */}
      <ExperienceCards />

      <QuoteSection />
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#fed595]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#46041F] rounded-full text-[#46041F] font-bold text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                NEW FEATURE
              </div>
              <h2 className="text-6xl font-outfit font-black mb-6 text-[#46041F] jaro">
                AR Explorer with AI Guide
              </h2>
              <p className="text-[#46041F] jaro text-xl mb-6 leading-relaxed">
                Meet your virtual guide who speaks Tamil & English. Point your
                camera to see AR markers for nearby heritage sites, hear
                cultural stories, and book instantly.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "AI guide narrates history in your language",
                  "AR overlays show nearby experiences in real-time",
                  "Instant booking from AR view",
                  "Works on any smartphone browser",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[#46041F] jaro font-medium"
                  >
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/ar-explorer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#46041F] to-[#46041F] hover:from-[#46041F] hover:to-[#46041F] text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105"
              >
                <Camera className="w-6 h-6" />
                Try AR Explorer
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
              <div className="relative">
                <img
                  src="/mob.svg"
                  alt="Mobile AR View"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
