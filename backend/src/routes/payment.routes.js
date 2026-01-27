import express from "express";
import {
  createOrder,
  verifyPayment,
  createSubscriptionPlan,
  createSubscription,
  verifySubscriptionPayment,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.post("/plan", protect, createSubscriptionPlan);
router.post("/subscription", protect, createSubscription);
router.post("/subscription/verify", protect, verifySubscriptionPayment);

export default router;
