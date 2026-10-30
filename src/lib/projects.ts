import { Locale, ProjectData } from "@/i18n/types";
import {
  LocalizedProjectMetadata,
  PortfolioProjectSchemaV2,
  ProjectCategoryKey,
} from "@/types/project-schema";

import mineosRaw from "../../docs/portfolio_json_configs/MineOS.portfolio.json";
import engraverRaw from "../../docs/portfolio_json_configs/Engraver.portfolio.json";
import lupaRaw from "../../docs/portfolio_json_configs/lupa.portfolio.json";
import estoquelentesRaw from "../../docs/portfolio_json_configs/estoquelentes.portfolio.json";
import astolfoBotRaw from "../../docs/portfolio_json_configs/Astolfo-bot.portfolio.json";
import nubiLiveRaw from "../../docs/portfolio_json_configs/Nubi.live.portfolio.json";

const VALID_CATEGORY_KEYS: ReadonlySet<ProjectCategoryKey> = new Set([
  "systems",
  "graphics",
  "desktop",
  "backend",
  "jamstack",
]);

function isNonEmptyString(val: unknown): val is string {
  return typeof val === "string" && val.trim().length > 0;
}

function isStringArray(val: unknown, minLength = 1): val is string[] {
  return (
    Array.isArray(val) &&
    val.length >= minLength &&
    val.every((item) => isNonEmptyString(item))
  );
}

function validateLocalizedBlock(
  block: unknown,
  localeName: string,
  projectId: string
): LocalizedProjectMetadata {
  if (!block || typeof block !== "object") {
    throw new Error(
      `Invalid portfolio schema (${projectId}): missing locale block '${localeName}'`
    );
  }

  const record = block as Record<string, unknown>;
  const requiredStrings = [
    "title",
    "tagline",
    "category",
    "badge",
    "refLabel",
    "description",
  ] as const;

  for (const field of requiredStrings) {
    if (!isNonEmptyString(record[field])) {
      throw new Error(
        `Invalid portfolio schema (${projectId}.${localeName}): field '${field}' must be a non-empty string`
      );
    }
  }

  if (!isStringArray(record.tags, 1)) {
    throw new Error(
      `Invalid portfolio schema (${projectId}.${localeName}): 'tags' must be a non-empty string array`
    );
  }

  if (!isStringArray(record.highlights, 1)) {
    throw new Error(
      `Invalid portfolio schema (${projectId}.${localeName}): 'highlights' must be a non-empty string array`
    );
  }

  return {
    title: record.title as string,
    tagline: record.tagline as string,
    category: record.category as string,
    badge: record.badge as string,
    refLabel: record.refLabel as string,
    description: record.description as string,
    tags: record.tags as string[],
    highlights: record.highlights as string[],
  };
}

