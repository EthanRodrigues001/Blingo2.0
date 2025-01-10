"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Feature {
  name: string;
  included: "freemium" | "pro" | "enterprise" | "all" | null;
}

const features: Feature[] = [
  { name: "Project Complexity Chart", included: "freemium" },
  { name: "AI -Custom To Do List", included: "freemium" },
  { name: "Project Build data", included: "freemium" },
  { name: "AI -Documentation(with export)", included: "freemium" },
  { name: "Custom Regeneration of Data", included: "freemium" },
  { name: "AI -User Flow Chart(with export)", included: "pro" },
  { name: "Limit : 2 Projects", included: "freemium" },
  { name: "Limit : 6 Projects", included: "pro" },
  { name: "Limit : 14 Projects", included: "enterprise" },
];

const plans = [
  {
    name: "Freemium",
    price: { monthly: 0, yearly: 0 },
    level: "freemium" as const,
  },
  {
    name: "Pro",
    price: { monthly: 15, yearly: 144 },
    level: "pro" as const,
  },
  {
    name: "Enterprise",
    price: { monthly: 40, yearly: 432 },
    level: "enterprise" as const,
  },
];
interface PricingProps {
  featureSection?: boolean;
}

export default function Pricing({ featureSection = true }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-red-600 rounded-full opacity-70 blur-[150px]" />
      <div className="relative z-10">
        <div className="flex justify-end mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-3 py-1 rounded-md transition-colors",
                !isYearly ? "bg-zinc-100 dark:bg-zinc-800" : "text-zinc-500"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-3 py-1 rounded-md transition-colors",
                isYearly ? "bg-zinc-100 dark:bg-zinc-800" : "text-zinc-500"
              )}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={cn(
                "flex-1 p-4 rounded-xl text-left transition-all",
                "border border-zinc-200 dark:border-zinc-800 bg-neutral-900/[0.15]",
                selectedPlan === plan.level && "ring-2 ring-red-500"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{plan.name}</span>
                {plan.level === "pro" && (
                  <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold">
                ${isYearly ? plan.price.yearly : plan.price.monthly}
                <span className="text-sm font-normal text-zinc-500">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
            </button>
          ))}
        </div>
        {featureSection && (
          <>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <div className="min-w-[640px] divide-y divide-zinc-200 dark:divide-zinc-800">
                  <div className="flex items-center p-4 bg-neutral-900/[0.5]">
                    <div className="flex-1 text-sm font-medium">Features</div>
                    <div className="flex items-center gap-8 text-sm">
                      {plans.map((plan) => (
                        <div
                          key={plan.level}
                          className="w-16 text-center font-medium"
                        >
                          {plan.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className={cn(
                        "flex items-center p-4 transition-colors bg-neutral-900/[0.15]",
                        feature.included === selectedPlan &&
                          "bg-red-50/50 dark:bg-red-900/30"
                      )}
                    >
                      <div className="flex-1 text-sm">{feature.name}</div>
                      <div className="flex items-center gap-8 text-sm">
                        {plans.map((plan) => (
                          <div
                            key={plan.level}
                            className={cn(
                              "w-16 flex justify-center",
                              plan.level === selectedPlan && "font-medium"
                            )}
                          >
                            {shouldShowCheck(feature.included, plan.level) ? (
                              <Check className="w-5 h-5 text-red-500" />
                            ) : (
                              <span className="text-zinc-300 dark:text-zinc-700">
                                -
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {featureSection ? (
          <div className="mt-8 text-center">
            <Button
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              disabled
            >
              Get started with{" "}
              {plans.find((p) => p.level === selectedPlan)?.name}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <Button
              variant="tertiary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => router.push("/pricing")}
            >
              Go to Pricing to know more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function shouldShowCheck(
  included: Feature["included"],
  level: string
): boolean {
  if (level === "enterprise") return true;
  if (included === "all") return true;
  if (included === "pro" && (level === "pro" || level === "enterprise"))
    return true;
  if (included === "freemium") return true;

  return false;
}
