export const ROLES = ["research", "build", "teach"] as const;
export const PLAN_INTENTS = ["trial", "plus", "lab", "research"] as const;

export type Role = (typeof ROLES)[number];
export type PlanIntent = (typeof PLAN_INTENTS)[number];

export type WaitlistInput = {
  email: string;
  role?: Role | null;
  planIntent?: PlanIntent | null;
  os?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
  honeypot?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseEmail(value: string): string | null {
  const email = value.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) return null;
  return email;
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export function isPlanIntent(value: unknown): value is PlanIntent {
  return typeof value === "string" && (PLAN_INTENTS as readonly string[]).includes(value);
}
