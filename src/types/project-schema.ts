export type ProjectCategoryKey =
  | "systems"
  | "graphics"
  | "desktop"
  | "backend"
  | "jamstack";

export interface ProjectLinks {
  github: string;
  releases: string | null;
  visit: string | null;
}

export interface LocalizedProjectMetadata {
  title: string;
  tagline: string;
  category: string;
  badge: string;
  refLabel: string;
  description: string;
  tags: string[];
  highlights: string[];
}

export interface PortfolioProjectSchemaV2 {
  schemaVersion: "2.0";
  id: string;
  repo: string;
  casing: string;
  categoryKey: ProjectCategoryKey;
  badge: string;
  refLabel: string;
  title: string;
  description: string;
  icon: string;
  visitLink: string;
  tags: string[];
  links: ProjectLinks;
  locales: {
    pt_BR: LocalizedProjectMetadata;
    en_US: LocalizedProjectMetadata;
  };
}
