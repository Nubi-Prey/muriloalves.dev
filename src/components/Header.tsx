"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/i18n/context";
import { Moon, Sun, Globe, ExternalLink, Menu, X } from "lucide-react";

const emptySubscribe = () => () => {};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, locale, toggleLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted ? (theme === "dark" || resolvedTheme === "dark") : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f4]/95 dark:bg-[#121314]/95 border-b-2 border-[#1c1b1d] dark:border-[#3d4147] backdrop-blur-sm">
      <div className="h-16 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <a href="#" className="flex items-center gap-2 group min-w-0">
            <span className="w-3 h-3 bg-[#b83a20] inline-block shrink-0"></span>
            <span className="font-bold text-xs sm:text-base uppercase tracking-tight text-[#1c1b1d] dark:text-[#ede5d8] group-hover:text-[#b83a20] dark:group-hover:text-[#dcc9a9] transition-colors truncate">
              {t.header.title}{" "}
              <span className="text-xs text-[#584237] dark:text-[#dcc9a9]/70 font-normal font-mono hidden sm:inline">
                {t.header.domain}
              </span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center border border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] p-1 font-mono text-xs uppercase shrink-0">
          <a
            href="#"
            className="px-3 py-1 bg-[#1c1b1d] text-[#f5f5f4] dark:bg-[#ede5d8] dark:text-[#121314] font-bold shadow-[2px_2px_0px_0px_#b83a20]"
          >
            {t.header.home}
          </a>
          <a
            href="#projetos"
            className="px-3 py-1 text-[#584237] dark:text-[#dcc9a9]/80 hover:text-[#1c1b1d] dark:hover:text-[#dcc9a9] transition-none"
          >
            {t.header.projects}
          </a>
          <a
            href="#competencias"
            className="px-3 py-1 text-[#584237] dark:text-[#dcc9a9]/80 hover:text-[#1c1b1d] dark:hover:text-[#dcc9a9] transition-none"
          >
            {t.header.competencies}
          </a>
          <a
            href="#contato"
            className="px-3 py-1 text-[#584237] dark:text-[#dcc9a9]/80 hover:text-[#1c1b1d] dark:hover:text-[#dcc9a9] transition-none"
          >
            {t.header.contact}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title="Mudar Idioma / Change Language"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-[11px] sm:text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none font-semibold cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#b83a20]" />
            <span>{locale === "pt_BR" ? "PT" : "EN"}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-[11px] sm:text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none font-semibold cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#ffb4a4]" />
                <span className="hidden sm:inline text-[11px]">{t.header.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#b83a20]" />
                <span className="hidden sm:inline text-[11px]">{t.header.themeDark}</span>
              </>
            )}
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/Nubi-Prey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#b83a20] text-[#ede5d8] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-[11px] sm:text-xs uppercase font-bold shadow-mechanical-sm hover-shadow-orange-sm hover:bg-[#d04326] transition-none"
          >
            <span className="hidden sm:inline">{t.header.github}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center p-1.5 bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] shadow-mechanical-sm hover-shadow-orange-sm transition-none cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#b83a20]" />
            ) : (
              <Menu className="w-4 h-4 text-[#1c1b1d] dark:text-[#dcc9a9]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav
          data-testid="mobile-menu"
          aria-label="Navegação mobile"
          className="md:hidden border-b-2 border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] shadow-mechanical px-4 py-3 space-y-1.5"
        >
          <div className="font-mono text-[10px] text-[#584237] dark:text-[#dcc9a9]/60 uppercase tracking-widest pb-1 border-b border-[#1c1b1d]/10 dark:border-[#3d4147]/50 mb-2">
            {"// NAVEGAÇÃO //"}
          </div>
          <a
            href="#"
            onClick={handleNavClick}
            className="block px-3 py-2 bg-[#1c1b1d] text-[#f5f5f4] dark:bg-[#ede5d8] dark:text-[#121314] font-mono text-xs font-bold uppercase shadow-mechanical-sm"
          >
            {t.header.home}
          </a>
          <a
            href="#projetos"
            onClick={handleNavClick}
            className="block px-3 py-2 text-[#1c1b1d] dark:text-[#ede5d8] hover:bg-[#eae7ea] dark:hover:bg-[#202327] font-mono text-xs font-bold uppercase border border-[#1c1b1d]/20 dark:border-[#3d4147] transition-none"
          >
            {t.header.projects}
          </a>
          <a
            href="#competencias"
            onClick={handleNavClick}
            className="block px-3 py-2 text-[#1c1b1d] dark:text-[#ede5d8] hover:bg-[#eae7ea] dark:hover:bg-[#202327] font-mono text-xs font-bold uppercase border border-[#1c1b1d]/20 dark:border-[#3d4147] transition-none"
          >
            {t.header.competencies}
          </a>
          <a
            href="#contato"
            onClick={handleNavClick}
            className="block px-3 py-2 text-[#1c1b1d] dark:text-[#ede5d8] hover:bg-[#eae7ea] dark:hover:bg-[#202327] font-mono text-xs font-bold uppercase border border-[#1c1b1d]/20 dark:border-[#3d4147] transition-none"
          >
            {t.header.contact}
          </a>
        </nav>
      )}
    </header>
  );
}
