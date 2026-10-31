import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Providers } from "@/components/Providers";
import Home from "@/app/page";
import { getAllProjectSchemas } from "@/lib/projects";
import {
  buildPortfolioJsonLd,
  serializeJsonLd,
  SITE_URL,
  PERSON_ID,
  WEBSITE_ID,
  PROFILE_PAGE_ID,
  PROJECTS_LIST_ID,
} from "@/lib/structured-data";
import { generateLlmsTxt, generateLlmsFullTxt } from "@/lib/llms-content";
import { GET as getLlmsTxt } from "@/app/llms.txt/route";
import { GET as getLlmsFullTxt } from "@/app/llms-full.txt/route";
import OpenGraphImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from "@/app/opengraph-image";
import robots, { AI_SEARCH_CRAWLERS } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { metadata } from "@/app/layout";

describe("Fase 1: SEO & GEO — Grafo JSON-LD (schema.org @graph)", () => {
  it("deve construir um grafo schema.org válido com WebSite, ProfilePage, Person e ItemList dos 6 projetos", () => {
    const schemas = getAllProjectSchemas();
    const jsonLd = buildPortfolioJsonLd(schemas);

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(Array.isArray(jsonLd["@graph"])).toBe(true);
    expect(jsonLd["@graph"]).toHaveLength(4);

    const [website, profilePage, person, itemList] = jsonLd["@graph"];

    expect(website["@type"]).toBe("WebSite");
    expect(website["@id"]).toBe(WEBSITE_ID);
    expect(website.url).toBe(SITE_URL);

    expect(profilePage["@type"]).toBe("ProfilePage");
    expect(profilePage["@id"]).toBe(PROFILE_PAGE_ID);
    expect(profilePage.mainEntity).toEqual({ "@id": PERSON_ID });

    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe(PERSON_ID);
    expect(person.name).toBe("Murilo Alves");
    expect(person.alternateName).toBe("Nubi-Prey");
    expect(person.sameAs).toEqual([
      "https://github.com/Nubi-Prey",
      "https://www.linkedin.com/in/murilo-alves-np/",
    ]);

    expect(itemList["@type"]).toBe("ItemList");
    expect(itemList["@id"]).toBe(PROJECTS_LIST_ID);
    expect(itemList.numberOfItems).toBe(6);

    const elements = itemList.itemListElement as Array<{
      "@type": string;
      position: number;
      item: Record<string, unknown>;
    }>;
    expect(elements).toHaveLength(6);

    schemas.forEach((schema, idx) => {
      const entry = elements[idx];
      expect(entry["@type"]).toBe("ListItem");
      expect(entry.position).toBe(idx + 1);
      expect(entry.item["@type"]).toBe("SoftwareSourceCode");
      expect(entry.item["@id"]).toBe(`${SITE_URL}/#project-${schema.id}`);
      expect(entry.item.name).toBe(schema.locales.pt_BR.title);
      expect(entry.item.alternateName).toBe(schema.locales.en_US.title);
      expect(entry.item.codeRepository).toBe(schema.links.github);
      expect(entry.item.author).toEqual({ "@id": PERSON_ID });
    });
  });

  it("deve sanitizar caracteres '<' em \\u003c ao serializar o JSON-LD para prevenir injeção de script", () => {
    const schemas = getAllProjectSchemas();
    const jsonLd = buildPortfolioJsonLd(schemas);
    const serialized = serializeJsonLd(jsonLd);

    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual(jsonLd);
  });

  it("deve injetar <script type='application/ld+json'> no DOM renderizado pela Home()", async () => {
    const page = await Home();
    const { container } = render(React.createElement(Providers, null, page));

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(scriptTag).not.toBeNull();

    const parsed = JSON.parse(scriptTag?.innerHTML ?? "{}");
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"]).toHaveLength(4);
  });
});

describe("Fase 2: AI SEO & GEO — Endpoints /llms.txt e /llms-full.txt", () => {
  it("deve gerar /llms.txt com resumo bilíngue, competências, 6 projetos e link para /llms-full.txt", async () => {
    const response = await getLlmsTxt();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/plain");

    const text = await response.text();
    expect(text).toContain("# Murilo Alves // Software & Systems Engineer");
    expect(text).toContain(`${SITE_URL}/llms-full.txt`);

    const schemas = getAllProjectSchemas();
    for (const schema of schemas) {
      expect(text).toContain(schema.casing);
      expect(text).toContain(schema.links.github);
      expect(text).toContain(schema.locales.en_US.tagline);
      expect(text).toContain(schema.locales.pt_BR.tagline);
    }
  });

  it("deve gerar /llms-full.txt expondo 100% dos taglines e highlights bilíngues (PT-BR e EN-US) do Schema v2", async () => {
    const response = await getLlmsFullTxt();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/plain");

    const fullText = await response.text();
    const schemas = getAllProjectSchemas();
    expect(fullText).toBe(generateLlmsFullTxt(schemas));
    expect(generateLlmsTxt(schemas)).toContain("Featured Audited Repositories");

    for (const schema of schemas) {
      expect(fullText).toContain(schema.casing);
      expect(fullText).toContain(schema.locales.pt_BR.title);
      expect(fullText).toContain(schema.locales.en_US.title);
      expect(fullText).toContain(schema.locales.pt_BR.tagline);
      expect(fullText).toContain(schema.locales.en_US.tagline);
      expect(fullText).toContain(schema.locales.pt_BR.description);
      expect(fullText).toContain(schema.locales.en_US.description);

      for (const ptHighlight of schema.locales.pt_BR.highlights) {
        expect(fullText).toContain(ptHighlight);
      }
      for (const enHighlight of schema.locales.en_US.highlights) {
        expect(fullText).toContain(enHighlight);
      }
    }
  });
});

describe("Fase 3: OpenGraph & Twitter Image Dinâmica (next/og)", () => {
  it("deve exportar metadados 1200x630 PNG e instanciar ImageResponse com a identidade Cyber-Industrial", () => {
    expect(ogSize).toEqual({ width: 1200, height: 630 });
    expect(ogContentType).toBe("image/png");
    expect(ogAlt).toContain("Murilo Alves");

    const response = OpenGraphImage();
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);
  });
});

describe("Fase 4: Alinhamento de Idioma, Metadados e Diretivas para AI Crawlers", () => {
  it("deve permitir explicitamente os crawlers de IA (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) em robots.ts", () => {
    const config = robots();
    expect(Array.isArray(config.rules)).toBe(true);
    expect(AI_SEARCH_CRAWLERS).toEqual(
      expect.arrayContaining([
        "GPTBot",
        "OAI-SearchBot",
        "ChatGPT-User",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
      ])
    );

    const rulesArray = config.rules as Array<{
      userAgent: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
    }>;

    const aiRule = rulesArray.find((r) => Array.isArray(r.userAgent));
    expect(aiRule).toBeDefined();
    expect(aiRule?.allow).toEqual(["/", "/llms.txt", "/llms-full.txt"]);
    expect(aiRule?.disallow).toBe("/api/");
  });

  it("deve indexar /, /llms.txt e /llms-full.txt no sitemap.xml e expor keywords e authors em layout.tsx", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      "https://muriloalves.dev",
      "https://muriloalves.dev/llms.txt",
      "https://muriloalves.dev/llms-full.txt",
    ]);

    expect(Array.isArray(metadata.keywords)).toBe(true);
    expect(metadata.keywords).toContain("Murilo Alves");
    expect(metadata.keywords).toContain("Nubi-Prey");
    expect(metadata.creator).toBe("Murilo Alves");
  });
});



