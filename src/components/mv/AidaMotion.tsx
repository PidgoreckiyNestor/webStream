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
        gsap.set("[data-mv-nav], [data-mv-hero], [data-mv-fade]", { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set("[data-mv-mark]", { xPercent: 4, opacity: 0.16 });
        return;
      }

      gsap.fromTo(
        "[data-mv-nav]",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.55, ease, delay: 0.02 },
      );

      gsap.fromTo(
        "[data-mv-hero]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease, delay: 0.04 },
      );

      gsap.utils.toArray<HTMLElement>("[data-mv-reveal]").forEach((section) => {
        const items = [...section.querySelectorAll<HTMLElement>("[data-mv-fade]")];
        if (!items.length) return;

        const stagger = items.length > 8 ? 0.07 : items.length > 1 ? 0.14 : 0.07;
        gsap.set(items, { opacity: 0, y: 16 });
        let played = false;
        const play = () => {
          if (played) return;
          played = true;
          gsap.to(items, { opacity: 1, y: 0, duration: 0.7, stagger, ease, overwrite: true });
        };
        ScrollTrigger.create({
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: play,
          onRefresh: (self) => {
            if (self.isActive || self.progress > 0) play();
          },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());

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
