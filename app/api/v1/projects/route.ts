import { getUserProjects } from "@/actions/projects";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "All parameters are required" },
      { status: 400 }
    );
  }

  try {
    const projects = await getUserProjects(userId);

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
