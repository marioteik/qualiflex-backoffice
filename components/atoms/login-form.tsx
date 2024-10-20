"use client";

import { login as Login, signup as SignUp } from "@/app/(auth)/login/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

enum LoginMessages {
  invalid_credentials = "Usuário ou senha incorretos.",
  weak_password = "Your password should have at least 8 digits",
  over_email_send_rate_limit = "Por favor, espere 1m para cadastrar novamente",
  email_not_confirmed = "Email não verificado",
}

export const LoginForm = ({
  login,
  signup,
}: {
  login: typeof Login;
  signup: typeof SignUp;
}) => {
  const handleSubmit = async (formData: FormData) => {
    const error = await login(formData);
    if (error) {
      toast.error(
        LoginMessages[error as unknown as keyof typeof LoginMessages],
      );
      return;
    }
  };

  const handleSignup = async (formData: FormData) => {
    const error = await signup(formData);
    if (error) {
      toast.error(
        LoginMessages[error as unknown as keyof typeof LoginMessages],
      );
      return;
    }
  };

  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@qualiflex.com.br"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Senha</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" formAction={handleSubmit} className="w-full">
        Entrar
      </Button>
      <Button
        variant="outline"
        type="submit"
        formAction={handleSignup}
        className="w-full"
      >
        Requisite acesso ao Administrador
      </Button>
    </form>
  );
};
