import { IconBoltFilled } from "@tabler/icons-react";
import { MagicCard } from "@/components/ui/magic-card";

export const BoltCard = () => {
  return (
    <MagicCard
      ripple={true}
      className="relative flex flex-col items-center justify-center h-full bg-primary/[0.08]"
    >
      <div className="flex items-center justify-center min-h-72 w-full">
        <span className="text-muted-foreground group-hover:text-red-500 mx-auto relative">
          <IconBoltFilled className="w-14 h-14" />
        </span>
      </div>
      <div className="absolute inset-0  w-full h-full z-30"></div>
    </MagicCard>
  );
};
