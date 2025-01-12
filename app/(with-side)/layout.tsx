"use client";

import { useProjects } from "@/components/context/ProjectContext";
// import { useUser } from "@/components/context/UserContext";
import { AppSidebar } from "@/components/main/app-sidebar";
import Loading from "@/components/main/Loading";
import { UserProfileDrawer } from "@/components/main/sidebar/UserProfileDrawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { projects, loading } = useProjects();

  if (loading) return <Loading />;
  if (projects.length === 0) {
    router.push("/getting-started");
  }

  return (
    <>
      <UserProfileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="bg-[#09090B]">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4" />
              </div>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => setIsDrawerOpen(true)}
              >
                <UserRoundPen />
              </Button>
            </header>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
