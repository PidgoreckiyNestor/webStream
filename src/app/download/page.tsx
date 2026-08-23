import Link from "next/link";
import { btnGhost, btnSolid } from "@/components/mv/chrome";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";

const platforms = [
  { name: "Windows", src: "/images/brands/windows.svg", href: "/signup?os=windows" },
  { name: "macOS", src: "/images/brands/apple.svg", href: "/signup?os=macos" },
  { name: "Linux", src: "/images/brands/linux.svg", href: "/signup?os=linux" },
] as const;

export default function DownloadPage() {
  return (
    <div className="theme-v2 flex min-h-screen flex-col">
      <MvHeader />
      <main id="main-content" className="flex-1 pt-28 pb-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-medium tracking-wide text-white/40">Desktop app</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">Get MindVault</h1>
          <p className="mt-4 text-lg text-white/50">Windows, macOS, and Linux. Pick your platform.</p>
          <ul className="mt-10 flex flex-col gap-3">
            {platforms.map((platform) => (
              <li key={platform.name}>
                <Link
                  href={platform.href}
                  className="flex h-12 items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.03] text-sm font-medium text-white transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.06] cursor-pointer"
                >
                  <img src={platform.src} alt="" width={18} height={18} className="h-[18px] w-[18px] brightness-0 invert" />
                  {platform.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/40">Study mock — builds are not live yet.</p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <Link href="/#pricing" className={btnSolid}>
              See plans
            </Link>
            <Link href="/" className={btnGhost}>
              Back
            </Link>
          </div>
        </div>
      </main>
      <MvFooter />
    </div>
  );
}
