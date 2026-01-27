import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Globe,
  LogOut,
  LayoutDashboard,
  Compass,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ta" : "en");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-6 transition-transform">
            H
          </div>
          <span className="text-2xl font-outfit font-extrabold tracking-tight gradient-text">
            Heritage Farm
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/planner"
            className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            AI Planner
          </Link>

          <Link
            to="/discover"
            className="text-slate-400 font-semibold hover:text-emerald-500 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            Explore
          </Link>

          <div className="h-6 w-[1px] bg-slate-200"></div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-bold uppercase">{i18n.language}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-6">
              {user.role === "tourist" && (
                <Link
                  to="/my-bookings"
                  className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  My Bookings
                </Link>
              )}
              {user.role === "creator" && (
                <Link
                  to="/creator/dashboard"
                  className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-600 font-bold hover:text-primary-600 transition-colors px-4 py-2"
              >
                {t("login")}
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-6 py-2.5 rounded-2xl font-bold premium-shadow hover:bg-primary-700 transition-all active:scale-95 text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <Link
                to="/discover"
                className="text-lg font-bold text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-lg font-bold text-slate-600"
              >
                <Globe className="w-5 h-5" />
                Language: {i18n.language === "en" ? "English" : "தமிழ்"}
              </button>
              {user ? (
                <>
                  {user.role === "tourist" && (
                    <Link
                      to="/my-bookings"
                      className="text-lg font-bold text-emerald-600 flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Calendar className="w-5 h-5" />
                      My Bookings
                    </Link>
                  )}
                  {user.role === "creator" && (
                    <Link
                      to="/creator/dashboard"
                      className="text-lg font-bold text-emerald-600 flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                  )}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                      My Account
                    </div>
                    <div className="text-xl font-bold text-slate-900 mb-4">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-bold flex items-center gap-2"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                  <Link
                    to="/signup"
                    className="w-full py-4 bg-primary-600 text-white text-center rounded-2xl font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Heritage Farm
                  </Link>
                  <Link
                    to="/login"
                    className="w-full py-4 border border-slate-200 text-center rounded-2xl font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
