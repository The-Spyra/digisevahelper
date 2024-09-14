import { z } from "zod"

const serviceFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
    redirectUrl: z.union([
      z.string().url({ message: "Enter a valid url" }),
      z.string(),
    ]),
    provided: z.boolean(),
    documents: z.array(
      z.string().min(1, { message: "Document name cannot be empty" })
    ),
    price: z.string().default(""),
  })
  .superRefine(({ provided, price }, ctx) => {
    if (provided) {
      if (!price) {
        ctx.addIssue({
          code: "custom",
          message: "Price cannot be empty",
          path: ["price"],
        })
      }
    }
  })

export default serviceFormSchema
