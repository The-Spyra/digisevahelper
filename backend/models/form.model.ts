import mongoose from "mongoose"
import Form from "../types/form.type"

const formSchema = new mongoose.Schema<Form>(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const formModel = mongoose.model("Form", formSchema)
export default formModel
