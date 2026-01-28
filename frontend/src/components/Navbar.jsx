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
  Camera,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ta" : "en");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isLangDropdownOpen && !e.target.closest("[data-lang-dropdown]")) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isLangDropdownOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#46041F] border-b border-amber-500/20 px-6 py-3 shadow-xl backdrop-blur-xl">
      <div className="absolute inset-y-0 top-2 left-0 w-40 ">
        <img src="/left.svg" alt="decorative left" className="h-full" />
      </div>
      <div className="absolute inset-y-0 top-2 -right-32 w-40">
        <img src="/right.svg" alt="decorative left" className="h-full" />
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <Link to="/" className="flex items-center -gap-10 group">
          <span className="text-2xl jaro font-bold tracking-tight text-white">
            Heritage Farm
          </span>
          <div className="  transition-transform group-hover:rotate-[20deg]">
            <img
              src="/temple.svg"
              alt="decorative left"
              className="h-14 w-auto"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/planner"
            className="text-slate-300 font-semibold hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {t("ai_planner")}
          </Link>

          <Link
            to="/discover"
            className="text-slate-300 font-semibold hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            {t("explore_nav")}
          </Link>

          <Link
            to="/ar-explorer"
            className="text-slate-300 font-semibold hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Map View
          </Link>

          <div className="relative" data-lang-dropdown>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase">
                {i18n.language}
              </span>
              <svg
                className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-amber-500/30 rounded-lg shadow-xl z-50 min-w-max">
                <button
                  onClick={() => {
                    i18n.changeLanguage("en");
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center gap-2 ${
                    i18n.language === "en"
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-slate-300 hover:text-amber-400"
                  }`}
                >
                  <span className="text-lg">🇬🇧</span>
                  {t("english")}
                </button>
                <button
                  onClick={() => {
                    i18n.changeLanguage("ta");
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center gap-2 border-t border-slate-700 ${
                    i18n.language === "ta"
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-slate-300 hover:text-amber-400"
                  }`}
                >
                  <span className="text-lg">🇮🇳</span>
                  {t("tamil")}
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "tourist" && (
                <Link
                  to="/my-bookings"
                  className="text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  {t("my_bookings")}
                </Link>
              )}
              {user.role === "creator" && (
                <Link
                  to="/creator/dashboard"
                  className="text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t("dashboard")}
                </Link>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-amber-500/50 hover:scale-105 transition-all active:scale-95 text-sm"
              >
                {t("get_started")}
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-amber-400 transition-colors"
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
            className="md:hidden bg-slate-900 border-t border-amber-500/20 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <Link
                to="/planner"
                className="text-lg font-bold text-slate-300 hover:text-amber-400 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                {t("ai_planner")}
              </Link>
              <Link
                to="/discover"
                className="text-lg font-bold text-slate-300 hover:text-amber-400 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Compass className="w-5 h-5" />
                {t("explore_nav")}
              </Link>
              <Link
                to="/ar-explorer"
                className="text-lg font-bold text-slate-300 hover:text-amber-400 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Camera className="w-5 h-5" />
                Map View
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 text-lg font-bold text-slate-300 hover:text-amber-400 w-full"
                >
                  <Globe className="w-5 h-5" />
                  <span>
                    {i18n.language === "en" ? t("english") : t("tamil")}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-amber-500/30 rounded-lg shadow-xl z-50 min-w-max">
                    <button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center gap-2 ${
                        i18n.language === "en"
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-slate-300 hover:text-amber-400"
                      }`}
                    >
                      <span className="text-lg">🇬🇧</span>
                      {t("english")}
                    </button>
                    <button
                      onClick={() => {
                        i18n.changeLanguage("ta");
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-semibold flex items-center gap-2 border-t border-slate-700 ${
                        i18n.language === "ta"
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-slate-300 hover:text-amber-400"
                      }`}
                    >
                      <span className="text-lg">🇮🇳</span>
                      {t("tamil")}
                    </button>
                  </div>
                )}
              </div>
              {user ? (
                <>
                  {user.role === "tourist" && (
                    <Link
                      to="/my-bookings"
                      className="text-lg font-bold text-slate-300 hover:text-amber-400 flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Calendar className="w-5 h-5" />
                      {t("my_bookings")}
                    </Link>
                  )}
                  {user.role === "creator" && (
                    <Link
                      to="/creator/dashboard"
                      className="text-lg font-bold text-slate-300 hover:text-amber-400 flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      {t("dashboard")}
                    </Link>
                  )}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                      {t("my_account")}
                    </div>
                    <div className="text-xl font-bold text-white mb-4">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 font-bold flex items-center gap-2 hover:text-red-300"
                    >
                      <LogOut className="w-5 h-5" /> {t("sign_out")}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-700">
                  <Link
                    to="/signup"
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 text-center rounded-full font-bold shadow-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("join_heritage_farm")}
                  </Link>

                  <Link
                    to="/login"
                    className="w-full py-4 border border-slate-200 text-center rounded-2xl font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("sign_in")}
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
