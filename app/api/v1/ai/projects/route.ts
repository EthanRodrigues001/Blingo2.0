import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const schema = {
  description: "Detailed project data including tasks and file structure",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "Simplified version of the project name",
      nullable: false,
    },
    shortDescription: {
      type: SchemaType.STRING,
      description: "A concise overview of the project",
      nullable: false,
    },
    data: {
      type: SchemaType.OBJECT,
      description:
        "Detailed project information, organized into structured sections (8400 characters max)",
      nullable: false,
      properties: {
        Introduction: {
          type: SchemaType.OBJECT,
          properties: {
            Overview: {
              type: SchemaType.STRING,
              description: "High-level overview of the project",
              nullable: false,
            },
            ExecutionPlan: {
              type: SchemaType.STRING,
              description: "Plan for project execution, including major steps",
              nullable: false,
            },
            FileStructure: {
              type: SchemaType.STRING,
              description: "Explanation of the file structure",
              nullable: false,
            },
          },
          required: ["Overview", "ExecutionPlan", "FileStructure"],
        },
        StepByStepGuide: {
          type: SchemaType.ARRAY,
          description: "Detailed step-by-step guide for the project",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              StepName: {
                type: SchemaType.STRING,
                description: "Name of the step",
                nullable: false,
              },
              Action: {
                type: SchemaType.STRING,
                description: "Action to be performed in this step",
                nullable: false,
              },
              HowYourAppHelps: {
                type: SchemaType.STRING,
                description: "How the app simplifies or supports the step",
                nullable: false,
              },
              Outcome: {
                type: SchemaType.STRING,
                description: "Expected outcome after completing the step",
                nullable: false,
              },
            },
            required: ["StepName", "Action", "HowYourAppHelps", "Outcome"],
          },
        },
        Customization: {
          type: SchemaType.STRING,
          description: "Ideas for project enhancements and extensions",
          nullable: false,
        },
        UseCases: {
          type: SchemaType.STRING,
          description:
            "Real-world applications or scenarios where the project can be used",
          nullable: false,
        },
      },
      required: [
        "Introduction",
        "StepByStepGuide",
        "Customization",
        "UseCases",
      ],
    },

    tasks: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.STRING,
            description: "Unique identifier for the task",
            nullable: false,
          },
          task_name: {
            type: SchemaType.STRING,
            description: "Name of the task",
            nullable: false,
          },
          complexity: {
            type: SchemaType.NUMBER,
            description: "Task complexity (0-100)",
            nullable: false,
          },
          task_done: {
            type: SchemaType.BOOLEAN,
            description: "Status of task completion",
            nullable: false,
          },
        },
        required: ["id", "task_name", "complexity", "task_done"],
      },
    },
    files: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: {
            type: SchemaType.STRING,
            description: "Unique identifier for the file/folder",
            nullable: false,
          },
          isSelectable: {
            type: SchemaType.BOOLEAN,
            description: "Indicates if the file/folder is selectable",
            nullable: false,
          },
          name: {
            type: SchemaType.STRING,
            description: "Name of the file or folder",
            nullable: false,
          },
          children: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: {
                  type: SchemaType.STRING,
                  description: "ID",
                  nullable: false,
                },
                isSelectable: {
                  type: SchemaType.BOOLEAN,
                  description: "Selectable",
                  nullable: false,
                },
                name: {
                  type: SchemaType.STRING,
                  description: "File/Folder name",
                  nullable: false,
                },
              },
              required: ["id", "isSelectable", "name"],
            },
          },
        },
        required: ["id", "isSelectable", "name", "children"],
      },
    },
  },
  required: ["title", "data", "tasks", "files"],
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
  const projectName = request.nextUrl.searchParams.get("projectName");

  if (
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

  const prompt: string = `
   Hi! I’m working on a project named "${projectName}". My preferences are:
- Field of interest: ${fieldOfInterest}.
- Tech stack: ${stack}.
- Target sector: ${targetSector}.
- Project type: ${projectType}.
- Desired complexity level: ${complexity}.
- Team size: ${teamSize}.
- Duration: ${duration}.

### Expected JSON Output

#### 1. **Data Section**
The \`data\` string should:
- Contain the following sections:
  - **Introduction**:
    - Overview of the project.
    - Execution plan.
    - File structure explanation (must match the \`files\` array).
  - **Step-by-Step Guide**:
    - Each step must match a corresponding task in the \`tasks\` array.
    - Include:
      - **Step Name**: Matches the \`task_name\` of a task in \`tasks\`.
      - **Action**: Describe what needs to be done.
      - **How Your App Helps**: How the app aids in this step.
      - **Outcome**: Result of completing the step.
  - **Customization**:
    - Provide ideas for enhancing the project.
  - **Use Case Scenarios**:
    - Real-world examples of how the project can be applied.

#### 2. **Files Section**
The \`files\` array should:
- Reflect the structure and descriptions in the \`fileStructure\` section of the \`data\` string.
- Example file structure (React and Node.js):
\`\`\`json
[
  {
    "id": "1",
    "isSelectable": true,
    "name": "src",
    "children": [
      {
        "id": "2",
        "isSelectable": true,
        "name": "frontend",
        "children": [
          { "id": "3", "isSelectable": true, "name": "App.tsx" },
          { "id": "4", "isSelectable": true, "name": "DashboardPage.jsx" },
          {
            "id": "5",
            "isSelectable": true,
            "name": "components",
            "children": [
              { "id": "6", "isSelectable": true, "name": "Header.tsx" },
              { "id": "7", "isSelectable": true, "name": "Footer.tsx" }
            ]
          }
        ]
      },
      {
        "id": "8",
        "isSelectable": true,
        "name": "backend",
        "children": [
          { "id": "9", "isSelectable": true, "name": "apiRoutes.js" },
          { "id": "10", "isSelectable": true, "name": "dbConfig.js" }
        ]
      }
    ]
  }
]
\`\`\`
Ensure the file structure contains:
- Every folder must have at least one file.
- Provide specific filenames with meaningful extensions like \`.jsx\`, \`.tsx\`, or \`.js\`.

#### 3. **Tasks Section**
The \`tasks\` array must:
- Correspond to the steps in the \`Step-by-Step Guide\` within \`data\`.
- Contain:
  - **ID**: Unique identifier.
  - **Task Name**: Matches a step name in the guide.
  - **Complexity**: A score between 0-100.
  - **Task Done**: Defaults to \`false\`.


#### Output Requirements
Generate a JSON object with the following structure:
- \`data\`: Contains all the above sections in a string.
- \`files\`: Matches the file structure described in \`data\`.
- \`tasks\`: Matches the steps described in \`data\`.

-Data:
1.Must not exceed 8,500 characters.
2.Ensure sections like Introduction, Step-by-Step Guide, Customization, and Use Case Scenarios are concise yet informative.

-Files and Tasks:
1.Maintain consistency between files, tasks, and data.

### Notes for Consistency
1. Use simple and declarative sentences to describe steps and actions.
2. Ensure the \`files\` array contains at least one file per folder but avoids deep nesting.
3. Optimize the project scope to ensure it fits within the size restrictions.

### Output Restrictions
1. Validate JSON formatting to avoid errors.
2. Ensure every folder in files contains at least one file.
3. Optimize the number of tasks to match the project’s complexity and duration.

Ensure the relationships are consistent across all sections.`;

  try {
    const result = await model.generateContent(prompt);
    const ideas = result.response.text();

    // Convert data to string
    const output = JSON.parse(ideas);
    output.data = JSON.stringify(output.data);

    return NextResponse.json(output);
  } catch (error) {
    console.error("Error generating project suggestions:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
