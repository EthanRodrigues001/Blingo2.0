import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("fileId");
  if (!fileId) {
    return NextResponse.json(
      { message: "All parameters are required" },
      { status: 400 }
    );
  }

  try {
    const { storage } = await createAdminClient();

    // Get the file from Appwrite
    const file = await storage.getFileView(
      process.env.NEXT_PUBLIC_BUCKET_ID!,
      fileId
    );

    // console.log("File:", file);
    return new NextResponse(file);
  } catch (error) {
    console.error("Error fetching photo:", error);
    return NextResponse.json(
      { message: "Error fetching photo" },
      { status: 500 }
    );
  }
}
