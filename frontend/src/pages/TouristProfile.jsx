import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Phone,
  Heart,
  Award,
  Download,
  Share2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Droplets,
  Languages,
  BadgeCheck,
  Star,
  Sparkles,
  MapPin,
  Zap,
  Crown,
  Leaf,
  Landmark,
  Mountain,
  ChevronRight,
  Plus,
  Camera,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import QRCode from "react-qr-code";

const TouristProfile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const qrRef = useRef(null);

  const [activeTab, setActiveTab] = useState("safety");
  const [showQR, setShowQR] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "Heritage Explorer",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bloodGroup: "O+",
    emergencyContact1: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      relation: "Spouse",
    },
    emergencyContact2: {
      name: "Raj Kumar",
      phone: "+91 87654 32109",
      relation: "Father",
    },
    medicalConditions: "",
    allergies: "Peanuts",
    languages: ["English", "Tamil", "Hindi"],
    idVerified: true,
    insuranceActive: false,
  });

  const [stats] = useState({
    experiencesCompleted: 12,
    districtsVisited: 5,
    totalHours: 48,
    rating: 4.9,
    badges: ["Heritage Explorer", "Culture Champion", "Eco Warrior"],
    tier: "Gold",
    xp: 2450,
    nextTierXp: 3000,
  });

  const tierConfig = {
    Bronze: { color: "#CD7F32", icon: "🥉", next: "Silver" },
    Silver: { color: "#C0C0C0", icon: "🥈", next: "Gold" },
    Gold: { color: "#FFD700", icon: "👑", next: "Platinum" },
    Platinum: { color: "#E5E4E2", icon: "💎", next: null },
  };

  const categoryBadges = [
    { id: "agri", icon: Leaf, label: "Agri Explorer", count: 4, emoji: "🌾" },
    {
      id: "heritage",
      icon: Landmark,
      label: "Heritage Seeker",
      count: 5,
      emoji: "🏛️",
    },
    {
      id: "eco",
      icon: Mountain,
      label: "Eco Adventurer",
      count: 3,
      emoji: "🏔️",
    },
  ];

  const profileUrl = `${window.location.origin}/verify/${user?._id || "demo"}`;

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = 400;
        canvas.height = 500;
        ctx.fillStyle = "#46041F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 50, 50, 300, 300);
        ctx.fillStyle = "#FFD595";
        ctx.font = "bold 24px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(profileData.name, 200, 400);
        ctx.font = "16px system-ui";
        ctx.fillStyle = "#ffffff80";
        ctx.fillText("Heritage Farm TN", 200, 430);
        ctx.fillText(`${stats.tier} Member`, 200, 460);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "heritage-farm-tourist-card.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Heritage Farm TN Tourist Card",
        text: "View my verified tourist profile",
        url: profileUrl,
      });
    } else {
      navigator.clipboard.writeText(profileUrl);
    }
  };

  const xpProgress = (stats.xp / stats.nextTierXp) * 100;

  return (
    <div className="min-h-screen bg-[#46041F] text-white">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#FFD595]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FFD595]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD595]/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section - Profile Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="relative bg-gradient-to-r from-[#FFD595]/10 via-transparent to-[#FFD595]/5 rounded-[3rem] p-8 md:p-12 overflow-hidden border border-[#FFD595]/20">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FFD595]/20 to-transparent rounded-bl-[10rem]" />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar with Tier Ring */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD595] to-[#FFD595]/50 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2rem] p-1"
                  style={{
                    background: `linear-gradient(135deg, ${tierConfig[stats.tier].color}, ${tierConfig[stats.tier].color}80)`,
                  }}
                >
                  <div className="w-full h-full rounded-[1.8rem] bg-[#46041F] flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 md:w-20 md:h-20 text-[#FFD595]/60" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-[#46041F] border-4 border-[#FFD595] flex items-center justify-center text-xl shadow-lg shadow-[#FFD595]/30">
                  {tierConfig[stats.tier].icon}
                </div>
                <button className="absolute -bottom-2 -left-2 w-10 h-10 rounded-xl bg-[#FFD595] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                  <Camera className="w-5 h-5 text-[#46041F]" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-5xl font-black jaro tracking-tight">
                    {profileData.name}
                  </h1>
                  {profileData.idVerified && (
                    <BadgeCheck className="w-8 h-8 text-[#FFD595]" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-white/60 mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Tamil Nadu, India
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#FFD595]" />
                    <span className="text-white font-bold">
                      {stats.rating}
                    </span>{" "}
                    rating
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Languages className="w-4 h-4" />
                    {profileData.languages.slice(0, 2).join(", ")}
                    {profileData.languages.length > 2 &&
                      ` +${profileData.languages.length - 2}`}
                  </span>
                </div>

                {/* XP Progress Bar */}
                <div className="max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#FFD595]">
                      {stats.tier} Member
                    </span>
                    <span className="text-xs text-white/50">
                      {stats.xp} / {stats.nextTierXp} XP
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#FFD595] to-[#FFD595]/50 rounded-full"
                    />
                  </div>
                  {tierConfig[stats.tier].next && (
                    <p className="text-xs text-white/40 mt-1">
                      {stats.nextTierXp - stats.xp} XP to{" "}
                      {tierConfig[stats.tier].next}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex lg:flex-col gap-3">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="px-6 py-4 bg-[#FFD595] hover:bg-[#FFD595]/90 rounded-2xl text-[#46041F] font-black transition-all flex items-center gap-2 shadow-lg shadow-[#FFD595]/20"
                >
                  <Sparkles className="w-5 h-5" />
                  My QR Card
                </button>
                <button
                  onClick={shareProfile}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all flex items-center gap-2 border border-white/10"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* QR Card Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-[#FFD595] to-[#FFD595]/80 p-1 rounded-[2rem] shadow-2xl max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#46041F] rounded-[1.8rem] p-8">
                  <div className="text-center mb-6">
                    <p className="text-xs font-black uppercase tracking-widest text-[#FFD595]/60 mb-1">
                      Heritage Farm TN
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      {profileData.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 bg-[#FFD595]/20 rounded-full">
                      <span className="text-lg">
                        {tierConfig[stats.tier].icon}
                      </span>
                      <span className="text-sm font-bold text-[#FFD595]">
                        {stats.tier} Member
                      </span>
                    </div>
                  </div>

                  <div ref={qrRef} className="bg-white p-6 rounded-2xl mb-6">
                    <QRCode
                      value={profileUrl}
                      size={200}
                      fgColor="#46041F"
                      bgColor="#ffffff"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#FFD595]">
                        {stats.experiencesCompleted}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase">
                        Experiences
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#FFD595]">
                        {stats.districtsVisited}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase">
                        Districts
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#FFD595]">
                        {stats.rating}
                      </div>
                      <div className="text-[10px] text-white/50 uppercase">
                        Rating
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={downloadQR}
                    className="w-full py-4 bg-[#FFD595] rounded-2xl text-[#46041F] font-black flex items-center justify-center gap-2 hover:bg-[#FFD595]/90 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    Download Card
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row - Bento Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              value: stats.experiencesCompleted,
              label: "Experiences",
              icon: Sparkles,
              accent: true,
            },
            { value: stats.districtsVisited, label: "Districts", icon: MapPin },
            { value: `${stats.totalHours}h`, label: "Total Hours", icon: Zap },
            { value: stats.rating, label: "Rating", icon: Star, suffix: "/5" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.02] ${
                stat.accent
                  ? "bg-gradient-to-br from-[#FFD595]/20 to-[#FFD595]/5 border-[#FFD595]/30"
                  : "bg-white/5 border-white/10 hover:border-[#FFD595]/20"
              }`}
            >
              <stat.icon
                className={`w-6 h-6 mb-4 ${stat.accent ? "text-[#FFD595]" : "text-white/40"}`}
              />
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-4xl font-black ${stat.accent ? "text-[#FFD595]" : "text-white"}`}
                >
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-white/40 text-sm">{stat.suffix}</span>
                )}
              </div>
              <p className="text-white/50 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-2xl">
              {[
                { id: "safety", label: "Safety Info", icon: Shield },
                { id: "badges", label: "Badges", icon: Award },
                {
                  id: "verification",
                  label: "Verification",
                  icon: CheckCircle2,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-[#FFD595] text-[#46041F]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "safety" && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Medical Quick Access */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-[#FFD595]/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-black flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFD595]/20 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-[#FFD595]" />
                        </div>
                        Medical Info
                      </h3>
                      <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                        <Edit3 className="w-5 h-5 text-[#FFD595]" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Blood Group - Highlighted */}
                      <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#FFD595]/30 to-[#FFD595]/10 rounded-2xl p-5 border border-[#FFD595]/40 relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-4xl opacity-20">
                          🩸
                        </div>
                        <Droplets className="w-6 h-6 text-[#FFD595] mb-3" />
                        <p className="text-xs font-bold text-[#FFD595] uppercase tracking-wider mb-1">
                          Blood Group
                        </p>
                        <p className="text-3xl font-black text-white">
                          {profileData.bloodGroup}
                        </p>
                      </div>

                      {/* Other Medical Info */}
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <AlertCircle className="w-5 h-5 text-white/40 mb-3" />
                        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                          Allergies
                        </p>
                        <p className="text-white font-bold">
                          {profileData.allergies || "None"}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <Heart className="w-5 h-5 text-white/40 mb-3" />
                        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                          Conditions
                        </p>
                        <p className="text-white font-bold">
                          {profileData.medicalConditions || "None"}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <Shield className="w-5 h-5 text-white/40 mb-3" />
                        <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                          Insurance
                        </p>
                        <p
                          className={`font-bold ${profileData.insuranceActive ? "text-[#FFD595]" : "text-white/40"}`}
                        >
                          {profileData.insuranceActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-black flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFD595]/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#FFD595]" />
                        </div>
                        Emergency Contacts
                      </h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#FFD595]/10 rounded-xl text-[#FFD595] font-bold text-sm hover:bg-[#FFD595]/20 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        profileData.emergencyContact1,
                        profileData.emergencyContact2,
                      ].map((contact, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl border ${
                            idx === 0
                              ? "bg-[#FFD595]/10 border-[#FFD595]/30"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-xs font-black uppercase tracking-wider ${idx === 0 ? "text-[#FFD595]" : "text-white/40"}`}
                            >
                              {idx === 0 ? "Primary" : "Secondary"}
                            </span>
                            <span className="text-xs text-white/40">
                              {contact.relation}
                            </span>
                          </div>
                          <p className="font-bold text-white text-lg mb-1">
                            {contact.name || "Not set"}
                          </p>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-2 text-white/60 hover:text-[#FFD595] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {contact.phone || "Add phone"}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "badges" && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Category Badges */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10">
                    <h3 className="text-xl font-black flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#FFD595]/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#FFD595]" />
                      </div>
                      Category Progress
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {categoryBadges.map((badge) => (
                        <div
                          key={badge.id}
                          className="relative group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#FFD595]/30 transition-all hover:bg-white/10 cursor-pointer"
                        >
                          <div className="text-4xl mb-4">{badge.emoji}</div>
                          <h4 className="font-bold text-white mb-1">
                            {badge.label}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-[#FFD595]">
                              {badge.count}
                            </span>
                            <span className="text-white/40 text-sm">
                              completed
                            </span>
                          </div>
                          <ChevronRight className="absolute top-6 right-4 w-5 h-5 text-white/20 group-hover:text-[#FFD595] transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10">
                    <h3 className="text-lg font-black text-white/60 mb-4">
                      Achievements Unlocked
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {stats.badges.map((badge, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#FFD595]/20 to-[#FFD595]/5 rounded-full border border-[#FFD595]/30"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#FFD595]" />
                          <span className="font-bold text-[#FFD595]">
                            {badge}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "verification" && (
                <motion.div
                  key="verification"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Verification Status Cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div
                      className={`p-6 rounded-2xl border ${
                        profileData.idVerified
                          ? "bg-[#FFD595]/10 border-[#FFD595]/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            profileData.idVerified
                              ? "bg-[#FFD595]/20"
                              : "bg-white/10"
                          }`}
                        >
                          {profileData.idVerified ? (
                            <CheckCircle2 className="w-7 h-7 text-[#FFD595]" />
                          ) : (
                            <AlertCircle className="w-7 h-7 text-white/40" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-white text-lg">
                            ID Verification
                          </h4>
                          <p
                            className={`text-sm ${profileData.idVerified ? "text-[#FFD595]" : "text-white/40"}`}
                          >
                            {profileData.idVerified
                              ? "Verified with Aadhaar"
                              : "Not verified"}
                          </p>
                        </div>
                      </div>
                      {!profileData.idVerified && (
                        <button className="w-full py-3 bg-[#FFD595] rounded-xl text-[#46041F] font-black hover:bg-[#FFD595]/90 transition-colors">
                          Verify Now
                        </button>
                      )}
                    </div>

                    <div
                      className={`p-6 rounded-2xl border ${
                        profileData.insuranceActive
                          ? "bg-[#FFD595]/10 border-[#FFD595]/30"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            profileData.insuranceActive
                              ? "bg-[#FFD595]/20"
                              : "bg-white/10"
                          }`}
                        >
                          <Shield
                            className={`w-7 h-7 ${profileData.insuranceActive ? "text-[#FFD595]" : "text-white/40"}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-white text-lg">
                            Travel Insurance
                          </h4>
                          <p
                            className={`text-sm ${profileData.insuranceActive ? "text-[#FFD595]" : "text-white/40"}`}
                          >
                            {profileData.insuranceActive
                              ? "Active Coverage"
                              : "Not activated"}
                          </p>
                        </div>
                      </div>
                      {!profileData.insuranceActive && (
                        <button className="w-full py-3 bg-[#FFD595] rounded-xl text-[#46041F] font-black hover:bg-[#FFD595]/90 transition-colors">
                          Activate ₹99/year
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10">
                    <h3 className="text-lg font-black text-white mb-4">
                      Trust Score
                    </h3>
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-white/10"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#FFD595"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={`${(85 / 100) * 251} 251`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-black text-[#FFD595]">
                            85
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60 text-sm mb-2">
                          Based on your verification status, booking history,
                          and reviews
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#FFD595]" />
                            <span className="text-white/60">
                              ID Verified (+30)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#FFD595]" />
                            <span className="text-white/60">
                              {stats.experiencesCompleted} Experiences (+
                              {stats.experiencesCompleted * 3})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#FFD595]" />
                            <span className="text-white/60">
                              Excellent Rating (+{Math.round(stats.rating * 4)})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            {/* Quick Dial */}
            <div className="bg-gradient-to-br from-[#FFD595]/20 to-[#FFD595]/5 rounded-[2rem] p-6 border border-[#FFD595]/30">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#FFD595] mb-4">
                Emergency Dial
              </h3>
              <div className="space-y-3">
                {[
                  { num: "100", label: "Police", emoji: "🚔" },
                  { num: "108", label: "Ambulance", emoji: "🚑" },
                  { num: "181", label: "Women Helpline", emoji: "💜" },
                ].map((item) => (
                  <a
                    key={item.num}
                    href={`tel:${item.num}`}
                    className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="font-black text-white text-lg group-hover:text-[#FFD595] transition-colors">
                        {item.num}
                      </p>
                      <p className="text-xs text-white/50">{item.label}</p>
                    </div>
                    <Phone className="w-5 h-5 text-white/30 group-hover:text-[#FFD595] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/10 rounded-xl text-white font-bold text-sm"
                  >
                    {lang}
                  </span>
                ))}
                <button className="px-4 py-2 bg-[#FFD595]/10 rounded-xl text-[#FFD595] font-bold text-sm border border-dashed border-[#FFD595]/30 hover:bg-[#FFD595]/20 transition-colors">
                  + Add
                </button>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-[#FFD595]" />
                <h3 className="text-sm font-black uppercase tracking-widest text-white/40">
                  {stats.tier} Benefits
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  "Priority booking access",
                  "10% discount on experiences",
                  "Free cancellation",
                  "Exclusive host access",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD595]" />
                    <span className="text-white/70">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristProfile;