export function validateProjectSchemaV2(raw: unknown): PortfolioProjectSchemaV2 {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid portfolio schema: root must be a non-null object");
  }

  const obj = raw as Record<string, unknown>;

  if (obj.schemaVersion !== "2.0") {
    throw new Error(
      `Invalid portfolio schema: expected schemaVersion '2.0', got '${String(
        obj.schemaVersion
      )}'`
    );
  }

  const requiredRootStrings = [
    "id",
    "repo",
    "casing",
    "badge",
    "refLabel",
    "title",
    "description",
    "icon",
    "visitLink",
  ] as const;

  for (const field of requiredRootStrings) {
    if (!isNonEmptyString(obj[field])) {
      throw new Error(
        `Invalid portfolio schema: root field '${field}' must be a non-empty string`
      );
    }
  }

  const id = obj.id as string;
  const repo = obj.repo as string;
  const casing = obj.casing as string;

  if (casing !== `Nubi-Prey/${repo}`) {
    throw new Error(
      `Invalid portfolio schema (${id}): casing '${casing}' must match 'Nubi-Prey/${repo}'`
    );
  }

  if (
    typeof obj.categoryKey !== "string" ||
    !VALID_CATEGORY_KEYS.has(obj.categoryKey as ProjectCategoryKey)
  ) {
    throw new Error(
      `Invalid portfolio schema (${id}): invalid categoryKey '${String(
        obj.categoryKey
      )}'`
    );
  }

  if (!isStringArray(obj.tags, 1)) {
    throw new Error(
      `Invalid portfolio schema (${id}): root 'tags' must be a non-empty string array`
    );
  }

  if (!obj.links || typeof obj.links !== "object") {
    throw new Error(`Invalid portfolio schema (${id}): missing 'links' object`);
  }

  const linksObj = obj.links as Record<string, unknown>;
  const expectedGithubUrl = `https://github.com/Nubi-Prey/${repo}`;
  if (linksObj.github !== expectedGithubUrl) {
    throw new Error(
      `Invalid portfolio schema (${id}): links.github must be '${expectedGithubUrl}'`
    );
  }

  if (linksObj.releases !== null && !isNonEmptyString(linksObj.releases)) {
    throw new Error(
      `Invalid portfolio schema (${id}): links.releases must be a non-empty string or null`
    );
  }

  if (linksObj.visit !== null && !isNonEmptyString(linksObj.visit)) {
    throw new Error(
      `Invalid portfolio schema (${id}): links.visit must be a non-empty string or null`
    );
  }

  if (!obj.locales || typeof obj.locales !== "object") {
    throw new Error(`Invalid portfolio schema (${id}): missing 'locales' object`);
  }

  const localesObj = obj.locales as Record<string, unknown>;
  const pt_BR = validateLocalizedBlock(localesObj.pt_BR, "pt_BR", id);
  const en_US = validateLocalizedBlock(localesObj.en_US, "en_US", id);

  if (pt_BR.tags.length !== en_US.tags.length) {
    throw new Error(
      `Invalid portfolio schema (${id}): tag count mismatch between pt_BR (${pt_BR.tags.length}) and en_US (${en_US.tags.length})`
    );
  }

  if (pt_BR.highlights.length !== en_US.highlights.length) {
    throw new Error(
      `Invalid portfolio schema (${id}): highlights count mismatch between pt_BR and en_US`
    );
  }

  return {
    schemaVersion: "2.0",
    id,
    repo,
    casing,
    categoryKey: obj.categoryKey as ProjectCategoryKey,
    badge: obj.badge as string,
    refLabel: obj.refLabel as string,
    title: obj.title as string,
    description: obj.description as string,
    icon: obj.icon as string,
    visitLink: obj.visitLink as string,
    tags: obj.tags as string[],
    links: {
      github: linksObj.github as string,
      releases: (linksObj.releases as string | null) ?? null,
      visit: (linksObj.visit as string | null) ?? null,
    },
    locales: {
      pt_BR,
      en_US,
    },
  };
}

const RAW_CATALOG: readonly unknown[] = [
  mineosRaw,
  engraverRaw,
  lupaRaw,
  estoquelentesRaw,
  astolfoBotRaw,
  nubiLiveRaw,
];

const VALIDATED_CATALOG: readonly PortfolioProjectSchemaV2[] = RAW_CATALOG.map(
  (entry) => validateProjectSchemaV2(entry)
);

export function getAllProjectSchemas(): readonly PortfolioProjectSchemaV2[] {
  return VALIDATED_CATALOG;
}

export function toLocalizedProjectData(
  schema: PortfolioProjectSchemaV2,
  locale: Locale
): ProjectData {
  const localized = schema.locales[locale];
  return {
    id: schema.id,
    repo: schema.repo,
    casing: schema.casing,
    url: schema.links.github,
    categoryKey: schema.categoryKey,
    title: localized.title,
    tagline: localized.tagline,
    category: localized.category,
    badge: localized.badge,
    description: localized.description,
    tags: localized.tags,
    highlights: localized.highlights,
    links: schema.links,
    refLabel: localized.refLabel,
  };
}

export function getLocalizedProjects(locale: Locale): ProjectData[] {
  return VALIDATED_CATALOG.map((schema) =>
    toLocalizedProjectData(schema, locale)
  );
}

export function getProjectById(
  id: string,
  locale: Locale
): ProjectData | undefined {
  const found = VALIDATED_CATALOG.find((item) => item.id === id);
  return found ? toLocalizedProjectData(found, locale) : undefined;
}
