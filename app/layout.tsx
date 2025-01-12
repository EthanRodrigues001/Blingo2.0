import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Navbar from "@/components/main/navbar";
import { ThemeProvider } from "@/components/theme-provider";
// import Footer from "@/components/main/footer";
import { UserProvider } from "@/components/context/UserContext";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/components/context/LoadingContext";
import LoadingOverlay from "@/components/main/LoadingOverlay";
import { ProjectsProvider } from "@/components/context/ProjectContext";
import { DocumentationProvider } from "@/components/context/DocumentationContext";
import { FlowProvider } from "@/components/context/FlowContext";
import Anounce from "@/components/Anounce";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blingo: Turn Your Vision into Reality",
  description:
    "Unlock your potential with our intuitive platform. Effortlessly generate and customize project roadmaps tailored to your needs. Transform your ideas into reality and make your project journey seamless and enjoyable.",
  openGraph: {
    title: "Blingo: AI-Powered Project Roadmaps",
    description:
      "Discover how Blingo's AI-driven platform can help you generate and customize project roadmaps tailored to your unique needs. Simplify your workflow and achieve your goals with ease.",
    type: "article",
    url: "https://www.blingo.tech/",
    images: [
      {
        url: "https://www.blingo.tech/api/meta/og",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blingo: AI-Powered Project Roadmaps",
    description:
      "Discover how Blingo's AI-driven platform can help you generate and customize project roadmaps tailored to your unique needs. Simplify your workflow and achieve your goals with ease.",
    images: ["https://www.blingo.tech/api/meta/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="Blingo" />
      </Head>
      <UserProvider>
        <ProjectsProvider>
          <DocumentationProvider>
            <FlowProvider>
              <LoadingProvider>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  <Anounce />
                  {/* <div
          id="home"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,23,23,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.4)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-full mt-[63px"
        /> */}

                  {/* here */}
                  {/* <Navbar />
          <main className="mx-auto w-full z-40 relative bg-[#09090B]">
            {" "} */}
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <LoadingOverlay />
                    <div className=" bg-[#09090B]">{children}</div>
                  </ThemeProvider>
                  {/* <Footer />
          </main> */}
                  <Toaster />
                </body>
              </LoadingProvider>
            </FlowProvider>
          </DocumentationProvider>
        </ProjectsProvider>
      </UserProvider>
    </html>
  );
}
