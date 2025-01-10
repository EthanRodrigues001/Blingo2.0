import { validateString } from "@/lib/validators";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  const number = request.nextUrl.searchParams.get("number");

  console.log(number);
  if (!name) {
    return NextResponse.json({ message: "Hello World!" });
  }
  if (await validateString(name)) {
    return NextResponse.json({ message: "not string" });
  }
  console.log(name);
  return NextResponse.json({ message: "Hello World!", name, number });
}
