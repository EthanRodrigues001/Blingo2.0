import { updateProjectTasks } from "@/actions/projects";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { projectId, tasks } = await request.json();

    if (!projectId || !tasks) {
      return NextResponse.json(
        { message: "Project ID and tasks are required" },
        { status: 400 }
      );
    }

    const updatedProject = await updateProjectTasks(projectId, tasks);

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (error) {
    console.error("Error updating project tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
