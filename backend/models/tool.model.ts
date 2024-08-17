import mongoose from "mongoose"
import Tool from "../types/tool.type"

const toolSchema = new mongoose.Schema<Tool>(
  {
    name: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const toolModel = mongoose.model("Tool", toolSchema)
export default toolModel
