import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";
import api from "../services/api";

export default function GovAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/discovery/stats");
      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Government Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time tourism impact metrics for policy decisions
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users />}
            title="Total Creators"
            value={stats?.bySector.reduce((sum, s) => sum + s.count, 0) || 0}
            subtitle="Across Tamil Nadu"
            color="blue"
          />
          <MetricCard
            icon={<DollarSign />}
            title="Avg. Experience Price"
            value={`₹${Math.round(stats?.bySector[0]?.avgPrice || 0)}`}
            subtitle="Per experience"
            color="green"
          />
          <MetricCard
            icon={<MapPin />}
            title="Districts Covered"
            value={stats?.byDistrict.length || 0}
            subtitle="Active districts"
            color="purple"
          />
          <MetricCard
            icon={<TrendingUp />}
            title="Capacity"
            value={
              stats?.bySector.reduce((sum, s) => sum + s.totalCapacity, 0) || 0
            }
            subtitle="Total tourist capacity/day"
            color="orange"
          />
        </div>

        {/* Sector Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-blue-600" />
            Sector-wise Distribution
          </h2>
          <div className="space-y-6">
            {stats?.bySector.map((sector) => {
              const sectorNames = {
                AgriRural: { name: "Agri & Rural Tourism", color: "green" },
                HeritageCulture: {
                  name: "Heritage & Culture",
                  color: "purple",
                },
                EcoAdventure: { name: "Eco & Adventure", color: "blue" },
              };
              const info = sectorNames[sector._id] || {
                name: sector._id,
                color: "gray",
              };
              const totalCount = stats.bySector.reduce(
                (sum, s) => sum + s.count,
                0,
              );
              const percentage = Math.round((sector.count / totalCount) * 100);

              return (
                <div key={sector._id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{info.name}</span>
                    <span className="text-sm text-gray-600">
                      {sector.count} creators ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full bg-${info.color}-500 transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600">Avg Price</p>
                      <p className="font-bold">
                        ₹{Math.round(sector.avgPrice)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-gray-600">Total Capacity</p>
                      <p className="font-bold">{sector.totalCapacity}/day</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* District Analysis */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-purple-600" />
            District-wise Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats?.byDistrict.map((district) => (
              <div
                key={district._id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      {district._id || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {district.count} creators
                    </p>
                  </div>
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {district.categories.map((cat) => {
                    const colors = {
                      AgriRural: "bg-green-100 text-green-800",
                      HeritageCulture: "bg-purple-100 text-purple-800",
                      EcoAdventure: "bg-blue-100 text-blue-800",
                    };
                    return (
                      <span
                        key={cat}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[cat]}`}
                      >
                        {cat === "AgriRural"
                          ? "Farm"
                          : cat === "HeritageCulture"
                            ? "Heritage"
                            : "Eco"}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Impact Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 mb-1">Rural Employment</p>
              <p className="text-3xl font-bold">
                {stats?.bySector.reduce((sum, s) => sum + s.count, 0) || 0}+
              </p>
              <p className="text-sm text-blue-200">Direct creator jobs</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Economic Reach</p>
              <p className="text-3xl font-bold">
                ₹
                {Math.round(
                  (stats?.bySector.reduce(
                    (sum, s) => sum + s.avgPrice * s.count,
                    0,
                  ) || 0) / 1000,
                )}
                K
              </p>
              <p className="text-sm text-blue-200">Monthly potential</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Geographic Spread</p>
              <p className="text-3xl font-bold">
                {stats?.byDistrict.length || 0}
              </p>
              <p className="text-sm text-blue-200">Districts activated</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-sm">
              <strong>Policy Insight:</strong>{" "}
              {stats?.byDistrict.length < 10
                ? "Opportunity to expand to underserved districts"
                : "Balanced distribution across Tamil Nadu achieved"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>
  );
}
