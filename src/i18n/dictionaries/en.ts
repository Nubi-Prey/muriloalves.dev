import { Dictionary } from "../types";
import { getLocalizedProjects } from "@/lib/projects";

export const enDictionary: Dictionary = {
  header: {
    title: "MURILO ALVES",
    domain: "[muriloalves.dev]",
    home: "Home",
    projects: "Projects",
    competencies: "Competencies",
    contact: "Contact",
    github: "GITHUB",
    themeLight: "LIGHT",
    themeDark: "DARK",
  },
  hero: {
    statusBadge: "ENGINEERING PORTFOLIO // MURILO ALVES",
    name: "MURILO ALVES",
    role: "Software & Systems Engineer",
    bio: "Software engineer working on low-level systems, pure C computer graphics, and offline-first desktop tools built for continuous commercial operations without cloud dependencies.",
    tags: [
      "Systems & Low-Level",
      "Computer Graphics",
      "Desktop Local-First",
      "Precision Engineering",
    ],
    btnProjects: "View Projects",
    btnGithub: "Open GitHub",
    btnContact: "Get in Touch",
  },
  projects: {
    sectionTitle: "FEATURED PROJECTS",
    catalogCount: "6 AUDITED REPOSITORIES",
    viewGithub: "VIEW ON GITHUB",
    projectsList: getLocalizedProjects("en_US"),
  },
  competencies: {
    title: "Core Areas & Technical Competencies",
    subtitle: "Engineering practices applied across systems software, graphics algorithms, and desktop tools.",
    status: "STATUS: AVAILABLE FOR PROPOSALS",
    refLabel: "REFERENCE PROJECT:",
    cards: [
      {
        icon: "memory",
        title: "Systems & Kernel",
        description:
          "Custom Linux kernel compilation with Buildroot, direct DRM/KMS pipeline handling, and Rust Wayland compositors using Smithay.",
        projectRef: "MineOS",
      },
      {
        icon: "hardware",
        title: "Graphics & Pure C",
        description:
          "Numerical image processing and error-diffusion dithering in pure C, connected to PySide6/Qt6 interfaces via ctypes without blocking the UI thread.",
        projectRef: "Engraver",
      },
      {
        icon: "desktop",
        title: "Desktop Local-First",
        description:
          "Countertop and point-of-sale desktop tools using Electron and React 19. Embedded SQLite (better-sqlite3) and Drizzle for instant responses and continuous offline operation.",
        projectRef: "Lupa / EstoqueLentes",
      },
      {
        icon: "dns",
        title: "Backends & Event-Driven",
        description:
          "Event-driven services in Java 17 using JDA 5 and PostgreSQL connection pools, containerized and automated with Docker Compose.",
        projectRef: "Astolfo-bot",
      },
    ],
  },
  contact: {
    tagline: "CONTACT & TRANSMISSIONS",
    title: "Let's talk about systems, low-level engineering, or software architecture",
    description: "Available for roles and projects in systems engineering, local-first desktop software, and low-latency architecture.",
    emailBtn: "muriloalvesnp@gmail.com",
    githubBtn: "GitHub",
    linkedinBtn: "LinkedIn",
  },
  footer: {
    nameRole: "MURILO ALVES // SOFTWARE ENGINEERING",
    summary: "Systems engineering, computer graphics, firmware, and local-first desktop software architecture.",
    connectionsTitle: "CONNECTIONS",
    connections: [
      { label: "GITHUB", value: "Nubi-Prey", url: "https://github.com/Nubi-Prey" },
      { label: "LINKEDIN", value: "Murilo Alves", url: "https://www.linkedin.com/in/murilo-alves-np/" },
      { label: "EMAIL", value: "muriloalvesnp@gmail.com", url: "mailto:muriloalvesnp@gmail.com" },
    ],
    rights: "© 2026 MURILO ALVES. ALL RIGHTS RESERVED.",
  },
};
