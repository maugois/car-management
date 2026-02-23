import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Insira um endereço de e-mail válido" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" })
    .min(6, { message: "Mínimo 6 caracteres" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;