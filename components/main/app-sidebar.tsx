"use client";

import * as React from "react";
import {
  BookOpen,
  PieChart,
  SquareTerminal,
  MoreHorizontal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ProjectSwitcher } from "./sidebar/project-switcher";
import { NavMain } from "./sidebar/nav-main";
import { NavUser } from "./sidebar/nav-user";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { useProjects } from "../context/ProjectContext";
import { useUser } from "../context/UserContext";
import { Skeleton } from "../ui/skeleton";

const data = {
  navMain: [
    {
      title: "Docs",
      url: "/dashboard/docs",
      icon: BookOpen,
    },
    {
      title: "User Flow",
      url: "/dashboard/flow",
      icon: PieChart,
    },
    {
      title: "More",
      url: "/dashboard/more",
      icon: MoreHorizontal,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { planLimit, projects, loading } = useProjects();
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem key="Playground">
              <SidebarMenuButton
                asChild
                className={"bg-accent text-accent-foreground"}
              >
                <Link href="/dashboard" className="flex items-center">
                  <SquareTerminal className="mr-2 h-4 w-4" />
                  <span>Playground</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="px-3 py-2">
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-2 w-full mb-2" />
            </div>
          </div>
        ) : (
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="px-3 py-2">
              <Badge variant="secondary" className="mb-2">
                Plan: {user?.plan}
              </Badge>
              <div className="mb-2 text-xs text-muted-foreground">
                Projects: {projects.length}/{planLimit}
              </div>
              <Progress
                value={(projects.length / planLimit) * 100}
                className="h-2 mb-2"
              />
            </div>
          </div>
        )}

        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
