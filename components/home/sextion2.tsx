import React from "react";
import { VelocityScroll } from "../ui/scroll-based-velocity";

const Section2 = () => {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left fade */}
      <div className="absolute inset-y-0 left-0 w-2/6 bg-gradient-to-r from-white via-[#09090B] to-transparent dark:from-[#09090B] dark:to-transparent z-10" />

      {/* Right fade */}
      <div className="absolute inset-y-0 right-0 w-2/6 bg-gradient-to-l from-white via-[#09090B] to-transparent dark:from-[#09090B] dark:to-transparent z-10" />

      <VelocityScroll
        text="Your project journey starts here. Generate, customize, and execute with ease."
        default_velocity={5}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent md:text-7xl md:leading-[5rem]"
      />
    </div>
  );
};

export default Section2;
