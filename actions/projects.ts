import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import {
  fetchProjects,
  convertTasksToString,
  convertFileStructureToString,
} from "@/lib/functions/utils";

export const getUserProjects = async (userId: string) => {
  console.log("getUserProjects called with userId:", userId);
  try {
    const { database } = await createAdminClient();

    const projects = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_PROJECTS!
    );

    // Log the raw project data
    // console.log("Raw project data:", projects.documents);

    // If no projects found, return an empty array
    if (!projects.documents || projects.documents.length === 0) {
      return [];
    }
    // Filter projects where ownerId.id matches the userId
    const filteredProjects = projects.documents.filter(
      (project) => project.ownerId && project.ownerId?.$id === userId
    );

    // // Log filtered project data
    // console.log("Filtered projects:", filteredProjects);
    // Convert the projects to plain objects
    const plainProjects = filteredProjects.map((project) => ({
      $id: project.$id,
      name: project.name,
      fieldOfInterest: project.fieldOfInterest,
      stack: project.stack,
      targetSector: project.targetSector,
      projectType: project.projectType,
      complexity: project.complexity,
      teamSize: project.teamSize,
      duration: project.duration,
      createdAt: project.$createdAt,
      updatedAt: project.$updatedAt,
      ownerId: project.ownerId,
      collaborators: project.collaborators,
      flowchartFeature: project.flowchartFeature,
      file_structure: project.file_structure,
      data: project.data,
      tasks: project.tasks,
      description: project.description,
    }));

    return plainProjects;
  } catch (error) {
    console.error("Error fetching projects for user:", error);
    return [];
  }
};
export const updateProjectTasks = async (
  projectId: string,
  tasks: string[]
) => {
  try {
    const { database } = await createAdminClient();

    const updatedProject = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_PROJECTS!,
      projectId,
      { tasks }
    );

    return updatedProject;
  } catch (error) {
    console.error("Error updating project tasks:", error);
    throw error;
  }
};

interface FetchAndStoreProjectParams {
  userId: string;
  fieldOfInterest: string;
  stack: string[];
  targetSector: string;
  projectType: string;
  complexity: string;
  teamSize: number;
  duration: string;
  projectName: string;
}

export async function fetchAndStoreProject(params: FetchAndStoreProjectParams) {
  const {
    userId,
    fieldOfInterest,
    stack,
    targetSector,
    projectType,
    complexity,
    teamSize,
    duration,
    projectName,
  } = params;

  try {
    // Fetch project data
    const projectData = await fetchProjects({
      fieldOfInterest,
      stack,
      targetSector,
      projectType,
      complexity,
      teamSize,
      duration,
      projectName,
    });

    // Convert tasks and file structure to strings
    const tasksString = convertTasksToString(projectData.tasks);
    const fileStructureString = convertFileStructureToString(projectData.files);

    // Create project in the database
    const { database } = await createAdminClient();
    const newProject = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_PROJECTS!,
      ID.unique(),
      {
        ownerId: userId,
        name: projectData.title,
        fieldOfInterest,
        stack,
        targetSector,
        projectType,
        complexity,
        teamSize,
        duration,
        file_structure: fileStructureString,
        data: projectData.data,
        tasks: tasksString,
        description: projectData.shortDescription,
      }
    );

    if (!newProject) throw new Error("Error creating project");

    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    console.error("Error fetching and storing project:", error);
    throw error;
  }
}
