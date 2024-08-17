import mongoose from "mongoose"
import Admin from "../types/admin.type"

const adminSchema = new mongoose.Schema<Admin>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const adminModel = mongoose.model("Admin", adminSchema)
export default adminModel
