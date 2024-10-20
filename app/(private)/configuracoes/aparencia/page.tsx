import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "@/app/(private)/configuracoes/aparencia/appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground">
          Personalize a aparência do aplicativo. Alterne automaticamente entre
          os temas de dia e noite.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
