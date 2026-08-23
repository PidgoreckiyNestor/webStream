"use client";

import type { MouseEvent, ReactNode } from "react";

export function InPageAnchor({
  targetId,
  href,
  className,
  children,
  onClick,
}: {
  targetId: string;
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const el = document.getElementById(targetId);
    if (el) {
      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
    }
    onClick?.();
  }

  return (
    <a href={href ?? `#${targetId}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
