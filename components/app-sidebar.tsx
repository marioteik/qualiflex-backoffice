"use client";

import * as React from "react";
import { LayoutDashboard, MapIcon, Truck, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavAdministration } from "@/components/nav-administration";
import { NavUser } from "@/components/nav-user";
import { ModuleSwitcher } from "@/components/module-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { User } from "@/app/(private)/usuarios/data/schema";

// This is sample data.
const data = {
  teams: [
    {
      name: "FRS",
      logo: Truck,
      plan: "Remessas",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Remessas",
      url: "/remessas",
      icon: Truck,
      isActive: true,
    },
    {
      title: "Mapa Dinâmico",
      url: "/mapa-controle",
      icon: MapIcon,
      isActive: true,
    },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  administration: [
    {
      name: "Usuários",
      url: "/usuarios",
      icon: Users,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAdministration administration={data.administration} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
