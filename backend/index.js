import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import passport from "passport";
import "./src/config/passport.js";
import errorHandler from "./src/middlewares/error.middleware.js";

// Route files
import authRoutes from "./src/routes/auth.routes.js";
import listingRoutes from "./src/routes/listing.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import aiRoutes from "./src/routes/ai.routes.js";
import discoveryRoutes from "./src/routes/discovery.routes.js";
import logger from "./src/utils/logger.js";

// Load env vars
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/discovery", discoveryRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Heritage Farm API" });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      logger.info(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });
  });
}

export default app;
