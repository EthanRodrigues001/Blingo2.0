"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TagsInput from "./tags-input";
import NumericInput from "./numeric-input";
import { RefreshCw } from "lucide-react";

export default function ProjectIdeaGenerator() {
  const { toast } = useToast();
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  const [targetSector, setTargetSector] = useState("");
  const [projectType, setProjectType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [duration, setDuration] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [ideasGenerated, setIdeasGenerated] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

  const generateIdeas = async () => {
    if (
      !fieldOfInterest ||
      !stack.length ||
      !targetSector ||
      !projectType ||
      !complexity ||
      !duration
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Please fill in all required fields before generating ideas.",
      });
      return;
    }

    setLoading(true);
    setIdeas([]);

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const simulatedIdeas = [
        "AI-powered personal finance advisor using machine learning",
        "Blockchain-based voting system for secure online elections",
        "Augmented reality app for interactive museum tours",
        "IoT smart garden system with automated watering and care",
        "Decentralized social media platform with privacy focus",
      ];
      setIdeas(simulatedIdeas);
      setIdeasGenerated(true);
      toast({
        title: "Success",
        description: "Project ideas generated successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate ideas. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateIdeas();
  };

  const handleRefresh = async () => {
    await generateIdeas();
  };

  const handleIdeaClick = (idea: string) => {
    console.log("Clicked idea:", idea);
  };

  const handleIdeaSubmit = () => {
    if (selectedIdea) {
      console.log("Selected idea:", selectedIdea);
      // Here you can add logic to handle the selected idea (e.g., navigate to a new page, open a modal, etc.)
      toast({
        title: "Idea Selected",
        description: "You've chosen: " + selectedIdea,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an idea before submitting.",
      });
    }
  };

  return (
    <Card className="w-full max-w-[1920px] rounded-lg lg:rounded-[20px]">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-left">
            Project Idea Generator
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 mb-6 text-left"
          >
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
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Enter the main area or domain you're interested in working on.
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
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
                  required
                />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
                <Select onValueChange={setDuration} required>
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
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Choose how long you expect to spend on this project.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="teamSize">Team Size</Label>
                <NumericInput
                  min={1}
                  max={20}
                  defaultValue={1}
                  onChange={(value) => setTeamSize(value)}
                />
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
                <Select onValueChange={setComplexity} required>
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
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Define the category or nature of your project (e.g., web app,
                mobile app, API).
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading || ideasGenerated}
                className="flex-1"
              >
                {loading ? "Generating Ideas..." : "Generate Ideas"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading || !ideasGenerated}
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

        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-left">
            Generated Ideas
          </h3>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex-grow overflow-auto">
            {ideas.length > 0 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleIdeaSubmit();
                }}
              >
                <RadioGroup
                  value={selectedIdea || ""}
                  onValueChange={setSelectedIdea}
                  className="space-y-4"
                >
                  {ideas.map((idea, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={idea} id={`idea-${index}`} />
                      <Label
                        htmlFor={`idea-${index}`}
                        className="text-sm sm:text-base cursor-pointer"
                      >
                        {idea}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button type="submit" className="mt-4 w-full">
                  Select Idea
                </Button>
              </form>
            ) : (
              <p className="text-muted-foreground text-left text-sm sm:text-base">
                No ideas generated yet. Fill out the form and click "Generate
                Ideas" to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
