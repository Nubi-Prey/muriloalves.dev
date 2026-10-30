"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/i18n/context";
import { ProjectCard } from "./ProjectCard";
import { PortfolioProjectSchemaV2 } from "@/types/project-schema";
import { toLocalizedProjectData } from "@/lib/projects";
import { ProjectData } from "@/i18n/types";

export interface ProjectsSectionProps {
  initialProjects?: readonly PortfolioProjectSchemaV2[];
}

export function ProjectsSection({ initialProjects }: ProjectsSectionProps = {}) {
  const { locale, t } = useLanguage();

  const projectList: ProjectData[] = useMemo(() => {
    if (initialProjects && initialProjects.length > 0) {
      return initialProjects.map((schema) =>
        toLocalizedProjectData(schema, locale)
      );
    }
    return t.projects.projectsList;
  }, [initialProjects, locale, t.projects.projectsList]);

  const catalogCountText =
    initialProjects && initialProjects.length > 0
      ? `${projectList.length} ${
          locale === "en_US" ? "AUDITED REPOSITORIES" : "REPOSITÓRIOS AUDITADOS"
        }`
      : t.projects.catalogCount;

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 scroll-mt-16" id="projetos">
      {/* Section Divider Bar */}
      <div className="border-y-2 border-[#1c1b1d] dark:border-[#3d4147] py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#ffffff] dark:bg-[#191b1e] px-4 shadow-mechanical-sm">
        <div className="flex items-center gap-2.5 text-base sm:text-lg uppercase font-bold text-[#1c1b1d] dark:text-[#ede5d8]">
          <span className="w-3 h-3 bg-[#b83a20] inline-block shrink-0"></span>
          <span>{t.projects.sectionTitle}</span>
        </div>
        <div className="font-mono text-xs uppercase text-[#584237] dark:text-[#dcc9a9] flex items-center gap-4 font-semibold">
          <span>{catalogCountText}</span>
        </div>
      </div>

      {/* Grid: strictly 1 column on mobile (< 768px), 2 columns on tablet (md), 3 columns on desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-6">
        {projectList.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewGithubText={t.projects.viewGithub}
          />
        ))}
      </div>
    </section>
  );
}
