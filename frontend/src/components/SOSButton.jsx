import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  X,
  AlertTriangle,
  MapPin,
  Shield,
  Ambulance,
  Users,
  PhoneCall,
  MessageCircle,
  Navigation,
  Heart,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const SOSButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);

  const emergencyContacts = [
    {
      id: "police",
      name: "Police",
      nameTamil: "காவல்துறை",
      number: "100",
      icon: Shield,
      color: "bg-blue-500",
    },
    {
      id: "ambulance",
      name: "Ambulance",
      nameTamil: "ஆம்புலன்ஸ்",
      number: "108",
      icon: Ambulance,
      color: "bg-red-500",
    },
    {
      id: "women",
      name: "Women Helpline",
      nameTamil: "பெண்கள் உதவி",
      number: "181",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      id: "tourist",
      name: "Tourist Helpline",
      nameTamil: "சுற்றுலா உதவி",
      number: "1363",
      icon: Users,
      color: "bg-[#FFD595]",
    },
  ];

  useEffect(() => {
    if (isOpen && !location) {
      getLocation();
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      triggerEmergency();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error("Location error:", error);
          setLocationLoading(false);
        },
      );
    }
  };

  const startEmergencyCountdown = () => {
    setCountdown(5);
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  const triggerEmergency = () => {
    setEmergencyTriggered(true);
    setCountdown(null);

    const message = `EMERGENCY! I need help. My location: https://maps.google.com/?q=${location?.lat},${location?.lng}`;

    if (navigator.share) {
      navigator.share({
        title: "Emergency Alert",
        text: message,
      });
    }

    setTimeout(() => {
      setEmergencyTriggered(false);
    }, 3000);
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  const shareLocation = () => {
    if (location) {
      const url = `https://maps.google.com/?q=${location.lat},${location.lng}`;
      if (navigator.share) {
        navigator.share({
          title: "My Current Location",
          text: "Here is my current location",
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
        alert("Location copied to clipboard!");
      }
    }
  };

  return (
    <>
      {/* Floating SOS Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(220, 38, 38, 0.4)",
            "0 0 0 20px rgba(220, 38, 38, 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <AlertTriangle className="w-8 h-8 text-white" />
        <span className="absolute -top-2 -right-2 bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
          SOS
        </span>
      </motion.button>

      {/* SOS Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => !countdown && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#46041F] rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-[#FFD595]/20"
            >
              {/* Header */}
              <div className="bg-red-600 p-6 text-center relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                  disabled={countdown !== null}
                >
                  <X className="w-6 h-6" />
                </button>
                <AlertTriangle className="w-12 h-12 text-white mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                  Emergency SOS
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  அவசர உதவி | Quick Help
                </p>
              </div>

              {/* Location Status */}
              <div className="p-4 border-b border-[#FFD595]/20">
                <div className="flex items-center gap-3 text-white/80">
                  <div
                    className={`p-2 rounded-full ${location ? "bg-green-500/20" : "bg-yellow-500/20"}`}
                  >
                    <MapPin
                      className={`w-5 h-5 ${location ? "text-green-400" : "text-yellow-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">
                      {locationLoading
                        ? "Getting your location..."
                        : location
                          ? "Location captured"
                          : "Location unavailable"}
                    </p>
                    {location && (
                      <p className="text-xs text-white/60">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                  {location && (
                    <button
                      onClick={shareLocation}
                      className="p-2 bg-[#FFD595]/20 rounded-full hover:bg-[#FFD595]/30 transition-colors"
                    >
                      <Navigation className="w-4 h-4 text-[#FFD595]" />
                    </button>
                  )}
                </div>
              </div>

              {/* Emergency Countdown */}
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-red-600/20 p-6 text-center border-b border-red-600/30"
                  >
                    <div className="text-6xl font-black text-red-500 mb-2">
                      {countdown}
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      Emergency alert will be sent in {countdown} seconds
                    </p>
                    <button
                      onClick={cancelCountdown}
                      className="px-6 py-2 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Emergency Triggered Confirmation */}
              <AnimatePresence>
                {emergencyTriggered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-green-600/20 p-6 text-center border-b border-green-600/30"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-green-400 font-bold">
                      Emergency Alert Sent!
                    </p>
                    <p className="text-white/60 text-sm">Help is on the way</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Emergency Contacts */}
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-wider text-[#FFD595] mb-4">
                  Quick Dial Emergency Services
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => callNumber(contact.number)}
                      className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                    >
                      <div className={`p-2 rounded-xl ${contact.color}`}>
                        <contact.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-white font-bold text-sm">
                          {contact.name}
                        </p>
                        <p className="text-white/50 text-xs">
                          {contact.nameTamil}
                        </p>
                      </div>
                      <div className="text-[#FFD595] font-black text-lg">
                        {contact.number}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-[#FFD595]/20">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={shareLocation}
                    disabled={!location}
                    className="flex items-center justify-center gap-2 p-4 bg-[#FFD595]/20 hover:bg-[#FFD595]/30 rounded-2xl text-[#FFD595] font-bold transition-all disabled:opacity-50"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Share Location
                  </button>
                  <button
                    onClick={startEmergencyCountdown}
                    disabled={countdown !== null}
                    className="flex items-center justify-center gap-2 p-4 bg-red-600 hover:bg-red-700 rounded-2xl text-white font-bold transition-all disabled:opacity-50"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    Send SOS Alert
                  </button>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                <p className="text-xs text-white/40 text-center">
                  Stay calm. Your safety is our priority. Help is available
                  24/7.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
