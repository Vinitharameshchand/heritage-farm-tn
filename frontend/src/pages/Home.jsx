import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Sprout, Landmark, Mountain, ArrowRight } from 'lucide-react';

const Home = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
    };

    const sectors = [
        { title: t('agri_rural'), icon: <Sprout className="w-8 h-8" />, color: 'bg-green-100 text-green-700' },
        { title: t('heritage_culture'), icon: <Landmark className="w-8 h-8" />, color: 'bg-amber-100 text-amber-700' },
        { title: t('eco_adventure'), icon: <Mountain className="w-8 h-8" />, color: 'bg-sky-100 text-sky-700' },
    ];

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        H
                    </div>
                    <span className="text-2xl font-outfit font-extrabold tracking-tight gradient-text">
                        Heritage Farm
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                        {i18n.language === 'en' ? 'தமிழ்' : 'English'}
                    </button>
                    <button className="text-slate-600 font-medium hover:text-primary-600 transition-colors">
                        {t('login')}
                    </button>
                    <button className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold premium-shadow hover:bg-primary-700 transition-all active:scale-95">
                        {t('signup')}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
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
                        className="text-6xl md:text-7xl font-outfit font-black leading-tight max-w-4xl"
                    >
                        Connect with the <span className="gradient-text">Soul of the Soil</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 max-w-2xl leading-relaxed"
                    >
                        {t('discovery')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4 pt-4"
                    >
                        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 premium-shadow hover:bg-slate-800 transition-all active:scale-95">
                            {t('explore')}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="bg-white px-8 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
                            {t('become_creator')}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Sector Grid */}
            <section className="px-6 py-20 bg-slate-100/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sectors.map((sector, index) => (
                        <motion.div
                            key={sector.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl premium-shadow border border-slate-100 hover:-translate-y-2 transition-transform cursor-pointer group"
                        >
                            <div className={`w-16 h-16 ${sector.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {sector.icon}
                            </div>
                            <h3 className="text-2xl font-outfit mb-4">{sector.title}</h3>
                            <p className="text-slate-500 mb-6">Experience the authentic life through curated journeys and local hospitality.</p>
                            <div className="flex items-center text-primary-600 font-bold gap-2">
                                View Experiences <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
