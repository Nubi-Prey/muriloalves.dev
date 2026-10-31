"use client";

import React from "react";
import { useLanguage } from "@/i18n/context";
import { Cpu, Monitor, Server, Terminal } from "lucide-react";

export function Competencies() {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "memory":
        return <Cpu aria-hidden="true" className="w-5 h-5 text-[#b83a20] shrink-0" />;
      case "hardware":
        return <Terminal aria-hidden="true" className="w-5 h-5 text-[#b83a20] shrink-0" />;
      case "desktop":
        return <Monitor aria-hidden="true" className="w-5 h-5 text-[#b83a20] shrink-0" />;
      case "dns":
        return <Server aria-hidden="true" className="w-5 h-5 text-[#b83a20] shrink-0" />;
      default:
        return <Cpu aria-hidden="true" className="w-5 h-5 text-[#b83a20] shrink-0" />;
    }
  };

  return (
    <section
      className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 scroll-mt-16"
      id="competencias"
      aria-labelledby="competencies-heading"
    >
      <div className="border-2 border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] shadow-mechanical p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#1c1b1d] dark:border-[#2e3136] pb-5 gap-3 sm:gap-4">
          <div>
            <h2
              id="competencies-heading"
              className="text-xl sm:text-2xl font-bold uppercase text-[#1c1b1d] dark:text-[#ede5d8]"
            >
              {t.competencies.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#584237] dark:text-[#c5bba8] pt-1">
              {t.competencies.subtitle}
            </p>
          </div>
          <div className="font-mono text-[11px] sm:text-xs bg-[#eae7ea] dark:bg-[#202327] text-[#1c1b1d] dark:text-[#dcc9a9] px-3.5 py-1.5 border border-[#1c1b1d] dark:border-[#3d4147] font-semibold flex items-center gap-2 shrink-0 self-start md:self-auto">
            <span
              aria-hidden="true"
              className="w-2 h-2 bg-[#4e6851] inline-block shrink-0"
            ></span>
            <span>{t.competencies.status}</span>
          </div>
        </div>

        {/* 4 Quadrants: 1 col on mobile (<768px), 2 cols on tablet (md), 4 cols on desktop (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {t.competencies.cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#f5f5f4] dark:bg-[#121314] border border-[#1c1b1d] dark:border-[#2e3136] p-4 flex flex-col justify-between hover-shadow-orange hover:border-[#b83a20] transition-none cursor-default"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getIcon(card.icon)}
                  <h3 className="text-sm font-bold uppercase text-[#1c1b1d] dark:text-[#ede5d8]">
                    {card.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-[#584237] dark:text-[#c5bba8] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1c1b1d]/20 dark:border-[#2e3136] mt-4">
                <span className="font-mono text-[10px] text-[#584237] dark:text-[#dcc9a9]/60 block uppercase">
                  {t.competencies.refLabel}
                </span>
                <span className="font-mono font-bold text-[#1c1b1d] dark:text-[#dcc9a9] text-xs">
                  {card.projectRef}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
