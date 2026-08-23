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

const CLICK_STORAGE_KEY = "mv_gads_click";

export type AdsClick = {
  gclid: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

function adsClickFromParams(params: URLSearchParams): AdsClick {
  return {
    gclid: params.get("gclid") || params.get("gbraid") || params.get("wbraid"),
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
}

export function isGoogleAdsClick(click: AdsClick): boolean {
  if (click.gclid) return true;
  const source = click.utmSource?.toLowerCase();
  const medium = click.utmMedium?.toLowerCase();
  return source === "google" && (medium === "cpc" || medium === "ppc" || medium === "paid");
}

export function captureGoogleAdsClick() {
  if (typeof window === "undefined") return;
  const click = adsClickFromParams(new URLSearchParams(window.location.search));
  if (!isGoogleAdsClick(click)) return;
  try {
    sessionStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(click));
  } catch {
    /* private mode */
  }
}

export function readGoogleAdsClick(): AdsClick | null {
  if (typeof window === "undefined") return null;
  const live = adsClickFromParams(new URLSearchParams(window.location.search));
  if (isGoogleAdsClick(live)) return live;
  try {
    const raw = sessionStorage.getItem(CLICK_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as AdsClick;
    return isGoogleAdsClick(stored) ? stored : null;
  } catch {
    return null;
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

  captureGoogleAdsClick();
  if (!readGoogleAdsClick()) return;

  gtag("event", "sign_up", { method: "waitlist" });
  if (isGoogleAdsConversionLabel(GOOGLE_ADS_CONVERSION_LABEL)) {
    gtag("event", "conversion", { send_to: `${id}/${GOOGLE_ADS_CONVERSION_LABEL}` });
  }
}
