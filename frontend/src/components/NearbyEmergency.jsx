import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hospital,
  Shield,
  Phone,
  MapPin,
  Navigation,
  Clock,
  ChevronRight,
  X,
  Ambulance,
  AlertTriangle,
} from "lucide-react";

const NearbyEmergency = ({ location, lat, lon }) => {
  const [facilities, setFacilities] = useState({ hospitals: [], police: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hospitals");
  const [showModal, setShowModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    fetchNearbyFacilities();
  }, [location, lat, lon]);

  const fetchNearbyFacilities = async () => {
    setLoading(true);

    setTimeout(() => {
      const cityName =
        typeof location === "string" ? location : location?.city || "Chennai";

      setFacilities({
        hospitals: [
          {
            id: 1,
            name: `${cityName} Government Hospital`,
            type: "Government Hospital",
            distance: "2.5 km",
            phone: "104",
            address: `Main Road, ${cityName}`,
            emergency: true,
            open24x7: true,
            rating: 4.2,
          },
          {
            id: 2,
            name: "Apollo Hospital",
            type: "Private Hospital",
            distance: "4.8 km",
            phone: "1066",
            address: `MG Road, ${cityName}`,
            emergency: true,
            open24x7: true,
            rating: 4.5,
          },
          {
            id: 3,
            name: "Primary Health Centre",
            type: "PHC",
            distance: "1.2 km",
            phone: "+91 9876543210",
            address: `Village Center, ${cityName}`,
            emergency: false,
            open24x7: false,
            rating: 3.8,
          },
        ],
        police: [
          {
            id: 1,
            name: `${cityName} Police Station`,
            type: "District Police",
            distance: "1.8 km",
            phone: "100",
            address: `Station Road, ${cityName}`,
            emergency: true,
            open24x7: true,
          },
          {
            id: 2,
            name: "Women Police Station",
            type: "Women Safety",
            distance: "3.2 km",
            phone: "181",
            address: `Town Hall, ${cityName}`,
            emergency: true,
            open24x7: true,
          },
          {
            id: 3,
            name: "Tourist Police Help Desk",
            type: "Tourist Police",
            distance: "2.0 km",
            phone: "1363",
            address: `Bus Stand, ${cityName}`,
            emergency: false,
            open24x7: false,
          },
        ],
      });
      setLoading(false);
    }, 500);
  };

  const openDirections = (facility) => {
    const query = encodeURIComponent(facility.name + " " + facility.address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
    );
  };

  const callNumber = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) {
    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 animate-pulse">
        <div className="h-6 bg-white/10 rounded w-40 mb-4" />
        <div className="space-y-3">
          <div className="h-20 bg-white/10 rounded-xl" />
          <div className="h-20 bg-white/10 rounded-xl" />
        </div>
      </div>
    );
  }

  const currentFacilities =
    activeTab === "hospitals" ? facilities.hospitals : facilities.police;

  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-[#FFD595]/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FFD595]" />
            Emergency Services
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "hospitals"
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            <Hospital className="w-4 h-4" />
            Hospitals
          </button>
          <button
            onClick={() => setActiveTab("police")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === "police"
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            <Shield className="w-4 h-4" />
            Police
          </button>
        </div>

        {/* Facility List */}
        <div className="space-y-3">
          {currentFacilities.slice(0, 2).map((facility) => (
            <div
              key={facility.id}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white text-sm">
                      {facility.name}
                    </h4>
                    {facility.open24x7 && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full">
                        24/7
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs mb-2">{facility.type}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#FFD595] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {facility.distance}
                    </span>
                    {facility.emergency && (
                      <span className="text-red-400 flex items-center gap-1">
                        <Ambulance className="w-3 h-3" />
                        Emergency
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => callNumber(facility.phone)}
                    className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDirections(facility)}
                    className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-4 py-3 bg-white/10 rounded-xl text-white/70 font-bold text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
        >
          View All {activeTab === "hospitals" ? "Hospitals" : "Police Stations"}
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Quick Emergency Numbers */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
            Quick Dial
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => callNumber("100")}
              className="py-2 px-3 bg-blue-500/20 rounded-xl text-center hover:bg-blue-500/30 transition-colors"
            >
              <p className="text-blue-400 font-black text-lg">100</p>
              <p className="text-blue-400/60 text-[10px] font-bold">Police</p>
            </button>
            <button
              onClick={() => callNumber("108")}
              className="py-2 px-3 bg-red-500/20 rounded-xl text-center hover:bg-red-500/30 transition-colors"
            >
              <p className="text-red-400 font-black text-lg">108</p>
              <p className="text-red-400/60 text-[10px] font-bold">Ambulance</p>
            </button>
            <button
              onClick={() => callNumber("181")}
              className="py-2 px-3 bg-pink-500/20 rounded-xl text-center hover:bg-pink-500/30 transition-colors"
            >
              <p className="text-pink-400 font-black text-lg">181</p>
              <p className="text-pink-400/60 text-[10px] font-bold">Women</p>
            </button>
          </div>
        </div>
      </div>

      {/* Full List Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#46041F] rounded-[2rem] w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl border border-[#FFD595]/20"
            >
              <div className="bg-[#FFD595]/10 p-6 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-black text-white">
                  Nearby{" "}
                  {activeTab === "hospitals" ? "Hospitals" : "Police Stations"}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  Emergency services near your experience location
                </p>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
                {currentFacilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-white">
                            {facility.name}
                          </h4>
                          {facility.open24x7 && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              24/7
                            </span>
                          )}
                        </div>
                        <p className="text-white/50 text-sm mb-2">
                          {facility.type}
                        </p>
                        <p className="text-white/40 text-xs mb-3">
                          {facility.address}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#FFD595] flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {facility.distance}
                          </span>
                          {facility.emergency && (
                            <span className="text-red-400 flex items-center gap-1">
                              <Ambulance className="w-4 h-4" />
                              Emergency Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => callNumber(facility.phone)}
                        className="flex-1 py-2.5 bg-green-500/20 text-green-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call {facility.phone}
                      </button>
                      <button
                        onClick={() => openDirections(facility)}
                        className="flex-1 py-2.5 bg-blue-500/20 text-blue-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NearbyEmergency;
