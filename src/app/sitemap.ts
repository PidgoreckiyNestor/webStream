import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const posts = articles.map((item) => ({
    url: `${base}/articles/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts,
    {
      url: `${base}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.3,
    },
    {
      url: `${base}/pricing.md`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
