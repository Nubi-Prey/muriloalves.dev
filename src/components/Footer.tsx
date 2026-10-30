"use client";

import React from "react";
import { useLanguage } from "@/i18n/context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#f5f5f4] dark:bg-[#141517] border-t-2 border-[#1c1b1d] dark:border-[#2e3136] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-[#1c1b1d] dark:border-[#2e3136]">
          {/* Identity */}
          <div className="max-w-md flex flex-col gap-2">
            <div className="font-bold text-sm uppercase text-[#1c1b1d] dark:text-[#ede5d8]">
              {t.footer.nameRole}
            </div>
            <div className="font-mono text-xs text-[#584237] dark:text-[#c5bba8] leading-relaxed">
              {t.footer.summary}
            </div>
          </div>

          {/* Connections */}
          <div className="flex flex-col gap-2 min-w-[240px]">
            <div className="font-mono text-xs uppercase text-[#1c1b1d] dark:text-[#dcc9a9] font-bold">
              {t.footer.connectionsTitle}
            </div>
            <ul className="flex flex-col gap-1.5 font-mono text-xs uppercase">
              {t.footer.connections.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between border-b border-[#1c1b1d]/20 dark:border-[#2e3136] pb-1 gap-4"
                >
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#584237] hover:text-[#b83a20] dark:text-[#c5bba8] dark:hover:text-[#dcc9a9] transition-none"
                  >
                    {c.label}
                  </a>
                  <span className="text-[#1c1b1d] dark:text-[#dcc9a9]/70 text-[11px] truncate">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-[#584237] dark:text-[#dcc9a9]/60 uppercase">
          <div>{t.footer.rights}</div>
          <div className="text-[#1c1b1d] dark:text-[#dcc9a9]/80 font-semibold">
            muriloalves.dev
          </div>
        </div>
      </div>
    </footer>
  );
}
