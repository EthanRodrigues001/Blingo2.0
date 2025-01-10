import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./actions/auth";

const protectedRoutes = ["/dashboard", "/getting-started"];

export default async function middleware(request: NextRequest) {
  const user = await getLoggedInUser();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!user && isProtected) {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
