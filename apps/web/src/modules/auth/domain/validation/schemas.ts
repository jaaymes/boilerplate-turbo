import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
