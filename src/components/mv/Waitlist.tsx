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
import { PLAN_INTENTS, ROLES, type PlanIntent, type Role } from "@/lib/waitlist";

type OpenOpts = { intent?: PlanIntent | null; os?: string | null };

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
  os?: string;
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
  build: "Build",
  teach: "Teach",
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
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setPending(true);
    setError(null);
    try {
      const result = await joinWaitlist({
        email,
        role,
        planIntent: opts.intent && PLAN_INTENTS.includes(opts.intent) ? opts.intent : "lab",
        os: opts.os,
        honeypot,
        ...readUtms(),
      });
      if (!result.ok) {
        setError(
          result.error === "not_configured"
            ? "Waitlist isn’t wired yet."
            : result.error === "invalid"
              ? "That email doesn’t look right."
              : "Couldn’t join. Try again.",
        );
        return;
      }
      setDone(true);
      if (!honeypot && !result.duplicate) fireWaitlistConversion();
    } catch {
      setError("Couldn’t join. Try again.");
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
        className="relative z-10 w-full max-w-md rounded-md border border-white/10 bg-[#0c0d12] p-6 shadow-2xl"
      >
        {done ? (
          <div>
            <h2 id={titleId} className="text-xl font-medium tracking-tight text-white">
              You’re on the list.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/50">
              We’ll write when the Lab beta opens — LSL, OSC, API, and markers.
            </p>
            <button type="button" className={`${btnSolid} mt-6 w-full`} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <h2 id={titleId} className="text-xl font-medium tracking-tight text-white">
              Join the Lab beta
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-white/50">
              Email when Lab opens. One field. We’ll send a note, not a newsletter.
            </p>
            <label className="mt-6 block text-[13px] text-white/65" htmlFor="waitlist-email">
              Email
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
            <p className="mt-5 text-[13px] text-white/65">What you do (optional)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ROLES.map((item) => (
                <button
                  key={item}
                  type="button"
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
            {error ? <p className="mt-4 text-[13px] text-red-400">{error}</p> : null}
            <button type="submit" disabled={pending} className={`${btnSolid} mt-6 w-full disabled:opacity-50`}>
              {pending ? "Joining…" : "Join Lab beta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
