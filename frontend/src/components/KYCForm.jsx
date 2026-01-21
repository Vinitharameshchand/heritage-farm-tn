import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Upload,
    User,
    FileText,
    MapPin,
    CheckCircle,
    X,
    Loader2,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import api from '../services/api';

const KYCForm = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: '',
        gstNumber: '',
        address: '',
        identityProof: null,
        addressProof: null
    });

    const handleFileChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call for KYC
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            // await api.post('/auth/kyc', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            onComplete();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl w-full">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Identity Verification
                </div>
                <h2 className="text-3xl font-outfit font-black text-white mb-2">Creator Onboarding</h2>
                <p className="text-slate-500 text-sm">Verify your details to start hosting experiences.</p>
            </div>

            <div className="glass-card p-10 rounded-[40px] border-white/5 shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Business / Individual Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-5 py-4 bg-white/5 rounded-2xl border border-white/5 focus:outline-none focus:border-emerald-500/50 text-white text-sm"
                                        placeholder="Full Legal Name"
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">GST / Tax ID (Optional)</label>
                                <div className="relative group">
                                    <FileText className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500" />
                                    <input
                                        type="text"
                                        className="w-full pl-12 pr-5 py-4 bg-white/5 rounded-2xl border border-white/5 focus:outline-none focus:border-emerald-500/50 text-white text-sm"
                                        placeholder="Tax Identification Number"
                                        value={formData.gstNumber}
                                        onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.businessName}
                                className="w-full btn-primary py-4 rounded-3xl flex items-center justify-center gap-2 font-bold disabled:opacity-50"
                            >
                                Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Identity Proof (Aadhaar/PAN)</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/50 transition-all group relative overflow-hidden">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'identityProof')}
                                        />
                                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                                        <p className="text-xs font-bold text-slate-400">
                                            {formData.identityProof ? formData.identityProof.name : 'Click to upload Identity Proof'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Address Proof</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/50 transition-all group relative overflow-hidden">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'addressProof')}
                                        />
                                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                                        <p className="text-xs font-bold text-slate-400">
                                            {formData.addressProof ? formData.addressProof.name : 'Click to upload Address Proof'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-3xl font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.identityProof || !formData.addressProof}
                                    className="flex-[2] btn-primary py-4 rounded-3xl flex items-center justify-center gap-2 font-bold disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Submission'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default KYCForm;
