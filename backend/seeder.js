import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Listing from "./src/models/Listing.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({ email: { $ne: "admin@heritagefarm.tn" } });
    await Listing.deleteMany({});

    // Create a dummy creator
    const creator = await User.create({
      name: "Ramesh Farmer",
      email: "ramesh@farm.tn",
      password: "password123",
      role: "creator",
    });

    const listings = [
      {
        creator: creator._id,
        title: "Organic Turmeric Farm Tour",
        description:
          "Join Ramesh in Erode for an authentic organic turmeric farming experience. Learn about processing and sustainable agriculture.",
        category: "AgriRural",
        price: 1200,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Erode",
          district: "Erode",
          coordinates: [77.7172, 11.341],
        },
        images: [
          "https://image2url.com/r2/default/images/1769663572058-0e7157d7-5ccd-4f91-a5ff-40f3105d5525.jpeg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thanjavur Temple Heritage Walk",
        description:
          "Explore the architectural marvels of the Big Temple with a local expert. Deep dive into Chola history and iconography.",
        category: "HeritageCulture",
        price: 800,
        capacity: 15,
        duration: 120,
        difficulty: "Moderate",
        location: {
          city: "Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1378, 10.787],
        },
        images: [
          "https://image2url.com/r2/default/images/1769663709133-b00e351c-a013-44ae-8a2b-10e2cd2f4ccc.jpeg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nilgiris Tea Trail Trek",
        description:
          "Breathtaking trek through organic tea estates in Coonoor. Spot rare birds and enjoy freshly brewed tea at the summit.",
        category: "EcoAdventure",
        price: 2500,
        capacity: 8,
        duration: 360,
        difficulty: "Challenging",
        location: {
          city: "Coonoor",
          district: "Nilgiris",
          coordinates: [76.7806, 11.353],
        },
        images: [
          "https://images.unsplash.com/photo-1597843796322-90f7d5663781?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      // Chennai Listings
      {
        creator: creator._id,
        title: "Kapaleeshwarar Temple",
        description:
          "Explore the vibrant Dravidian architecture of Kapaleeshwarar Temple and the lively streets of Mylapore filled with tradition, prasadam, and rhythm.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2707, 13.0339],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664731243-1d4142c3-ec5b-44b4-92e4-e091ecc86cf3.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Snow Kingdom Indoor Escape",
        description:
          "Beat Chennai heat with a sub-zero adventure featuring ice slides, snow play zones, and controlled Arctic vibes.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2483, 12.9054],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664796336-d4d87cb2-43fa-44d5-9898-296dbb51a8cd.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marina Beach Sunrise Walk",
        description:
          "Early morning guided walk along Marina Beach with fishermen activity, local snacks, and endless Bay of Bengal views.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2837, 13.05],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664896104-9d817bd0-019f-459d-8cef-4673c899a333.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Edward Elliot's Beach",
        description:
          "A peaceful coastal experience at Besant Nagar with sea breeze, cultural landmarks, and sunset serenity.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2705, 12.9987],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670168766-4ffbeeb8-242c-49b5-9bda-62409913fd46.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Leela Palace Luxury Heritage",
        description:
          "Discover Indo-Chettinad architecture, luxury hospitality, and coastal elegance at one of Chennai's iconic landmarks.",
        category: "HeritageCulture",
        price: 2000,
        capacity: 10,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2702, 13.0176],
        },
        images: [
          "https://image2url.com/r2/default/images/1769669867581-c5873ad4-e104-4cd7-9584-b1f3dbe430f0.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "T Nagar Bazaar Walk",
        description:
          "Navigate the chaos of Chennai's busiest shopping district, from silk sarees to street snacks and temple stops.",
        category: "HeritageCulture",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2337, 13.0423],
        },
        images: [
          "https://image2url.com/r2/default/images/1769669779837-8703e3c3-0259-4a9b-9ab8-491e31ee8068.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Wonderla Amusement Park Adventure",
        description:
          "High-energy amusement park experience with water rides, roller coasters, and full-day thrills.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 40,
        duration: 360,
        difficulty: "Moderate",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.0289, 13.0099],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670065144-7d785ea8-6f6e-479c-a4b8-7860b9aeff57.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Government Museum - Madras",
        description:
          "Guided exploration of one of India's oldest museums, featuring archaeology, bronze sculptures, and colonial history.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.258, 13.0722],
        },
        images: [
          "https://image2url.com/r2/default/images/1769669669711-2c09caef-ea7e-4b15-8786-fcffb824b3b0.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Fort St. George",
        description:
          "Walk through the birthplace of British Chennai with military architecture, museums, and historic churches.",
        category: "HeritageCulture",
        price: 450,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.287, 13.0827],
        },
        images: [
          "https://image2url.com/r2/default/images/1769669599020-b8e50003-ad87-4b34-a3dc-3218cbfe058a.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Guindy National Park",
        description:
          "Explore one of India's few urban national parks with guided trails, deer sightings, and native flora.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2206, 13.0067],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670018511-79b801f8-8b51-4372-91ac-c727870bddfe.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Santhome Basilica Church Visit",
        description:
          "Explore the historic Santhome Basilica, one of the few churches built over an apostle's tomb.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2767, 13.0338],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671161481-aaf69ddb-b3a0-4b3d-8c91-6eeeeb2ce937.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Parthasarathy Temple",
        description:
          "Guided walk through Triplicane focusing on Parthasarathy Temple history, rituals, and streets.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2785, 13.0577],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670974811-ba6e651e-c9f6-40e8-a50b-20609225a379.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chennai Snake Park Conservation Tour",
        description:
          "Educational tour of Chennai Snake Park focusing on reptiles, conservation, and awareness.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2391, 13.0108],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671539319-1edb6c7a-60e8-4fa8-b2ee-0cf7aee3674a.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chetpet Eco Park & Lake Walk",
        description:
          "Leisure eco walk around Chetpet Lake focusing on urban wetlands and birdlife.",
        category: "EcoAdventure",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2426, 13.0729],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671855250-c5c53550-7d5a-4be4-b858-80ece36034ad.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Semmozhi Poonga Botanical Walk",
        description:
          "Guided walk through Semmozhi Poonga highlighting native plants and urban green design.",
        category: "EcoAdventure",
        price: 200,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.25, 13.0487],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671472395-9b828d35-6e16-44e9-978a-be1a76336cf3.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Theosophical Society Natural Heritage",
        description:
          "Explore heritage buildings, banyan trees, and spiritual history at Adyar Theosophical Society.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.263, 13.0064],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670877678-eb2b8d67-5919-4b50-8508-0198e56fc458.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pallikaranai Marshland Eco Exploration",
        description:
          "Eco exploration of Pallikaranai Marsh focusing on wetlands, birds, and urban conservation.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2094, 12.9467],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671283067-b0d0557d-a441-45b5-bd40-f592db18cf46.blob",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Covelong Beach Fishing",
        description:
          "Walk along Covelong Beach exploring coastal ecology and traditional fishing livelihoods.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2606, 12.7916],
        },
        images: [
          "https://image2url.com/r2/default/images/1769670744263-f2c8a0c0-7387-4d03-a2aa-91fd6f243de9.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Taramani Green Belt & MRTS Urban Space",
        description:
          "Urban eco walk along Taramani green belt focusing on rail corridors and city ecology.",
        category: "EcoAdventure",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chennai",
          district: "Chennai",
          coordinates: [80.2445, 12.9843],
        },
        images: [
          "https://image2url.com/r2/default/images/1769671778385-34f204f4-44e4-4aed-9221-80de7c81c7a2.png",
        ],
        status: "approved",
      },
      // Tiruvallur Listings
      {
        creator: creator._id,
        title: "Veera Raghava Perumal Temple Heritage Walk",
        description:
          "Cultural walk around one of the Divya Desams with deep Vaishnavite history.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thiruvallur",
          district: "Tiruvallur",
          coordinates: [79.912, 13.1436],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruttani Murugan Temple Pilgrim Trail",
        description:
          "Temple visit and hill walk at one of the Arupadai Veedu sites.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tiruttani",
          district: "Tiruvallur",
          coordinates: [79.6165, 13.1759],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Poondi Reservoir Eco Walk",
        description: "Guided eco walk along Chennai's key water reservoir.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Poondi",
          district: "Tiruvallur",
          coordinates: [79.8575, 13.2307],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pulicat Lake Birding Trail (TN Side)",
        description:
          "Birdwatching experience along the Tamil Nadu side of Pulicat Lake.",
        category: "EcoAdventure",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Pulicat",
          district: "Tiruvallur",
          coordinates: [80.3192, 13.4167],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pulicat Dutch Cemetery Heritage Visit",
        description:
          "Visit to the colonial-era Dutch cemetery and coastal history zone.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Pulicat",
          district: "Tiruvallur",
          coordinates: [80.3238, 13.4142],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pazhaverkadu Fishing Village Experience",
        description:
          "Cultural interaction with traditional fishing communities.",
        category: "HeritageCulture",
        price: 500,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Pazhaverkadu",
          district: "Tiruvallur",
          coordinates: [80.318, 13.4189],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ennore Creek Eco Exploration",
        description:
          "Eco walk highlighting estuarine biodiversity and water systems.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Ennore",
          district: "Tiruvallur",
          coordinates: [80.309, 13.2146],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kosasthalaiyar River Eco Stretch",
        description:
          "River walk focusing on irrigation, floods, and river ecology.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tiruvallur",
          district: "Tiruvallur",
          coordinates: [79.8894, 13.1671],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruvallur Agricultural Belt Tour",
        description:
          "Guided tour through paddy fields and peri-urban farming zones.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Tiruvallur",
          district: "Tiruvallur",
          coordinates: [79.8642, 13.1547],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Minjur Backwaters Kayak Walk",
        description:
          "Backwater exploration along canals and brackish ecosystems.",
        category: "EcoAdventure",
        price: 600,
        capacity: 10,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Minjur",
          district: "Tiruvallur",
          coordinates: [80.2664, 13.2794],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Avadi Lake Nature Walk",
        description:
          "Urban wetland walk highlighting migratory birds and lake ecology.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Avadi",
          district: "Tiruvallur",
          coordinates: [80.1014, 13.1145],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks & Eri System Heritage Walk",
        description:
          "Walk explaining traditional water storage and temple tank systems.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruvallur",
          district: "Tiruvallur",
          coordinates: [79.9061, 13.1398],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gummidipoondi Wetlands Walk",
        description:
          "Seasonal wetland exploration with bird and plant spotting.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Gummidipoondi",
          district: "Tiruvallur",
          coordinates: [80.1341, 13.4103],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Periapalayam Bhavani Amman Temple Visit",
        description: "Cultural visit to a prominent riverside Amman temple.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Periapalayam",
          district: "Tiruvallur",
          coordinates: [79.8931, 13.2491],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruttani Hill Trekking Trail",
        description:
          "Short trek along the forested hill path leading to Tiruttani.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Tiruttani",
          district: "Tiruvallur",
          coordinates: [79.6104, 13.1788],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Handicraft Village Walk",
        description:
          "Village walk showcasing traditional crafts and livelihoods.",
        category: "AgriRural",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Tiruvallur",
          district: "Tiruvallur",
          coordinates: [79.8732, 13.1874],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruvallur Sacred Groves Walk",
        description:
          "Guided walk through preserved sacred groves and folk ecology.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Tiruvallur",
          district: "Tiruvallur",
          coordinates: [79.8426, 13.2015],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellanur Lake Eco Walk",
        description: "Lake-side eco walk focusing on irrigation and birdlife.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vellanur",
          district: "Tiruvallur",
          coordinates: [79.9796, 13.0883],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      // Kanchipuram Listings
      {
        creator: creator._id,
        title: "Ekambareswarar Temple Heritage Walk",
        description:
          "Guided walk around the Pancha Bhoota earth temple and ancient temple tanks.",
        category: "HeritageCulture",
        price: 350,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.7006, 12.8433],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kamakshi Amman Temple Cultural Visit",
        description:
          "Cultural walk focused on Shakta traditions and temple rituals.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6893, 12.8412],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664104569-ce5dd11b-39c7-4a7b-92bf-d6a2eab17e44.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Varadaraja Perumal Divya Desam Walk",
        description: "Heritage walk through one of the 108 Divya Desams.",
        category: "HeritageCulture",
        price: 350,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6937, 12.8485],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kailasanathar Temple Architecture Tour",
        description:
          "Architecture-focused tour of the oldest structural temple in Kanchi.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6846, 12.8447],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaikunta Perumal Temple History Walk",
        description:
          "Guided walk exploring Pallava-era political and temple history.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6839, 12.8468],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kanchi Kudil Heritage Experience",
        description:
          "Cultural experience inside a preserved traditional Kanchi house.",
        category: "HeritageCulture",
        price: 250,
        capacity: 15,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6912, 12.8425],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kanchipuram Heritage Streets Walk",
        description:
          "Walk through ancient streets linking temples, tanks, and markets.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6901, 12.8451],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kanchi Silk Weaving Cluster Tour",
        description:
          "Guided visit to traditional silk saree weaving households.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.7024, 12.8503],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Madurantakam Lake Eco Walk",
        description:
          "Lake-side eco walk focusing on irrigation and bird habitats.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Madurantakam",
          district: "Kanchipuram",
          coordinates: [79.8806, 12.5129],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vedanthangal Bird Sanctuary Trail",
        description:
          "Seasonal birdwatching walk in India's oldest bird sanctuary.",
        category: "EcoAdventure",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vedanthangal",
          district: "Kanchipuram",
          coordinates: [79.8522, 12.5456],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karikili Bird Sanctuary Walk",
        description: "Quiet birding experience around a lesser-known wetland.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Karikili",
          district: "Kanchipuram",
          coordinates: [79.8102, 12.5841],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolavai Lake Nature Walk",
        description: "Urban-rural lake walk highlighting water conservation.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chengalpattu",
          district: "Kanchipuram",
          coordinates: [79.9824, 12.6842],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Uthiramerur Historic Village Walk",
        description:
          "Village walk exploring ancient democratic inscriptions and temples.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Uthiramerur",
          district: "Kanchipuram",
          coordinates: [79.7578, 12.6146],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Walajabad Agricultural Belt Tour",
        description:
          "Farm visit through paddy fields and canal-irrigated lands.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Walajabad",
          district: "Kanchipuram",
          coordinates: [79.7819, 12.7881],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks of Kanchipuram Walk",
        description:
          "Heritage walk explaining traditional water management systems.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6945, 12.8439],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664003368-28277e3f-2e70-40d5-80f6-8914f8ef70e9.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kanchi Mutts & Vedic Schools Visit",
        description: "Cultural tour of traditional mutts and learning centers.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6884, 12.8461],
        },
        images: [
          "https://image2url.com/r2/default/images/1769664386353-16f10572-bc57-4667-90b7-9e283e688d3d.blob",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cheyyar River Basin Eco Walk",
        description:
          "River-side walk focusing on agriculture and seasonal ecology.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.6654, 12.7652],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thiruporur Murugan Temple Trail",
        description: "Temple visit combined with a gentle hill-side walk.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thiruporur",
          district: "Kanchipuram",
          coordinates: [80.0404, 12.7214],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Loom Villages Experience",
        description:
          "Village walk through handloom and powerloom weaving communities.",
        category: "AgriRural",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.7314, 12.8072],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Kanchipuram Walk",
        description:
          "Guided walk through preserved sacred groves and folk ecology.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Kanchipuram",
          district: "Kanchipuram",
          coordinates: [79.7126, 12.8295],
        },
        images: [
          "https://image2url.com/r2/default/images/1769663804144-3d38979c-8123-42a6-8580-183dfd4162a5.png",
        ],
        status: "approved",
      },
      // Chengalpattu Listings
      {
        creator: creator._id,
        title: "Mahabalipuram Shore Temple Heritage Walk",
        description:
          "Guided walk around the UNESCO-listed Shore Temple and coastal Pallava history.",
        category: "HeritageCulture",
        price: 500,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mahabalipuram",
          district: "Chengalpattu",
          coordinates: [80.1991, 12.6208],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pancha Rathas Architecture Trail",
        description:
          "Exploration of monolithic rathas showcasing early Dravidian architecture.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Mahabalipuram",
          district: "Chengalpattu",
          coordinates: [80.1936, 12.6169],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Arjuna's Penance Heritage Walk",
        description:
          "Interpretive walk around the massive rock relief narrating epic legends.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Mahabalipuram",
          district: "Chengalpattu",
          coordinates: [80.1954, 12.6184],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Alamparai Fort Coastal Heritage Visit",
        description:
          "Visit to a sea-facing fort linked to colonial maritime history.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Alamparai",
          district: "Chengalpattu",
          coordinates: [79.9691, 12.4168],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vedanthangal Bird Sanctuary Trail",
        description:
          "Seasonal birdwatching trail in India's oldest bird sanctuary.",
        category: "EcoAdventure",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vedanthangal",
          district: "Chengalpattu",
          coordinates: [79.8522, 12.5456],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karikili Bird Sanctuary Walk",
        description:
          "Quiet eco walk around a lesser-known wetland bird habitat.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Karikili",
          district: "Chengalpattu",
          coordinates: [79.8102, 12.5841],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Madurantakam Lake Eco Walk",
        description:
          "Lake-side walk focusing on irrigation heritage and birdlife.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Madurantakam",
          district: "Chengalpattu",
          coordinates: [79.8806, 12.5129],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolavai Lake Nature Walk",
        description: "Urban-rural lake walk highlighting water conservation.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chengalpattu",
          district: "Chengalpattu",
          coordinates: [79.9824, 12.6842],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Muttukadu Backwaters Experience",
        description: "Backwater exploration highlighting estuarine ecosystems.",
        category: "EcoAdventure",
        price: 600,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Muttukadu",
          district: "Chengalpattu",
          coordinates: [80.2334, 12.787],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Madras Crocodile Bank Visit",
        description:
          "Educational visit to a reptile conservation and research center.",
        category: "EcoAdventure",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vadanemmeli",
          district: "Chengalpattu",
          coordinates: [80.2456, 12.7236],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Covelong Beach Coastal Walk",
        description:
          "Relaxed beach walk highlighting fishing culture and surf zones.",
        category: "EcoAdventure",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Covelong",
          district: "Chengalpattu",
          coordinates: [80.2385, 12.7854],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sadras Dutch Fort Heritage Visit",
        description:
          "Visit to a coastal fort reflecting Dutch colonial history.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Sadras",
          district: "Chengalpattu",
          coordinates: [80.2412, 12.5637],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nenmeli Rural Village Walk",
        description:
          "Village walk showcasing agrarian life and local traditions.",
        category: "AgriRural",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Nenmeli",
          district: "Chengalpattu",
          coordinates: [80.0158, 12.7316],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cheyyar River Eco Stretch Walk",
        description:
          "River-side walk focusing on agriculture and seasonal ecology.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Chengalpattu",
          district: "Chengalpattu",
          coordinates: [79.9485, 12.6403],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalpakkam Coastal Eco Stretch",
        description:
          "Coastal walk focusing on dunes, wetlands, and shoreline ecology.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kalpakkam",
          district: "Chengalpattu",
          coordinates: [80.1723, 12.5584],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Paddy Fields Belt Tour",
        description:
          "Guided tour through canal-irrigated paddy cultivation zones.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Chengalpattu",
          district: "Chengalpattu",
          coordinates: [79.9612, 12.6724],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Heritage Streets of Mamallapuram Walk",
        description:
          "Cultural walk through historic streets and artisan quarters.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Mahabalipuram",
          district: "Chengalpattu",
          coordinates: [80.198, 12.6194],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Salt Pan Landscape Walk",
        description:
          "Educational walk through traditional coastal salt pan areas.",
        category: "AgriRural",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Coastal Chengalpattu",
          district: "Chengalpattu",
          coordinates: [80.2146, 12.7015],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Chengalpattu Walk",
        description:
          "Guided walk through preserved sacred groves and folk ecology.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Chengalpattu",
          district: "Chengalpattu",
          coordinates: [79.9337, 12.6908],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Coastal Wetlands Eco Trail",
        description:
          "Eco trail through lagoons, marshes, and coastal vegetation.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Coastal Chengalpattu",
          district: "Chengalpattu",
          coordinates: [80.2268, 12.7421],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=80&w=800",
        ],
        status: "approved",
      },
      // Vellore Listings
      {
        creator: creator._id,
        title: "Vellore Fort & Jalakandeswarar Temple Walk",
        description:
          "Heritage walk exploring the historic Vellore Fort and its iconic temple.",
        category: "HeritageCulture",
        price: 400,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vellore",
          district: "Vellore",
          coordinates: [79.1325, 12.9165],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellore Government Museum Visit",
        description:
          "Curated visit covering archaeology, anthropology, and regional history.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vellore",
          district: "Vellore",
          coordinates: [79.1342, 12.9181],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sripuram Golden Temple Spiritual Walk",
        description:
          "Guided walk around the spiritual complex and its symbolic pathways.",
        category: "HeritageCulture",
        price: 300,
        capacity: 40,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thirumalaikodi",
          district: "Vellore",
          coordinates: [79.1045, 12.9627],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Amirthi Zoological Park Trail",
        description: "Eco trail through a protected zoo-forest landscape.",
        category: "EcoAdventure",
        price: 500,
        capacity: 20,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Amirthi",
          district: "Vellore",
          coordinates: [79.2376, 12.8744],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Amirthi Waterfalls Nature Walk",
        description: "Seasonal waterfall walk through forested terrain.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Amirthi",
          district: "Vellore",
          coordinates: [79.2419, 12.8698],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palar River Basin Eco Walk",
        description:
          "River basin walk highlighting water use, ecology, and settlements.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.1802, 12.9054],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yelagiri Hills Nature Exploration",
        description:
          "Hill exploration covering viewpoints, flora, and local life.",
        category: "EcoAdventure",
        price: 600,
        capacity: 20,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Yelagiri",
          district: "Vellore",
          coordinates: [78.6287, 12.587],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jalagamparai Waterfalls Trek",
        description: "Short trek leading to a scenic seasonal waterfall.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Yelagiri",
          district: "Vellore",
          coordinates: [78.6209, 12.5746],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vainu Bappu Observatory Visit",
        description:
          "Educational visit to India's major astronomical observatory.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kavalur",
          district: "Vellore",
          coordinates: [78.8231, 12.5779],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Handloom Villages Walk",
        description:
          "Village walk exploring traditional weaving and artisan livelihoods.",
        category: "AgriRural",
        price: 400,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.0954, 12.8806],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks of Vellore Walk",
        description: "Heritage walk around historic temple water tanks.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vellore",
          district: "Vellore",
          coordinates: [79.1361, 12.9142],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kavalur Forest Edge Nature Walk",
        description: "Guided walk along forest edges and rural settlements.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kavalur",
          district: "Vellore",
          coordinates: [78.8294, 12.5803],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Vellore Walk",
        description: "Eco-cultural walk through preserved sacred groves.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.0628, 12.8921],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellore Heritage Streets Walk",
        description:
          "Street walk covering markets, temples, and colonial-era layouts.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vellore",
          district: "Vellore",
          coordinates: [79.1306, 12.9178],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agrarian Villages Belt Tour",
        description: "Guided tour through irrigated farming villages.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.0875, 12.9016],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yelagiri Trekking Trails",
        description: "Guided trekking experience across Yelagiri hill trails.",
        category: "EcoAdventure",
        price: 700,
        capacity: 12,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Yelagiri",
          district: "Vellore",
          coordinates: [78.6341, 12.5932],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Irrigation Eri System Walk",
        description:
          "Educational walk on traditional tank-based irrigation systems.",
        category: "AgriRural",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.0726, 12.8884],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ancient Trade Route Zones Walk",
        description: "Historical walk tracing old inland trade routes.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Vellore",
          district: "Vellore",
          coordinates: [79.0419, 12.8736],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yelagiri Hill Viewpoints Walk",
        description:
          "Scenic walk covering major viewpoints in the Yelagiri hills.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Yelagiri",
          district: "Vellore",
          coordinates: [78.6274, 12.5891],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      // Ranipet Listings
      {
        creator: creator._id,
        title: "Ratnagiri Murugan Temple Hill Walk",
        description:
          "Spiritual hill walk to the Ratnagiri Murugan Temple with panoramic views.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Ranipet",
          district: "Ranipet",
          coordinates: [79.3121, 12.9465],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sholingur Narasimhar Temple Pilgrim Trail",
        description:
          "Temple trail involving the sacred hill climb and ritual pathways.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Sholingur",
          district: "Ranipet",
          coordinates: [79.4207, 13.1193],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Arcot Nawab Fort Heritage Walk",
        description:
          "Guided walk through the historic Arcot Nawab Fort and its legacy.",
        category: "HeritageCulture",
        price: 400,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Arcot",
          district: "Ranipet",
          coordinates: [79.3186, 12.9041],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Arcot Heritage Town Walk",
        description:
          "Cultural walk through Arcot's streets, mosques, and colonial remnants.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Arcot",
          district: "Ranipet",
          coordinates: [79.3169, 12.9032],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palar River Eco Stretch Walk",
        description:
          "Eco walk exploring river ecology, sandbanks, and settlements.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Ranipet",
          district: "Ranipet",
          coordinates: [79.2904, 12.9351],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kaveripakkam Lake Nature Walk",
        description:
          "Lakeside walk focusing on water management and bird activity.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kaveripakkam",
          district: "Ranipet",
          coordinates: [79.4522, 12.9056],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ranipet Agricultural Belt Tour",
        description:
          "Guided tour through irrigated farmlands and crop systems.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Ranipet",
          district: "Ranipet",
          coordinates: [79.2708, 12.9186],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Leather Industry Heritage Zone Walk",
        description:
          "Industrial heritage walk exploring Ranipet's leather legacy.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Ranipet",
          district: "Ranipet",
          coordinates: [79.3319, 12.9347],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks & Eri System Walk",
        description:
          "Educational walk on traditional water storage and temple tanks.",
        category: "AgriRural",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Ranipet",
          district: "Ranipet",
          coordinates: [79.3251, 12.9284],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Walajah Heritage Streets Walk",
        description:
          "Street walk covering historic houses, markets, and mosques.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Walajah",
          district: "Ranipet",
          coordinates: [79.3687, 12.9289],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Melvisharam Muslim Heritage Walk",
        description:
          "Cultural walk through mosques, bazaars, and traditional homes.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Melvisharam",
          district: "Ranipet",
          coordinates: [79.2689, 12.9462],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Weaving Villages Walk",
        description: "Village walk highlighting traditional weaving practices.",
        category: "AgriRural",
        price: 400,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Ranipet",
          district: "Ranipet",
          coordinates: [79.2837, 12.9024],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sholingur Hill Trek",
        description: "Guided trek covering hill paths and forested slopes.",
        category: "EcoAdventure",
        price: 600,
        capacity: 12,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Sholingur",
          district: "Ranipet",
          coordinates: [79.4249, 13.1168],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Ranipet Walk",
        description:
          "Eco-cultural walk through preserved sacred grove patches.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Ranipet",
          district: "Ranipet",
          coordinates: [79.2541, 12.9153],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Irrigation Canal Network Walk",
        description:
          "Walk tracing canals supporting agriculture and settlements.",
        category: "AgriRural",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Ranipet",
          district: "Ranipet",
          coordinates: [79.2617, 12.9276],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Thiruvannamalai Listings
      {
        creator: creator._id,
        title: "Arunachaleswarar Temple Darshan Walk",
        description:
          "Cultural visit to one of the Pancha Bhoota temples dedicated to fire.",
        category: "HeritageCulture",
        price: 300,
        capacity: 40,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0747, 12.2253],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Arunachala Hill Girivalam Experience",
        description:
          "Spiritual circumambulation of the sacred Arunachala Hill.",
        category: "HeritageCulture",
        price: 250,
        capacity: 50,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0712, 12.2284],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Skandashramam & Virupaksha Cave Trail",
        description:
          "Pilgrim trail to historic meditation caves linked to Ramana Maharshi.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0668, 12.2319],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ramana Ashram Heritage Visit",
        description:
          "Quiet cultural visit to the ashram preserving Advaita traditions.",
        category: "HeritageCulture",
        price: 200,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0695, 12.2301],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sathanur Dam & Reservoir Walk",
        description:
          "Scenic visit to the dam and surrounding water catchment zones.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Sathanur",
          district: "Tiruvannamalai",
          coordinates: [78.9646, 12.2664],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jawadhu Hills Trek",
        description:
          "Guided trek across Eastern Ghats terrain with forest viewpoints.",
        category: "EcoAdventure",
        price: 900,
        capacity: 12,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Jawadhu Hills",
          district: "Tiruvannamalai",
          coordinates: [78.9943, 12.4067],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jawadhu Hills Tribal Village Walk",
        description:
          "Cultural walk through indigenous hamlets and subsistence farming zones.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Jawadhu Hills",
          district: "Tiruvannamalai",
          coordinates: [78.9812, 12.4125],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Beeman Falls Forest Walk",
        description: "Seasonal waterfall visit through forest trails.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Jawadhu Hills",
          district: "Tiruvannamalai",
          coordinates: [78.9728, 12.3984],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cheyyar River Basin Eco Walk",
        description:
          "Walk along river-dependent settlements and riparian vegetation.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cheyyar Basin",
          district: "Tiruvannamalai",
          coordinates: [79.1461, 12.1679],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Arunachala",
        description:
          "Eco-cultural walk through preserved sacred forest patches.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0587, 12.2241],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Dryland Farming Belt Tour",
        description:
          "Exposure to rain-fed agriculture and millet-based farming systems.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.1124, 12.1936],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks & Water Heritage Walk",
        description:
          "Educational walk on temple tanks and traditional water storage.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0732, 12.2237],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Annamalai Forest Meditation Walk",
        description:
          "Quiet forest walk through meditation zones and hermitage sites.",
        category: "EcoAdventure",
        price: 450,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Annamalai Forest",
          district: "Tiruvannamalai",
          coordinates: [79.0619, 12.2328],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Heritage Streets of Tiruvannamalai",
        description:
          "Street walk through traditional markets, mutts, and pilgrim quarters.",
        category: "HeritageCulture",
        price: 200,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruvannamalai",
          district: "Tiruvannamalai",
          coordinates: [79.0756, 12.2248],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      // Thirupathur Listings
      {
        creator: creator._id,
        title: "Jawadhu Hills Forest Trek",
        description:
          "Guided trek through Eastern Ghats terrain with forest viewpoints.",
        category: "EcoAdventure",
        price: 900,
        capacity: 12,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Jawadhu Hills",
          district: "Thirupathur",
          coordinates: [78.9943, 12.4067],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jawadhu Hills Tribal Village Walk",
        description:
          "Cultural walk through tribal hamlets and subsistence farming zones.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Jamunamarathur",
          district: "Thirupathur",
          coordinates: [78.9776, 12.4032],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Amirthi Forest Edge Nature Walk",
        description:
          "Forest-edge walk exploring biodiversity and conservation zones.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Amirthi Border",
          district: "Thirupathur",
          coordinates: [79.1058, 12.3364],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palar River Eco Stretch Walk",
        description:
          "Eco walk along river-fed landscapes and irrigation zones.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Palar Basin",
          district: "Thirupathur",
          coordinates: [78.8431, 12.5097],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirupathur Fort Ruins Heritage Walk",
        description:
          "Exploration of historic fort remnants and regional history.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8662, 12.4981],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Thirupathur",
        description:
          "Eco-cultural walk through preserved sacred forest patches.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8514, 12.5236],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jamunamarathur Eco Zone Walk",
        description:
          "Eco-tourism walk through forest villages and hill ecology.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Jamunamarathur",
          district: "Thirupathur",
          coordinates: [78.9751, 12.4016],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Beeman Falls Forest Trail",
        description: "Seasonal waterfall trail through dense forest paths.",
        category: "EcoAdventure",
        price: 500,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Jawadhu Hills",
          district: "Thirupathur",
          coordinates: [78.9728, 12.3984],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Agricultural Belt Tour",
        description:
          "Exposure to dryland farming practices and seasonal cropping.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8794, 12.5168],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Millet Farming & Dryland Ecology Walk",
        description:
          "Walk through traditional millet farms and rain-fed fields.",
        category: "AgriRural",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8612, 12.5314],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tribal Weekly Market Experience",
        description:
          "Cultural immersion into tribal barter systems and produce markets.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Jamunamarathur",
          district: "Thirupathur",
          coordinates: [78.9738, 12.4029],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks & Irrigation Heritage Walk",
        description:
          "Educational walk on temple tanks and river-fed irrigation systems.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8684, 12.4996],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Handloom & Ancestral Village Walk",
        description:
          "Village walk showcasing handloom weaving and ancestral settlements.",
        category: "HeritageCulture",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Thirupathur",
          district: "Thirupathur",
          coordinates: [78.8827, 12.5073],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Villupuram Listings
      {
        creator: creator._id,
        title: "Gingee Fort Heritage Trek",
        description:
          "Exploration of the iconic hill fort complex with military history and panoramic views.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Gingee",
          district: "Villupuram",
          coordinates: [79.4166, 12.2529],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mailam Murugan Temple Pilgrimage",
        description:
          "Spiritual visit to the hilltop Murugan temple with cultural significance.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mailam",
          district: "Villupuram",
          coordinates: [79.5604, 12.2521],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thiruvakkarai Fossil Wood Park Visit",
        description:
          "Educational walk through fossilized tree remains dating back millions of years.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thiruvakkarai",
          district: "Villupuram",
          coordinates: [79.5946, 12.0352],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Auroville Cultural Edge Walk",
        description:
          "Exploration of alternative architecture, sustainability practices, and community life near the district border.",
        category: "HeritageCulture",
        price: 700,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Auroville",
          district: "Villupuram Border",
          coordinates: [79.8136, 12.0056],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram Agricultural Belt Tour",
        description:
          "Farm visit showcasing paddy, sugarcane, and mixed cropping systems.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Villupuram",
          district: "Villupuram",
          coordinates: [79.4871, 11.9397],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thenperambur Wetland Eco Walk",
        description:
          "Guided eco-walk through wetland habitats supporting migratory birds and aquatic life.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thenperambur",
          district: "Villupuram",
          coordinates: [79.4612, 11.9786],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Manjupparai Forest Edge Walk",
        description:
          "Nature walk along dry deciduous forest patches and scrub terrain.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Manjupparai",
          district: "Villupuram",
          coordinates: [79.3321, 12.0314],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram River Basin Rural Walk",
        description:
          "Walk through river-dependent farmlands and irrigation landscapes.",
        category: "AgriRural",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Villupuram",
          district: "Villupuram",
          coordinates: [79.5023, 11.9521],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kandamangalam Rural Village Experience",
        description:
          "Interaction with rural communities focusing on agriculture and village life.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kandamangalam",
          district: "Villupuram",
          coordinates: [79.5058, 11.9634],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram Handloom Village Visit",
        description:
          "Cultural immersion into traditional handloom weaving communities.",
        category: "HeritageCulture",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Villupuram",
          district: "Villupuram",
          coordinates: [79.4725, 11.9448],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Singarakottai Temple Visit",
        description:
          "Visit to the village temple reflecting regional religious traditions.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Singarakottai",
          district: "Villupuram",
          coordinates: [79.4231, 11.9862],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Devanur Lake Eco Stretch Walk",
        description:
          "Lakeside eco-walk highlighting water conservation and bird life.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Devanur",
          district: "Villupuram",
          coordinates: [79.4552, 11.9234],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram Heritage Street Walk",
        description:
          "Walk through old town streets reflecting colonial and regional influences.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Villupuram",
          district: "Villupuram",
          coordinates: [79.4871, 11.9397],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Suramangalam Hillocks Nature Walk",
        description: "Short hike across rocky hillocks and scrub vegetation.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Suramangalam",
          district: "Villupuram",
          coordinates: [79.3684, 12.0417],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Irrigation Tank Network Walk",
        description:
          "Educational walk explaining the eri-based irrigation system.",
        category: "AgriRural",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Villupuram",
          district: "Villupuram",
          coordinates: [79.4902, 11.9489],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Grove (Kovil Kaadu) Visit",
        description:
          "Guided walk through preserved sacred forest patches tied to folk belief.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chinna Lakshmipuram",
          district: "Villupuram",
          coordinates: [79.4623, 11.9612],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram Rural Market Experience",
        description:
          "Visit to weekly rural markets showcasing local produce and trade.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Villupuram",
          district: "Villupuram",
          coordinates: [79.4871, 11.9397],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mailam Temple Tank Area Walk",
        description:
          "Cultural walk around the historic temple tank and surrounding streets.",
        category: "HeritageCulture",
        price: 200,
        capacity: 25,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Mailam",
          district: "Villupuram",
          coordinates: [79.5604, 12.2521],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kandamangalam Forest Patch Walk",
        description:
          "Nature walk through small forest remnants and biodiversity pockets.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kandamangalam",
          district: "Villupuram",
          coordinates: [79.5058, 11.9634],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram Millet Farming Zones Tour",
        description:
          "Visit to dryland millet farms highlighting traditional crops and methods.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Villupuram",
          district: "Villupuram",
          coordinates: [79.4421, 11.9286],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Kallakurichi Listings
      {
        creator: creator._id,
        title: "Kallakurichi Fort Heritage Walk",
        description:
          "Exploration of the historic fort ruins and their regional significance.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9597, 11.7404],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirukoilur Chidambareswarar Temple Visit",
        description:
          "Cultural visit to the ancient Shiva temple with Chola-era heritage.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thirukoilur",
          district: "Kallakurichi",
          coordinates: [79.2016, 11.9696],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chinna Thirukkoilur Temple Walk",
        description:
          "Walk around the historic temple precinct and surrounding streets.",
        category: "HeritageCulture",
        price: 200,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chinna Thirukkoilur",
          district: "Kallakurichi",
          coordinates: [79.1872, 11.9614],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalvarayan Hills Nature Escape",
        description:
          "Nature exploration across forested slopes and hill landscapes.",
        category: "EcoAdventure",
        price: 700,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kalvarayan Hills",
          district: "Kallakurichi",
          coordinates: [78.8216, 11.7224],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalvarayan Tribal Village Experience",
        description:
          "Interaction with tribal communities focusing on livelihoods and traditions.",
        category: "HeritageCulture",
        price: 600,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kalvarayan Hills",
          district: "Kallakurichi",
          coordinates: [78.8216, 11.7224],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellar River Basin Rural Walk",
        description:
          "Walk through river-fed agricultural zones and village settlements.",
        category: "AgriRural",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vellar Basin",
          district: "Kallakurichi",
          coordinates: [79.0456, 11.8452],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirukoilur Lake & Wetlands Eco Walk",
        description:
          "Guided walk around lake ecosystems and wetland biodiversity.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirukoilur",
          district: "Kallakurichi",
          coordinates: [79.2048, 11.9652],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallakurichi Agricultural Belt Tour",
        description:
          "Farm visits showcasing paddy, sugarcane, and dryland crops.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9597, 11.7404],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Handloom Village Visit",
        description:
          "Cultural immersion into traditional handloom weaving communities.",
        category: "HeritageCulture",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9723, 11.7541],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sankarapuram Forest Edge Walk",
        description: "Nature walk along scrub forests and forest fringe zones.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Sankarapuram",
          district: "Kallakurichi",
          coordinates: [78.9004, 11.8421],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellar Eco Stretch Walk",
        description:
          "Eco-walk along riverbanks highlighting water conservation practices.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vellar River",
          district: "Kallakurichi",
          coordinates: [79.0324, 11.8586],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalvarayan Hills Trekking Trail",
        description:
          "Moderate trekking route through hill forests and rocky ridges.",
        category: "EcoAdventure",
        price: 900,
        capacity: 10,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Kalvarayan Hills",
          district: "Kallakurichi",
          coordinates: [78.8216, 11.7224],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallakurichi Heritage Street Walk",
        description:
          "Walk through older town areas reflecting regional culture and trade.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9597, 11.7404],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirukovilur River Bank Walk",
        description:
          "Cultural walk along the riverbank near historic temple settlements.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirukoilur",
          district: "Kallakurichi",
          coordinates: [79.1986, 11.9679],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Kalvarayan Hills",
        description:
          "Guided visit to preserved sacred forest patches and folk traditions.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kalvarayan Hills",
          district: "Kallakurichi",
          coordinates: [78.8332, 11.7145],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Irrigation Tanks Walk",
        description:
          "Educational walk through village tanks and reservoir systems.",
        category: "AgriRural",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Rural Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9521, 11.7624],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalvarayan Minor Waterfalls Walk",
        description:
          "Seasonal walk to small hill waterfalls and stream systems.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kalvarayan Hills",
          district: "Kallakurichi",
          coordinates: [78.8146, 11.7096],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallakurichi Millet & Crop Belt Tour",
        description:
          "Visit to dryland farms focusing on millets and traditional crops.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9423, 11.7512],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Villages Eco Tourism Experience",
        description:
          "Eco-tourism experience across village landscapes and farm ecosystems.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Kallakurichi",
          district: "Kallakurichi",
          coordinates: [78.9311, 11.7684],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallakurichi Hilltop Viewpoints Walk",
        description:
          "Short hikes to hilltop viewpoints overlooking plains and forests.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallakurichi Hills",
          district: "Kallakurichi",
          coordinates: [78.8486, 11.7331],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      // Cuddalore Listings
      {
        creator: creator._id,
        title: "Cuddalore Fort Heritage Walk",
        description:
          "Guided walk around the remnants of Cuddalore Fort and colonial-era structures.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cuddalore",
          district: "Cuddalore",
          coordinates: [79.768, 11.748],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Silver Beach Coastal Walk",
        description:
          "Relaxed coastal walk along one of the longest beaches in Tamil Nadu.",
        category: "EcoAdventure",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Cuddalore",
          district: "Cuddalore",
          coordinates: [79.7812, 11.7335],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Parangipettai Fort Visit",
        description:
          "Visit to the historic port fort linked to maritime trade routes.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Parangipettai",
          district: "Cuddalore",
          coordinates: [79.7654, 11.4948],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pichavaram Mangrove Forest Boat Trail",
        description:
          "Eco-boat trail through dense mangrove ecosystems and tidal channels.",
        category: "EcoAdventure",
        price: 900,
        capacity: 10,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Pichavaram",
          district: "Cuddalore",
          coordinates: [79.7904, 11.4302],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pichavaram Backwater Eco Walk",
        description:
          "Guided eco-walk along backwater edges focusing on biodiversity.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Pichavaram",
          district: "Cuddalore",
          coordinates: [79.7871, 11.4364],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cuddalore Port & Coastal Stretch Walk",
        description:
          "Walk along the port zone highlighting coastal trade and livelihoods.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cuddalore",
          district: "Cuddalore",
          coordinates: [79.7751, 11.7442],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirupadiripuliyur Temple Walk",
        description: "Cultural walk around the historic Shiva temple precinct.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirupadiripuliyur",
          district: "Cuddalore",
          coordinates: [79.7506, 11.7469],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sethiyathope Agricultural Belt Tour",
        description: "Farm tour through fertile river-fed agricultural lands.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Sethiyathope",
          district: "Cuddalore",
          coordinates: [79.6014, 11.5974],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nellikuppam Salt Pans Visit",
        description:
          "Educational walk through traditional salt pan operations.",
        category: "AgriRural",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Nellikuppam",
          district: "Cuddalore",
          coordinates: [79.6836, 11.7764],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Neyveli Lignite Eco Awareness Walk",
        description:
          "Guided visit focusing on mining landscapes and ecological impact.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Neyveli",
          district: "Cuddalore",
          coordinates: [79.4823, 11.6136],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Parangipettai Fishing Village Experience",
        description: "Cultural experience with coastal fishing communities.",
        category: "HeritageCulture",
        price: 500,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Parangipettai",
          district: "Cuddalore",
          coordinates: [79.7701, 11.4923],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cuddalore Wetlands & Bird Walk",
        description: "Seasonal birdwatching walk through wetland ecosystems.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cuddalore",
          district: "Cuddalore",
          coordinates: [79.7435, 11.7708],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks Heritage Walk",
        description:
          "Walk exploring historic temple tanks and water management.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Cuddalore",
          district: "Cuddalore",
          coordinates: [79.7519, 11.7498],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Villupuram–Cuddalore River Basin Walk",
        description:
          "River basin walk highlighting irrigation and rural settlements.",
        category: "AgriRural",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "River Basin",
          district: "Cuddalore",
          coordinates: [79.6304, 11.7016],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gangai Konda Cholapuram Heritage Visit",
        description:
          "Guided heritage visit to the grand Chola-era temple complex.",
        category: "HeritageCulture",
        price: 700,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Gangaikonda Cholapuram",
          district: "Ariyalur",
          coordinates: [79.4213, 11.2056],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Rural Cuddalore",
        description:
          "Guided walk through preserved sacred groves and folk traditions.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Cuddalore",
          district: "Cuddalore",
          coordinates: [79.6408, 11.7264],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Handloom Village Visit",
        description: "Cultural immersion into traditional weaving communities.",
        category: "HeritageCulture",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Cuddalore",
          district: "Cuddalore",
          coordinates: [79.6582, 11.7429],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Forest Patches & Seasonal Falls Walk",
        description:
          "Seasonal nature walk through forest patches and minor waterfalls.",
        category: "EcoAdventure",
        price: 500,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Western Cuddalore",
          district: "Cuddalore",
          coordinates: [79.5214, 11.6623],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cuddalore Coastal Eco Trail",
        description: "Eco-trail along dunes, beaches, and coastal vegetation.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cuddalore Coast",
          district: "Cuddalore",
          coordinates: [79.7894, 11.7196],
        },
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pondicherry Border Eco Stretch Walk",
        description:
          "Eco-walk along the transition zone between Tamil Nadu and Puducherry.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "TN–Puducherry Border",
          district: "Cuddalore",
          coordinates: [79.8073, 11.9234],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Pudukkottai Listings
      {
        creator: creator._id,
        title: "Thirumayam Fort Heritage Walk",
        description:
          "Guided walk through the strategic hill fort showcasing Vijayanagar and Nayak architecture.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thirumayam",
          district: "Pudukkottai",
          coordinates: [78.7456, 10.2458],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Avudaiyarkoil Spiritual Architecture Tour",
        description:
          "Temple visit focusing on non-iconic worship, inscriptions, and Chola-period stonework.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Avudaiyarkoil",
          district: "Pudukkottai",
          coordinates: [78.7892, 9.9843],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sittanavasal Jain Caves & Paintings Walk",
        description:
          "Guided exploration of Jain caves, frescoes, and early Tamil Jain heritage.",
        category: "HeritageCulture",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Sittanavasal",
          district: "Pudukkottai",
          coordinates: [78.7412, 10.1096],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kudumiyanmalai Rock-Cut Temple Trail",
        description:
          "Walk around ancient rock-cut temples and early musical inscriptions.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kudumiyanmalai",
          district: "Pudukkottai",
          coordinates: [78.6894, 10.3234],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Viralimalai Temple & Peacock Sanctuary Walk",
        description:
          "Combined cultural and biodiversity walk around the Murugan temple hill.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Viralimalai",
          district: "Pudukkottai",
          coordinates: [78.5636, 10.2359],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pudukkottai Palace & Town Heritage Walk",
        description: "Walk through the palace complex and historic town zones.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Pudukkottai",
          district: "Pudukkottai",
          coordinates: [78.8214, 10.3813],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agni River Basin Eco Walk",
        description:
          "Riverine walk exploring seasonal flows, farming practices, and wetlands.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Agni Basin",
          district: "Pudukkottai",
          coordinates: [78.8557, 10.2984],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rain-fed Farming & Millet Villages Walk",
        description:
          "Village walk highlighting dryland farming and traditional millet crops.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Pudukkottai",
          district: "Pudukkottai",
          coordinates: [78.8923, 10.3441],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Temple Tank Network Trail",
        description:
          "Eco-cultural walk linking village tanks with protected sacred groves.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Village Clusters",
          district: "Pudukkottai",
          coordinates: [78.8736, 10.3672],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Water Harvesting Systems Tour",
        description:
          "Walk showcasing village tanks, ooranis, and rainwater management.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Pudukkottai",
          district: "Pudukkottai",
          coordinates: [78.9048, 10.3256],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Pottery & Craft Villages Visit",
        description:
          "Village visit highlighting traditional pottery and craft livelihoods.",
        category: "AgriRural",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Craft Villages",
          district: "Pudukkottai",
          coordinates: [78.8619, 10.4017],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ancient Trade Route & Hillocks Walk",
        description:
          "Exploration of historic trade paths, forest patches, and rocky hillocks.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Hill Zones",
          district: "Pudukkottai",
          coordinates: [78.7721, 10.2978],
        },
        images: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        ],
        status: "approved",
      },
      // Tiruvarur Listings
      {
        creator: creator._id,
        title: "Thyagaraja Temple Heritage Walk",
        description:
          "Guided walk exploring the massive temple complex, rituals, and musical heritage.",
        category: "HeritageCulture",
        price: 350,
        capacity: 25,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Tiruvarur",
          district: "Tiruvarur",
          coordinates: [79.6366, 10.7724],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kamalalayam Temple Tank Ecology Walk",
        description:
          "Walk around one of South India's largest temple tanks focusing on water ecology.",
        category: "EcoAdventure",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruvarur",
          district: "Tiruvarur",
          coordinates: [79.6379, 10.7713],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Koothanur Saraswathi Temple Visit",
        description:
          "Temple visit highlighting learning traditions and literary heritage.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Koothanur",
          district: "Tiruvarur",
          coordinates: [79.5321, 10.8746],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery Delta Paddy Fields Walk",
        description:
          "Village walk through irrigated paddy fields and canal-fed agriculture.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Delta Villages",
          district: "Tiruvarur",
          coordinates: [79.6148, 10.8129],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaduvoor Bird Sanctuary Nature Trail",
        description:
          "Guided trail observing migratory birds and wetland habitats.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vaduvoor",
          district: "Tiruvarur",
          coordinates: [79.5278, 10.7434],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Haridwaramangalam Temple Cultural Visit",
        description:
          "Visit focusing on Shaiva traditions and temple-linked settlements.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Haridwaramangalam",
          district: "Tiruvarur",
          coordinates: [79.5562, 10.6998],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Udayamarthandapuram Bird Sanctuary Walk",
        description:
          "Eco walk through shallow wetlands supporting bird nesting.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Udayamarthandapuram",
          district: "Tiruvarur",
          coordinates: [79.5596, 10.6627],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tank Network & Sacred Groves Trail",
        description: "Walk linking village tanks, groves, and water rituals.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Village Clusters",
          district: "Tiruvarur",
          coordinates: [79.6034, 10.7916],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Delta Handloom Weaving Villages Visit",
        description:
          "Village visit showcasing traditional weaving and livelihoods.",
        category: "AgriRural",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Tiruvarur",
          district: "Tiruvarur",
          coordinates: [79.5887, 10.8235],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kollidam River Basin Eco Walk",
        description:
          "Riverbank walk exploring wetlands, canals, and delta ecology.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kollidam Basin",
          district: "Tiruvarur",
          coordinates: [79.6209, 10.8467],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agrarian Market Towns Walk",
        description:
          "Walk through traditional market towns supporting delta agriculture.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Market Zones",
          district: "Tiruvarur",
          coordinates: [79.6428, 10.8041],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Heritage Streets & Music Lineage Walk",
        description:
          "Cultural walk through streets that produced legendary musicians.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Old Tiruvarur",
          district: "Tiruvarur",
          coordinates: [79.6351, 10.7736],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      // Nagapattinam Listings
      {
        creator: creator._id,
        title: "Nagore Dargah Interfaith Heritage Walk",
        description:
          "Guided visit exploring Sufi traditions, architecture, and shared worship practices.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Nagore",
          district: "Nagapattinam",
          coordinates: [79.8436, 10.8216],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Velankanni Basilica Pilgrimage Walk",
        description:
          "Cultural walk covering the basilica, pilgrimage history, and coastal faith traditions.",
        category: "HeritageCulture",
        price: 350,
        capacity: 30,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Velankanni",
          district: "Nagapattinam",
          coordinates: [79.8493, 10.682],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sikkal Singaravelar Temple Cultural Visit",
        description:
          "Temple visit focusing on Murugan worship, rituals, and regional legends.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Sikkal",
          district: "Nagapattinam",
          coordinates: [79.7795, 10.7684],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Soundararaja Perumal Temple Heritage Walk",
        description:
          "Exploration of Vaishnavite traditions and temple-linked settlements.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Nagapattinam",
          district: "Nagapattinam",
          coordinates: [79.8421, 10.7653],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tharangambadi Danish Fort & Heritage Town Walk",
        description:
          "Walk through the Danish colonial fort, churches, and historic coastal town.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Tharangambadi",
          district: "Nagapattinam",
          coordinates: [79.8552, 11.0276],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Point Calimere Wildlife Sanctuary Trail",
        description:
          "Eco trail through coastal wetlands supporting birds, deer, and marine life.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kodiyakarai",
          district: "Nagapattinam",
          coordinates: [79.8571, 10.2916],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodiyakarai Mangrove & Swamp Forest Walk",
        description:
          "Guided walk exploring mangroves, swamp forests, and coastal protection systems.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kodiyakarai",
          district: "Nagapattinam",
          coordinates: [79.8619, 10.3124],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vedaranyam Salt Pans & Coastal Livelihoods Tour",
        description:
          "Walk through salt pans explaining traditional salt production and ecology.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vedaranyam",
          district: "Nagapattinam",
          coordinates: [79.8498, 10.3726],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery Delta Coastal Farms Walk",
        description:
          "Exploration of saline-tolerant farming and coastal agriculture.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Delta Coast",
          district: "Nagapattinam",
          coordinates: [79.8214, 10.6127],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marine Turtle Nesting Awareness Walk",
        description:
          "Seasonal coastal walk focusing on turtle nesting and conservation.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Nagapattinam Coast",
          district: "Nagapattinam",
          coordinates: [79.8516, 10.7094],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Coastal Fishing Villages & Temple Tanks Walk",
        description:
          "Village walk covering fishing traditions, tanks, and water rituals.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Coastal Villages",
          district: "Nagapattinam",
          coordinates: [79.8365, 10.7428],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mangrove Restoration & Coastal Eco Trail",
        description:
          "Eco trail highlighting mangrove restoration and coastal resilience.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Restoration Zones",
          district: "Nagapattinam",
          coordinates: [79.8732, 10.3346],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      // Mayiladuthurai Listings
      {
        creator: creator._id,
        title: "Mayuranathaswamy Temple Heritage Walk",
        description:
          "Guided walk exploring Saivite traditions, temple architecture, and town history.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mayiladuthurai",
          district: "Mayiladuthurai",
          coordinates: [79.6511, 11.1035],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Parimala Ranganathar Temple Cultural Visit",
        description:
          "Vaishnavite heritage walk with focus on rituals and river-linked traditions.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Mayiladuthurai",
          district: "Mayiladuthurai",
          coordinates: [79.6502, 11.1069],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirumanancheri Marriage Temple Walk",
        description:
          "Cultural exploration of temple traditions, legends, and surrounding streets.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thirumanancheri",
          district: "Mayiladuthurai",
          coordinates: [79.6831, 11.1257],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirukkadaiyur Abirami Temple Heritage Walk",
        description:
          "Visit exploring Shaiva philosophy, longevity rituals, and temple ecology.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thirukkadaiyur",
          district: "Mayiladuthurai",
          coordinates: [79.8056, 11.1009],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Heritage Streets & Agraharam Walk",
        description:
          "Walking tour through traditional agraharams, heritage streets, and temples.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mayiladuthurai",
          district: "Mayiladuthurai",
          coordinates: [79.6489, 11.1048],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery River Eco Stretch Walk",
        description:
          "Eco walk along the Cauvery focusing on river ecology and livelihoods.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Cauvery Bank",
          district: "Mayiladuthurai",
          coordinates: [79.6462, 11.1092],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kollidam River Basin & Sandbanks Trail",
        description:
          "Guided trail exploring riverine sandbanks and delta biodiversity.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kollidam Basin",
          district: "Mayiladuthurai",
          coordinates: [79.6894, 11.1186],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Delta Paddy Cultivation Walk",
        description:
          "Walk through paddy belts explaining Cauvery-fed agriculture.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Belt",
          district: "Mayiladuthurai",
          coordinates: [79.6723, 11.0928],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Water Wheels & Canal Network Walk",
        description:
          "Exploration of irrigation canals, water wheels, and farming practices.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Canal Areas",
          district: "Mayiladuthurai",
          coordinates: [79.6618, 11.0974],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Village Wetlands Walk",
        description:
          "Eco-cultural walk covering groves, ponds, and village biodiversity.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Village Wetlands",
          district: "Mayiladuthurai",
          coordinates: [79.6685, 11.1151],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Handloom Villages & Agrarian Markets Walk",
        description:
          "Village walk exploring handloom weaving and agricultural trade zones.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Handloom Villages",
          district: "Mayiladuthurai",
          coordinates: [79.6579, 11.0896],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      // Perambalur Listings
      {
        creator: creator._id,
        title: "Ranjankudi Fort Heritage Walk",
        description:
          "Guided walk through the historic fort and surrounding heritage landscape.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Ranjankudi",
          district: "Perambalur",
          coordinates: [78.8606, 11.3234],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Viswakudi Dam & Catchment Walk",
        description:
          "Walk around the dam focusing on rainwater harvesting and storage.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Viswakudi",
          district: "Perambalur",
          coordinates: [78.9092, 11.2356],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Perambalur Dryland Farming Experience",
        description:
          "Exposure to rain-fed agriculture, crop rotation, and survival farming.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8821, 11.2345],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kunnam Agricultural Village Walk",
        description:
          "Village walk through irrigated and dryland farming systems.",
        category: "AgriRural",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kunnam",
          district: "Perambalur",
          coordinates: [78.7824, 11.3279],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Perambalur Walk",
        description:
          "Eco-cultural walk through preserved sacred grove patches.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8716, 11.2567],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Perambalur Irrigation Tank System Walk",
        description:
          "Educational walk on traditional tank-based water management.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Perambalur",
          district: "Perambalur",
          coordinates: [78.8835, 11.2341],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kariyaperumal Temple Heritage Visit",
        description:
          "Cultural visit highlighting local temple traditions and rituals.",
        category: "HeritageCulture",
        price: 200,
        capacity: 30,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Perambalur",
          district: "Perambalur",
          coordinates: [78.8867, 11.2362],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Millet Cultivation Walk",
        description:
          "Walk through traditional millet fields and dryland crops.",
        category: "AgriRural",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8941, 11.2496],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellar River Basin Eco Walk",
        description: "Eco walk along the river basin and floodplain villages.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vellar Basin",
          district: "Perambalur",
          coordinates: [78.7384, 11.2987],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Pottery Village Experience",
        description:
          "Village visit showcasing clay work and rural pottery traditions.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8614, 11.2591],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dry Forest Patch Nature Walk",
        description:
          "Guided walk through scrub forests and dry forest ecosystems.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Perambalur Outskirts",
          district: "Perambalur",
          coordinates: [78.8529, 11.2718],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Handloom & Heritage Village Walk",
        description:
          "Cultural walk through weaving villages and heritage settlements.",
        category: "HeritageCulture",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8756, 11.2438],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Village Market & Mandi Experience",
        description:
          "Immersion into rural trade, livestock sales, and produce markets.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Perambalur",
          district: "Perambalur",
          coordinates: [78.8879, 11.2374],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rain-fed Farming & Livestock Belt Tour",
        description:
          "Tour focusing on cattle rearing and integrated dryland farming.",
        category: "AgriRural",
        price: 500,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Perambalur",
          district: "Perambalur",
          coordinates: [78.8982, 11.2269],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Ariyalur Listings
      {
        creator: creator._id,
        title: "Gangaikonda Cholapuram Heritage Walk",
        description:
          "Guided exploration of the Chola capital temple and its imperial town layout.",
        category: "HeritageCulture",
        price: 400,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Gangaikonda Cholapuram",
          district: "Ariyalur",
          coordinates: [79.4512, 11.2056],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cholagangam Tank Water Heritage Walk",
        description:
          "Walk around the historic tank built for the Chola capital's water needs.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Ponneri",
          district: "Ariyalur",
          coordinates: [79.4559, 11.2104],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ariyalur Fossil Park Experience",
        description:
          "Educational visit highlighting marine fossils and prehistoric formations.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Ariyalur",
          district: "Ariyalur",
          coordinates: [79.0748, 11.1385],
        },
        images: [
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallankurichi Limestone Hills Trail",
        description:
          "Nature trail across limestone hills and plateau ecosystems.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Kallankurichi",
          district: "Ariyalur",
          coordinates: [79.0216, 11.1782],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vettakudi Bird Sanctuary Walk",
        description: "Seasonal birdwatching walk around wetland habitats.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vettakudi",
          district: "Ariyalur",
          coordinates: [79.2074, 11.2351],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kollidam River Basin Eco Walk",
        description:
          "Walk along riverine agriculture zones and floodplain villages.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kollidam Basin",
          district: "Ariyalur",
          coordinates: [79.3604, 11.2109],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cement Industry Heritage Zone Tour",
        description:
          "Interpretive tour on limestone mining and cement industry history.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Ariyalur",
          district: "Ariyalur",
          coordinates: [79.0786, 11.1409],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Fossil-bearing Village Walk",
        description:
          "Village walk highlighting everyday encounters with fossil-rich soil.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Ariyalur",
          district: "Ariyalur",
          coordinates: [79.0923, 11.1524],
        },
        images: [
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Irrigation Tank Network Walk",
        description: "Walk across linked tanks supporting dryland agriculture.",
        category: "AgriRural",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Rural Ariyalur",
          district: "Ariyalur",
          coordinates: [79.1016, 11.1457],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dryland Farming Systems Experience",
        description:
          "Experience millet-based farming adapted to limestone soils.",
        category: "AgriRural",
        price: 450,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Rural Ariyalur",
          district: "Ariyalur",
          coordinates: [79.0892, 11.1308],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ancient Chola Trade Route Stretch Walk",
        description:
          "Historical walk tracing inland trade paths of the Chola era.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Trade Route Zone",
          district: "Ariyalur",
          coordinates: [79.3258, 11.1963],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Village Pasture Walk",
        description:
          "Eco-cultural walk through groves and communal grazing lands.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Ariyalur",
          district: "Ariyalur",
          coordinates: [79.0679, 11.1625],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Limestone Plateau Hillocks Trail",
        description:
          "Short trek across fossil-rich limestone plateaus and hillocks.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Plateau Zone",
          district: "Ariyalur",
          coordinates: [79.0345, 11.1701],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Heritage Agrarian Settlement Walk",
        description:
          "Walk through long-settled farming villages shaped by Chola-era tanks.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Ariyalur",
          district: "Ariyalur",
          coordinates: [79.1103, 11.1589],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Thanjavur Listings
      {
        creator: creator._id,
        title: "Brihadeeswarar Temple Heritage Walk",
        description:
          "Guided walk exploring Chola architecture, inscriptions, and temple rituals.",
        category: "HeritageCulture",
        price: 500,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thanjavur",
          district: "Thanjavur",
          coordinates: [79.131, 10.7828],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Maratha Palace & Royal Complex Tour",
        description:
          "Exploration of the Thanjavur Maratha Palace and royal court spaces.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1324, 10.7841],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Saraswathi Mahal Manuscript Experience",
        description:
          "Curated visit highlighting ancient manuscripts, scripts, and learning traditions.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1336, 10.7832],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery Delta Paddy Fields Walk",
        description:
          "Walk through irrigated paddy fields showcasing delta farming systems.",
        category: "AgriRural",
        price: 450,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Cauvery Delta",
          district: "Thanjavur",
          coordinates: [79.1652, 10.8456],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Grand Anaicut (Kallanai) Water Heritage Tour",
        description:
          "Interpretive walk at the ancient dam that shaped South Indian irrigation.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallanai",
          district: "Thanjavur",
          coordinates: [78.9828, 10.8337],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Punnainallur Mariamman Temple Visit",
        description:
          "Temple visit focusing on folk worship traditions and pilgrimage culture.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Punnainallur",
          district: "Thanjavur",
          coordinates: [79.0603, 10.8536],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thanjavur Art Plates Craft Walk",
        description:
          "Village walk showcasing traditional metal art plate craftsmanship.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Craft Villages",
          district: "Thanjavur",
          coordinates: [79.1124, 10.8019],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ancient Temple Tank Systems Walk",
        description:
          "Exploration of interconnected temple tanks and water management practices.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1298, 10.7815],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chola Heritage Streets Walk",
        description:
          "Guided heritage walk through historic streets shaped by temple economies.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Old Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1282, 10.7809],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Vedic Schools & Agraharam Walk",
        description:
          "Cultural walk exploring learning traditions and agraharam settlements.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1457, 10.8164],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agricultural Canal Network Cycling Walk",
        description:
          "Slow trail along canals feeding delta farms and wetlands.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Delta Canals",
          district: "Thanjavur",
          coordinates: [79.1729, 10.8612],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thanjavur Painting Villages Experience",
        description:
          "Village visit highlighting classical Thanjavur painting techniques.",
        category: "HeritageCulture",
        price: 450,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Painting Villages",
          district: "Thanjavur",
          coordinates: [79.1016, 10.7928],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves of Cauvery Delta Walk",
        description:
          "Eco-cultural walk through village-protected sacred groves.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Delta Villages",
          district: "Thanjavur",
          coordinates: [79.1846, 10.8735],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Rice Seed Bank Visit",
        description:
          "Educational visit on indigenous rice varieties and seed conservation.",
        category: "AgriRural",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Thanjavur",
          district: "Thanjavur",
          coordinates: [79.1584, 10.8489],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Tiruchirapalli Listings
      {
        creator: creator._id,
        title: "Rockfort Temple Heritage Climb",
        description:
          "Guided climb to the Rockfort Temple exploring Pallava-era history and city views.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Moderate",
        location: {
          city: "Tiruchirapalli",
          district: "Tiruchirapalli",
          coordinates: [78.6938, 10.8268],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sri Ranganathaswamy Temple Cultural Walk",
        description:
          "Walk through the world's largest functioning temple complex and its prakarams.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Srirangam",
          district: "Tiruchirapalli",
          coordinates: [78.6901, 10.8626],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jambukeswarar Water Element Temple Visit",
        description:
          "Temple visit focusing on water worship traditions and sacred ecology.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thiruvanaikaval",
          district: "Tiruchirapalli",
          coordinates: [78.7056, 10.8535],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallanai Ancient Dam Walk",
        description:
          "Interpretive walk at the 2000-year-old Grand Anaicut irrigation system.",
        category: "HeritageCulture",
        price: 350,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallanai",
          district: "Tiruchirapalli",
          coordinates: [78.9828, 10.8337],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mukkombu River Engineering Trail",
        description:
          "Walk along Upper Anaicut highlighting river diversion and flood control.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mukkombu",
          district: "Tiruchirapalli",
          coordinates: [78.6774, 10.8839],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Puliyancholai Waterfalls Nature Trail",
        description:
          "Forest trail leading to seasonal waterfalls and hill ecology.",
        category: "EcoAdventure",
        price: 450,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Puliyancholai",
          district: "Tiruchirapalli",
          coordinates: [78.5406, 10.8769],
        },
        images: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Butterfly Park Biodiversity Walk",
        description:
          "Guided walk observing butterfly species and native plant habitats.",
        category: "EcoAdventure",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruchirapalli",
          district: "Tiruchirapalli",
          coordinates: [78.6645, 10.7976],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery–Kollidam River Eco Stretch Walk",
        description:
          "Riverbank walk showcasing wetlands, birds, and riparian farming.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "River Islands",
          district: "Tiruchirapalli",
          coordinates: [78.6923, 10.8721],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Uyyakondan Canal Heritage Walk",
        description:
          "Walk along one of South India's oldest canals supporting urban agriculture.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruchirapalli",
          district: "Tiruchirapalli",
          coordinates: [78.6768, 10.8097],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Handloom Weaving Village Experience",
        description:
          "Village visit highlighting traditional weaving techniques and livelihoods.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Trichy",
          district: "Tiruchirapalli",
          coordinates: [78.6489, 10.8424],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Temple Tanks & Sacred Groves Trail",
        description:
          "Cultural ecology walk linking temple tanks with sacred grove protection.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Srirangam",
          district: "Tiruchirapalli",
          coordinates: [78.6887, 10.8592],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Paddy Fields & Market Walk",
        description:
          "Walk through active paddy fields and agrarian market zones.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Delta Villages",
          district: "Tiruchirapalli",
          coordinates: [78.7044, 10.8906],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Theni Listings
      {
        creator: creator._id,
        title: "Suruli Falls Eco Trail",
        description:
          "Guided eco walk exploring waterfalls, forest ecology, and seasonal biodiversity.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Suruli",
          district: "Theni",
          coordinates: [77.5952, 9.7086],
        },
        images: [
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai Dam & River Ecology Walk",
        description:
          "Walk covering Vaigai Dam, irrigation systems, and river-dependent livelihoods.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vaigai Dam",
          district: "Theni",
          coordinates: [77.6127, 9.8444],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Meghamalai Hills & Wildlife Sanctuary Trail",
        description:
          "Guided forest trail through Meghamalai focusing on flora, fauna, and conservation.",
        category: "EcoAdventure",
        price: 500,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Meghamalai",
          district: "Theni",
          coordinates: [77.3821, 9.6463],
        },
        images: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "High Wavy Mountains Viewpoint Trek",
        description:
          "Scenic trek covering viewpoints and montane landscapes of High Wavys.",
        category: "EcoAdventure",
        price: 450,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "High Wavys",
          district: "Theni",
          coordinates: [77.4018, 9.6432],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Varusanadu Hills & Tribal Villages Walk",
        description:
          "Cultural-eco walk exploring hill tribal settlements and traditional practices.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Varusanadu",
          district: "Theni",
          coordinates: [77.4875, 9.8049],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kurangani Hills Trek",
        description:
          "Popular trekking route through forested slopes and grasslands.",
        category: "EcoAdventure",
        price: 450,
        capacity: 10,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Kurangani",
          district: "Theni",
          coordinates: [77.4592, 9.7334],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cumbum Valley Agricultural Walk",
        description:
          "Walk through fertile valley showcasing multi-crop farming systems.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Cumbum",
          district: "Theni",
          coordinates: [77.2842, 9.7367],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cardamom & Coffee Plantation Experience",
        description:
          "Guided walk through cardamom and coffee estates explaining hill agriculture.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Bodinayakkanur",
          district: "Theni",
          coordinates: [77.3517, 10.0116],
        },
        images: [
          "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Periyakulam Mango Farms Walk",
        description:
          "Seasonal farm walk exploring mango cultivation and rural markets.",
        category: "AgriRural",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Periyakulam",
          district: "Theni",
          coordinates: [77.5473, 10.1226],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Irrigation Tank Network Walk",
        description:
          "Eco-cultural walk covering sacred groves, tanks, and water management systems.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Theni",
          district: "Theni",
          coordinates: [77.5304, 9.9551],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai River Eco Stretch Walk",
        description:
          "Riverine walk focusing on ecology, farming dependence, and wetlands.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vaigai Stretch",
          district: "Theni",
          coordinates: [77.5669, 9.8892],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      // Madurai Listings
      {
        creator: creator._id,
        title: "Meenakshi Amman Temple Heritage Walk",
        description:
          "Guided exploration of Madurai's spiritual core, covering gopuram art, temple rituals, and living Dravidian heritage.",
        category: "HeritageCulture",
        price: 500,
        capacity: 25,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Madurai",
          district: "Madurai",
          coordinates: [78.1198, 9.9195],
        },
        images: [
          "https://images.unsplash.com/photo-1588072432836-e10032774350",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thiruparankundram Murugan Temple Hill Walk",
        description:
          "Cultural and spiritual visit to one of the six sacred abodes of Lord Murugan, carved into a rocky hill.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thiruparankundram",
          district: "Madurai",
          coordinates: [78.0736, 9.8817],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirumalai Nayakkar Palace History Tour",
        description:
          "Walk through the grand Indo-Saracenic palace showcasing Nayak dynasty architecture and courtly life.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Madurai",
          district: "Madurai",
          coordinates: [78.1217, 9.9176],
        },
        images: [
          "https://images.unsplash.com/photo-1590502593747-42a996133562",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gandhi Memorial Museum Visit",
        description:
          "Insightful walk through India's freedom struggle with personal artifacts and historical narratives.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tallakulam",
          district: "Madurai",
          coordinates: [78.1351, 9.9366],
        },
        images: [
          "https://images.unsplash.com/photo-1581091215367-59ab6b8fa2c2",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Keezhadi Archaeological Museum Walk",
        description:
          "Explore artifacts that rewrite early Tamil urban history and Sangam-era civilization.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Keezhadi",
          district: "Madurai",
          coordinates: [78.2027, 9.8844],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Samanar Hills Jain Heritage Trek",
        description:
          "Short trek to ancient Jain caves with inscriptions, stone beds, and panoramic Madurai views.",
        category: "EcoAdventure",
        price: 600,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Samanar Malai",
          district: "Madurai",
          coordinates: [78.0649, 9.9362],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yanaimalai Rock Hill Exploration",
        description:
          "Geological and cultural walk around the elephant-shaped hill with ancient carvings and open landscapes.",
        category: "EcoAdventure",
        price: 600,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Yanaimalai",
          district: "Madurai",
          coordinates: [78.1487, 9.9412],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ayyanar Falls Forest Trek",
        description:
          "Forest-edge trek to seasonal waterfalls with rural landscapes and shrine traditions.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 10,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Alagar Hills",
          district: "Madurai",
          coordinates: [78.1934, 10.0153],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kutladampatti Falls Nature Trail",
        description:
          "Scenic forest trail to cascading falls managed under eco-tourism guidelines.",
        category: "EcoAdventure",
        price: 1000,
        capacity: 12,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Vadipatti",
          district: "Madurai",
          coordinates: [78.0371, 10.0867],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Arittapatti Biodiversity Heritage Walk",
        description:
          "Explore Tamil Nadu's first Biodiversity Heritage Site featuring rocky habitats, birds, and ancient water systems.",
        category: "EcoAdventure",
        price: 900,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Arittapatti",
          district: "Madurai",
          coordinates: [78.0806, 9.8454],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Keezhadi Excavation Site Walk",
        description:
          "On-ground walkthrough of active excavation zones revealing ancient urban planning and trade.",
        category: "HeritageCulture",
        price: 400,
        capacity: 10,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Keezhadi",
          district: "Madurai",
          coordinates: [78.2034, 9.8839],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai River Eco Stretch Walk",
        description:
          "Leisure walk along restored riverbanks focusing on water management and urban ecology.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vaigai River",
          district: "Madurai",
          coordinates: [78.1209, 9.9252],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vandiyur Teppakulam Cultural Evening Walk",
        description:
          "Explore the historic temple tank and surrounding neighborhoods tied to Madurai's water heritage.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vandiyur",
          district: "Madurai",
          coordinates: [78.141, 9.9457],
        },
        images: [
          "https://images.unsplash.com/photo-1590502593747-42a996133562",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kazimar Big Mosque Heritage Visit",
        description:
          "Cultural visit to one of South India's oldest mosques highlighting Islamic heritage in Madurai.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Goripalayam",
          district: "Madurai",
          coordinates: [78.1158, 9.9215],
        },
        images: [
          "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "St. Mary's Cathedral Colonial Walk",
        description:
          "Visit Madurai's prominent church reflecting colonial-era architecture and local Christian history.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Madurai",
          district: "Madurai",
          coordinates: [78.121, 9.9281],
        },
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nagamalai Trekking Trail",
        description:
          "Moderate trek through forested hills offering views of Madurai plains and biodiversity pockets.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 10,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Nagamalai",
          district: "Madurai",
          coordinates: [78.0887, 9.8786],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mangulam Jain Caves Exploration",
        description:
          "Guided exploration of ancient Jain caves with inscriptions dating back over 2,000 years.",
        category: "HeritageCulture",
        price: 600,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Mangulam",
          district: "Madurai",
          coordinates: [78.1736, 9.7934],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kal Azhagar Temple Forest Route Visit",
        description:
          "Cultural visit through forested approaches to the revered Alagar temple linked to Madurai legends.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Alagar Kovil",
          district: "Madurai",
          coordinates: [78.2145, 10.079],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai River Bank Sunset Walk",
        description:
          "Relaxed evening walk along the riverbank observing daily life, rituals, and urban flow.",
        category: "EcoAdventure",
        price: 200,
        capacity: 30,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Madurai",
          district: "Madurai",
          coordinates: [78.1215, 9.9224],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Sivagangai Listings
      {
        creator: creator._id,
        title: "Chettinad Palace Heritage Tour",
        description:
          "Guided tour of Chettinad Palace, exploring architecture and royal heritage.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Karaikudi",
          district: "Sivagangai",
          coordinates: [78.7816, 10.0732],
        },
        images: [
          "https://images.unsplash.com/photo-1597843796322-90f7d5663781",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chettinad Heritage Houses Walk",
        description:
          "Walk through traditional Chettinad homes showcasing architecture and lifestyle.",
        category: "HeritageCulture",
        price: 250,
        capacity: 15,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Karaikudi",
          district: "Sivagangai",
          coordinates: [78.7831, 10.074],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pillayarpatti Temple Cultural Visit",
        description:
          "Explore the Karpaga Vinayagar Temple, its legends, and cultural rituals.",
        category: "HeritageCulture",
        price: 200,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Pillayarpatti",
          district: "Sivagangai",
          coordinates: [78.7415, 9.9782],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalaiyarkoil Temple & Fort Heritage Walk",
        description:
          "Visit ancient fort and temple, exploring historic architecture and local stories.",
        category: "HeritageCulture",
        price: 250,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kalaiyarkoil",
          district: "Sivagangai",
          coordinates: [78.7621, 9.9032],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chettinad Handloom & Craft Villages Walk",
        description:
          "Explore traditional handloom weaving and craft-making in rural Chettinad.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Karaikudi",
          district: "Sivagangai",
          coordinates: [78.7845, 10.072],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chettinad Cuisine Heritage Experience",
        description:
          "Culinary walk experiencing Chettinad cuisine, markets, and cooking traditions.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Karaikudi",
          district: "Sivagangai",
          coordinates: [78.7852, 10.071],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai River Basin Eco Walk",
        description:
          "Eco walk along the Vaigai River exploring river ecology and farming dependence.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vaigai Stretch",
          district: "Sivagangai",
          coordinates: [78.7702, 9.9951],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kallal Rural Agricultural Belt Walk",
        description:
          "Guided walk through rural farms, dryland cultivation, and irrigation systems.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kallal",
          district: "Sivagangai",
          coordinates: [78.7512, 10.0003],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Markets & Heritage Streets Walk",
        description:
          "Explore local market streets, heritage architecture, and village traditions.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Karaikudi",
          district: "Sivagangai",
          coordinates: [78.782, 10.0735],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Village Ponds Walk",
        description:
          "Eco-cultural walk covering sacred groves, temple tanks, and wetland biodiversity.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rural Sivagangai",
          district: "Sivagangai",
          coordinates: [78.7654, 10.0051],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      // Ramanathapuram Listings
      {
        creator: creator._id,
        title: "Ramanathaswamy Temple Heritage Walk",
        description:
          "Guided visit exploring temple architecture, rituals, and cultural history of Rameswaram.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rameswaram",
          district: "Ramanathapuram",
          coordinates: [79.3129, 9.287],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agni Theertham & Coastal Ritual Walk",
        description:
          "Visit sacred beach sites along Rameswaram coast exploring spiritual and cultural practices.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Rameswaram",
          district: "Ramanathapuram",
          coordinates: [79.3241, 9.2882],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dhanushkodi Ruins & Coastal Eco Walk",
        description:
          "Explore historic ruins, coastal ecology, and local fishing villages.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Dhanushkodi",
          district: "Ramanathapuram",
          coordinates: [79.4695, 9.194],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pamban Bridge & Marine Eco Stretch",
        description:
          "Walk along Pamban Bridge exploring coastal ecology and fishing communities.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Pamban",
          district: "Ramanathapuram",
          coordinates: [79.3184, 9.2784],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gulf of Mannar & Kurusadai Island Marine Walk",
        description:
          "Marine ecology trail exploring biosphere reserve, coral reefs, and island habitats.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Kurusadai Island",
          district: "Ramanathapuram",
          coordinates: [79.2869, 9.2451],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mandapam Marine Eco Zone & Fishing Villages",
        description:
          "Cultural-eco walk covering fishing practices, marine biodiversity, and coastal villages.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Mandapam",
          district: "Ramanathapuram",
          coordinates: [79.314, 9.281],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ram Setu View Point & Coastal Trail",
        description:
          "Explore Ram Setu view areas, coastal wetlands, and sacred sites.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Rameswaram",
          district: "Ramanathapuram",
          coordinates: [79.319, 9.2875],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thondi Coastal Belt & Salt Pan Walk",
        description:
          "Explore coastal salt pans, wetlands, and rural agrarian practices.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thondi",
          district: "Ramanathapuram",
          coordinates: [79.3582, 9.3782],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mangrove Restoration & Marine Interpretation Walk",
        description:
          "Walk through mangrove restoration zones with marine ecology interpretation.",
        category: "EcoAdventure",
        price: 350,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Mandapam",
          district: "Ramanathapuram",
          coordinates: [79.312, 9.277],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Coastal Agrarian Villages Walk",
        description:
          "Explore rural coastal villages, fishing practices, and traditional irrigation tanks.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rameswaram",
          district: "Ramanathapuram",
          coordinates: [79.32, 9.284],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      // Virudhunagar Listings
      {
        creator: creator._id,
        title: "Srivilliputhur Andal Temple Heritage Walk",
        description:
          "Guided visit exploring temple architecture, rituals, and cultural history.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Srivilliputhur",
          district: "Virudhunagar",
          coordinates: [77.5824, 9.5281],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Srivilliputhur Grizzled Squirrel Wildlife Sanctuary Eco Walk",
        description:
          "Nature walk through the sanctuary focusing on endemic species and forest ecology.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Srivilliputhur",
          district: "Virudhunagar",
          coordinates: [77.592, 9.527],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Shenbagathoppu & Ayyanar Falls Trek",
        description:
          "Trek along scenic waterfalls and forest trails in Virudhunagar district.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Sivakasi",
          district: "Virudhunagar",
          coordinates: [77.5382, 9.4381],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sathuragiri Hills & Sundara Mahalingam Temple Trek",
        description:
          "Hill trek covering sacred sites and viewpoints in Sathuragiri Hills.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Sathuragiri",
          district: "Virudhunagar",
          coordinates: [77.51, 9.482],
        },
        images: [
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pilavakkal Dam & Vembakottai Reservoir Walk",
        description:
          "Visit water bodies and irrigation systems, exploring rural life and agriculture.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Virudhunagar",
          district: "Virudhunagar",
          coordinates: [77.573, 9.498],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sivakasi Fireworks & Printing Industry Heritage Walk",
        description:
          "Explore industrial heritage of Sivakasi, focusing on fireworks and printing sectors.",
        category: "HeritageCulture",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Sivakasi",
          district: "Virudhunagar",
          coordinates: [77.637, 9.456],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kariapatti Rural Belt & Dryland Farming Walk",
        description:
          "Walk through rural landscapes exploring dryland farming and village systems.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kariapatti",
          district: "Virudhunagar",
          coordinates: [77.605, 9.462],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Temple Tanks Walk",
        description:
          "Cultural-eco walk covering sacred groves, temple tanks, and water heritage.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Virudhunagar",
          district: "Virudhunagar",
          coordinates: [77.577, 9.502],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Market Towns & Village Water Harvesting Walk",
        description:
          "Explore local markets, village tanks, and community water management practices.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Virudhunagar",
          district: "Virudhunagar",
          coordinates: [77.58, 9.5],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hill Trekking Trails & Forest Fringe Villages",
        description:
          "Trek connecting hills, forests, and rural settlements highlighting biodiversity.",
        category: "EcoAdventure",
        price: 350,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Sathuragiri",
          district: "Virudhunagar",
          coordinates: [77.512, 9.485],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Thenkasi Listings
      {
        creator: creator._id,
        title: "Courtallam Main Falls Visit",
        description:
          "Explore the iconic Courtallam Main Falls with guided eco-tour and viewpoints.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.3, 8.96],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Five Falls (Aintharuvi) Trek",
        description:
          "Trek to the famous five waterfalls, enjoying scenic views and forest trails.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Courtallam",
          district: "Thenkasi",
          coordinates: [77.308, 8.959],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thenkasi Kasi Viswanathar Temple Heritage Walk",
        description:
          "Guided visit to the historic temple exploring architecture, rituals, and local culture.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.311, 8.955],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Manimuthar Dam & Waterfalls Eco Walk",
        description:
          "Visit Manimuthar Dam and nearby waterfalls with focus on ecology and riverine life.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Manimuthar",
          district: "Thenkasi",
          coordinates: [77.325, 8.94],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Papanasam Dam & Agasthiyar Falls Trail",
        description:
          "Eco-cultural walk exploring dam area, waterfalls, and local sacred sites.",
        category: "EcoAdventure",
        price: 350,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Papanasam",
          district: "Thenkasi",
          coordinates: [77.32, 8.95],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Western Ghats Forest Range & Trekking Trails",
        description:
          "Guided trekking through Western Ghats, rainforest patches, and mountain passes.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Challenging",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.31, 8.94],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thenkasi Eco Tourism & Tribal Villages Walk",
        description:
          "Explore tribal villages, eco zones, herbal plant areas, and cultural heritage.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.315, 8.95],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Manjolai Tea Estates Visit",
        description:
          "Tour the tea estates, learn about tea cultivation, and enjoy scenic viewpoints.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Manjolai",
          district: "Thenkasi",
          coordinates: [77.322, 8.935],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Riverine Eco Zones Walk",
        description:
          "Eco-cultural walk exploring sacred groves, rivers, and forest biodiversity.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.312, 8.945],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mountain Pass & Eco Viewpoints Trail",
        description:
          "Trek scenic mountain passes, rainforest viewpoints, and eco-tourism zones.",
        category: "EcoAdventure",
        price: 350,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Thenkasi",
          district: "Thenkasi",
          coordinates: [77.318, 8.94],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Thoothukudi Listings
      {
        creator: creator._id,
        title: "Thoothukudi Port & Coastal Eco Walk",
        description:
          "Guided tour of the port, harbour activities, and nearby coastal ecosystems.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.135, 8.764],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Our Lady of Snows Basilica Heritage Walk",
        description:
          "Explore the architecture, rituals, and history of the basilica.",
        category: "HeritageCulture",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.144, 8.764],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruchendur Murugan Temple Visit",
        description:
          "Guided visit to the famous Murugan temple along the coast.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tiruchendur",
          district: "Thoothukudi",
          coordinates: [78.119, 8.467],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hare Island & Beach Eco Zone Walk",
        description:
          "Explore the island, beach ecosystems, and coastal biodiversity.",
        category: "EcoAdventure",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.178, 8.802],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gulf of Mannar Marine Biosphere Tour",
        description:
          "Marine eco-tour highlighting coral reefs, turtle nesting zones, and mangrove restoration sites.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.2, 8.5],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kayalpattinam Heritage Town Walk",
        description:
          "Explore coastal trade heritage, architecture, and traditional boat-building villages.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kayalpattinam",
          district: "Thoothukudi",
          coordinates: [78.121, 8.565],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thoothukudi Salt Pans & Dry Coastal Agriculture Walk",
        description:
          "Visit salt pans, coastal agriculture fields, and learn about traditional methods.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.14, 8.77],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Coastal Fishing Villages & Mangrove Restoration Walk",
        description:
          "Explore traditional fishing villages, mangrove sites, and wetlands along the coast.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.15, 8.76],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marine Interpretation Centres & Coastal Eco Trails",
        description:
          "Educational eco-tour covering marine biodiversity, interpretation centres, and coastal trail routes.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.16, 8.75],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pearl Oyster Grounds & Lighthouse Viewpoints Walk",
        description:
          "Coastal eco-tour exploring pearl oyster areas and lighthouse viewpoints along the shore.",
        category: "EcoAdventure",
        price: 350,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Thoothukudi",
          district: "Thoothukudi",
          coordinates: [78.17, 8.755],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      // Tirunelveli Listings
      {
        creator: creator._id,
        title: "Nellaiappar Temple Heritage Walk",
        description:
          "Explore the architecture, rituals, and history of the iconic Nellaiappar Temple.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.729, 8.713],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Manimuthar Falls & Dam Eco Trek",
        description:
          "Trek to Manimuthar Falls and explore the dam area, river stretch, and forest views.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Manimuthar",
          district: "Tirunelveli",
          coordinates: [77.708, 8.9],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Papanasam Dam & Agasthiyar Falls Trail",
        description:
          "Eco-cultural trail covering dam, waterfall, and sacred forest zones in the Western Ghats.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Papanasam",
          district: "Tirunelveli",
          coordinates: [77.718, 8.95],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kalakkad Mundanthurai Tiger Reserve Eco Trek",
        description:
          "Guided trekking in the tiger reserve focusing on wildlife, biodiversity, and forest trails.",
        category: "EcoAdventure",
        price: 450,
        capacity: 10,
        duration: 240,
        difficulty: "Challenging",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.68, 8.5],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tamirabarani River Eco Stretch Walk",
        description:
          "Leisurely eco-walk along the Tamirabarani River, exploring wetlands, sacred groves, and irrigation canals.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.72, 8.72],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Manjolai Tea Estates & Western Ghats Heritage Visit",
        description:
          "Tour tea estates, learn about cultivation, and enjoy forest viewpoints of the Western Ghats.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Manjolai",
          district: "Tirunelveli",
          coordinates: [77.715, 8.905],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rural Paddy & Banana Farms Walk",
        description:
          "Visit local agrarian villages, explore paddy and banana farms, and traditional water irrigation systems.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.725, 8.73],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sacred Groves & Temple Tank Network Tour",
        description:
          "Explore sacred groves, village temples, and traditional tank irrigation systems.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.728, 8.735],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hill Trekking Trails & Forest Eco Viewpoints",
        description:
          "Trek hill trails in Western Ghats, exploring viewpoints, forest biodiversity, and eco-tourism zones.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.71, 8.71],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Traditional Village Markets & Agrarian Heritage Walk",
        description:
          "Explore traditional markets, village life, and agrarian heritage zones along the district.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tirunelveli",
          district: "Tirunelveli",
          coordinates: [77.722, 8.725],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      // Kanyakumari Listings
      {
        creator: creator._id,
        title: "Kanyakumari Amman Temple Visit",
        description:
          "Explore the historic Kanyakumari Amman Temple and its rituals.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kanyakumari",
          district: "Kanyakumari",
          coordinates: [77.5636, 8.0883],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Suchindram Thanumalayan Temple Heritage Walk",
        description:
          "Guided tour covering the architecture and rituals of the Suchindram Thanumalayan Temple.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Suchindram",
          district: "Kanyakumari",
          coordinates: [77.5481, 8.1955],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vivekananda Rock Memorial & Kendra",
        description:
          "Visit Vivekananda Rock Memorial, exhibition hall, and learn the philosophy and history.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kanyakumari",
          district: "Kanyakumari",
          coordinates: [77.5618, 8.082],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thirparappu Waterfalls & Dam Trek",
        description:
          "Eco-adventure trek to Thirparappu Waterfalls and Dam, exploring riverine and forest ecosystems.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Thirparappu",
          district: "Kanyakumari",
          coordinates: [77.46, 8.205],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Padmanabhapuram Palace & Vattakottai Fort Heritage Tour",
        description:
          "Explore Padmanabhapuram Palace and coastal fortifications at Vattakottai Fort.",
        category: "HeritageCulture",
        price: 350,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Padmanabhapuram",
          district: "Kanyakumari",
          coordinates: [77.3128, 8.1875],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pechiparai Dam & Forest Range Eco Trek",
        description:
          "Trek through Pechiparai forest range, medicinal hills, and explore the dam ecosystem.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Pechiparai",
          district: "Kanyakumari",
          coordinates: [77.322, 8.27],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marunthuvazh Malai Medicinal Hills Walk",
        description:
          "Explore medicinal plant zones, herbal trails, and forest viewpoints at Marunthuvazh Malai.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kanyakumari",
          district: "Kanyakumari",
          coordinates: [77.3, 8.2],
        },
        images: [
          "https://images.unsplash.com/photo-1520947294306-9d7cbb4e79b3",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chitharal Jain Monuments & Coastal Eco Walk",
        description:
          "Visit ancient Jain monuments and nearby coastal eco zones of Kanyakumari.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Chitharal",
          district: "Kanyakumari",
          coordinates: [77.326, 8.221],
        },
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Muttom Coastal Village & Colachel Fishing Harbour Tour",
        description:
          "Explore coastal villages, fishing harbours, and marine biodiversity along the southern tip.",
        category: "AgriRural",
        price: 350,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Muttom",
          district: "Kanyakumari",
          coordinates: [77.314, 8.191],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Keeriparai Forest & Waterfalls Eco Trek",
        description:
          "Trek through Keeriparai forest, visit waterfalls, and explore the coastal hill ecosystem.",
        category: "EcoAdventure",
        price: 400,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Kanyakumari",
          district: "Kanyakumari",
          coordinates: [77.308, 8.205],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      // Nilgiris Listings
      {
        creator: creator._id,
        title: "Ooty Botanical Garden Heritage Walk",
        description:
          "Leisurely walk through colonial-era botanical gardens showcasing exotic and native plant species.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Ooty",
          district: "Nilgiris",
          coordinates: [76.695, 11.412],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Government Rose Garden Experience",
        description:
          "Explore one of India's largest rose gardens with thousands of varieties set on terraced slopes.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Elk Hill",
          district: "Nilgiris",
          coordinates: [76.6934, 11.4047],
        },
        images: [
          "https://images.unsplash.com/photo-1498842812179-c81beecf902c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Toda Tribal Settlement Cultural Visit",
        description:
          "Guided cultural interaction with the Toda community exploring traditional huts, customs, and livelihoods.",
        category: "AgriRural",
        price: 800,
        capacity: 10,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Toda Mund",
          district: "Nilgiris",
          coordinates: [76.6852, 11.4168],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ooty Lake Leisure Trail",
        description:
          "Relaxed walk around Ooty Lake observing local life, boating activity, and wetland ecology.",
        category: "EcoAdventure",
        price: 200,
        capacity: 30,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Ooty Lake",
          district: "Nilgiris",
          coordinates: [76.7043, 11.4042],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Doddabetta Peak Summit Walk",
        description:
          "Short hike to the highest point in the Nilgiris offering panoramic Western Ghats views.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Doddabetta",
          district: "Nilgiris",
          coordinates: [76.735, 11.4064],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nilgiri Mountain Railway Heritage Ride",
        description:
          "UNESCO-listed toy train journey through tunnels, bridges, and hill landscapes.",
        category: "HeritageCulture",
        price: 1200,
        capacity: 25,
        duration: 300,
        difficulty: "Easy",
        location: {
          city: "Railway Station",
          district: "Nilgiris",
          coordinates: [76.6956, 11.4116],
        },
        images: ["https://images.unsplash.com/photo-1548013146-72479768bada"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Nilgiri Tea Gardens & Factory Tour",
        description:
          "Walk through lush tea estates and learn tea processing from leaf to cup.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Tea Estates",
          district: "Nilgiris",
          coordinates: [76.6815, 11.4012],
        },
        images: [
          "https://images.unsplash.com/photo-1597843796322-90f7d5663781",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Emerald Lake Quiet Nature Walk",
        description:
          "Serene lakeside experience surrounded by tea plantations and forested hills.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Emerald",
          district: "Nilgiris",
          coordinates: [76.6447, 11.3476],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Avalanche Eco Tourism Forest Trek",
        description:
          "Guided eco-trek through shola forests, reservoirs, and protected landscapes.",
        category: "EcoAdventure",
        price: 1500,
        capacity: 10,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Avalanche",
          district: "Nilgiris",
          coordinates: [76.6013, 11.2916],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pykara Waterfalls Nature Stop",
        description:
          "Visit cascading waterfalls surrounded by forests and grasslands.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Pykara",
          district: "Nilgiris",
          coordinates: [76.5914, 11.4614],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mudumalai Tiger Reserve Safari",
        description:
          "Forest safari through one of South India's major wildlife reserves.",
        category: "EcoAdventure",
        price: 2000,
        capacity: 8,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Mudumalai",
          district: "Nilgiris",
          coordinates: [76.5395, 11.5646],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Upper Bhavani Remote Forest Experience",
        description:
          "Restricted-access forest zone featuring untouched shola grasslands and reservoirs.",
        category: "EcoAdventure",
        price: 2500,
        capacity: 6,
        duration: 420,
        difficulty: "Challenging",
        location: {
          city: "Upper Bhavani",
          district: "Nilgiris",
          coordinates: [76.5218, 11.3326],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Wenlock Downs Grassland Walk",
        description:
          "Open grassland walk through rolling downs and mist-covered valleys.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Wenlock Downs",
          district: "Nilgiris",
          coordinates: [76.7183, 11.4025],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tribal Research Centre Visit",
        description:
          "Museum visit documenting Nilgiris tribal communities, history, and material culture.",
        category: "HeritageCulture",
        price: 250,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Ooty",
          district: "Nilgiris",
          coordinates: [76.702, 11.4101],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mukurthi National Park Trek",
        description:
          "High-altitude trek through protected shola forest and grassland ecosystems.",
        category: "EcoAdventure",
        price: 2200,
        capacity: 8,
        duration: 360,
        difficulty: "Challenging",
        location: {
          city: "Mukurthi",
          district: "Nilgiris",
          coordinates: [76.5667, 11.2396],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Lamb's Rock Valley View Walk",
        description:
          "Scenic viewpoint walk overlooking deep valleys and tea-covered slopes.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Lamb's Rock",
          district: "Nilgiris",
          coordinates: [76.7893, 11.3517],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dolphin's Nose Cliff View Experience",
        description:
          "Cliffside viewpoint offering dramatic views of the Nilgiri escarpments.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Dolphin's Nose",
          district: "Nilgiris",
          coordinates: [76.7829, 11.3466],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Coimbatore Listings
      {
        creator: creator._id,
        title: "TNAU Botanical Garden Walk",
        description:
          "Guided walk through Tamil Nadu Agricultural University's botanical gardens showcasing native plants, research farms, and agri-innovation.",
        category: "AgriRural",
        price: 300,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "TNAU",
          district: "Coimbatore",
          coordinates: [76.9399, 11.012],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Siruvani Village Rural Immersion",
        description:
          "Experience traditional village life near the Siruvani hills with farming practices, local cuisine, and forest-edge culture.",
        category: "AgriRural",
        price: 1200,
        capacity: 10,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Siruvani",
          district: "Coimbatore",
          coordinates: [76.6756, 10.9972],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marudhamalai Murugan Temple Trail",
        description:
          "Spiritual climb and cultural exploration of the Marudhamalai hill temple overlooking the Western Ghats.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Marudhamalai",
          district: "Coimbatore",
          coordinates: [76.8577, 11.0405],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Textile Legacy at Kasthuri Sreenivasan Museum",
        description:
          "Explore Coimbatore's textile heritage through art, handlooms, and industrial evolution.",
        category: "HeritageCulture",
        price: 300,
        capacity: 15,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Avinashi Road",
          district: "Coimbatore",
          coordinates: [76.9706, 11.0302],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "GD Naidu Industrial Innovation Walk",
        description:
          "Dive into India's industrial ingenuity with hands-on exhibits honoring GD Naidu's inventions.",
        category: "HeritageCulture",
        price: 250,
        capacity: 15,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Gandhipuram",
          district: "Coimbatore",
          coordinates: [76.9661, 11.0168],
        },
        images: [
          "https://images.unsplash.com/photo-1581091215367-59ab6b8fa2c2",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Siruvani Waterfalls & Dam Trek",
        description:
          "Forest trek to one of Tamil Nadu's purest water sources with waterfalls and dam views.",
        category: "EcoAdventure",
        price: 1500,
        capacity: 10,
        duration: 360,
        difficulty: "Challenging",
        location: {
          city: "Siruvani",
          district: "Coimbatore",
          coordinates: [76.6649, 10.9936],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Black Thunder Water Adventure",
        description:
          "High-energy water rides and theme park fun at the foothills of the Nilgiris.",
        category: "EcoAdventure",
        price: 1600,
        capacity: 30,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Mettupalayam",
          district: "Coimbatore",
          coordinates: [76.946, 11.2995],
        },
        images: [
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Velliangiri Hills Pilgrim Trek",
        description:
          "Challenging spiritual trek across the Seven Hills, blending faith, endurance, and wilderness.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 8,
        duration: 480,
        difficulty: "Challenging",
        location: {
          city: "Poondi",
          district: "Coimbatore",
          coordinates: [76.7164, 10.9783],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Topslip Wildlife Expedition",
        description:
          "Guided forest safari through Indira Gandhi Wildlife Sanctuary with chances to spot elephants and hornbills.",
        category: "EcoAdventure",
        price: 2500,
        capacity: 8,
        duration: 480,
        difficulty: "Moderate",
        location: {
          city: "Topslip",
          district: "Coimbatore",
          coordinates: [76.8345, 10.4716],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chettipalayam Coconut Farm Stay",
        description:
          "Walk through coconut groves and understand traditional farming, irrigation, and rural economics.",
        category: "AgriRural",
        price: 1000,
        capacity: 10,
        duration: 240,
        difficulty: "Easy",
        location: {
          city: "Chettipalayam",
          district: "Coimbatore",
          coordinates: [77.0213, 10.9586],
        },
        images: [
          "https://images.unsplash.com/photo-1598515213692-5f252cfe4c8d",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Eachanari Vinayagar Temple Visit",
        description:
          "Cultural visit to one of Coimbatore's most revered temples with centuries-old traditions.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Eachanari",
          district: "Coimbatore",
          coordinates: [76.9894, 10.9565],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541051-7d4d6c28c3f4",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Anaikatti Forest Edge Walk",
        description:
          "Nature walk along the forest checkpost area, rich in birdlife and Western Ghats ecology.",
        category: "EcoAdventure",
        price: 800,
        capacity: 12,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Anaikatti",
          district: "Coimbatore",
          coordinates: [76.7382, 11.0985],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dhoni Hills Cross-Border Trek",
        description:
          "Scenic trek via the Palakkad side offering panoramic views, forest paths, and rocky ascents.",
        category: "EcoAdventure",
        price: 2000,
        capacity: 8,
        duration: 420,
        difficulty: "Challenging",
        location: {
          city: "Dhoni Hills",
          district: "Coimbatore",
          coordinates: [76.6842, 10.8614],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Monkey Falls Nature Stop",
        description:
          "Refreshing halt along the Valparai road with cascading falls and forest surroundings.",
        category: "EcoAdventure",
        price: 500,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Aliyar",
          district: "Coimbatore",
          coordinates: [76.9675, 10.4026],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      // Erode Listings
      {
        creator: creator._id,
        title: "Bannari Amman Temple Heritage Visit",
        description:
          "Cultural visit to the renowned hill temple attracting devotees from Tamil Nadu and Karnataka.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Bannari",
          district: "Erode",
          coordinates: [77.1286, 11.5932],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodiveri Dam & Falls Nature Walk",
        description:
          "Relaxed visit to the historic dam with flowing cascades and village-side river activity.",
        category: "EcoAdventure",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kodiveri",
          district: "Erode",
          coordinates: [77.2489, 11.4695],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bhavanisagar Dam Reservoir Experience",
        description:
          "Scenic visit to one of Tamil Nadu's largest earthen dams with expansive reservoir views.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Bhavanisagar",
          district: "Erode",
          coordinates: [77.076, 11.4787],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bhavani River Eco Stretch Walk",
        description:
          "Guided riverside walk focusing on irrigation systems, river ecology, and local livelihoods.",
        category: "EcoAdventure",
        price: 250,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Bhavani",
          district: "Erode",
          coordinates: [77.6856, 11.4503],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sathyamangalam Tiger Reserve Safari",
        description:
          "Forest safari through one of South India's most important wildlife corridors.",
        category: "EcoAdventure",
        price: 2200,
        capacity: 8,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Sathyamangalam",
          district: "Erode",
          coordinates: [77.2494, 11.5085],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hasanur Hills Forest Trail",
        description:
          "Scenic hill drive and forest-edge walk through tribal hamlets and elephant corridors.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 12,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Hasanur",
          district: "Erode",
          coordinates: [77.2169, 11.6297],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chennimalai Murugan Temple Hill Walk",
        description:
          "Spiritual and cultural walk up the sacred hill temple overlooking Erode plains.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Chennimalai",
          district: "Erode",
          coordinates: [77.6055, 11.1626],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellode Birds Sanctuary Watch",
        description:
          "Birdwatching walk around a seasonal wetland attracting migratory species.",
        category: "EcoAdventure",
        price: 300,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Vellode",
          district: "Erode",
          coordinates: [77.7176, 11.3174],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Gobichettipalayam Agricultural Belt Tour",
        description:
          "Agri-focused walk through irrigated farmlands showcasing sugarcane, turmeric, and mixed crops.",
        category: "AgriRural",
        price: 800,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Gobichettipalayam",
          district: "Erode",
          coordinates: [77.4527, 11.4559],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Erode Turmeric Farms & Markets",
        description:
          "Visit turmeric farms and wholesale markets that define Erode's agricultural identity.",
        category: "AgriRural",
        price: 900,
        capacity: 10,
        duration: 210,
        difficulty: "Easy",
        location: {
          city: "Turmeric Market",
          district: "Erode",
          coordinates: [77.7172, 11.341],
        },
        images: [
          "https://images.unsplash.com/photo-1598515213692-5f252cfe4c8d",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Erode Handloom & Textile Cluster Walk",
        description:
          "Explore traditional handloom weaving clusters and textile trade heritage.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Textile Area",
          district: "Erode",
          coordinates: [77.717, 11.3412],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Perumpallam Dam Nature Stop",
        description:
          "Short visit to a calm irrigation dam surrounded by farmlands and open landscapes.",
        category: "EcoAdventure",
        price: 200,
        capacity: 20,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Perumpallam",
          district: "Erode",
          coordinates: [77.7362, 11.3604],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery River Basin Walk (Erode Stretch)",
        description:
          "Riverside exploration focusing on irrigation channels, farming settlements, and water heritage.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Cauvery Basin",
          district: "Erode",
          coordinates: [77.7703, 11.4232],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Anthiyur Forest Range Trek",
        description:
          "Moderate forest trek through dry deciduous landscapes and hill trails.",
        category: "EcoAdventure",
        price: 1300,
        capacity: 10,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Anthiyur",
          district: "Erode",
          coordinates: [77.6146, 11.5778],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bargur Hills Tribal Forest Trek",
        description:
          "Guided trek through forested hills and tribal settlements within the Bargur range.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 8,
        duration: 360,
        difficulty: "Challenging",
        location: {
          city: "Bargur Hills",
          district: "Erode",
          coordinates: [77.3651, 11.7122],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bannari Village Rural Life Walk",
        description:
          "Village immersion experience covering farming practices, temples, and rural routines.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Bannari Village",
          district: "Erode",
          coordinates: [77.1358, 11.5889],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodumudi Magudeswarar Temple Visit",
        description:
          "Cultural visit to the ancient Shiva temple on the banks of the Cauvery.",
        category: "HeritageCulture",
        price: 300,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kodumudi",
          district: "Erode",
          coordinates: [77.8847, 11.0785],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Ammapet Lake Wetland Walk",
        description:
          "Calm lakeside walk observing wetland birds and local fishing activity.",
        category: "EcoAdventure",
        price: 200,
        capacity: 25,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Ammapet",
          district: "Erode",
          coordinates: [77.7609, 11.3319],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bhavanisagar Forest Zone Experience",
        description:
          "Forest-edge exploration near the reservoir highlighting wildlife corridors and dry forest ecology.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 10,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Bhavanisagar Forest",
          district: "Erode",
          coordinates: [77.0824, 11.4851],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      // Tiruppur Listings
      {
        creator: creator._id,
        title: "Tiruppur Knitwear Industry & Heritage Walk",
        description:
          "Guided walk through garment clusters, dyeing units, and export hubs showcasing Tiruppur's industrial evolution.",
        category: "HeritageCulture",
        price: 800,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Textile Hubs",
          district: "Tiruppur",
          coordinates: [77.3411, 11.1085],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Amaravathi River Eco-Trail (Tiruppur)",
        description:
          "Riverside walk exploring river ecology, irrigation networks, and cotton farmlands.",
        category: "EcoAdventure",
        price: 350,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Amaravathi Riverside",
          district: "Tiruppur",
          coordinates: [77.3451, 11.1056],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Noyyal River & Cotton Belt Experience",
        description:
          "Visit the Noyyal River basin and surrounding cotton fields that supply Tiruppur's garment units.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Noyyal Basin",
          district: "Tiruppur",
          coordinates: [77.4022, 11.0736],
        },
        images: [
          "https://images.unsplash.com/photo-1598515213692-5f252cfe4c8d",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruppur Andipalayam Temple & Village",
        description:
          "Cultural visit to a historic village temple and nearby rural farms.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Andipalayam",
          district: "Tiruppur",
          coordinates: [77.3698, 11.0891],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kangayam Cattle Farm & Breed Visit",
        description:
          "Experience farm showcasing the famous Kangayam cattle breed and local dairy practices.",
        category: "AgriRural",
        price: 900,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Kangayam",
          district: "Tiruppur",
          coordinates: [77.5621, 11.0043],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Udumalpet Hill Trek & Scenic Views",
        description:
          "Hill trek near Western Ghats foothills with panoramic views of farmlands and forests.",
        category: "EcoAdventure",
        price: 1100,
        capacity: 12,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Udumalpet Hills",
          district: "Tiruppur",
          coordinates: [77.2487, 10.5861],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Avinashi Temple & Town Heritage Walk",
        description:
          "Cultural walk around the historic Avinashi Lingeshwarar Temple and surrounding market streets.",
        category: "HeritageCulture",
        price: 350,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Avinashi",
          district: "Tiruppur",
          coordinates: [77.2689, 11.1932],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vellakoil Agri Village Immersion",
        description:
          "Rural experience visiting cotton farms, traditional homes, and weaving households.",
        category: "AgriRural",
        price: 750,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vellakoil",
          district: "Tiruppur",
          coordinates: [77.7146, 10.941],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Amaravathi Dam Visit & Scenic Reservoir",
        description:
          "Visit the historic dam with reservoir views and nearby eucalyptus plantations.",
        category: "EcoAdventure",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Amaravathi Dam",
          district: "Tiruppur",
          coordinates: [77.0974, 10.4411],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Noyyal River Wetlands Birdwatching",
        description:
          "Guided birdwatching walk along wetland zones and seasonal mudflats.",
        category: "EcoAdventure",
        price: 400,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Noyyal Wetlands",
          district: "Tiruppur",
          coordinates: [77.4132, 11.0752],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Uthukuli Weaving Village Walk",
        description:
          "Cultural visit to a traditional handloom village known for fine cotton textiles.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Uthukuli",
          district: "Tiruppur",
          coordinates: [77.3386, 11.1763],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palladam Silk Weaving Heritage Visit",
        description:
          "Visit traditional silk weaving households and understand the craft of Kongu region textiles.",
        category: "HeritageCulture",
        price: 750,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Palladam",
          district: "Tiruppur",
          coordinates: [77.2736, 10.9953],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vadamugam Vellodu Waterfall Trek",
        description:
          "Moderate trek through forest trails to a seasonal forest waterfall.",
        category: "EcoAdventure",
        price: 1400,
        capacity: 10,
        duration: 270,
        difficulty: "Moderate",
        location: {
          city: "Vadamugam",
          district: "Tiruppur",
          coordinates: [77.2311, 10.5389],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruppur to Palakkad Hill Road Trek",
        description:
          "Hill trek following scenic routes toward Palakkad Gap with viewpoints and forest edges.",
        category: "EcoAdventure",
        price: 1600,
        capacity: 8,
        duration: 330,
        difficulty: "Challenging",
        location: {
          city: "Hill Road Zone",
          district: "Tiruppur",
          coordinates: [77.0978, 10.5123],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruppur Industrial Museum Visit",
        description:
          "Visit a heritage display center showcasing knitwear evolution and textile innovation.",
        category: "HeritageCulture",
        price: 250,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Tiruppur City",
          district: "Tiruppur",
          coordinates: [77.3424, 11.1076],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Chettipalayam Lake Nature Stop",
        description:
          "Calm lake visit for birdwatching and observing irrigation practices.",
        category: "EcoAdventure",
        price: 250,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Chettipalayam",
          district: "Tiruppur",
          coordinates: [77.3836, 11.0512],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Punjai Puliampatti Heritage Walk",
        description:
          "Village walk exploring rural life, traditional architecture, and temple heritage.",
        category: "HeritageCulture",
        price: 500,
        capacity: 15,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Punjai Puliampatti",
          district: "Tiruppur",
          coordinates: [77.1799, 10.9796],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dharapuram Aanjaneya Temple Visit",
        description:
          "Cultural visit to an ancient hill temple and surrounding forested slopes.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Dharapuram",
          district: "Tiruppur",
          coordinates: [77.5384, 10.7368],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodiveri Canal Agri Walk",
        description:
          "Guided walk along irrigation canals supporting cotton, turmeric, and vegetable farms.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Canal Zone",
          district: "Tiruppur",
          coordinates: [77.3452, 11.1046],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Udumalpet Market & Farm Experience",
        description:
          "Visit bustling agricultural markets and farm-to-market logistics in the Udumalpet region.",
        category: "AgriRural",
        price: 800,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Udumalpet Market",
          district: "Tiruppur",
          coordinates: [77.2487, 10.5861],
        },
        images: [
          "https://images.unsplash.com/photo-1598515213692-5f252cfe4c8d",
        ],
        status: "approved",
      },
      // Dindigul Listings
      {
        creator: creator._id,
        title: "Kodaikanal Hill Station Trek",
        description:
          "Multi-day trek exploring the Princess of Hill Stations with forests, waterfalls, and Nilgiri landscapes.",
        category: "EcoAdventure",
        price: 3500,
        capacity: 10,
        duration: 480,
        difficulty: "Moderate",
        location: {
          city: "Kodaikanal",
          district: "Dindigul",
          coordinates: [77.4891, 10.2381],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodai Lake & Forest Walk",
        description:
          "Easy lakeside walk around the iconic man-made star-shaped lake surrounded by eucalyptus groves.",
        category: "EcoAdventure",
        price: 500,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kodai Lake",
          district: "Dindigul",
          coordinates: [77.485, 10.2347],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palani Murugan Temple Pilgrimage Walk",
        description:
          "Spiritual climb to the hilltop Murugan Temple, one of the six abodes of Lord Murugan.",
        category: "HeritageCulture",
        price: 300,
        capacity: 30,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Palani",
          district: "Dindigul",
          coordinates: [77.5185, 10.4501],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dindigul Fort Heritage Walk",
        description:
          "Historical tour of the 17th-century rock fort with panoramic town views.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Moderate",
        location: {
          city: "Dindigul City",
          district: "Dindigul",
          coordinates: [77.9803, 10.3673],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sirumalai Hills Forest Trek",
        description:
          "Moderate forest trek through protected forests, tribal villages, and medicinal plant zones.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 10,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Sirumalai",
          district: "Dindigul",
          coordinates: [77.9685, 10.1987],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dindigul Lock & Craft Heritage Visit",
        description:
          "Cultural visit to traditional lock-making workshops famous for intricate designs and craftsmanship.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Lock Workshops",
          district: "Dindigul",
          coordinates: [77.9821, 10.3652],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palani Panchamirtham Sacred Food Experience",
        description:
          "Cultural and culinary visit to understand the sacred offering preparation at Palani Temple.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Palani Temple",
          district: "Dindigul",
          coordinates: [77.5186, 10.4502],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vaigai Dam & Reservoir Scenic Walk",
        description:
          "Visit the large reservoir with scenic views of Varushanad Hills and surrounding forests.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Vaigai Dam",
          district: "Dindigul",
          coordinates: [77.5495, 10.1063],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kodaikanal Coaker's Walk & Viewpoint",
        description:
          "Iconic clifftop walk with stunning valley views and misty landscapes.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 60,
        difficulty: "Easy",
        location: {
          city: "Coaker's Walk",
          district: "Dindigul",
          coordinates: [77.4889, 10.2339],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dindigul Biryani & Market Walk",
        description:
          "Culinary walk exploring the famous Dindigul Thalappakatti Biryani heritage and local meat markets.",
        category: "HeritageCulture",
        price: 700,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Market Zone",
          district: "Dindigul",
          coordinates: [77.9825, 10.3676],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Berijam Lake Restricted Zone Trek",
        description:
          "Exclusive forest trek to the protected Berijam Lake with permit-based access.",
        category: "EcoAdventure",
        price: 2500,
        capacity: 6,
        duration: 360,
        difficulty: "Challenging",
        location: {
          city: "Berijam Lake",
          district: "Dindigul",
          coordinates: [77.5289, 10.1876],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thandikudi Murugan Temple Trek",
        description:
          "Moderate hill trek to a remote temple with religious and forest exploration.",
        category: "HeritageCulture",
        price: 900,
        capacity: 15,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Thandikudi",
          district: "Dindigul",
          coordinates: [77.7431, 10.2841],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Natham Handloom Village Visit",
        description:
          "Cultural experience at traditional weaving villages producing Dindigul cotton fabrics.",
        category: "HeritageCulture",
        price: 650,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Natham",
          district: "Dindigul",
          coordinates: [78.2298, 10.2275],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vattalagundu Village Rural Experience",
        description:
          "Rural immersion focusing on dryland farming, sheep rearing, and village life.",
        category: "AgriRural",
        price: 700,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vattalagundu",
          district: "Dindigul",
          coordinates: [77.762, 10.1656],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Poombarai Village Shola Forest Walk",
        description:
          "Walk through montane Shola forests and terraced vegetable farms near Kodaikanal.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 12,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Poombarai",
          district: "Dindigul",
          coordinates: [77.5643, 10.2745],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vedasandur Agricultural Belt Tour",
        description:
          "Agri-tour of dryland farming showcasing groundnut, millets, and rainfed cultivation.",
        category: "AgriRural",
        price: 800,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vedasandur",
          district: "Dindigul",
          coordinates: [77.9509, 10.531],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pannaikadu Reservoir Trek",
        description:
          "Hill trek to a serene reservoir surrounded by forest hills and open grasslands.",
        category: "EcoAdventure",
        price: 1000,
        capacity: 10,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Pannaikadu",
          district: "Dindigul",
          coordinates: [77.7821, 10.4156],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vathalmalai Murugan Temple Hill Trek",
        description:
          "Hill trek to a sacred hilltop temple with forest trails and rocky climbs.",
        category: "HeritageCulture",
        price: 800,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Vathalmalai",
          district: "Dindigul",
          coordinates: [77.8914, 10.3467],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      // Karur Listings
      {
        creator: creator._id,
        title: "Karur Textile Heritage & Cluster Visit",
        description:
          "Guided tour through handloom and powerloom textile units that make Karur the Home Textile Capital of India.",
        category: "HeritageCulture",
        price: 900,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Textile Cluster",
          district: "Karur",
          coordinates: [78.0766, 10.9601],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pasupathieswarar Temple Heritage Walk",
        description:
          "Visit the ancient Shiva temple with rich Chola architectural heritage.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Karur City",
          district: "Karur",
          coordinates: [78.0766, 10.9577],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery-Amaravathi Confluence Trek",
        description:
          "Scenic trek to the confluence point where the Amaravathi River meets the Cauvery.",
        category: "EcoAdventure",
        price: 700,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Confluence Zone",
          district: "Karur",
          coordinates: [78.0985, 10.9431],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mayanur Dam & Canal Walk",
        description:
          "Visit the historic Amaravathi Dam and walk along irrigation canals.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Mayanur",
          district: "Karur",
          coordinates: [77.9887, 11.0847],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Handloom Weaving Experience",
        description:
          "Hands-on visit to traditional weaving houses showcasing the art of bed linen production.",
        category: "HeritageCulture",
        price: 800,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Weaver Colonies",
          district: "Karur",
          coordinates: [78.0789, 10.9589],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Vangal River & Rural Farm Visit",
        description:
          "Explore riverside farming villages focusing on banana, turmeric, and paddy cultivation.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Vangal Riverside",
          district: "Karur",
          coordinates: [78.1356, 10.9732],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Export Hub & Business District Walk",
        description:
          "Behind-the-scenes walk through textile export hubs, finishing units, and logistics centers.",
        category: "HeritageCulture",
        price: 950,
        capacity: 12,
        duration: 210,
        difficulty: "Easy",
        location: {
          city: "Export Zones",
          district: "Karur",
          coordinates: [78.0812, 10.9643],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kulithalai Temple Town Heritage Tour",
        description:
          "Cultural visit to historic temples and riverside bathing ghats in Kulithalai.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kulithalai",
          district: "Karur",
          coordinates: [78.4155, 10.9307],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thanthoni River Sanctuary Eco-Walk",
        description:
          "Calm nature walk along the Thanthoni River focusing on wetland birds and riparian ecology.",
        category: "EcoAdventure",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Thanthoni Riverside",
          district: "Karur",
          coordinates: [78.0234, 10.9876],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Stone Quarrying Heritage Walk",
        description:
          "Industrial heritage visit to stone quarries that historically supplied temple-building materials.",
        category: "HeritageCulture",
        price: 650,
        capacity: 10,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Quarry Areas",
          district: "Karur",
          coordinates: [78.0543, 10.9389],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Organic Cotton Farms Tour",
        description:
          "Visit organic cotton farms and ginning units showcasing sustainable textile sourcing.",
        category: "AgriRural",
        price: 850,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Cotton Belt",
          district: "Karur",
          coordinates: [78.1234, 10.9512],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Aravakurichi Temple & Riverside Walk",
        description:
          "Cultural visit to the Pasupatheeswarar Temple with Cauvery riverfront exploration.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Aravakurichi",
          district: "Karur",
          coordinates: [77.7699, 10.8724],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Neikkarapatti Village Agri Experience",
        description:
          "Rural visit to farming villages focusing on rainfed crops and dryland techniques.",
        category: "AgriRural",
        price: 700,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Neikkarapatti",
          district: "Karur",
          coordinates: [78.0876, 10.9234],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Dyeing Industry Insight Visit",
        description:
          "Behind-the-scenes tour of dyeing and finishing units showcasing textile color innovation.",
        category: "HeritageCulture",
        price: 750,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Dyeing Zone",
          district: "Karur",
          coordinates: [78.0821, 10.9621],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Riverside Sunset Walk",
        description:
          "Evening walk along Amaravathi River with sunset views and village interactions.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Amaravathi Ghats",
          district: "Karur",
          coordinates: [78.0789, 10.9543],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Temple Architecture Heritage Tour",
        description:
          "Guided tour of ancient Chola temples featuring intricate carvings and historical inscriptions.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Temple Circuit",
          district: "Karur",
          coordinates: [78.0798, 10.9576],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pugalur Banana Plantation Visit",
        description:
          "Agri-visit to large-scale banana farms understanding cultivation and post-harvest techniques.",
        category: "AgriRural",
        price: 750,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Pugalur",
          district: "Karur",
          coordinates: [77.8693, 10.9619],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Karur Market & Cuisine Street Walk",
        description:
          "Walking food tour exploring Karur's markets and regional cuisines.",
        category: "HeritageCulture",
        price: 650,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Market Streets",
          district: "Karur",
          coordinates: [78.0801, 10.9598],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Marudur Temple & Village Culture Walk",
        description:
          "Cultural walk through rural temple town with focus on traditional festivals and architecture.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Marudur",
          district: "Karur",
          coordinates: [78.4823, 10.9123],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Velayuthampalayam Agri & Dairy Experience",
        description:
          "Rural farm visit focusing on mixed cropping and smallholder dairy operations.",
        category: "AgriRural",
        price: 800,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Velayuthampalayam",
          district: "Karur",
          coordinates: [78.1123, 10.9412],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      // Namakkal Listings
      {
        creator: creator._id,
        title: "Kolli Hills Scenic Trek & Tribal Visit",
        description:
          "Multi-day trek exploring the isolated Kolli Hills with tribal hamlets, waterfalls, and medicinal forests.",
        category: "EcoAdventure",
        price: 3200,
        capacity: 10,
        duration: 600,
        difficulty: "Challenging",
        location: {
          city: "Kolli Hills",
          district: "Namakkal",
          coordinates: [78.3402, 11.3672],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Agaya Gangai Waterfall Trek",
        description:
          "Trek through forested hill slopes to the spectacular Agaya Gangai Falls in Kolli Hills.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 12,
        duration: 300,
        difficulty: "Challenging",
        location: {
          city: "Agaya Gangai",
          district: "Namakkal",
          coordinates: [78.3354, 11.3792],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Namakkal Fort Heritage & Rock Temple Visit",
        description:
          "Cultural visit to the 17th-century fort and ancient Anjaneyar rock-cut temple.",
        category: "HeritageCulture",
        price: 400,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Namakkal City",
          district: "Namakkal",
          coordinates: [78.167, 11.2189],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolli Hills Arapaleeswarar Temple Trek",
        description:
          "Spiritual trek to an ancient Shiva temple atop Kolli Hills with 70 hairpin turns.",
        category: "HeritageCulture",
        price: 1000,
        capacity: 15,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Temple Zone",
          district: "Namakkal",
          coordinates: [78.3312, 11.3714],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Namakkal Poultry Farms & Industry Tour",
        description:
          "Agri-industrial visit to poultry farms and hatcheries in India's Egg Capital.",
        category: "AgriRural",
        price: 1000,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Poultry Belt",
          district: "Namakkal",
          coordinates: [78.1689, 11.2213],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolli Hills Medicinal Plants Exploration",
        description:
          "Guided walk through forests showcasing rare medicinal plants and tribal herbal knowledge.",
        category: "EcoAdventure",
        price: 1500,
        capacity: 10,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Forest Zone",
          district: "Namakkal",
          coordinates: [78.3423, 11.3689],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Masani Amman Temple & Festival Visit",
        description:
          "Cultural visit to the hilltop temple with panoramic views and local festival immersion.",
        category: "HeritageCulture",
        price: 350,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Kolli Hills",
          district: "Namakkal",
          coordinates: [78.3389, 11.3701],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Tiruchengode Hill Temple Trek",
        description:
          "Hill trek to the Ardhanareeswarar Temple atop a white rock hill.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Tiruchengode",
          district: "Namakkal",
          coordinates: [77.8947, 11.3841],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Siddhar Caves of Kolli Hills Trek",
        description:
          "Guided trek to sacred Siddhar meditation caves in Kolli Hills.",
        category: "HeritageCulture",
        price: 1600,
        capacity: 8,
        duration: 330,
        difficulty: "Challenging",
        location: {
          city: "Siddhar Caves",
          district: "Namakkal",
          coordinates: [78.3534, 11.3789],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mohanur Cauvery Riverbank Walk",
        description:
          "Calm riverside walk along agricultural plains and sand beds.",
        category: "EcoAdventure",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Mohanur",
          district: "Namakkal",
          coordinates: [78.1223, 11.0432],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolli Hills Pepper & Coffee Farm Visit",
        description:
          "Agri-visit to small-scale spice farms cultivating pepper, coffee, and jackfruit.",
        category: "AgriRural",
        price: 1200,
        capacity: 10,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Farm Zone",
          district: "Namakkal",
          coordinates: [78.3489, 11.3634],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Paramathi-Velur Handloom Visit",
        description:
          "Cultural visit to traditional silk and cotton weaving clusters.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Paramathi",
          district: "Namakkal",
          coordinates: [78.0725, 11.2223],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Eranapuram Rock Fort & Valley Views",
        description:
          "Scenic trek to a hill fort offering valley and farmland vistas.",
        category: "HeritageCulture",
        price: 700,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Eranapuram",
          district: "Namakkal",
          coordinates: [78.3278, 11.3012],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Namakkal Transporters Belt & Logistics Walk",
        description:
          "Industrial heritage walk exploring the trucking and logistics hub of Tamil Nadu.",
        category: "HeritageCulture",
        price: 750,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Transport Hubs",
          district: "Namakkal",
          coordinates: [78.1723, 11.2167],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sendamangalam Silk Weaving Heritage",
        description:
          "Cultural visit to silk saree weaving villages showcasing traditional Namakkal silk.",
        category: "HeritageCulture",
        price: 800,
        capacity: 10,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Sendamangalam",
          district: "Namakkal",
          coordinates: [78.2987, 11.3456],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kollimalai Viewpoint & Trek",
        description:
          "Scenic trek with breathtaking hilltop viewpoints overlooking the plains.",
        category: "EcoAdventure",
        price: 1400,
        capacity: 10,
        duration: 270,
        difficulty: "Moderate",
        location: {
          city: "Kollimalai",
          district: "Namakkal",
          coordinates: [78.3512, 11.3723],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kabilarmalai Tribal Village Walk",
        description:
          "Village immersion experience with Kolli Hills tribal communities.",
        category: "AgriRural",
        price: 1300,
        capacity: 8,
        duration: 270,
        difficulty: "Moderate",
        location: {
          city: "Kabilarmalai",
          district: "Namakkal",
          coordinates: [78.3401, 11.3598],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Rasipuram Temple Town Heritage Walk",
        description:
          "Cultural walk through temple-rich town with Dravidian architectural heritage.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Rasipuram",
          district: "Namakkal",
          coordinates: [78.1665, 11.4657],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Namakkal Egg Market & Trade Visit",
        description:
          "Agri-business visit to Asia's largest egg market showcasing trade and logistics.",
        category: "AgriRural",
        price: 900,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Egg Market",
          district: "Namakkal",
          coordinates: [78.1712, 11.2198],
        },
        images: [
          "https://images.unsplash.com/photo-1598515213692-5f252cfe4c8d",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kolli Hills Sunrise Trek",
        description:
          "Early morning trek to hilltop viewpoint for spectacular sunrise over the Eastern Ghats.",
        category: "EcoAdventure",
        price: 1500,
        capacity: 12,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Sunrise Point",
          district: "Namakkal",
          coordinates: [78.3445, 11.3756],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      // Salem Listings
      {
        creator: creator._id,
        title: "Yercaud Hill Station & Lake Walk",
        description:
          "Relaxed walk around Yercaud Lake surrounded by coffee plantations and forests.",
        category: "EcoAdventure",
        price: 600,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Yercaud",
          district: "Salem",
          coordinates: [78.2045, 11.776],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Lady's Seat Viewpoint Trek (Yercaud)",
        description:
          "Scenic trek to a viewpoint overlooking Salem plains and Mettur reservoir.",
        category: "EcoAdventure",
        price: 700,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Lady's Seat",
          district: "Salem",
          coordinates: [78.2034, 11.7801],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mettur Dam & Stanley Reservoir Visit",
        description:
          "Visit one of India's largest dams with scenic reservoir and Cauvery River exploration.",
        category: "EcoAdventure",
        price: 500,
        capacity: 30,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Mettur",
          district: "Salem",
          coordinates: [77.801, 11.7934],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yercaud Coffee Estate Farm Walk",
        description:
          "Guided walk through organic coffee plantations showcasing shade-grown coffee cultivation.",
        category: "AgriRural",
        price: 900,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Yercaud Estates",
          district: "Salem",
          coordinates: [78.2078, 11.7734],
        },
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Salem Steel Plant Heritage Tour",
        description:
          "Industrial heritage visit to one of India's oldest integrated steel plants.",
        category: "HeritageCulture",
        price: 800,
        capacity: 20,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Steel Plant Zone",
          district: "Salem",
          coordinates: [78.1402, 11.6543],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kiliyur Falls Forest Trek",
        description:
          "Moderate forest trek through Shevaroy Hills to the scenic Kiliyur waterfall.",
        category: "EcoAdventure",
        price: 1300,
        capacity: 12,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Kiliyur",
          district: "Salem",
          coordinates: [78.2123, 11.7645],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pagoda Point & Bear's Cave Trek (Yercaud)",
        description:
          "Hill trek to a scenic viewpoint with natural rock formations and cave.",
        category: "EcoAdventure",
        price: 800,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Pagoda Point",
          district: "Salem",
          coordinates: [78.2167, 11.7789],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Salem Mango Belt Agri-Tour",
        description:
          "Farm visit to extensive mango orchards famous for Salem Mangoes and best cultivation practices.",
        category: "AgriRural",
        price: 850,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Mango Belt",
          district: "Salem",
          coordinates: [78.1523, 11.6712],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sugavaneswarar Temple Heritage Walk",
        description:
          "Cultural visit to an ancient Shiva temple with Chola-era inscriptions.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Salem City",
          district: "Salem",
          coordinates: [78.146, 11.6643],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Shevaroy Hills Scenic Drive & Nature Walk",
        description:
          "Scenic drive through the Shevaroy range with forest walks and hilltop viewpoints.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 10,
        duration: 240,
        difficulty: "Easy",
        location: {
          city: "Shevaroy Hills",
          district: "Salem",
          coordinates: [78.2089, 11.7856],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sankagiri Fort Heritage Trek",
        description:
          "Trek to a 15th-century hill fort with multiple bastions and historical significance.",
        category: "HeritageCulture",
        price: 700,
        capacity: 20,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Sankagiri",
          district: "Salem",
          coordinates: [77.8789, 11.4964],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kurumbapatti Zoological Park Visit",
        description:
          "Wildlife visit to a zoological park focused on conservation and native species.",
        category: "EcoAdventure",
        price: 400,
        capacity: 30,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kurumbapatti",
          district: "Salem",
          coordinates: [78.0989, 11.5734],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kannankurichi Lake Bird Sanctuary Walk",
        description:
          "Birdwatching walk around a seasonal lake attracting migratory species.",
        category: "EcoAdventure",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Kannankurichi",
          district: "Salem",
          coordinates: [78.0812, 11.6234],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Salem Textile & Handloom Cluster Visit",
        description:
          "Cultural visit to traditional handloom weaving clusters and textile trade centers.",
        category: "HeritageCulture",
        price: 650,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Textile Zone",
          district: "Salem",
          coordinates: [78.1489, 11.6678],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kottai Mariamman Temple Festival Visit",
        description:
          "Cultural immersion during local temple festival with traditional rituals.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Salem City",
          district: "Salem",
          coordinates: [78.1512, 11.6689],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Yercaud Botanical Garden Walk",
        description:
          "Relaxed walk through terraced gardens showcasing endemic and ornamental plants.",
        category: "EcoAdventure",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Yercaud",
          district: "Salem",
          coordinates: [78.2023, 11.7745],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Jarugumalai Murugan Temple Hill Trek",
        description:
          "Hill trek to a sacred temple atop a small mountain with panoramic views.",
        category: "HeritageCulture",
        price: 600,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Jarugumalai",
          district: "Salem",
          coordinates: [78.1456, 11.7123],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      // Dharmapuri Listings
      {
        creator: creator._id,
        title: "Hogenakkal Falls & Cauvery Gorge Experience",
        description:
          "Visit the spectacular Hogenakkal Waterfalls with coracle boat rides through Cauvery gorges.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 15,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Hogenakkal",
          district: "Dharmapuri",
          coordinates: [77.783, 12.1176],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery Wildlife Sanctuary Trek",
        description:
          "Forest trek through the sanctuary home to elephants, leopards, and diverse birdlife.",
        category: "EcoAdventure",
        price: 1800,
        capacity: 10,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Cauvery Sanctuary",
          district: "Dharmapuri",
          coordinates: [77.5234, 12.0145],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hogenakkal Medicinal Baths & Spa Experience",
        description:
          "Cultural experience of traditional oil massages on river rocks at the falls.",
        category: "HeritageCulture",
        price: 900,
        capacity: 12,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Hogenakkal",
          district: "Dharmapuri",
          coordinates: [77.7834, 12.1179],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Theerthamalai Temple Heritage Visit",
        description:
          "Cultural trek to a Jain temple atop a hill with ancient carvings and inscriptions.",
        category: "HeritageCulture",
        price: 700,
        capacity: 20,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Theerthamalai",
          district: "Dharmapuri",
          coordinates: [78.5978, 12.4312],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Cauvery Fishing Villages Cultural Walk",
        description:
          "Village walk exploring traditional fishing communities along the Cauvery.",
        category: "AgriRural",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Cauvery Basin",
          district: "Dharmapuri",
          coordinates: [77.7923, 12.1134],
        },
        images: [
          "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dharmapuri Mango Orchards Farm Visit",
        description:
          "Agri-visit to extensive mango farms in the Dharmapuri belt showcasing best mango varieties.",
        category: "AgriRural",
        price: 800,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Mango Belt",
          district: "Dharmapuri",
          coordinates: [78.1623, 12.1278],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Subramanya Siva Memorial Heritage Visit",
        description:
          "Cultural visit to the memorial of freedom fighter Subramanya Siva in his birthplace.",
        category: "HeritageCulture",
        price: 300,
        capacity: 25,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Batlagundu",
          district: "Dharmapuri",
          coordinates: [78.1534, 12.1212],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Dharmapuri Sericulture & Silk Farm Tour",
        description:
          "Agri-tour of mulberry farms and silk rearing units showcasing sericulture practices.",
        category: "AgriRural",
        price: 750,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Silk Belt",
          district: "Dharmapuri",
          coordinates: [78.1689, 12.1345],
        },
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Palacode Tribal Village Immersion",
        description:
          "Village experience focusing on tribal customs, forest dependence, and traditional practices.",
        category: "AgriRural",
        price: 900,
        capacity: 10,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Palacode",
          district: "Dharmapuri",
          coordinates: [77.9234, 12.1834],
        },
        images: [
          "https://image2url.com/r2/default/images/1769673050659-f626dc27-5ecf-47c6-ac42-44865d539142.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Krishnagiri Dam Valley Trek",
        description:
          "Scenic trek around the reservoir with views of surrounding hills and valleys.",
        category: "EcoAdventure",
        price: 700,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Krishnagiri Dam",
          district: "Dharmapuri",
          coordinates: [78.2145, 12.5234],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Papparapatti Elephant Corridor Walk",
        description:
          "Guided walk through elephant corridors and protected forest buffer zones.",
        category: "EcoAdventure",
        price: 1400,
        capacity: 8,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Papparapatti",
          district: "Dharmapuri",
          coordinates: [77.8234, 11.9876],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Adhiyamankottai Ancient Fort Trek",
        description:
          "Heritage trek to hilltop ruins of an ancient Adhiyaman dynasty fort.",
        category: "HeritageCulture",
        price: 800,
        capacity: 15,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Adhiyamankottai",
          district: "Dharmapuri",
          coordinates: [78.2067, 12.1234],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hanumanthapuram Tribal Farms Walk",
        description:
          "Agri-visit to tribal farms focusing on rainfed crops and traditional farming methods.",
        category: "AgriRural",
        price: 750,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Hanumanthapuram",
          district: "Dharmapuri",
          coordinates: [78.0923, 12.0845],
        },
        images: [
          "https://image2url.com/r2/default/images/1769672963671-d6078913-c5df-4fef-a4c4-124ea227c225.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Pennagram Hill & Temple Trek",
        description:
          "Hill trek to an ancient temple with scenic views of Dharmapuri plains.",
        category: "HeritageCulture",
        price: 650,
        capacity: 20,
        duration: 150,
        difficulty: "Moderate",
        location: {
          city: "Pennagaram",
          district: "Dharmapuri",
          coordinates: [77.8945, 12.1356],
        },
        images: [
          "https://images.unsplash.com/photo-1601049541289-9b1b7bbb0b1c",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Morappur Cauvery Riverbank Experience",
        description:
          "Riverside trek along scenic Cauvery stretches with fishing village interactions.",
        category: "EcoAdventure",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Morappur",
          district: "Dharmapuri",
          coordinates: [78.2134, 12.0756],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      // Krishnagiri Listings
      {
        creator: creator._id,
        title: "Krishnagiri Reservoir & Dam Scenic Walk",
        description:
          "Relaxed walk around the large reservoir with scenic hill and water views.",
        category: "EcoAdventure",
        price: 500,
        capacity: 25,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Krishnagiri Dam",
          district: "Krishnagiri",
          coordinates: [78.2145, 12.5298],
        },
        images: [
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Krishnagiri Fort Heritage Visit",
        description:
          "Historical walk around the hilltop fort built by Haider Ali with panoramic town views.",
        category: "HeritageCulture",
        price: 400,
        capacity: 20,
        duration: 120,
        difficulty: "Moderate",
        location: {
          city: "Krishnagiri City",
          district: "Krishnagiri",
          coordinates: [78.2134, 12.5267],
        },
        images: [
          "https://www.revv.co.in/blogs/wp-content/uploads/2020/06/Krishnagiri-Fort-Chennai.jpg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kaveripattinam Sacred Groves & Temple Walk",
        description:
          "Cultural visit to ancient sacred groves and Jain heritage sites.",
        category: "HeritageCulture",
        price: 600,
        capacity: 15,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kaveripattinam",
          district: "Krishnagiri",
          coordinates: [78.2245, 12.5412],
        },
        images: [
          "https://media.assettype.com/thenewsminute/import/sites/default/files/sacred_groves_main.jpg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Krishnagiri Mango Belt Farm Visit",
        description:
          "Agri-tour of famous mango orchards producing export-quality varieties.",
        category: "AgriRural",
        price: 900,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Mango Farms",
          district: "Krishnagiri",
          coordinates: [78.2389, 12.5134],
        },
        images: [
          "https://image2url.com/r2/default/images/1769672847193-5acb995a-86c4-4d44-b8f7-bdbd23bc4128.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Anchetty Border Forest Trek",
        description:
          "Forest trek along the Tamil Nadu-Karnataka border with diverse wildlife.",
        category: "EcoAdventure",
        price: 1600,
        capacity: 10,
        duration: 300,
        difficulty: "Moderate",
        location: {
          city: "Anchetty",
          district: "Krishnagiri",
          coordinates: [77.5934, 12.6123],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Shoolagiri Hills Trek & Temple Visit",
        description:
          "Hill trek to the Yoga Narasimha temple atop Shoolagiri with historical significance.",
        category: "HeritageCulture",
        price: 1000,
        capacity: 15,
        duration: 240,
        difficulty: "Moderate",
        location: {
          city: "Shoolagiri",
          district: "Krishnagiri",
          coordinates: [78.1534, 12.7567],
        },
        images: [
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/d6/54/1e/twin-hills-of-sholinghur.jpg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Thally Valley Scenic Drive & Nature Walk",
        description:
          "Scenic drive through the Thally Valley with forest and rural farmland stops.",
        category: "EcoAdventure",
        price: 1200,
        capacity: 12,
        duration: 240,
        difficulty: "Easy",
        location: {
          city: "Thally",
          district: "Krishnagiri",
          coordinates: [77.8034, 12.3145],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hosur Industrial Heritage Walk",
        description:
          "Industrial heritage tour of Hosur's automotive and electronics manufacturing zones.",
        category: "HeritageCulture",
        price: 800,
        capacity: 15,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Hosur",
          district: "Krishnagiri",
          coordinates: [77.8285, 12.7409],
        },
        images: [
          "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Denkanikottai Reservoir & Forest Walk",
        description:
          "Calm walk around reservoir edges with forest birding and landscape photography.",
        category: "EcoAdventure",
        price: 700,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Denkanikottai",
          district: "Krishnagiri",
          coordinates: [77.7823, 12.5345],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Kelavarapalli Dam & Village Experience",
        description:
          "Visit scenic dam with village interactions focusing on water management.",
        category: "AgriRural",
        price: 600,
        capacity: 20,
        duration: 150,
        difficulty: "Easy",
        location: {
          city: "Kelavarapalli",
          district: "Krishnagiri",
          coordinates: [77.8945, 12.5978],
        },
        images: [
          "https://image2url.com/r2/default/images/1769672737577-b175b3f8-5e1b-4218-968c-d768e8da6a6b.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Krishnagiri Floriculture & Rose Farms Tour",
        description:
          "Agri-tour of rose farms and floriculture units showcasing commercial flower cultivation.",
        category: "AgriRural",
        price: 850,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Floriculture Zone",
          district: "Krishnagiri",
          coordinates: [78.2234, 12.5189],
        },
        images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b"],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Barur Hill Eco-Trek",
        description:
          "Moderate hill trek through dry deciduous forests and rocky landscapes.",
        category: "EcoAdventure",
        price: 1100,
        capacity: 12,
        duration: 210,
        difficulty: "Moderate",
        location: {
          city: "Barur",
          district: "Krishnagiri",
          coordinates: [78.0734, 12.4812],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Mathigiri Jain Beds Heritage Visit",
        description:
          "Cultural visit to ancient Jain rock-cut beds and inscriptions from the 9th century.",
        category: "HeritageCulture",
        price: 700,
        capacity: 15,
        duration: 180,
        difficulty: "Moderate",
        location: {
          city: "Mathigiri",
          district: "Krishnagiri",
          coordinates: [78.3834, 12.5934],
        },
        images: [
          "https://content.jdmagicbox.com/v2/comp/bangalore/b3/080pxx80.xx80.180920190125.c5b3/catalogue/shree-parshwa-susheel-dham-swetamber-jain-temple-balagaranahalli-bangalore-jain-temples-sgqovv228v.jpg",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Sayed Basha Hills Nature Trek",
        description:
          "Forest trek through the Sayed Basha Hills with wildlife sightings and viewpoints.",
        category: "EcoAdventure",
        price: 1400,
        capacity: 10,
        duration: 270,
        difficulty: "Moderate",
        location: {
          city: "Sayed Basha Hills",
          district: "Krishnagiri",
          coordinates: [77.9456, 12.4567],
        },
        images: [
          "https://images.unsplash.com/photo-1474511320723-9a56873867b5",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Hosur Botanical Garden & Biodiversity Walk",
        description:
          "Relaxed walk through gardens showcasing native and exotic plant species.",
        category: "EcoAdventure",
        price: 300,
        capacity: 30,
        duration: 90,
        difficulty: "Easy",
        location: {
          city: "Hosur",
          district: "Krishnagiri",
          coordinates: [77.8312, 12.7423],
        },
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Bagalur Sericulture Village Visit",
        description:
          "Village experience focusing on silk rearing, mulberry cultivation, and rural livelihoods.",
        category: "AgriRural",
        price: 750,
        capacity: 12,
        duration: 180,
        difficulty: "Easy",
        location: {
          city: "Bagalur",
          district: "Krishnagiri",
          coordinates: [77.9456, 12.5812],
        },
        images: [
          "https://image2url.com/r2/default/images/1769672646514-922b6ca0-79a4-4db4-b5e0-6df6fa5c67df.png",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Krishnagiri Border Trekking Circuit",
        description:
          "Multi-day trek along the Tamil Nadu-Karnataka border exploring diverse landscapes.",
        category: "EcoAdventure",
        price: 2800,
        capacity: 8,
        duration: 480,
        difficulty: "Challenging",
        location: {
          city: "Border Circuit",
          district: "Krishnagiri",
          coordinates: [77.7234, 12.5934],
        },
        images: [
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        status: "approved",
      },
      {
        creator: creator._id,
        title: "Uthangarai Temple & Village Heritage Walk",
        description:
          "Cultural walk through a traditional temple town with rural heritage exploration.",
        category: "HeritageCulture",
        price: 500,
        capacity: 20,
        duration: 120,
        difficulty: "Easy",
        location: {
          city: "Uthangarai",
          district: "Krishnagiri",
          coordinates: [78.0234, 12.3567],
        },
        images: [
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/13/eb/f3/velavan-temple.jpg?w=400",
        ],
        status: "approved",
      },
    ];

    await Listing.insertMany(listings);
    console.log("✅ Seeding successful! Created 1 creator and 571 listings.");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
