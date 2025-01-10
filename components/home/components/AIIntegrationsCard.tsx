import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedBeamDemo } from "@/components/beam";

export const AIIntegrationsCard = () => {
  return (
    <MagicCard
      particles={true}
      className="flex flex-col items-start w-full bg-primary/[0.08]"
    >
      <div className="w-full flex flex-col gap-6 h-full p-6">
        <div className="flex flex-col">
          <h4 className="text-xl font-medium">Seamless AI Integrations</h4>
          <p className="text-sm md:text-base mt-2 text-muted-foreground">
            Download your project documentation and flowcharts directly to your
            device.
          </p>
        </div>
        <div className="w-full h-full relative">
          <div className="flex items-center justify-center h-full w-full">
            <AnimatedBeamDemo />
          </div>
          <div className="w-28 h-28 rounded-full bg-primary/10 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"></div>
        </div>
      </div>
    </MagicCard>
  );
};
