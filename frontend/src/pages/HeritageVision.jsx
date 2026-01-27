import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Maximize2,
  RotateCcw,
  Info,
  Loader2,
  Box,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const HeritageVision = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    fetchListing();
    // Load model-viewer script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/listings/${id}`);
      console.log("HeritageVision - Listing fetched:", response.data.data);
      setListing(response.data.data);
    } catch (error) {
      console.error("Error fetching listing for AR:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">
          Initializing Neural Link...
        </p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <Box className="w-16 h-16 text-slate-800 mb-6" />
        <h2 className="text-2xl font-black text-white mb-2">
          Listing Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs">
          This experience doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/discover")}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all"
        >
          Browse Experiences
        </button>
      </div>
    );
  }

  if (!listing?.hasAR) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Box className="w-16 h-16 text-slate-600 mb-6" />
        <h2 className="text-3xl font-black mb-4 text-white">
          No AR Data Available
        </h2>
        <p className="text-slate-400 mb-2 max-w-md text-lg">
          <span className="text-emerald-400 font-bold">{listing.title}</span>{" "}
          hasn't been scanned into Heritage Vision yet.
        </p>
        <p className="text-slate-500 mb-8 max-w-sm text-sm">
          AR experiences allow you to view 3D models of heritage sites and
          artifacts. Check back soon!
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/listings/${id}`)}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all"
          >
            View Listing
          </button>
          <button
            onClick={() => navigate("/discover")}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all"
          >
            Browse More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 w-full p-8 z-50 flex justify-between items-start">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10 transition-all text-white flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="w-4 h-4" /> Exit Vision
        </motion.button>

        <div className="text-right">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-emerald-500/20"
          >
            <Sparkles className="w-3 h-3" /> Live AR Projection
          </motion.div>
          <h1 className="text-2xl font-outfit font-black text-white">
            {listing.title}
          </h1>
          <p className="text-slate-400 text-xs">
            {listing.location.city}, {listing.location.district}
          </p>
        </div>
      </div>

      {/* Model Viewer Container */}
      <div className="flex-1 relative">
        {!modelLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-emerald-500/50 animate-spin" />
          </div>
        )}

        {/* 
                    Note: Using dangerouslySetInnerHTML because model-viewer is a custom element 
                    and React needs to handle it as such in some versions, or simply using the tag.
                */}
        <model-viewer
          src={
            listing.arModelUrl ||
            "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          }
          ios-src=""
          alt={`A 3D model of ${listing.title}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          poster={listing.images[0]}
          shadow-intensity="1"
          auto-rotate
          onLoad={() => setModelLoaded(true)}
          style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
        >
          {/* AR Button Overlay */}
          <button
            slot="ar-button"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-emerald-500/50 hover:scale-105 transition-all"
          >
            <Maximize2 className="w-5 h-5" /> View in Your Space
          </button>
        </model-viewer>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-10 right-10 z-50 flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 glass rounded-[32px] border border-white/10 max-w-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <h4 className="font-bold text-sm">Artifact Verified</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            This 3D scan was captured using high-precision photogrammetry to
            preserve the heritage details of {listing.location.city}.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              title="Reset Camera"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
            </button>
            <button
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              title="More Info"
            >
              <Info className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeritageVision;
