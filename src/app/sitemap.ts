import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://muriloalves.dev",
      lastModified: new Date("2026-10-30"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
