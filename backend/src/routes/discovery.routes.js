import express from "express";
import {
  discoverNearby,
  generateBundle,
  getSeasonalRecommendations,
  getJourneyBundles,
  getCreatorStats,
} from "../controllers/discovery.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/nearby", discoverNearby);
router.post("/bundle/generate", protect, generateBundle);
router.get("/seasonal", getSeasonalRecommendations);
router.get("/bundles", getJourneyBundles);
router.get("/stats", getCreatorStats);

export default router;
