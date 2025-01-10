import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { simplifyData } from "@/lib/functions/utils";
import { Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { useProjects } from "../context/ProjectContext";
import { useFlow } from "../context/FlowContext";

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { currentProject } = useProjects();
  const { projectFlows, saveFlow } = useFlow();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [regenerateInput, setRegenerateInput] = useState("");
  const [includeChanges, setIncludeChanges] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [flowInstance, setFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (currentProject && projectFlows[currentProject.$id]) {
      const flow = JSON.parse(projectFlows[currentProject.$id].flow);
      setNodes(flow.nodes);
      setEdges(flow.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [currentProject, projectFlows]);

  const handleSave = useCallback(async () => {
    if (!currentProject) return;
    setIsSaving(true);
    const flow = JSON.stringify({ nodes, edges });
    await saveFlow(currentProject.$id, flow);
    setIsSaving(false);
  }, [currentProject, nodes, edges, saveFlow]);

  const downloadImage = useCallback(async () => {
    if (!flowInstance) return;

    const flowElement = document.querySelector(".react-flow") as HTMLElement;
    if (!flowElement) return;

    try {
      // Get the bounds of all nodes
      const nodesBounds = getRectOfNodes(nodes);
      const padding = 50;

      // Calculate dimensions that encompass all nodes plus padding
      const width = nodesBounds.width + padding * 2;
      const height = nodesBounds.height + padding * 2;

      // Calculate the transform to center the content
      const transform = getTransformForBounds(
        nodesBounds,
        width,
        height,
        0.95,
        2
      );

      // Create a temporary container to render the flow
      const tempContainer = document.createElement("div");
      tempContainer.style.width = `${width}px`;
      tempContainer.style.height = `${height}px`;
      tempContainer.style.overflow = "visible";
      document.body.appendChild(tempContainer);

      // Clone the flow element and adjust its style
      const clonedFlow = flowElement.cloneNode(true) as HTMLElement;
      clonedFlow.style.width = "100%";
      clonedFlow.style.height = "100%";
      clonedFlow.style.transform = `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`;
      tempContainer.appendChild(clonedFlow);

      // Generate the image
      const dataUrl = await toPng(tempContainer, {
        backgroundColor: "#ffffff",
        width: width,
        height: height,
      });

      // Remove the temporary container
      document.body.removeChild(tempContainer);

      // Download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${currentProject?.name || "flow"}-diagram.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }, [flowInstance, nodes, currentProject?.name]);

  const downloadJson = useCallback(() => {
    const flow = { nodes, edges };
    const blob = new Blob([JSON.stringify(flow, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentProject?.name || "flow"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [nodes, edges, currentProject?.name]);

  const handleGenerate = useCallback(
    async (customInput?: string) => {
      if (!currentProject || isGenerating) return;

      setIsGenerating(true);

      const simplifiedData = await simplifyData(
        currentProject.tasks,
        currentProject.file_structure,
        currentProject.data
      );

      if (!simplifiedData) {
        console.error("Failed to simplify project data");
        setIsGenerating(false);
        setIsDialogOpen(false);
        return;
      }

      try {
        const response = await fetch("/api/v1/ai/flow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: currentProject.$id,
            projectData: simplifiedData,
            fieldOfInterest: currentProject.fieldOfInterest,
            stack: currentProject.stack.join(","),
            targetSector: currentProject.targetSector,
            projectType: currentProject.projectType,
            complexity: currentProject.complexity,
            teamSize: currentProject.teamSize,
            duration: currentProject.duration,
            projectName: currentProject.name,
            regenerateInput: customInput,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate flow");
        }

        const generatedFlow = await response.json();
        const parsedFlow = JSON.parse(generatedFlow.flow);
        setNodes(parsedFlow.nodes);
        setEdges(parsedFlow.edges);
        await saveFlow(currentProject.$id, JSON.stringify(parsedFlow));
      } catch (error) {
        console.error("Error generating flow:", error);
      } finally {
        setIsGenerating(false);
        setIsDialogOpen(false);
        setRegenerateInput("");
        setIncludeChanges(false);
      }
    },
    [currentProject, saveFlow]
  );

  if (!currentProject) return <div>No project selected</div>;

  const hasFlow = projectFlows[currentProject.$id] !== undefined;

  if (!hasFlow) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <p className="mb-4">No flow chart available for this project.</p>
        <Button onClick={() => handleGenerate()} disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isGenerating ? "Generating..." : "Generate Flow"}
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setFlowInstance}
        fitView
      >
        <Background />
        <Controls />
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSaving ? "Saving..." : "Save Flow"}
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Regenerate Flow</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Regenerate Flow</DialogTitle>
                <DialogDescription>
                  Optionally provide specific changes you want in the flow
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-changes"
                    checked={includeChanges}
                    onCheckedChange={(checked) =>
                      setIncludeChanges(checked as boolean)
                    }
                  />
                  <Label htmlFor="include-changes">
                    Include specific changes
                  </Label>
                </div>
                {includeChanges && (
                  <Textarea
                    value={regenerateInput}
                    onChange={(e) => setRegenerateInput(e.target.value)}
                    placeholder="Enter changes you want in the flow (max 200 words)..."
                    className="min-h-[100px]"
                    maxLength={200 * 5}
                  />
                )}
                <Button
                  onClick={() =>
                    handleGenerate(includeChanges ? regenerateInput : undefined)
                  }
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isGenerating ? "Regenerating..." : "Regenerate Flow"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={downloadImage} disabled>
                Download as Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={downloadJson}>
                Download as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ReactFlow>
    </div>
  );
}
