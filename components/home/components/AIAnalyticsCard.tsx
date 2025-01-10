import { MagicCard } from "@/components/ui/magic-card";
import { motion } from "framer-motion";
import React from "react";

export const AIAnalyticsCard: React.FC = () => {
  const variants = {
    initial: {
      height: 0,
    },
    animate: {
      height: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      height: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };

  const arr = new Array(5).fill(0);

  return (
    <MagicCard
      particles={true}
      className="flex flex-col items-start h-full bg-primary/[0.08]"
    >
      <div className="w-full flex flex-col gap-6 p-6">
        <div className="w-full h-40 flex items-center justify-center rounded-lg">
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex h-full w-full min-h-[6rem] flex-row justify-evenly items-end space-x-2"
          >
            {arr.map((_, i) => (
              <motion.div
                key={`skeleton-vertical-${i}`}
                variants={variants}
                style={{
                  maxHeight: `${Math.random() * (80 - 40) + 40}%`,
                }}
                className={`flex h-full rounded-full border border-neutral-100/[0.2] dark:border-white/[0.2] p-2 items-end w-8 ${
                  i === 2 ? "bg-red-500 h-full relative" : ""
                }`}
              >
                {i === 2 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    2K
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl font-medium">AI Analytics & Insights</h4>
          <p className="text-sm md:text-base mt-2 text-muted-foreground">
            Get actionable insights and improve efficiency with AI-driven
            analytics.
          </p>
        </div>
      </div>
    </MagicCard>
  );
};
