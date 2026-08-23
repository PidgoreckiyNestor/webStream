import { sectionKicker } from "@/components/mv/chrome";

const tools = [
  { name: "Python", src: "/images/brands/python.svg" },
  { name: "NumPy", src: "/images/brands/numpy.svg" },
  { name: "Jupyter", src: "/images/brands/jupyter.svg" },
  { name: "Unity", src: "/images/brands/unity.svg" },
  { name: "LabVIEW", src: "/images/brands/labview.svg" },
  { name: "Octave", src: "/images/brands/octave.svg" },
  { name: "Arduino", src: "/images/brands/arduino.svg" },
  { name: "Raspberry Pi", src: "/images/brands/raspberrypi.svg" },
  { name: "Blender", src: "/images/brands/blender.svg" },
  { name: "GitHub", src: "/images/brands/github.svg" },
] as const;

export function BrandLogos() {
  return (
    <section className="py-20 sm:py-28" data-mv-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl" data-mv-fade>
          <p className={sectionKicker}>Integrations</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Drops into the stack you already use
          </h2>
          <p className="mt-4 text-lg text-white/50">
            CSV into Python today. LSL and OSC integrations are coming next in Lab.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              data-mv-fade
              className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.02] px-4 py-3.5"
            >
              <img
                src={tool.src}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
                className="h-7 w-7 shrink-0 brightness-0 invert"
              />
              <span className="text-sm font-medium text-white/80">{tool.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
