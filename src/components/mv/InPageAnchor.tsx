"use client";

import type { MouseEvent, ReactNode } from "react";

function homeHash(targetId: string, search = ""): string {
  return `${search ? `/${search}` : "/"}#${targetId}`;
}

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
      history.replaceState(null, "", `${window.location.search}#${targetId}`);
      onClick?.();
      return;
    }
    event.preventDefault();
    onClick?.();
    window.location.assign(homeHash(targetId, window.location.search));
  }

  return (
    <a href={href ?? homeHash(targetId)} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
