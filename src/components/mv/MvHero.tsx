import { PlatformBadges } from "@/components/mv/PlatformBadges";
import { ProductCarousel, type ShotMode } from "@/components/mv/ProductCarousel";
import type { VariantId } from "@/components/mv/variants";

const proof = ["Live stream", "Local recording", "Ready to export"];

const streamSpec = ["TP9", "AF7", "AF8", "TP10", "256 Hz", "PPG", "IMU", "CSV", "LSL", "OSC"];

function NameMarquee() {
  return (
    <div className="group relative w-full min-w-0 overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <div
        className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {[...streamSpec, ...streamSpec].map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="mx-5 whitespace-nowrap font-mono text-sm font-medium tracking-wide text-white/30 sm:mx-8 sm:text-[15px]"
          >
            {name}
          </span>
        ))}
      </div>
      <p className="sr-only">{streamSpec.join(" · ")}</p>
    </div>
  );
}

function ProofLine({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium tracking-wide text-white/70 sm:text-[15px] ${className}`}
    >
      {proof.map((item, index) => (
        <span key={item} className="contents">
          {index > 0 ? <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" /> : null}
          <span>{item}</span>
        </span>
      ))}
    </p>
  );
}

export function MvHero({
  shot = "stack",
  layout = "split",
}: {
  variant: VariantId;
  shot?: ShotMode;
  layout?: "split" | "centered";
}) {
  return (
    <section
      id="home"
      className={`relative flex flex-col pt-24 lg:min-h-[100svh] lg:pt-20 ${
        layout === "centered" ? "justify-start pb-8 lg:pb-10" : "justify-center pb-16 lg:pb-20"
      }`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-[12%] h-80 w-80 rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-1/4 right-[8%] h-[22rem] w-[22rem] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      {layout === "centered" ? (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-4 text-center">
            <p data-mv-hero className="text-sm font-medium tracking-wide text-primary-muted">
              Desktop app for Muse 2 and Muse S
            </p>
            <h1
              data-mv-hero
              className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              Muse EEG on your computer.
            </h1>
            <div data-mv-hero>
              <ProofLine className="mt-5 justify-center" />
            </div>
            <div data-mv-hero className="mt-8">
              <PlatformBadges />
            </div>
          </div>
          <div data-mv-hero className="mt-10">
            <NameMarquee />
          </div>
          <div data-mv-hero className="relative mx-auto mt-10 w-full max-w-5xl flex-1 lg:mt-14">
            <div className="absolute -inset-10 -z-10 rounded-3xl bg-primary/12 blur-3xl" />
            <ProductCarousel mode={shot} />
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
            <div className="max-w-xl opacity-0 animate-fade-in-up">
              <p className="text-sm font-medium tracking-wide text-primary-muted">
                Desktop app for Muse 2 and Muse S
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Muse EEG on your computer.
              </h1>
              <ProofLine className="mt-5" />
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-base font-medium text-cta-fg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg cursor-pointer"
                >
                  Get the desktop app
                </a>
                <a
                  href="#features"
                  className="text-sm font-medium text-white/50 underline-offset-4 hover:text-white hover:underline cursor-pointer"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-3 text-xs text-white/35">Windows, macOS, and Linux</p>
            </div>

            <div className="relative opacity-0 animate-fade-in-up animation-delay-200">
              <div className="absolute -inset-10 -z-10 rounded-3xl bg-primary/12 blur-3xl" />
              <ProductCarousel mode={shot} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
