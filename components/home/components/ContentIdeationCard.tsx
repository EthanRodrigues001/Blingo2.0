"use client";
import { MagicCard } from "@/components/ui/magic-card";
import { Skeleton } from "@/components/ui/skeleton";
import { animate } from "framer-motion";
import { IconBrandGithubCopilot } from "@tabler/icons-react";
import {
  OpenAILogo,
  MetaIconOutline,
} from "@/components/home/components/LogoIcons";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const ContentIdeationCard = () => {
  return (
    <MagicCard
      particles={true}
      className="flex flex-col items-start w-full bg-primary/[0.08]"
    >
      <div className="w-full flex flex-col gap-6 p-6">
        <div className="flex flex-col items-center justify-center">
          <CardSkeletonContainer>
            <Skeleton />
          </CardSkeletonContainer>
        </div>

        <div className="flex flex-col mt-auto">
          <h4 className="text-xl font-medium">AI-Powered Content Ideation</h4>
          <p className="text-sm md:text-base mt-2 text-muted-foreground">
            Instantly generate tailored project ideas based on your unique
            inputs.
          </p>
        </div>
      </div>
    </MagicCard>
  );
};

const CardSkeletonContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`h-[15rem] md:h-[20rem] rounded-xl z-40 bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)] ${className}`}
    >
      {children}
    </div>
  );
};

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [".circle-1", { scale, transform }, { duration: 0.8 }],
    [".circle-2", { scale, transform }, { duration: 0.8 }],
    [".circle-3", { scale, transform }, { duration: 0.8 }],
    [".circle-4", { scale, transform }, { duration: 0.8 }],
    [".circle-5", { scale, transform }, { duration: 0.8 }],
  ];

  useEffect(() => {
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-12 w-12 circle-2">
          <IconBrandGithubCopilot className="h-6 w-6 dark:text-white" />
        </Container>
        <Container className="circle-3">
          <OpenAILogo className="h-8 w-8 dark:text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <MetaIconOutline className="h-6 w-6" />
        </Container>
      </div>
      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-red-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    ${className}`}
    >
      {children}
    </div>
  );
};

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};
