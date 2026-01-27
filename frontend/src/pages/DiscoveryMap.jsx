import { useState, useEffect } from "react";
import { MapPin, Compass, Navigation, Filter, Star } from "lucide-react";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function DiscoveryMap() {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState(null);
  const [discoveries, setDiscoveries] = useState(null);
  const [radius, setRadius] = useState(30);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const districtsByRegion = {
    all: [
      { name: "Chennai", lat: 13.0827, lng: 80.2707, region: "Northern" },
      { name: "Madurai", lat: 9.9252, lng: 78.1198, region: "Southern" },
      { name: "Coimbatore", lat: 11.0168, lng: 76.9558, region: "Western" },
      { name: "Thanjavur", lat: 10.787, lng: 79.1378, region: "Central" },
      { name: "The Nilgiris (Ooty)", lat: 11.4102, lng: 76.695, region: "Western" },
      { name: "Kanyakumari", lat: 8.0883, lng: 77.5385, region: "Southern" },
      { name: "Rameswaram", lat: 9.2876, lng: 79.3129, region: "Southern" },
      { name: "Tirunelveli", lat: 8.7139, lng: 77.7567, region: "Southern" },
    ],
    Northern: [
      { name: "Chennai", lat: 13.0827, lng: 80.2707 },
      { name: "Thiruvallur", lat: 13.1311, lng: 79.9095 },
      { name: "Kanchipuram", lat: 12.8342, lng: 79.7036 },
      { name: "Chengalpattu", lat: 12.6916, lng: 79.9755 },
      { name: "Vellore", lat: 12.9165, lng: 79.1325 },
      { name: "Tiruvannamalai", lat: 12.2253, lng: 79.0747 },
      { name: "Ranipet", lat: 12.9222, lng: 79.3333 },
      { name: "Tirupattur", lat: 12.4967, lng: 78.5725 },
      { name: "Krishnagiri", lat: 12.5266, lng: 78.2134 },
      { name: "Dharmapuri", lat: 12.1211, lng: 78.1582 },
      { name: "Viluppuram", lat: 11.9401, lng: 79.4861 },
      { name: "Kallakurichi", lat: 11.7398, lng: 78.9594 },
    ],
    Western: [
      { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
      { name: "The Nilgiris", lat: 11.4102, lng: 76.695 },
      { name: "Erode", lat: 11.341, lng: 77.7172 },
      { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
      { name: "Salem", lat: 11.6643, lng: 78.146 },
      { name: "Namakkal", lat: 11.2189, lng: 78.1677 },
      { name: "Karur", lat: 10.9601, lng: 78.0766 },
    ],
    Central: [
      { name: "Thanjavur", lat: 10.787, lng: 79.1378 },
      { name: "Tiruchirappalli", lat: 10.7905, lng: 78.7047 },
      { name: "Nagapattinam", lat: 10.7661, lng: 79.8449 },
      { name: "Thiruvarur", lat: 10.7719, lng: 79.6345 },
      { name: "Mayiladuthurai", lat: 11.1033, lng: 79.6528 },
      { name: "Ariyalur", lat: 11.1401, lng: 79.0766 },
      { name: "Perambalur", lat: 11.2321, lng: 78.8801 },
      { name: "Pudukkottai", lat: 10.3833, lng: 78.82 },
      { name: "Cuddalore", lat: 11.7474, lng: 79.771 },
    ],
    Southern: [
      { name: "Madurai", lat: 9.9252, lng: 78.1198 },
      { name: "Theni", lat: 10.0104, lng: 77.4769 },
      { name: "Dindigul", lat: 10.3673, lng: 77.9803 },
      { name: "Ramanathapuram", lat: 9.3639, lng: 78.8377 },
      { name: "Sivaganga", lat: 9.8433, lng: 78.4809 },
      { name: "Virudhunagar", lat: 9.5811, lng: 77.9624 },
      { name: "Tenkasi", lat: 8.9639, lng: 77.3152 },
      { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
      { name: "Thoothukudi", lat: 8.7642, lng: 78.1348 },
      { name: "Kanyakumari", lat: 8.0883, lng: 77.5385 },
    ],
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied, using default");
          setLocation({ lat: 10.787, lng: 79.1378 });
        },
      );
    } else {
      setLocation({ lat: 10.787, lng: 79.1378 });
    }
  }, []);

  useEffect(() => {
    if (location) {
      discoverNearby();
    }
  }, [location, radius]);

  const discoverNearby = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/discovery/nearby`, {
        params: {
          latitude: location.lat,
          longitude: location.lng,
          radius,
        },
      });
      setDiscoveries(response.data.data);
    } catch (error) {
      console.error("Discovery failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectLocation = (loc) => {
    setLocation({ lat: loc.lat, lng: loc.lng });
  };

  const getDisplayedLocations = () => {
    if (selectedRegion === "all") {
      return districtsByRegion.all;
    }
    return districtsByRegion[selectedRegion] || [];
  };

  const getFilteredDiscoveries = () => {
    if (!discoveries) return [];

    let items = [];
    if (selectedCategory === "all") {
      items = [
        ...discoveries.discoveries.agriRural,
        ...discoveries.discoveries.heritage,
        ...discoveries.discoveries.ecoAdventure,
      ];
    } else if (selectedCategory === "agri") {
      items = discoveries.discoveries.agriRural;
    } else if (selectedCategory === "heritage") {
      items = discoveries.discoveries.heritage;
    } else if (selectedCategory === "eco") {
      items = discoveries.discoveries.ecoAdventure;
    }
    return items;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {t("discovery.title", "Discover Nearby")}
          </h1>
          <p className="text-gray-600">
            {t("discovery.subtitle", "Find authentic experiences around you")}
          </p>
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold">
                {t("discovery.your_location", "Explore Tamil Nadu - 38 Districts")}
              </h2>
            </div>
            <div className="text-sm text-gray-600">
              Select region to filter districts
            </div>
          </div>

          {/* Region Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["all", "Northern", "Western", "Central", "Southern"].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region === "all" ? "All Regions" : region}
                {region !== "all" && ` (${districtsByRegion[region]?.length || 0})`}
              </button>
            ))}
          </div>

          {/* District Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
            {getDisplayedLocations().map((loc) => (
              <button
                key={loc.name}
                onClick={() => selectLocation(loc)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  location?.lat === loc.lat
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <MapPin className="w-4 h-4 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold text-center">{loc.name}</p>
                {loc.region && (
                  <p className="text-xs text-gray-500 text-center mt-1">{loc.region}</p>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">
              {t("discovery.search_radius", "Search Radius:")}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-semibold text-green-600">{radius} km</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : discoveries ? (
          <>
            {/* Famous Places */}
            {discoveries.discoveries.famousPlaces.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 mb-6 border border-amber-200">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Star className="text-amber-600" />
                  {t("discovery.famous_nearby", "Famous Places Nearby")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {discoveries.discoveries.famousPlaces.map((place, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow">
                      <p className="font-semibold text-amber-900">
                        {place.name}
                      </p>
                      <p className="text-sm text-gray-600">{place.district}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Experiences */}
            {discoveries.specialExperiences.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {t(
                    "discovery.special_experiences",
                    "Special Experiences Near You",
                  )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {discoveries.specialExperiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-all"
                    >
                      <h4 className="font-semibold text-green-700 mb-2">
                        {exp.type}
                      </h4>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                {
                  key: "all",
                  label: t("discovery.all", "All"),
                  count: discoveries.totalFound,
                },
                {
                  key: "agri",
                  label: t("discovery.agri", "Farm & Rural"),
                  count: discoveries.discoveries.agriRural.length,
                },
                {
                  key: "heritage",
                  label: t("discovery.heritage", "Heritage"),
                  count: discoveries.discoveries.heritage.length,
                },
                {
                  key: "eco",
                  label: t("discovery.eco", "Eco & Adventure"),
                  count: discoveries.discoveries.ecoAdventure.length,
                },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat.key
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredDiscoveries().map((listing) => (
                <DiscoveryCard key={listing._id} listing={listing} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Navigation className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>
              {t(
                "discovery.select_location",
                "Select a location to discover experiences",
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function DiscoveryCard({ listing }) {
  const categoryColors = {
    AgriRural: "bg-green-100 text-green-800",
    HeritageCulture: "bg-purple-100 text-purple-800",
    EcoAdventure: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative">
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[listing.category]}`}
        >
          {listing.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{listing.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>

        {listing.location?.nearbyPlaces &&
          listing.location.nearbyPlaces.length > 0 && (
            <div className="mb-3 p-2 bg-amber-50 rounded border border-amber-200">
              <p className="text-xs font-semibold text-amber-900 mb-1">
                Nearby:
              </p>
              <p className="text-xs text-amber-800">
                {listing.location.nearbyPlaces[0].name} (
                {listing.location.nearbyPlaces[0].distance}km)
              </p>
            </div>
          )}

        <div className="flex items-center justify-between">
          <span className="text-green-600 font-bold text-lg">
            ₹{listing.price}
          </span>
          <div className="flex items-center gap-1 text-sm">
            <Star size={14} fill="currentColor" className="text-yellow-500" />
            <span className="font-semibold">{listing.rating.toFixed(1)}</span>
            <span className="text-gray-500">({listing.reviewCount})</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
}
