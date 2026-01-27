import { useState } from "react";
import {
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  ChevronRight,
  Check,
  Compass,
} from "lucide-react";
import api from "../services/api";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function JourneyBuilder() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    startLocation: null,
    days: 3,
    budget: 10000,
    interests: ["AgriRural", "HeritageCulture", "EcoAdventure"],
  });
  const [generatedJourney, setGeneratedJourney] = useState(null);
  const [loading, setLoading] = useState(false);

  const locations = [
    {
      name: "Chennai",
      lat: 13.0827,
      lng: 80.2707,
      desc: "Capital & Marina Beach",
      region: "Northern",
    },
    {
      name: "Madurai",
      lat: 9.9252,
      lng: 78.1198,
      desc: "Temple City",
      region: "Southern",
    },
    {
      name: "Thanjavur",
      lat: 10.787,
      lng: 79.1378,
      desc: "UNESCO Heritage",
      region: "Central",
    },
    {
      name: "Coimbatore",
      lat: 11.0168,
      lng: 76.9558,
      desc: "Manchester of South",
      region: "Western",
    },
    {
      name: "The Nilgiris",
      lat: 11.4102,
      lng: 76.695,
      desc: "Queen of Hills",
      region: "Western",
    },
    {
      name: "Kanyakumari",
      lat: 8.0883,
      lng: 77.5385,
      desc: "Land's End",
      region: "Southern",
    },
    {
      name: "Rameswaram",
      lat: 9.2876,
      lng: 79.3129,
      desc: "Island Town",
      region: "Southern",
    },
    {
      name: "Kodaikanal",
      lat: 10.2381,
      lng: 77.4892,
      desc: "Princess of Hills",
      region: "Southern",
    },
    {
      name: "Salem",
      lat: 11.6643,
      lng: 78.146,
      desc: "Steel City & Yercaud",
      region: "Western",
    },
    {
      name: "Tiruchirappalli",
      lat: 10.7905,
      lng: 78.7047,
      desc: "Rock Fort & Srirangam",
      region: "Central",
    },
    {
      name: "Vellore",
      lat: 12.9165,
      lng: 79.1325,
      desc: "Golden Temple",
      region: "Northern",
    },
    {
      name: "Tirunelveli",
      lat: 8.7139,
      lng: 77.7567,
      desc: "Nellai & Courtallam",
      region: "Southern",
    },
  ];

  const categories = [
    {
      id: "AgriRural",
      name: "Farm & Rural",
      icon: "🌾",
      desc: "Authentic farm experiences",
    },
    {
      id: "HeritageCulture",
      name: "Heritage & Culture",
      icon: "🏛️",
      desc: "Ancient temples & crafts",
    },
    {
      id: "EcoAdventure",
      name: "Eco & Adventure",
      icon: "⛰️",
      desc: "Trekking & nature",
    },
  ];

  const generateBundle = async () => {
    setLoading(true);
    try {
      const response = await api.post("/discovery/bundle/generate", {
        startLocation: {
          coordinates: [
            preferences.startLocation.lng,
            preferences.startLocation.lat,
          ],
          formattedAddress: preferences.startLocation.name,
        },
        days: preferences.days,
        interests: preferences.interests,
        budget: preferences.budget,
        language: user?.language || "english",
      });
      setGeneratedJourney(response.data.data);
      setStep(4);
    } catch (error) {
      console.error("Bundle generation failed:", error);
      alert("Failed to generate journey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (categoryId) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(categoryId)
        ? prev.interests.filter((id) => id !== categoryId)
        : [...prev.interests, categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/discovery-map")}
          className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
        >
          <Compass size={20} />
          Back to Discovery Map
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-purple-600" size={32} />
            <h1 className="text-4xl font-bold">
              {t("journey.ai_builder", "AI Journey Builder")}
            </h1>
          </div>
          <p className="text-gray-600">
            {t(
              "journey.subtitle",
              "Let AI create your perfect Tamil Nadu experience",
            )}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <Check size={20} /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-16 h-1 ${step > s ? "bg-purple-600" : "bg-gray-200"}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Where do you want to start?
              </h2>
              <p className="text-gray-600 mb-6">
                Select your starting location
              </p>
              <div className="grid grid-cols-2 gap-4">
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        startLocation: loc,
                      }))
                    }
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      preferences.startLocation?.name === loc.name
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <MapPin className="w-6 h-6 text-purple-600 mb-2" />
                    <h3 className="font-bold text-lg">{loc.name}</h3>
                    <p className="text-sm text-gray-500">{loc.desc}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!preferences.startLocation}
                className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">What interests you?</h2>
              <p className="text-gray-600 mb-6">
                Select one or more categories
              </p>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleInterest(cat.id)}
                    className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                      preferences.interests.includes(cat.id)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-bold text-lg">{cat.name}</h3>
                        <p className="text-sm text-gray-500">{cat.desc}</p>
                      </div>
                      {preferences.interests.includes(cat.id) && (
                        <Check className="ml-auto text-purple-600" size={24} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={preferences.interests.length === 0}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
              <p className="text-gray-600 mb-6">Customize your journey</p>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <Calendar size={20} className="text-purple-600" />
                    Number of Days: {preferences.days}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="7"
                    value={preferences.days}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        days: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>2 days</span>
                    <span>7 days</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 font-semibold mb-2">
                    <DollarSign size={20} className="text-purple-600" />
                    Budget: ₹{preferences.budget.toLocaleString("en-IN")}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={preferences.budget}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        budget: parseInt(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹5,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold mb-2">Your Journey Preview</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    📍 Starting from:{" "}
                    <strong>{preferences.startLocation.name}</strong>
                  </p>
                  <p>
                    📅 Duration: <strong>{preferences.days} days</strong>
                  </p>
                  <p>
                    💰 Budget:{" "}
                    <strong>
                      ₹{preferences.budget.toLocaleString("en-IN")}
                    </strong>
                  </p>
                  <p>
                    🎯 Interests:{" "}
                    <strong>{preferences.interests.length} categories</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={generateBundle}
                  disabled={loading}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Journey
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && generatedJourney && (
            <div>
              <div className="text-center mb-6">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Your AI-Generated Journey
                </h2>
                <p className="text-gray-600">{generatedJourney.name}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {generatedJourney.totalDays}
                    </div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      ₹{generatedJourney.totalPrice.toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm text-gray-600">Total Price</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      ₹
                      {generatedJourney.creatorEarnings.toLocaleString("en-IN")}
                    </div>
                    <div className="text-sm text-gray-600">
                      Creator Earnings (70%)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Journey Itinerary</h3>
                <div className="space-y-3">
                  {generatedJourney.listings.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        {item.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.listing.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {item.listing.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-green-600 font-semibold">
                            ₹{item.listing.price}
                          </span>
                          <span className="text-gray-500">
                            {Math.floor(item.duration / 60)}h{" "}
                            {item.duration % 60}m
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Create New Journey
                </button>
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
                  Book This Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
