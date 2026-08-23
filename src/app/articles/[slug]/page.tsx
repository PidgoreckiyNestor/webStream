import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { articleBySlug, articles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — MindVault`,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const url = `${siteUrl()}/articles/${article.slug}`;

  return (
    <div className="theme-v2 flex min-h-screen flex-col">
      <MvHeader />
      <main id="main-content" className="flex-1 pt-24 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              datePublished: article.date,
              description: article.description,
              url,
              publisher: { "@type": "Organization", name: "MindVault", url: siteUrl() },
            }),
          }}
        />
        <article className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-[13px] font-medium tracking-wide text-white/55">
            <Link href="/articles" className="hover:text-white">
              Guides
            </Link>
          </p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white">{article.title}</h1>
          {article.sections.map((section) => (
            <section key={section.heading ?? section.paragraphs[0]} className="mt-8">
              {section.heading ? (
                <h2 className="text-xl font-medium tracking-tight text-white">{section.heading}</h2>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-[15px] leading-relaxed text-white/55">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 text-[15px] leading-relaxed text-white/55">
            <Link href="/#pricing" className="text-white hover:underline">
              Pick a plan
            </Link>{" "}
            — 30 minutes live, then Base, Lab, or Research. Waitlist for the Lab beta.
          </p>
        </article>
      </main>
      <MvFooter />
    </div>
  );
}
