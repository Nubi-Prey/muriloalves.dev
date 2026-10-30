import { Dictionary } from "../types";
import { getLocalizedProjects } from "@/lib/projects";

export const ptDictionary: Dictionary = {
  header: {
    title: "MURILO ALVES",
    domain: "[muriloalves.dev]",
    home: "Início",
    projects: "Projetos",
    competencies: "Competências",
    contact: "Contato",
    github: "GITHUB",
    themeLight: "CLARO",
    themeDark: "ESCURO",
  },
  hero: {
    statusBadge: "PORTFÓLIO DE ENGENHARIA // MURILO ALVES",
    name: "MURILO ALVES",
    role: "Engenheiro de Software & Sistemas",
    bio: "Engenheiro de software focado em sistemas de baixo nível, arquitetura de backend, bancos de dados e ferramentas desktop construídas para operar continuamente em comércio e oficinas, sem depender de conexão com a nuvem.",
    tags: [
      "Sistemas & Baixo Nível",
      "Backend & Bancos de Dados",
      "Desktop Local-First",
      "Engenharia de Precisão",
    ],
    btnProjects: "Ver Projetos",
    btnGithub: "Acessar GitHub",
    btnContact: "Entrar em Contato",
  },
  projects: {
    sectionTitle: "PROJETOS EM DESTAQUE",
    catalogCount: "6 REPOSITÓRIOS AUDITADOS",
    viewGithub: "VER NO GITHUB",
    projectsList: getLocalizedProjects("pt_BR"),
  },
  competencies: {
    title: "Áreas de Atuação & Competências Técnicas",
    subtitle: "Práticas de engenharia aplicadas em projetos de sistemas, arquitetura backend, bancos de dados e aplicações desktop.",
    status: "STATUS: DISPONÍVEL PARA PROPOSTAS",
    refLabel: "PROJETO DE REFERÊNCIA:",
    cards: [
      {
        icon: "memory",
        title: "Sistemas & Kernel",
        description:
          "Compilação de kernel Linux enxuto com Buildroot, controle de pipelines DRM/KMS e desenvolvimento de compositores Wayland em Rust com Smithay.",
        projectRef: "MineOS",
      },
      {
        icon: "hardware",
        title: "Gráficos & C Puro",
        description:
          "Processamento numérico de imagens e dithering implementados em C puro, integrados a interfaces PySide6/Qt6 via ctypes sem bloquear a interface.",
        projectRef: "Engraver",
      },
      {
        icon: "desktop",
        title: "Desktop Local-First",
        description:
          "Aplicativos para frente de caixa e balcão em Electron e React 19. Persistência local com SQLite (better-sqlite3) e Drizzle para resposta instantânea e operação offline contínua.",
        projectRef: "Lupa / EstoqueLentes",
      },
      {
        icon: "dns",
        title: "Backends & Bancos de Dados",
        description:
          "Serviços orientados a eventos e APIs em Java e TypeScript, modelagem relacional com PostgreSQL e SQLite, pools de conexão de alta performance e ambientes conteinerizados com Docker.",
        projectRef: "Astolfo-bot",
      },
    ],
  },
  contact: {
    tagline: "CONTATO & OPORTUNIDADES",
    title: "Vamos conversar sobre sistemas, backend, bancos de dados ou arquitetura de software",
    description: "Disponível para contratação e projetos em engenharia de sistemas, desenvolvimento backend, bancos de dados e software desktop de alta confiabilidade.",
    emailBtn: "muriloalvesnp@gmail.com",
    githubBtn: "GitHub",
    linkedinBtn: "LinkedIn",
  },
  footer: {
    nameRole: "MURILO ALVES // ENGENHARIA DE SOFTWARE",
    summary: "Engenharia de sistemas, backend resiliente, bancos de dados e arquitetura de software desktop local-first.",
    connectionsTitle: "CONEXÕES",
    connections: [
      { label: "GITHUB", value: "Nubi-Prey", url: "https://github.com/Nubi-Prey" },
      { label: "LINKEDIN", value: "Murilo Alves", url: "https://www.linkedin.com/in/murilo-alves-np/" },
      { label: "EMAIL", value: "muriloalvesnp@gmail.com", url: "mailto:muriloalvesnp@gmail.com" },
    ],
    rights: "© 2026 MURILO ALVES. TODOS OS DIREITOS RESERVADOS.",
  },
};
