import { createOrUpdateFlow, getAllFlows } from "@/actions/flow";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const flows = await getAllFlows();
    return NextResponse.json(flows);
  } catch (error) {
    console.error("Error fetching flows:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, flow } = await request.json();

    if (!projectId || !flow) {
      return NextResponse.json(
        { message: "Project ID and flow data are required" },
        { status: 400 }
      );
    }

    const result = await createOrUpdateFlow(projectId, flow);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error handling flow:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
