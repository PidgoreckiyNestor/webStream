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
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/55">{role.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ForWhom() {
  return (
    <div className="mt-16" data-mv-reveal>
      <RoleRow />
    </div>
  );
}
