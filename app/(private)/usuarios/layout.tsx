import type { Metadata } from "next";

import { UsersStoreProvider } from "@/app/(private)/usuarios/_store/provider";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Usuários",
  description:
    "Administre seus usuários, edite suas permissões e veja suas informações de contato.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <UsersStoreProvider>{children}</UsersStoreProvider>;
}
