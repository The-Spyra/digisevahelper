import { z } from "zod"

const serviceFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
    redirectUrl: z.string().url({ message: "Enter a valid url" }),
    provided: z.boolean(),
    documents: z
      .array(z.string().min(1, { message: "Document cannot be empty" }))
      .min(1, { message: "At least one document is required" }),
    maxPrice: z.number().default(0),
    minPrice: z.number().default(0),
  })
  .superRefine(({ provided, minPrice, maxPrice }, ctx) => {
    if (provided) {
      if (minPrice === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["min"],
          message: "Min value cannot be empty",
        })
      }
      if (maxPrice === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["max"],
          message: "Max value cannot be empty",
        })
      }
    }
  })

export default serviceFormSchema
