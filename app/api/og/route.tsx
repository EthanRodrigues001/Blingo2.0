import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Transform your ideas into reality and make your project journey seamless";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: "url(https://www.blingo.tech/social-card-bg.jpg)",
            backgroundSize: "100% 100%",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            fontFamily: "Inter",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              color: "white",
              marginBottom: 24,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
          <img
            width="203"
            height="44"
            src="https://www.blingo.tech/pfp.png"
            alt="Logo"
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`${e.message}`);
    } else {
      console.log(`Unexpected error: ${e}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
