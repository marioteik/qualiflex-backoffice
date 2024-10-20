import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { userSchema } from "./data/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Usuários",
  description:
    "Um rastreador de usuários e problemas construído usando Tanstack Table.",
};

// Simular uma leitura de banco de dados para usuários.
async function getUsuarios() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(private)/usuarios/data/users.json"),
  );

  const users = JSON.parse(data.toString());

  return z.array(userSchema).parse(users);
}

export default async function UserPage() {
  const users = await getUsuarios();

  return (
    <Card className="h-full w-full flex-1 flex-col">
      <CardHeader>
        <CardTitle>Usuários</CardTitle>
        <CardDescription>
          Administre seus usuários, edite suas permissões e veja suas
          informações de contato.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={users} columns={columns} />
      </CardContent>
    </Card>
  );
}
