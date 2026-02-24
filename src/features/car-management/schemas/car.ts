import { z } from "zod";

export const CarSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(1, { message: "A marca é obrigatória" })
    .toLowerCase(),
  model: z
    .string()
    .trim()
    .min(1, { message: "O modelo é obrigatório" })
    .toLowerCase(),
  color: z
    .string()
    .trim()
    .min(1, { message: "A cor é obrigatório" })
    .toLowerCase(),
  year: z
    .string()
    .trim()
    .min(1, { message: "O ano é obrigatório" })
    .length(4, { message: "O ano deve ter 4 dígitos" }),
});

export type carData = z.infer<typeof CarSchema>;