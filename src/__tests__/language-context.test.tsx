import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  LanguageProvider,
  useLanguage,
  LOCALE_STORAGE_KEY,
  isValidLocale,
} from "@/i18n/context";

function LanguageConsumerProbe() {
  const { locale, t, toggleLanguage, setLocale } = useLanguage();
  return (
    <div>
      <span data-testid="active-locale">{locale}</span>
      <span data-testid="hero-role">{t.hero.role}</span>
      <span data-testid="nav-projects">{t.header.projects}</span>
      <button data-testid="btn-toggle" onClick={toggleLanguage}>
        Toggle
      </button>
      <button data-testid="btn-set-en" onClick={() => setLocale("en_US")}>
        Set EN
      </button>
      <button data-testid="btn-set-pt" onClick={() => setLocale("pt_BR")}>
        Set PT
      </button>
    </div>
  );
}

describe("LanguageProvider & useLanguage (Sincronização de Estado e Storage)", () => {
  it("deve lançar erro explícito quando useLanguage é invocado fora de LanguageProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => render(<LanguageConsumerProbe />)).toThrowError(
        "useLanguage must be used within a LanguageProvider"
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });

  it("deve validar corretamente códigos de locale com isValidLocale", () => {
    expect(isValidLocale("pt_BR")).toBe(true);
    expect(isValidLocale("en_US")).toBe(true);
    expect(isValidLocale("es_ES")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale(null)).toBe(false);
    expect(isValidLocale(undefined)).toBe(false);
  });

  it("deve inicializar em pt_BR por padrão e alternar ciclicamente entre pt_BR e en_US persistindo no localStorage", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <LanguageConsumerProbe />
      </LanguageProvider>
    );

    expect(screen.getByTestId("active-locale")).toHaveTextContent("pt_BR");
    expect(screen.getByTestId("hero-role")).toHaveTextContent(
      "Desenvolvedor de Software & Sistemas"
    );

    // 1º clique: pt_BR -> en_US
    await user.click(screen.getByTestId("btn-toggle"));
    expect(screen.getByTestId("active-locale")).toHaveTextContent("en_US");
    expect(screen.getByTestId("hero-role")).toHaveTextContent(
      "Software & Systems Developer"
    );
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en_US");

    // 2º clique: en_US -> pt_BR
    await user.click(screen.getByTestId("btn-toggle"));
    expect(screen.getByTestId("active-locale")).toHaveTextContent("pt_BR");
    expect(screen.getByTestId("hero-role")).toHaveTextContent(
      "Desenvolvedor de Software & Sistemas"
    );
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt_BR");

    // 3º clique: pt_BR -> en_US
    await user.click(screen.getByTestId("btn-toggle"));
    expect(screen.getByTestId("active-locale")).toHaveTextContent("en_US");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en_US");
  });

  it("deve alternar imediatamente de en_US para pt_BR no primeiro clique quando localStorage já inicia populado com en_US", async () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "en_US");
    const user = userEvent.setup();

    render(
      <LanguageProvider>
        <LanguageConsumerProbe />
      </LanguageProvider>
    );

    // Hidratação já deve refletir en_US salvo previamente
    expect(screen.getByTestId("active-locale")).toHaveTextContent("en_US");
    expect(screen.getByTestId("nav-projects")).toHaveTextContent("Projects");

    // Primeiro clique DEVE mudar para pt_BR sem precisar de duplo clique (regressão de bailout do useState)
    await user.click(screen.getByTestId("btn-toggle"));
    expect(screen.getByTestId("active-locale")).toHaveTextContent("pt_BR");
    expect(screen.getByTestId("nav-projects")).toHaveTextContent("Projetos");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt_BR");
  });

  it("deve higienizar valor inválido/corrompido no localStorage fazendo fallback seguro para pt_BR", async () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, "CORRUPTED_LOCALE_VALUE");
    const user = userEvent.setup();

    render(
      <LanguageProvider>
        <LanguageConsumerProbe />
      </LanguageProvider>
    );

    expect(screen.getByTestId("active-locale")).toHaveTextContent("pt_BR");
    expect(screen.getByTestId("hero-role")).toHaveTextContent(
      "Desenvolvedor de Software & Sistemas"
    );

    await user.click(screen.getByTestId("btn-toggle"));
    expect(screen.getByTestId("active-locale")).toHaveTextContent("en_US");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("en_US");
  });

  it("deve sincronizar reativamente quando outro contexto dispara evento storage na janela", () => {
    render(
      <LanguageProvider>
        <LanguageConsumerProbe />
      </LanguageProvider>
    );

    expect(screen.getByTestId("active-locale")).toHaveTextContent("pt_BR");

    act(() => {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, "en_US");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: LOCALE_STORAGE_KEY,
          newValue: "en_US",
        })
      );
    });

    expect(screen.getByTestId("active-locale")).toHaveTextContent("en_US");
    expect(screen.getByTestId("hero-role")).toHaveTextContent(
      "Software & Systems Developer"
    );
  });
});
