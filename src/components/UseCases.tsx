import { Code, FlaskConical, GraduationCap } from "lucide-react";

const cases = [
  {
    icon: FlaskConical,
    title: "Research",
    body: "Publication-grade data collection for neuroscience, psychology, and HCI research.",
  },
  {
    icon: Code,
    title: "Development",
    body: "Build brain-computer interfaces, meditation apps, and neurofeedback systems.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "Teach neuroscience concepts with live demonstrations of brain activity.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-8 sm:p-12">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-accent border border-white/10">
              Use Cases
            </span>
            <h2 className="mt-6 text-4xl font-medium tracking-normal text-white sm:text-5xl">
              Solutions for every industry
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-3xl">
              Metrics® has been used around the world in university labs, interactive science exhibits,
              enterprise applications, simulations, virtual reality, gaming, art installations, music
              production, user and product research studies, robotics, and other Internet-connected devices.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {cases.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary-muted">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
