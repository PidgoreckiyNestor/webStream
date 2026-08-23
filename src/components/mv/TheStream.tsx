import { ElectrodeArc } from "@/components/mv/ElectrodeArc";
import { ForWhom } from "@/components/mv/ForWhom";
import { sectionKicker } from "@/components/mv/chrome";

const lines = [
  { kHz: "256", unit: "Hz", label: "EEG · TP9 AF7 AF8 TP10" },
  { kHz: "64", unit: "Hz", label: "PPG · heart" },
  { kHz: "52", unit: "Hz", label: "Accel and gyro" },
  { kHz: "1", unit: "ms", label: "Stamp on every sample" },
] as const;

export function TheStream() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="features" className="max-w-2xl scroll-mt-[5.25rem]" data-mv-reveal>
          <div data-mv-fade>
            <p className={sectionKicker}>On the wire</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              The whole stream, on a desk.
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Muse already measures this. The phone app keeps most of it. We put every channel on the computer,
              on one clock.
            </p>
          </div>
        </div>

        <div
          className="mt-14 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16"
          data-mv-reveal
        >
          <div data-mv-fade>
            <ElectrodeArc />
          </div>

          <dl className="divide-y divide-white/10" data-mv-fade>
            {lines.map((line) => (
              <div key={line.label} className="flex items-baseline justify-between gap-6 py-5 first:pt-0 last:pb-0">
                <dt className="text-sm text-white/50">{line.label}</dt>
                <dd className="shrink-0 font-medium tabular-nums tracking-tight text-white">
                  <span className="text-3xl sm:text-4xl">{line.kHz}</span>
                  <span className="ml-1.5 text-sm text-white/40">{line.unit}</span>
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-5">
              <dt className="text-sm text-white/50">Leave as a file, or stay live</dt>
              <dd className="shrink-0 text-sm font-medium text-white">CSV · LSL · OSC</dd>
            </div>
          </dl>
        </div>

        <ForWhom compact />
      </div>
    </section>
  );
}
