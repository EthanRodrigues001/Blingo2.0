import { NextResponse, NextRequest } from "next/server";
import { completeOnboarding } from "@/actions/users";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await completeOnboarding(userId);
    return NextResponse.json({ success: response }, { status: 200 });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await completeOnboarding(userId);
    return NextResponse.json({ success: response }, { status: 200 });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
