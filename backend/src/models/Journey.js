import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a journey name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    listings: [
      {
        listing: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Listing",
          required: true,
        },
        day: Number,
        order: Number,
        duration: Number,
      },
    ],
    totalDays: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    creatorEarnings: {
      type: Number,
      required: true,
    },
    sectors: [
      {
        type: String,
        enum: ["AgriRural", "HeritageCulture", "EcoAdventure"],
      },
    ],
    startLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number],
      formattedAddress: String,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging"],
      default: "Easy",
    },
    suitable: {
      type: String,
      enum: ["foreigners", "domestic", "both"],
      default: "both",
    },
    languages: [
      {
        type: String,
        enum: ["tamil", "english", "hindi"],
      },
    ],
    tags: [String],
    isAiGenerated: {
      type: Boolean,
      default: false,
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Journey", journeySchema);
