"use client";

import { useEffect, useRef, type ReactNode } from "react";

const ease = "power2.out";

export function AidaMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.querySelectorAll<HTMLElement>("[data-mv-fade]").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    let reverted = false;
    let started = false;
    let ctx: { revert: () => void } | undefined;
    let idleId = 0;
    let timeoutId = 0;

    const revealNow = () => {
      el.querySelectorAll<HTMLElement>("[data-mv-fade]").forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
    };

    const fallbackId = window.setTimeout(revealNow, 2500);

    const boot = () => {
      if (started || reverted) return;
      started = true;
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", onFirstScroll);
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([gsapMod, stMod]) => {
          if (reverted) return;
          const gsap = gsapMod.default;
          const { ScrollTrigger } = stMod;
          gsap.registerPlugin(ScrollTrigger);

          ctx = gsap.context(() => {
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
        .catch(revealNow);
    };

    const onFirstScroll = () => boot();
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(boot, { timeout: 1400 });
    } else {
      timeoutId = window.setTimeout(boot, 1);
    }

    return () => {
      reverted = true;
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", onFirstScroll);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={root} className="flex flex-1 flex-col">
      {children}
    </div>
  );
}
