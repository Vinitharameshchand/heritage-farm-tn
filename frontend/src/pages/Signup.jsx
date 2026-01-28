import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Signup = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'tourist'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(formData);
            navigate('/discover');
        } catch (err) {
            setError(err.response?.data?.message || t('error_creating_account'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full relative z-10"
            >
                <div className="text-center mb-12">
                    <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            H
                        </div>
                        <span className="text-3xl font-outfit font-black tracking-tighter text-white">
                            Heritage <span className="text-emerald-500 italic">Farm</span>
                        </span>
                    </Link>
                    <h2 className="text-5xl font-outfit font-black mb-4 text-white">{t('join_collective')}</h2>
                    <p className="text-slate-400 text-lg font-medium">{t('signup_description')}</p>
                </div>

                <div className="glass-card p-10 md:p-12 rounded-[48px] border-white/5 shadow-2xl">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-bold flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Role Selection */}
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">{t('identify_path')}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'tourist' })}
                                    className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 group ${formData.role === 'tourist'
                                        ? 'border-emerald-500 bg-emerald-500/10'
                                        : 'border-white/5 bg-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.role === 'tourist' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                                        <UserPlus className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-black text-sm uppercase tracking-wider ${formData.role === 'tourist' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{t('tourist')}</div>
                                        <div className="text-[10px] text-slate-600 font-bold uppercase mt-1">{t('discover_experiences')}</div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'creator' })}
                                    className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 group ${formData.role === 'creator'
                                        ? 'border-emerald-500 bg-emerald-500/10'
                                        : 'border-white/5 bg-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.role === 'creator' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-500 group-hover:text-slate-300'}`}>
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <div className={`font-black text-sm uppercase tracking-wider ${formData.role === 'creator' ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{t('creator')}</div>
                                        <div className="text-[10px] text-slate-600 font-bold uppercase mt-1">{t('host_earn')}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">{t('full_name')}</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder={t('full_name_placeholder')}
                                        className="w-full pl-14 pr-5 py-5 bg-white/5 rounded-3xl border border-white/5 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 text-white font-medium transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">{t('email_address')}</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder={t('email_placeholder')}
                                        className="w-full pl-14 pr-5 py-5 bg-white/5 rounded-3xl border border-white/5 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 text-white font-medium transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">{t('choose_secret_phrase')}</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-5 py-5 bg-white/5 rounded-3xl border border-white/5 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 text-white font-medium transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-20 btn-primary text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? t('creating_identity') : t('initialize_account')}
                            {!isLoading && <ArrowRight className="w-6 h-6" />}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-slate-500 font-bold mb-4">{t('already_member')}</p>
                        <Link to="/login" className="inline-flex items-center gap-2 text-emerald-500 font-black uppercase tracking-[0.2em] text-sm hover:gap-4 transition-all">
                            {t('access_dashboard')} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <p className="mt-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] max-w-md mx-auto leading-loose">
                    {t('terms_agreement')} <span className="text-slate-400">{t('terms_of_service')}</span> {t('and')} <span className="text-slate-400">{t('governance_protocol')}</span>.
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;

