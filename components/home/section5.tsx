import { MagicCard } from "../ui/magic-card";

export default function Section5() {
  return (
    <div className="p-4 md:p-8 lg:p-12 min-h-screen flex items-center justify-center">
      <MagicCard
        flickering={true}
        className="w-full max-w-4xl bg-[#0c0c0c] rounded-2xl overflow-hidden"
      >
        <section>
          <div className="relative py-24 px-6 md:px-12">
            {/* Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Elevate your
                <br />
                experience with us
              </h1>
              <p className="text-gray-400 text-sm md:text-base mb-8 max-w-2xl mx-auto">
                Ready to get started? Sign up now and start your journey with
                us. We are here to help you grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-300 text-sm font-medium rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </MagicCard>
    </div>
  );
}
