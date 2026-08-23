import { sectionKicker } from "@/components/mv/chrome";

const roles = [
  {
    title: "Research",
    body: "Millisecond timestamps for neuroscience, psychology, and HCI papers.",
  },
  {
    title: "Build",
    body: "LSL or OSC into your stack, or a CSV into Python, MATLAB, Unity.",
  },
  {
    title: "Teach",
    body: "Live brain data in the room — not a slide of someone else’s plot.",
  },
] as const;

function RoleRow() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
      {roles.map((role) => (
        <div key={role.title} data-mv-fade className="md:px-10 first:md:pl-0 last:md:pr-0">
          <h3 className="text-lg font-medium tracking-tight text-white">{role.title}</h3>
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/45">{role.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ForWhom({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-16" data-mv-reveal>
        <RoleRow />
      </div>
    );
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className={sectionKicker}>Who it’s for</p>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Same desk. Three jobs.
          </h2>
        </div>
        <div className="mt-14">
          <RoleRow />
        </div>
      </div>
    </section>
  );
}
