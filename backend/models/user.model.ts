import mongoose from "mongoose"
import User from "../types/user.type"

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    shopName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    bannerUrl: {
      type: String,
    },
    watermarkUrl: {
      type: String,
    },
    bannerVerified: {
      type: Boolean,
      default: false,
    },
    newBanner: {
      type: String,
    },
    newBannerDate: {
      type: Date,
    },
    watermarkVerified: {
      type: Boolean,
      default: false,
    },
    planType: {
      type: String,
      enum: ["plan1", "plan2", "plan3"],
    },
    planExp: {
      type: Date,
    },
    freetriel: {
      type: Boolean,
    },
    trielExpiry: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationTokenExp: {
      type: Date,
    },
    watermarkCreatedAt: {
      type: Date,
    },
    bannerCreatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

const userModel = mongoose.model("User", userSchema)
export default userModel
