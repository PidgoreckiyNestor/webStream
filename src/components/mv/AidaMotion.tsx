"use client";

import { useEffect, useRef, type ReactNode } from "react";

const ease = "power2.out";

function reveal(el: HTMLElement) {
  el.querySelectorAll<HTMLElement>("[data-mv-fade]").forEach((node) => {
    node.style.opacity = "1";
    node.style.transform = "none";
  });
}

export function AidaMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      reveal(el);
      return;
    }

    let reverted = false;
    let started = false;
    let ctx: { revert: () => void } | undefined;

    const fallbackId = window.setTimeout(() => {
      if (!started) reveal(el);
    }, 4000);

    const boot = () => {
      if (started || reverted) return;
      started = true;
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", boot);
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([gsapMod, stMod]) => {
          if (reverted) return;
          const gsap = gsapMod.default;
          const { ScrollTrigger } = stMod;
          gsap.registerPlugin(ScrollTrigger);
          const fold = window.innerHeight * 0.82;

          ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>("[data-mv-reveal]").forEach((section) => {
              const items = [...section.querySelectorAll<HTMLElement>("[data-mv-fade]")];
              if (!items.length) return;

              const already = section.getBoundingClientRect().top < fold;
              if (already) {
                gsap.set(items, { opacity: 1, y: 0 });
                return;
              }

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

            requestAnimationFrame(() => ScrollTrigger.refresh());
          }, el);
        })
        .catch(() => reveal(el));
    };

    window.addEventListener("scroll", boot, { once: true, passive: true });

    return () => {
      reverted = true;
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", boot);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
