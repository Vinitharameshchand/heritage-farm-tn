import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Award,
  Download,
  Share2,
  QrCode,
  Camera,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Droplets,
  Languages,
  BadgeCheck,
  Star,
  Compass,
  Mountain,
  Landmark,
  Leaf,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import QRCode from "react-qr-code";

const TouristProfile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const qrRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Heritage Explorer",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bloodGroup: "O+",
    emergencyContact1: { name: "", phone: "", relation: "" },
    emergencyContact2: { name: "", phone: "", relation: "" },
    medicalConditions: "",
    allergies: "",
    languages: ["English", "Tamil"],
    idVerified: false,
    insuranceActive: false,
  });

  const [stats, setStats] = useState({
    experiencesCompleted: 12,
    districtsVisited: 5,
    totalHours: 48,
    rating: 4.9,
    badges: ["Heritage Explorer", "Culture Champion", "Eco Warrior"],
    tier: "Gold",
  });

  const tierColors = {
    Bronze: "from-amber-700 to-amber-900",
    Silver: "from-gray-400 to-gray-600",
    Gold: "from-yellow-400 to-amber-500",
    Platinum: "from-purple-400 to-indigo-500",
  };

  const categoryBadges = [
    {
      id: "agri",
      icon: Leaf,
      label: "Agri Explorer",
      count: 4,
      color: "bg-green-500",
    },
    {
      id: "heritage",
      icon: Landmark,
      label: "Heritage Seeker",
      count: 5,
      color: "bg-amber-500",
    },
    {
      id: "eco",
      icon: Mountain,
      label: "Eco Adventurer",
      count: 3,
      color: "bg-blue-500",
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
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "#46041F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
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
      alert("Profile link copied!");
    }
  };

  return (
    <div className="min-h-screen bg-[#46041F] text-white pt-24 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#FFD595]/30 rounded-full text-[#FFD595] font-bold text-sm mb-6"
          >
            <Shield className="w-4 h-4" />
            VERIFIED TOURIST PROFILE
          </motion.div>
          <h1 className="text-5xl font-bold jaro mb-4">
            Your Heritage <span className="text-[#FFD595]">Passport</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Your digital identity for safe and verified travel experiences
            across Tamil Nadu
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tourist Card */}
          <div className="lg:col-span-1">
            {/* Tourist Card Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-gradient-to-br ${tierColors[stats.tier]} p-1 rounded-[2rem] shadow-2xl mb-6`}
            >
              <div className="bg-[#46041F] rounded-[1.8rem] p-6 relative overflow-hidden">
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-40 h-40 border-[20px] border-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-[15px] border-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Card Header */}
                <div className="flex items-center justify-between mb-6 relative">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD595]/60">
                      Heritage Farm TN
                    </p>
                    <p className="text-xs font-bold text-white/60">
                      Tourist ID Card
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${tierColors[stats.tier]} text-[10px] font-black uppercase tracking-wider text-[#46041F]`}
                  >
                    {stats.tier} Member
                  </div>
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-[#FFD595]/20 flex items-center justify-center border-2 border-[#FFD595]/30">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <User className="w-10 h-10 text-[#FFD595]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white uppercase">
                      {profileData.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {profileData.idVerified && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <BadgeCheck className="w-4 h-4" />
                          Verified
                        </div>
                      )}
                      {profileData.insuranceActive && (
                        <div className="flex items-center gap-1 text-blue-400 text-xs">
                          <Shield className="w-4 h-4" />
                          Insured
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-[#FFD595]">
                      {stats.experiencesCompleted}
                    </div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">
                      Experiences
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-[#FFD595]">
                      {stats.districtsVisited}
                    </div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">
                      Districts
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-[#FFD595] flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {stats.rating}
                    </div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">
                      Rating
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div
                  ref={qrRef}
                  className="bg-white p-4 rounded-2xl flex items-center justify-center"
                >
                  <QRCode
                    value={profileUrl}
                    size={150}
                    fgColor="#46041F"
                    bgColor="#ffffff"
                  />
                </div>

                {/* Card Footer */}
                <div className="mt-4 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">
                    Scan to verify • Valid for 2026
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadQR}
                className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold transition-all border border-white/10"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={shareProfile}
                className="flex items-center justify-center gap-2 p-4 bg-[#FFD595] hover:bg-[#FFD595]/90 rounded-2xl text-[#46041F] font-bold transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Safety Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-[#FFD595]/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Safety Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <Edit3 className="w-5 h-5 text-[#FFD595]" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Blood Group */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-white/50 mb-2 block">
                    Blood Group
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Droplets className="w-6 h-6 text-red-400" />
                    <span className="text-xl font-black text-white">
                      {profileData.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-white/50 mb-2 block">
                    Languages
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Languages className="w-6 h-6 text-[#FFD595]" />
                    <span className="text-white font-bold">
                      {profileData.languages.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Medical Information - Enhanced */}
                <div className="md:col-span-2">
                  <label className="text-xs font-black uppercase tracking-wider text-white/50 mb-3 block">
                    Medical Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-bold text-red-400 uppercase">
                          Blood Group
                        </span>
                      </div>
                      <p className="text-xl font-black text-white">
                        {profileData.bloodGroup || "Not Set"}
                      </p>
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-bold text-orange-400 uppercase">
                          Allergies
                        </span>
                      </div>
                      <p className="text-sm text-white/70">
                        {profileData.allergies || "None listed"}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-400 uppercase">
                          Conditions
                        </span>
                      </div>
                      <p className="text-sm text-white/70">
                        {profileData.medicalConditions || "None listed"}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-blue-400 uppercase">
                          Insurance
                        </span>
                      </div>
                      <p className="text-sm text-white/70">
                        {profileData.insuranceActive ? (
                          <span className="text-green-400 font-bold">
                            Active ✓
                          </span>
                        ) : (
                          <span className="text-white/50">Not Active</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button className="mt-3 text-xs text-[#FFD595] hover:text-[#FFD595]/80 font-bold flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit Medical Info
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-red-500/20"
            >
              <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
                <Phone className="w-5 h-5 text-red-400" />
                Emergency Contacts
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <p className="text-xs font-black uppercase tracking-wider text-red-400/60 mb-2">
                    Primary Contact
                  </p>
                  <input
                    type="text"
                    placeholder="Contact Name"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 mb-2 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact1.name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact1: {
                          ...profileData.emergencyContact1,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 mb-2 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact1.phone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact1: {
                          ...profileData.emergencyContact1,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Relation (e.g., Spouse, Parent)"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact1.relation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact1: {
                          ...profileData.emergencyContact1,
                          relation: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs font-black uppercase tracking-wider text-white/40 mb-2">
                    Secondary Contact
                  </p>
                  <input
                    type="text"
                    placeholder="Contact Name"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 mb-2 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact2.name}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact2: {
                          ...profileData.emergencyContact2,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 mb-2 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact2.phone}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact2: {
                          ...profileData.emergencyContact2,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Relation"
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:border-[#FFD595]"
                    value={profileData.emergencyContact2.relation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        emergencyContact2: {
                          ...profileData.emergencyContact2,
                          relation: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </motion.div>

            {/* Experience Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-[#FFD595]/20"
            >
              <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-[#FFD595]" />
                Experience Badges
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {categoryBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-14 h-14 ${badge.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <badge.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-bold text-white text-sm">
                      {badge.label}
                    </p>
                    <p className="text-[#FFD595] font-black text-lg">
                      {badge.count}
                    </p>
                    <p className="text-white/40 text-xs">Completed</p>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="mt-6 flex flex-wrap gap-2">
                {stats.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FFD595]/10 rounded-full border border-[#FFD595]/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FFD595]" />
                    <span className="text-sm font-bold text-[#FFD595]">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-[#FFD595]/20"
            >
              <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#FFD595]" />
                Verification & Insurance
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-2xl border ${profileData.idVerified ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}
                >
                  <div className="flex items-center gap-3">
                    {profileData.idVerified ? (
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-yellow-400" />
                    )}
                    <div>
                      <p className="font-bold text-white">ID Verification</p>
                      <p
                        className={`text-sm ${profileData.idVerified ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {profileData.idVerified
                          ? "Verified with Aadhaar"
                          : "Pending Verification"}
                      </p>
                    </div>
                  </div>
                  {!profileData.idVerified && (
                    <button className="mt-3 w-full py-2 bg-[#FFD595] text-[#46041F] rounded-xl font-bold text-sm hover:bg-[#FFD595]/90 transition-colors">
                      Verify Now
                    </button>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border ${profileData.insuranceActive ? "bg-blue-500/10 border-blue-500/20" : "bg-white/5 border-white/10"}`}
                >
                  <div className="flex items-center gap-3">
                    {profileData.insuranceActive ? (
                      <CheckCircle2 className="w-8 h-8 text-blue-400" />
                    ) : (
                      <Shield className="w-8 h-8 text-white/40" />
                    )}
                    <div>
                      <p className="font-bold text-white">Travel Insurance</p>
                      <p
                        className={`text-sm ${profileData.insuranceActive ? "text-blue-400" : "text-white/40"}`}
                      >
                        {profileData.insuranceActive
                          ? "Active Coverage"
                          : "Not Activated"}
                      </p>
                    </div>
                  </div>
                  {!profileData.insuranceActive && (
                    <button className="mt-3 w-full py-2 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors">
                      Activate ₹99/year
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristProfile;
