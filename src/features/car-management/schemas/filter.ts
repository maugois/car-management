import { z } from "zod";
import { useTranslations } from "next-intl";

export const useFilterSchema = () => {
  const t = useTranslations("filters.validation");

  return z.object({
    brand: z.string().trim().toLowerCase(),
    model: z.string().trim().toLowerCase(),
    year: z.string().trim(),
  })
  .refine(
    (data) => {
      return data.brand.length > 1 || data.model.length > 1 || data.year.length > 1;
    },
    {
      message: t("at_least_one"),
      path: ["brand"],
    }
  );
};

export type FilterData = z.infer<ReturnType<typeof useFilterSchema>>;