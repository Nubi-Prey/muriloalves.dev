"use client";

import React from "react";
import { useLanguage } from "@/i18n/context";
import { Mail, Code, Link as LinkIcon } from "lucide-react";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8" id="contato">
      <div className="border-2 border-[#1c1b1d] dark:border-[#3d4147] bg-[#ffffff] dark:bg-[#191b1e] shadow-mechanical p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="font-mono text-xs text-[#b83a20] dark:text-[#ffb4a4] font-bold uppercase tracking-wider">
            {t.contact.tagline}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#1c1b1d] dark:text-[#ede5d8]">
            {t.contact.title}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-[#584237] dark:text-[#c5bba8]">
            {t.contact.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <a
            href="mailto:muriloalvesnp@gmail.com"
            className="px-4 py-2.5 min-h-[44px] bg-[#b83a20] text-[#ffffff] dark:text-[#ede5d8] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs uppercase font-bold shadow-mechanical-sm hover-shadow-orange-sm hover:bg-[#d04326] transition-none inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">{t.contact.emailBtn}</span>
          </a>

          <a
            href="https://github.com/Nubi-Prey"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 min-h-[44px] bg-[#eae7ea] dark:bg-[#202327] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs uppercase font-bold text-[#1c1b1d] dark:text-[#dcc9a9] hover:bg-[#f5f5f4] dark:hover:bg-[#282b30] shadow-mechanical-sm hover-shadow-orange-sm transition-none inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Code className="w-4 h-4 shrink-0" />
            <span>{t.contact.githubBtn}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/murilo-alves-np/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 min-h-[44px] bg-[#eae7ea] dark:bg-[#202327] border border-[#1c1b1d] dark:border-[#3d4147] font-mono text-xs uppercase font-bold text-[#1c1b1d] dark:text-[#dcc9a9] hover:bg-[#f5f5f4] dark:hover:bg-[#282b30] shadow-mechanical-sm hover-shadow-orange-sm transition-none inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <LinkIcon className="w-4 h-4 shrink-0" />
            <span>{t.contact.linkedinBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
