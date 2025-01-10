"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { simplifyData } from "@/lib/functions/utils";
import DashLoad from "@/components/dashboard/dash-load";
import { useDocumentation } from "@/components/context/DocumentationContext";
import { useProjects } from "@/components/context/ProjectContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, RefreshCw } from "lucide-react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MDXComponent } from "@/components/dashboard/mdx-components";

export default function DocsPage() {
  const { currentProject } = useProjects();
  const { allDocumentation, saveDocumentation } = useDocumentation();
  const [loading, setLoading] = useState(false);
  const [regenerateInput, setRegenerateInput] = useState("");
  const [serializedContent, setSerializedContent] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [includeChanges, setIncludeChanges] = useState(false);

  const currentDocumentation =
    currentProject && allDocumentation[currentProject.$id]
      ? allDocumentation[currentProject.$id]
      : null;

  useEffect(() => {
    const serializeContent = async () => {
      if (currentDocumentation?.markdown) {
        const serialized = await serialize(currentDocumentation.markdown, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            format: "mdx",
          },
        });
        setSerializedContent(serialized);
      }
    };

    serializeContent();
  }, [currentDocumentation?.markdown]);

  const generateDocumentation = async (regenerateInput = "") => {
    if (!currentProject) return;

    setLoading(true);
    try {
      const simplifiedData = await simplifyData(
        currentProject.tasks,
        currentProject.file_structure,
        currentProject.data
      );

      if (!simplifiedData) {
        throw new Error("Failed to simplify project data");
      }

      const response = await fetch("/api/v1/ai/docs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectData: simplifiedData,
          fieldOfInterest: currentProject.fieldOfInterest,
          stack: currentProject.stack.join(","),
          targetSector: currentProject.targetSector,
          projectType: currentProject.projectType,
          complexity: currentProject.complexity,
          teamSize: currentProject.teamSize,
          duration: currentProject.duration,
          projectName: currentProject.name,
          regenerateInput,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        throw new Error("Received non-JSON response from server");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch documentation");
      }

      const data = await response.json();
      await saveDocumentation(currentProject.$id, data.data, data.markdown);
      toast("Documentation generated successfully");
    } catch (error) {
      console.error("Error generating documentation:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast("Failed to generate documentation", { description: errorMessage });
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleRegenerate = async () => {
    await generateDocumentation(includeChanges ? regenerateInput : "");
    setRegenerateInput("");
    setIncludeChanges(false);
  };

  const handleDownload = () => {
    if (!currentDocumentation) return;
    const blob = new Blob([currentDocumentation.markdown], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return <DashLoad soon={false} />;

  if (!currentProject) return <DashLoad soon={false} />;

  if (!currentDocumentation) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>{currentProject.name} Documentation</CardTitle>
            <CardDescription>
              Generate documentation for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => generateDocumentation()}>
              Generate Documentation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>{currentProject.name} Documentation</CardTitle>
            <CardDescription>Project documentation and README</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Regenerate Documentation</DialogTitle>
                  <DialogDescription>
                    Optionally provide specific changes you want in the
                    documentation
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
                      placeholder="Enter changes you want in the documentation (max 200 words)..."
                      className="min-h-[100px]"
                      maxLength={200 * 5} // Approximate 200 words limit
                    />
                  )}
                  <Button onClick={handleRegenerate} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Documentation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-invert prose-pre:bg-black prose-pre:border max-w-none">
                {serializedContent && (
                  <MDXRemote {...serializedContent} components={MDXComponent} />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="markdown">
          <Card>
            <CardHeader>
              <CardTitle>README.md</CardTitle>
              <CardDescription>Raw markdown content</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code>{currentDocumentation.markdown}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="json">
          <Card>
            <CardHeader>
              <CardTitle>JSON Documentation</CardTitle>
              <CardDescription>
                Full documentation data structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto whitespace-pre-wrap break-words">
                <code>
                  {JSON.stringify(currentDocumentation.data, null, 2)}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
