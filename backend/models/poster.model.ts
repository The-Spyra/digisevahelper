import mongoose from "mongoose"
import Poster from "../types/poster.type"

const posterSchema = new mongoose.Schema<Poster>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const posterModel = mongoose.model("Poster", posterSchema)
export default posterModel
