import type { PortfolioProjectSchemaV2 } from "@/types/project-schema";

export const SITE_URL = "https://muriloalves.dev";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_PAGE_ID = `${SITE_URL}/#profilepage`;
export const PROJECTS_LIST_ID = `${SITE_URL}/#projects`;

export interface JsonLdGraphDocument {
  "@context": "https://schema.org";
  "@graph": Array<Record<string, unknown>>;
}

export function buildPortfolioJsonLd(
  projects: readonly PortfolioProjectSchemaV2[]
): JsonLdGraphDocument {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "muriloalves.dev",
        description:
          "Portfólio de Murilo Alves: desenvolvimento de software e sistemas baremetal, arquitetura backend, bancos de dados e ferramentas desktop local-first.",
        inLanguage: ["pt-BR", "en-US"],
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: SITE_URL,
        name: "Murilo Alves // Desenvolvedor de Software & Sistemas (Software & Systems Developer)",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: { "@id": PROJECTS_LIST_ID },
        inLanguage: ["pt-BR", "en-US"],
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Murilo Alves",
        alternateName: "Nubi-Prey",
        jobTitle: "Software & Systems Developer",
        description:
          "Desenvolvedor de software focado em sistemas de baixo nível, arquitetura de backend, bancos de dados e ferramentas desktop local-first.",
        url: SITE_URL,
        email: "mailto:muriloalvesnp@gmail.com",
        sameAs: [
          "https://github.com/Nubi-Prey",
          "https://www.linkedin.com/in/murilo-alves-np/",
        ],
        knowsLanguage: ["pt-BR", "en-US"],
        knowsAbout: [
          "Systems Engineering",
          "Backend Architecture",
          "Relational Databases (PostgreSQL, SQLite)",
          "Linux Kernel & Buildroot",
          "Rust & Wayland Compositors (Smithay, DRM/KMS)",
          "C & C++ Low-Level Programming",
          "Local-First Desktop Applications (Electron, React, Drizzle ORM)",
          "Java & TypeScript Event-Driven Services",
          "Docker & Containerized Infrastructure",
        ],
      },
      {
        "@type": "ItemList",
        "@id": PROJECTS_LIST_ID,
        name: "Projetos de Engenharia Auditados // Audited Engineering Projects",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            "@id": `${SITE_URL}/#project-${project.id}`,
            name: project.locales.pt_BR.title,
            alternateName: project.locales.en_US.title,
            description: `${project.locales.pt_BR.tagline} — ${project.locales.pt_BR.description} | EN: ${project.locales.en_US.tagline} — ${project.locales.en_US.description}`,
            codeRepository: project.links.github,
            url: project.links.visit ?? project.links.github,
            author: { "@id": PERSON_ID },
            programmingLanguage: project.tags,
            keywords: [
              ...new Set([
                ...project.locales.pt_BR.tags,
                ...project.locales.en_US.tags,
              ]),
            ],
          },
        })),
      },
    ],
  };
}

export function serializeJsonLd(data: JsonLdGraphDocument): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
