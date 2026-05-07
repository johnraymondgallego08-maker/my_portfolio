import type { MetadataRoute } from "next";
import { getLogSlugs } from "@/lib/logs";
import { getProjectIds } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectRoutes = getProjectIds().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));
  const logRoutes = (await getLogSlugs()).map((slug) => ({
    url: `${siteUrl}/logs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...projectRoutes,
    ...logRoutes
  ];
}
