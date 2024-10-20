import Image from "next/image";
import { login, signup } from "@/app/(auth)/login/actions";
import { LoginForm } from "@/components/atoms/login-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  if ((await supabase.auth.getUser()).data.user) {
    redirect("/");
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-10">
          <h1 className="text-3xl font-bold">
            <Image
              src="/imgs/logo.png"
              alt="Image"
              width="350"
              height="101"
              priority={true}
              className="h-auto w-full object-cover object-right dark:brightness-[0.2] dark:grayscale"
            />
          </h1>
          <LoginForm login={login} signup={signup} />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/imgs/apolo_login.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-right dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
