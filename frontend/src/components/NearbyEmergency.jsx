import React from "react";
import { Phone, MapPin, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NearbyEmergency = ({ location, lat, lon }) => {
  const emergencyContacts = [
    { name: "Police", number: "100", icon: "🚔" },
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Fire Service", number: "101", icon: "🚒" },
    { name: "Tourist Helpline", number: "1800-111-363", icon: "ℹ️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-3xl border border-[#FFD595]/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Emergency Contacts</h3>
          <p className="text-xs text-white/60 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location || "Tamil Nadu"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{contact.icon}</span>
              <span className="text-sm font-semibold text-white">
                {contact.name}
              </span>
            </div>
            <a
              href={`tel:${contact.number}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFD595]/20 hover:bg-[#FFD595]/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFD595]" />
              <span className="text-sm font-bold text-[#FFD595]">
                {contact.number}
              </span>
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NearbyEmergency;
