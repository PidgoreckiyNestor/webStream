"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = "power2.out";

export function AidaMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-mv-hero], [data-mv-fade]", { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set("[data-mv-mark]", { xPercent: 4, opacity: 0.16 });
        return;
      }

      gsap.fromTo(
        "[data-mv-hero]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease, delay: 0.04 },
      );

      gsap.utils.toArray<HTMLElement>("[data-mv-reveal]").forEach((section) => {
        const items = section.querySelectorAll("[data-mv-fade]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
            ease,
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-mv-mark]",
        { xPercent: 12 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: "footer",
            start: "top bottom",
            end: "max",
            scrub: 2.2,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
