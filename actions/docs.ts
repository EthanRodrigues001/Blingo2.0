import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

export interface Documentation {
  $id: string;
  projectId: string;
  data: any;
  markdown: string;
}

export async function createDocumentation(
  projectId: string,
  data: any,
  markdown: string
): Promise<Documentation> {
  const { database } = await createAdminClient();
  const doc = await database.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_DOCS!,
    ID.unique(),
    { projectId, data: JSON.stringify(data), markdown }
  );
  return {
    $id: doc.$id,
    projectId: doc.projectId,
    data: JSON.parse(doc.data),
    markdown: doc.markdown,
  };
}

export async function updateDocumentation(
  docId: string,
  data: any,
  markdown: string
): Promise<Documentation> {
  const { database } = await createAdminClient();
  const updatedDoc = await database.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_DOCS!,
    docId,
    { data: JSON.stringify(data), markdown }
  );
  return {
    $id: updatedDoc.$id,
    projectId: updatedDoc.projectId,
    data: JSON.parse(updatedDoc.data),
    markdown: updatedDoc.markdown,
  };
}

export async function fetchAllDocumentation(): Promise<Documentation[]> {
  const { database } = await createAdminClient();
  const docs = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_DOCS!
  );
  return docs.documents.map((doc) => ({
    $id: doc.$id,
    projectId: doc.projectId,
    data: JSON.parse(doc.data),
    markdown: doc.markdown,
  }));
}
