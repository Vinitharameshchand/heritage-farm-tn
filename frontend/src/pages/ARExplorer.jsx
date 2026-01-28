import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  X,
  MapPin,
  Clock,
  Users,
  Star,
  Navigation,
  Sparkles,
  Volume2,
  VolumeX,
  Info,
  Zap,
  ChevronRight,
  Heart,
} from "lucide-react";
import api from "../services/api";

const ARExplorer = () => {
  const navigate = useNavigate();
  const [isARActive, setIsARActive] = useState(false);
  const [nearbyListings, setNearbyListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [guideVoiceEnabled, setGuideVoiceEnabled] = useState(true);
  const [guideSpeaking, setGuideSpeaking] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (isARActive) {
      startCamera();
      fetchNearbyListings();
      welcomeMessage();
    }
    return () => {
      stopCamera();
    };
  }, [isARActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const fetchNearbyListings = async () => {
    try {
      const response = await api.get("/listings?status=approved&limit=6");
      setNearbyListings(response.data.data || []);
    } catch (error) {
      console.error("Error fetching nearby listings:", error);
    }
  };

  const welcomeMessage = () => {
    const messages = [
      "Vanakkam! Welcome to Tamil Nadu's heritage. I'll guide you to amazing experiences nearby.",
      "வணக்கம்! I'm your AR guide. Let me show you the treasures around you.",
      "Welcome! Point your camera around to discover verified local experiences.",
      "Vanakkam! Tamil Nadu heritage-kku welcome. Nearby experiences-a kandu pudiunga!",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    speakGuide(randomMessage);
  };

  const speakGuide = (message) => {
    setGuideMessage(message);
    setGuideSpeaking(true);

    if (guideVoiceEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setGuideSpeaking(false);
      setGuideMessage("");
    }, 5000);
  };

  const handleListingTap = (listing) => {
    setSelectedListing(listing);
    const messages = [
      `Great choice! ${listing.title} has ${listing.rating} stars from ${listing.reviewCount} travelers.`,
      `Super! Idhu ${listing.distance || "2.3"} km distance-la irukku. Book pannalama?`,
      `${listing.title} is highly rated. This creator is verified and experienced.`,
      `Nalla selection! ${listing.title} verified creator-oda experience. Safe-a irukum.`,
    ];
    speakGuide(messages[Math.floor(Math.random() * messages.length)]);
  };

  const getARPosition = (index) => {
    const positions = [
      { top: "25%", left: "15%" },
      { top: "35%", right: "20%" },
      { top: "45%", left: "25%" },
      { top: "55%", right: "15%" },
      { top: "30%", left: "50%" },
      { top: "60%", left: "45%" },
    ];
    return positions[index % positions.length];
  };

  if (!isARActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-outfit font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              AR Explorer
            </h1>
            <p className="text-slate-400 text-lg mb-2">
              Meet your AI guide & discover Tamil Nadu in Augmented Reality
            </p>
            <p className="text-purple-400 text-sm font-semibold">
              🤖 AI-Powered • 📍 Location-Based • 🎯 Interactive
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 mb-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Meet Your AI Guide
                </h3>
                <p className="text-slate-400">
                  A friendly virtual assistant who speaks Tamil & English, knows
                  local culture, and guides you to verified experiences.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <MapPin className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-white mb-1">Nearby Spots</h4>
                <p className="text-slate-400 text-sm">
                  See AR markers for heritage sites around you
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <Volume2 className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="font-bold text-white mb-1">Voice Guide</h4>
                <p className="text-slate-400 text-sm">
                  Hear stories and recommendations in your language
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <Zap className="w-6 h-6 text-amber-400 mb-2" />
                <h4 className="font-bold text-white mb-1">Instant Book</h4>
                <p className="text-slate-400 text-sm">
                  Tap AR markers to view & book experiences
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <button
              onClick={() => setIsARActive(true)}
              className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <Camera className="w-6 h-6" />
              Start AR Experience
            </button>
            <button
              onClick={() => navigate("/discover")}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold transition-all"
            >
              Browse Traditional Way
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-200">
                <p className="font-semibold mb-1">Camera permission required</p>
                <p className="text-amber-300/80">
                  Allow camera access to view AR overlays of nearby heritage
                  experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start">
        <button
          onClick={() => {
            setIsARActive(false);
            stopCamera();
          }}
          className="p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 transition-all pointer-events-auto"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setGuideVoiceEnabled(!guideVoiceEnabled)}
            className="p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 transition-all pointer-events-auto"
          >
            {guideVoiceEnabled ? (
              <Volume2 className="w-6 h-6 text-purple-400" />
            ) : (
              <VolumeX className="w-6 h-6 text-slate-400" />
            )}
          </button>
          <button className="p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 transition-all pointer-events-auto">
            <Navigation className="w-6 h-6 text-emerald-400" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {nearbyListings.map((listing, index) => (
          <motion.div
            key={listing._id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: index * 0.15 }}
            style={getARPosition(index)}
            className="absolute pointer-events-auto"
          >
            <button
              onClick={() => handleListingTap(listing)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-white/30 min-w-[200px] shadow-2xl transform transition-all hover:scale-110">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-white text-sm leading-tight mb-1">
                      {listing.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{listing.rating}</span>
                      <span>•</span>
                      <span>{listing.distance || "2.3"} km</span>
                    </div>
                    <div className="text-white/90 font-bold text-sm">
                      ₹{listing.price}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-pink-600/90" />
              </div>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="absolute bottom-32 left-6 right-6">
          <AnimatePresence>
            {guideSpeaking && guideMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-purple-300 text-xs font-bold mb-1">
                      AI Guide
                    </p>
                    <p className="text-white">{guideMessage}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedListing && (
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 p-6 pointer-events-auto"
            >
              <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-4" />

              <div className="flex gap-4 mb-4">
                {selectedListing.images?.[0] && (
                  <img
                    src={selectedListing.images[0]}
                    alt={selectedListing.title}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedListing.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{selectedListing.rating}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedListing.duration || 240}min</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedListing.capacity}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">
                    ₹{selectedListing.price}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {selectedListing.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/listings/${selectedListing._id}`)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/listings/${selectedListing._id}`)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  Book Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setSelectedListing(null)}
                className="mt-3 w-full py-2 text-slate-400 hover:text-white text-sm font-medium transition-all"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 pb-8 pointer-events-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">AI Guide Active</p>
              <p className="text-purple-300 text-sm">Tap markers to explore</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ARExplorer;
