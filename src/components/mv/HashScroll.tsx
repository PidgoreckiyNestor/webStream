"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    function scrollToHash() {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    scrollToHash();
    const timer = window.setTimeout(scrollToHash, 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
