import type { MetadataRoute } from "next";

export const AI_SEARCH_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: "/api/",
      },
      {
        userAgent: AI_SEARCH_CRAWLERS,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: "/api/",
      },
    ],
    host: "https://muriloalves.dev",
    sitemap: "https://muriloalves.dev/sitemap.xml",
  };
}
