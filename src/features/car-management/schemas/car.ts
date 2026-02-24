import { z } from "zod";
import { useTranslations } from "next-intl";

export const useCarFormSchema = () => {
  const t = useTranslations('carSchema.validation');

  return z.object({
    brand: z
      .string()
      .trim()
      .min(1, { message: t('brand_required') })
      .toLowerCase(),
    model: z
      .string()
      .trim()
      .min(1, { message: t('model_required') })
      .toLowerCase(),
    color: z
      .string()
      .trim()
      .min(1, { message: t('color_required') })
      .toLowerCase(),
    year: z.string().min(1900, t('year_invalid')).max(2030, t('year_invalid')),
  });
}

export type CarFormData = z.infer<ReturnType<typeof useCarFormSchema>>;