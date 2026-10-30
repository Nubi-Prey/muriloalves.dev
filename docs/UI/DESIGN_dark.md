---
name: Cyber-Industrial Terminal Documental
colors:
  surface: '#121314'
  surface-dim: '#121314'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1d'
  surface-container: '#1f2021'
  surface-container-high: '#292a2b'
  surface-container-highest: '#343536'
  on-surface: '#e3e2e3'
  on-surface-variant: '#e1bfb8'
  inverse-surface: '#e3e2e3'
  inverse-on-surface: '#303031'
  outline: '#a88a84'
  outline-variant: '#59413c'
  surface-tint: '#ffb4a4'
  primary: '#ffb4a4'
  on-primary: '#640d00'
  primary-container: '#b83a20'
  on-primary-container: '#ffded7'
  inverse-primary: '#ad3219'
  secondary: '#b1ceb2'
  on-secondary: '#1d3622'
  secondary-container: '#334d37'
  on-secondary-container: '#a0bca1'
  tertiary: '#d7c4a4'
  on-tertiary: '#3a2f18'
  tertiary-container: '#73644a'
  on-tertiary-container: '#f6e2c1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a4'
  on-primary-fixed: '#3e0500'
  on-primary-fixed-variant: '#8b1a02'
  secondary-fixed: '#cdeacd'
  secondary-fixed-dim: '#b1ceb2'
  on-secondary-fixed: '#08200e'
  on-secondary-fixed-variant: '#334d37'
  tertiary-fixed: '#f4e0bf'
  tertiary-fixed-dim: '#d7c4a4'
  on-tertiary-fixed: '#241a06'
  on-tertiary-fixed-variant: '#52452d'
  background: '#121314'
  on-background: '#e3e2e3'
  surface-variant: '#343536'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-mono-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a high-density, cyber-industrial technical portfolio engineered for Murilo Alves. It operates at the intersection of a physical workshop terminal, architectural blueprint catalog, and high-performance developer documentation. The visual language conveys rigorous structural engineering, deliberate craftsmanship, and zero-bullshit utility.

Targeted toward technical leads, systems architects, and engineering collaborators, the experience elicits the sensation of handling a military-grade avionics workstation or specialized industrial telemetry deck. The aesthetic embraces functional brutalism fused with precise terminal documentality: non-rounded geometry, visible mechanical seams, explicit grid coordinate markers, strict semantic status indicators, and monospace data density.

## Colors

The palette is derived from oxidized metallurgical surfaces, tactical instrument gauges, and aged technical schematics against light-absorbing carbon pitch.

- **Primary (`#B83A20` - Burnt Terracotta / Rust Crimson):** Operational triggers, critical diagnostic calls-to-action, high-priority interactive nodes, active execution states, and warnings.
- **Secondary (`#4E6851` - Tactical Sage / Olive Moss):** Verification indicators, build success confirmations, operational telemetry badges, passive metrics, and system-healthy indicators.
- **Tertiary (`#DCC9A9` - Warm Technical Parchment):** High-precision keylines, structural crosshairs, technical labels, active code highlights, and accented interactive metadata.
- **Surfaces & Neutral Baseline:**
  - `canvas`: `#121314` (Pitch Stone Base)
  - `surface-base`: `#18191B` (Chassis Underlayer)
  - `surface-container`: `#1F2124` (Modular Container Plates)
  - `surface-elevated`: `#282A2E` (Layered Control Blocks / Toolbars)
- **Text & Foreground:**
  - `text-primary`: `#EDE5D8` (Warm Crisp Bone / Parchment)
  - `text-secondary`: `#DCC9A9` (Desaturated Sand Accent)
  - `text-muted`: `#9E978B` (Stone Khaki / Field Manual Muted)
- **Structural Outlines & Boundaries:**
  - `border-default`: `#3A3D42` (Cold Rolled Steel)
  - `border-accent`: rgba(220, 201, 169, 0.20) (Parchment Scaffolding Line)
  - `border-critical`: `#B83A20` (Mechanical Hazard Boundary)

## Typography

The typographic hierarchy implements an asymmetric dual-type engine:

1. **Space Grotesk** governs structural titles, project case study headings, and prominent milestone markers. It brings an architectural, constructivist cadence with engineered curves that anchor the eye.
2. **JetBrains Mono** governs narrative body, data matrices, technical specifications, and system metadata. It maintains a constant code-editor rhythm, establishing technical authenticity.

Headings at level 4 and higher, along with all metadata badges, must be formatted in uppercase (`text-transform: uppercase`) with positive tracking to simulate calibrated field instruments and serial plate stampings.

## Layout & Spacing

The layout is built upon an exposed 12-column terminal grid with structural registration marks (crosshairs `+` at intersecting corners). Content does not float; it locks into rigid steel chassis panels.

