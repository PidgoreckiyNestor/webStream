"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
let started = false;

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!key || typeof window === "undefined" || started) return;

    const boot = () => {
      if (started) return;
      started = true;
      void import("posthog-js").then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: host,
          capture_pageview: false,
          autocapture: false,
          disable_session_recording: true,
          disable_surveys: true,
          person_profiles: "identified_only",
        });
        posthog.capture("$pageview", { $current_url: window.location.href });
      });
    };

    const t = window.setTimeout(boot, 2500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!key || !started) return;
    void import("posthog-js").then(({ default: posthog }) => {
      posthog.capture("$pageview", { $current_url: window.location.href });
    });
  }, [pathname, searchParams]);

  return null;
}
