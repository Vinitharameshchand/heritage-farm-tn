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
      color: "bg-pink-500",
      textColor: "text-pink-500",
    });
  }

  if (data?.verified) {
    badges.push({
      id: "verified",
      label: "Verified Host",
      labelTamil: "சரிபார்க்கப்பட்டது",
      icon: BadgeCheck,
      color: "bg-green-500",
      textColor: "text-green-500",
    });
  }

  if (data?.insured) {
    badges.push({
      id: "insured",
      label: "Insured",
      labelTamil: "காப்பீடு",
      icon: Shield,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    });
  }

  if (data?.familyFriendly) {
    badges.push({
      id: "family",
      label: "Family Friendly",
      labelTamil: "குடும்பத்திற்கு உகந்தது",
      icon: Users,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    });
  }

  if (data?.accessibleFriendly) {
    badges.push({
      id: "accessible",
      label: "Accessible",
      labelTamil: "அணுகக்கூடியது",
      icon: Accessibility,
      color: "bg-teal-500",
      textColor: "text-teal-500",
    });
  }

  if (data?.kidFriendly) {
    badges.push({
      id: "kids",
      label: "Kid Friendly",
      labelTamil: "குழந்தைகளுக்கு உகந்தது",
      icon: Baby,
      color: "bg-orange-500",
      textColor: "text-orange-500",
    });
  }

  if (data?.petFriendly) {
    badges.push({
      id: "pets",
      label: "Pet Friendly",
      labelTamil: "செல்லப்பிராணிகள்",
      icon: Dog,
      color: "bg-amber-600",
      textColor: "text-amber-600",
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
          className={`flex items-center gap-1.5 ${classes.badge} ${badge.color} text-white rounded-full font-bold shadow-sm`}
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
    badges.push({ icon: Heart, color: "text-pink-400", bg: "bg-pink-500/20" });
  }
  if (listing?.verified) {
    badges.push({
      icon: BadgeCheck,
      color: "text-green-400",
      bg: "bg-green-500/20",
    });
  }
  if (listing?.insured) {
    badges.push({ icon: Shield, color: "text-blue-400", bg: "bg-blue-500/20" });
  }
  if (listing?.familyFriendly) {
    badges.push({
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
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
    <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 rounded-full border border-pink-500/20">
      <Heart className="w-4 h-4 text-pink-400 fill-current" />
      <span className="text-sm font-bold text-pink-400">{rating}</span>
      <span className="text-xs text-pink-400/60">
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

  const hostData = host || { idVerified: isVerified, name: hostName, rating };

  if (hostData?.idVerified || isVerified) {
    verifications.push({ label: "ID Verified", icon: CheckCircle2 });
  }
  if (hostData?.backgroundChecked) {
    verifications.push({ label: "Background Checked", icon: Shield });
  }
  if (hostData?.firstAidCertified) {
    verifications.push({ label: "First Aid Certified", icon: Heart });
  }

  if (verifications.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-white/50 uppercase tracking-wider">
        Host Verifications
      </p>
      <div className="flex flex-wrap gap-2">
        {verifications.map((v, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20"
          >
            <v.icon className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold text-green-400">{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SafetyScore = ({ score = 95 }) => {
  const getScoreColor = (s) => {
    if (s >= 90)
      return { bg: "bg-green-500", text: "text-green-500", label: "Excellent" };
    if (s >= 75)
      return { bg: "bg-blue-500", text: "text-blue-500", label: "Good" };
    if (s >= 60)
      return { bg: "bg-yellow-500", text: "text-yellow-500", label: "Fair" };
    return { bg: "bg-red-500", text: "text-red-500", label: "Needs Review" };
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
        <p className="font-bold text-white">Safety Score</p>
        <p className={`text-sm ${scoreInfo.text}`}>{scoreInfo.label}</p>
      </div>
    </div>
  );
};

export { SafetyBadges };
export default SafetyBadges;
