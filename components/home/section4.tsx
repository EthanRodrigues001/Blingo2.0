import Pricing from "../Pricing";

export default function Section4() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
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
        <Pricing featureSection={false} />
      </div>
    </section>
  );
}
