"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type ShotMode = "fade" | "dots" | "stack" | "captions";

const SLIDES = [
  { src: "/images/shot-live.png", alt: "MindVault live EEG dashboard", label: "Live" },
  { src: "/images/shot-spectral.png", alt: "Spectral analysis and spectrogram", label: "Spectral" },
  { src: "/images/shot-archive.png", alt: "Archive band stream and band power over interval", label: "Archive" },
] as const;

export function ProductCarousel({ mode }: { mode: ShotMode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  const showDots = mode === "dots" || mode === "captions" || mode === "stack";
  const frame =
    "overflow-hidden rounded-2xl border border-white/10 bg-[#090817] shadow-2xl ring-1 ring-white/5";

  if (mode === "stack") {
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

  return (
    <div
      className={`relative ${frame}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10]">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            className={`object-contain transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority={i === 0}
          />
        ))}
        {mode === "captions" ? (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
            <p className="text-sm font-medium text-white">{SLIDES[index].label}</p>
          </div>
        ) : null}
      </div>
      {showDots ? (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={slide.label}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
