import Link from "next/link";

const items = [
  { href: "/v1", id: "v1", label: "V1" },
  { href: "/v2", id: "v2", label: "V2" },
  { href: "/v3", id: "v3", label: "V3" },
  { href: "/v4", id: "v4", label: "V4" },
  { href: "/v5", id: "centered", label: "Center" },
  { href: "/shot/fade", id: "fade", label: "Fade" },
  { href: "/shot/dots", id: "dots", label: "Dots" },
  { href: "/shot/stack", id: "stack", label: "Stack" },
  { href: "/shot/captions", id: "captions", label: "Labels" },
  { href: "/", id: "all", label: "All" },
];

export function VariantBar({ active }: { active: string }) {
  return (
    <nav
      aria-label="Design variants"
      className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 flex gap-1 rounded-full border border-white/10 bg-black/80 px-1.5 py-1.5 backdrop-blur-md"
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            active === item.id
              ? "bg-white text-black"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
