import { z } from "zod";
import { useTranslations } from "next-intl";

export const useLoginSchema = () => {
  const t = useTranslations("login.validation");

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("email_required") })
      .email({ message: t("email_invalid") })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(1, { message: t("password_required") })
      .min(6, { message: t("password_min") }),
  });

  return loginSchema;
};

export type LoginFormData = z.infer<ReturnType<typeof useLoginSchema>>;