import { NextResponse, NextRequest } from "next/server";
import { fetchAndStoreProject } from "@/actions/projects";

export async function POST(request: NextRequest) {
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
  } = await request.json();

  if (
    !userId ||
    !fieldOfInterest ||
    !stack ||
    !targetSector ||
    !projectType ||
    !complexity ||
    !teamSize ||
    !duration ||
    !projectName
  ) {
    return NextResponse.json(
      { message: "All parameters are required" },
      { status: 400 }
    );
  }
  console.log(
    userId,
    fieldOfInterest,
    stack,
    targetSector,
    projectType,
    complexity,
    teamSize,
    duration,
    projectName
  );

  try {
    const newProject = await fetchAndStoreProject({
      userId,
      fieldOfInterest,
      stack,
      targetSector,
      projectType,
      complexity,
      teamSize,
      duration,
      projectName,
    });

    return NextResponse.json({ newProject }, { status: 200 });
  } catch (error) {
    console.error("Error fetching and storing project:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
