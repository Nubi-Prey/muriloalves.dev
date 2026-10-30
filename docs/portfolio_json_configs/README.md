# Metadados de Projetos — Schema v2 (`muriloalves.dev`)

Os arquivos `.portfolio.json` neste diretório seguem o **Schema v2 (`schemaVersion: "2.0"`)** e atuam como **Fonte Única da Verdade (Single Source of Truth)** para o catálogo de projetos do portfólio **`muriloalves.dev`**, além de manterem retrocompatibilidade com os campos de raiz da v1 (`title`, `description`, `icon`, `visitLink`) para leitura direta via `.github/portfolio.json` no GitHub.

## Arquivos Inclusos (6 Repositórios Auditados)

1. `MineOS.portfolio.json` → `Nubi-Prey/MineOS` (`categoryKey: "systems"`)
2. `Engraver.portfolio.json` → `Nubi-Prey/Engraver` (`categoryKey: "graphics"`)
3. `lupa.portfolio.json` → `Nubi-Prey/lupa` (`categoryKey: "desktop"`)
4. `estoquelentes.portfolio.json` → `Nubi-Prey/estoquelentes` (`categoryKey: "desktop"`)
5. `Astolfo-bot.portfolio.json` → `Nubi-Prey/Astolfo-bot` (`categoryKey: "backend"`)
6. `black-pc.portfolio.json` → `Nubi-Prey/black-pc` (`categoryKey: "systems"`)

> [!NOTE]
> Para projetos externos, forks ou contribuições upstream (como `black-pc`), o arquivo de metadados reside exclusivamente neste catálogo em `muriloalves.dev`, preservando o repositório remoto limpo e sem poluição para Pull Requests. O loader GraphQL (`src/lib/github.ts`) resolve esses repositórios automaticamente via resolução híbrida.

## Consumo e Validação no Código

O módulo [`src/lib/projects.ts`](../../src/lib/projects.ts) importa e valida estritamente todos os 6 arquivos em tempo de execução/build por meio de `validateProjectSchemaV2()`, expondo `getLocalizedProjects(locale)` para os dicionários `pt_BR` e `en_US`.
