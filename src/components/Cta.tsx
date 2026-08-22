export function Cta() {
  return (
    <section className="py-24 sm:py-32 bg-[#0d0812] relative">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#010101] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#010101] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-medium text-white sm:text-4xl">Ready to get started?</h2>
        <p className="mt-4 text-lg text-white/50 max-w-md mx-auto">
          Choose a plan to unlock Metrics® and connect Muse to PC, Mac, and Linux computers.
        </p>
        <div className="mt-8">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-accent text-background hover:bg-accent-hover active:bg-accent-hover/90 h-12 rounded-lg px-10 text-lg"
          >
            Select a Plan
          </a>
        </div>
      </div>
    </section>
  );
}