- **Breakpoints:**
  - Mobile: `< 768px` (4-column flow, edge gutter `1rem`, outer padding `1rem`).
  - Tablet: `768px - 1024px` (8-column flow, outer padding `2rem`).
  - Desktop: `> 1024px` (12-column flow with persistent telemetry sidebar and right-aligned code inspector panels, max-width `1440px`, outer padding `3rem`).
- **Rhythm & Registration:** Sections are demarcated by explicit horizontal dividing rules (`1px solid #3A3D42`) populated with mono coordinate stamps (e.g., `SEC_01 // ARCHITECTURE`).

## Elevation & Depth

This design system rejects atmospheric drop shadows, blurry skeuomorphism, and translucent backdrop blurs. All depth is conveyed through **mechanical surface tiering** and **hard-edge offset shadows**:

1. **Planar Hierarchy:** Visual depth is created by moving upward across the surface scale: `#121314` (deck) &rarr; `#18191B` (panel) &rarr; `#1F2124` (card body) &rarr; `#282A2E` (header bar / active node).
2. **Hard Kinetic Cast:** Interactive or elevated modules utilize a zero-blur, directional offset border-fill: `box-shadow: 3px 3px 0px 0px #3A3D42` or `box-shadow: 4px 4px 0px 0px #B83A20` when active.
3. **Seams and Welds:** Containers are encapsulated by crisp `1px` lines in `#3A3D42`. Focused panels escalate to `1px solid #DCC9A9`.

## Shapes

The roundedness value is strictly `0` (Sharp). No element contains border-radii (`border-radius: 0px`).

- **Edges:** Brutalist, machined, and squared across all UI elements, inputs, buttons, and flyouts.
- **Chamfers & Notches (Optional Decorative Element):** Corner cutouts may be executed via 45-degree CSS `clip-path` (e.g., `polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)`) for specialized tech tags, mimicking perforated industrial punch cards.

## Components

### Buttons & Operational Triggers
- **Primary Action (Execute):** Background `#B83A20`, text `#EDE5D8`, zero radius, uppercase `JetBrains Mono` 12px bold. Hover: `#DCC9A9` background with `#121314` text; hard offset shadow `3px 3px 0px 0px #EDE5D8`.
- **Secondary (Inspect/Review):** Background `#1F2124`, border `1px solid #3A3D42`, text `#DCC9A9`. Hover: border `1px solid #DCC9A9`, background `#282A2E`.
- **Ghost Action:** Borderless, text `#9E978B` with a prepended cursor glyph (`> `). Hover: text `#EDE5D8`.

### Chips & Telemetry Badges
- **Status Badges:** Compact monospace tags with `1px solid` frame.
  - Active / Production: Border `#4E6851`, background `rgba(78, 104, 81, 0.15)`, text `#89A88C`. Preceded by `●` dot icon.
  - Deprecated / Critical: Border `#B83A20`, background `rgba(184, 58, 32, 0.15)`, text `#E0715B`. Preceded by `▲` alert icon.
  - Spec / Tech Stack: Border `#3A3D42`, background `#18191B`, text `#DCC9A9`.

### Technical Cards (Project & Architecture Specs)
- Base background `#1F2124` framed by `1px solid #3A3D42`.
- Top sub-header bar: height `28px`, background `#18191B`, containing section ID in `#9E978B` (e.g., `PRJ-082 // SYS_RUN`) and a terminal traffic-light or close symbol (`[x]`).
- Internal content padded by `1.25rem`. On hover, the container border transitions to `1px solid #DCC9A9/40` with a sharp mechanical offset `4px 4px 0px 0px #18191B`.

### Input Fields & Terminal Prompts
- Background `#18191B`, border `1px solid #3A3D42`, text `#EDE5D8`, caret color `#B83A20`.
- Padding `space-sm` vertical, `space-md` horizontal.
- Focus state: border `1px solid #DCC9A9`, hard shadow `2px 2px 0px 0px #B83A20`, without outline glow.
- Prefixed with terminal prompt markers like `root@muriloalves:~$`.

### Checkboxes, Radios & Switches
- **Checkbox:** Square box `16x16px`, border `1px solid #3A3D42`, background `#121314`. Checked state fills `#B83A20` with a centered bone-white cross or checkmark symbol (`+` or `x`).
- **Radio:** Strict square with an inset sharp diamond or inner square `#B83A20` indicator on selection.

### Terminal Logs & Document Lists
- Alternating panel rows using `#18191B` and `#1F2124`.
- Left-hand index numbers formatted in `#9E978B` monospace, separated by a vertical hairline `#3A3D42`.
- Hovering over a row highlights the line with a background of `#282A2E` and triggers an active `#B83A20` left border indicator `2px` wide.