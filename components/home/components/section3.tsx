import React from "react";
import { BoltCard } from "@/components/home/components/BoltCard";
import { AIAnalyticsCard } from "@/components/home/components/AIAnalyticsCard";
import { ContentIdeationCard } from "@/components/home/components/ContentIdeationCard";
import { CreativityButton } from "@/components/home/components/CreativityButton";
import { InfiniteCardsWrapper } from "@/components/home/components/InfiniteCardsWrapper";
import { AIIntegrationsCard } from "@/components/home/components/AIIntegrationsCard";

const Section3: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-2 md:px-6 xl:px-48 py-12 md:py-16 lg:py-24 w-full">
      <div className="mt-16 w-full">
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.65fr] w-full gap-5">
            <BoltCard />
            <AIAnalyticsCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5">
            <ContentIdeationCard />
            <div className="grid grid-rows-[auto_1fr] gap-5 h-full">
              <CreativityButton />
              <InfiniteCardsWrapper />
            </div>
            <AIIntegrationsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
