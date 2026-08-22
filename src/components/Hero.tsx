import { Check } from "lucide-react";

const logos = ["MIT", "Stanford", "Cambridge", "Berkeley", "Yale", "Google", "Microsoft", "Sony"];

export function Hero() {
  return (
    <section id="home" className="relative pt-48 pb-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[150px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
          <div className="opacity-0 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block flex-shrink-0">
                <img src="/images/logo-metrics.svg" alt="" className="h-12 sm:h-14 lg:h-16 w-auto" />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white">
                Metrics<sup className="text-3xl sm:text-4xl">®</sup>
              </h1>
            </div>
            <p className="mt-4 text-lg sm:text-xl text-white/60">The real-time neural data toolkit.</p>
            <ul className="mt-6 space-y-2 text-sm text-white/50">
              {[
                "Visualize and stream sensor data in real time",
                "Filter noise with real-time signal processing",
                "Export publication-ready datasets",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-accent text-background hover:bg-accent-hover active:bg-accent-hover/90 h-12 rounded-lg px-10 text-lg"
              >
                Select a Plan
              </a>
            </div>
          </div>

          <div className="relative opacity-0 animate-fade-in-up animation-delay-200">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium mb-4 overflow-hidden">
              <span className="absolute inset-0 rounded-full p-[1px] animate-gradient-border">
                <span className="absolute inset-[1px] rounded-full bg-black/80" />
              </span>
              <span className="relative flex items-center gap-2">
                <img src="/images/logo-metrics.svg" alt="" width={16} height={16} className="h-4 w-4" />
                <span className="text-white">Metrics® 1.0 is now available</span>
              </span>
            </span>
            <div className="absolute -top-8 -left-8 -right-8 bottom-1/4 bg-primary/15 rounded-2xl blur-3xl -z-10" />
            <div className="absolute -top-16 -left-16 -right-16 bottom-1/3 bg-primary/10 rounded-3xl blur-[80px] -z-20" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                  poster="/images/metrics-interface.png"
                >
                  <source src="/videos/hero-demo.webm" type="video/webm" />
                  <source src="/videos/hero-demo.mp4" type="video/mp4" />
                  <img
                    src="/images/metrics-interface.png"
                    alt="Metrics application interface showing real-time EEG visualization"
                    className="w-full h-auto"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 opacity-0 animate-fade-in animation-delay-400">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <p className="text-sm text-white/40 text-center lg:text-left">
              Used in <span className="text-accent font-semibold">1000+</span> leading universities, labs,
              startups, studios, offices, and enterprises worldwide.
            </p>
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#010101] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#010101] to-transparent z-10" />
              <div className="flex animate-marquee">
                {[...logos, ...logos].map((name, index) => (
                  <span
                    key={`${name}-${index}`}
                    className="mx-4 sm:mx-8 text-base sm:text-lg font-semibold text-white/30 whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
