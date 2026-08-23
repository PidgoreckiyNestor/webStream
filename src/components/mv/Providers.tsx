"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import { GoogleAdsClickCapture } from "@/components/mv/GoogleAdsClickCapture";
import { HashScroll } from "@/components/mv/HashScroll";
import { WaitlistProvider } from "@/components/mv/Waitlist";

const PostHogPageview = dynamic(
  () => import("@/components/mv/PostHogProvider").then((mod) => mod.PostHogPageview),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WaitlistProvider>
      <GoogleAdsClickCapture />
      <HashScroll />
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </WaitlistProvider>
  );
}
