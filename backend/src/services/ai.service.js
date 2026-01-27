import Listing from "../models/Listing.js";
import Journey from "../models/Journey.js";

const DISTRICTS = {
  Chennai: {
    famous: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
    lat: 13.0827,
    lng: 80.2707,
    region: "Northern",
    avgCost: 2000,
  },
  Thiruvallur: {
    famous: ["Poondi Reservoir", "Sri Veeraraghava Swamy Temple"],
    lat: 13.1311,
    lng: 79.9095,
    region: "Northern",
    avgCost: 1500,
  },
  Kanchipuram: {
    famous: ["Kamakshi Amman Temple", "Ekambareswarar Temple", "Silk Sarees"],
    lat: 12.8342,
    lng: 79.7036,
    region: "Northern",
    avgCost: 1800,
  },
  Chengalpattu: {
    famous: ["Vedanthangal Bird Sanctuary", "Subrahmanya Temple"],
    lat: 12.6916,
    lng: 79.9755,
    region: "Northern",
    avgCost: 1600,
  },
  Vellore: {
    famous: ["Vellore Fort", "Golden Temple", "Jalakandeswarar Temple"],
    lat: 12.9165,
    lng: 79.1325,
    region: "Northern",
    avgCost: 1700,
  },
  Tiruvannamalai: {
    famous: ["Arunachaleswarar Temple", "Ramana Maharshi Ashram"],
    lat: 12.2253,
    lng: 79.0747,
    region: "Northern",
    avgCost: 1800,
  },
  Ranipet: {
    famous: ["Arasalar River", "Sri Lakshmi Narasimha Swamy Temple"],
    lat: 12.9222,
    lng: 79.3333,
    region: "Northern",
    avgCost: 1400,
  },
  Tirupattur: {
    famous: ["Javadi Hills", "Krishnagiri Dam"],
    lat: 12.4967,
    lng: 78.5725,
    region: "Northern",
    avgCost: 1500,
  },
  Krishnagiri: {
    famous: ["Krishnagiri Dam", "Shree Parshwa Padmavathi Shaktipeeth"],
    lat: 12.5266,
    lng: 78.2134,
    region: "Northern",
    avgCost: 1600,
  },
  Dharmapuri: {
    famous: ["Hogenakkal Falls", "Theerthamalai Temple"],
    lat: 12.1211,
    lng: 78.1582,
    region: "Northern",
    avgCost: 1700,
  },
  Viluppuram: {
    famous: ["Gingee Fort", "Thiruvakkarai Temple"],
    lat: 11.9401,
    lng: 79.4861,
    region: "Northern",
    avgCost: 1500,
  },
  Kallakurichi: {
    famous: ["Gomuki Dam", "Saduragiri Hills"],
    lat: 11.7398,
    lng: 78.9594,
    region: "Northern",
    avgCost: 1400,
  },

  Coimbatore: {
    famous: [
      "Marudamalai Temple",
      "Kovai Kutralam Falls",
      "Siruvani Waterfalls",
    ],
    lat: 11.0168,
    lng: 76.9558,
    region: "Western",
    avgCost: 2200,
  },
  "The Nilgiris": {
    famous: [
      "Ooty Botanical Gardens",
      "Doddabetta Peak",
      "Nilgiri Mountain Railway",
    ],
    lat: 11.4102,
    lng: 76.695,
    region: "Western",
    avgCost: 3500,
  },
  Erode: {
    famous: ["Bannari Amman Temple", "Bhavani Sangameshwarar Temple"],
    lat: 11.341,
    lng: 77.7172,
    region: "Western",
    avgCost: 1600,
  },
  Tiruppur: {
    famous: ["Tiruppur Kumaran Memorial", "Noyyal River"],
    lat: 11.1085,
    lng: 77.3411,
    region: "Western",
    avgCost: 1700,
  },
  Salem: {
    famous: ["Yercaud Hill Station", "Mettur Dam", "Kiliyur Falls"],
    lat: 11.6643,
    lng: 78.146,
    region: "Western",
    avgCost: 1800,
  },
  Namakkal: {
    famous: ["Namakkal Anjaneyar Temple", "Kolli Hills"],
    lat: 11.2189,
    lng: 78.1677,
    region: "Western",
    avgCost: 1500,
  },
  Karur: {
    famous: ["Kalyana Pasupatheeswarar Temple", "Mayanur Weir"],
    lat: 10.9601,
    lng: 78.0766,
    region: "Western",
    avgCost: 1400,
  },

  Thanjavur: {
    famous: [
      "Brihadeeswarar Temple (UNESCO)",
      "Thanjavur Palace",
      "Saraswathi Mahal Library",
    ],
    lat: 10.787,
    lng: 79.1378,
    region: "Central",
    avgCost: 1900,
  },
  Tiruchirappalli: {
    famous: ["Rock Fort Temple", "Srirangam Temple", "Kallanai Dam"],
    lat: 10.7905,
    lng: 78.7047,
    region: "Central",
    avgCost: 1800,
  },
  Nagapattinam: {
    famous: [
      "Velankanni Church",
      "Nagore Dargah",
      "Sikkal Singaravelar Temple",
    ],
    lat: 10.7661,
    lng: 79.8449,
    region: "Central",
    avgCost: 1600,
  },
  Thiruvarur: {
    famous: ["Thyagaraja Temple", "Muthupet Mangrove Forest"],
    lat: 10.7719,
    lng: 79.6345,
    region: "Central",
    avgCost: 1500,
  },
  Mayiladuthurai: {
    famous: ["Mayuranathaswami Temple", "Parimala Ranganathar Temple"],
    lat: 11.1033,
    lng: 79.6528,
    region: "Central",
    avgCost: 1400,
  },
  Ariyalur: {
    famous: ["Gangaikonda Cholapuram", "Fossil Park"],
    lat: 11.1401,
    lng: 79.0766,
    region: "Central",
    avgCost: 1300,
  },
  Perambalur: {
    famous: ["Kunnandarkoil Cave Temple", "Varagur Vinayagar Temple"],
    lat: 11.2321,
    lng: 78.8801,
    region: "Central",
    avgCost: 1300,
  },
  Pudukkottai: {
    famous: ["Thirumayam Fort", "Avudaiyarkoil Temple"],
    lat: 10.3833,
    lng: 78.82,
    region: "Central",
    avgCost: 1500,
  },
  Cuddalore: {
    famous: [
      "Pichavaram Mangrove Forest",
      "Silver Beach",
      "Chidambaram Nataraja Temple",
    ],
    lat: 11.7474,
    lng: 79.771,
    region: "Central",
    avgCost: 1700,
  },

  Madurai: {
    famous: [
      "Meenakshi Amman Temple",
      "Thirumalai Nayak Palace",
      "Gandhi Memorial Museum",
    ],
    lat: 9.9252,
    lng: 78.1198,
    region: "Southern",
    avgCost: 2000,
  },
  Theni: {
    famous: ["Megamalai", "Vaigai Dam", "Suruli Falls"],
    lat: 10.0104,
    lng: 77.4769,
    region: "Southern",
    avgCost: 1800,
  },
  Dindigul: {
    famous: [
      "Dindigul Fort",
      "Kodaikanal Hill Station",
      "Palani Murugan Temple",
    ],
    lat: 10.3673,
    lng: 77.9803,
    region: "Southern",
    avgCost: 2200,
  },
  Ramanathapuram: {
    famous: ["Rameswaram Temple", "Pamban Bridge", "Dhanushkodi"],
    lat: 9.3639,
    lng: 78.8377,
    region: "Southern",
    avgCost: 2100,
  },
  Sivaganga: {
    famous: ["Virasozhia Nagar", "Karaikudi (Chettinad Cuisine)"],
    lat: 9.8433,
    lng: 78.4809,
    region: "Southern",
    avgCost: 1600,
  },
  Virudhunagar: {
    famous: ["Srivilliputhur Andal Temple", "Rajapalayam Dog Breed"],
    lat: 9.5811,
    lng: 77.9624,
    region: "Southern",
    avgCost: 1500,
  },
  Tenkasi: {
    famous: ["Courtallam Falls", "Kutralam Waterfalls"],
    lat: 8.9639,
    lng: 77.3152,
    region: "Southern",
    avgCost: 1700,
  },
  Tirunelveli: {
    famous: ["Nellaiappar Temple", "Manimuthar Falls", "Papanasam"],
    lat: 8.7139,
    lng: 77.7567,
    region: "Southern",
    avgCost: 1800,
  },
  Thoothukudi: {
    famous: ["Pearl City", "Tiruchendur Murugan Temple", "Hare Island"],
    lat: 8.7642,
    lng: 78.1348,
    region: "Southern",
    avgCost: 1700,
  },
  Kanyakumari: {
    famous: [
      "Vivekananda Rock Memorial",
      "Thiruvalluvar Statue",
      "Sunrise & Sunset Point",
    ],
    lat: 8.0883,
    lng: 77.5385,
    region: "Southern",
    avgCost: 2500,
  },
};

