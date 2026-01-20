import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Sprout, Landmark, Mountain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();

    const sectors = [
        { title: t('agri_rural'), icon: <Sprout className="w-8 h-8" />, color: 'bg-green-100 text-green-700', slug: 'AgriRural' },
        { title: t('heritage_culture'), icon: <Landmark className="w-8 h-8" />, color: 'bg-amber-100 text-amber-700', slug: 'HeritageCulture' },
        { title: t('eco_adventure'), icon: <Mountain className="w-8 h-8" />, color: 'bg-sky-100 text-sky-700', slug: 'EcoAdventure' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-bold border border-primary-100"
                    >
                        <MapPin className="w-4 h-4" />
                        Explore Tamil Nadu Truly
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-outfit font-black leading-[1.1] max-w-5xl"
                    >
                        Connect with the <span className="gradient-text">Soul of the Soil</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 max-w-2xl leading-relaxed"
                    >
                        {t('discovery')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4 pt-4"
                    >
                        <Link
                            to="/discover"
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 premium-shadow hover:bg-slate-800 transition-all active:scale-95"
                        >
                            {t('explore')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/signup?role=creator"
                            className="bg-white px-10 py-5 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 text-slate-600"
                        >
                            {t('become_creator')}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Sector Grid */}
            <section className="px-6 py-24 bg-slate-100/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-outfit font-black mb-4">Select your <span className="text-primary-600">Journey Arc</span></h2>
                            <p className="text-slate-500 text-lg">Choose from three curated paths tailored to deep-dive into regional excellence.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sectors.map((sector, index) => (
                            <motion.div
                                key={sector.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 rounded-[40px] premium-shadow border border-slate-50 hover:-translate-y-3 transition-all duration-500 cursor-pointer group relative overflow-hidden"
                            >
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-20" />

                                <Link to={`/discover?category=${sector.slug}`} className="relative z-10">
                                    <div className={`w-16 h-16 ${sector.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                        {sector.icon}
                                    </div>
                                    <h3 className="text-2xl font-outfit font-bold mb-4">{sector.title}</h3>
                                    <p className="text-slate-500 mb-8 leading-relaxed">Join local experts and community leaders on an immersive journey across this sector.</p>
                                    <div className="flex items-center text-primary-600 font-extrabold gap-2 text-sm uppercase tracking-wider">
                                        Explore Experiences <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Quote */}
            <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="text-primary-600 font-bold text-6xl opacity-20 block mb-6">"</span>
                    <p className="text-3xl font-outfit italic text-slate-700 leading-snug">
                        Real tourism isn't just seeing new places, it's having new eyes. Heritage Farm brings the authentic soul of Tamil Nadu to the modern explorer.
                    </p>
                    <div className="mt-8 font-bold text-slate-400 uppercase tracking-[0.2em] text-xs">The Heritage Collective</div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
