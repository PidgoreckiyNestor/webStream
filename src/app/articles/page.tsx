import type { Metadata } from "next";
import { GuideCard } from "@/components/mv/GuideCard";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { sectionKicker } from "@/components/mv/chrome";
import { articles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Muse EEG desktop guides — MindVault",
  description:
    "Guides for Muse EEG on a computer: BlueMuse alternatives, direct Athena EEG, contact quality, CSV recording, EDF export, LSL, and OSC.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Muse EEG desktop guides — MindVault",
    description:
      "Guides for Muse EEG on a computer: BlueMuse alternatives, direct Athena streaming, CSV, EDF, LSL, and OSC workflows.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const base = siteUrl();
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Muse EEG desktop guides",
    url: `${base}/articles`,
    isPartOf: { "@type": "WebSite", name: "MindVault", url: base },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${base}/articles/${item.slug}`,
        name: item.title,
      })),
    },
  };

  return (
    <div className="theme-v2 flex min-h-screen flex-col">
      <MvHeader />
      <main id="main-content" className="flex-1 pt-24 pb-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className={sectionKicker}>Guides</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Guides: Muse on Windows, macOS, and Linux
            </h1>
            <p className="mt-4 text-lg text-white/50">
              For people who already have a Muse 2, Muse S, or Muse S Athena and want the hoop on a
              computer. Windows LSL, no phone, or Athena on the desk.
            </p>
          </div>
          <ul className="mt-16 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
              <li key={item.slug}>
                <GuideCard article={item} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <MvFooter />
    </div>
  );
}
