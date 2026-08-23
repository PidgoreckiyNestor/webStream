import { sectionKicker } from "@/components/mv/chrome";
import { WaitlistOpen } from "@/components/mv/Waitlist";
import type { PlanIntent } from "@/lib/waitlist";

const mindvaultPlans = [
  {
    name: "Trial",
    price: "30 min",
    period: "",
    who: "",
    blurb: "Put the hoop on. See if the stream is real.",
    intent: "trial" as PlanIntent,
    cta: "Download",
    popular: false,
    ghost: true,
    features: ["30 minutes live", "Contact quality", "Bands on the live view"],
  },
  {
    name: "Plus",
    price: "$19",
    period: "/mo",
    who: "",
    blurb: "Keep the session. Analyse it after.",
    intent: "plus" as PlanIntent,
    cta: "Get Plus",
    popular: false,
    ghost: false,
    features: ["Unlimited live", "Local recording", "CSV and EDF export"],
  },
  {
    name: "Lab",
    price: "$49",
    period: "/mo",
    who: "For the experiment",
    blurb: "Pipe the stream live. Mark the events as they happen.",
    intent: "lab" as PlanIntent,
    cta: "Get Lab",
    popular: true,
    ghost: false,
    features: ["Everything in Plus", "LSL and OSC", "HTTP API", "Event markers"],
  },
  {
    name: "Research",
    price: "$99",
    period: "/mo",
    who: "For the paper",
    blurb: "Lab, plus notch and bandpass when the figure has to be clean.",
    intent: "research" as PlanIntent,
    cta: "Get Research",
    popular: false,
    ghost: false,
    features: ["Everything in Lab", "Notch and bandpass", "Cleaner trace for export"],
  },
] as const;

function planCardClass(plan: { ghost: boolean }) {
  if (plan.ghost) {
    return "flex h-full flex-col rounded-md border border-dashed border-white/15 bg-transparent p-6";
  }
  return "flex h-full flex-col rounded-md border border-white/10 bg-white/[0.02] p-6";
}

function PlanBody({ plan }: { plan: (typeof mindvaultPlans)[number] }) {
  return (
    <>
      <h3 className="text-xl font-medium tracking-tight text-white">
        {plan.name}
        {plan.popular ? <span className="sr-only">, recommended</span> : null}
      </h3>
      <p className="mt-1 min-h-[1.25rem] text-[13px] font-medium tracking-wide text-white/55">
        {plan.who || "\u00a0"}
      </p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-medium tracking-tight text-white">{plan.price}</span>
        {plan.period ? <span className="text-sm text-white/55">{plan.period}</span> : null}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-white/55">{plan.blurb}</p>
      <ul role="list" className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="text-sm text-white/55">
            {feature}
          </li>
        ))}
      </ul>
      <WaitlistOpen
        intent={plan.intent}
        className={
          plan.popular
            ? "mt-8 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            : "mt-8 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-white/15 text-sm font-medium text-white/90 transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        }
      >
        {plan.cta}
      </WaitlistOpen>
    </>
  );
}

export function Pricing() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="pricing" className="max-w-2xl scroll-mt-[5.25rem]" data-mv-reveal>
          <div data-mv-fade>
            <p className={sectionKicker}>Plans</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Thirty minutes on the desk. Then pick a plan.
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Connect Muse and watch the live view. Analysis, live-out, and filters sit on a plan.
            </p>
            <p className="mt-3 text-sm text-white/55">Built for researchers and practitioners.</p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" data-mv-reveal>
          {mindvaultPlans.map((plan) => (
            <div
              key={plan.name}
              data-mv-fade
              className={plan.popular ? "plan-glow flex h-full flex-col rounded-md p-6" : planCardClass(plan)}
            >
              <PlanBody plan={plan} />
            </div>
          ))}
        </div>
        <p className="mt-8 text-[13px] text-white/55" data-mv-reveal>
          <span data-mv-fade>All plans: TP9 AF7 AF8 TP10 · 256 Hz</span>
        </p>
      </div>
    </section>
  );
}
