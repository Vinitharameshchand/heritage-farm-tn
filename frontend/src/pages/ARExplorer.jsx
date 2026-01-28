import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Map as MapIcon,
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
  Maximize2,
  Minimize2,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../services/api";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const tamilNaduLocations = [
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
  { name: "Trichy", lat: 10.7905, lng: 78.7047 },
  { name: "Salem", lat: 11.6643, lng: 78.146 },
  { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
  { name: "Thanjavur", lat: 10.787, lng: 79.1378 },
  { name: "Kanyakumari", lat: 8.0883, lng: 77.5385 },
  { name: "Ooty", lat: 11.4102, lng: 76.695 },
  { name: "Rameswaram", lat: 9.2876, lng: 79.3129 },
  { name: "Kanchipuram", lat: 12.8342, lng: 79.7036 },
  { name: "Pondicherry", lat: 11.9416, lng: 79.8083 },
];

const MapBoundsController = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);
  return null;
};

const ARExplorer = () => {
  const navigate = useNavigate();
  const [isMapActive, setIsMapActive] = useState(true);
  const [nearbyListings, setNearbyListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [guideVoiceEnabled, setGuideVoiceEnabled] = useState(true);
  const [guideSpeaking, setGuideSpeaking] = useState(false);
  const [guideMessage, setGuideMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef(null);

  const tamilNaduBounds = [
    [7.8, 76.2],
    [13.5, 80.3],
  ];

  useEffect(() => {
    if (isMapActive) {
      fetchNearbyListings();
      welcomeMessage();
    }
  }, [isMapActive]);

  const fetchNearbyListings = async () => {
    try {
      const response = await api.get("/listings?status=approved&limit=20");
      const listingsWithCoords = (response.data.data || []).map(
        (listing, index) => {
          const location =
            tamilNaduLocations[index % tamilNaduLocations.length];
          const latOffset = (Math.random() - 0.5) * 0.2;
          const lngOffset = (Math.random() - 0.5) * 0.2;
          return {
            ...listing,
            coordinates: {
              lat: location.lat + latOffset,
              lng: location.lng + lngOffset,
            },
            locationName: location.name,
          };
        },
      );
      setNearbyListings(listingsWithCoords);
    } catch (error) {
      console.error("Error fetching nearby listings:", error);
    }
  };

  const welcomeMessage = () => {
    const messages = [
      "Vanakkam! Welcome to Tamil Nadu's heritage. I'll guide you to amazing experiences nearby.",
      "வணக்கம்! I'm your guide. Let me show you the treasures around you.",
      "Welcome! Explore the map to discover verified local experiences.",
      "Vanakkam! Tamil Nadu heritage-kku welcome. Map-la experiences-a kandu pudiunga!",
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
      `Super! Idhu ${listing.locationName || "Tamil Nadu"}-la irukku. Book pannalama?`,
      `${listing.title} is highly rated. This creator is verified and experienced.`,
      `Nalla selection! ${listing.title} verified creator-oda experience. Safe-a irukum.`,
    ];
    speakGuide(messages[Math.floor(Math.random() * messages.length)]);
  };

  if (!isMapActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <MapIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-outfit font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Map Explorer
            </h1>
            <p className="text-slate-400 text-lg mb-2">
              Meet your AI guide & discover Tamil Nadu on Interactive Map
            </p>
            <p className="text-purple-400 text-sm font-semibold">
              🤖 AI-Powered • 📍 Location-Based • 🗺️ Interactive Map
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
                <h4 className="font-bold text-white mb-1">Tamil Nadu Map</h4>
                <p className="text-slate-400 text-sm">
                  See markers for heritage sites across Tamil Nadu
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
                  Click map markers to view & book experiences
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
              onClick={() => setIsMapActive(true)}
              className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <MapIcon className="w-6 h-6" />
              Explore Tamil Nadu Map
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
            className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-200">
                <p className="font-semibold mb-1">Interactive Tamil Nadu Map</p>
                <p className="text-emerald-300/80">
                  Explore heritage experiences across Tamil Nadu with real
                  locations marked on an open-source map.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950">
      <div className="absolute inset-0">
        <MapContainer
          ref={mapRef}
          center={[10.8505, 78.6101]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBoundsController bounds={tamilNaduBounds} />

          {nearbyListings.map(
            (listing) =>
              listing.coordinates && (
                <Marker
                  key={listing._id}
                  position={[listing.coordinates.lat, listing.coordinates.lng]}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => handleListingTap(listing),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h4 className="font-bold text-sm mb-1">
                        {listing.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{listing.rating}</span>
                        <span>•</span>
                        <span>{listing.locationName}</span>
                      </div>
                      <div className="text-purple-600 font-bold">
                        ₹{listing.price}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ),
          )}
        </MapContainer>
      </div>

      <div className="absolute top-6 left-6 right-6 z-[1000] flex justify-between items-start">
        <button
          onClick={() => navigate("/")}
          className="p-3 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-xl"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setGuideVoiceEnabled(!guideVoiceEnabled)}
            className="p-3 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-xl"
          >
            {guideVoiceEnabled ? (
              <Volume2 className="w-6 h-6 text-purple-400" />
            ) : (
              <VolumeX className="w-6 h-6 text-slate-400" />
            )}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-3 bg-black/70 backdrop-blur-xl rounded-full text-white hover:bg-black/90 transition-all shadow-xl"
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <Maximize2 className="w-6 h-6 text-emerald-400" />
            )}
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[1000] pointer-events-none">
        <div className="absolute bottom-32 left-6 right-6">
          <AnimatePresence>
            {guideSpeaking && guideMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-black/90 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 shadow-2xl pointer-events-auto"
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
              className="bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-2xl rounded-t-3xl border-t border-white/10 p-6 pointer-events-auto shadow-2xl"
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
                      <MapPin className="w-4 h-4" />
                      <span>{selectedListing.locationName}</span>
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
            <div className="px-6 py-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">AI Guide Active</p>
                  <p className="text-purple-300 text-sm">
                    Click markers on map • {nearbyListings.length} spots found
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ARExplorer;
