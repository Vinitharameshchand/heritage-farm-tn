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
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        textColor: "text-amber-400",
      },
      confirmed: {
        color: "emerald",
        icon: CheckCircle,
        text: "Confirmed",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        textColor: "text-emerald-400",
      },
      cancelled: {
        color: "red",
        icon: XCircle,
        text: "Cancelled",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        textColor: "text-red-400",
      },
      completed: {
        color: "blue",
        icon: Package,
        text: "Completed",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        textColor: "text-blue-400",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-emerald-400 text-xl font-outfit">
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-outfit font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-slate-400 text-lg">
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
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
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
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-6">No bookings found</p>
            <button
              onClick={() => navigate("/discover")}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all"
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
                  className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-64 h-48 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0">
                      {booking.listing?.images?.[0] ? (
                        <img
                          src={booking.listing.images[0]}
                          alt={booking.listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Package className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-outfit font-bold mb-2">
                            {booking.listing?.title || "Experience"}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
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
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="text-xs text-slate-500">
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

                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="w-5 h-5 text-teal-400" />
                          <div>
                            <div className="text-xs text-slate-500">
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

                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-5 h-5 text-purple-400" />
                          <div>
                            <div className="text-xs text-slate-500">Guests</div>
                            <div className="font-medium">
                              {booking.numGuests}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <CreditCard className="w-5 h-5 text-amber-400" />
                          <div>
                            <div className="text-xs text-slate-500">
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
                          className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all"
                        >
                          View Details
                        </button>
                        {booking.status === "confirmed" && (
                          <button className="px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium transition-all">
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
