import {
  createDocumentation,
  fetchAllDocumentation,
  updateDocumentation,
} from "@/actions/docs";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const docs = await fetchAllDocumentation();
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Error fetching documentation:", error);
    return NextResponse.json(
      { error: "Failed to fetch documentation" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, data, markdown } = await request.json();
    const doc = await createDocumentation(projectId, data, markdown);
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error creating documentation:", error);
    return NextResponse.json(
      { error: "Failed to create documentation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { docId, data, markdown } = await request.json();
    const doc = await updateDocumentation(docId, data, markdown);
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error updating documentation:", error);
    return NextResponse.json(
      { error: "Failed to update documentation" },
      { status: 500 }
    );
  }
}
