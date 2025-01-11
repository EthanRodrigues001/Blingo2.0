import { GoogleGenerativeAI } from "@google/generative-ai";

interface FetchProjectsParams {
  fieldOfInterest: string;
  stack: string[];
  targetSector: string;
  projectType: string;
  complexity: string;
  teamSize: number;
  duration: string;
  projectName: string;
}

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

export function convertTasksToString(
  tasks: {
    complexity: number;
    id: string;
    task_done: boolean;
    task_name: string;
  }[]
): string[] {
  return tasks.map((task) => JSON.stringify(task));
}

export function convertTasksFromString(
  tasksString: string[]
): { complexity: number; id: string; task_done: boolean; task_name: string }[] {
  return tasksString.map((task) => JSON.parse(task));
}

export function convertFileStructureToString(
  fileStructure: {
    id: string;
    isSelectable: boolean;
    name: string;
    children?: Array<{ id: string; isSelectable: boolean; name: string }>;
  }[]
): string {
  return JSON.stringify(fileStructure);
}

export function convertStringToFileStructure(fileStructureString: string): {
  id: string;
  isSelectable: boolean;
  name: string;
  children?: Array<{ id: string; isSelectable: boolean; name: string }>;
}[] {
  return JSON.parse(fileStructureString);
}

export async function fetchProjects(
  params: FetchProjectsParams
): Promise<ApiResponse> {
  const {
    fieldOfInterest,
    stack,
    targetSector,
    projectType,
    complexity,
    teamSize,
    duration,
    projectName,
  } = params;

  const url = new URL(
    "/api/v1/ai/projects",
    `${process.env.NEXT_PUBLIC_PAGE_URL}`
  );
  url.searchParams.append("fieldOfInterest", fieldOfInterest);
  url.searchParams.append("stack", stack.join(","));
  url.searchParams.append("targetSector", targetSector);
  url.searchParams.append("projectType", projectType);
  url.searchParams.append("complexity", complexity);
  url.searchParams.append("teamSize", teamSize.toString());
  url.searchParams.append("duration", duration);
  url.searchParams.append("projectName", projectName);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();
  console.log("Data:", data);
  return data;
}

// Utility function to handle photo URLs securely
export function getSecurePhotoUrl(fileId: string | null) {
  if (!fileId) return null;

  // Instead of storing/exposing the full Appwrite URL, we'll create our own API endpoint
  return `/api/v1/photo/${fileId}`;
}

export async function simplifyData(
  tasks: string[],
  fileStructure: string,
  data: string
): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in the environment variables");
    return null;
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // Parse the JSON strings
  const parsedFileStructure = JSON.parse(fileStructure);
  const parsedData = JSON.parse(data);
  const parsedTasks = tasks.map((task) => JSON.parse(task));

  // Construct the prompt
  const prompt = `
    Simplify the following project data:

    File Structure:
    ${JSON.stringify(parsedFileStructure, null, 2)}

    Data:
    ${JSON.stringify(parsedData, null, 2)}

    Tasks:
    ${JSON.stringify(parsedTasks, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const simplifiedData = result.response.text();

    return simplifiedData;
  } catch (error) {
    console.error("Error generating ideas:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}
