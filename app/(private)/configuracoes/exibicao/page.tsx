import { Separator } from "@/components/ui/separator";
import { DisplayForm } from "@/app/(private)/configuracoes/exibicao/exibicao-form";

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Exibição</h3>
        <p className="text-sm text-muted-foreground">
          Ative ou desative itens para controlar o que é exibido na aplicação.
        </p>
      </div>
      <Separator />
      <DisplayForm />
    </div>
  );
}
