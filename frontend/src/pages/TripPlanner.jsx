import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ArrowRight,
  Star,
  Compass,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config";

const TripPlanner = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    interests: [],
    duration: 3,
    budget: "Moderate",
    location: "All",
  });

  const categories = [
    {
      id: "AgriRural",
      label: t("farm_village"),
      icon: "🌾",
      desc: "Farmstays & Villages",
    },
    {
      id: "HeritageCulture",
      label: t("art_heritage"),
      icon: "🏛️",
      desc: "Ancient Temples & Arts",
    },
    {
      id: "EcoAdventure",
      label: t("wild_nature"),
      icon: "⛰️",
      desc: "Mountains & Wildlife",
    },
  ];

  const steps = [
    { id: 1, label: "Interests", icon: Compass },
    { id: 2, label: "Logistics", icon: Calendar },
    { id: 3, label: "Curation", icon: Sparkles },
  ];

  const toggleInterest = (id) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await api.post("/ai/generate-trip", {
        ...formData,
        language: i18n.language,
      });
      setPlan(response.data.data);
      setStep(4);
    } catch (error) {
      console.error("AI Trip generation failed:", error);
      alert(t("failed_generate_trip"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#46041F] text-white pt-10 pb-20 px-4 md:px-10">
      {/* Decorative Background Elements */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="flex flex-col pt-12 md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter jaro italic">
              Travel Arc
            </h1>
            <p className="text-[#FFD595] font-medium tracking-widest uppercase text-xs">
              Crafting Tamil Nadu's Heritage Stories
            </p>
          </div>

          {/* Progress Tracker (Desktop) */}
          {step < 4 && (
            <div className="hidden md:flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    step === s.id
                      ? "bg-[#FFD595] text-[#46041F]"
                      : "text-white/40"
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-tighter">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Selection Area (Left Column) */}
          <div className={step === 4 ? "lg:col-span-12" : "lg:col-span-8"}>
            <div className="bg-[#FFD595] rounded-[3rem] p-8 md:p-12 min-h-[500px] shadow-2xl overflow-hidden relative">
              <AnimatePresence mode="wait">
                {/* STEP 1: INTERESTS */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-4xl font-black text-[#46041F] mb-2 uppercase italic leading-none">
                        What fuels your <br /> curiosity?
                      </h2>
                      <p className="text-[#46041F]/60 mb-10 font-bold uppercase text-xs tracking-widest">
                        Select one or more themes
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => toggleInterest(cat.id)}
                            className={`p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col h-48 justify-between ${
                              formData.interests.includes(cat.id)
                                ? "bg-[#46041F] border-[#46041F] text-[#FFD595] scale-95 shadow-inner"
                                : "bg-white/50 border-[#46041F]/10 text-[#46041F] hover:bg-white/80"
                            }`}
                          >
                            <span className="text-4xl">{cat.icon}</span>
                            <div>
                              <div className="font-black text-lg uppercase leading-tight">
                                {cat.label}
                              </div>
                              <div className="text-xs opacity-70 font-bold">
                                {cat.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-12">
                      <button
                        onClick={() => setStep(2)}
                        disabled={formData.interests.length === 0}
                        className="group flex items-center gap-4 bg-[#46041F] text-[#FFD595] pl-8 pr-4 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:gap-6 transition-all disabled:opacity-30"
                      >
                        Set Logistics <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: LOGISTICS */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="h-full flex flex-col"
                  >
                    <h2 className="text-4xl font-black text-[#46041F] mb-12 uppercase italic leading-none">
                      Define your <br /> rhythm.
                    </h2>

                    <div className="space-y-10 flex-1">
                      {/* Duration */}
                      <div className="bg-white/40 p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[#46041F] font-black uppercase tracking-widest text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> How long?
                          </span>
                          <span className="text-4xl font-black text-[#46041F] italic">
                            {formData.duration} Days
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full accent-[#46041F] h-2 bg-[#46041F]/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Location Selection */}
                      <div className="relative">
                        <label className="text-[#46041F] font-black uppercase tracking-widest text-sm mb-3 block px-4">
                          Start Point
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          className="w-full bg-[#46041F] text-[#FFD595] font-black text-xl rounded-[2rem] px-8 py-6 outline-none appearance-none cursor-pointer shadow-xl"
                        >
                          <option value="All">Across Tamil Nadu</option>
                          <option value="Chennai">
                            Northern (Chennai/Vellore)
                          </option>
                          <option value="Coimbatore">
                            Western (Coimbatore/Salem)
                          </option>
                          <option value="Madurai">
                            Southern (Madurai/Kanyakumari)
                          </option>
                          <option value="Thanjavur">
                            Central (Thanjavur/Trichy)
                          </option>
                        </select>
                        <ChevronRight className="absolute right-8 bottom-7 w-6 h-6 text-[#FFD595] rotate-90 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-12">
                      <button
                        onClick={() => setStep(1)}
                        className="text-[#46041F] font-black uppercase text-xs tracking-widest flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Go Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="bg-[#46041F] text-[#FFD595] px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest shadow-xl"
                      >
                        Confirm Details
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: LOADING/GENERATE */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-[#46041F]/10 rounded-full animate-ping absolute inset-0" />
                      <div className="w-32 h-32 bg-[#46041F] rounded-full flex items-center justify-center relative">
                        <Sparkles className="w-14 h-14 text-[#FFD595]" />
                      </div>
                    </div>
                    <h2 className="text-4xl font-black text-[#46041F] mb-4 italic uppercase">
                      We're stitching <br /> your story
                    </h2>
                    <p className="text-[#46041F]/60 max-w-xs font-bold mb-10 uppercase text-xs">
                      Combining local heritage with farm adventures
                    </p>

                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="bg-[#46041F] text-[#FFD595] px-16 py-6 rounded-full font-black uppercase text-lg tracking-widest shadow-2xl flex items-center gap-4 active:scale-95 transition-all"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        "Launch Travel Arc"
                      )}
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: RESULTS (THE ITINERARY) */}
                {step === 4 && plan && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-16 pb-12"
                  >
                    {/* Hero Result Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-[#46041F] pb-10 gap-6">
                      <div className="max-w-xl">
                        <span className="bg-[#46041F] text-[#FFD595] px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                          Generated Itinerary
                        </span>
                        <h2 className="text-6xl font-black text-[#46041F] italic leading-tight mt-4 uppercase">
                          {plan.title}
                        </h2>
                        <p className="text-[#46041F] font-bold text-lg mt-4 leading-relaxed italic">
                          "{plan.summary}"
                        </p>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="bg-[#46041F] text-[#FFD595] p-5 rounded-3xl group shadow-lg"
                      >
                        <Clock className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
                      </button>
                    </div>

                    {/* Timeline Grid */}
                    <div className="space-y-24 relative">
                      {/* Vertical line connector */}
                      <div className="absolute left-8 top-10 bottom-0 w-1 bg-[#46041F]/10 hidden md:block" />

                      {plan.itinerary.map((day, idx) => (
                        <div key={idx} className="relative md:pl-24">
                          {/* Day Bubble */}
                          <div className="md:absolute left-0 top-0 w-16 h-16 bg-[#46041F] text-[#FFD595] rounded-full flex items-center justify-center font-black text-xl italic shadow-2xl z-20 mb-6 md:mb-0">
                            {day.day}
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {day.activities.map((act, aIdx) => (
                              <div
                                key={aIdx}
                                className="bg-white rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition-all border-b-8 border-r-8 border-[#46041F]/10 hover:border-[#46041F]/20"
                              >
                                <div className="w-full md:w-44 h-44 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                                  <img
                                    src={act.images?.[0]}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-2">
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-[#46041F]/40">
                                        {act.category}
                                      </span>
                                      <div className="flex items-center gap-1 text-[#46041F] font-black text-xs">
                                        <Star className="w-3 h-3 fill-[#46041F]" />{" "}
                                        {act.rating}
                                      </div>
                                    </div>
                                    <h4 className="text-xl font-black text-[#46041F] uppercase leading-tight mb-2">
                                      {act.title}
                                    </h4>
                                    <p className="text-[#46041F]/60 text-xs font-bold flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />{" "}
                                      {act.location.city}
                                    </p>
                                  </div>
                                  <a
                                    href={`/listings/${act._id}`}
                                    className="mt-4 flex items-center justify-between bg-[#46041F]/5 p-4 rounded-2xl hover:bg-[#46041F] hover:text-[#FFD595] transition-colors group"
                                  >
                                    <span className="font-black uppercase text-[10px] tracking-widest">
                                      View Details
                                    </span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center pt-20">
                      <button className="bg-[#46041F] text-[#FFD595] px-16 py-8 rounded-[2rem] font-black uppercase text-xl tracking-tighter shadow-2xl flex items-center gap-6 hover:scale-105 transition-all">
                        Book This Entire Journey{" "}
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Summary Sidebar (Visible only during steps 1-3) */}
          {step < 4 && (
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-[#FFD595]">
                  Your Preferences
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className={`w-5 h-5 ${formData.interests.length ? "text-[#FFD595]" : "text-white/20"}`}
                    />
                    <div>
                      <p className="text-[10px] uppercase font-black text-white/40">
                        Interests
                      </p>
                      <p className="text-sm font-bold">
                        {formData.interests.length > 0
                          ? formData.interests.join(", ")
                          : "None selected"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#FFD595]" />
                    <div>
                      <p className="text-[10px] uppercase font-black text-white/40">
                        Travel Duration
                      </p>
                      <p className="text-sm font-bold">
                        {formData.duration} Days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#FFD595]" />
                    <div>
                      <p className="text-[10px] uppercase font-black text-white/40">
                        Target Zone
                      </p>
                      <p className="text-sm font-bold">{formData.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-2 border-[#FFD595]/20 rounded-[2.5rem] italic text-sm text-[#FFD595]/60">
                "Traveling is not just about the destination, it's about the
                heritage we rediscover along the way."
              </div>
            </aside>
          )}
        </main>
      </div>

      {/* Font Customization - Just adding inline for demo purpose, move to your CSS file */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .jaro { font-family: 'Jaro', sans-serif; }
      `,
        }}
      />
    </div>
  );
};

export default TripPlanner;
