import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const schema = {
  description: "Comprehensive project documentation structure",
  type: SchemaType.OBJECT,
  properties: {
    data: {
      type: SchemaType.OBJECT,
      description: "Project documentation sections",
      properties: {
        Title: {
          type: SchemaType.OBJECT,
          properties: {
            ProjectName: { type: SchemaType.STRING, nullable: false },
            Version: { type: SchemaType.STRING, nullable: false },
            Tagline: { type: SchemaType.STRING, nullable: true },
          },
          required: ["ProjectName", "Version"], // Removed "Date"
        },
        Introduction: {
          type: SchemaType.OBJECT,
          properties: {
            Overview: { type: SchemaType.STRING, nullable: false },
            Purpose: { type: SchemaType.STRING, nullable: false },
            Goals: { type: SchemaType.STRING, nullable: false },
            TargetAudience: { type: SchemaType.STRING, nullable: false },
            TechStack: { type: SchemaType.STRING, nullable: false },
          },
          required: [
            "Overview",
            "Purpose",
            "Goals",
            "TargetAudience",
            "TechStack",
          ],
        },
        Features: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
            description: "A single feature",
            nullable: false,
          },
        },
        InstallationandSetup: {
          type: SchemaType.OBJECT,
          properties: {
            Prerequisites: { type: SchemaType.STRING, nullable: false },
            CloneRepository: { type: SchemaType.STRING, nullable: false },
            InstallDependencies: {
              type: SchemaType.STRING,
              nullable: false,
            },
            EnvironmentSetup: { type: SchemaType.STRING, nullable: false },
            RuntheApplication: { type: SchemaType.STRING, nullable: false },
          },
          required: [
            "Prerequisites",
            "CloneRepository",
            "InstallDependencies",
            "EnvironmentSetup",
            "RuntheApplication",
          ],
        },
        Usage: {
          type: SchemaType.OBJECT,
          properties: {
            HowtoUse: { type: SchemaType.STRING, nullable: false },
            Examples: { type: SchemaType.STRING, nullable: true },
          },
          required: ["HowtoUse"], // Fixed naming issue
        },
        Architecture: {
          type: SchemaType.OBJECT,
          properties: {
            SystemOverview: { type: SchemaType.STRING, nullable: false },
            Modules: { type: SchemaType.STRING, nullable: false },
          },
          required: ["SystemOverview", "Modules"], // Fixed naming issue
        },
        APIReference: {
          type: SchemaType.OBJECT,
          properties: {
            EndpointOverview: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              nullable: false,
            },
            RequestandResponse: { type: SchemaType.STRING, nullable: true },
            ErrorCodes: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              nullable: true,
            },
          },
          required: ["EndpointOverview", "RequestandResponse"], // Adjusted requirements
        },
        Contributing: {
          type: SchemaType.OBJECT,
          properties: {
            Guidelines: { type: SchemaType.STRING, nullable: false },
            CodeofConduct: { type: SchemaType.STRING, nullable: true },
            ReportingIssues: { type: SchemaType.STRING, nullable: true },
          },
          required: ["Guidelines"],
        },
        FAQ: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              Problem: { type: SchemaType.STRING, nullable: false },
              Solution: { type: SchemaType.STRING, nullable: false },
            },
            required: ["Problem", "Solution"],
          },
        },
        Testing: {
          type: SchemaType.OBJECT,
          properties: {
            Instructions: { type: SchemaType.STRING, nullable: false },
            Details: { type: SchemaType.STRING, nullable: true },
          },
          required: ["Instructions"],
        },
        License: {
          type: SchemaType.OBJECT,
          properties: {
            License: { type: SchemaType.STRING, nullable: false },
          },
          required: ["License"],
        },
        Acknowledgments: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING, nullable: false },
        },
        Appendices: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING, nullable: true },
        },
        ContactInformation: {
          type: SchemaType.OBJECT,
          properties: {
            Email: { type: SchemaType.STRING, nullable: false },
            GitHub: { type: SchemaType.STRING, nullable: true },
            Links: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              nullable: true,
            },
          },
          required: ["Email"],
        },
      },
      required: [
        "Title",
        "Introduction",
        "Features",
        "InstallationandSetup",
        "Usage",
        "Architecture",
        "APIReference",
        "Contributing",
        "Testing",
        "License",
        "ContactInformation",
      ],
    },
    markdown: {
      type: SchemaType.STRING,
      description:
        "Markdown format of the Comprehensive project documentation structure",
      nullable: true,
    },
  },
  required: ["data", "markdown"],
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
      Hi! I'm looking to create a comprehensive project documentation structure based on the following requirements:

      1. The project should include a complete and detailed schema with the following sections: Title, Introduction, Features, Installation and Setup, Usage, Architecture, API Reference, Contributing, Testing, License, Contact Information, and other relevant sections.
      2. Each section should be represented in a JSON schema format, ensuring proper nesting and required fields.
      3. Add placeholders for fields in the **Contact Information** section:
         - Email: "yourname@example.com"
         - GitHub: "https://github.com/your-username/your-repo"
         - Links: ["https://example.com"]
      4. Provide the full text of the MIT License under the License section.
      5. Include an example file structure for the project.
      6. Provide a list of tasks to complete the project effectively.
      7. Add a properly formatted markdown version of the entire documentation structure, matching the JSON schema.

      ### Here is the Project Information you will require to create the documentation
      - **Field of Interest**: ${fieldOfInterest}
      - **Tech Stack**: ${stack}
      - **Target Sector**: ${targetSector}
      - **Project Type**: ${projectType}
      - **Complexity**: ${complexity}
      - **Team Size**: ${teamSize}
      - **Duration**: ${duration}
      - **Project Name**: ${projectName}
      - **Project Data**: ${projectData}

      ${
        regenerateInput
          ? `### Additional changes requested:
      ${regenerateInput}`
          : ""
      }

      Output should include:
      1. A complete \`data\` object matching the JSON schema.
      2. A \`markdown\` string that reflects the same content as the \`data\` object in a readable format, with placeholders and the full license text.

      Ensure the markdown is well-structured, readable, and properly formatted with headings, subheadings, bullet points, and code blocks where appropriate.
    `;

    const result = await model.generateContent(prompt);
    const ideas = result.response.text();

    return NextResponse.json(JSON.parse(ideas));
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
