import mongoose from "mongoose"
import User from "../types/user.d"

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
    shopName:{
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
    },
    watermarkUrl: {
      type: String,
    },
    bannerVerfiied: {
      type: Boolean,
      default: false,
    },
    watermarkVerified: {
      type: Boolean,
      default: false,
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
