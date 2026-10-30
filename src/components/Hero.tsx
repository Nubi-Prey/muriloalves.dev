"use client";

import React from "react";
import { useLanguage } from "@/i18n/context";
import { ArrowDown, ExternalLink } from "lucide-react";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pt-28 sm:pb-12">
      <div className="max-w-4xl space-y-5">
        {/* Status Label */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#eae7ea] dark:bg-[#1e2024] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-[10px] sm:text-xs tracking-wider text-[#1c1b1d] dark:text-[#dcc9a9] uppercase font-bold shadow-mechanical-sm max-w-full">
          <span className="w-2 h-2 bg-[#b83a20] shrink-0"></span>
          <span className="truncate">{t.hero.statusBadge}</span>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-[#1c1b1d] dark:text-[#ede5d8]">
            {t.hero.name}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-semibold text-[#b83a20] dark:text-[#ffb4a4] pt-1.5 uppercase tracking-wide">
            {t.hero.role}
          </p>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#584237] dark:text-[#c5bba8] max-w-3xl font-mono">
          {t.hero.bio}
        </p>

        {/* Competency Badges */}
        <div className="pt-1 flex flex-wrap gap-1.5 sm:gap-2">
          {t.hero.tags.map((tag, index) => (
            <span
              key={tag}
              className={`px-2.5 sm:px-3 py-1 border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-[11px] sm:text-xs font-semibold bg-[#ffffff] dark:bg-[#191b1e] ${
                index === 0
                  ? "text-[#1c1b1d] dark:text-[#dcc9a9]"
                  : index === 1
                  ? "text-[#b83a20] dark:text-[#ffb4a4]"
                  : index === 2
                  ? "text-[#334d37] dark:text-[#a0bca1]"
                  : "text-[#1c1b1d] dark:text-[#dcc9a9]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="#projetos"
            className="px-5 py-2.5 min-h-[44px] bg-[#b83a20] text-[#ffffff] dark:text-[#ede5d8] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-sm uppercase font-bold hover:bg-[#d04326] transition-none shadow-mechanical hover-shadow-orange inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>{t.hero.btnProjects}</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/Nubi-Prey"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 min-h-[44px] bg-[#ffffff] dark:bg-[#191b1e] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-sm uppercase font-bold text-[#1c1b1d] dark:text-[#dcc9a9] hover:bg-[#eae7ea] dark:hover:bg-[#202327] transition-none shadow-mechanical hover-shadow-orange inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>{t.hero.btnGithub}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="mailto:muriloalvesnp@gmail.com"
            className="px-5 py-2.5 min-h-[44px] bg-[#eae7ea] dark:bg-[#202327] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs sm:text-sm uppercase font-bold text-[#1c1b1d] dark:text-[#dcc9a9] hover:bg-[#f5f5f4] dark:hover:bg-[#282b30] transition-none shadow-mechanical hover-shadow-orange inline-flex items-center justify-center w-full sm:w-auto"
          >
            {t.hero.btnContact}
          </a>
        </div>
      </div>
    </section>
  );
}
