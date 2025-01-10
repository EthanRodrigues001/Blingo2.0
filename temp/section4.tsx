import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Section4() {
  return (
    <section className="w-full py-12">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Choose your plan
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple and transparent pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Choose the plan that suits your needs. No hidden fees, no
              surprises.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-red-600 rounded-full opacity-70 blur-[150px] " />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 md:gap-8 lg:gap-12 items-stretch pt-8 z-11">
            {/* Free Plan */}
            <Card className="flex flex-col border border-white/[0.2] ">
              <CardHeader className="flex-1">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Get started with essential tools for content creation
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold mb-4">$0</div>
                  <div className="space-y-2">
                    {[
                      "Basic AI content generation",
                      "4 social media integrations",
                      "Community support",
                      "1 project limit",
                      "Standard analytics",
                      "Basic image generation",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            {/* Pro Plan */}
            <Card className="flex flex-col relative before:absolute before:inset-0 before:rounded-[inherit] border-2 border-primary ">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
                Most Popular
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Unlock advanced features for enhanced content
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold mb-4">$10</div>
                  <div className="space-y-2">
                    {[
                      "Advanced AI content generation",
                      "10 social media integrations",
                      "Priority email support",
                      "10 project limit",
                      "Enhanced analytics & insights",
                      "Pro model image generation",
                      "Team collaboration tools",
                      "Custom branding options",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full">Upgrade to Pro</Button>
              </CardFooter>
            </Card>
            {/* Enterprise Plan */}
            <Card className="flex flex-col border border-white/[0.2] ">
              <CardHeader className="flex-1">
                <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Tailored solutions for large organizations and agencies
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold mb-4">$15</div>
                  <div className="space-y-2">
                    {[
                      "Unlimited AI content generation",
                      "All social media integrations",
                      "Dedicated account manager",
                      "Unlimited projects",
                      "Custom analytics & reporting",
                      "Enterprise-grade security",
                      "Free updates",
                      "Priority support",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
