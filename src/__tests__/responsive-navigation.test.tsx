import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "@/components/Providers";
import Home from "@/app/page";
import { Header } from "@/components/Header";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Competencies } from "@/components/Competencies";
import { ptDictionary } from "@/i18n/dictionaries/pt";

describe("Responsividade, Navegação Mobile e Grid Adaptativo", () => {
  it("deve alternar a visibilidade do menu mobile ao clicar no botão hambúrguer/fechar", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Header />
      </Providers>
    );

    const toggleBtn = screen.getByRole("button", { name: /abrir menu/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

    // Inicialmente o menu dropdown mobile não deve estar presente no DOM
    expect(screen.queryByText("// NAVEGAÇÃO //")).not.toBeInTheDocument();

    // Clica para abrir o menu
    await user.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("// NAVEGAÇÃO //")).toBeInTheDocument();

    // Links de navegação dentro do menu mobile
    const homeLink = screen.getAllByRole("link", { name: ptDictionary.header.home });
    expect(homeLink.length).toBeGreaterThanOrEqual(2); // 1 no desktop nav, 1 no mobile dropdown

    // Clica para fechar o menu pelo botão de fechar
    const closeBtn = screen.getByRole("button", { name: /fechar menu/i });
    await user.click(closeBtn);
    expect(screen.queryByText("// NAVEGAÇÃO //")).not.toBeInTheDocument();
  });

  it("deve fechar o menu mobile automaticamente ao clicar em um dos links de âncora", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Header />
      </Providers>
    );

    const toggleBtn = screen.getByRole("button", { name: /abrir menu/i });
    await user.click(toggleBtn);

    const mobileMenu = screen.getByTestId("mobile-menu");
    expect(mobileMenu).toBeInTheDocument();

    const projectsMobileLink = within(mobileMenu).getByRole("link", {
      name: ptDictionary.header.projects,
    });
    expect(projectsMobileLink).toHaveAttribute("href", "#projetos");

    // Ao clicar no link, o menu mobile deve se recolher
    await user.click(projectsMobileLink);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("deve aplicar estritamente 1 coluna em celulares (< 768px), 2 colunas em tablets e 3 colunas em desktop na seção de projetos", () => {
    const { container } = render(
      <Providers>
        <ProjectsSection />
      </Providers>
    );

    const grid = container.querySelector("section#projetos div.grid");
    expect(grid).not.toBeNull();
    // Invariante de ouro solicitada pelo usuário:
    // NUNCA 2 projetos lado a lado em celulares -> grid-cols-1
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("deve aplicar 1 coluna em celulares, 2 colunas em tablets e 4 colunas em desktop nas competências", () => {
    const { container } = render(
      <Providers>
        <Competencies />
      </Providers>
    );

    const grid = container.querySelector("section#competencias div.grid");
    expect(grid).not.toBeNull();
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-4");
  });

  it("deve garantir que os botões de ação do Hero e Contato possuam classes responsivas w-full sm:w-auto", async () => {
    const page = await Home();
    render(
      <Providers>
        {page}
      </Providers>
    );

    const btnProjects = screen.getByRole("link", {
      name: new RegExp(ptDictionary.hero.btnProjects, "i"),
    });
    expect(btnProjects.className).toContain("w-full");
    expect(btnProjects.className).toContain("sm:w-auto");

    const btnEmail = screen.getByRole("link", {
      name: new RegExp(ptDictionary.contact.emailBtn, "i"),
    });
    expect(btnEmail.className).toContain("w-full");
    expect(btnEmail.className).toContain("sm:w-auto");
  });

  it("deve atualizar dinamicamente o highlight do nav desktop ao clicar em uma seção", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Header />
      </Providers>
    );

    const desktopNav = document.querySelector("nav.hidden.md\\:flex");
    expect(desktopNav).not.toBeNull();

    const homeLink = within(desktopNav as HTMLElement).getByText(ptDictionary.header.home);
    const projectsLink = within(desktopNav as HTMLElement).getByText(ptDictionary.header.projects);
    const competenciesLink = within(desktopNav as HTMLElement).getByText(ptDictionary.header.competencies);

    // Inicialmente, "Início" possui o destaque mecânico ativo
    expect(homeLink.className).toContain("shadow-[2px_2px_0px_0px_#b83a20]");
    expect(projectsLink.className).not.toContain("shadow-[2px_2px_0px_0px_#b83a20]");

    // Clica em "Projetos"
    await user.click(projectsLink);
    expect(projectsLink.className).toContain("shadow-[2px_2px_0px_0px_#b83a20]");
    expect(homeLink.className).not.toContain("shadow-[2px_2px_0px_0px_#b83a20]");

    // Clica em "Competências"
    await user.click(competenciesLink);
    expect(competenciesLink.className).toContain("shadow-[2px_2px_0px_0px_#b83a20]");
    expect(projectsLink.className).not.toContain("shadow-[2px_2px_0px_0px_#b83a20]");
  });

  it("deve garantir que todos os botões do Header possuam type='button', touch-manipulation e área de toque móvel", () => {
    render(
      <Providers>
        <Header />
      </Providers>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);

    for (const button of buttons) {
      expect(button).toHaveAttribute("type", "button");
      expect(button.className).toContain("touch-manipulation");
      expect(button.className).toContain("select-none");
    }
  });
});
