import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function useAuth(supabase?: SupabaseClient) {
  const _supabase = supabase ?? createClient();

  const userInfo = await _supabase.auth.getUser();

  if (userInfo.error || !userInfo.data?.user) {
    redirect("/login");
  }

  return userInfo;
}
