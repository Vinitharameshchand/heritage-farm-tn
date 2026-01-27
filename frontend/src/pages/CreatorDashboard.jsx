import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Plus,
  TrendingUp,
  Users,
  Star,
  Calendar,
  Search,
  Edit3,
  Trash2,
  Eye,
  ShieldCheck,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import KYCForm from "../components/KYCForm";

const StatCard = ({ icon: Icon, label, value, trend, color = "emerald" }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-card p-8 rounded-[32px] border-white/5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl bg-${color}-500/10`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">
      {label}
    </div>
    <div className="text-3xl font-black">{value}</div>
  </motion.div>
);

const CreatorDashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isKYCComplete, setIsKYCComplete] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCreatorListings();
    }
  }, [user]);

  const fetchCreatorListings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/listings", {
        params: { creator: user?._id },
      });
      setListings(response.data.data);
    } catch (error) {
      console.error("Error fetching creator listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await api.delete(`/listings/${id}`);
        setListings(listings.filter((l) => l._id !== id));
      } catch (error) {
        console.error("Error deleting listing:", error);
      }
    }
  };

  const stats = [
    {
      icon: Users,
      label: "Active Bookings",
      value: "12",
      trend: "+15%",
      color: "emerald",
    },
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: "₹45,000",
      trend: "+22%",
      color: "blue",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: "1.2k",
      trend: "+8%",
      color: "purple",
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: "4.9",
      trend: "+0.2",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {!isKYCComplete ? (
        <div className="flex items-center justify-center pt-20">
          <KYCForm onComplete={() => setIsKYCComplete(true)} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-5xl font-outfit font-black mb-2">
                Creator <span className="gradient-text">Console</span>
              </h1>
              <p className="text-slate-500">
                Welcome back, {user?.name}. Here's your performance snapshot.
              </p>
            </div>
            <Link
              to="/creator/create"
              className="btn-primary px-8 py-4 flex items-center gap-3 shadow-xl shadow-emerald-500/20"
            >
              <Plus className="w-5 h-5" />
              Create New Experience
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Experiences Table */}
          <div className="glass-card rounded-[40px] border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <h2 className="text-2xl font-bold">Your Experiences</h2>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter experiences..."
                  className="w-full pl-12 pr-5 py-3 bg-white/5 rounded-2xl border border-white/5 focus:outline-none focus:border-emerald-500/50 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center">
                  <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                    Syncing with Registry...
                  </p>
                </div>
              ) : listings.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">
                        Experience
                      </th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">
                        Location
                      </th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">
                        Price
                      </th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500">
                        Status
                      </th>
                      <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {listings
                      .filter((l) =>
                        l.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                      )
                      .map((listing) => (
                        <tr
                          key={listing._id}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden shrink-0">
                                <img
                                  src={
                                    listing.images[0] ||
                                    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400"
                                  }
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold">{listing.title}</div>
                                <div className="text-xs text-slate-500">
                                  {listing.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                              <MapPin className="w-3 h-3" />
                              {listing.location.city}
                            </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-emerald-500">
                            ₹{listing.price}
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                              Active
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                to={`/listings/${listing._id}`}
                                className="p-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-xl transition-all"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                to={`/creator/edit/${listing._id}`}
                                className="p-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-xl transition-all"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(listing._id)}
                                className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-20 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    No experiences found
                  </h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8">
                    Start sharing your culture and farm stories with the world.
                  </p>
                  <Link
                    to="/creator/create"
                    className="btn-secondary px-8 py-3"
                  >
                    Create First Experience
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorDashboard;
