// src/app/oauth/route.js

import { getUserData } from "@/actions/auth";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  const { account } = await createAdminClient();
  const session = await account.createSession(userId!, secret!);

  (await cookies()).set("blingo-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  const user = await getUserData(userId!);

  if (user && !user.hasCompletedOnboarding) {
    // Redirect to the "Getting Started" page if the user hasn't seen it
    return NextResponse.redirect(`${request.nextUrl.origin}/getting-started`);
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
