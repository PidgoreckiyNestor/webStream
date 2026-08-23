"use client";

import { Suspense, type ReactNode } from "react";
import { PostHogPageview } from "@/components/mv/PostHogProvider";
import { WaitlistProvider } from "@/components/mv/Waitlist";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WaitlistProvider>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </WaitlistProvider>
  );
}
