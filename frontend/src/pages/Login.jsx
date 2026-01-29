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
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
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
      setError(t("oauth_failed"));
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
      setError(err.response?.data?.message || t("invalid_login"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#46041F] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-y-0 top-2 left-0 w-40 ">
        <img src="/left.svg" alt="decorative left" className="h-full" />
      </div>
      <div className="absolute inset-y-0 top-2 right-0 w-40">
        <img src="/right.svg" alt="decorative left" className="h-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full relative z-10"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-0 mb-8 group">
            <span className="text-3xl jaro font-bold tracking-tighter text-white">
              Heritage <span className="text-[#FFD595] italic">Farm</span>
            </span>
            <div className="transition-transform group-hover:rotate-[20deg]">
              <img
                src="/temple.svg"
                alt="decorative left"
                className="h-14 w-auto"
              />
            </div>
          </Link>
          <h2 className="text-5xl jaro font-bold mb-4 text-white">
            {t("welcome_back")}
          </h2>
          <p className="text-white/70 text-lg font-medium">
            {t("login_description")}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-[#FFD595]/20 p-10 rounded-[48px] shadow-2xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-5 bg-red-500/20 border border-red-500/40 text-red-300 rounded-2xl text-sm font-bold flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60 ml-2">
                {t("email_address")}
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-[#FFD595] transition-colors" />
                <input
                  type="email"
                  required
                  placeholder={t("email_placeholder")}
                  className="w-full pl-14 pr-5 py-5 bg-white/5 rounded-3xl border border-[#FFD595]/20 focus:outline-none focus:border-[#FFD595] focus:bg-white/10 text-white font-medium transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
                  {t("password")}
                </label>
                <a
                  href="#"
                  className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD595] hover:text-[#FFD595]/80 transition-colors"
                >
                  {t("forgot")}
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-[#FFD595] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-5 bg-white/5 rounded-3xl border border-[#FFD595]/20 focus:outline-none focus:border-[#FFD595] focus:bg-white/10 text-white font-medium transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
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
                {t("remember_me")}
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-20 bg-[#FFD595] hover:bg-[#FFD595]/80 text-[#46041F] rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all disabled:opacity-50"
            >
              {isLoading ? t("decrypting_access") : t("sign_in_dashboard")}
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f172a] px-2 text-slate-500 font-bold tracking-widest">
                  {t("or_secure_link")}
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
              {t("explore_google")}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/60 font-bold mb-4">
              {t("uncharted_territory")}
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-[#FFD595] font-black uppercase tracking-[0.2em] text-sm hover:gap-4 transition-all"
            >
              {t("create_new_identity")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex justify-center items-center gap-3 text-white/40">
          <ShieldCheck className="w-5 h-5 text-[#FFD595]/60" />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            {t("encrypted_session")}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
