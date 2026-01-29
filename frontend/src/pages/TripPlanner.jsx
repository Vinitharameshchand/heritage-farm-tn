import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Star,
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
    { id: "AgriRural", label: t("farm_village"), icon: "🌾" },
    { id: "HeritageCulture", label: t("art_heritage"), icon: "🏛️" },
    { id: "EcoAdventure", label: t("wild_nature"), icon: "⛰️" },
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
    <div className="min-h-screen bg-[#46041F] pt-20 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Kolam Patterns */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 w-24 opacity-40">
        <img src="/left.svg" alt="decorative left" className="h-auto w-full" />
      </div>
      <div className="fixed top-1/2 -translate-y-1/2 right-8 w-24 opacity-40">
        <img
          src="/right.svg"
          alt="decorative right"
          className="h-auto w-full"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-5xl jaro font-bold mb-4 text-white">Travel Arc</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
          Personalized itineraries across Tamil Nadu's hidden farms and heritage
          sites.
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#FFD595] p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-[#46041F] text-center mb-8">
                  what fuels your curiosity ?
                </h2>

                <div className="grid grid-cols-3 gap-6">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => toggleInterest(cat.id)}
                      className={`aspect-[4/3] rounded-2xl border-4 transition-all duration-300 text-center p-6 ${
                        formData.interests.includes(cat.id)
                          ? "bg-[#46041F] border-[#46041F] text-white"
                          : "bg-[#46041F] border-[#46041F] text-[#FFD595] hover:scale-105"
                      }`}
                    >
                      <div className="h-full flex flex-col items-center justify-center">
                        <div className="text-2xl mb-2">{cat.icon}</div>
                        <div className="font-bold text-sm">Farm & Village</div>
                        <div className="text-xs mt-1 opacity-80">
                          Explore farms & village
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end mt-12">
                  <button
                    onClick={() => setStep(2)}
                    disabled={formData.interests.length === 0}
                    className="bg-[#46041F] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#46041F]/90 transition-all disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <h2 className="text-3xl font-bold text-center text-[#46041F]">
                  {t("set_rhythm").split("rhythm")[0]}
                  <span className="text-[#FFD595]">
                    {t("set_rhythm").includes("rhythm")
                      ? t("set_rhythm").split(".")[0].split(" ").pop() + "."
                      : ""}
                  </span>
                </h2>

                <div className="max-w-md mx-auto space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {t("trip_duration")}
                    </label>
                    <div className="flex items-center gap-8 px-6 py-8 bg-[#FFD595]/10 rounded-3xl border border-[#FFD595]/20">
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        className="flex-1 accent-[#46041F]"
                      />
                      <div className="text-center">
                        <span className="text-4xl font-black text-[#46041F]">
                          {formData.duration}
                        </span>
                        <span className="block text-[10px] font-bold uppercase tracking-tighter text-black/60">
                          {t("days")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {t("destination")}
                    </label>
                    <div className="relative group">
                      <select
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full bg-[#46041F] text-white font-semibold text-base border-2 border-[#FFD595]/30 rounded-[20px] pl-5 pr-12 py-4 outline-none hover:border-[#FFD595]/50 focus:border-[#FFD595] focus:ring-2 focus:ring-[#FFD595]/20 transition-all appearance-none cursor-pointer shadow-2xl"
                        size="1"
                      >
                        <option
                          value="All"
                          className="bg-[#46041F] text-white py-3 font-semibold"
                        >
                          {t("all_tamil_nadu")}
                        </option>
                        <optgroup
                          label="━━━ Northern Districts ━━━"
                          className="bg-white text-black font-black py-2"
                        >
                          <option
                            value="Chennai"
                            className="bg-[#46041F] text-white py-2"
                          >
                            Chennai
                          </option>
                          <option
                            value="Tiruvallur"
                            className="bg-[#46041F] text-white py-2"
                          >
                            Tiruvallur
                          </option>
                          <option
                            value="Kanchipuram"
                            className="bg-[#46041F] text-white py-2"
                          >
                            Kanchipuram
                          </option>
                          <option
                            value="Chengalpattu"
                            className="bg-[#46041F] text-white py-2"
                          >
                            Chengalpattu
                          </option>
                          <option
                            value="Vellore"
                            className="bg-[#46041F] text-white py-2"
                          >
                            Vellore
                          </option>
                          <option
                            value="Ranipet"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Ranipet
                          </option>
                          <option
                            value="Tirupattur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tirupattur
                          </option>
                          <option
                            value="Tiruvannamalai"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tiruvannamalai
                          </option>
                          <option
                            value="Krishnagiri"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Krishnagiri
                          </option>
                          <option
                            value="Dharmapuri"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Dharmapuri
                          </option>
                          <option
                            value="Viluppuram"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Viluppuram
                          </option>
                          <option
                            value="Kallakurichi"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Kallakurichi
                          </option>
                        </optgroup>
                        <optgroup
                          label="━━━ Western Districts ━━━"
                          className="bg-white text-black font-black py-2"
                        >
                          <option
                            value="Coimbatore"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Coimbatore
                          </option>
                          <option
                            value="Tiruppur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tiruppur
                          </option>
                          <option
                            value="Erode"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Erode
                          </option>
                          <option
                            value="Salem"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Salem
                          </option>
                          <option
                            value="Namakkal"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Namakkal
                          </option>
                          <option
                            value="Karur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Karur
                          </option>
                          <option
                            value="Nilgiris"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            The Nilgiris
                          </option>
                        </optgroup>
                        <optgroup
                          label="━━━ Central Districts ━━━"
                          className="bg-white text-black font-black py-2"
                        >
                          <option
                            value="Tiruchirappalli"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tiruchirappalli
                          </option>
                          <option
                            value="Thanjavur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Thanjavur
                          </option>
                          <option
                            value="Tiruvarur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tiruvarur
                          </option>
                          <option
                            value="Nagapattinam"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Nagapattinam
                          </option>
                          <option
                            value="Mayiladuthurai"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Mayiladuthurai
                          </option>
                          <option
                            value="Ariyalur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Ariyalur
                          </option>
                          <option
                            value="Perambalur"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Perambalur
                          </option>
                          <option
                            value="Pudukkottai"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Pudukkottai
                          </option>
                          <option
                            value="Cuddalore"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Cuddalore
                          </option>
                        </optgroup>
                        <optgroup
                          label="━━━ Southern Districts ━━━"
                          className="bg-white text-black font-black py-2"
                        >
                          <option
                            value="Madurai"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Madurai
                          </option>
                          <option
                            value="Theni"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Theni
                          </option>
                          <option
                            value="Dindigul"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Dindigul
                          </option>
                          <option
                            value="Ramanathapuram"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Ramanathapuram
                          </option>
                          <option
                            value="Sivaganga"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Sivaganga
                          </option>
                          <option
                            value="Virudhunagar"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Virudhunagar
                          </option>
                          <option
                            value="Tenkasi"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tenkasi
                          </option>
                          <option
                            value="Tirunelveli"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Tirunelveli
                          </option>
                          <option
                            value="Thoothukudi"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Thoothukudi
                          </option>
                          <option
                            value="Kanyakumari"
                            className="bg-slate-900/95 text-slate-100 py-2"
                          >
                            Kanyakumari
                          </option>
                        </optgroup>
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFD595] rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-black/60 font-bold flex items-center gap-2 hover:text-[#46041F] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" /> {t("back")}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-[#46041F] text-white px-10 py-4 rounded-full font-bold hover:bg-[#46041F]/90 transition-all flex items-center gap-2"
                  >
                    {t("confirm_details")} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-[#FFD595]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#FFD595]/30">
                  <Sparkles className="w-12 h-12 text-[#46041F]" />
                </div>
                <h2 className="text-4xl font-black mb-4 text-[#46041F]">
                  {t("curation_in_progress")}
                </h2>
                <p className="text-black/60 max-w-xs mx-auto mb-12">
                  {t("ai_stitching")}
                </p>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-[#46041F] text-white w-full max-w-sm mx-auto py-5 rounded-full font-bold hover:bg-[#46041F]/90 transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    t("launch_travel_arc")
                  )}
                </button>
              </motion.div>
            )}

            {step === 4 && plan && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black text-[#46041F]">
                      {plan.title}
                    </h2>
                    <p className="text-[#46041F]/60 mt-2">{plan.summary}</p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="p-3 bg-[#46041F]/10 rounded-2xl hover:bg-[#46041F]/20 transition-colors"
                    title={t("new_plan")}
                  >
                    <Clock className="w-5 h-5 text-[#46041F]" />
                  </button>
                </div>

                <div className="space-y-10">
                  {plan.itinerary.map((day, idx) => (
                    <div
                      key={idx}
                      className="relative pl-10 border-l border-[#46041F]/30"
                    >
                      <div className="absolute -left-4 top-0 w-8 h-8 bg-[#FFD595] rounded-full flex items-center justify-center font-bold text-sm text-[#46041F] shadow-lg">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold mb-6 text-[#46041F]">
                        {t("day_modules", { day: day.day })}
                      </h3>
                      <div className="grid gap-4">
                        {day.activities.map((act, aIdx) => (
                          <div
                            key={aIdx}
                            className="bg-[#46041F]/10 p-5 rounded-3xl border border-[#FFD595]/20 hover:border-[#FFD595] transition-all group flex items-center gap-6"
                          >
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl shrink-0">
                              <img
                                src={act.images?.[0]}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#46041F] px-2 py-0.5 bg-[#FFD595]/20 rounded-full">
                                  {act.category}
                                </span>
                                <div className="flex items-center gap-0.5 text-[10px] text-[#FFD595] font-bold">
                                  <Star className="w-2 h-2 fill-current" />{" "}
                                  {act.rating}
                                </div>
                              </div>
                              <h4 className="text-lg font-bold text-[#46041F]">
                                {act.title}
                              </h4>
                              <p className="text-xs text-[#46041F]/60 flex items-center gap-2 mt-1">
                                <MapPin className="w-3 h-3" />{" "}
                                {act.location.city}, {act.location.district}
                              </p>
                            </div>
                            <a
                              href={`/listings/${act._id}`}
                              className="p-3 bg-[#FFD595]/10 text-[#46041F] rounded-xl hover:bg-[#FFD595] hover:text-[#46041F] transition-all"
                            >
                              <ArrowRight className="w-5 h-5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-[#46041F]/20 flex justify-center">
                  <button className="bg-[#46041F] text-white px-12 py-4 rounded-full font-bold hover:bg-[#46041F]/90 transition-all flex items-center gap-3 shadow-lg">
                    {t("book_complete_arc")}{" "}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
