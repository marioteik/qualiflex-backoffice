import { createServerActionProcedure } from "zsa";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect("/login");
    }

    return { user, supabase };
  },
);
