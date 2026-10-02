import type { MetadataRoute } from "next";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PERSONAL_INFO.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${PERSONAL_INFO.siteUrl}/journey`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8
    }
  ];
}
