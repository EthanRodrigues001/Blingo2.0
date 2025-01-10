import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

export async function completeOnboarding(userId: string) {
  try {
    const { database } = await createAdminClient();
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ORDERS!,
      userId,
      { hasCompletedOnboarding: true }
    );
    return { success: true };
  } catch (error) {
    console.log("Error updating onboarding status:", error);
    return { success: false };
  }
}

export async function updateUserProfile(
  userId: string,
  displayName: string,
  photoFile?: File
) {
  const { database, storage } = await createAdminClient();

  let fileId = null;
  if (photoFile) {
    const file = await storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID!,
      ID.unique(),
      photoFile
    );
    fileId = file.$id; // Store only the file ID
  }

  await database.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ORDERS!,
    userId,
    {
      displayName,
      ...(fileId && { photo: fileId }),
    }
  );

  return { success: true };
}
