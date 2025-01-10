"use client";

import React from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

import { useProjects } from "@/components/context/ProjectContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/components/context/UserContext";
import DashLoad from "@/components/dashboard/dash-load";

const DynamicFlowChart = dynamic(
  () => import("@/components/dashboard/FlowChart"),
  {
    ssr: false,
  }
);

const FlowPage = () => {
  const { currentProject } = useProjects();
  const { user } = useUser();

  if (!currentProject) {
    return <DashLoad soon={false} />;
  }
  if (user?.plan === "free") {
    return <DashLoad soon={false} pro={true} />;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{currentProject.name} Flow Chart</CardTitle>
          <CardDescription>User flow diagram for your project</CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicFlowChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowPage;
