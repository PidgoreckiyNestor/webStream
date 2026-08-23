"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { btnGhost, btnSolid, navText } from "@/components/mv/chrome";
import { InPageAnchor } from "@/components/mv/InPageAnchor";

const mobileNavLink =
  "flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white cursor-pointer";

export function MvHeader() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpen(false);
  }

  return (
    <header data-mv-nav className="fixed top-0 right-0 left-0 z-50 pt-3">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/90 to-transparent" />
      <nav
        className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-7">
          <Link href="/" className="z-10 flex-shrink-0" aria-label="MindVault home">
            <img
              src="/images/logo-mindvault.svg"
              alt="MindVault"
              width={220}
              height={48}
              className="h-9 w-auto"
            />
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            <InPageAnchor targetId="features" className={navText}>
              Features
            </InPageAnchor>
            <InPageAnchor targetId="pricing" className={navText}>
              Pricing
            </InPageAnchor>
            <InPageAnchor targetId="faq" className={navText}>
              FAQ
            </InPageAnchor>
          </div>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white/70 hover:bg-white/[0.06] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" className={btnGhost}>
            Contact
          </button>
          <InPageAnchor targetId="pricing" className={btnSolid}>
            Download
          </InPageAnchor>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`relative overflow-hidden transition-all duration-200 ease-out lg:hidden ${
          open ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 rounded-md border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
          <div className="space-y-1 px-3 py-3">
            <InPageAnchor targetId="features" className={mobileNavLink} onClick={() => closeMenu()}>
              Features
            </InPageAnchor>
            <InPageAnchor targetId="pricing" className={mobileNavLink} onClick={() => closeMenu()}>
              Pricing
            </InPageAnchor>
            <InPageAnchor targetId="faq" className={mobileNavLink} onClick={() => closeMenu()}>
              FAQ
            </InPageAnchor>
            <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
              <button type="button" className={`${btnGhost} flex-1`}>
                Contact
              </button>
              <InPageAnchor targetId="pricing" className={`${btnSolid} flex-1`} onClick={() => closeMenu()}>
                Download
              </InPageAnchor>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
