import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "@/components/Providers";
import Home from "@/app/page";
import { metadata, viewport } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { ptDictionary } from "@/i18n/dictionaries/pt";
import { enDictionary } from "@/i18n/dictionaries/en";

describe("Integração Completa da Homepage (Componentes, Links, Classes Hover e Troca Bilíngue)", () => {
  it("deve renderizar o Hero com nome, cargo e CTAs com hover-shadow-orange (sem foto desnecessária)", async () => {
    const page = await Home();
    render(
      <Providers>
        {page}
      </Providers>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "MURILO ALVES" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(ptDictionary.hero.role)
    ).toBeInTheDocument();

    // Badge do Hero com especialidade técnica
    expect(screen.getByText(ptDictionary.hero.statusBadge)).toBeInTheDocument();

    // Brand link do Header com o domínio
    expect(
      screen.getByRole("link", { name: /muriloalves\.dev/i })
    ).toBeInTheDocument();

    // Foto removida por ser desnecessária
    expect(screen.queryByAltText(/Foto de perfil de Murilo Alves/i)).not.toBeInTheDocument();

    const btnProjects = screen.getByRole("link", {
      name: new RegExp(ptDictionary.hero.btnProjects, "i"),
    });
    expect(btnProjects).toHaveAttribute("href", "#projetos");
    expect(btnProjects.className).toContain("hover-shadow-orange");

    const btnGithub = screen.getByRole("link", {
      name: new RegExp(ptDictionary.hero.btnGithub, "i"),
    });
    expect(btnGithub).toHaveAttribute("href", "https://github.com/Nubi-Prey");
    expect(btnGithub.className).toContain("hover-shadow-orange");

    const btnContact = screen.getByRole("link", {
      name: new RegExp(ptDictionary.hero.btnContact, "i"),
    });
    expect(btnContact).toHaveAttribute("href", "mailto:muriloalvesnp@gmail.com");
    expect(btnContact.className).toContain("hover-shadow-orange");
  });

  it("deve renderizar os 6 ProjectCards com casing real, links seguros para o GitHub e sombra laranja mais grossa no hover", async () => {
    const page = await Home();
    const { container } = render(
      <Providers>
        {page}
      </Providers>
    );

    const articles = container.querySelectorAll("section#projetos article");
    expect(articles).toHaveLength(6);

    ptDictionary.projects.projectsList.forEach((project, idx) => {
      const card = articles[idx] as HTMLElement;
      expect(card.className).toContain("hover-shadow-orange");
      expect(card.className).toContain("hover:shadow-[6px_6px_0px_0px_#b83a20]");
      expect(card.className).toContain("hover:border-[#b83a20]");
      expect(card.className).toContain("dark:hover:border-[#b83a20]");

      expect(within(card).getByText(project.casing)).toBeInTheDocument();
      expect(
        within(card).getByRole("heading", { level: 3, name: project.title })
      ).toBeInTheDocument();

      const repoLink = within(card).getByRole("link", {
        name: new RegExp(ptDictionary.projects.viewGithub, "i"),
      });
      expect(repoLink).toHaveAttribute("href", project.url);
      expect(repoLink).toHaveAttribute("target", "_blank");
      expect(repoLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("deve renderizar os 4 quadrantes de Competências com referências cruzadas aos projetos e classe hover-shadow-orange", async () => {
    const page = await Home();
    const { container } = render(
      <Providers>
        {page}
      </Providers>
    );

    const competenciesSection = container.querySelector("section#competencias");
    expect(competenciesSection).not.toBeNull();

    expect(
      within(competenciesSection as HTMLElement).getByRole("heading", {
        level: 2,
        name: ptDictionary.competencies.title,
      })
    ).toBeInTheDocument();

    for (const card of ptDictionary.competencies.cards) {
      const heading = within(competenciesSection as HTMLElement).getByRole(
        "heading",
        { level: 3, name: card.title }
      );
      expect(heading).toBeInTheDocument();
      expect(
        within(competenciesSection as HTMLElement).getByText(card.projectRef)
      ).toBeInTheDocument();

      const quadrantBox = heading.closest("div.hover-shadow-orange");
      expect(quadrantBox).not.toBeNull();
    }
  });

  it("deve renderizar ContactSection e Footer com links verificados e sem telemetria fictícia", async () => {
    const page = await Home();
    const { container } = render(
      <Providers>
        {page}
      </Providers>
    );

    const contactSection = container.querySelector("section#contato") as HTMLElement;
    expect(contactSection).not.toBeNull();

    expect(
      within(contactSection).getByRole("heading", {
        level: 2,
        name: ptDictionary.contact.title,
      })
    ).toBeInTheDocument();

    const emailLink = within(contactSection).getByRole("link", {
      name: /muriloalvesnp@gmail\.com/i,
    });
    expect(emailLink).toHaveAttribute("href", "mailto:muriloalvesnp@gmail.com");
    expect(emailLink.className).toContain("hover-shadow-orange-sm");

    const linkedinLink = within(contactSection).getByRole("link", {
      name: /LinkedIn/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/murilo-alves-np/"
    );
    expect(linkedinLink.className).toContain("hover-shadow-orange-sm");

    // Verificar ausência total de PGP ou telemetria no DOM inteiro
    expect(container.textContent).not.toContain("PGP KEY FINGERPRINT");
    expect(container.textContent).not.toContain("REVOCATION_CHECK");
    expect(container.textContent).not.toContain("LINUX_AMD64");
  });

  it("deve traduzir toda a árvore da página instantaneamente ao alternar o seletor de idioma no Header (PT <-> EN)", async () => {
    const user = userEvent.setup();
    const page = await Home();

    render(
      <Providers>
        {page}
      </Providers>
    );

    // Estado inicial em Português
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(screen.getByText(ptDictionary.hero.role)).toBeInTheDocument();
    expect(screen.getByText(ptDictionary.projects.sectionTitle)).toBeInTheDocument();
    expect(screen.getByText(ptDictionary.competencies.title)).toBeInTheDocument();
    expect(screen.getByText(ptDictionary.contact.title)).toBeInTheDocument();

    const langButton = screen.getByTitle(/Mudar Idioma \/ Change Language/i);
    expect(langButton).toHaveTextContent("PT");

    // Alternar para Inglês
    await user.click(langButton);

    expect(langButton).toHaveTextContent("EN");
    expect(document.documentElement.lang).toBe("en-US");
    expect(screen.getByText(enDictionary.hero.role)).toBeInTheDocument();
    expect(screen.getByText(enDictionary.projects.sectionTitle)).toBeInTheDocument();
    expect(screen.getByText(enDictionary.competencies.title)).toBeInTheDocument();
    expect(screen.getByText(enDictionary.contact.title)).toBeInTheDocument();
    expect(screen.getByText(enDictionary.footer.rights)).toBeInTheDocument();

    // Alternar de volta para Português
    await user.click(langButton);

    expect(langButton).toHaveTextContent("PT");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(screen.getByText(ptDictionary.hero.role)).toBeInTheDocument();
    expect(screen.getByText(ptDictionary.projects.sectionTitle)).toBeInTheDocument();
    expect(screen.getByText(ptDictionary.footer.rights)).toBeInTheDocument();
  });

  it("deve exportar metadados de SEO completos, OpenGraph, robots.txt e sitemap.xml alinhados ao domínio muriloalves.dev", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://muriloalves.dev/");
    expect(metadata.description).toContain("arquitetura de backend resiliente");
    expect(metadata.description).toContain("backend architecture");
    expect(metadata.description).toContain("databases");
    expect(metadata.description).not.toContain("low-level computer graphics");
    expect(metadata.creator).toBe("Murilo Alves");
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
    expect(viewport.width).toBe("device-width");

    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBe("https://muriloalves.dev/sitemap.xml");
    expect(robotsConfig.host).toBe("https://muriloalves.dev");

    const sitemapEntries = sitemap();
    expect(sitemapEntries).toHaveLength(3);
    expect(sitemapEntries.map((entry) => entry.url)).toEqual([
      "https://muriloalves.dev",
      "https://muriloalves.dev/llms.txt",
      "https://muriloalves.dev/llms-full.txt",
    ]);
  });
});
