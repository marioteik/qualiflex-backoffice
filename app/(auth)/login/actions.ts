"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await supabase.auth.signInWithPassword(data);

  if (res.error) {
    return res.error?.code;
  }

  permanentRedirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await supabase.auth.signUp(data);

  if (res.error) {
    return res.error?.code;
  }

  permanentRedirect("/");
}
