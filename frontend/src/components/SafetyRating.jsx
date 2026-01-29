import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Users,
} from "lucide-react";

export const SafetyRatingDisplay = ({ safetyRating = 4.5, reviewCount = 24 }) => {
  const [expanded, setExpanded] = useState(false);

  const safetyMetrics = [
    { label: "Host Verification", score: 4.8, icon: CheckCircle2 },
    { label: "Communication", score: 4.6, icon: MessageSquare },
    { label: "Emergency Protocols", score: 4.3, icon: AlertTriangle },
    { label: "Women Safety", score: 4.7, icon: Heart },
    { label: "Group Safety", score: 4.5, icon: Users },
  ];

  const getSafetyLevel = (rating) => {
    if (rating >= 4.5) return { label: "Excellent", color: "text-green-400", bg: "bg-green-500/20" };
    if (rating >= 4.0) return { label: "Very Good", color: "text-blue-400", bg: "bg-blue-500/20" };
    if (rating >= 3.5) return { label: "Good", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    return { label: "Fair", color: "text-orange-400", bg: "bg-orange-500/20" };
  };

  const level = getSafetyLevel(safetyRating);

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${level.bg} flex items-center justify-center`}>
            <Shield className={`w-6 h-6 ${level.color}`} />
          </div>
          <div className="text-left">
            <p className="text-white font-bold">Safety Rating</p>
            <div className="flex items-center gap-2">
              <span className={`font-black text-xl ${level.color}`}>{safetyRating}</span>
              <span className="text-white/40 text-sm">({reviewCount} safety reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${level.bg} ${level.color}`}>
            {level.label}
          </span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-white/40" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/40" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {safetyMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <metric.icon className="w-4 h-4 text-[#FFD595]" />
                  <span className="flex-1 text-sm text-white/70">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FFD595] rounded-full"
                        style={{ width: `${(metric.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white w-8">{metric.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SafetyReviewForm = ({ onSubmit }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    hostVerification: 0,
    communication: 0,
    emergency: 0,
    womenSafety: 0,
  });
  const [feedback, setFeedback] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(null);

  const questions = [
    { key: "overall", label: "Overall Safety Experience" },
    { key: "hostVerification", label: "Host was verified and trustworthy" },
    { key: "communication", label: "Clear communication about safety" },
    { key: "emergency", label: "Emergency protocols were clear" },
    { key: "womenSafety", label: "Environment felt safe for women" },
  ];

  const handleSubmit = () => {
    onSubmit?.({
      ratings,
      feedback,
      wouldRecommend,
    });
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-[#FFD595]" />
        <h3 className="text-lg font-bold text-white">Rate Your Safety Experience</h3>
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((q) => (
          <div key={q.key} className="flex items-center justify-between">
            <span className="text-sm text-white/70">{q.label}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatings({ ...ratings, [q.key]: star })}
                  className="p-1"
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      star <= ratings[q.key]
                        ? "text-[#FFD595] fill-current"
                        : "text-white/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-sm text-white/70 mb-3">Would you recommend this experience as safe?</p>
        <div className="flex gap-3">
          <button
            onClick={() => setWouldRecommend(true)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              wouldRecommend === true
                ? "bg-green-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            Yes
          </button>
          <button
            onClick={() => setWouldRecommend(false)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              wouldRecommend === false
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            No
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-white/70 mb-3">Any safety concerns or suggestions?</p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your safety experience..."
          className="w-full p-4 bg-white/5 rounded-xl border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FFD595] resize-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#FFD595] text-[#46041F] rounded-xl font-bold hover:bg-[#FFD595]/80 transition-colors"
      >
        Submit Safety Review
      </button>
    </div>
  );
};

export const SafetyReviewCard = ({ review }) => {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFD595]/20 flex items-center justify-center text-[#FFD595] font-bold">
            {review.userName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{review.userName || "Anonymous"}</p>
            <p className="text-white/40 text-xs">{review.date || "Recently"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
          <Shield className="w-3 h-3 text-green-400" />
          <span className="text-green-400 font-bold text-sm">{review.safetyRating || 4.5}</span>
        </div>
      </div>
      <p className="text-white/70 text-sm mb-3">{review.comment || "Great safety experience!"}</p>
      {review.wouldRecommend !== undefined && (
        <div className="flex items-center gap-2">
          {review.wouldRecommend ? (
            <>
              <ThumbsUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-bold">Recommends as safe</span>
            </>
          ) : (
            <>
              <ThumbsDown className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-xs font-bold">Safety concerns reported</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SafetyRatingDisplay;
