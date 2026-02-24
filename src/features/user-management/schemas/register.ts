import { z } from "zod";
import { useTranslations } from "next-intl";

export const useRegisterSchema = () => {
  const t = useTranslations("register.validation");

  return z.object({
    email: z
      .string()
      .min(1, { message: t("email_required") })
      .email({ message: t("email_invalid") })
      .trim()
      .toLowerCase(),
    name: z
      .string()
      .min(1, { message: t("name_required") })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(1, { message: t("password_required") })
      .min(6, { message: t("password_min") }),
    confirmPassword: z
      .string()
      .min(1, { message: t("confirm_required") })
      .min(6, { message: t("password_min") }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("passwords_dont_match"),
    path: ["confirmPassword"],
  });
};

export type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>;