import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { ptDictionary } from "@/i18n/dictionaries/pt";
import { enDictionary } from "@/i18n/dictionaries/en";
import {
  getAllProjectSchemas,
  getLocalizedProjects,
  getProjectById,
  validateProjectSchemaV2,
} from "@/lib/projects";

const ROOT_DIR = path.resolve(__dirname, "../..");

describe("Integridade de Dados, Schema v2, Anti-Alucinação e Paridade i18n", () => {
  it("deve validar que os 6 projetos em docs/portfolio_json_configs seguem o Schema v2.0 e alimentam os dicionários", () => {
    const configsDir = path.join(ROOT_DIR, "docs/portfolio_json_configs");
    const files = fs
      .readdirSync(configsDir)
      .filter((file) => file.endsWith(".portfolio.json"));

    expect(files.length).toBe(6);

    for (const file of files) {
      const expectedRepoName = file.replace(".portfolio.json", "");
      const rawJson = fs.readFileSync(path.join(configsDir, file), "utf-8");
      const parsed = JSON.parse(rawJson);

      const validated = validateProjectSchemaV2(parsed);

      expect(validated.schemaVersion).toBe("2.0");
      expect(validated.repo).toBe(expectedRepoName);
      expect(validated.casing).toBe(`Nubi-Prey/${expectedRepoName}`);
      expect(validated.links.github).toBe(
        `https://github.com/Nubi-Prey/${expectedRepoName}`
      );
      expect(validated.visitLink).toMatch(
        new RegExp(`^https://github\\.com/Nubi-Prey/${expectedRepoName}`)
      );

      const ptMatch = ptDictionary.projects.projectsList.find(
        (p) => p.repo === expectedRepoName
      );
      const enMatch = enDictionary.projects.projectsList.find(
        (p) => p.repo === expectedRepoName
      );

      expect(ptMatch).toBeDefined();
      expect(enMatch).toBeDefined();
      expect(ptMatch?.casing).toBe(`Nubi-Prey/${expectedRepoName}`);
      expect(enMatch?.casing).toBe(`Nubi-Prey/${expectedRepoName}`);
      expect(ptMatch?.url).toBe(`https://github.com/Nubi-Prey/${expectedRepoName}`);
      expect(enMatch?.url).toBe(`https://github.com/Nubi-Prey/${expectedRepoName}`);
      expect(ptMatch?.tagline).toBe(validated.locales.pt_BR.tagline);
      expect(enMatch?.tagline).toBe(validated.locales.en_US.tagline);
      expect(ptMatch?.highlights).toEqual(validated.locales.pt_BR.highlights);
      expect(enMatch?.highlights).toEqual(validated.locales.en_US.highlights);
    }
  });

  it("deve rejeitar payloads inválidos no validateProjectSchemaV2 com erros explícitos", () => {
    const baseValid = structuredClone(getAllProjectSchemas()[0]);

    expect(() => validateProjectSchemaV2(null)).toThrow(
      /root must be a non-null object/
    );

    expect(() =>
      validateProjectSchemaV2({ ...baseValid, schemaVersion: "1.0" })
    ).toThrow(/expected schemaVersion '2\.0'/);

    expect(() =>
      validateProjectSchemaV2({ ...baseValid, casing: "wrong/MineOS" })
    ).toThrow(/casing 'wrong\/MineOS' must match 'Nubi-Prey\/MineOS'/);

    expect(() =>
      validateProjectSchemaV2({ ...baseValid, categoryKey: "invalid-cat" })
    ).toThrow(/invalid categoryKey 'invalid-cat'/);

    expect(() =>
      validateProjectSchemaV2({
        ...baseValid,
        links: { ...baseValid.links, github: "https://github.com/other/repo" },
      })
    ).toThrow(/links\.github must be/);

    expect(() =>
      validateProjectSchemaV2({
        ...baseValid,
        locales: {
          ...baseValid.locales,
          en_US: {
            ...baseValid.locales.en_US,
            tags: ["ONLY_ONE_TAG"],
          },
        },
      })
    ).toThrow(/tag count mismatch between pt_BR/);

    expect(() =>
      validateProjectSchemaV2({
        ...baseValid,
        locales: {
          ...baseValid.locales,
          en_US: {
            ...baseValid.locales.en_US,
            highlights: ["Only one highlight"],
          },
        },
      })
    ).toThrow(/highlights count mismatch between pt_BR and en_US/);
  });

  it("deve resolver projetos individualmente por ID e idioma via getProjectById e getLocalizedProjects", () => {
    const ptProjects = getLocalizedProjects("pt_BR");
    const enProjects = getLocalizedProjects("en_US");

    expect(ptProjects).toHaveLength(6);
    expect(enProjects).toHaveLength(6);

    const mineosPt = getProjectById("mineos", "pt_BR");
    const mineosEn = getProjectById("mineos", "en_US");
    const unknown = getProjectById("non-existent-id", "pt_BR");

    expect(mineosPt).toBeDefined();
    expect(mineosEn).toBeDefined();
    expect(unknown).toBeUndefined();

    expect(mineosPt?.repo).toBe("MineOS");
    expect(mineosPt?.categoryKey).toBe("systems");
    expect(mineosPt?.description).not.toBe(mineosEn?.description);
    expect(mineosPt?.tagline).not.toBe(mineosEn?.tagline);
  });

  it("deve conter exatamente os 6 repositórios reais auditados com casing estrito", () => {
    const expectedRepos = [
      { id: "mineos", repo: "MineOS", casing: "Nubi-Prey/MineOS" },
      { id: "engraver", repo: "Engraver", casing: "Nubi-Prey/Engraver" },
      { id: "lupa", repo: "lupa", casing: "Nubi-Prey/lupa" },
      { id: "estoquelentes", repo: "estoquelentes", casing: "Nubi-Prey/estoquelentes" },
      { id: "astolfo-bot", repo: "Astolfo-bot", casing: "Nubi-Prey/Astolfo-bot" },
      { id: "black-pc", repo: "black-pc", casing: "Nubi-Prey/black-pc" },
    ];

    expect(ptDictionary.projects.projectsList).toHaveLength(6);
    expect(enDictionary.projects.projectsList).toHaveLength(6);

    expectedRepos.forEach((expected, index) => {
      const ptProj = ptDictionary.projects.projectsList[index];
      const enProj = enDictionary.projects.projectsList[index];

      expect(ptProj.id).toBe(expected.id);
      expect(enProj.id).toBe(expected.id);

      expect(ptProj.repo).toBe(expected.repo);
      expect(enProj.repo).toBe(expected.repo);

      expect(ptProj.casing).toBe(expected.casing);
      expect(enProj.casing).toBe(expected.casing);

      expect(ptProj.url).toBe(`https://github.com/${expected.casing}`);
      expect(enProj.url).toBe(`https://github.com/${expected.casing}`);

      expect(ptProj.tags.length).toBeGreaterThanOrEqual(4);
      expect(enProj.tags.length).toBe(ptProj.tags.length);

      expect(ptProj.highlights.length).toBeGreaterThanOrEqual(2);
      expect(enProj.highlights.length).toBe(ptProj.highlights.length);

      expect(ptProj.description.length).toBeGreaterThan(40);
      expect(enProj.description.length).toBeGreaterThan(40);
      expect(ptProj.description).not.toBe(enProj.description);
    });
  });

  it("deve manter paridade estrutural completa entre pt_BR e en_US em todas as seções", () => {
    expect(ptDictionary.hero.tags).toHaveLength(4);
    expect(enDictionary.hero.tags).toHaveLength(4);

    expect(ptDictionary.competencies.cards).toHaveLength(4);
    expect(enDictionary.competencies.cards).toHaveLength(4);

    ptDictionary.competencies.cards.forEach((ptCard, idx) => {
      const enCard = enDictionary.competencies.cards[idx];
      expect(ptCard.icon).toBe(enCard.icon);
      expect(ptCard.projectRef).toBe(enCard.projectRef);
      expect(ptCard.title.length).toBeGreaterThan(3);
      expect(enCard.title.length).toBeGreaterThan(3);
      expect(ptCard.description).not.toBe(enCard.description);
    });

    expect(ptDictionary.footer.connections).toHaveLength(3);
    expect(enDictionary.footer.connections).toHaveLength(3);

    ptDictionary.footer.connections.forEach((ptConn, idx) => {
      const enConn = enDictionary.footer.connections[idx];
      expect(ptConn.label).toBe(enConn.label);
      expect(ptConn.value).toBe(enConn.value);
      expect(ptConn.url).toBe(enConn.url);
    });
  });

  it("não deve conter nenhum dado fictício de telemetria ou contatos antigos de mock", () => {
    const serializedPt = JSON.stringify(ptDictionary);
    const serializedEn = JSON.stringify(enDictionary);

    const forbiddenTokens = [
      "9E4A B810",
      "ED25519",
      "REVOCATION_CHECK",
      "LINUX_AMD64",
      "UTC-3",
      "contato@muriloalves.dev",
    ];

    for (const token of forbiddenTokens) {
      expect(serializedPt).not.toContain(token);
      expect(serializedEn).not.toContain(token);
    }

    expect(ptDictionary.contact.emailBtn).toBe("muriloalvesnp@gmail.com");
    expect(enDictionary.contact.emailBtn).toBe("muriloalvesnp@gmail.com");

    const linkedinConnPt = ptDictionary.footer.connections.find(
      (c) => c.label === "LINKEDIN"
    );
    expect(linkedinConnPt?.url).toBe("https://www.linkedin.com/in/murilo-alves-np/");
  });

  it("não deve manter o arquivo desnecessário public/images/avatar.jpg", () => {
    const avatarPath = path.join(ROOT_DIR, "public/images/avatar.jpg");
    expect(fs.existsSync(avatarPath)).toBe(false);
  });

  it("não deve repetir o nome do autor desnecessariamente no Header, Hero Badge, Footer nameRole ou Footer rights", () => {
    expect(ptDictionary.header.title).not.toContain("MURILO ALVES");
    expect(enDictionary.header.title).not.toContain("MURILO ALVES");

    expect(ptDictionary.hero.statusBadge).not.toContain("MURILO ALVES");
    expect(enDictionary.hero.statusBadge).not.toContain("MURILO ALVES");

    expect(ptDictionary.footer.nameRole).not.toContain("MURILO ALVES");
    expect(enDictionary.footer.nameRole).not.toContain("MURILO ALVES");

    expect(ptDictionary.footer.rights).not.toContain("MURILO ALVES");
    expect(enDictionary.footer.rights).not.toContain("MURILO ALVES");

    // Mantém o nome no Hero H1 como identificador canônico da página
    expect(ptDictionary.hero.name).toBe("MURILO ALVES");
    expect(enDictionary.hero.name).toBe("MURILO ALVES");
  });
});
