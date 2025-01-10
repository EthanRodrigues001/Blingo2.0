"use client";

import { useState } from "react";
import { fetchProjects } from "@/lib/functions/utils";

interface ApiResponse {
  data: string;
  files: Array<{
    id: string;
    isSelectable: boolean;
    name: string;
    children?: Array<{ id: string; isSelectable: boolean; name: string }>;
  }>;
  tasks: Array<{
    complexity: number;
    id: string;
    task_done: boolean;
    task_name: string;
  }>;
  title: string;
  shortDescription: string;
}

export default function TestFetchProjectsPage() {
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [stack, setStack] = useState<string[]>([]);
  const [targetSector, setTargetSector] = useState("");
  const [projectType, setProjectType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [duration, setDuration] = useState("");
  const [projectName, setProjectName] = useState("");

  const [project, setProject] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const params = {
        fieldOfInterest: encodeURIComponent(fieldOfInterest),
        stack: stack.map((s) => encodeURIComponent(s)),
        targetSector: encodeURIComponent(targetSector),
        projectType: encodeURIComponent(projectType),
        complexity: encodeURIComponent(complexity),
        teamSize,
        duration: encodeURIComponent(duration),
        projectName: encodeURIComponent(projectName),
      };
      const data = await fetchProjects(params);
      setProject(data as ApiResponse); // Ensure the response matches the ApiResponse type
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Test Fetch Projects API</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field of Interest
          </label>
          <input
            type="text"
            value={fieldOfInterest}
            onChange={(e) => setFieldOfInterest(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stack
          </label>
          <input
            type="text"
            value={stack.join(", ")}
            onChange={(e) =>
              setStack(e.target.value.split(",").map((s) => s.trim()))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* Additional Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Sector
          </label>
          <input
            type="text"
            value={targetSector}
            onChange={(e) => setTargetSector(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Type
          </label>
          <input
            type="text"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Complexity
          </label>
          <input
            type="text"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Size
          </label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
        >
          Fetch Projects
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}

      {/* Display Projects */}
      {project && (
        <div className="mt-8 p-4 border border-gray-300 rounded-md max-h-96 overflow-y-auto">
          <h2 className="text-2xl font-semibold">{project.title}</h2>
          <p className="mt-2">{project.shortDescription}</p>
          <h3 className="mt-4 text-xl font-semibold">Data</h3>
          <p>{project.data}</p>
          <h3 className="mt-4 text-xl font-semibold">Files</h3>
          <ul className="list-disc list-inside">
            {JSON.stringify(project.files)}
          </ul>
          <h3 className="mt-4 text-xl font-semibold">Tasks</h3>
          <ul className="list-disc list-inside">
            {JSON.stringify(project.tasks.map((task) => task))}
          </ul>
        </div>
      )}
    </div>
  );
}
