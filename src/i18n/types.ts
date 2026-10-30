import { ProjectCategoryKey, ProjectLinks } from "@/types/project-schema";

export type Locale = "pt_BR" | "en_US";

export interface ProjectData {
  id: string;
  repo: string;
  casing: string;
  url: string;
  categoryKey: ProjectCategoryKey;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  description: string;
  tags: string[];
  highlights: string[];
  links: ProjectLinks;
  refLabel: string;
}

export interface Dictionary {
  header: {
    title: string;
    domain: string;
    home: string;
    projects: string;
    competencies: string;
    contact: string;
    github: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    statusBadge: string;
    name: string;
    role: string;
    bio: string;
    tags: string[];
    btnProjects: string;
    btnGithub: string;
    btnContact: string;
  };
  projects: {
    sectionTitle: string;
    catalogCount: string;
    viewGithub: string;
    projectsList: ProjectData[];
  };
  competencies: {
    title: string;
    subtitle: string;
    status: string;
    refLabel: string;
    cards: Array<{
      icon: "memory" | "hardware" | "desktop" | "dns";
      title: string;
      description: string;
      projectRef: string;
    }>;
  };
  contact: {
    tagline: string;
    title: string;
    description: string;
    emailBtn: string;
    githubBtn: string;
    linkedinBtn: string;
  };
  footer: {
    nameRole: string;
    summary: string;
    connectionsTitle: string;
    connections: Array<{
      label: string;
      value: string;
      url: string;
    }>;
    rights: string;
  };
}
