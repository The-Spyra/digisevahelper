import { z } from "zod"

const serviceFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
    redirectUrl: z.string().url({ message: "Enter a valid url" }),
    provided: z.boolean(),
    documents: z.array(
      z.string().min(1, { message: "Document cannot be empty" })
    ),
    maxPrice: z.number().default(0),
    minPrice: z.number().default(0),
  })
  .superRefine(({ provided, minPrice, maxPrice }, ctx) => {
    if (provided) {
      if (minPrice === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["minPrice"],
          message: "Min price cannot be zero",
        })
      } else if (maxPrice === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["maxPrice"],
          message: "Max price cannot be zero",
        })
      } else if (maxPrice < minPrice) {
        ctx.addIssue({
          code: "custom",
          path: ["maxPrice"],
          message: "Max price cannot be less than min price",
        })
      }
    }
  })

export default serviceFormSchema
