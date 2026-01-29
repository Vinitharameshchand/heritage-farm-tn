import React from "react";
import {
  Shield,
  Heart,
  Users,
  CheckCircle2,
  Star,
  BadgeCheck,
  Accessibility,
  Baby,
  Dog,
} from "lucide-react";

const SafetyBadges = ({
  listing,
  womenFriendly,
  verified,
  insured,
  firstAid,
  familyFriendly,
  accessibleFriendly,
  kidFriendly,
  petFriendly,
  size = "md",
}) => {
  const badges = [];

  const data = listing || {
    womenFriendly,
    verified,
    insured,
    firstAid,
    familyFriendly,
    accessibleFriendly,
    kidFriendly,
    petFriendly,
  };

  if (data?.womenFriendly) {
    badges.push({
      id: "women",
      label: "Women Friendly",
      labelTamil: "பெண்களுக்கு உகந்தது",
      icon: Heart,
      color: "bg-[#FFD595]",
      textColor: "text-[#46041F]",
    });
  }

  if (data?.verified) {
    badges.push({
      id: "verified",
      label: "Verified Host",
      labelTamil: "சரிபார்க்கப்பட்டது",
      icon: BadgeCheck,
      color: "bg-[#FFD595]/80",
      textColor: "text-[#46041F]",
    });
  }

  if (data?.insured) {
    badges.push({
      id: "insured",
      label: "Insured",
      labelTamil: "காப்பீடு",
      icon: Shield,
      color: "bg-[#FFD595]/60",
      textColor: "text-[#46041F]",
    });
  }

  if (data?.familyFriendly) {
    badges.push({
      id: "family",
      label: "Family Friendly",
      labelTamil: "குடும்பத்திற்கு உகந்தது",
      icon: Users,
      color: "bg-white/20",
      textColor: "text-white",
    });
  }

  if (data?.accessibleFriendly) {
    badges.push({
      id: "accessible",
      label: "Accessible",
      labelTamil: "அணுகக்கூடியது",
      icon: Accessibility,
      color: "bg-white/20",
      textColor: "text-white",
    });
  }

  if (data?.kidFriendly) {
    badges.push({
      id: "kids",
      label: "Kid Friendly",
      labelTamil: "குழந்தைகளுக்கு உகந்தது",
      icon: Baby,
      color: "bg-white/20",
      textColor: "text-white",
    });
  }

  if (data?.petFriendly) {
    badges.push({
      id: "pets",
      label: "Pet Friendly",
      labelTamil: "செல்லப்பிராணிகள்",
      icon: Dog,
      color: "bg-white/20",
      textColor: "text-white",
    });
  }

  if (badges.length === 0) return null;

  const sizeClasses = {
    sm: {
      container: "gap-1",
      badge: "px-2 py-1 text-[10px]",
      icon: "w-3 h-3",
    },
    md: {
      container: "gap-2",
      badge: "px-3 py-1.5 text-xs",
      icon: "w-4 h-4",
    },
    lg: {
      container: "gap-3",
      badge: "px-4 py-2 text-sm",
      icon: "w-5 h-5",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-wrap ${classes.container}`}>
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`flex items-center gap-1.5 ${classes.badge} ${badge.color} ${badge.textColor} rounded-full font-bold shadow-sm border border-[#FFD595]/20`}
          title={`${badge.label} - ${badge.labelTamil}`}
        >
          <badge.icon className={classes.icon} />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
};

export const SafetyBadgesMini = ({ listing }) => {
  const badges = [];

  if (listing?.womenFriendly) {
    badges.push({
      icon: Heart,
      color: "text-[#FFD595]",
      bg: "bg-[#FFD595]/20",
    });
  }
  if (listing?.verified) {
    badges.push({
      icon: BadgeCheck,
      color: "text-[#FFD595]",
      bg: "bg-[#FFD595]/20",
    });
  }
  if (listing?.insured) {
    badges.push({
      icon: Shield,
      color: "text-[#FFD595]",
      bg: "bg-[#FFD595]/20",
    });
  }
  if (listing?.familyFriendly) {
    badges.push({
      icon: Users,
      color: "text-[#FFD595]",
      bg: "bg-[#FFD595]/20",
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex gap-1">
      {badges.slice(0, 3).map((badge, idx) => (
        <div
          key={idx}
          className={`w-6 h-6 rounded-full ${badge.bg} flex items-center justify-center`}
        >
          <badge.icon className={`w-3 h-3 ${badge.color}`} />
        </div>
      ))}
      {badges.length > 3 && (
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
          +{badges.length - 3}
        </div>
      )}
    </div>
  );
};

export const WomenSafetyRating = ({ rating = 4.5, reviewCount = 0 }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFD595]/10 rounded-full border border-[#FFD595]/20">
      <Heart className="w-4 h-4 text-[#FFD595] fill-current" />
      <span className="text-sm font-bold text-[#FFD595]">{rating}</span>
      <span className="text-xs text-[#FFD595]/60">
        ({reviewCount} women reviews)
      </span>
    </div>
  );
};

export const HostVerificationBadge = ({
  host,
  hostName,
  isVerified,
  rating,
}) => {
  const verifications = [];

  const hostData = host || {
    idVerified: isVerified !== false,
    name: hostName || "Local Heritage Host",
    rating: rating || 4.8,
    backgroundChecked: true,
    firstAidCertified: false,
  };

  if (hostData?.idVerified !== false) {
    verifications.push({ label: "ID Verified", icon: CheckCircle2 });
  }
  if (hostData?.backgroundChecked) {
    verifications.push({ label: "Background Checked", icon: Shield });
  }
  if (hostData?.firstAidCertified) {
    verifications.push({ label: "First Aid Certified", icon: Heart });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-[#FFD595]/10">
        <div className="w-12 h-12 rounded-xl bg-[#FFD595]/20 flex items-center justify-center">
          <BadgeCheck className="w-6 h-6 text-[#FFD595]" />
        </div>
        <div>
          <p className="font-bold text-white">{hostData.name}</p>
          <div className="flex items-center gap-2 text-[#FFD595] text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold">{hostData.rating}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50">Verified Host</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-[#FFD595]/50 uppercase tracking-wider mb-3">
          Verifications
        </p>
        <div className="flex flex-wrap gap-2">
          {verifications.map((v, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD595]/10 rounded-full border border-[#FFD595]/20"
            >
              <v.icon className="w-4 h-4 text-[#FFD595]" />
              <span className="text-xs font-bold text-[#FFD595]">
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SafetyScore = ({ score = 95 }) => {
  const getScoreColor = (s) => {
    if (s >= 90)
      return { bg: "bg-[#FFD595]", text: "text-[#FFD595]", label: "Excellent" };
    if (s >= 75)
      return { bg: "bg-[#FFD595]/80", text: "text-[#FFD595]", label: "Good" };
    if (s >= 60)
      return {
        bg: "bg-[#FFD595]/60",
        text: "text-[#FFD595]/80",
        label: "Fair",
      };
    return { bg: "bg-white/40", text: "text-white/60", label: "Needs Review" };
  };

  const scoreInfo = getScoreColor(score);

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/10"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={`${(score / 100) * 150.8} 150.8`}
            className={scoreInfo.text}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-white">{score}</span>
        </div>
      </div>
      <div>
        <p className="font-bold text-white text-sm">Safety Score</p>
        <p className={`text-xs font-bold ${scoreInfo.text}`}>
          {scoreInfo.label}
        </p>
      </div>
    </div>
  );
};

export { SafetyBadges };
export default SafetyBadges;
