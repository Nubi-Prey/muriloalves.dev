# Portfólio de Engenharia de Software & Projetos
**Autor:** Nubi ([@Nubi-Prey](https://github.com/Nubi-Prey))  
**Website:** [nubi.live](https://nubi.live)  
**Foco:** Engenharia de Sistemas & Kernel, Aplicações Desktop Local-First, Computação Gráfica e Arquitetura de Software

---

## 🧭 Visão Geral

Este documento apresenta uma análise técnica aprofundada dos **6 projetos fixados** no perfil GitHub de **@Nubi-Prey**. O conjunto de projetos reflete versatilidade técnica rara: desde o desenvolvimento em baixo nível com compilação de distribuições Linux customizadas (Kernel, Buildroot, Wayland, Rust) até aplicações desktop comerciais completas com arquiteturas local-first (Electron, SQLite, MongoDB Atlas) e processamento matemático de imagens acelerado em C puro.

```mermaid
flowchart TD
    Profile["Perfil GitHub (@Nubi-Prey)"]

    subgraph LowLevel["1. Baixo Nível & Sistemas Operacionais"]
        MineOS["MineOS<br><i>Linux Kernel 6.6, Buildroot, Wayland, Rust & Java 25</i>"]
        Engraver["Engraver<br><i>Computação Gráfica, Aceleração C, Qt6 & OpenCV</i>"]
    end

    subgraph DesktopApps["2. Desktop Local-First & Comercial"]
        Lupa["Lupa<br><i>Ordens de Serviço, Electron 39, React 19, Fuse.js & MongoDB</i>"]
        EstoqueLentes["EstoqueLentes<br><i>Matriz Dióptrica 2D, Electron 39, SQLite & Drizzle ORM</i>"]
    end

    subgraph BackendWeb["3. Backend & Jamstack"]
        Astolfo["Astolfo-bot<br><i>Java 17, JDA 5, PostgreSQL & Docker Compose</i>"]
        NubiLive["Nubi.live<br><i>Next.js, React, GitHub GraphQL API & ISR</i>"]
    end

    Profile --> LowLevel
    Profile --> DesktopApps
    Profile --> BackendWeb
```

---

## 📊 Matriz de Competências & Tecnologias

| Projeto | Domínio / Área | Linguagens Principais | Frameworks / Ferramentas | Persistência / Banco | Arquitetura & Diferencial |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[MineOS](#1-mineos-minecraft-como-compositor-gráfico-wayland-3d)** | Sistemas & Kernel | Java 25, Rust, C, Python | Buildroot 2025.02, Smithay, Fabric, Wayland, QEMU | 9P VirtFS (Zero Copy) | Compositor Wayland rodando em blocos 3D baremetal |
| **[Engraver](#2-engraver-estúdio-de-dithering-para-gravação-a-laser)** | Computação Gráfica | Python 3.10+, C puro | PySide6 (Qt 6), OpenCV, Pillow, Nuitka | JSON Presets | Aceleração C (ctypes) de difusão de erro e pipeline tonal |
| **[Lupa](#3-lupa-gerenciador-de-ordens-de-serviço-para-joalheria)** | Desktop Comercial | TypeScript 5.9 | Electron 39, React 19, Tailwind v4, Zustand 5, Fuse.js | MongoDB Atlas (Mongoose 9) | Local-First, Command Bar (Ctrl+K) e WhatsApp API |
| **[EstoqueLentes](#4-estoquelentes-gestão-física-de-estoque-de-lentes)** | Desktop Especializado | TypeScript | Electron 39, React 19, Tailwind v4, Radix UI | SQLite (better-sqlite3) + Drizzle | Matriz bidimensional dióptrica com auto-save e migrações |
| **[Astolfo-bot](#5-astolfo-bot-bot-modular-para-discord)** | Backend & DevOps | Java 17+ | JDA 5, Maven, Logback | PostgreSQL (Docker Compose) | Slash Commands dinâmicos e isolamento de secrets |
| **[Nubi.live](#6-nubilive-portfólio-jamstack-dinâmico)** | Frontend Jamstack | JavaScript, TypeScript | Next.js, React, Tailwind CSS | GitHub GraphQL API | ISR com desacoplamento via `.github/portfolio.json` |

---

## 🔬 Análise Detalhada dos Projetos

---

### 1. MineOS: Minecraft como Compositor Gráfico Wayland 3D
> *"Simplicidade brutal no backend e a loucura total no frontend."*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2FMineOS-181717?logo=github)](https://github.com/Nubi-Prey/MineOS)
[![Kernel](https://img.shields.io/badge/Linux_Kernel-6.6_LTS-FCC624?logo=linux&logoColor=black)](#)
[![Buildroot](https://img.shields.io/badge/Buildroot-2025.02_LTS-orange)](#)
[![Wayland](https://img.shields.io/badge/Wayland-Smithay_Rust-DEA584?logo=rust)](#)
[![Java](https://img.shields.io/badge/Java-25_Temurin-ED8B00?logo=openjdk&logoColor=white)](#)

```mermaid
flowchart TD
    subgraph Baremetal["Camada 1: Kernel & Virtualização"]
        Kernel["Linux Kernel 6.6 LTS (DRM/KMS + VirGL 3D)"]
        JeOS["Buildroot 2025.02 (JeOS Imutável)"]
        FS["9P VirtFS (mc_data - Zero Disk Host Sharing)"]
    end

    subgraph Runtime["Camada 2: Runtime & Compositor"]
        JVM["JVM Adoptium Temurin 25"]
        MC["Minecraft 26.1.2 + Fabric"]
        Rust["Waylandcraft (Smithay Rust Engine - libwaylandcraft.so)"]
    end

    subgraph Surface["Camada 3: Superfícies Wayland & Aplicações"]
        WaylandSocket["Socket wayland-1"]
        Apps["Aplicações Linux Nativas (Alacritty, Firefox, Apps X11/Wayland)"]
        World3D["Renderização em Cubos e Telas no Mundo 3D"]
    end

    Baremetal --> Runtime
    Runtime --> Surface
    Apps -->|Wayland Protocol| WaylandSocket --> Rust --> MC --> World3D
```

#### 📌 Descrição & Proposta
O **MineOS** é uma distribuição Linux completa construída sob medida no formato **JeOS** (*Just Enough OS*) usando o framework industrial **Buildroot (LTS 2025.02)**. Seu propósito é transformar o jogo **Minecraft** no próprio **Compositor Gráfico Wayland baremetal** da máquina (`wayland-1`). Aplicações nativas Linux são executadas na sessão e renderizadas em texturas de blocos tridimensionais no mundo do jogo, com suporte a mouse, teclado e aceleração por hardware.

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Arquitetura de Compilação Modular (`BR2_EXTERNAL`):** Imagem com boot express (~3 segundos) com inicialização minimalista, sem daemons desnecessários, carregando estritamente os subsistemas de DRM, KMS, `seatd` e `libinput`.
- **Ponte de Baixo Nível Rust + Java 25:** O mod Waylandcraft foi arquitetado com um motor em Rust usando a biblioteca **Smithay** (`libwaylandcraft.so`), comunicando-se com Mixins do Fabric na JVM Java 25 para despachar buffers gráficos diretamente na thread de renderização do Minecraft.
- **Bypass de Gargalos Gráficos e DRM:**
  - *Direct Scanout Bypass:* Correção de engasgos e congelamento de render thread via variáveis de cena (`WLR_SCENE_DISABLE_DIRECT_SCANOUT=1` e `WLR_DRM_NO_ATOMIC=1`).
  - *Inversão de Eixos VirGL:* Superação de bug de driver 3D que invertia o cursor a 180° forçando renderização de cursor em software (`WLR_NO_HARDWARE_CURSORS=1`).
  - *Trava de Mouse 360°:* Patch customizado para o compositor Cage expondo `relative-pointer-v1` e `pointer-constraints-v1` sob SDL2.
- **Zero Overhead de Disco com 9P VirtFS:** O sistema raiz permanece somente-leitura enquanto diretórios de dados de mundos e mods são mapeados em tempo real diretamente da máquina host via VirtFS.
- **Observabilidade Automatizada:** Suíte de testes em Python (`pytest`) que controla o QEMU via socket **QMP** (*QEMU Machine Protocol*) com suporte a telemetria via servidor MCP (*Model Context Protocol*).

---

### 2. Engraver: Estúdio de Dithering para Gravação a Laser
> *Estúdio profissional de pré-processamento e difusão de erro para fotogravação industrial.*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2FEngraver-181717?logo=github)](https://github.com/Nubi-Prey/Engraver)
[![Release](https://img.shields.io/badge/Release-v2.0-A855F7)](#)
[![Python](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12-3776AB?logo=python&logoColor=white)](#)
[![Qt](https://img.shields.io/badge/GUI-PySide6%20Qt%206-41CD52?logo=qt&logoColor=white)](#)
[![C](https://img.shields.io/badge/Core-C_puro_ctypes-A8B9CC?logo=c&logoColor=white)](#)

```mermaid
flowchart LR
    ImgIn["Imagem de Entrada"] --> Step1["1. Normalização de DPI (Lanczos)"]
    Step1 --> Step2["2. Mixagem de Canais R0.6 G0.3 B0.1"]
    Step2 --> Step3["3. CLAHE Adaptativo & Gamma"]
    Step3 --> Step4["4. Máscara Alpha & Realce High-Pass"]
    Step4 --> Step5["5. Aceleração C (ctypes): Atkinson / Floyd / JJN"]
    Step5 --> Step6["6. Inspeção de Pixels (5% a 3200%) ou Export BMP"]
```

#### 📌 Descrição & Proposta
Aplicação de desktop e linha de comando (CLI) voltada para a preparação milimétrica de imagens a serem gravadas a laser em metais nobres, joias e brindes finos. Desenvolvida para resolver as limitações de contraste e perda de detalhes que ocorrem em gravadoras industriais (fibras ópticas, MOPA, UV e CO₂).

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Aceleração Nativa em C Puro (`dither_accel.c`):** O cálculo de difusão de erro para resoluções elevadas (600+ DPI) em Python puro causava gargalos severos. O algoritmo de difusão foi implementado em C puro e consumido via `ctypes`, conferindo velocidade instantânea para algoritmos pesados como **Atkinson** e **Jarvis-Judice-Ninke**.
- **Fórmula Espectral Calibrada para Metais:** Mixagem de canais monocromáticos customizada (`Gray = R×0.6 + G×0.3 + B×0.1`) especificamente calibrada para realçar tons de pele e contraste facial quando expostos à reflexão de ligas de ouro, prata e aço inox.
- **Visualizador Duplo Sincronizado com Pixel Inspection:** PySide6/Qt6 com zoom sincronizado de 5% a 3200% em modo *Nearest Neighbor*, permitindo ao operador de máquina inspecionar exatamente cada microponto de queima do feixe laser antes de iniciar a produção.
- **Pipeline de Distribuição Autônoma:** Empacotamento compilado com **Nuitka** e automação com GitHub Actions, gerando instaladores nativos para Windows (Inno Setup), Linux (.AppImage) e macOS sem exigir Python pré-instalado na máquina do usuário final.

---

### 3. Lupa: Gerenciador de Ordens de Serviço para Joalheria
> *Sistema comercial desktop com arquitetura local-first e sincronização em nuvem.*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2Flupa-181717?logo=github)](https://github.com/Nubi-Prey/lupa)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](#)
[![Database](https://img.shields.io/badge/MongoDB-Atlas_Mongoose_9-47A248?logo=mongodb&logoColor=white)](#)

```mermaid
sequenceDiagram
    actor Joalheiro
    participant UI as React 19 (Command Bar Ctrl+K)
    participant Fuse as Fuse.js (Busca Fuzzy)
    participant Cache as Cache Local
    participant Atlas as MongoDB Atlas Cloud
    actor Cliente

    Joalheiro->>UI: Digita parte do nome/serviço
    UI->>Fuse: Consulta catálogo e histórico
    Fuse-->>UI: Resultados instantâneos (< 10ms)
    Joalheiro->>UI: Conclui Ordem de Serviço
    UI->>Cache: Salva localmente (Instantâneo)
    UI->>Atlas: Sincroniza em background
    UI->>Cliente: Deep link WhatsApp com aviso de status
```

#### 📌 Descrição & Proposta
Gerenciador desktop especializado no fluxo de trabalho de ateliês e oficinas de joalheria. Substitui blocos de papel e planilhas por um sistema centralizado com busca instantânea, impressão de ordens em duas vias e integração com clientes.

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Arquitetura Local-First Híbrida:** A oficina não para se a conexão de internet cair; todas as operações ocorrem primeiro contra o cache local com reatividade imediata e são sincronizadas de forma resiliente com o cluster **MongoDB Atlas**.
- **Busca Fuzzy com Fuse.js integrada à Command Bar (`Ctrl+K`):** Navegação e localização ultrarrápida de clientes, peças, orçamentos e serviços sem necessidade de múltiplos cliques.
- **Impressão Formatada em Duas Vias (A4):** Geração de layouts de impressão em tons de cinza otimizados para papel comum ou timbrado, contendo via da oficina e canhoto do cliente com termos de garantia e retirada.
- **Deep Linking com WhatsApp:** Geração automática de mensagens personalizadas e abertura do WhatsApp Web/Desktop com 1 clique para notificar clientes sobre orçamentos aprovados ou serviços prontos para retirada.

---

### 4. EstoqueLentes: Gestão Física de Estoque de Lentes
> *Aplicação desktop offline com banco de dados embutido e matriz dióptrica bidimensional.*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2Festoquelentes-181717?logo=github)](https://github.com/Nubi-Prey/estoquelentes)
[![Electron](https://img.shields.io/badge/Electron-39-47848F?logo=electron&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?logo=sqlite&logoColor=white)](#)
[![ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F?logo=drizzle&logoColor=black)](#)

```mermaid
flowchart LR
    subgraph MainProcess["Processo Main (Node.js)"]
        SQLite[("better-sqlite3")]
        Drizzle["Drizzle ORM & Migrations"]
        IPCMain["IPC Handlers Tipados"]
    end

    subgraph PreloadProcess["Processo Preload"]
        Bridge["contextBridge (window.api)"]
    end

    subgraph RendererProcess["Processo Renderer (UI)"]
        ReactUI["React 19 + Tailwind v4"]
        Matrix["Matriz Esférico × Cilíndrico"]
        Scanner["Leitor de Código de Barras"]
    end

    Scanner --> ReactUI --> Matrix
    Matrix -->|IPC Invoke Seguro| Bridge --> IPCMain --> Drizzle --> SQLite
```

#### 📌 Descrição & Proposta
Software desktop focado na gestão física de gavetas e caixas de blocos de lentes oftálmicas em laboratórios e óticas. Sua interface é construída em torno da clássica matriz de dois eixos dióptricos: **Grau Esférico** (linhas) versus **Grau Cilíndrico** (colunas).

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Persistência Local-First com Drizzle ORM + better-sqlite3:** Armazenamento embutido em arquivo SQLite nativo criado em `app.getPath('userData')`, executando migrations versionadas automaticamente no boot do app, eliminando custos de infraestrutura e latência de rede.
- **Segurança e Rigor Arquitetural no Electron:** Separação estrita em três processos (`main`, `preload` e `renderer`). O processo de interface React não tem acesso direto ao sistema de arquivos nem ao Node.js; toda a comunicação é mediada por canais IPC com tipagem estrita de contratos em TypeScript.
- **UX de Alta Produtividade:** Matriz reativa com atualização atômica de quantidades, suporte a leitor óptico de código de barras para entradas e saídas rápidas e salvamento automático contínuo.

---

### 5. Astolfo-bot: Bot Modular para Discord
> *Microsserviço orientado a eventos em Java com PostgreSQL conteinerizado.*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2FAstolfo--bot-181717?logo=github)](https://github.com/Nubi-Prey/Astolfo-bot)
[![Java](https://img.shields.io/badge/Java-17+-ED8B00?logo=openjdk&logoColor=white)](#)
[![JDA](https://img.shields.io/badge/Discord_API-JDA_5-5865F2?logo=discord&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Infra-Docker_Compose-2496ED?logo=docker&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](#)

```mermaid
flowchart TD
    subgraph DiscordCloud["Discord Cloud"]
        Gateway["Discord Gateway (Websockets)"]
    end

    subgraph App["Aplicação Java (AstolfoBot)"]
        JDA["JDA 5 Client"]
        Ready["ReadyListener"]
        Slash["SlashCommandListener"]
        CmdHandler["CommandHandler (Carregamento Dinâmico)"]
    end

    subgraph Infra["Infraestrutura Conteinerizada"]
        Compose["Docker Compose"]
        PG[("PostgreSQL 16")]
    end

    Gateway <-->|Eventos de Gateway| JDA
    JDA --> Ready & Slash
    Slash --> CmdHandler
    CmdHandler -->|JDBC Connection Pool| PG
    Compose -.->|Provisiona| PG
```

#### 📌 Descrição & Proposta
Bot para Discord com arquitetura modular, focado em alta disponibilidade e código limpo utilizando a versão mais recente do framework JDA 5. Integra-se com banco de dados relacional PostgreSQL gerenciado como código via Docker Compose.

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Carregamento Dinâmico de Comandos:** Arquitetura orientada a eventos com separação clara de responsabilidades: `CommandHandler` descobre, valida e registra Slash Commands na API do Discord em runtime, desacoplando a lógica de cada comando da inicialização do bot.
- **Infraestrutura como Código (IaC):** O ambiente de banco de dados é 100% reproduzível via `infra/compose.yaml` com diretório de inicialização de schemas (`docker-entrypoint-initdb.d`), facilitando testes locais e deploys em servidores Linux remotos.
- **Práticas de Segurança de Credenciais:** Separação estrita de runtime: credenciais críticas (Token do bot e string de conexão JDBC) são injetadas estritamente via variáveis de ambiente do sistema, enquanto parâmetros públicos residem em `config.properties`.

---

### 6. Nubi.live: Portfólio Jamstack Dinâmico
> *Website pessoal construído com geração estática incremental conectada à API GraphQL do GitHub.*

[![Repositório](https://img.shields.io/badge/GitHub-Nubi--Prey%2FNubi.live-181717?logo=github)](https://github.com/Nubi-Prey/Nubi.live)
[![Website](https://img.shields.io/badge/Site-nubi.live-success?logo=vercel)](https://nubi.live)
[![Next.js](https://img.shields.io/badge/Next.js-React-black?logo=next.js)](#)
[![GraphQL](https://img.shields.io/badge/API-GitHub_GraphQL-E10098?logo=graphql&logoColor=white)](#)

```mermaid
flowchart LR
    GitHub["GitHub Pinned Repos"] -->|GraphQL Query| NextBuild["Next.js getStaticProps (ISR)"]
    RepoJSON[".github/portfolio.json de cada repo"] -->|Metadados Customizados| NextBuild
    NextBuild --> VercelEdge["Vercel Edge Network (Páginas Estáticas Ultrarrápidas)"]
    VercelEdge --> Visitante["Usuário / Recrutador acessando nubi.live"]
```

#### 📌 Descrição & Proposta
O site oficial de apresentação técnica do desenvolvedor. Projetado com filosofia Jamstack: a lista de projetos do portfólio não é estática nem mantida em CMSs pesados; ela é sincronizada automaticamente com os repositórios fixados do perfil GitHub através da API GraphQL.

#### 🛠️ Destaques de Engenharia & Resolução de Problemas Complexos
- **Padrão Descentralizado de Metadados:** Cada projeto dita como quer ser exibido criando um arquivo `.github/portfolio.json` em seu próprio repositório. Projetos em desenvolvimento sem esse arquivo são automaticamente omitidos do catálogo público.
- **Performance com ISR (Incremental Static Regeneration):** O site é servido com velocidade de página estática direta da CDN Edge da Vercel, revalidando dados em background sem requisições desnecessárias a cada visualização de página.

---

## 🎯 Síntese de Valor para Recrutadores & Líderes Técnicos

| Perfil / Necessidade | Como os projetos comprovam a competência |
| :--- | :--- |
| **Sistemas, Kernel & Baixo Nível** | O **MineOS** demonstra que o autor não teme a barreira do baremetal: configurou kernels Linux, escreveu módulos nativos em Rust/Smithay, domina compiladores com Buildroot e resolveu problemas de baixo nível em drivers DRM e Wayland. |
| **Computação Gráfica & Desempenho** | O **Engraver** comprova capacidade algorítmica matemática (dithering e processamento tonal), otimização com C nativo (`ctypes`) e entrega de ferramentas industriais com executáveis autônomos. |
| **Engenharia de Software Desktop & Local-First** | O **Lupa** e o **EstoqueLentes** mostram domínio profundo de Electron, React 19, TypeScript e arquiteturas resilientes offline (SQLite/Drizzle e MongoDB Atlas), resolvendo gargalos reais de gestão de negócios. |
| **Backend, Microsserviços & Nuvem** | O **Astolfo-bot** e o **Nubi.live** comprovam a base sólida em POO (Java 17), DevOps (Docker Compose, CI/CD Actions, Vercel) e consumo eficiente de APIs de grafos (GraphQL). |

---

*Documento gerado e revisado para o portfólio de @Nubi-Prey.*
