import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/app/(private)/configuracoes/components/profile-form";
import { Separator } from "@/components/ui/separator";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
