import { ElectrodeArc } from "@/components/mv/ElectrodeArc";
import { ForWhom } from "@/components/mv/ForWhom";
import { sectionKicker } from "@/components/mv/chrome";

const lines = [
  { kHz: "256", unit: "Hz", label: "EEG · TP9 AF7 AF8 TP10" },
  { kHz: "64", unit: "Hz", label: "PPG · Muse 2 / S" },
  { kHz: "52", unit: "Hz", label: "Accel and gyro" },
  { kHz: "1", unit: "ms", label: "Stamp on every sample" },
] as const;

const vsCols = ["Muse app", "Mind Monitor", "BlueMuse", "MindVault"] as const;

const vsRows = [
  { k: "Runs on", cells: ["Phone", "Phone", "Windows", "Windows, macOS, Linux"] },
  { k: "Job", cells: ["Meditation scores", "Graphs + OSC", "LSL bridge", "Live EEG on a desk"] },
  { k: "Phone in the loop", cells: ["Yes", "Yes", "No", "No"] },
  { k: "Out", cells: ["App metrics", "CSV, OSC", "LSL", "CSV, EDF · LSL, OSC (Lab)"] },
  { k: "EEG rate", cells: ["Hidden", "256 Hz if Constant", "256 Hz", "256 Hz"] },
  { k: "Athena", cells: ["Meditation", "Yes", "Experimental", "Yes"] },
  { k: "macOS / Linux", cells: ["—", "—", "No", "Yes"] },
] as const;

function CompareTable() {
  const ours = vsCols.length - 1;
  return (
    <div className="mt-16" data-mv-reveal>
      <p className={sectionKicker} data-mv-fade>
        Compare
      </p>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/45" data-mv-fade>
        The meditation app. The phone raw-data app. The Windows LSL bridge. Then a desk.
      </p>
      <div className="mt-6 overflow-x-auto" data-mv-fade>
        <table className="w-full min-w-[44rem] text-left text-sm text-white/55">
          <caption className="sr-only">
            Muse app vs Mind Monitor vs BlueMuse vs MindVault
          </caption>
          <thead>
            <tr className="border-b border-white/10 text-[13px] font-medium tracking-wide text-white/55">
              <th scope="col" className="py-3 pr-4 font-medium">
                <span className="sr-only">Feature</span>
              </th>
              {vsCols.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`py-3 pr-4 font-medium last:pr-0 ${i === ours ? "text-white" : "text-white/70"}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {vsRows.map((row) => (
              <tr key={row.k}>
                <th scope="row" className="py-3 pr-4 font-normal text-white/55">
                  {row.k}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.k}-${vsCols[i]}`}
                    className={`py-3 pr-4 last:pr-0 ${i === ours ? "text-white" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-[13px] text-white/55" data-mv-fade>
        MindVault does not replace Muse meditation or Mind Monitor on a phone. It puts the hoop on a
        desk — no BlueMuse, no dongle. LSL and OSC ship on Lab.
      </p>
    </div>
  );
}

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
              <dd className="shrink-0 text-sm font-medium text-white">CSV · EDF · LSL · OSC</dd>
            </div>
          </dl>
        </div>

        <ForWhom />

        <CompareTable />
      </div>
    </section>
  );
}
