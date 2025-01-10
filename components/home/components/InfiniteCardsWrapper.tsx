import { MagicCard } from "@/components/ui/magic-card";
import { InfiniteCards } from "@/components/infinite-cards";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const InfiniteCardsWrapper = () => {
  return (
    <MagicCard
      particles={true}
      className="relative flex flex-col items-center justify-center bg-primary/[0.08]"
    >
      <div className="flex items-center justify-center h-full w-full">
        <InfiniteCards />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(239, 68, 68)"
          gradientBackgroundEnd="rgb(203, 29, 29)"
        />
      </div>
    </MagicCard>
  );
};
