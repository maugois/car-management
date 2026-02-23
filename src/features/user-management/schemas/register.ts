import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, { message: "O e-mail é obrigatório" })
        .email({ message: "Insira um endereço de e-mail válido" })
        .trim()
        .toLowerCase(),
    name: z
        .string()
        .min(1, { message: "O nome completo é obrigatório" })
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(1, { message: "A senha é obrigatória" })
        .min(6, { message: "Mínimo 6 caracteres" }),
    confirmPassword: z
        .string()
        .min(1, { message: "A confirmação é obrigatória" })
        .min(6, { message: "Mínimo 6 caracteres" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;