const DEFAULT_ADS_ID = "AW-18405823566";

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || DEFAULT_ADS_ID;

const DEFAULT_CONVERSION_LABEL = "1U8wCM76seYcEM6oyshE";

export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || DEFAULT_CONVERSION_LABEL;

export function isGoogleAdsId(id: string): boolean {
  return /^AW-\d+$/.test(id);
}

export function isGoogleAdsConversionLabel(label: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(label);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer.push(args);
}

export function fireWaitlistConversion() {
  if (typeof window === "undefined") return;
  const id = GOOGLE_ADS_ID;
  if (!isGoogleAdsId(id)) return;

  gtag("event", "sign_up", { method: "waitlist" });
  if (isGoogleAdsConversionLabel(GOOGLE_ADS_CONVERSION_LABEL)) {
    gtag("event", "conversion", { send_to: `${id}/${GOOGLE_ADS_CONVERSION_LABEL}` });
  }
}
