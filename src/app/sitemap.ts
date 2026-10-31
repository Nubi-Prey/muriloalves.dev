import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-30");

  return [
    {
      url: "https://muriloalves.dev",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://muriloalves.dev/llms.txt",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://muriloalves.dev/llms-full.txt",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
