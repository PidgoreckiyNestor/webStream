export const ROLES = ["research", "build", "teach"] as const;
export const PLAN_INTENTS = ["trial", "plus", "lab", "research"] as const;
export const OPERATING_SYSTEMS = ["Windows", "macOS", "Linux"] as const;

export type Role = (typeof ROLES)[number];
export type PlanIntent = (typeof PLAN_INTENTS)[number];
export type OperatingSystem = (typeof OPERATING_SYSTEMS)[number];

export type AccessRequestCopy = {
  title: string;
  description: string;
  submit: string;
  successTitle: string;
  successBody: string;
  emailDetail: string;
};

const DEFAULT_ACCESS_COPY: AccessRequestCopy = {
  title: "Request MindVault access",
  description:
    "MindVault is available for Muse S Athena through controlled early access. Enter your email and we’ll send the right build and setup steps for your computer.",
  submit: "Request access",
  successTitle: "Access request received",
  successBody: "We’ll email you with the right build and setup steps for your operating system.",
  emailDetail:
    "MindVault currently supports live EEG, contact quality, CSV recording, and EDF export with Muse S Athena.",
};

const ACCESS_COPY_BY_INTENT: Record<PlanIntent, AccessRequestCopy> = {
  trial: {
    title: "Request live access",
    description:
      "Try live EEG and contact quality with Muse S Athena. Enter your email and we’ll confirm the right build for your computer.",
    submit: "Request live access",
    successTitle: "Live access request received",
    successBody: "We’ll email you with the right build and setup steps for your operating system.",
    emailDetail: "Your request covers live EEG and contact quality with Muse S Athena.",
  },
  plus: {
    title: "Request Base access",
    description:
      "Record Muse S Athena EEG locally and export sessions as CSV or EDF. Enter your email and we’ll confirm the right build for your computer.",
    submit: "Request Base access",
    successTitle: "Base access request received",
    successBody: "We’ll email you with the right build and setup steps for your operating system.",
    emailDetail:
      "Your request covers local EEG recording and CSV or EDF export with Muse S Athena.",
  },
  lab: {
    title: "Join the Lab rollout",
    description:
      "Register for LSL, OSC, the HTTP API, and event markers coming next in Lab.",
    submit: "Join the Lab rollout",
    successTitle: "Lab interest registered",
    successBody:
      "We’ll email you with availability and onboarding details as the Lab rollout opens.",
    emailDetail:
      "Your request covers LSL, OSC, the HTTP API, and event markers coming next in Lab.",
  },
  research: {
    title: "Register research interest",
    description:
      "Register your interest in roadmap work for adjustable filtering, reproducible exports, and protocol support.",
    submit: "Register interest",
    successTitle: "Research interest registered",
    successBody:
      "We’ll email you as the research workflow becomes available.",
    emailDetail:
      "Your request covers roadmap work for adjustable filtering, reproducible exports, and protocol support.",
  },
};

export type WaitlistInput = {
  email: string;
  role?: Role | null;
  planIntent?: PlanIntent | null;
  os?: OperatingSystem | null;
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

export function normalizePlanIntent(value: unknown): PlanIntent | null {
  return isPlanIntent(value) ? value : null;
}

export function normalizeOperatingSystem(value: unknown): OperatingSystem | null {
  return typeof value === "string" && (OPERATING_SYSTEMS as readonly string[]).includes(value)
    ? (value as OperatingSystem)
    : null;
}

export function getAccessRequestCopy(intent: unknown): AccessRequestCopy {
  const normalized = normalizePlanIntent(intent);
  return normalized ? ACCESS_COPY_BY_INTENT[normalized] : DEFAULT_ACCESS_COPY;
}

export function shouldSendAccessConfirmation(duplicate: boolean): boolean {
  return !duplicate;
}
