"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagsInput from "./tags-input";
import NumericInput from "./numeric-input";
import { toast } from "sonner";
import GeneratedIdeasSection from "./generated-ideas-section";
import { useUser } from "./context/UserContext";
import { useLoading } from "./context/LoadingContext";
import { useRouter } from "next/navigation";

import { useProjects } from "./context/ProjectContext";

export default function ProjectIdeaGenerator() {
  const { user } = useUser();
  const { refreshProjects, isPlanLimitFull } = useProjects();
  const { toggleLoading } = useLoading();
  const router = useRouter();

  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  const [targetSector, setTargetSector] = useState("");
  const [projectType, setProjectType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [duration, setDuration] = useState("");
  const [ideas, setIdeas] = useState<string[]>([
    // "AI-powered personal finance advisor using machine learning",
    // "Blockchain-based voting system for secure online elections",
    // "Augmented reality app for interactive museum tours",
    // "IoT smart garden system with automated watering and care",
    // "Decentralized social media platform with privacy focus",
  ]);
  const [pageLoading, setpageLoading] = useState(false);
  const [ideasGenerated, setIdeasGenerated] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateIdeas = async () => {
    if (
      !fieldOfInterest ||
      !stack.length ||
      !targetSector ||
      !projectType ||
      !complexity ||
      !duration
    ) {
      toast.error("Error", {
        description:
          "Please fill in all required fields before generating ideas.",
      });
      return;
    }
    console.log(
      fieldOfInterest,
      stack,
      targetSector,
      projectType,
      complexity,
      duration
    );

    setpageLoading(true);
    setIdeas([]);

    try {
      const response = await fetch(
        `/api/v1/ai/ideas?fieldOfInterest=${fieldOfInterest}&stack=${stack.join(
          ","
        )}&targetSector=${targetSector}&projectType=${projectType}&complexity=${complexity}&teamSize=${teamSize}&duration=${duration}`
      );

      if (!response.ok) {
        throw new Error("Failed to generate ideas");
      }

      const data = await response.json();
      setIdeas(data.ideas);
      setIdeasGenerated(true);
      toast.success("Success", {
        description: "Project ideas generated successfully!",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to generate ideas. Please try again.",
      });
      console.error("Error generating ideas:", error);
    } finally {
      setpageLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateIdeas();
  };

  const handleRefresh = async () => {
    await generateIdeas();
  };

  const handleIdeaSubmit = async (selectedIdea: string) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    toggleLoading(true);
    if (isPlanLimitFull === true) {
      toast("Action Required", {
        description:
          "You've reached your plan limit. Please upgrade to continue.",
        action: {
          label: "Buy Now",
          onClick: () => router.push("/pricing"),
        },
      });
      setIsSubmitting(false);
      toggleLoading(false);
      return;
    }
    toast("Idea Selected", {
      description: "You've chosen: " + selectedIdea,
    });
    try {
      console.log(
        fieldOfInterest,
        stack,
        targetSector,
        projectType,
        complexity,
        duration
      );
      if (!user) {
        throw new Error("User is not logged in");
      }

      const response = await fetch("/api/v1/database/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.$id,
          fieldOfInterest,
          stack,
          targetSector,
          projectType,
          complexity,
          teamSize,
          duration,
          projectName: selectedIdea,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch and store project");
      }

      const data = await response.json();
      console.log("New Project:", data.newProject);
      const onboardingResponse = await fetch(
        `/api/v1/database/onboarding?userId=${user.$id}`
      );

      if (!onboardingResponse.ok) {
        throw new Error("Failed to complete onboarding");
      }

      refreshProjects();
      toast.success("Project created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Please try again. Failed to fetch and store project:",
        error
      );
    } finally {
      setIsSubmitting(false);
      toggleLoading(false);
    }
  };

  return (
    <Card className="bg-transparent border-none w-full max-w-[1920px] rounded-lg lg:rounded-[20px]">
      <div className="flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label
                htmlFor="fieldOfInterest"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Field of Interest
              </Label>
              <Input
                id="fieldOfInterest"
                value={fieldOfInterest}
                onChange={(e) => setFieldOfInterest(e.target.value)}
                placeholder="Enter your field of interest"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter the main area or domain you&apos;re interested in working
                on.
              </p>
            </div>

            <div>
              <Label
                htmlFor="stack"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Tech Stack
              </Label>
              <TagsInput
                onChange={(tags) => setStack(tags.map((tag) => tag.label))}
                placeholder="Add technologies..."
                error={
                  stack.length === 0
                    ? "At least one technology is required"
                    : undefined
                }
              />
              <p className="text-sm text-muted-foreground mt-1">
                Add the technologies and tools you want to use in your project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label
                  htmlFor="targetSector"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Target Sector
                </Label>
                <Input
                  id="targetSector"
                  value={targetSector}
                  onChange={(e) => setTargetSector(e.target.value)}
                  placeholder="Enter target sector"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Specify the industry or sector your project will focus on.
                </p>
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="duration"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Duration
                </Label>
                <Select onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less than 1 day">
                      Less than 1 day
                    </SelectItem>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="2 days">2 days</SelectItem>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="4 days">4 days</SelectItem>
                    <SelectItem value="5 days">5 days</SelectItem>
                    <SelectItem value="6 days">6 days</SelectItem>
                    <SelectItem value="week +">Week +</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose how long you expect to spend on this project.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label
                  htmlFor="teamSize"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Team Size
                </Label>
                <NumericInput
                  min={1}
                  max={20}
                  defaultValue={1}
                  onChange={(value) => setTeamSize(value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Set the number of people who will work on this project.
                </p>
              </div>
              <div className="flex-1">
                <Label
                  htmlFor="complexity"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Complexity
                </Label>
                <Select onValueChange={setComplexity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the technical difficulty level of your project.
                </p>
              </div>
            </div>

            <div>
              <Label
                htmlFor="projectType"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Project Type
              </Label>
              <Input
                id="projectType"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="Enter project type"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Define the category or nature of your project (e.g., web app,
                mobile app, API).
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={pageLoading || ideasGenerated || disableButton}
                className="flex-1"
              >
                {pageLoading ? "Generating Ideas..." : "Generate Ideas"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={pageLoading || !ideasGenerated || disableButton}
                onClick={handleRefresh}
                className="px-3"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh Ideas</span>
              </Button>
            </div>
          </form>
        </div>

        <Separator orientation="vertical" className="hidden lg:block" />

        {/* Ideas Section */}
        <GeneratedIdeasSection
          ideas={ideas}
          onSelectIdea={handleIdeaSubmit}
          setDisableButton={setDisableButton}
          isSubmitting={isSubmitting}
        />
      </div>
    </Card>
  );
}
