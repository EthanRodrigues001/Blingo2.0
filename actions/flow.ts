import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Query } from "node-appwrite";

export interface Flow {
  $id: string;
  projectId: string;
  flow: string;
}

export async function createOrUpdateFlow(
  projectId: string,
  flow: string
): Promise<Flow> {
  const { database } = await createAdminClient();

  // Check if a flow already exists for this project
  const existingFlows = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_FLOW!,
    [Query.equal("projectId", projectId)]
  );

  if (existingFlows.documents.length > 0) {
    // Update existing flow
    const existingFlow = existingFlows.documents[0];
    const updatedFlow = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_FLOW!,
      existingFlow.$id,
      { flow }
    );
    return {
      $id: updatedFlow.$id,
      projectId: updatedFlow.projectId,
      flow: updatedFlow.flow,
    };
  } else {
    // Create new flow
    const newFlow = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_FLOW!,
      ID.unique(),
      { projectId, flow }
    );
    return {
      $id: newFlow.$id,
      projectId: newFlow.projectId,
      flow: newFlow.flow,
    };
  }
}

export async function getAllFlows(): Promise<Flow[]> {
  const { database } = await createAdminClient();
  const flows = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_FLOW!
  );

  return flows.documents.map((flow) => ({
    $id: flow.$id,
    projectId: flow.projectId,
    flow: flow.flow,
  }));
}
