"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useProjects } from "./ProjectContext";
import { Flow } from "@/actions/flow";

interface FlowContextType {
  projectFlows: Record<string, Flow>;
  saveFlow: (projectId: string, flow: string) => Promise<void>;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projectFlows, setProjectFlows] = useState<Record<string, Flow>>({});
  const { projects } = useProjects();

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const response = await fetch("/api/v1/flow");
        if (!response.ok) throw new Error("Failed to fetch flows");
        const flows: Flow[] = await response.json();

        // Filter flows to only include those for existing projects
        const projectIds = new Set(projects.map((project) => project.$id));
        const filteredFlows = flows.filter((flow) =>
          projectIds.has(flow.projectId)
        );

        setProjectFlows(
          filteredFlows.reduce((acc, flow) => {
            acc[flow.projectId] = flow;
            return acc;
          }, {} as Record<string, Flow>)
        );
      } catch (error) {
        console.error("Error fetching flows:", error);
      }
    };
    fetchFlows();
  }, [projects]);

  const saveFlow = async (projectId: string, flow: string) => {
    try {
      const response = await fetch("/api/v1/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, flow }),
      });

      if (!response.ok) throw new Error("Failed to save flow");
      const savedFlow: Flow = await response.json();
      setProjectFlows((prev) => ({ ...prev, [projectId]: savedFlow }));
    } catch (error) {
      console.error("Error saving flow:", error);
    }
  };

  return (
    <FlowContext.Provider value={{ projectFlows, saveFlow }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};
