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
    bio: "Engenheiro de software focado em sistemas de baixo nível, computação gráfica em C puro e ferramentas desktop construídas para operar continuamente em comércio e oficinas, sem depender de conexão com a nuvem.",
    tags: [
      "Sistemas & Baixo Nível",
      "Computação Gráfica",
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
    subtitle: "Práticas de engenharia aplicadas em projetos de sistemas, computação gráfica e aplicações desktop.",
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
        title: "Backends & Eventos",
        description:
          "Serviços orientados a eventos em Java 17 com a biblioteca JDA 5 e pools de conexão para PostgreSQL, com ambiente conteinerizado via Docker Compose.",
        projectRef: "Astolfo-bot",
      },
    ],
  },
  contact: {
    tagline: "CONTATO & OPORTUNIDADES",
    title: "Vamos conversar sobre sistemas, baixo nível ou arquitetura de software",
    description: "Disponível para contratação e projetos em engenharia de sistemas, ferramentas desktop locais e software de baixa latência.",
    emailBtn: "muriloalvesnp@gmail.com",
    githubBtn: "GitHub",
    linkedinBtn: "LinkedIn",
  },
  footer: {
    nameRole: "MURILO ALVES // ENGENHARIA DE SOFTWARE",
    summary: "Engenharia de sistemas, computação gráfica, firmwares e arquitetura de software desktop local-first.",
    connectionsTitle: "CONEXÕES",
    connections: [
      { label: "GITHUB", value: "Nubi-Prey", url: "https://github.com/Nubi-Prey" },
      { label: "LINKEDIN", value: "Murilo Alves", url: "https://www.linkedin.com/in/murilo-alves-np/" },
      { label: "EMAIL", value: "muriloalvesnp@gmail.com", url: "mailto:muriloalvesnp@gmail.com" },
    ],
    rights: "© 2026 MURILO ALVES. TODOS OS DIREITOS RESERVADOS.",
  },
};
