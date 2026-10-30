import React from "react";
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

const GLOBALS_CSS_PATH = path.resolve(__dirname, "../app/globals.css");

describe("Arquitetura CSS, Variante Dark Tailwind v4, Sombra Laranja no Hover e Alternância de Tema", () => {
  const cssContent = fs.readFileSync(GLOBALS_CSS_PATH, "utf-8");

  it("deve declarar @custom-variant dark (&:where(.dark, .dark *)) no globals.css para compatibilidade com next-themes no Tailwind v4", () => {
    expect(cssContent).toMatch(
      /@custom-variant\s+dark\s+\(&:where\(\.dark,\s*\.dark\s+\*\)\);/
    );
  });

  it("deve definir variáveis CSS distintas para :root (Light Mode) e .dark (Dark Mode) além de border-radius 0px", () => {
    expect(cssContent).toContain("--bg-base: #f5f5f4;");
    expect(cssContent).toContain("--surface-card: #ffffff;");
    expect(cssContent).toContain("--shadow-color: #1c1b1d;");

    expect(cssContent).toContain("--bg-base: #121314;");
    expect(cssContent).toContain("--surface-card: #191b1e;");
    expect(cssContent).toContain("--shadow-color: #000000;");

    expect(cssContent).toMatch(/border-radius:\s*0px\s*!important;/);
  });

  it("deve definir as classes utilitárias de hover com sombra mais grossa e cor laranja (#b83a20)", () => {
    expect(cssContent).toMatch(
      /\.hover-shadow-orange:hover\s*\{[\s\S]*?transform:\s*translate\(-2px,\s*-2px\);[\s\S]*?box-shadow:\s*6px\s+6px\s+0px\s+0px\s+#b83a20\s*!important;[\s\S]*?border-color:\s*#b83a20\s*!important;/
    );
    expect(cssContent).toMatch(
      /\.hover-shadow-orange-sm:hover\s*\{[\s\S]*?transform:\s*translate\(-1px,\s*-1px\);[\s\S]*?box-shadow:\s*3px\s+3px\s+0px\s+0px\s+#b83a20\s*!important;[\s\S]*?border-color:\s*#b83a20\s*!important;/
    );
  });

  it("deve alternar a classe 'dark' e 'light' no elemento <html> ao clicar no botão de tema no Header", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Header />
      </Providers>
    );

    // Estado inicial deve ser dark
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    const themeButton = screen.getByTitle(/Ativar Modo Claro/i);
    expect(themeButton).toHaveTextContent("CLARO");

    // Clicar para ativar o Modo Claro
    await user.click(themeButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    const darkToggleBtn = screen.getByTitle(/Ativar Modo Escuro/i);
    expect(darkToggleBtn).toHaveTextContent("ESCURO");

    // Clicar novamente para voltar ao Modo Escuro
    await user.click(darkToggleBtn);

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);
    });
  });
});
