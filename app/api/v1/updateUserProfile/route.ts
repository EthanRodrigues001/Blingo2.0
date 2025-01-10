import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/actions/auth";
import { updateUserProfile } from "@/actions/users";

export async function POST(request: NextRequest) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const displayName = formData.get("displayName") as string;
    const photo = formData.get("photo") as File | null;

    const result = await updateUserProfile(
      user.user.$id,
      displayName,
      photo || undefined
    );

    if (result.success) {
      return NextResponse.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to update profile" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
