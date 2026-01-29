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
  Landmark,
  Mountain,
  ChevronRight,
  MapPin,
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
      icon: Landmark,
      title: "Heritage & Culture",
      description: "Explore temples, monuments, and rich cultural traditions",
      gradient: "from-amber-500 to-orange-600",
    },
    EcoAdventure: {
      icon: Mountain,
      title: "Eco & Adventure",
      description: "Thrilling outdoor adventures and eco-tourism experiences",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-600/10",
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

  // Filter listings based on price, duration, rating, and district filters
  const applyFilters = (listingsToFilter) => {
    return listingsToFilter.filter((listing) => {
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

  return (
    <div className="min-h-screen  pt-28 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Decorative SVGs */}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div>
          <h1 className="text-5xl jaro font-bold mb-4 text-white">
            {t("discover_experiences").split(" ")[0]}{" "}
            <span className="text-[#FFD595]">
              {t("discover_experiences").split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-white/70">{t("discover_description")}</p>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md group">
          <div className="absolute inset-0 bg-[#FFD595]/20 rounded-[24px] opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500"></div>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FFD595] w-5 h-5 pointer-events-none z-10 transition-colors" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-[24px] border-2 border-[#FFD595]/20 shadow-xl focus:outline-none focus:border-[#FFD595] focus:bg-white/15 transition-all duration-300 placeholder:text-white/50 placeholder:font-medium"
            />
          </div>
        </div>
      </div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl p-6 rounded-[24px] border border-[#FFD595]/20 mb-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-[#FFD595]">
              {filteredListings.length}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider font-bold mt-1">
              Total Experiences
            </div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div>
            <div className="text-4xl font-black text-[#FFD595]">
              {groupedListings["AgriRural"]?.length || 0}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider font-bold mt-1">
              Agri & Rural
            </div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div>
            <div className="text-4xl font-black text-[#FFD595]">
              {groupedListings["HeritageCulture"]?.length || 0}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider font-bold mt-1">
              Heritage & Culture
            </div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block"></div>
          <div>
            <div className="text-4xl font-black text-[#FFD595]">
              {groupedListings["EcoAdventure"]?.length || 0}
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wider font-bold mt-1">
              Eco & Adventure
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-10 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-[#FFD595] text-[#46041F] shadow-lg"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            }`}
          >
            {cat === "All"
              ? t("all_experiences")
              : t(
                  cat === "AgriRural"
                    ? "agri_rural"
                    : cat === "HeritageCulture"
                      ? "heritage_culture"
                      : "eco_adventure",
                )}
          </button>
        ))}

        <div className="h-8 w-[1px] bg-white/20 mx-2 hidden md:block"></div>

        {/* District Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
              selectedDistrict !== "all"
                ? "bg-[#FFD595] text-[#46041F] shadow-lg"
                : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <MapPin className="w-4 h-4" />
            {selectedDistrict === "all" ? "All Districts" : selectedDistrict}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDistrictDropdown ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showDistrictDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-2 right-0 w-64 max-h-80 overflow-y-auto bg-white/90 backdrop-blur-xl rounded-2xl border border-[#FFD595]/20 shadow-2xl z-[100]"
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedDistrict("all");
                      setShowDistrictDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                      selectedDistrict === "all"
                        ? "bg-[#FFD595] text-[#46041F]"
                        : "text-[#46041F]/70 hover:bg-[#FFD595]/20 hover:text-[#46041F]"
                    }`}
                  >
                    All Districts
                  </button>
                  {districts.length === 0 ? (
                    <div className="px-4 py-3 text-[#46041F]/50 text-sm">
                      Loading districts...
                    </div>
                  ) : (
                    districts.map((district) => (
                      <button
                        key={district}
                        onClick={() => {
                          setSelectedDistrict(district);
                          setShowDistrictDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                          selectedDistrict === district
                            ? "bg-[#FFD595] text-[#46041F]"
                            : "text-[#46041F]/70 hover:bg-[#FFD595]/20 hover:text-[#46041F]"
                        }`}
                      >
                        {district}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
            showFilters
              ? "bg-[#FFD595] text-[#46041F] shadow-lg"
              : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t("filters")}
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-10 overflow-hidden"
          >
            <div className="glass p-8 rounded-[32px] border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white">
                  {t("filters")}
                </h3>
                <button
                  onClick={() => {
                    setFilters({
                      priceRange: "all",
                      duration: "all",
                      rating: "all",
                    });
                    setShowFilters(false);
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-white/60 mb-3 block">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-[#FFD595]/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-[#FFD595] transition-all cursor-pointer"
                  >
                    <option value="all" className="bg-[#46041F]">
                      All Prices
                    </option>
                    <option value="budget" className="bg-[#46041F]">
                      Budget (₹0 - ₹1000)
                    </option>
                    <option value="moderate" className="bg-[#46041F]">
                      Moderate (₹1000 - ₹3000)
                    </option>
                    <option value="premium" className="bg-[#46041F]">
                      Premium (₹3000+)
                    </option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-white/60 mb-3 block">
                    Duration
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) =>
                      setFilters({ ...filters, duration: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-[#FFD595]/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-[#FFD595] transition-all cursor-pointer"
                  >
                    <option value="all" className="bg-[#46041F]">
                      Any Duration
                    </option>
                    <option value="short" className="bg-[#46041F]">
                      Short (1-2 hours)
                    </option>
                    <option value="half" className="bg-[#46041F]">
                      Half Day (3-5 hours)
                    </option>
                    <option value="full" className="bg-[#46041F]">
                      Full Day (6+ hours)
                    </option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-white/60 mb-3 block">
                    Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({ ...filters, rating: e.target.value })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm text-white border-2 border-[#FFD595]/20 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-[#FFD595] transition-all cursor-pointer"
                  >
                    <option value="all" className="bg-[#46041F]">
                      All Ratings
                    </option>
                    <option value="4plus" className="bg-[#46041F]">
                      4+ Stars
                    </option>
                    <option value="3plus" className="bg-[#46041F]">
                      3+ Stars
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: "all",
                      duration: "all",
                      rating: "all",
                    })
                  }
                  className="flex-1 px-6 py-3 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-6 py-3 bg-[#FFD595] text-[#46041F] rounded-2xl font-bold hover:bg-[#FFD595]/80 transition-all shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      {React.createElement(categoryInfo[activeCategory].icon, {
                        className: "w-7 h-7 text-white",
                      })}
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
