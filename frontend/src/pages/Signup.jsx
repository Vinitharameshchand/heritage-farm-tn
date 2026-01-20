import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
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
            setError(err.response?.data?.message || 'Error creating account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            H
                        </div>
                        <span className="text-2xl font-outfit font-extrabold tracking-tight gradient-text">
                            Heritage Farm
                        </span>
                    </Link>
                    <h2 className="text-3xl font-outfit font-black mb-2">Create Account</h2>
                    <p className="text-slate-500">Join our community of explorers and creators</p>
                </div>

                <div className="bg-white p-8 rounded-[32px] premium-shadow border border-slate-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'tourist' })}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'tourist'
                                        ? 'border-primary-600 bg-primary-50/50'
                                        : 'border-slate-100 hover:border-slate-200 bg-white'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl ${formData.role === 'tourist' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    <UserPlus className="w-5 h-5" />
                                </div>
                                <span className={`font-bold text-sm ${formData.role === 'tourist' ? 'text-primary-700' : 'text-slate-500'}`}>Explore Activities</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'creator' })}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'creator'
                                        ? 'border-heritage-600 bg-heritage-50/50'
                                        : 'border-slate-100 hover:border-slate-200 bg-white'
                                    }`}
                            >
                                <div className={`p-2 rounded-xl ${formData.role === 'creator' ? 'bg-heritage-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className={`font-bold text-sm ${formData.role === 'creator' ? 'text-heritage-700' : 'text-slate-500'}`}>Host Experiences</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Choose Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    placeholder="At least 6 characters"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 px-1">
                            By creating an account, you agree to our <a href="#" className="text-primary-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 font-bold hover:underline">Privacy Policy</a>.
                        </p>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-14 ${formData.role === 'creator' ? 'bg-heritage-600 hover:bg-heritage-700' : 'bg-slate-900 hover:bg-slate-800'} text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100`}
                        >
                            {isLoading ? 'Creating Account...' : 'Get Started'}
                            {!isLoading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-bold hover:underline">Sign In</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
