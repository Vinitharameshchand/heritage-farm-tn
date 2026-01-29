import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import i18n from "../i18n/config";
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Leaf,
  Castle,
  Trees,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Sparkles,
  ScrollText,
  Mountain,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ListingCard from "../components/ListingCard";
import api from "../services/api";

const ITEMS_PER_PAGE = 6;

const Discover = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]); // Store all listings for district extraction
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "all",
    duration: "all",
    rating: "all",
  });
  const [safetyFilters, setSafetyFilters] = useState({
    womenFriendly: false,
    verifiedOnly: false,
    insuredOnly: false,
    femaleHostOnly: false,
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [singleCategoryPage, setSingleCategoryPage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const categories = ["All", "AgriRural", "HeritageCulture", "EcoAdventure"];

  const categoryInfo = {
    AgriRural: {
      icon: Leaf,
      title: "Agri & Rural Experiences",
      description:
        "Discover authentic farming experiences and rural traditions",
      gradient: "from-[#FFD595] to-[#FFD595]/80",
      bgGradient: "from-[#FFD595]/20 to-[#FFD595]/10",
    },
    HeritageCulture: {
      icon: Castle,
      title: "Heritage & Culture",
      description: "Explore temples, monuments, and rich cultural traditions",
      gradient: "from-[#FFD595] to-[#FFD595]/80",
      bgGradient: "from-[#FFD595]/20 to-[#FFD595]/10",
    },
    EcoAdventure: {
      icon: Trees,
      title: "Eco & Adventure",
      description: "Thrilling outdoor adventures and eco-tourism experiences",
      gradient: "from-[#FFD595] to-[#FFD595]/80",
      bgGradient: "from-[#FFD595]/20 to-[#FFD595]/10",
    },
  };

  useEffect(() => {
    // Fetch all listings once for district extraction
    const fetchAllListings = async () => {
      try {
        const response = await api.get("/listings", {
          params: { limit: 1000, lang: i18n.language },
        });
        setAllListings(response.data.data);
      } catch (error) {
        console.error("Error fetching all listings:", error);
      }
    };
    fetchAllListings();
  }, [i18n.language]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [activeCategory, searchTerm, i18n.language]); // Add i18n.language dependency

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = { lang: i18n.language, limit: 1000 };
      if (activeCategory !== "All") {
        params.category = activeCategory;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }
      const response = await api.get("/listings", { params });
      setListings(response.data.data);
      // Also update allListings if this is the full fetch
      if (activeCategory === "All" && !searchTerm) {
        setAllListings(response.data.data);
      }
      // Reset pagination when fetching new listings
      setExpandedCategories({});
      setSingleCategoryPage(1);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVisibleCount = (category) => {
    return expandedCategories[category] || ITEMS_PER_PAGE;
  };

  const handleViewMore = (category, totalCount) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: Math.min(
        (prev[category] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
        totalCount,
      ),
    }));
  };

  // Extract unique districts from ALL listings (not filtered)
  const districts = useMemo(() => {
    const districtSet = new Set();
    // Use allListings if available, otherwise fall back to listings
    const sourceListings = allListings.length > 0 ? allListings : listings;
    sourceListings.forEach((listing) => {
      if (listing.location?.district) {
        districtSet.add(listing.location.district);
      }
    });
    return Array.from(districtSet).sort();
  }, [allListings, listings]);

  // Filter listings based on price, duration, rating, district, and safety filters
  const applyFilters = (listingsToFilter) => {
    return listingsToFilter.filter((listing) => {
      // Safety filters
      if (safetyFilters.womenFriendly && !listing.womenFriendly) return false;
      if (safetyFilters.verifiedOnly && listing.verified === false)
        return false;
      if (safetyFilters.insuredOnly && !listing.insured) return false;
      if (safetyFilters.femaleHostOnly && listing.host?.gender !== "female")
        return false;

      // District filter
      if (selectedDistrict !== "all") {
        if (listing.location?.district !== selectedDistrict) return false;
      }
      // Price filter
      if (filters.priceRange !== "all") {
        if (filters.priceRange === "budget" && listing.price > 1000)
          return false;
        if (
          filters.priceRange === "moderate" &&
          (listing.price < 1000 || listing.price > 3000)
        )
          return false;
        if (filters.priceRange === "premium" && listing.price < 3000)
          return false;
      }
      // Duration filter
      if (filters.duration !== "all") {
        if (filters.duration === "short" && listing.duration > 120)
          return false;
        if (
          filters.duration === "half" &&
          (listing.duration < 180 || listing.duration > 300)
        )
          return false;
        if (filters.duration === "full" && listing.duration < 360) return false;
      }
      return true;
    });
  };
  const filteredListings = applyFilters(listings);

  // Group filtered listings by category
  const groupedListings = filteredListings.reduce((acc, listing) => {
    const cat = listing.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(listing);
    return acc;
  }, {});

  const navItems = [
    {
      id: "All",
      label: "The Whole Arc",
      icon: Sparkles,
      count: filteredListings.length,
    },
    {
      id: "AgriRural",
      label: "Farms & Soil",
      icon: Leaf,
      count: groupedListings["AgriRural"]?.length || 0,
    },
    {
      id: "HeritageCulture",
      label: "Stone & Spirit",
      icon: ScrollText,
      count: groupedListings["HeritageCulture"]?.length || 0,
    },
    {
      id: "EcoAdventure",
      label: "Wild & Peaks",
      icon: Mountain,
      count: groupedListings["EcoAdventure"]?.length || 0,
    },
  ];

  return (
    <div className="min-h-screen  pt-28 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative SVGs */}

      {/* Header */}

      <div className="space-y-16 py-10 relative">
        {/* 1. The Artisan Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD595]/30 bg-[#FFD595]/5 mb-6"
            >
              <Compass className="w-3 h-3 text-[#FFD595]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD595]/80">
                Tamil Nadu, India
              </span>
            </motion.div>
            <h2 className="text-7xl md:text-8xl jaro font-bold leading-[0.85] text-white italic">
              Discover <br />
              <span className="text-[#FFD595]">Experiences.</span>
            </h2>
            <p className="mt-6 text-[#FFD595]/60 text-lg font-medium leading-relaxed max-w-sm">
              Walk through ancient corridors and breathe the air of rural
              heritage.
            </p>
          </div>

          {/* Floating Search Hub */}
          <div className="w-full md:w-[600px] relative mt-10 md:mt-20">
            <div className="absolute -inset-4 bg-[#FFD595]/10 blur-3xl rounded-full" />
            <div className="relative flex gap-10 items-center bg-white/5 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where to next?"
                  className="w-[300px] bg-[#46041F] text-[#FFD595] py-5 pl-14 pr-6 rounded-[2rem] font-bold text-lg outline-none focus:ring-2 ring-[#FFD595]/40 transition-all placeholder-[#FFD595]/20"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FFD595]/40" />
              </div>

              {/* Quick District Pill inside search hub */}
              <button
                onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
                className="w-full mt-3 flex items-center justify-between px-6 py-4 rounded-2xl bg-[#FFD595] text-[#46041F] hover:bg-[#FFD595]/90 transition-all"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-black uppercase text-[10px] tracking-widest">
                    {selectedDistrict === "all"
                      ? "Explore Districts"
                      : selectedDistrict}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showDistrictDropdown ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Overlapping Experience Navigation */}
        <div className="relative">
          <div className="flex flex-wrap gap-4 relative z-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`relative overflow-hidden flex-1 min-w-[200px] p-8 rounded-[3rem] transition-all duration-500 group ${
                  activeCategory === item.id
                    ? "bg-[#FFD595] text-[#46041F] -translate-y-4 shadow-2xl"
                    : "bg-[#46041F] border border-[#FFD595]/20 text-[#FFD595] hover:bg-[#FFD595]/5"
                }`}
              >
                {/* Decorative background icon for each card */}
                <item.icon
                  className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-5 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 ${activeCategory === item.id ? "text-[#46041F]" : "text-[#FFD595]"}`}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`p-3 rounded-2xl ${activeCategory === item.id ? "bg-[#46041F] text-[#FFD595]" : "bg-[#FFD595]/10"}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black jaro italic opacity-40">
                      {item.count}
                    </span>
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">
                    {item.label}
                  </h4>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest ${activeCategory === item.id ? "text-[#46041F]/60" : "text-[#FFD595]/40"}`}
                  >
                    Browse {item.id === "All" ? "Collection" : "Stories"}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* 3. The "Artisan Tray" for Secondary Filters */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-10">
            <div className="flex items-center gap-6">
              <button
                onClick={() =>
                  setSafetyFilters((prev) => ({
                    ...prev,
                    womenFriendly: !prev.womenFriendly,
                  }))
                }
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${
                  safetyFilters.womenFriendly
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-[#FFD595]/40 hover:text-[#FFD595]"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Safe for Women
              </button>
              <div className="w-px h-6 bg-white/10" />
              <button className="text-[#FFD595]/40 hover:text-[#FFD595] font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Sustainable First
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-4 rounded-full text-[#FFD595] hover:bg-white/10 transition-all group"
            >
              <span className="font-black uppercase text-[10px] tracking-widest">
                Refine Search
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FFD595] text-[#46041F] flex items-center justify-center group-hover:rotate-90 transition-transform">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/10 rounded-3xl h-[450px] animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <>
          {/* Show All Experiences or Filtered by Category */}
          {activeCategory === "All" ? (
            <>
              {/* Categorized Sections */}
              {["AgriRural", "HeritageCulture", "EcoAdventure"].map((cat) => {
                const catListings = groupedListings[cat] || [];
                if (catListings.length === 0) return null;

                const info = categoryInfo[cat];
                const Icon = info.icon;

                return (
                  <motion.section
                    key={cat}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                  >
                    {/* Category Header */}
                    <div
                      className={`glass p-6 rounded-[24px] border border-white/10 mb-8 bg-gradient-to-r ${info.bgGradient}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            {info.title}
                            <span className="text-sm font-bold px-3 py-1 rounded-full bg-white/10 text-white/70">
                              {catListings.length} experiences
                            </span>
                          </h2>
                          <p className="text-white/60 text-sm mt-1">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {catListings
                        .slice(0, getVisibleCount(cat))
                        .map((listing) => (
                          <ListingCard key={listing._id} listing={listing} />
                        ))}
                    </div>

                    {/* View More Button */}
                    {getVisibleCount(cat) < catListings.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mt-8"
                      >
                        <button
                          onClick={() =>
                            handleViewMore(cat, catListings.length)
                          }
                          className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all bg-gradient-to-r ${info.gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`}
                        >
                          View More {info.title.split(" ")[0]}
                          <span className="text-white/70">
                            ({catListings.length - getVisibleCount(cat)}{" "}
                            remaining)
                          </span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </motion.section>
                );
              })}
            </>
          ) : (
            /* Single Category View */
            <>
              {categoryInfo[activeCategory] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass p-6 rounded-[24px] border border-white/10 mb-10 bg-gradient-to-r ${categoryInfo[activeCategory].bgGradient}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${categoryInfo[activeCategory].gradient} flex items-center justify-center shadow-lg`}
                    >
                      {(() => {
                        const Icon = categoryInfo[activeCategory].icon;
                        return <Icon className="w-7 h-7 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white">
                        {categoryInfo[activeCategory].title}
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        {filteredListings.length} experiences available
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings
                  .slice(0, singleCategoryPage * ITEMS_PER_PAGE)
                  .map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))}
              </div>

              {/* View More Button for single category */}
              {singleCategoryPage * ITEMS_PER_PAGE <
                filteredListings.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-10"
                >
                  <button
                    onClick={() => setSingleCategoryPage((prev) => prev + 1)}
                    className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all bg-[#FFD595] text-[#46041F] shadow-lg hover:shadow-xl hover:scale-105`}
                  >
                    View More Experiences
                    <span className="text-white/70">
                      (
                      {filteredListings.length -
                        singleCategoryPage * ITEMS_PER_PAGE}{" "}
                      remaining)
                    </span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white/40" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No experiences found
          </h3>
          <p className="text-white/60">{t("try_adjusting_filters")}</p>
        </div>
      )}
    </div>
  );
};

export default Discover;
