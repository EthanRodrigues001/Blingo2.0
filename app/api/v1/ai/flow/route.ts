import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { createOrUpdateFlow } from "@/actions/flow";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    nodes: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          type: { type: SchemaType.STRING },
          data: {
            type: SchemaType.OBJECT,
            properties: {
              label: { type: SchemaType.STRING },
            },
            required: ["label"],
          },
          position: {
            type: SchemaType.OBJECT,
            properties: {
              x: { type: SchemaType.NUMBER },
              y: { type: SchemaType.NUMBER },
            },
            required: ["x", "y"],
          },
        },
        required: ["id", "type", "data", "position"],
      },
    },
    edges: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          source: { type: SchemaType.STRING },
          target: { type: SchemaType.STRING },
          type: { type: SchemaType.STRING },
          label: { type: SchemaType.STRING },
        },
        required: ["id", "source", "target"],
      },
    },
  },
  required: ["nodes", "edges"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export async function POST(request: NextRequest) {
  try {
    const {
      projectId,
      projectData,
      fieldOfInterest,
      stack,
      targetSector,
      projectType,
      complexity,
      teamSize,
      duration,
      projectName,
      regenerateInput,
    } = await request.json();

    if (
      !projectId ||
      !fieldOfInterest ||
      !stack ||
      !targetSector ||
      !projectType ||
      !complexity ||
      !teamSize ||
      !duration ||
      !projectName ||
      !projectData
    ) {
      return NextResponse.json(
        { message: "All parameters are required" },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error(
        "NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables"
      );
      return NextResponse.json(
        { message: "API key configuration error" },
        { status: 500 }
      );
    }

    const prompt = `
      Generate a user flow diagram for the following project:

      Project Name: ${projectName}
      Field of Interest: ${fieldOfInterest}
      Tech Stack: ${stack}
      Target Sector: ${targetSector}
      Project Type: ${projectType}
      Complexity: ${complexity}
      Team Size: ${teamSize}
      Duration: ${duration}

      Project Data:
      ${projectData}

      ${regenerateInput ? `Additional requirements: ${regenerateInput}` : ""}

      Create a flow diagram as a JSON object compatible with ReactFlow, including nodes and edges.
      Include a "Start" node and an "End" node in the flow.
      Ensure the nodes are properly connected and represent the main steps of the user flow.
      The flow should accurately represent the user journey through the application based on the project details provided.
      The folwchart has to be properly connected.
    `;

    const result = await model.generateContent(prompt);
    const generatedFlow = result.response.text();
    const parsedFlow = JSON.parse(generatedFlow);

    // Save or update the flow in the database
    const flow;

    flow = await createOrUpdateFlow(projectId, JSON.stringify(parsedFlow));

    return NextResponse.json(flow);
  } catch (error) {
    console.error("Error generating flow:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
