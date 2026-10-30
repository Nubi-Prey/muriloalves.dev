"use client";

import React from "react";
import { ProjectData } from "@/i18n/types";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: ProjectData;
  viewGithubText: string;
}

export function ProjectCard({ project, viewGithubText }: ProjectCardProps) {
  // Cores dinâmicas para categorias
  const getCategoryBadgeClass = (category: string) => {
    if (category.includes("Kernel") || category.includes("Sistemas") || category.includes("Systems")) {
      return "bg-[#b83a20] text-[#ffded7]";
    }
    if (category.includes("Gráfica") || category.includes("Graphics")) {
      return "bg-[#73644a] text-[#f6e2c1]";
    }
    if (category.includes("Local-First") || category.includes("Desktop")) {
      return "bg-[#4e6851] text-[#ede5d8]";
    }
    if (category.includes("DevOps") || category.includes("Backend")) {
      return "bg-[#b83a20] text-[#ffded7]";
    }
    return "bg-[#334d37] text-[#a0bca1]";
  };

  return (
    <article className="flex flex-col justify-between bg-[#ffffff] dark:bg-[#191b1e] border-2 border-[#1c1b1d] dark:border-[#3d4147] shadow-mechanical hover-shadow-orange hover:translate-x-[-2px] hover:translate-y-[-2px] hover:border-[#b83a20] dark:hover:border-[#b83a20] hover:shadow-[6px_6px_0px_0px_#b83a20] transition-none group w-full">
      {/* Top Content */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Repo Header */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          <span className="font-mono font-bold text-[#584237] dark:text-[#dcc9a9] text-xs truncate max-w-[220px] sm:max-w-none">
            {project.casing}
          </span>
          <span
            className={`px-2 py-0.5 font-mono font-bold text-[10px] uppercase shrink-0 ${getCategoryBadgeClass(
              project.category
            )}`}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#1c1b1d] dark:text-[#ede5d8] group-hover:text-[#b83a20] dark:group-hover:text-[#ffb4a4] transition-none">
          {project.title}
        </h2>

        {/* Description */}
        <p className="font-mono text-xs sm:text-sm text-[#584237] dark:text-[#c5bba8] leading-relaxed">
          {project.description}
        </p>

        {/* Real Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag, idx) => (
            <span
              key={tag}
              className={`px-2 py-0.5 bg-[#f5f5f4] dark:bg-[#121314] border border-[#1c1b1d] dark:border-[#2e3136] font-mono text-[10px] sm:text-[11px] font-semibold ${
                idx === 1
                  ? "text-[#b83a20] dark:text-[#ffb4a4]"
                  : idx === 2
                  ? "text-[#334d37] dark:text-[#a0bca1]"
                  : "text-[#1c1b1d] dark:text-[#dcc9a9]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="border-t-2 border-[#1c1b1d] dark:border-[#2e3136] bg-[#eae7ea] dark:bg-[#16181a] px-3.5 sm:px-4 py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-[#334d37] dark:text-[#a0bca1] font-bold">
          {project.badge}
        </span>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1c1b1d] dark:text-[#dcc9a9] hover:text-[#b83a20] dark:hover:text-[#ffb4a4] uppercase group-hover:underline min-h-[32px] sm:min-h-0"
        >
          <span>{viewGithubText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
