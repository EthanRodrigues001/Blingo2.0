"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils";
import Particles from "./particles";
import Ripple from "./ripple";
import FlickeringGrid from "./flickering-grid";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  particles?: boolean;
  ripple?: boolean;
  text?: boolean;
  count?: number;
  flickering?: boolean;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#2c2020",
  gradientOpacity = 0.8,
  particles = false,
  ripple = false,
  count = 20,
  text = false,
  flickering = false,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener("mousemove", handleMouseMove);
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
      }
    },
    [handleMouseMove, mouseX, gradientSize, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [handleMouseMove, mouseX, gradientSize, mouseY]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900/[0.15]  border border-neutral-100 dark:border-white/[0.2] text-black dark:text-white",
        className
      )}
    >
      {particles && (
        <Particles
          className="absolute inset-0 w-full h-full z-10"
          quantity={count}
          ease={80}
          color="#d4d4d8"
          refresh
        />
      )}
      {flickering && (
        <FlickeringGrid
          className="z-10 absolute inset-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)] w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#FF5A5A"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={600}
          width={1000}
        />
      )}
      {ripple && <Ripple className="absolute inset-0 w-full h-full z-10" />}
      {text && (
        <div className="absolute inset-0 flex justify-center w-full h-full z-10">
          {" "}
          <p className="text-base text-muted-foreground text-justify [mask-image:radial-gradient(50%_50%_at_50%_50%,#BAB3FF_0%,rgba(186,179,255,0)_90.69%)]">
            We use AI to help you design project workflows that fit your vision.
            Our tools generate project roadmaps, user flows, and complete
            documentation to simplify execution. Whether you&apos;re creating a
            web app or an advanced software solution, let AI handle the heavy
            lifting and keep you focused on innovation. Generate smarter,
            faster, and more effectively with our advanced AI-driven approach.
          </p>
        </div>
      )}
      <div className="z-20 w-full h-full">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}
