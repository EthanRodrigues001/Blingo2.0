import { NextResponse, NextRequest } from "next/server";
import { createPetpetGif } from "@/temp/petpet";

export async function GET(request: NextRequest) {
  const image = request.nextUrl.searchParams.get("image");
  const resolution = request.nextUrl.searchParams.get("resolution");
  const delay = request.nextUrl.searchParams.get("delay");
  const backgroundColor = request.nextUrl.searchParams.get("backgroundColor");

  if (!image) {
    return NextResponse.json(
      { message: "Image URL is required" },
      { status: 400 }
    );
  }

  const resolutionValue = resolution ? parseInt(resolution, 10) : undefined;
  const delayValue = delay ? parseInt(delay, 10) : undefined;

  try {
    const gifData = await createPetpetGif(image, {
      resolution: resolutionValue,
      delay: delayValue,
      backgroundColor: backgroundColor || undefined,
    });

    const newHeaders = new Headers();
    newHeaders.set("Content-Type", "image/gif");

    return new NextResponse(gifData, {
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Error creating GIF:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
