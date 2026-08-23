import { InPageAnchor } from "@/components/mv/InPageAnchor";

const platforms = [
  { name: "Windows", src: "/images/brands/windows.svg" },
  { name: "macOS", src: "/images/brands/apple.svg" },
  { name: "Linux", src: "/images/brands/linux.svg" },
] as const;

export function PlatformBadges() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {platforms.map(({ name, src }) => (
        <li key={name}>
          <InPageAnchor
            targetId="pricing"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <img src={src} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            {name}
          </InPageAnchor>
        </li>
      ))}
    </ul>
  );
}
