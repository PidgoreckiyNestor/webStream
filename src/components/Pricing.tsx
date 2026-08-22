import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$14.99",
    blurb: "For individual hobbyists and tinkerers",
    href: "/signup?plan=basic",
    popular: false,
    features: ["Real-Time EEG Visualization", "OSC/LSL/Webhook Streaming"],
  },
  {
    name: "Standard",
    price: "$39.99",
    blurb: "For researchers and developers needing data logging and API access",
    href: "/signup?plan=standard",
    popular: true,
    features: [
      "Real-Time EEG Visualization",
      "OSC/LSL/Webhook Streaming",
      "CSV Data Export",
      "Developer API Access",
    ],
  },
  {
    name: "Advanced",
    price: "$79.99",
    blurb: "For advanced research & development",
    href: "/signup?plan=advanced",
    popular: false,
    features: [
      "Real-Time EEG Visualization",
      "OSC/LSL/Webhook Streaming",
      "CSV Data Export",
      "Developer API Access",
      "Signal Filtering",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-accent border border-white/10">
            Plans for every use case
          </span>
          <h2 className="mt-6 text-4xl font-medium tracking-normal text-white sm:text-5xl">Pricing</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Choose the plan that fits your research needs. All plans include access to the Metrics® desktop app.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.popular
                  ? "relative rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col border-accent/30 bg-white/[0.03] hover:border-accent/50 hover:bg-white/[0.05] shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10"
                  : "relative rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }
            >
              {plan.popular ? (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent border border-accent/30">
                  Most Popular
                </span>
              ) : null}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-medium text-white">{plan.price}</span>
                <span className="ml-1 text-white/50">/month</span>
              </div>
              <p className="mt-2 text-sm text-white/50">{plan.blurb}</p>
              <div className="mt-6 pt-6 border-t border-white/10 flex-1">
                <p className="text-sm font-medium text-white/40 mb-4">What&apos;s included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={plan.href} className="block mt-8">
                <span
                  className={
                    plan.popular
                      ? "inline-flex items-center justify-center font-medium cursor-pointer h-11 rounded-md px-8 text-base w-full transition-all duration-300 bg-accent text-black hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
                      : "inline-flex items-center justify-center font-medium cursor-pointer h-11 rounded-md px-8 text-base w-full transition-all duration-300 bg-white/10 text-white hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg"
                  }
                >
                  Get Started
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
