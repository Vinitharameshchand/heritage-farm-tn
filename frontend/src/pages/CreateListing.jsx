import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Calendar,
    Users,
    Image as ImageIcon,
    Type,
    FileText,
    इंडियनRupee,
    Shield,
    Upload,
    X,
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const CreateListing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'AgriRural',
        price: '',
        capacity: '',
        duration: '',
        location: {
            city: '',
            district: '',
            state: 'Tamil Nadu'
        },
        images: [],
        safetyInfo: ['Full COVID-19 safety measures', 'Professional guides'],
        inclusions: ['Local lunch', 'Welcome drink', 'Translation services'],
        difficulty: 'Easy'
    });

    useEffect(() => {
        if (isEdit) {
            fetchListing();
        }
    }, [id]);

    const fetchListing = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/listings/${id}`);
            setFormData(response.data.data);
        } catch (error) {
            console.error('Error fetching listing:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const uploadFormData = new FormData();
        files.forEach(file => uploadFormData.append('images', file));

        try {
            setUploading(true);
            const response = await api.post('/upload', uploadFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...response.data.data]
            }));
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEdit) {
                await api.put(`/listings/${id}`, formData);
            } else {
                await api.post('/listings', formData);
            }
            navigate('/creator/dashboard');
        } catch (error) {
            console.error('Form submission failed:', error);
            alert('Failed to save listing. Please check all fields.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const categories = ['AgriRural', 'HeritageCulture', 'EcoAdventure'];
    const districts = ['Madurai', 'Tanjavur', 'Coimbatore', 'Chennai', 'Salem', 'Tirunelveli', 'Nilgiris', 'Pudukkottai'];

    if (loading && isEdit) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h1 className="text-4xl font-outfit font-black">
                    {isEdit ? 'Edit' : 'Curate'} <span className="gradient-text">Experience</span>
                </h1>
                <p className="text-slate-500 mt-2">Design an authentic journey for Tamil Nadu guests.</p>
            </div>

            {/* Stepper */}
            <div className="flex gap-2 mb-12">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/5'}`}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
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
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Type className="w-4 h-4" /> Experience Title
                                </label>
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Traditional Pottery in Madurai"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Experience Type
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Experience Difficulty
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Challenging">Challenging</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Story / Description
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="5"
                                    placeholder="Tell the story behind this experience..."
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium resize-none"
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        District / Location
                                    </label>
                                    <select
                                        required
                                        name="location.district"
                                        value={formData.location.district}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Village / City
                                    </label>
                                    <input
                                        required
                                        name="location.city"
                                        value={formData.location.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Alanganallur"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Price (₹ per guest)
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Experience Duration (hours)
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 3"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        Max Guests / Group
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Visual Gallery
                                </label>

                                <div className="grid grid-cols-3 gap-4">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.images.length < 5 && (
                                        <label className="aspect-square border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-emerald-500/50 transition-all group">
                                            <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                                            {uploading ? (
                                                <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                            ) : (
                                                <>
                                                    <Upload className="w-6 h-6 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                                                    <span className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-tighter">Add Photo</span>
                                                </>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-12"
                        >
                            <div className="p-8 bg-emerald-500/10 rounded-[32px] border border-emerald-500/20 text-center">
                                <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Ready to Publish?</h3>
                                <p className="text-slate-400">By publishing, you agree to our heritage conservation and fair revenue sharing policies.</p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Preview Summary</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-4 bg-white/5 rounded-2xl">
                                        <p className="text-slate-500 mb-1">Price</p>
                                        <p className="font-bold text-lg">₹{formData.price} / guest</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl">
                                        <p className="text-slate-500 mb-1">Capacity</p>
                                        <p className="font-bold text-lg">{formData.capacity} Guests</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/10">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors py-2 px-4 font-bold text-sm"
                        >
                            <ChevronLeft className="w-5 h-5" /> Previous
                        </button>
                    )}
                    <div className="flex-1" />
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="btn-primary flex items-center gap-3 py-4 px-10 shadow-lg"
                        >
                            Next Module <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="btn-primary flex items-center gap-3 py-4 px-12 shadow-emerald-500/30 shadow-2xl disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isEdit ? 'Update Experience' : 'Publish Experience')}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateListing;