class AIService {
  async discoverNearby(latitude, longitude, radius = 30) {
    try {
      const nearbyListings = await Listing.find({
        "location.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: radius * 1000,
          },
        },
        status: "approved",
      })
        .populate("creator", "name creatorProfile")
        .limit(20);

      const district = this.findDistrict(latitude, longitude);
      const famousPlaces = DISTRICTS[district]?.famous || [];

      const categorized = {
        agriRural: nearbyListings.filter((l) => l.category === "AgriRural"),
        heritage: nearbyListings.filter(
          (l) => l.category === "HeritageCulture",
        ),
        ecoAdventure: nearbyListings.filter(
          (l) => l.category === "EcoAdventure",
        ),
        famousPlaces: famousPlaces.map((place) => ({
          name: place,
          type: "famous",
          district,
        })),
      };

      return {
        location: { latitude, longitude, district },
        radius,
        discoveries: categorized,
        totalFound: nearbyListings.length,
        specialExperiences: this.generateSpecialExperiences(categorized),
      };
    } catch (error) {
      throw new Error(`Discovery failed: ${error.message}`);
    }
  }

  generateSpecialExperiences(categorized) {
    const experiences = [];

    if (categorized.agriRural.length > 0) {
      experiences.push({
        type: "Authentic Farm Life",
        description: "Learn organic farming & taste fresh village food",
        listings: categorized.agriRural.slice(0, 2).map((l) => l._id),
      });
    }

    if (categorized.heritage.length > 0) {
      experiences.push({
        type: "Living Heritage",
        description: "Meet artisans preserving ancient crafts",
        listings: categorized.heritage.slice(0, 2).map((l) => l._id),
      });
    }

    if (categorized.ecoAdventure.length > 0) {
      experiences.push({
        type: "Nature Immersion",
        description: "Trek hidden trails & explore wildlife",
        listings: categorized.ecoAdventure.slice(0, 2).map((l) => l._id),
      });
    }

    return experiences;
  }

  async generateJourneyBundle(preferences) {
    const {
      startLocation,
      days = 3,
      interests = ["AgriRural", "HeritageCulture", "EcoAdventure"],
      budget = 10000,
      language = "english",
    } = preferences;

    try {
      const [lng, lat] = startLocation.coordinates;

      const listings = await Listing.find({
        "location.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: 50000,
          },
        },
        category: { $in: interests },
        status: "approved",
      })
        .populate("creator", "name creatorProfile")
        .limit(20);

      const bundle = this.createOptimalBundle(listings, days, budget);

      const journey = {
        name: `${days}-Day Authentic Tamil Nadu Experience`,
        description: `Curated journey combining ${interests.join(", ")}`,
        listings: bundle.selectedListings,
        totalDays: days,
        totalPrice: bundle.totalPrice,
        creatorEarnings: bundle.totalPrice * 0.7,
        sectors: interests,
        startLocation: {
          type: "Point",
          coordinates: [lng, lat],
          formattedAddress: startLocation.formattedAddress,
        },
        suitable: language === "english" ? "foreigners" : "domestic",
        languages: [language],
        isAiGenerated: true,
      };

      return journey;
    } catch (error) {
      throw new Error(`Bundle generation failed: ${error.message}`);
    }
  }

  createOptimalBundle(listings, days, budget) {
    const dailyBudget = budget / days;
    const selectedListings = [];
    const categories = ["AgriRural", "HeritageCulture", "EcoAdventure"];

    let totalPrice = 0;
    let day = 1;

    for (let i = 0; i < days && listings.length > 0; i++) {
      const categoryIndex = i % categories.length;
      const category = categories[categoryIndex];

      const suitable = listings.filter(
        (l) =>
          l.category === category &&
          l.price <= dailyBudget &&
          !selectedListings.find(
            (sl) => sl.listing.toString() === l._id.toString(),
          ),
      );

      if (suitable.length > 0) {
        const selected = suitable[0];
        selectedListings.push({
          listing: selected._id,
          day: day,
          order: i + 1,
          duration: selected.duration,
        });
        totalPrice += selected.price;
        day++;
      }
    }

    return {
      selectedListings,
      totalPrice,
      savings: budget - totalPrice,
    };
  }

  async getSeasonalRecommendations(month) {
    const seasonalMap = {
      monsoon: [6, 7, 8, 9],
      winter: [11, 12, 1, 2],
      summer: [3, 4, 5, 10],
    };

    let currentSeason = "winter";
    for (const [season, months] of Object.entries(seasonalMap)) {
      if (months.includes(month)) {
        currentSeason = season;
        break;
      }
    }

    const recommendations = {
      monsoon: {
        avoid: ["Hill stations can be foggy"],
        best: [
          "Bird watching",
          "Farm experiences with fresh crops",
          "Temple tours indoors",
        ],
      },
      winter: {
        avoid: [],
        best: ["All outdoor activities", "Trekking", "Heritage walks"],
      },
      summer: {
        avoid: ["Midday outdoor activities"],
        best: [
          "Early morning farm tours",
          "Temple visits",
          "Coastal experiences",
        ],
      },
    };

    return recommendations[currentSeason];
  }

  findDistrict(lat, lng) {
    let closestDistrict = "Unknown";
    let minDistance = Infinity;

    for (const [district, info] of Object.entries(DISTRICTS)) {
      const distance = this.calculateDistance(lat, lng, info.lat, info.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestDistrict = district;
      }
    }

    return closestDistrict;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export default new AIService();
