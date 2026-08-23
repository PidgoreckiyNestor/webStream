import { WaitlistOpen } from "@/components/mv/Waitlist";

const platforms = [
  { name: "Windows", src: "/images/brands/windows.svg", os: "windows" },
  { name: "macOS", src: "/images/brands/apple.svg", os: "macos" },
  { name: "Linux", src: "/images/brands/linux.svg", os: "linux" },
] as const;

export function PlatformBadges() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {platforms.map(({ name, src, os }) => (
        <li key={name}>
          <WaitlistOpen
            intent="lab"
            os={os}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors duration-150 hover:bg-white/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <img src={src} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
            {name}
          </WaitlistOpen>
        </li>
      ))}
    </ul>
  );
}
