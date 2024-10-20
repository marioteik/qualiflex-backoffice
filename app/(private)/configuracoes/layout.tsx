import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/(private)/configuracoes/components/sidenav";
import type { ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Configurações",
  description:
    "Gerencie as configurações da sua conta e defina as preferências de e-mail.",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/configuracoes",
  },
  {
    title: "Conta",
    href: "/configuracoes/conta",
  },
  {
    title: "Aparência",
    href: "/configuracoes/aparencia",
  },
  {
    title: "Notificações",
    href: "/configuracoes/notificacoes",
  },
  {
    title: "Exibição",
    href: "/configuracoes/exibicao",
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>
          Gerencie as configurações da sua conta e defina as preferências de
          e-mail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="pt-6 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
