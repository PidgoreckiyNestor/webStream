"use client";

import { useState } from "react";
import { sectionKicker } from "@/components/mv/chrome";
import { faqItems } from "@/lib/faq";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden
      className={`mt-1 shrink-0 text-white/55 transition-transform duration-300 ease-out ${
        open ? "rotate-180 text-white/70" : ""
      }`}
    >
      <path
        d="M3.5 6.25 8 10.75l4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div id="faq" className="max-w-xl scroll-mt-[5.25rem]" data-mv-reveal>
            <div data-mv-fade>
              <p className={sectionKicker}>FAQ</p>
              <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Before you pick a plan.
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Headset, stream, Lab. Then an email — not a download.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10" data-mv-reveal>
            {faqItems.map((item) => {
              const isOpen = open === item.q;
              return (
                <div key={item.q} data-mv-fade className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left text-[17px] font-medium tracking-tight text-white/90 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                    >
                      {item.q}
                      <Chevron open={isOpen} />
                    </button>
                  </h3>
                  <div
                    className={`grid motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    } transition-[grid-template-rows] duration-300 ease-out`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 max-w-xl text-[15px] leading-relaxed text-white/45">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
