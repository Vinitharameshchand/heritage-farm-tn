import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["tourist", "creator", "admin"],
      default: "tourist",
    },
    creatorProfile: {
      creatorId: {
        type: String,
        unique: true,
        sparse: true,
      },
      category: {
        type: String,
        enum: ["farmer", "artisan", "guide", "homestay"],
        sparse: true,
      },
      district: {
        type: String,
        sparse: true,
      },
      verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      aadhaarVerified: {
        type: Boolean,
        default: false,
      },
      totalBookings: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      languages: [
        {
          type: String,
          enum: ["tamil", "english", "hindi"],
        },
      ],
      phoneNumber: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    language: {
      type: String,
      enum: ["en", "ta"],
      default: "en",
    },
    nationality: {
      type: String,
      default: "India",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateCreatorId = function () {
  if (this.role === "creator" && !this.creatorProfile?.creatorId) {
    const district = this.creatorProfile?.district || "UNK";
    const category = this.creatorProfile?.category || "GEN";
    const randomNum = Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, "0");

    const categoryCode =
      {
        farmer: "FARM",
        artisan: "ART",
        guide: "GUIDE",
        homestay: "HOME",
      }[category] || "GEN";

    return `HF-TN-${district.substring(0, 3).toUpperCase()}-${categoryCode}-${randomNum}`;
  }
  return null;
};

export default mongoose.model("User", userSchema);
