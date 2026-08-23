import type { Metadata } from "next";
import Link from "next/link";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Guides — MindVault",
  description:
    "Muse EEG on a computer: BlueMuse alternative, no phone app, Muse S Athena on desktop. Waitlist for Lab beta.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="theme-v2 flex min-h-screen flex-col">
      <MvHeader />
      <main id="main-content" className="flex-1 pt-24 pb-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-[13px] font-medium tracking-wide text-white/55">Guides</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white">
            Muse EEG on a desk.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            Short notes for people who already have a Muse hoop and want it on a computer.
            Lab beta is a waitlist — not a public installer.
          </p>
          <ul className="mt-12 space-y-8">
            {articles.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/articles/${item.slug}`}
                  className="group block rounded-md border border-white/10 bg-white/[0.02] p-6 hover:border-white/20"
                >
                  <h2 className="text-xl font-medium tracking-tight text-white group-hover:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/55">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <MvFooter />
    </div>
  );
}
