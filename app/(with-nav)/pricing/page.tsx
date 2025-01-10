import Pricing from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center mb-12 mt-24">
          <h1 className="text-4xl z-10 font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Pricing Plans
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Choose the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>
        <Pricing />
      </div>
    </div>
  );
}
