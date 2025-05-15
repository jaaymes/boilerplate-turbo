"use client";

import { useSignup } from "@/modules/auth/application/hooks/use-signup";
import {
  signupSchema,
  type SignupFormData,
} from "@/modules/auth/domain/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@package/ui/components/button";
import { Form } from "@package/ui/components/form";
import { cn } from "@package/ui/lib/utils";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "../input";

export function SignupForm() {
  const { signup, loading, error } = useSignup();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const { handleSubmit, control } = form;

  // Real-time password validation
  const password = useWatch({ control, name: "password" });

  // Password requirements
  const requirements = [
    {
      label: "Mínimo de 8 caracteres",
      test: (pw: string) => pw.length >= 8,
    },
    {
      label: "Pelo menos uma letra maiúscula",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Pelo menos um número",
      test: (pw: string) => /[0-9]/.test(pw),
    },
    {
      label: "Pelo menos um caractere especial",
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(signup)} className="space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-2xl font-bold">Crie sua conta</span>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <Input
              control={control}
              name="avatar"
              label="Avatar"
              placeholder="Insira o link do seu avatar"
            />
            <Input
              control={control}
              name="name"
              label="Nome"
              placeholder="Digite seu nome"
              required
            />

            <Input
              control={control}
              name="email"
              label="Email"
              placeholder="Digite seu email"
              required
            />

            <Input
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="Digite sua senha"
              required
            />

            <ul className="mb-2 mt-1 space-y-1 text-xs">
              {requirements.map((req, idx) => {
                const passed = req.test(password || "");
                return (
                  <li
                    key={idx}
                    className={
                      passed
                        ? "text-green-600 flex items-center gap-1"
                        : "text-destructive flex items-center gap-1"
                    }
                  >
                    <span className="inline-block w-3 h-3 rounded-full border border-current flex items-center justify-center">
                      {passed ? (
                        <span className="bg-green-600 w-2 h-2 rounded-full block" />
                      ) : (
                        <span className="bg-destructive w-2 h-2 rounded-full block" />
                      )}
                    </span>
                    {req.label}
                  </li>
                );
              })}
            </ul>

            <Input
              control={control}
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              placeholder="Digite sua senha novamente"
              required
            />
          </div>

          {error && (
            <div
              data-testid="login-error"
              className="text-destructive text-sm text-center"
            >
              {error}
            </div>
          )}
          <div className="flex justify-center gap-2">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Voltar
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
