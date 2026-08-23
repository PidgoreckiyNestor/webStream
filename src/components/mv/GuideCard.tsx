import Image from "next/image";
import Link from "next/link";
import { sectionKicker } from "@/components/mv/chrome";
import type { Article } from "@/lib/articles";

const cardClass =
  "flex h-full cursor-pointer flex-col overflow-hidden rounded-md border border-white/10 bg-white/[0.02] transition-colors duration-150 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25";

export function GuideCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const contain = article.shotFit === "contain";

  return (
    <Link href={`/articles/${article.slug}`} className={cardClass}>
      <div className="relative aspect-[16/10] bg-background">
        <Image
          src={article.shot}
          alt={article.shotAlt}
          fill
          className={contain ? "object-contain" : "object-cover"}
          sizes={
            compact
              ? "(min-width: 640px) 20vw, 100vw"
              : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          }
          quality={70}
        />
      </div>
      {compact ? (
        <div className="p-5">
          <p className={sectionKicker}>{article.category}</p>
          <h2 className="mt-2 text-lg font-medium tracking-tight text-white">{article.navTitle}</h2>
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-6">
          <p className={sectionKicker}>{article.category}</p>
          <h2 className="mt-3 text-xl font-medium tracking-tight text-white">{article.navTitle}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/55">{article.dek}</p>
        </div>
      )}
    </Link>
  );
}
