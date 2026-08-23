import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
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
