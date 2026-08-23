const DEFAULT_ADS_ID = "AW-18405823566";

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || DEFAULT_ADS_ID;

export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "";

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

export function fireWaitlistConversion() {
  if (typeof window === "undefined") return;
  const id = GOOGLE_ADS_ID;
  if (!isGoogleAdsId(id)) return;

  const send = () => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "sign_up", { method: "waitlist" });
    if (isGoogleAdsConversionLabel(GOOGLE_ADS_CONVERSION_LABEL)) {
      window.gtag("event", "conversion", {
        send_to: `${id}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      });
    }
  };

  if (typeof window.gtag === "function") {
    send();
    return;
  }
  window.setTimeout(send, 400);
}
