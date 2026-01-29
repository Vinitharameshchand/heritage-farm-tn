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
  Sparkles,
} from "lucide-react";

export const SafetyRatingDisplay = ({
  safetyRating = 4.5,
  reviewCount = 24,
}) => {
  const [expanded, setExpanded] = useState(false);

  const safetyMetrics = [
    { label: "Host Verification", score: 4.8, icon: CheckCircle2 },
    { label: "Communication", score: 4.6, icon: MessageSquare },
    { label: "Emergency Protocols", score: 4.3, icon: AlertTriangle },
    { label: "Women Safety", score: 4.7, icon: Heart },
    { label: "Group Safety", score: 4.5, icon: Users },
  ];

  const getSafetyLevel = (rating) => {
    if (rating >= 4.5) return { label: "Excellent", emoji: "🛡️" };
    if (rating >= 4.0) return { label: "Very Good", emoji: "✅" };
    if (rating >= 3.5) return { label: "Good", emoji: "👍" };
    return { label: "Fair", emoji: "⚠️" };
  };

  const level = getSafetyLevel(safetyRating);

  return (
    <div className="bg-gradient-to-br from-[#46041F] to-[#2a0213] rounded-3xl overflow-hidden border border-[#FFD595]/20 shadow-xl">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-[#FFD595]/10 px-5 py-4 flex items-center justify-between hover:bg-[#FFD595]/15 transition-colors border-b border-[#FFD595]/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD595]/20 flex items-center justify-center border border-[#FFD595]/30">
            <Shield className="w-6 h-6 text-[#FFD595]" />
          </div>
          <div className="text-left">
            <p className="text-white font-black uppercase tracking-wider text-sm">
              Safety Rating
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-black text-2xl text-[#FFD595]">
                {safetyRating}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(safetyRating)
                        ? "text-[#FFD595] fill-current"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[#FFD595] font-bold text-sm flex items-center gap-1">
              {level.emoji} {level.label}
            </span>
            <span className="text-white/40 text-xs">{reviewCount} reviews</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-[#FFD595]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#FFD595]" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {safetyMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFD595]/10 flex items-center justify-center flex-shrink-0">
                    <metric.icon className="w-4 h-4 text-[#FFD595]" />
                  </div>
                  <span className="flex-1 text-sm text-white/70 font-medium">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(metric.score / 5) * 100}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#FFD595] to-[#FFD595]/70 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-black text-[#FFD595] w-8 text-right">
                      {metric.score}
                    </span>
                  </div>
                </div>
              ))}

              {/* Trust Indicators */}
              <div className="pt-4 mt-4 border-t border-[#FFD595]/10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-[#FFD595]/10 rounded-full text-[10px] font-bold text-[#FFD595] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Top Rated
                  </span>
                  <span className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Verified Host
                  </span>
                  <span className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Insured
                  </span>
                </div>
              </div>
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
    <div className="bg-gradient-to-br from-[#46041F] to-[#2a0213] rounded-3xl p-6 border border-[#FFD595]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#FFD595]/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#FFD595]" />
        </div>
        <h3 className="text-lg font-black text-white uppercase tracking-wider">
          Rate Your Safety
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((q) => (
          <div key={q.key} className="flex items-center justify-between gap-4">
            <span className="text-sm text-white/70 flex-1">{q.label}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatings({ ...ratings, [q.key]: star })}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      star <= ratings[q.key]
                        ? "text-[#FFD595] fill-current"
                        : "text-white/20 hover:text-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-sm text-white/70 mb-3 font-medium">
          Would you recommend this experience as safe?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setWouldRecommend(true)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border ${
              wouldRecommend === true
                ? "bg-[#FFD595] text-[#46041F] border-[#FFD595]"
                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            Yes, Safe!
          </button>
          <button
            onClick={() => setWouldRecommend(false)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border ${
              wouldRecommend === false
                ? "bg-white/20 text-white border-white/30"
                : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
            Concerns
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-white/70 mb-3 font-medium">
          Any safety concerns or suggestions?
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your safety experience..."
          className="w-full p-4 bg-white/5 rounded-2xl border border-[#FFD595]/20 text-white placeholder-white/30 focus:outline-none focus:border-[#FFD595] resize-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-[#FFD595] text-[#46041F] rounded-2xl font-black uppercase tracking-wider hover:bg-[#FFD595]/90 transition-colors shadow-lg shadow-[#FFD595]/20"
      >
        Submit Safety Review
      </button>
    </div>
  );
};

export const SafetyReviewCard = ({ review }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-[#FFD595]/10">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFD595]/20 flex items-center justify-center text-[#FFD595] font-black">
            {review.userName?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-bold text-white text-sm">
              {review.userName || "Anonymous"}
            </p>
            <p className="text-white/40 text-xs">{review.date || "Recently"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-[#FFD595]/20 rounded-full">
          <Shield className="w-3 h-3 text-[#FFD595]" />
          <span className="text-[#FFD595] font-bold text-sm">
            {review.safetyRating || 4.5}
          </span>
        </div>
      </div>
      <p className="text-white/70 text-sm mb-3">
        {review.comment || "Great safety experience!"}
      </p>
      {review.wouldRecommend !== undefined && (
        <div className="flex items-center gap-2">
          {review.wouldRecommend ? (
            <>
              <ThumbsUp className="w-4 h-4 text-[#FFD595]" />
              <span className="text-[#FFD595] text-xs font-bold">
                Recommends as safe
              </span>
            </>
          ) : (
            <>
              <ThumbsDown className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-xs font-bold">
                Safety concerns reported
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SafetyRatingDisplay;
