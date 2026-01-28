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
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-emerald-500/5 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full text-sm font-bold border border-emerald-500/20 text-emerald-400"
          >
            <MapPin className="w-4 h-4" />
            Explore Tamil Nadu Truly
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-outfit font-black leading-[0.9] max-w-6xl tracking-tight"
          >
            Connect with the{" "}
            <span className="text-emerald-500 italic">Soul</span> of the{" "}
            <span className="gradient-text">Soil</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl leading-relaxed font-medium"
          >
            {t("discovery")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 pt-6"
          >
            <Link
              to="/discover"
              className="btn-primary text-xl px-12 py-5 flex items-center justify-center gap-3 group"
            >
              {t("explore")}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/signup?role=creator"
              className="btn-secondary text-xl px-12 py-5 flex items-center justify-center gap-3 group"
            >
              <Play className="w-5 h-5 fill-current" />
              {t("become_creator")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AR Explorer Feature */}
      <section className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-pink-950/20 to-slate-950" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400 font-bold text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                NEW FEATURE
              </div>
              <h2 className="text-6xl font-outfit font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                AR Explorer with AI Guide
              </h2>
              <p className="text-slate-300 text-xl mb-6 leading-relaxed">
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
                    className="flex items-center gap-3 text-slate-400"
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105"
              >
                <Camera className="w-6 h-6" />
                Try AR Explorer
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <div className="px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full text-white text-xs font-bold">
                      AR Mode Active
                    </div>
                    <Camera className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-3/4">
                    <div className="bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-5 h-5 text-white" />
                        <span className="text-purple-200 text-xs font-bold">
                          AI Guide
                        </span>
                      </div>
                      <p className="text-white text-sm">
                        Vanakkam! This temple is 800 years old...
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-1/4 right-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full animate-pulse" />
                      <div className="relative bg-emerald-500/90 backdrop-blur-xl rounded-xl p-3 border border-white/20">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full animate-pulse" />
                      <div className="relative bg-purple-500/90 backdrop-blur-xl rounded-xl p-3 border border-white/20">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sector Grid */}
      <section className="px-6 py-32 relative">
        <div className="absolute inset-0 bg-slate-900/40 border-y border-white/5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-outfit font-black mb-6">
                Select your{" "}
                <span className="text-emerald-500">Journey Arc</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed">
                Choose from three curated paths tailored to deep-dive into
                regional excellence and local community stories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-12 rounded-[48px] border-emerald-500/5 hover:border-emerald-500/20 group relative overflow-hidden"
              >
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-700 blur-3xl" />

                <Link
                  to={`/discover?category=${sector.slug}`}
                  className="relative z-10 block"
                >
                  <div
                    className={`w-20 h-20 ${sector.color} rounded-[28px] flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                  >
                    {sector.icon}
                  </div>
                  <h3 className="text-3xl font-outfit font-bold mb-6 text-white">
                    {sector.title}
                  </h3>
                  <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                    {sector.desc}
                  </p>
                  <div className="flex items-center text-emerald-500 font-black gap-3 text-sm uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                    Explore Experiences <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-48 px-6 text-center max-w-5xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <span className="text-emerald-500/10 font-black text-9xl block mb-2 leading-none">
            "
          </span>
          <p className="text-4xl md:text-5xl font-outfit italic text-slate-200 leading-tight font-medium">
            Real tourism isn't just seeing new places, it's having{" "}
            <span className="text-emerald-500">new eyes</span>. Heritage Farm
            brings the authentic soul of Tamil Nadu to the modern explorer.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
            <div className="font-black text-emerald-500/60 uppercase tracking-[0.3em] text-sm">
              The Heritage Collective
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
