"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/shot-live.png", alt: "MindVault live EEG dashboard", label: "Live" },
  { src: "/images/shot-spectral.png", alt: "Spectral analysis and spectrogram", label: "Spectral" },
  { src: "/images/shot-archive.png", alt: "Archive band stream and band power over interval", label: "Archive" },
] as const;

const frame =
  "overflow-hidden rounded-2xl border border-white/10 bg-[#090817] shadow-2xl ring-1 ring-white/5";

export function ProductCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const stackStep = 16;

  return (
    <div>
      <div className="relative pr-7 pb-7">
        <div className="relative aspect-[16/10]">
          {SLIDES.map((slide, i) => {
            const offset = (i - index + SLIDES.length) % SLIDES.length;
            if (offset > 2) return null;
            return (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show ${slide.label}`}
                className={`${frame} absolute inset-0 cursor-pointer transition-transform duration-500 ease-out`}
                style={{
                  transform: `translate(${offset * stackStep}px, ${offset * stackStep}px)`,
                  zIndex: 30 - offset,
                  opacity: offset === 0 ? 1 : 0.45,
                }}
                onClick={() => setIndex((index + 1) % SLIDES.length)}
              >
                <Image
                  src={slide.src}
                  alt={offset === 0 ? slide.alt : ""}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority={offset === 0}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={slide.label}
            aria-current={i === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
