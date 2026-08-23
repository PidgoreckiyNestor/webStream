import Image from "next/image";
import { sectionKicker } from "@/components/mv/chrome";

const steps = [
  {
    n: "01",
    title: "Connect Muse",
    body: "Pair Muse 2, Muse S, or Muse S Athena over Bluetooth. No extra hardware.",
    shot: "/images/shot-connect-3.png",
    alt: "Muse S found over Bluetooth, ready to connect",
  },
  {
    n: "02",
    title: "Watch it live",
    body: "256 Hz bands on the live view while the headset is on.",
    shot: "/images/shot-watch.png",
    alt: "Live band power over time from Muse",
  },
  {
    n: "03",
    title: "Analyse data",
    body: "Band power, spectrogram, then CSV or EDF — or LSL on Lab.",
    shot: "/images/shot-analyse.png",
    alt: "Spectrogram and band stream analysis",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-28" data-mv-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-mv-fade>
          <p className={sectionKicker}>How it works</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Headset on. Data on screen.
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Three steps from Bluetooth pair to a live analysis.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] md:gap-0 md:divide-x md:divide-white/10">
          {steps.map((step) => (
            <article
              key={step.title}
              data-mv-fade
              className="grid grid-rows-subgrid row-span-4 md:px-10 first:md:pl-0 last:md:pr-0"
            >
              <p className={sectionKicker}>{step.n}</p>
              <div className="relative mt-6 h-44 w-full sm:h-52">
                <Image
                  src={step.shot}
                  alt={step.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 28vw, calc(100vw - 2rem)"
                  quality={70}
                />
              </div>
              <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/45">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
