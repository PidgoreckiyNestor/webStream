"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";

const navLink =
  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 inline-flex items-center gap-1 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background text-white/80 hover:text-white hover:bg-white/10";

const mobileNavLink =
  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background text-white/80 hover:text-white hover:bg-white/10";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 h-32 bg-gradient-to-b from-black via-black/95 via-70% to-transparent pointer-events-none" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6" aria-label="Main navigation">
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex-shrink-0 group z-10" aria-label="Petal Technology home">
            <img
              src="/images/logo-petal.svg"
              alt="Petal Technology"
              width={150}
              height={50}
              className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-150"
            />
            <span className="block text-[10px] text-white/60 tracking-wide italic mt-1">Telepathic technology</span>
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1 rounded-full bg-[#0a0a0a]/90 backdrop-blur-md px-1.5 py-1.5 absolute left-1/2 -translate-x-1/2">
            <Link href="/#pricing" className={navLink}>
              Pricing
            </Link>
            <Link href="/contact" className={navLink}>
              Contact
            </Link>
            <a href="https://docs.petal.tech" target="_blank" rel="noopener noreferrer" className={navLink}>
              Docs
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-3 z-10">
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign in
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background bg-accent text-background hover:bg-accent-hover active:bg-accent-hover/90 h-9 rounded-md px-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden relative ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#0a0a0a]/95 backdrop-blur-md mx-4 rounded-2xl border border-white/10">
          <div className="space-y-1 px-4 py-4">
            <Link href="/#pricing" className={mobileNavLink} onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <Link href="/contact" className={mobileNavLink} onClick={() => setOpen(false)}>
              Contact
            </Link>
            <a href="https://docs.petal.tech" target="_blank" rel="noopener noreferrer" className={mobileNavLink}>
              Docs
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
            <div className="pt-4 mt-4 space-y-2 border-t border-white/10">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full transition-all duration-300 text-center"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg bg-accent text-background hover:bg-accent-hover h-9 rounded-md px-3 w-full"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
