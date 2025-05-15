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

export const signupSchema = z
  .object({
    name: z.string({
      required_error: "Nome é obrigatório",
    }),
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
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
      })
      .min(1, "Confirmação de senha é obrigatória"),
    avatar: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
