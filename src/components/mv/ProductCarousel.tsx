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

const imageSizes = "(min-width: 1024px) 640px, (min-width: 640px) 70vw, calc(100vw - 2rem)";

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
  const nextIndex = (index + 1) % SLIDES.length;

  return (
    <div>
      <div className="relative pr-7 pb-7">
        <div className="relative aspect-[16/10]">
          {SLIDES.map((slide, i) => {
            const offset = (i - index + SLIDES.length) % SLIDES.length;
            if (offset > 2) return null;
            const isFront = offset === 0;
            return (
              <div
                key={slide.src}
                className={`${frame} absolute inset-0 transition-transform duration-500 ease-out`}
                style={{
                  transform: `translate(${offset * stackStep}px, ${offset * stackStep}px)`,
                  zIndex: 30 - offset,
                  opacity: isFront ? 1 : 0.45,
                }}
                aria-hidden={!isFront}
              >
                {isFront ? (
                  <button
                    type="button"
                    aria-label={`Show ${SLIDES[nextIndex].label}`}
                    className="absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                    onClick={() => setIndex(nextIndex)}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-contain"
                      sizes={imageSizes}
                      quality={70}
                      priority={i === 0}
                      fetchPriority={i === 0 ? "high" : "auto"}
                    />
                  </button>
                ) : null}
              </div>
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
            className="relative flex h-6 min-w-6 items-center justify-center rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            onClick={() => setIndex(i)}
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
