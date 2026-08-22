const tools = [
  "Unity",
  "PsychoPy",
  "MuseLSL",
  "Arduino",
  "TouchDesigner",
  "Raspberry Pi",
  "IFTTT",
  "LIFX",
  "neuromore",
  "Max/MSP",
];

export function Integrations() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-accent border border-white/10">
            Integrations
          </span>
          <h2 className="mt-6 text-4xl font-medium tracking-normal text-white sm:text-5xl">
            Works with your favorite tools
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">Integrate with popular software programs.</p>
        </div>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {tools.map((tool) => (
            <div
              key={tool}
              className="flex items-center justify-center px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] w-full"
            >
              <span className="text-white/70 font-medium">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
