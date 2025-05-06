"use client";

import { useLogin } from "@/modules/auth/application/hooks/use-auth-queries";
import {
  loginSchema,
  type LoginFormData,
} from "@/modules/auth/domain/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "../input";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { login, loading, error } = useLogin();
  const { push } = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);

      if (result) {
        push("/home");
      }
    } catch (err) {
      console.error("Erro de login:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Acesse sua conta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre com seu email abaixo para acessar sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Input
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="Digite sua senha"
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ variant: "link", className: "px-1" })
            )}
          >
            Criar conta
          </Link>
        </div>
      </form>
    </Form>
  );
}
