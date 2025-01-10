"use client";

import { useUser } from "@/components/context/UserContext";
// import { useUser } from "@/components/context/UserContext";
import { AppSidebar } from "@/components/main/app-sidebar";
import { UserProfileDrawer } from "@/components/main/sidebar/UserProfileDrawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const { user, loading } = useUser();

  // if (loading || !user) return <div>Loading user data...</div>;

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
