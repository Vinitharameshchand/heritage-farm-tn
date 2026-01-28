import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Star
} from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const TripPlanner = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);
    const [formData, setFormData] = useState({
        interests: [],
        duration: 3,
        budget: 'Moderate',
        location: 'All'
    });

    const categories = [
        { id: 'AgriRural', label: t('farm_village'), icon: '🌾' },
        { id: 'HeritageCulture', label: t('art_heritage'), icon: '🏛️' },
        { id: 'EcoAdventure', label: t('wild_nature'), icon: '⛰️' }
    ];

    const toggleInterest = (id) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id]
        }));
    };

    const handleGenerate = async () => {
        try {
            setLoading(true);
            const response = await api.post('/ai/generate-trip', {
                ...formData,
                language: i18n.language
            });
            setPlan(response.data.data);
            setStep(4);
        } catch (error) {
            console.error('AI Trip generation failed:', error);
            alert(t('failed_generate_trip'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <Sparkles className="w-4 h-4" /> {t('ai_powered')}
                </motion.div>
                <h1 className="text-6xl font-outfit font-black mb-4">{t('travel_arc').split(' ')[0]} <span className="gradient-text">{t('travel_arc').split(' ')[1] || 'Arc'}</span></h1>
                <p className="text-slate-500 max-w-lg mx-auto">{t('travel_arc_description')}</p>
            </div>

            {/* Wizard */}
            <div className="glass p-10 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold">{t('what_fuels_curiosity').split('curiosity')[0]}<span className="text-emerald-500">{t('what_fuels_curiosity').includes('curiosity') ? t('what_fuels_curiosity').split('curiosity?')[0].split(' ').pop() + '?' : ''}</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleInterest(cat.id)}
                                        className={`p-6 rounded-[32px] border transition-all duration-300 text-left group ${formData.interests.includes(cat.id)
                                                ? 'bg-emerald-500 border-emerald-500 shadow-xl shadow-emerald-500/20'
                                                : 'bg-white/5 border-white/5 hover:border-emerald-500/30'
                                            }`}
                                    >
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                                        <div className={`font-bold ${formData.interests.includes(cat.id) ? 'text-white' : 'text-slate-200'}`}>{cat.label}</div>
                                        <div className={`text-xs mt-1 ${formData.interests.includes(cat.id) ? 'text-emerald-100' : 'text-slate-500'}`}>{t('explore_lowercase')} {cat.label.toLowerCase()}</div>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={formData.interests.length === 0}
                                    className="btn-primary flex items-center gap-2 px-10 py-4 disabled:opacity-50"
                                >
                                    {t('continue')} <ChevronRight className="w-5 h-5" />
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
                            <h2 className="text-3xl font-bold text-center">{t('set_rhythm').split('rhythm')[0]}<span className="text-emerald-500">{t('set_rhythm').includes('rhythm') ? t('set_rhythm').split('.')[0].split(' ').pop() + '.' : ''}</span></h2>

                            <div className="max-w-md mx-auto space-y-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> {t('trip_duration')}
                                    </label>
                                    <div className="flex items-center gap-8 px-6 py-8 bg-white/5 rounded-3xl border border-white/5">
                                        <input
                                            type="range" min="1" max="14"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="flex-1 accent-emerald-500"
                                        />
                                        <div className="text-center">
                                            <span className="text-4xl font-black text-emerald-500">{formData.duration}</span>
                                            <span className="block text-[10px] font-bold uppercase tracking-tighter text-slate-500">{t('days')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> {t('destination')}
                                    </label>
                                    <select
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
                                    >
                                        <option value="All">{t('all_tamil_nadu')}</option>
                                        <option value="Madurai">{t('madurai_region')}</option>
                                        <option value="Nilgiris">{t('nilgiris_peaks')}</option>
                                        <option value="Thanjavur">{t('cauvery_delta')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <button onClick={() => setStep(1)} className="text-slate-500 font-bold flex items-center gap-2 hover:text-white transition-colors">
                                    <ChevronLeft className="w-5 h-5" /> {t('back')}
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="btn-primary flex items-center gap-2 px-10 py-4"
                                >
                                    {t('confirm_details')} <ChevronRight className="w-5 h-5" />
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
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                                <Sparkles className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h2 className="text-4xl font-black mb-4">{t('curation_in_progress')}</h2>
                            <p className="text-slate-500 max-w-xs mx-auto mb-12">{t('ai_stitching')}</p>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="btn-primary w-full max-w-sm py-5 flex items-center justify-center gap-3 shadow-emerald-500/30 shadow-2xl"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t('launch_travel_arc')}
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
                                    <h2 className="text-4xl font-black gradient-text">{plan.title}</h2>
                                    <p className="text-slate-400 mt-2">{plan.summary}</p>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                                    title={t('new_plan')}
                                >
                                    <Clock className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-10">
                                {plan.itinerary.map((day, idx) => (
                                    <div key={idx} className="relative pl-10 border-l border-white/10">
                                        <div className="absolute -left-4 top-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-emerald-500/50">
                                            {day.day}
                                        </div>
                                        <h3 className="text-xl font-bold mb-6">{t('day_modules', { day: day.day })}</h3>
                                        <div className="grid gap-4">
                                            {day.activities.map((act, aIdx) => (
                                                <div key={aIdx} className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group flex items-center gap-6">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xl shrink-0">
                                                        <img src={act.images?.[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full">{act.category}</span>
                                                            <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-bold">
                                                                <Star className="w-2 h-2 fill-current" /> {act.rating}
                                                            </div>
                                                        </div>
                                                        <h4 className="text-lg font-bold">{act.title}</h4>
                                                        <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                            <MapPin className="w-3 h-3" /> {act.location.city}, {act.location.district}
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={`/listings/${act._id}`}
                                                        className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                                                    >
                                                        <ArrowRight className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/10 flex justify-center">
                                <button className="btn-primary px-12 py-4 flex items-center gap-3">
                                    {t('book_complete_arc')} <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TripPlanner;
