# Índice de Documentação & Design: muriloalves.dev

Esta pasta reúne todo o material de planejamento, especificações técnicas, decisões arquiteturais e protótipos de interface para a construção do portfólio **`muriloalves.dev`**.

---

## 🗂️ Estrutura de Documentos

### 1. [CONSOLIDACAO_SESSAO.md](./CONSOLIDACAO_SESSAO.md)
Registro detalhado e cronológico de todas as decisões tomadas ao longo da sessão de planejamento:
- Histórico de evolução do escopo (de backend hobby para engenharia de sistemas);
- Fichas técnicas dos 6 repositórios fixados no GitHub;
- Registro formal de decisões arquiteturais (ADRs: repositório novo, descontinuação do `nubi.live`, DNS no Cloudflare);
- Roteiro de implementação para as próximas etapas.

### 2. [PORTFOLIO_PROJETOS.md](./PORTFOLIO_PROJETOS.md)
Análise exaustiva de engenharia de software para cada um dos 6 projetos fixados no GitHub de **@Nubi-Prey**:
- **MineOS**: Linux Kernel 6.6 LTS, Buildroot, compositor Wayland 3D, Smithay (Rust) e Fabric (Java 25).
- **Engraver**: Estúdio de dithering e pré-processamento de imagens acelerado em C puro (`ctypes`), Qt6 e Nuitka.
- **Lupa**: Gerenciador de Ordens de Serviço para joalherias com arquitetura local-first e MongoDB Atlas.
- **EstoqueLentes**: Gestão de estoque físico com matriz dióptrica 2D, SQLite embutido via `better-sqlite3` e Drizzle ORM.
- **Astolfo-bot**: Bot corporativo modular em Java 17 com JDA 5 e PostgreSQL conteinerizado.
- **Nubi.live**: O marco histórico de 2024 onde tudo começou.

### 3. [UI/](./UI/)
Biblioteca canônica de design visual e mockups de alta fidelidade:
- **`DESIGN_dark.md`**: Especificação formal do Design System *"Cyber-Industrial Terminal Documental"*, contendo a paleta cromática (Terracotta `#b83a20`, Tactical Sage `#4e6851`, Sand `#dcc9a9`, Pitch Stone `#121314`), tipografia (`Space Grotesk` + `JetBrains Mono`), sombras duras e regras de cantos retos (`0px`).
- **`pagina_inicial_dark.html`**: Mockup completo e navegável da homepage em modo escuro.
- **`pagina_detalhes_light.html`**: Mockup completo da página individual de estudo de caso técnico (exemplo com `EstoqueLentes`).
- **`pagina_inicial_light.html`**: Versão de alto contraste em estilo manual técnico / blueprint.

### 4. [portfolio_json_configs/](./portfolio_json_configs/)
Arquivos `.github/portfolio.json` prontos para serem adicionados à raiz de cada um dos repositórios para sincronização de metadados.
