import mongoose from "mongoose"
import Service from "../types/service.type"

const serviceSchema = new mongoose.Schema<Service>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    provided: {
      type: Boolean,
      default: false,
    },
    documents: {
      type: [String],
      default: [],
    },
    price: {
      type: String,
    },
  },
  { timestamps: true }
)

const serviceModel = mongoose.model("Service", serviceSchema)
export default serviceModel
