"use client"
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import confetti from "canvas-confetti";

export const CreativityButton = () => {
  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <MagicCard
      text={true}
      className="relative flex flex-col items-center justify-center h-32 bg-primary/[0.08]"
    >
      <div className="flex items-center justify-center h-full w-full">
        <Button onClick={handleClick}>AI Driven Creativity</Button>
      </div>
    </MagicCard>
  );
};
