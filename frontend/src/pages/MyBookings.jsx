import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "amber",
        icon: Clock,
        text: "Pending",
        bg: "bg-[#FFD595]/20",
        border: "border-[#FFD595]/40",
        textColor: "text-[#FFD595]",
      },
      confirmed: {
        color: "emerald",
        icon: CheckCircle,
        text: "Confirmed",
        bg: "bg-[#FFD595]/20",
        border: "border-[#FFD595]/40",
        textColor: "text-[#FFD595]",
      },
      cancelled: {
        color: "red",
        icon: XCircle,
        text: "Cancelled",
        bg: "bg-white/10",
        border: "border-white/20",
        textColor: "text-white/70",
      },
      completed: {
        color: "blue",
        icon: Package,
        text: "Completed",
        bg: "bg-[#FFD595]/20",
        border: "border-[#FFD595]/40",
        textColor: "text-[#FFD595]",
      },
    };
    return configs[status] || configs.pending;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#46041F] flex items-center justify-center">
        <div className="text-[#FFD595] text-xl font-bold">
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#46041F]  pb-16 px-4 relative overflow-hidden">
      {/* Decorative SVGs */}
      <div className="absolute inset-y-0 -top-80 left-0 w-40 ">
        <img src="/left.svg" alt="decorative left" className="h-full" />
      </div>
      <div className="absolute inset-y-0 -top-80 right-0 w-40">
        <img src="/right.svg" alt="decorative left" className="h-full" />
      </div>
      <div className="max-w-7xl mx-auto relative pt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl jaro font-bold mb-4 text-white">
            My <span className="text-[#FFD595]">Bookings</span>
          </h1>
          <p className="text-white/70 text-lg">
            Track your heritage experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2"
        >
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  filter === status
                    ? "bg-[#FFD595] text-[#46041F] shadow-lg"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ),
          )}
        </motion.div>

        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg mb-6">No bookings found</p>
            <button
              onClick={() => navigate("/discover")}
              className="px-8 py-3 bg-[#FFD595] hover:bg-[#FFD595]/80 text-[#46041F] rounded-full font-semibold transition-all shadow-lg"
            >
              Explore Experiences
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-xl border border-[#FFD595]/20 rounded-3xl p-6 hover:border-[#FFD595] hover:shadow-2xl hover:shadow-[#FFD595]/20 transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-64 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFD595]/20 to-[#FFD595]/5 border border-[#FFD595]/10 flex-shrink-0">
                      {booking.listing?.images?.[0] ? (
                        <img
                          src={booking.listing.images[0]}
                          alt={booking.listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <Package className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {booking.listing?.title || "Experience"}
                          </h3>
                          <div className="flex items-center gap-2 text-white/70 text-sm">
                            <MapPin className="w-4 h-4" />
                            {booking.listing?.location?.district ||
                              "Tamil Nadu"}
                          </div>
                        </div>
                        <div
                          className={`px-4 py-2 ${statusConfig.bg} ${statusConfig.border} border rounded-full flex items-center gap-2`}
                        >
                          <StatusIcon
                            className={`w-4 h-4 ${statusConfig.textColor}`}
                          />
                          <span
                            className={`text-sm font-semibold ${statusConfig.textColor}`}
                          >
                            {statusConfig.text}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-5 h-5 text-[#FFD595]" />
                          <div>
                            <div className="text-xs text-white/50">
                              Start Date
                            </div>
                            <div className="font-medium">
                              {new Date(booking.startDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                },
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white">
                          <Calendar className="w-5 h-5 text-[#FFD595]" />
                          <div>
                            <div className="text-xs text-white/50">
                              End Date
                            </div>
                            <div className="font-medium">
                              {new Date(booking.endDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                },
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white">
                          <Users className="w-5 h-5 text-[#FFD595]" />
                          <div>
                            <div className="text-xs text-white/50">Guests</div>
                            <div className="font-medium">
                              {booking.numGuests}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white">
                          <CreditCard className="w-5 h-5 text-[#FFD595]" />
                          <div>
                            <div className="text-xs text-white/50">
                              Total Paid
                            </div>
                            <div className="font-medium">
                              ₹{booking.totalPrice.toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/listings/${booking.listing._id}`)
                          }
                          className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium text-white transition-all"
                        >
                          View Details
                        </button>
                        {booking.status === "confirmed" && (
                          <button className="px-6 py-2 bg-[#FFD595]/10 hover:bg-[#FFD595]/20 border border-[#FFD595]/20 text-[#FFD595] rounded-full text-sm font-medium transition-all">
                            Contact Creator
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
