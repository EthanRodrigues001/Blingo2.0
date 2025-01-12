import React from "react";
import { Spotlight } from "../ui/spotlight";
import Link from "next/link";
import { Button } from "../ui/button";
// import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import HeroVideoDialog from "../ui/hero-video-dialog";

export default function Section1() {
  return (
    <div className="w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden py-20 md:py-40">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(255, 255, 255, 0.5)"
      />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center text-center w-full max-w-5xl my-[3rem] mx-auto z-40 relative">
          <div className="pl-2 pr-1 py-1 rounded-full border border-foreground/10 hover:border-foreground/15 backdrop-blur-lg cursor-pointer flex items-center gap-2.5 select-none w-max mx-auto">
            <div className="w-3.5 h-3.5 rounded-full bg-primary/40 flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60 flex items-center justify-center animate-ping"></div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <span className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-red-500  to-red-600 bg-clip-text text-sm text-transparent">
              Build for the future
              <span className="text-xs text-secondary-foreground px-1.5 py-0.5 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/10 flex items-center justify-center">
                What&apos;s new
                <ArrowRightIcon className="w-3.5 h-3.5 ml-1 text-foreground/50" />
              </span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent py-2 md:py-4 lg:!leading-tight font-medium tracking-[-0.0125em] mt-6 font-heading">
            Kickstart Your Projects with AI-Powered Roadmaps
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mt-4 text-accent-foreground/60 max-w-2xl mx-auto">
            Unlock your potential with our intuitive platform. Effortlessly
            generate project roadmaps tailored to your needs.{" "}
            <span className="hidden sm:inline">
              Transform your ideas into reality and make your project journey
              seamless and enjoyable.
            </span>
          </p>
          <div className="flex items-center justify-center md:gap-x-6 mt-8">
            <Button asChild size="lg">
              <Link href="/dashboard">Start for free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hidden md:flex"
            >
              <Link href="#works">How it works</Link>
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl lg:max-w-7xl mt-12">
            {/* Glow effect */}
            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-red-600 rounded-full opacity-50 blur-[100px] -z-10" /> */}

            {/* Card container */}
            <div
              id="works"
              className="relative rounded-xl lg:rounded-[32px] border border-neutral-200/50 p-2 backdrop-blur-lg border-neutral-700 bg-neutral-800/50 md:p-4"
            >
              {/* Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-red-600 rounded-full opacity-70 blur-[100px] -z-10" />
              <div className="rounded-lg lg:rounded-[24px] border p-2 border-neutral-700 bg-black">
                {/* <Image
                  src="/images/dashboard.png"
                  alt="dashboard"
                  width={1920}
                  height={1080}
                  className="rounded-lg lg:rounded-[20px] w-full h-auto"
                /> */}
                <HeroVideoDialog
                  className="hidden dark:block rounded-lg lg:rounded-[20px] w-full h-auto"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=y_G-0FWV5qMIpZbC"
                  thumbnailSrc="/cover.PNG"
                  thumbnailAlt="Hero Video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-4/6 bg-gradient-to-t from-white to-transparent dark:from-[#09090B] dark:to-transparent z-5" />
    </div>
  );
}
