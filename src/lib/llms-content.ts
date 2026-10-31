import type { PortfolioProjectSchemaV2 } from "@/types/project-schema";
import { ptDictionary } from "@/i18n/dictionaries/pt";
import { enDictionary } from "@/i18n/dictionaries/en";
import { SITE_URL } from "./structured-data";

export function generateLlmsTxt(
  projects: readonly PortfolioProjectSchemaV2[]
): string {
  const lines: string[] = [
    "# Murilo Alves // Software & Systems Engineer",
    "",
    `> ${enDictionary.hero.bio}`,
    `> [PT-BR] ${ptDictionary.hero.bio}`,
    "",
    "## Canonical & Machine-Readable Documentation",
    "",
    `- [Homepage](${SITE_URL}): Interactive Cyber-Industrial engineering portfolio (PT-BR / EN-US).`,
    `- [Full Bilingual Technical Dossier (llms-full.txt)](${SITE_URL}/llms-full.txt): Complete architectural specifications, highlights, and stack details for all ${projects.length} audited repositories in English and Portuguese.`,
    `- [Sitemap XML](${SITE_URL}/sitemap.xml): Canonical index of site routes.`,
    "",
    "## Core Engineering Competencies",
    "",
  ];

  enDictionary.competencies.cards.forEach((enCard, index) => {
    const ptCard = ptDictionary.competencies.cards[index];
    lines.push(
      `- **${enCard.title} (${ptCard.title})** [Ref: ${enCard.projectRef}]: ${enCard.description}`
    );
  });

  lines.push("", "## Featured Audited Repositories", "");

  for (const project of projects) {
    const en = project.locales.en_US;
    const pt = project.locales.pt_BR;
    lines.push(
      `- [${en.title} (${project.casing})](${project.links.github}) [${project.badge}]: ${en.tagline} | PT-BR: ${pt.tagline} (Stack: ${project.tags.join(", ")})`
    );
  }

  lines.push(
    "",
    "## Contact & Official Profiles",
    "",
    "- **GitHub**: [https://github.com/Nubi-Prey](https://github.com/Nubi-Prey)",
    "- **LinkedIn**: [https://www.linkedin.com/in/murilo-alves-np/](https://www.linkedin.com/in/murilo-alves-np/)",
    "- **Email**: [mailto:muriloalvesnp@gmail.com](mailto:muriloalvesnp@gmail.com)",
    ""
  );

  return lines.join("\n");
}

export function generateLlmsFullTxt(
  projects: readonly PortfolioProjectSchemaV2[]
): string {
  const lines: string[] = [
    "# Murilo Alves // Software & Systems Engineer — Full Technical Dossier (PT-BR & EN-US)",
    "",
    `> Canonical URL: ${SITE_URL}`,
    `> Summary Index: ${SITE_URL}/llms.txt`,
    "> Author: Murilo Alves (GitHub: Nubi-Prey)",
    "> Languages included in this document: English (en-US) and Brazilian Portuguese (pt-BR)",
    "",
    "---",
    "",
    "## 1. Executive Profile (EN-US & PT-BR)",
    "",
    "### English (en-US)",
    `- **Name**: ${enDictionary.hero.name}`,
    `- **Role**: ${enDictionary.hero.role}`,
    `- **Positioning**: ${enDictionary.hero.statusBadge}`,
    `- **Bio**: ${enDictionary.hero.bio}`,
    `- **Focus Areas**: ${enDictionary.hero.tags.join(" | ")}`,
    `- **Availability**: ${enDictionary.competencies.status}`,
    "",
    "### Português (pt-BR)",
    `- **Nome**: ${ptDictionary.hero.name}`,
    `- **Cargo**: ${ptDictionary.hero.role}`,
    `- **Posicionamento**: ${ptDictionary.hero.statusBadge}`,
    `- **Biografia**: ${ptDictionary.hero.bio}`,
    `- **Áreas de Foco**: ${ptDictionary.hero.tags.join(" | ")}`,
    `- **Disponibilidade**: ${ptDictionary.competencies.status}`,
    "",
    "---",
    "",
    "## 2. Core Areas & Technical Competencies",
    "",
  ];

  enDictionary.competencies.cards.forEach((enCard, index) => {
    const ptCard = ptDictionary.competencies.cards[index];
    lines.push(
      `### 2.${index + 1}. ${enCard.title} // ${ptCard.title}`,
      `- **Reference Project**: ${enCard.projectRef}`,
      `- **EN-US**: ${enCard.description}`,
      `- **PT-BR**: ${ptCard.description}`,
      ""
    );
  });

  lines.push(
    "---",
    "",
    `## 3. Audited Engineering Projects (${projects.length} Repositories — Schema v2)`,
    ""
  );

  projects.forEach((project, index) => {
    const en = project.locales.en_US;
    const pt = project.locales.pt_BR;

    lines.push(
      `### 3.${index + 1}. ${en.title} / ${pt.title} (\`${project.casing}\`)`,
      `- **Project ID**: \`${project.id}\``,
      `- **Category Key**: \`${project.categoryKey}\``,
      `- **Badge**: \`${project.badge}\``,
      `- **GitHub Repository**: ${project.links.github}`
    );

    if (project.links.releases) {
      lines.push(`- **Releases**: ${project.links.releases}`);
    }
    if (project.links.visit) {
      lines.push(`- **Primary Link**: ${project.links.visit}`);
    }

    lines.push(
      `- **Core Stack**: ${project.tags.join(", ")}`,
      "",
      "#### [EN-US] Architectural Specification",
      `- **Category**: ${en.category} (${en.refLabel})`,
      `- **Tagline**: ${en.tagline}`,
      `- **Description**: ${en.description}`,
      `- **Localized Tags**: ${en.tags.join(", ")}`,
      "- **Engineering Highlights**:"
    );

    for (const highlight of en.highlights) {
      lines.push(`  - ${highlight}`);
    }

    lines.push(
      "",
      "#### [PT-BR] Especificação Arquitetural",
      `- **Categoria**: ${pt.category} (${pt.refLabel})`,
      `- **Resumo (Tagline)**: ${pt.tagline}`,
      `- **Descrição**: ${pt.description}`,
      `- **Tags Localizadas**: ${pt.tags.join(", ")}`,
      "- **Destaques de Engenharia (Highlights)**:"
    );

    for (const highlight of pt.highlights) {
      lines.push(`  - ${highlight}`);
    }

    lines.push("");
  });

  lines.push(
    "---",
    "",
    "## 4. Direct Contact & Verification Channels",
    "",
    "- **Portfolio**: https://muriloalves.dev",
    "- **GitHub**: https://github.com/Nubi-Prey",
    "- **LinkedIn**: https://www.linkedin.com/in/murilo-alves-np/",
    "- **Email**: mailto:muriloalvesnp@gmail.com",
    ""
  );

  return lines.join("\n");
}
