"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { btnGhost, btnSolid } from "@/components/mv/chrome";
import { fireWaitlistConversion, readGoogleAdsClick } from "@/lib/google-ads";
import {
  getAccessRequestCopy,
  normalizeOperatingSystem,
  normalizePlanIntent,
  OPERATING_SYSTEMS,
  ROLES,
  type OperatingSystem,
  type PlanIntent,
  type Role,
} from "@/lib/waitlist";

type OpenOpts = { intent?: PlanIntent | null; os?: OperatingSystem | null };

type WaitlistContextValue = {
  open: (opts?: OpenOpts) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("WaitlistProvider missing");
  return ctx;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<OpenOpts | null>(null);

  return (
    <WaitlistContext.Provider value={{ open: (next) => setOpts(next ?? {}) }}>
      {children}
      {opts ? <WaitlistModal opts={opts} onClose={() => setOpts(null)} /> : null}
    </WaitlistContext.Provider>
  );
}

export function WaitlistOpen({
  intent,
  os,
  className,
  children,
  onClick,
}: {
  intent?: PlanIntent;
  os?: OperatingSystem;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        open({ intent, os });
      }}
    >
      {children}
    </button>
  );
}

const roleLabel: Record<Role, string> = {
  research: "Research",
  build: "App development",
  teach: "Teaching",
};

function readUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const stored = readGoogleAdsClick();
  return {
    utmSource: params.get("utm_source") || stored?.utmSource || null,
    utmMedium: params.get("utm_medium") || stored?.utmMedium || null,
    utmCampaign: params.get("utm_campaign") || stored?.utmCampaign || null,
    referrer: document.referrer || null,
  };
}

function WaitlistModal({ opts, onClose }: { opts: OpenOpts; onClose: () => void }) {
  const titleId = useId();
  const osErrorId = useId();
  const copy = getAccessRequestCopy(opts.intent);
  const [email, setEmail] = useState("");
  const [os, setOs] = useState<OperatingSystem | null>(() => normalizeOperatingSystem(opts.os));
  const [role, setRole] = useState<Role | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasOsError = error === "Choose your operating system.";

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending || done) return;
    if (!os) {
      setError("Choose your operating system.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const result = await joinWaitlist({
        email,
        role,
        planIntent: normalizePlanIntent(opts.intent),
        os,
        honeypot,
        ...readUtms(),
      });
      if (!result.ok) {
        setError(
          result.error === "not_configured"
            ? "Access requests are temporarily unavailable. Please try again shortly."
            : result.error === "invalid_os"
              ? "Choose your operating system."
            : result.error === "invalid"
              ? "That email doesn’t look right."
              : "Couldn’t send the request. Try again.",
        );
        return;
      }
      setDone(true);
      if (!honeypot && !result.duplicate) fireWaitlistConversion();
    } catch {
      setError("Couldn’t send the request. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/60 cursor-pointer"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-md border border-white/10 bg-[#0c0d12] p-6 shadow-2xl"
      >
        {done ? (
          <div>
            <h2 id={titleId} className="text-xl font-medium tracking-tight text-white">
              {copy.successTitle}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/50">
              {copy.successBody}
            </p>
            <button type="button" className={`${btnSolid} mt-6 w-full`} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 id={titleId} className="text-xl font-medium tracking-tight text-white">
              {copy.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/50">
              {copy.description}
            </p>
            <label className="mt-6 block text-[13px] text-white/65" htmlFor="waitlist-email">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-white/30"
            />
            <fieldset
              className="mt-5"
              aria-invalid={hasOsError || undefined}
              aria-describedby={hasOsError ? osErrorId : undefined}
            >
              <legend className="text-[13px] text-white/65">Operating system</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {OPERATING_SYSTEMS.map((item) => (
                  <label key={item} className="cursor-pointer">
                    <input
                      type="radio"
                      name="waitlist-os"
                      value={item}
                      required
                      checked={os === item}
                      onInvalid={(event) => {
                        event.preventDefault();
                        setError("Choose your operating system.");
                      }}
                      onChange={() => {
                        setOs(item);
                        setError(null);
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={
                        os === item
                          ? "inline-flex h-8 items-center rounded-md bg-white px-3 text-[13px] font-medium text-black peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-white/40"
                          : `${btnGhost} peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-white/25`
                      }
                    >
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="mt-5 text-[13px] text-white/65">How will you use MindVault? (optional)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ROLES.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={role === item}
                  onClick={() => setRole((current) => (current === item ? null : item))}
                  className={
                    role === item
                      ? "inline-flex h-8 items-center rounded-md bg-white px-3 text-[13px] font-medium text-black cursor-pointer"
                      : `${btnGhost}`
                  }
                >
                  {roleLabel[item]}
                </button>
              ))}
            </div>
            <div className="hidden" aria-hidden>
              <label htmlFor="waitlist-company">Company</label>
              <input
                id="waitlist-company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>
            {error ? (
              <p
                id={hasOsError ? osErrorId : undefined}
                role="alert"
                className="mt-4 text-[13px] text-red-400"
              >
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={pending} className={`${btnSolid} mt-6 w-full disabled:opacity-50`}>
              {pending ? "Sending…" : copy.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
