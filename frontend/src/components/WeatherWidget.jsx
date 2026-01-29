import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudLightning,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  X,
  MapPin,
  Clock,
  RefreshCw,
  CloudSnow,
  CloudDrizzle,
  Cloudy,
  Calendar,
} from "lucide-react";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const WeatherWidget = ({ location, compact = false, lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      Clear: Sun,
      Clouds: Cloud,
      Rain: CloudRain,
      Drizzle: CloudDrizzle,
      Thunderstorm: CloudLightning,
      Snow: CloudSnow,
      Mist: Cloudy,
      Fog: Cloudy,
      Haze: Cloudy,
    };
    return iconMap[condition] || Cloud;
  };

  useEffect(() => {
    fetchWeather();
  }, [location, lat, lon]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      let latitude = lat;
      let longitude = lon;

      if (!latitude || !longitude) {
        const cityName =
          typeof location === "string" ? location : location?.city || "Chennai";
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)},IN&limit=1&appid=${OPENWEATHER_API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData && geoData.length > 0) {
          latitude = geoData[0].lat;
          longitude = geoData[0].lon;
        } else {
          latitude = 13.0827;
          longitude = 80.2707;
        }
      }

      const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${OPENWEATHER_API_KEY}`;
      const response = await fetch(oneCallUrl);

      if (!response.ok) {
        throw new Error("Weather API request failed");
      }

      const data = await response.json();

      setWeather({
        temp: Math.round(data.current.temp),
        feels_like: Math.round(data.current.feels_like),
        humidity: data.current.humidity,
        wind_speed: Math.round(data.current.wind_speed * 3.6),
        condition: data.current.weather[0].main,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        uvi: data.current.uvi,
        city:
          typeof location === "string" ? location : location?.city || "Chennai",
      });

      const dailyForecast = data.daily.slice(0, 7).map((day) => ({
        date: new Date(day.dt * 1000),
        tempMax: Math.round(day.temp.max),
        tempMin: Math.round(day.temp.min),
        condition: day.weather[0].main,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
        humidity: day.humidity,
        pop: Math.round(day.pop * 100),
      }));
      setForecast(dailyForecast);

      if (data.alerts && data.alerts.length > 0) {
        setAlerts(
          data.alerts.map((alert) => ({
            type: "warning",
            title: alert.event,
            description: alert.description,
            severity: alert.tags?.includes("Extreme") ? "severe" : "moderate",
            validUntil: new Date(alert.end * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        );
      } else {
        setAlerts([]);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Unable to fetch weather data");
      setWeather({
        temp: 28,
        feels_like: 31,
        humidity: 75,
        wind_speed: 12,
        condition: "Clouds",
        description: "Partly Cloudy",
        city:
          typeof location === "string" ? location : location?.city || "Chennai",
      });
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (date, index) => {
    if (index === 0) return "Today";
    if (index === 1) return "Tomorrow";
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const WeatherIcon = weather ? getWeatherIcon(weather.condition) : Cloud;

  if (loading) {
    return (
      <div
        className={`${compact ? "p-3" : "p-4"} bg-white/5 rounded-2xl animate-pulse`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded w-20 mb-2" />
            <div className="h-3 bg-white/10 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
        <WeatherIcon className="w-5 h-5 text-[#FFD595]" />
        <span className="text-white font-bold">{weather.temp}°C</span>
        <span className="text-white/50 text-sm">{weather.description}</span>
        {alerts.length > 0 && (
          <button
            onClick={() => setShowAlertModal(true)}
            className="ml-2 p-1 bg-yellow-500/20 rounded-full"
          >
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-[#FFD595]/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FFD595]" />
            <span className="text-sm font-bold text-white">{weather.city}</span>
          </div>
          <button
            onClick={fetchWeather}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Main Weather */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#FFD595]/20 rounded-2xl flex items-center justify-center">
            <WeatherIcon className="w-10 h-10 text-[#FFD595]" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">
                {weather.temp}
              </span>
              <span className="text-xl text-white/50">°C</span>
            </div>
            <p className="text-white/60 text-sm">{weather.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Thermometer className="w-5 h-5 text-[#FFD595] mx-auto mb-1" />
            <p className="text-xs text-white/50">Feels like</p>
            <p className="font-bold text-white">{weather.feels_like}°C</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-white/50">Humidity</p>
            <p className="font-bold text-white">{weather.humidity}%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <p className="text-xs text-white/50">Wind</p>
            <p className="font-bold text-white">{weather.wind_speed} km/h</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        {forecast.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#FFD595]" />
              <span className="text-sm font-bold text-white">
                7-Day Forecast
              </span>
            </div>
            <div className="space-y-2">
              {forecast.map((day, idx) => {
                const DayIcon = getWeatherIcon(day.condition);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-[80px]">
                      <span className="text-sm font-bold text-white w-16">
                        {getDayName(day.date, idx)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DayIcon className="w-5 h-5 text-[#FFD595]" />
                      <span className="text-xs text-white/50 w-20 text-center capitalize">
                        {day.description}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {day.pop > 0 && (
                        <span className="text-xs text-blue-400 flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          {day.pop}%
                        </span>
                      )}
                      <span className="text-sm font-bold text-white">
                        {day.tempMax}°
                      </span>
                      <span className="text-sm text-white/50">
                        {day.tempMin}°
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-yellow-400 text-sm">
                  {alerts[0].title}
                </p>
                <p className="text-yellow-400/70 text-xs mt-1">
                  {alerts[0].description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-yellow-400/50">
                  <Clock className="w-3 h-3" />
                  Valid until {alerts[0].validUntil}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAlertModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#46041F] rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-yellow-500/20"
            >
              <div className="bg-yellow-500/20 p-6 text-center relative">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="absolute top-4 right-4 text-yellow-400/80 hover:text-yellow-400"
                >
                  <X className="w-6 h-6" />
                </button>
                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-wider">
                  Weather Alert
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <h3 className="font-bold text-white mb-2">{alert.title}</h3>
                    <p className="text-white/70 text-sm">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          alert.severity === "severe"
                            ? "bg-red-500/20 text-red-400"
                            : alert.severity === "moderate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {alert.severity.charAt(0).toUpperCase() +
                          alert.severity.slice(1)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Until {alert.validUntil}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/5 border-t border-white/10">
                <p className="text-xs text-white/40 text-center">
                  We recommend rescheduling outdoor experiences during severe
                  weather conditions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherWidget;
