"use client";

import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectContext";

interface Step {
  StepName: string;
  Action: string;
  HowYourAppHelps: string;
  Outcome: string;
}
//   "Introduction": {
//     "Overview": "This project aims to build a basic AI-powered course recommendation engine for students.  It uses student data (simulated for this 2-day project) to suggest relevant AI courses.",
//     "ExecutionPlan": "We will focus on a simplified version using React for the frontend and a basic in-memory data store for course information. The backend will be minimal, providing course data to the React frontend.",
//     "FileStructure": "The project will have a simple structure. The \\"src\\" directory contains the frontend (React) code and placeholder backend code.  \\"src/frontend\\" houses the main application components, while \\"src/backend\\" includes a simple data store and API routes (not implemented fully in this limited time)."
//   },
//   "Step-by-StepGuide": [{
//     "StepName": "Setup Project",
//     "Action": "Create a new React project, install necessary packages, and set up basic project structure.",
//     "HowYourAppHelps": "The app provides a starting point for development by creating the necessary directories and files. This guides the project structure and reduces boilerplate.",
//     "Outcome": "A functional React project scaffold"
//   }, {
//     "StepName": "Design UI",
//     "Action": "Design the basic UI for the course recommendation engine using Tailwind CSS. Include components for displaying courses and filtering.",
//     "HowYourAppHelps": "Tailwind CSS speeds up development, and React components allow efficient modular design. The app provides the structure to create this UI easily.",
//     "Outcome": "A functional UI for viewing courses and filters"
//   }, {
//     "StepName": "Course Data",
//     "Action": "Create simple course data in a local store (JSON in-memory). This will be hardcoded for simplicity.",
//     "HowYourAppHelps": "The app uses a simple data structure for storing courses, thus making the development process much simpler and faster. ",
//     "Outcome": "Sample course data ready for display"
//   }, {
//     "StepName": "Implement Filtering",
//     "Action": "Add basic filtering capabilities based on course topics (hardcoded for now). ",
//     "HowYourAppHelps": "The app's component structure simplifies adding filtering logic to the existing UI components. ",
//     "Outcome": "UI with basic course filtering"
//   }],
//   "Customization": "Add more sophisticated AI algorithms for better recommendations, integrate a real database (e.g., MongoDB), implement user accounts, and add features such as ratings and reviews.",
//   "UseCases": "Students can easily find relevant AI courses, and educators can use the platform to showcase their courses effectively. It can be used in university settings or by educational organizations."
// }`;

const Data = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { currentProject } = useProjects();
  const [data, setData] = useState(
    currentProject?.data ? JSON.parse(currentProject.data) : null
  );
  useEffect(() => {
    setData(currentProject?.data ? JSON.parse(currentProject.data) : null);
  }, [currentProject?.data]);

  //   const data = JSON.parse(jsonData);

  const renderContent = () => (
    <div className="space-y-6">
      <section>
        <h1 className="scroll-m-20 mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Introduction
        </h1>
        <div className="space-y-2">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            <strong>Overview:</strong> {data.Introduction.Overview}
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            <strong>Execution Plan:</strong> {data.Introduction.ExecutionPlan}
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            <strong>File Structure:</strong> {data.Introduction.FileStructure}
          </p>
        </div>
      </section>

      <section>
        <h2 className="scroll-m-20 mb-2 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Step-by-Step Guide
        </h2>
        {data.StepByStepGuide.map((step: Step, index: number) => (
          <div
            key={index}
            className="mb-4 p-4 bg-neutral-900/[0.50] border border-white/[0.2] rounded-xl"
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {step.StepName}
            </h4>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              <p>
                <strong className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  Action:
                </strong>{" "}
                {step.Action}
              </p>
              <p>
                <strong className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  How Your App Helps:
                </strong>{" "}
                {step.HowYourAppHelps}
              </p>
              <p>
                <strong className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  Outcome:
                </strong>{" "}
                {step.Outcome}
              </p>
            </blockquote>
          </div>
        ))}
      </section>

      <section>
        <h2 className="scroll-m-20 mb-2 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Customization
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {data.Customization}
        </p>
      </section>

      <section>
        <h2 className="scroll-m-20 mb-2 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Use Cases
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">{data.UseCases}</p>
      </section>
    </div>
  );

  return (
    <div className="relative h-full">
      <ScrollArea className="h-full">
        <div className="p-4">{renderContent()}</div>
      </ScrollArea>
      <button
        className="absolute top-2 right-2 p-2 bg-neutral-900/[0.15] rounded-sm shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300"
        onClick={() => setIsFullScreen(true)}
      >
        <Maximize2 className="w-5 h-5" />
      </button>
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Project Data</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="p-4">{renderContent()}</div>
          </ScrollArea>
          {/* <button
            className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
            onClick={() => setIsFullScreen(false)}
          >
            <X className="w-5 h-5" />
          </button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Data;
