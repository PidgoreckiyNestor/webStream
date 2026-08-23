import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/mv/GuideCard";
import { InPageAnchor } from "@/components/mv/InPageAnchor";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { WaitlistOpen } from "@/components/mv/Waitlist";
import { sectionKicker } from "@/components/mv/chrome";
import {
  articleBySlug,
  articleWordCount,
  articles,
  formatArticleDate,
  type ArticleTable,
} from "@/lib/articles";
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
  const title = `${article.metaTitle ?? article.title} — MindVault`;
  return {
    title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title,
      description: article.description,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.shot }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [article.shot],
    },
  };
}

function ArticleText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={index}>{part}</span>;
        const [, label, href] = match;
        if (href.startsWith("/#")) {
          return (
            <InPageAnchor key={index} targetId={href.slice(2)} className="text-white/90 hover:text-white">
              {label}
            </InPageAnchor>
          );
        }
        return (
          <Link key={index} href={href} className="text-white/90 hover:text-white">
            {label}
          </Link>
        );
      })}
    </>
  );
}

function CompareTable({ table }: { table: ArticleTable }) {
  const minWidthClass =
    table.columns.length >= 7
      ? "min-w-[72rem]"
      : table.columns.length >= 5
        ? "min-w-[56rem]"
        : "min-w-[28rem]";

  return (
    <div className="mt-6 overflow-x-auto">
      <table className={`w-full ${minWidthClass} text-left text-sm text-white/55`}>
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr className="border-b border-white/10 text-[13px] font-medium tracking-wide text-white/55">
            <th scope="col" className="py-3 pr-4 font-medium">
              <span className="sr-only">Feature</span>
            </th>
            {table.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={
                  index === table.highlight
                    ? "py-3 pr-4 font-medium text-white last:pr-0"
                    : "py-3 pr-4 font-medium text-white/70 last:pr-0"
                }
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {table.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="py-3 pr-4 font-normal text-white/55">
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={`${row.label}-${table.columns[index]}`}
                  className={
                    index === table.highlight
                      ? "py-3 pr-4 text-white last:pr-0"
                      : "py-3 pr-4 last:pr-0"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const url = `${siteUrl()}/articles/${article.slug}`;
  const related = articles.filter((item) => item.slug !== article.slug);
  const minutes = Math.max(1, Math.round(articleWordCount(article) / 200));

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
              dateModified: article.date,
              description: article.description,
              image: `${siteUrl()}${article.shot}`,
              url,
              mainEntityOfPage: url,
              publisher: { "@type": "Organization", name: "MindVault", url: siteUrl() },
            }),
          }}
        />
        {article.faqs && article.faqs.length > 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: article.faqs.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />
        ) : null}
        <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <p className={sectionKicker}>
              <Link href="/articles" className="hover:text-white">
                Guides
              </Link>
              <span className="text-white/25"> · </span>
              {article.category}
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-[13px] text-white/55">
              {formatArticleDate(article.date)}
              <span> · </span>
              {minutes} min
            </p>
            <p className="mt-5 text-lg text-white/50">{article.dek}</p>
          </header>
          <figure className="relative mt-8 h-56 overflow-hidden rounded-md border border-white/10 bg-background sm:h-80 lg:h-[380px]">
            <Image
              src={article.shot}
              alt={article.shotAlt}
              fill
              className={
                article.shotFit === "cover"
                  ? "object-cover"
                  : "object-contain p-4 sm:p-6"
              }
              sizes="(min-width: 1280px) 1200px, 100vw"
              quality={70}
              priority
            />
          </figure>
          <div className="mx-auto mt-10 max-w-2xl">
            {article.sections.map((section) => (
              <section key={section.heading ?? section.paragraphs[0]} className="mt-8 first:mt-0">
                {section.heading ? (
                  <h2 className="text-xl font-medium tracking-tight text-white">{section.heading}</h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-4 text-[15px] leading-relaxed text-white/55">
                    <ArticleText text={paragraph} />
                  </p>
                ))}
                {section.table ? <CompareTable table={section.table} /> : null}
              </section>
            ))}
            {article.availability ? (
              <p className="mt-8 text-[15px] leading-relaxed text-white/55">{article.availability}</p>
            ) : null}
            {article.faqs && article.faqs.length > 0 ? (
              <section className="mt-12">
                <h2 className="text-xl font-medium tracking-tight text-white">FAQ</h2>
                <dl className="mt-6 space-y-6">
                  {article.faqs.map((item) => (
                    <div key={item.q}>
                      <dt className="text-[15px] font-medium tracking-tight text-white">{item.q}</dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-white/55">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            <p className="mt-12 text-[15px] leading-relaxed text-white/55">
              {article.cta ? (
                <>
                  <WaitlistOpen className="cursor-pointer text-white/90 hover:text-white">
                    {article.cta.action}
                  </WaitlistOpen>
                  {`. ${article.cta.body}`}
                </>
              ) : (
                <>
                  <WaitlistOpen className="cursor-pointer text-white/90 hover:text-white">
                    Request Athena access
                  </WaitlistOpen>{" "}
                  — start with live EEG, contact quality, CSV, and EDF; add LSL and OSC with Lab.
                </>
              )}
            </p>
          </div>
          {related.length > 0 ? (
            <section className="mx-auto mt-20 max-w-2xl border-t border-white/10 pt-12">
              <h2 className={sectionKicker}>More guides</h2>
              <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <GuideCard article={item} compact />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <MvFooter />
    </div>
  );
}
