const FALLBACK = "http://localhost:3000";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return FALLBACK;
}

export function isIndexable(): boolean {
  if (process.env.VERCEL_ENV === "preview") return false;
  const url = siteUrl();
  return !url.includes("localhost");
}
