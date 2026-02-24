import { z } from "zod";

export const filterSchema = z.object({
brand: z.string().trim().toLowerCase(),
    model: z.string().trim().toLowerCase(),
    year: z.string().trim(),
})
.refine(
    (data) => {
      return data.brand.length > 1 || data.model.length > 1 || data.year.length > 1;
    },
    {
      message: "Pelo menos um dos campos (Marca, Modelo ou Ano) deve ter mais de 1 caractere",
      path: ["brand"],
    }
);

export type FilterData = z.infer<typeof filterSchema>;