import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const schema = {
  description: "List of project ideas",
  type: SchemaType.OBJECT,
  properties: {
    ideas: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "A single project idea as a string",
        nullable: false,
      },
    },
  },
  required: ["ideas"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export async function GET(request: NextRequest) {
  const fieldOfInterest = request.nextUrl.searchParams.get("fieldOfInterest");
  const stack = request.nextUrl.searchParams.get("stack");
  const targetSector = request.nextUrl.searchParams.get("targetSector");
  const projectType = request.nextUrl.searchParams.get("projectType");
  const complexity = request.nextUrl.searchParams.get("complexity");
  const teamSize = request.nextUrl.searchParams.get("teamSize");
  const duration = request.nextUrl.searchParams.get("duration");

  if (
    !fieldOfInterest ||
    !stack ||
    !targetSector ||
    !projectType ||
    !complexity ||
    !teamSize ||
    !duration
  ) {
    return NextResponse.json(
      { message: "All parameters are required" },
      { status: 400 }
    );
  }

  const prompt = `
  Hi! I’m looking to work on a project that aligns with my interests and skills. My preferences are as follows: the field of interest is ${fieldOfInterest}, the tech stack I want to use is ${stack}, the target sector is ${targetSector}, and I’m interested in a ${projectType} project. I’d like the project to match a ${complexity} level, be suitable for a team size of ${teamSize}, and fit within a duration of ${duration}. To ensure maximum originality, suggest ideas that explore unconventional use cases, unique technology pairings, or niche problems within the specified parameters. Provide 5 ideas, each as a concise one-sentence description of 7–8 words. Ensure every suggestion is fresh, distinct, and not similar to previous ones, so I can consistently explore new directions.`;

  try {
    const result = await model.generateContent(prompt);
    const ideas = result.response.text();

    return NextResponse.json(JSON.parse(ideas));
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
