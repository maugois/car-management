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
     year: z
      .string()
      .min(1, { message: t('year_invalid') })
      .refine((val) => {
        const num = parseInt(val, 10);
        return !isNaN(num) && num >= 1900 && num <= 2030;
      }, {
        message: t('year_invalid'),
      }),
  });
}

export type CarFormData = z.infer<ReturnType<typeof useCarFormSchema>>;