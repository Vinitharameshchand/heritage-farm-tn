import aiService from "../services/ai.service.js";
import Journey from "../models/Journey.js";
import Listing from "../models/Listing.js";

export const discoverNearby = async (req, res) => {
  try {
    const { latitude, longitude, radius = 30 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const discoveries = await aiService.discoverNearby(
      parseFloat(latitude),
      parseFloat(longitude),
      parseInt(radius),
    );

    res.status(200).json({
      success: true,
      data: discoveries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateBundle = async (req, res) => {
  try {
    const { startLocation, days, interests, budget, language } = req.body;

    if (!startLocation || !startLocation.coordinates) {
      return res.status(400).json({
        success: false,
        message: "Start location with coordinates is required",
      });
    }

    const journeyData = await aiService.generateJourneyBundle({
      startLocation,
      days: days || 3,
      interests: interests || ["AgriRural", "HeritageCulture", "EcoAdventure"],
      budget: budget || 10000,
      language: language || "english",
    });

    const journey = await Journey.create(journeyData);
    await journey.populate("listings.listing");

    res.status(201).json({
      success: true,
      data: journey,
      message: `AI generated ${days}-day journey bundle successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSeasonalRecommendations = async (req, res) => {
  try {
    const { month } = req.query;
    const currentMonth = month ? parseInt(month) : new Date().getMonth() + 1;

    const recommendations =
      await aiService.getSeasonalRecommendations(currentMonth);

    res.status(200).json({
      success: true,
      data: {
        month: currentMonth,
        recommendations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJourneyBundles = async (req, res) => {
  try {
    const { suitable, minDays, maxDays, maxPrice } = req.query;

    const filter = {};
    if (suitable) filter.suitable = suitable;
    if (minDays) filter.totalDays = { $gte: parseInt(minDays) };
    if (maxDays)
      filter.totalDays = { ...filter.totalDays, $lte: parseInt(maxDays) };
    if (maxPrice) filter.totalPrice = { $lte: parseInt(maxPrice) };

    const bundles = await Journey.find(filter)
      .populate("listings.listing")
      .sort("-bookingCount -rating")
      .limit(10);

    res.status(200).json({
      success: true,
      count: bundles.length,
      data: bundles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCreatorStats = async (req, res) => {
  try {
    const stats = await Listing.aggregate([
      {
        $match: { status: "approved" },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          totalCapacity: { $sum: "$capacity" },
        },
      },
    ]);

    const districtStats = await Listing.aggregate([
      {
        $match: { status: "approved" },
      },
      {
        $group: {
          _id: "$location.district",
          count: { $sum: 1 },
          categories: { $addToSet: "$category" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        bySector: stats,
        byDistrict: districtStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
