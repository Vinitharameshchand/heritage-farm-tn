import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, setAuthToken } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      handleOAuth(token);
    }
  }, []);

  const handleOAuth = async (token) => {
    try {
      await setAuthToken(token);
      navigate("/discover");
    } catch (err) {
      setError("OAuth verification failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/discover");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full relative z-10"
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
          <h2 className="text-5xl font-outfit font-black mb-4 text-white">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-lg font-medium">
            Continue your authentic journey across Tamil Nadu
          </p>
        </div>

        <div className="glass-card p-10 rounded-[48px] border-white/5 shadow-2xl">
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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full pl-14 pr-5 py-5 bg-white/5 rounded-3xl border border-white/5 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 text-white font-medium transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-5 bg-white/5 rounded-3xl border border-white/5 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 text-white font-medium transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-2">
              <input
                type="checkbox"
                id="remember"
                className="w-5 h-5 rounded-lg bg-white/5 border-white/10 text-emerald-500 focus:ring-emerald-500/20"
              />
              <label
                htmlFor="remember"
                className="text-sm font-bold text-slate-400 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-20 btn-primary text-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Decrypting Access..." : "Sign In to Dashboard"}
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f172a] px-2 text-slate-500 font-bold tracking-widest">
                  Or Secure Link
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all font-bold text-slate-200"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Explore with Google
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold mb-4">
              Uncharted territory?
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-emerald-500 font-black uppercase tracking-[0.2em] text-sm hover:gap-4 transition-all"
            >
              Create New Identity <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex justify-center items-center gap-3 text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-500/40" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            End-to-End Encrypted Session
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
