"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/i18n/context";
import { Moon, Sun, Globe, ExternalLink, Menu, X } from "lucide-react";

const emptySubscribe = () => () => {};

export type SectionId = "inicio" | "projetos" | "competencias" | "contato";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");
  const { t, locale, toggleLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted ? (theme === "dark" || resolvedTheme === "dark") : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleNavClick = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Se estiver no topo da página
      if (scrollY < 100) {
        setActiveSection("inicio");
        return;
      }

      // 2. Se o usuário estiver próximo ao fim da página com scroll real (rodapé/contato)
      if (documentHeight > windowHeight && scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection("contato");
        return;
      }

      // 3. Checa a visibilidade das seções em ordem reversa
      const sections: Array<{ id: SectionId; element: HTMLElement | null }> = [
        { id: "contato", element: document.getElementById("contato") },
        { id: "competencias", element: document.getElementById("competencias") },
        { id: "projetos", element: document.getElementById("projetos") },
        { id: "inicio", element: document.getElementById("inicio") },
      ];

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems: Array<{ id: SectionId; href: string; label: string }> = [
    { id: "inicio", href: "#", label: t.header.home },
    { id: "projetos", href: "#projetos", label: t.header.projects },
    { id: "competencias", href: "#competencias", label: t.header.competencies },
    { id: "contato", href: "#contato", label: t.header.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f4]/95 dark:bg-[#121314]/95 border-b-2 border-[#1c1b1d] dark:border-[#3d4147] backdrop-blur-sm">
      <div className="h-16 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a
            href="#"
            onClick={() => handleNavClick("inicio")}
            className="flex items-center gap-2 group min-w-0 font-mono"
          >
            <span className="w-3 h-3 bg-[#b83a20] inline-block shrink-0"></span>
            <span className="font-bold text-xs sm:text-base tracking-tight text-[#1c1b1d] dark:text-[#ede5d8] group-hover:text-[#b83a20] dark:group-hover:text-[#dcc9a9] transition-colors truncate">
              {t.header.title}
              {t.header.domain ? (
                <span className="text-xs text-[#584237] dark:text-[#dcc9a9]/70 font-normal font-mono hidden sm:inline ml-1">
                  {t.header.domain}
                </span>
              ) : null}
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center border border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] p-1 font-mono text-xs uppercase shrink-0">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 font-bold transition-none ${
                  isActive
                    ? "bg-[#1c1b1d] text-[#f5f5f4] dark:bg-[#ede5d8] dark:text-[#121314] shadow-[2px_2px_0px_0px_#b83a20]"
                    : "text-[#584237] dark:text-[#dcc9a9]/80 hover:text-[#1c1b1d] dark:hover:text-[#dcc9a9]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 relative z-20">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            title="Mudar Idioma / Change Language"
            aria-label="Mudar Idioma / Change Language"
            className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-9 sm:h-7 px-2.5 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none font-semibold cursor-pointer touch-manipulation select-none"
          >
            <Globe className="w-3.5 h-3.5 text-[#b83a20] shrink-0" />
            <span>{locale === "pt_BR" ? "PT" : "EN"}</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            className="inline-flex items-center justify-center gap-1 h-9 sm:h-7 px-2.5 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none font-semibold cursor-pointer touch-manipulation select-none"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#ffb4a4] shrink-0" />
                <span className="hidden sm:inline text-[11px]">{t.header.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#b83a20] shrink-0" />
                <span className="hidden sm:inline text-[11px]">{t.header.themeDark}</span>
              </>
            )}
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/Nubi-Prey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 h-9 sm:h-7 px-2.5 sm:px-3 bg-[#b83a20] text-[#ede5d8] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-xs uppercase font-bold shadow-mechanical-sm hover-shadow-orange-sm hover:bg-[#d04326] transition-none touch-manipulation select-none"
          >
            <span className="hidden sm:inline">{t.header.github}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none cursor-pointer touch-manipulation select-none"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#b83a20] shrink-0" />
            ) : (
              <Menu className="w-4 h-4 text-[#1c1b1d] dark:text-[#dcc9a9] shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav
          data-testid="mobile-menu"
          aria-label="Navegação mobile"
          className="md:hidden border-b-2 border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] shadow-mechanical px-4 py-3 space-y-1.5 relative z-20"
        >
          <div className="font-mono text-[10px] text-[#584237] dark:text-[#dcc9a9]/60 uppercase tracking-widest pb-1 border-b border-[#1c1b1d]/10 dark:border-[#3d4147]/50 mb-2">
            {"// NAVEGAÇÃO //"}
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`block px-3 py-2 font-mono text-xs font-bold uppercase transition-none touch-manipulation ${
                  isActive
                    ? "bg-[#1c1b1d] text-[#f5f5f4] dark:bg-[#ede5d8] dark:text-[#121314] shadow-mechanical-sm"
                    : "text-[#1c1b1d] dark:text-[#ede5d8] hover:bg-[#eae7ea] dark:hover:bg-[#202327] border border-[#1c1b1d]/20 dark:border-[#3d4147]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
