"use client";

import { useEffect } from "react";
import { captureGoogleAdsClick } from "@/lib/google-ads";

export function GoogleAdsClickCapture() {
  useEffect(() => {
    captureGoogleAdsClick();
  }, []);
  return null;
}
