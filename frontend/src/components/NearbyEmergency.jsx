import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hospital,
  Shield,
  Phone,
  MapPin,
  Navigation,
  ChevronRight,
  X,
  Siren,
  HeartPulse,
  Building2,
} from "lucide-react";

const NearbyEmergency = ({ location, lat, lon }) => {
  const [facilities, setFacilities] = useState({ hospitals: [], police: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hospitals");
  const [showModal, setShowModal] = useState(false);

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
            type: "Government",
            distance: "2.5 km",
            phone: "104",
            address: `Main Road, ${cityName}`,
            emergency: true,
            open24x7: true,
          },
          {
            id: 2,
            name: "Apollo Hospital",
            type: "Private",
            distance: "4.8 km",
            phone: "1066",
            address: `MG Road, ${cityName}`,
            emergency: true,
            open24x7: true,
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
          },
        ],
        police: [
          {
            id: 1,
            name: `${cityName} Police Station`,
            type: "District",
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
            type: "Tourist",
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

  const emergencyNumbers = [
    { label: "Police", number: "100", icon: Shield },
    { label: "Ambulance", number: "108", icon: HeartPulse },
    { label: "Women", number: "181", icon: Phone },
  ];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#46041F] to-[#2a0213] rounded-3xl p-6 border border-[#FFD595]/20 animate-pulse">
        <div className="h-6 bg-[#FFD595]/10 rounded w-40 mb-4" />
        <div className="space-y-3">
          <div className="h-16 bg-[#FFD595]/10 rounded-2xl" />
          <div className="h-16 bg-[#FFD595]/10 rounded-2xl" />
        </div>
      </div>
    );
  }

  const currentFacilities =
    activeTab === "hospitals" ? facilities.hospitals : facilities.police;

  return (
    <>
      <div className="bg-gradient-to-br from-[#46041F] to-[#2a0213] rounded-3xl overflow-hidden border border-[#FFD595]/20 shadow-xl">
        {/* Header */}
        <div className="bg-[#FFD595]/10 px-5 py-4 border-b border-[#FFD595]/20">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white flex items-center gap-2 uppercase tracking-wider text-sm">
              <Siren className="w-5 h-5 text-[#FFD595]" />
              Emergency Services
            </h3>
            <button
              onClick={() => setShowModal(true)}
              className="text-[#FFD595] text-xs font-bold hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Dial Strip */}
        <div className="flex border-b border-[#FFD595]/10">
          {emergencyNumbers.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => callNumber(item.number)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 hover:bg-[#FFD595]/10 transition-all ${
                idx !== emergencyNumbers.length - 1
                  ? "border-r border-[#FFD595]/10"
                  : ""
              }`}
            >
              <item.icon className="w-4 h-4 text-[#FFD595]" />
              <span className="text-[10px] text-white/50 uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-black text-[#FFD595]">
                {item.number}
              </span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex p-3 gap-2">
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`flex-1 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "hospitals"
                ? "bg-[#FFD595] text-[#46041F] shadow-lg shadow-[#FFD595]/20"
                : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Hospital className="w-4 h-4" />
            Hospitals
          </button>
          <button
            onClick={() => setActiveTab("police")}
            className={`flex-1 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === "police"
                ? "bg-[#FFD595] text-[#46041F] shadow-lg shadow-[#FFD595]/20"
                : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Shield className="w-4 h-4" />
            Police
          </button>
        </div>

        {/* Facility List */}
        <div className="px-3 pb-3 space-y-2">
          {currentFacilities.slice(0, 2).map((facility) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-2xl p-3 border border-white/5 hover:border-[#FFD595]/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD595]/10 flex items-center justify-center flex-shrink-0">
                  {activeTab === "hospitals" ? (
                    <Hospital className="w-5 h-5 text-[#FFD595]" />
                  ) : (
                    <Building2 className="w-5 h-5 text-[#FFD595]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm truncate">
                      {facility.name}
                    </h4>
                    {facility.open24x7 && (
                      <span className="px-1.5 py-0.5 bg-[#FFD595]/20 text-[#FFD595] text-[8px] font-black rounded uppercase tracking-wider flex-shrink-0">
                        24/7
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[#FFD595]/70 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {facility.distance}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="text-white/40 text-xs">
                      {facility.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => callNumber(facility.phone)}
                    className="w-8 h-8 rounded-lg bg-[#FFD595] text-[#46041F] flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDirections(facility)}
                    className="w-8 h-8 rounded-lg bg-white/10 text-[#FFD595] flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full List Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#46041F] to-[#2a0213] rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl border border-[#FFD595]/30"
            >
              {/* Modal Header */}
              <div className="bg-[#FFD595]/10 px-6 py-4 border-b border-[#FFD595]/20 flex items-center justify-between">
                <h3 className="font-black text-white uppercase tracking-wider">
                  All Emergency Services
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Dial */}
              <div className="p-4 border-b border-[#FFD595]/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD595]/60 mb-3">
                  Quick Dial
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Police", number: "100" },
                    { label: "Ambulance", number: "108" },
                    { label: "Women", number: "181" },
                    { label: "Tourist", number: "1363" },
                  ].map((item) => (
                    <button
                      key={item.number}
                      onClick={() => callNumber(item.number)}
                      className="bg-[#FFD595]/10 rounded-xl p-3 text-center hover:bg-[#FFD595]/20 transition-all border border-[#FFD595]/20"
                    >
                      <div className="text-lg font-black text-[#FFD595]">
                        {item.number}
                      </div>
                      <div className="text-[8px] text-white/50 uppercase tracking-wider mt-1">
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex p-4 gap-2">
                <button
                  onClick={() => setActiveTab("hospitals")}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    activeTab === "hospitals"
                      ? "bg-[#FFD595] text-[#46041F]"
                      : "bg-white/5 text-white/60"
                  }`}
                >
                  <Hospital className="w-4 h-4" />
                  Hospitals
                </button>
                <button
                  onClick={() => setActiveTab("police")}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    activeTab === "police"
                      ? "bg-[#FFD595] text-[#46041F]"
                      : "bg-white/5 text-white/60"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Police
                </button>
              </div>

              {/* Facility List */}
              <div className="px-4 pb-4 max-h-[40vh] overflow-y-auto space-y-3">
                {currentFacilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">
                            {facility.name}
                          </h4>
                          {facility.open24x7 && (
                            <span className="px-2 py-0.5 bg-[#FFD595]/20 text-[#FFD595] text-[10px] font-bold rounded">
                              24/7
                            </span>
                          )}
                        </div>
                        <p className="text-white/50 text-sm mt-1">
                          {facility.type}
                        </p>
                      </div>
                      <span className="text-[#FFD595] text-sm font-bold">
                        {facility.distance}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {facility.address}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => callNumber(facility.phone)}
                        className="flex-1 py-2.5 bg-[#FFD595] text-[#46041F] rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Call {facility.phone}
                      </button>
                      <button
                        onClick={() => openDirections(facility)}
                        className="py-2.5 px-4 bg-white/10 text-[#FFD595] rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
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