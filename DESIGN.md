# Happy Zion Design System

Scope: this document is based on the implemented main page and the completed static pages: greeting, church story, revival organization, service times, location, mission history, online giving, newcomer guide, newcomer care, and discipleship training.

## 1. Overview

Happy Zion uses an editorial church-site visual language: quiet ivory surfaces, deep plum fields, gold accent typography, serif Korean headings, and image-led mission storytelling. The core brand feeling is reverent, warm, structured, and ministry-focused.

Primary characteristics:

- {brand.tone} -- reverent / editorial / mission-oriented / warm
- {brand.structure} -- full-width page bands with constrained inner shells
- {brand.visualWeight} -- large Korean serif headings, thin uppercase labels, generous vertical rhythm
- {brand.primaryInteraction} -- scroll-driven story sections, tabbed ministry panels, responsive card/table switching
- {brand.imageUsage} -- real church/mission imagery, full-bleed video hero, sticky gallery rail on desktop, compact slider on mobile

## 2. Colors

Colors are organized by the three background zones of the main page: cream (bright sections), soft-purple (vision section), and dark (mission sections). CSS variables in `globals.css` are marked *.

### Surface & Background

| Token | Value | Usage |
| --- | --- | --- |
| {colors.background} | #ffffff | default page background (about pages, cards, content areas) |
| {colors.surface.cream} * | #fffcf8 | main page join section, join image fade overlay, error page background |
| {colors.surface.softPurple} | #fcf8ff | soft-purple section/panel bg (home vision, greeting page, location map overlay, revival organization 3rd section) |
| {colors.surface.photoFrame} | #f2ebf6 | vision photo frame bg (desktop & mobile), mission story image placeholder |
| {colors.surface.dark} | linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%) | mission scroll sections background |
| {colors.surface.footer} | #1f0f28 | footer background |
| {colors.surface.darkHeader} | #241f25 at variable opacity | home page nav bar(var:0.72) / dropdown(var:0.92) / mobile menu panel(var:0.96) |
| {colors.surface.blockquote} | #f5f0f9 | blockquote bg; discipleship lavender bg (card, tab hover, table row, training course odd row) |
| {colors.surface.tableHeader} | #FAF7FF | table header row bg (service-times, location) |
| {colors.surface.ctaDark} | #2a123c | CTA button/card bg (dark section, discipleship pages, online-giving, greeting vision card) |
| {colors.surface.greetingDark} | #1e1035 | greeting page dark (pastor) section bg |
| {colors.surface.greetingPurple} | #3f2551 | greeting page purple (church leaders) section bg |
| {colors.surface.greetingPurpleCard} | #56385E | greeting page church leaders card bg |
| {colors.surface.greetingMosaicMid} | #9A8CA7 | greeting page mosaic grid filler (mid tone) |
| {colors.surface.greetingMosaicLight} | #D2C5DB | greeting page mosaic grid filler (light tone) |
| {colors.surface.revivalGradient} | bg-gradient-to-b from-[#1e1035] to-[#2f2047] | revival organization 2nd section bg |
| {colors.surface.revivalPanel} | #190b2a | revival org 2nd section tab content panel bg |
| {colors.surface.revivalInfoPanel} | #1a1028 | revival org 2nd section members info panel bg |
| {colors.surface.revivalRowHeader} | #341a44 | revival org 3rd section roadmap quarter header row bg |
| {colors.surface.revivalCard} | #594263 | revival org 3rd section small group section block bg |
| {colors.surface.revivalSidebar} | #fcfaff | revival org 3rd section sidebar aside bg |
| {colors.surface.revivalTabContent} | #f4f0f9 | revival org 3rd section tab content bg (incl. active tab) |

### Ink on Light

Text colors used on light backgrounds (white, soft-purple `#fcf8ff`, cream `#fffcf8`).

| Token | Value | Usage |
| --- | --- | --- |
| {colors.ink} | #250030 | high-emphasis headings |
| {colors.ink.heading2} | #33103f | secondary headings, quote card text, tab titles, table top accent border (3px) |
| {colors.ink.subtitle} | #896B91 | section subtitles |
| {colors.ink.body} | #4A3B5E | body text |
| {colors.ink.soft} | #6F5576 | soft body text |
| {colors.ink.muted} | #928397 | weak secondary text |
| {colors.ink.emphasis} | #BD6FE0 | inline purple emphasis (church name, address, etc.) |
| {colors.ink.citation} | #510a75 | quote card left border + scripture citation text, link hover color |
| {colors.ink.purple} | #8b6db5 | purple accent text — labels, metadata, roadmap badges, section heading labels |

### Ink on Dark

Text colors used on top of deep purple backgrounds (`{colors.surface.dark}`, `{colors.surface.greetingDark}`, `{colors.surface.greetingPurple}`, etc.).

| Token | Value | Usage |
| --- | --- | --- |
| {colors.dark.heading} | #FFFFFF | headings |
| {colors.dark.subtitle} | #E2CAF5 | subtitles |
| {colors.dark.label} | #FDF4FF | section labels |
| {colors.dark.body} | #FFFFFF | primary body text |
| {colors.dark.bodyAlt} | #FDF8FF | soft body text variant |
| {colors.dark.bodyMuted} | #ffffff at 80% | muted body / label text on dark bg (apply-form labels, revival supporting text, nav links) |
| {colors.dark.accent} | #E3BFFF | purple point color (decorative accents, UI elements) |

### Cream Background

| Token | Value | Usage |
| --- | --- | --- |
| {colors.cream.heading} | #000000 | heading on cream background |
| {colors.cream.body} | #3C2348 | body text on cream background |

### Section Labels

| Token | Value | Usage |
| --- | --- | --- |
| {colors.label.section23} | #5B3B63 | main page 2nd & 3rd section labels (soft-purple bg) |
| {colors.label.section45} | #FDF4FF | main page 4th & 5th section labels (dark bg) |
| {colors.label.join} | #3D1A46 | main page Join section label text + rule below label |
| {colors.label.purple} | #8B6DB5 | purple label (sub-page common header) |

### Accent / Display

| Token | Value | Usage |
| --- | --- | --- |
| {colors.accent.visionLabel} | #691393 at 40% | main page vision card English eyebrow label |
| {colors.accent.visionNumber} | #691393 at 8% | main page vision card number display |
| {colors.accent.quoteDisplay} | #4d1367 at 10% | quote card decorative quotation mark |

### Point Colors

Gold and red accent colors used across both light and dark sections.

| Token | Value | Usage |
| --- | --- | --- |
| {colors.point.gold} | #C9A96E | gold — metadata, dates, milestone labels |
| {colors.point.goldMid} | #E4B96B | mid gold — discipleship pages accent |
| {colors.point.goldBright} | #FFD17D | bright gold — decorative numerals, quarter headers |
| {colors.point.red} | #B73838 | red — special period markers (e.g. COVID) |

### Icon

| Token | Value | Usage |
| --- | --- | --- |
| {colors.icon} | #6B4A75 | icon color |
| {colors.icon.circle} | #DCCEE4 | decorative circle behind icon (main page 2nd section, bottom-left) |

### Border

| Token | Value | Usage |
| --- | --- | --- |
| {colors.border.soft} * | #3d1a46 at 12% | global soft border (CSS var) |
| {colors.border.link} | #331440 at 10% | quick-link card border |

<!-- #ffffff — white border (dark bg) -->
| {colors.border.white} /5 | #ffffff at 5% | decorative circle border (page-header), dark tab border |
| {colors.border.white} /10 | #ffffff at 10% | dark bg card / input / header border |
| {colors.border.white} /20 | #ffffff at 20% | footer divider, home page header mobile hamburger button border |
| {colors.border.white} /30 | #ffffff at 30% | glass card border (welcome section) |
| {colors.border.white} /70 | #ffffff at 70% | map address panel border, slider nav button border |

<!-- quote block left border (3px) -->
| {colors.border.quoteLight} | #510a75 | quote card left border — light bg (lavender blockquote) |
| {colors.border.quoteDark} | #6d5898 | quote card left border — dark bg (revival org 2nd section) |
| {colors.border.quoteJoin} | #2a123c | quote block left border — home join section |

<!-- #8b6db5 — light purple border -->
| {colors.border.purple} /12 | #8b6db5 at 12% | table cell / row divider, vision card border, section divider, core value list divider (subtle) |
| {colors.border.purple} /18 | #8b6db5 at 18% | list divider, general card border, vertical connector line (roadmap, FAQ timeline) |
| {colors.border.purple} /25 | #8b6db5 at 25% | emphasized card / container border, roadmap month card border (revival) |
| {colors.border.purple} /45 | #8b6db5 at 45% | button hover border (location page) |
| {colors.border.purple} /60 | #8b6db5 at 60% | timeline date column vertical divider (church-story) |

<!-- #5d3d8a — dark purple border -->
| {colors.border.darkPurple} /5 | #5d3d8a at 5% | ultra-subtle row divider |
| {colors.border.darkPurple} /15 | #5d3d8a at 15% | tab container, card, section border, table outer container border, light header border |
| {colors.border.darkPurple} /25 | #5d3d8a at 25% | button border |

<!-- #e3bfff — light accent border (dark bg) -->
| {colors.border.accent} /15 | #E3BFFF at 15% | dark section tab border, ministry tag badge background (revival) |
| {colors.border.accent} /50 | #E3BFFF at 50% | ministry tag badge border, table row divider (revival) |


### Indicator Dot

| Token | Value | Usage |
| --- | --- | --- |
| {colors.indicator.light} | #340653 | active dot — light section slide indicator (revival) |
| {colors.indicator.light} /25 | #340653 at 25% | inactive dot — light section slide indicator (revival) |
| {colors.indicator.dark} | #c9a96e | active dot — dark section slide indicator (revival) |
| {colors.indicator.dark} /30 | #c9a96e at 30% | inactive dot — dark section slide indicator (revival) |

### Focus Outline

| Token | Value | Usage |
| --- | --- | --- |
| {colors.focus.light} | var(--color-plum) = #3d1a46 | focus outline on light bg (header, revival tab, error page buttons) |
| {colors.focus.dark} | #ffffff at 50% | focus outline on dark bg (header dark mode, slider buttons) |
| {colors.focus.gold} | #c9a96e at 70% | focus outline on dark bg — gold accent (revival dark tab button) |

### Glass Overlay (welcome section)

Not named tokens — always expressed inline as context-specific opacity values.

| Element | Value |
| --- | --- |
| cloud image wash | #ffffff at 20% |
| verse card background | #ffffff at 42% |
| quick-link card background | #ffffff at 80% |
| map address panel background | #ffffff at 88% |

### Footer

| Token | Value | Usage |
| --- | --- | --- |
| {colors.footer.social} | #2c1838 | social button default |
| {colors.footer.socialHover} | #3a2148 | social button hover |
| {colors.footer.text} | #ffffff at 50% | address, child nav links |
| {colors.footer.textMuted} | #ffffff at 30% | TEL/EMAIL label prefix, copyright text |

### Timeline Bar

4-segment ratio bar used in discipleship pages (training, care) to visualize class structure breakdown.

| Token | Value | Usage |
| --- | --- | --- |
| {colors.timeline.gold} | #e4b96b | first segment (welcome & fellowship / worship) |
| {colors.timeline.dark} | #2a123c | second segment (main content) |
| {colors.timeline.purple} | #8b6db5 | third segment (small group) |
| {colors.timeline.muted} | #d9d4df | fourth segment (closing / wrap-up) |

## 3. Typography

### Font Families

| Token | Family | Source | Usage |
| --- | --- | --- | --- |
| {font.sans} | SUIT, sans-serif | CDN import in `globals.css` | body, nav, paragraphs, UI |
| {font.serifKo} | Hahmlet, serif | `next/font/google` | Korean headings, cards, quotes |
| {font.cormorant} | Cormorant, serif | `next/font/google` | counter numerals, decorative numbers |
| {font.cormorantGaramond} | Cormorant Garamond, serif | `next/font/google` | legacy — being replaced by {font.cormorant} |
| {font.cormorantInfant} | Cormorant Infant, serif | `next/font/google` | section labels, subtitles, gallery captions |
| {font.corinthia} | Corinthia, cursive | `next/font/google` | decorative counters |
| {font.estonia} | Estonia, cursive | `next/font/google` | script subtitles |

### Global Type Scale

Scale-based naming (xl / lg / md / sm / xs). Heading tokens are responsive; all others are fixed. CSS classes follow the pattern `.type-{token}` (e.g. `.type-heading-xl`). Nav active state uses a `font-weight: 700` component-level override. Decorative tokens (script-display, display-counter, script-accent) are inline-only and not part of the scale. Label tokens include `text-transform: uppercase` — do not add a separate `uppercase` class.

| Token | Role | Family | Size | Weight | Line Height | Letter Spacing | Responsive |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| {type.heading.xl} | page banner title | {font.serifKo} | 40px | 600 | 1 | -0.02em | 46px ≥768px / 52px ≥1024px |
| {type.heading.lg} | section heading (large) | {font.serifKo} | 36px | 600 | 1.3 | 0.01em | 42px ≥768px / 48px ≥1024px |
| {type.heading.md} | section heading | {font.serifKo} | 28px | 600 | 1.25 | -0.02em | 32px ≥768px / 36px ≥1024px |
| {type.subtitle.lg} | section description (large) | {font.cormorantInfant} | 24px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.md} | section description (medium) | {font.cormorantInfant} | 20px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.sm} | section description | {font.cormorantInfant} | 16px | 400 | 1.2 | 0.08em | — |
| {type.title.xxs} | micro title / table header | {font.serifKo} | 14px | 600 | 1.5 | 0.01em | — |
| {type.title.xs} | component sub-heading | {font.serifKo} | 16px | 600 | 1.5 | 0.01em | — |
| {type.title.sm} | card title (small) | {font.serifKo} | 18px | 600 | 1.5 | 0.01em | — |
| {type.title.md} | card title (medium) | {font.serifKo} | 20px | 600 | 1.5 | 0.01em | — |
| {type.title.lg} | card title (large) | {font.serifKo} | 22px | 600 | 1.5 | 0.01em | — |
| {type.title.xl} | card title (x-large) | {font.serifKo} | 24px | 600 | 1.5 | 0.01em | — |
| {type.body.lg} | body text (large) | {font.sans} | 20px | 400 | 1.8 | 0.01em | — |
| {type.body.md} | body text | {font.sans} | 18px | 400 | 1.8 | 0.01em | — |
| {type.body.sm} | body text (small) | {font.sans} | 16px | 400 | 1.8 | 0.01em | — |
| {type.body.xs} | body text (x-small) | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.quote.lg} | quote text (large) | {font.serifKo} | 20px | 500 | 1.8 | 0.01em | — |
| {type.quote.md} | quote text | {font.serifKo} | 18px | 500 | 1.8 | 0.01em | — |
| {type.quote.sm} | quote text (small) | {font.serifKo} | 16px | 500 | 1.8 | 0.01em | — |
| {type.quote.xs} | quote text (x-small) | {font.serifKo} | 14px | 500 | 1.75 | 0.01em | — |
| {type.label.xl} | person name / large label | {font.cormorantInfant} | 16px | 300 | 1.2 | 0.08em | — |
| {type.label.lg} | section eyebrow | {font.cormorantInfant} | 14px | 300 | 1.2 | 0.08em | — |
| {type.label.md} | card label | {font.cormorantInfant} | 12px | 300 | 1.2 | 0.08em | — |
| {type.label.sm} | micro label | {font.cormorantInfant} | 10px | 300 | 1.2 | 0.08em | — |
| {type.nav.md} | nav / breadcrumb | {font.sans} | 16px | 500 | 1 | 0.01em | — |
| {type.caption.lg} | caption (large) | {font.sans} | 18px | 400 | 1.5 | 0.01em | — |
| {type.caption.md} | caption | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.button.lg} | button label (large) | {font.sans} | 18px | 600 | 1.75 | 0.01em | — |
| {type.button.md} | button label | {font.sans} | 16px | 600 | 1.75 | 0.01em | — |
| {type.counter.sm} | counter numeral (small) | {font.cormorant} | 20px | 400 | 0.75 | 0.04em | — |
| {type.counter.md} | counter numeral | {font.cormorant} | 24px | 400 | 0.75 | 0.04em | — |
| {type.counter.lg} | counter numeral (large) | {font.cormorant} | 28px | 400 | 0.75 | 0.04em | — |
| {type.scriptDisplay} | decorative | {font.corinthia} | 72px | 400 | 0.9 | 0.01em | 112px ≥768px |
| {type.displayCounter} | decorative | {font.corinthia} | 56px | 400 | 1 | 0.01em | — |
| {type.scriptAccent} | decorative | {font.estonia} | 24px | 400 | 1 | 0.14em | 32px ≥768px |

## 4. Layout

### Spacing Tokens

Tokens are grouped into three tiers by scope. Values outside this set are one-offs and applied inline.

**Component** — internal spacing within UI elements

| Step | Value | Role |
| --- | ---: | --- |
| xs | 8px | icon↔text gap, label micro spacing |
| sm | 12px | chip/badge gap, small dividers |
| md | 16px | default mobile horizontal padding |
| lg | 20px | card inner padding |
| xl | 24px | card section gap, column gap |
| 2xl | 32px | desktop shell horizontal padding |
| 3xl | 36px | card vertical padding (stacked/tall cards) |

**Layout** — spacing between components

| Step | Value | Role |
| --- | ---: | --- |
| sm | 40px | card-to-card gap |
| md | 48px | section heading → content gap |
| lg | 60px | primary section internal gap |
| xl | 80px | large section group gap |

**Section** — page-level vertical rhythm

| Step | Value | Role |
| --- | ---: | --- |
| sm | 100px | desktop section vertical padding |
| lg | 200px | major desktop bottom padding |

### Container Tokens

| Token | Value | Usage |
| --- | ---: | --- |
| {layout.shell.max.base} | 1120px | default `section-shell` |
| {layout.shell.max.narrow.base} | 920px | about pages default |
| {layout.shell.max.wide.base} | 1280px | wider content layouts |
| {layout.shell.padding.mobile} | 16px | `section-shell` base inline padding |
| {layout.shell.padding.tablet} | 32px | `section-shell` >=768px |
| {layout.shell.max.desktop} | 1200px | `section-shell` >=1280px |
| {layout.shell.max.narrow.desktop} | 1040px | narrow shell >=1280px |
| {layout.shell.max.wide.desktop} | 1360px | wide shell >=1280px |
| {layout.shell.max.xl} | 1400px | shell >=1536px |
| {layout.shell.max.wide.xl} | 1480px | wide shell >=1536px |

### Grid Tokens

| Token | Value | Usage |
| --- | --- | --- |
| {grid.missionHistory.tablet} | minmax(0, 1fr) 300px | timeline + image rail >=768px |
| {grid.missionHistory.desktop} | minmax(0, 560px) 400px | timeline + image rail >=1024px |
| {grid.location.map.mobile} | aspect-ratio 16 / 11 | mobile map |
| {grid.location.map.tablet} | aspect-ratio 16 / 8 | tablet map |
| {grid.location.map.desktop} | aspect-ratio 16 / 7 | desktop map |
| {grid.serviceTable.minWidth} | 860px | worship table scroll width |
| {grid.busTable.minWidth.tablet} | 680px | bus table scroll width |
| {grid.busTable.minWidth.desktop} | 760px | bus table scroll width |
| {grid.revival.tabs.desktop} | 180px + 1fr | side tab + content panel |

Layout principles:

- Use full-width sections with constrained `section-shell` inner content.
- Prefer vertical stacking on mobile, then two-column layouts from tablet upward.
- Keep mobile cards readable with 20px horizontal padding and 20px vertical padding.
- Use 60px as the primary gap between section heading and major content on about pages.
- Use 100px for desktop section vertical padding; 200px for major bottom padding on about pages.
- Values outside the three-tier token set (e.g. one-off component sizes) are applied inline and not tracked as tokens.

## 5. Elevation & Depth

| Token | Value | Usage |
| --- | --- | --- |
| {shadow.soft} | 0 14px 40px rgba(20, 6, 26, 0.12) | global surface card |
| {shadow.header.light} | 0 4px 20px rgba(0, 0, 0, 0.05) | non-home sticky header |
| {shadow.dropdown.dark} | 0 18px 45px rgba(0, 0, 0, 0.24) | home desktop dropdown |
| {shadow.dropdown.light} | 0 18px 45px rgba(0, 0, 0, 0.12) | non-home dropdown |
| {shadow.mobileMenu.dark} | 0 18px 45px rgba(0, 0, 0, 0.28) | home mobile menu |
| {shadow.card.soft} | 0 8px 24px rgba(16, 33, 63, 0.06) | mobile table cards |
| {shadow.card.purple} | 0 12px 24px rgba(51, 16, 63, 0.14) | giving chips/map overlay |
| {shadow.mapOverlay} | 0 12px 28px rgba(51, 16, 63, 0.14) | map address panel |
| {shadow.revivalCard} | 0 6px 9px rgba(0, 0, 0, 0.15) | revival value cards |
| {blur.header} | 20px | sticky header/dropdown backdrop |
| {blur.surfaceCard} | 8px | translucent global card |
| {blur.mapOverlay} | 12px | map address panel |
| {blur.welcomeCard} | 10px | home welcome glass panel |

Depth rules:

- Use blur only with translucent surfaces.
- Use stronger shadows on overlays and menus, not on page sections.
- Dark sections should express depth with gradients and opacity layers before heavy shadow.

## 6. Shapes

| Token | Value | Usage |
| --- | ---: | --- |
| {radius.none} | 0px | table rows, editorial rails, square image grids |
| {radius.xs} | 4px | map buttons, map address overlay, small controls |
| {radius.sm} | 6px | giving chips, form controls |
| {radius.md} | 8px | standard cards, section callouts |
| {radius.lg} | 12px | home quick link icon cards |
| {radius.xl} | 16px | large media cards |
| {radius.full} | 9999px | logo frame, dots, social buttons |

Shape rules:

- Cards should generally use {radius.md} or less.
- Editorial dark panels can use {radius.none} or {radius.xs}.
- Circular shapes are reserved for logos, dots, social buttons, and timeline markers.

## 7. Components

### Site Header

| Token | Value |
| --- | --- |
| {component.header.position} | fixed top 0 |
| {component.header.heightOffset} | 82px |
| {component.header.padding.mobile} | 16px 16px |
| {component.header.padding.tablet} | 16px 32px |
| {component.header.padding.desktop} | 16px 60px |
| {component.header.logoIcon} | 50px container / 36px image |
| {component.header.logoText.size.mobile} | 14px |
| {component.header.logoText.size.desktop} | 20px |
| {component.header.logoText.tracking} | 0.3em |
| {component.header.desktopNav.padding} | 16px 18px |
| {component.header.desktopNav.tracking} | 0.2em |
| {component.header.mobileButton.size} | 44px |
| {component.header.mobileMenu.maxHeight} | calc(100svh - 82px) |

### Page Header

| Token | Value |
| --- | --- |
| {component.pageHeader.height.mobile} | 260px |
| {component.pageHeader.height.tablet} | 360px |
| {component.pageHeader.height.desktop} | 320px |
| {component.pageHeader.subtitle.size} | 12px |
| {component.pageHeader.subtitle.tracking} | 0.16em |
| {component.pageHeader.title.size.mobile} | 40px |
| {component.pageHeader.title.size.tablet} | 46px |
| {component.pageHeader.title.size.desktop} | 52px |
| {component.pageHeader.gradient} | linear-gradient(118deg, #2e1f46 27%, #4b3473 87%) |

### Section Heading

| Token | Value |
| --- | --- |
| {component.sectionHeading.maxWidth} | 468px |
| {component.sectionHeading.rule.width} | 30px |
| {component.sectionHeading.rule.height} | 1px |
| {component.sectionHeading.rule.marginTop} | 8px |
| {component.sectionHeading.eyebrow.gap} | 12px |
| {component.sectionHeading.title.marginTop} | 20px |
| {component.sectionHeading.description.marginTop} | 8px |

### Buttons

| Token | Value | Usage |
| --- | --- | --- |
| {component.button.touchTarget.min} | 44px | mobile menu, copy button |
| {component.button.gallery.size} | 48px | mission mobile slider |
| {component.button.revivalControl.size} | 32px | revival mobile content controls |
| {component.button.map.radius} | 4px | map external buttons |
| {component.button.copy.paddingX} | 20px | online giving copy button |
| {component.button.copy.paddingY} | 8px | online giving copy button |

Button rules:

- Mobile touch targets must be at least 44px.
- Navigation and slider buttons should avoid sticky hover backgrounds on touch devices.
- Use border-based buttons for editorial controls; use filled plum buttons only for strong actions/chips.

### Cards

| Token | Value | Usage |
| --- | --- | --- |
| {component.card.mobile.padding} | 20px | service/bus mobile cards |
| {component.card.mobile.radius} | 8px | service/bus mobile cards |
| {component.card.mobile.border} | 1px solid #8b6db5 at 15% | service/bus mobile cards |
| {component.card.quote.borderLeft} | 3px | quote callouts |
| {component.card.quote.padding.mobile} | 24px 28px | quote callouts |
| {component.card.dark.padding.mobile} | 32px 20px | revival dark cards |
| {component.card.dark.padding.desktop} | 40px | revival dark cards |

### Tables

| Token | Value | Usage |
| --- | --- | --- |
| {component.table.topBorder} | 3px | service/bus desktop tables |
| {component.table.cell.padding.mobile} | 16px 20px | mobile card rows |
| {component.table.cell.padding.desktop} | 20px 24px | desktop table rows |
| {component.table.header.bg} | #FAF7FF | desktop table header |
| {component.table.border} | #8b6db5 at 12% | card/table separators |

### Mission Gallery

| Token | Value |
| --- | --- |
| {component.missionGallery.mobile.height} | 32svh |
| {component.missionGallery.mobile.captionBarHeight} | 64px |
| {component.missionGallery.mobile.transition} | transform 460ms ease-out |
| {component.missionGallery.rail.top} | 120px |
| {component.missionGallery.rail.height.desktop} | 880px |
| {component.missionGallery.rail.mainImageHeight.tablet} | 420px |
| {component.missionGallery.rail.mainImageHeight.desktop} | 600px |
| {component.missionGallery.rail.detailImageHeight.tablet} | 160px |
| {component.missionGallery.rail.detailImageHeight.desktop} | 240px |
| {component.missionGallery.rail.width.tablet} | 300px |
| {component.missionGallery.rail.width.desktop} | 400px |

### Footer

| Token | Value |
| --- | --- |
| {component.footer.bg} | #1f0f28 |
| {component.footer.padding.mobile} | 40px 20px |
| {component.footer.padding.tablet} | 40px |
| {component.footer.padding.desktop} | 60px 80px |
| {component.footer.title.size} | 28px |
| {component.footer.title.lineHeight} | 1.25 |
| {component.footer.social.size} | 40px |
| {component.footer.social.bg} | #2c1838 |
| {component.footer.social.hoverBg} | #3a2148 |

## 8. Do's and Don'ts

### Do

- Use {colors.ink.deepPurple} for primary light-page copy.
- Use {colors.accent.purple} for light-page labels, markers, links, and subtle UI accents.
- Use {colors.accent.gold} for dark-section labels and editorial metadata.
- Use {font.serifKo} for Korean headings and {font.sans} for body/UI.
- Keep `section-shell` as the default page-width system.
- Prefer `SectionHeading` for static-page section titles.
- Use real imagery for mission/church storytelling.
- Switch dense desktop tables into cards on mobile.
- Keep mobile controls at or above {component.button.touchTarget.min}.

### Don't

- Do not introduce blue/navy accents into public church pages when purple tokens are already available.
- Do not use rounded decorative cards inside larger cards.
- Do not use gradient orbs as standalone decoration.
- Do not scale font sizes directly with viewport width.
- Do not let mobile hover/focus states remain visually stuck after tapping.
- Do not hide real page content behind sticky mobile media.
- Do not make landing-style marketing heroes for static information pages.
- Do not use broad single-hue palettes without ivory/gold/text contrast.

## 9. Responsive

### Breakpoints

| Token | Value | Usage |
| --- | ---: | --- |
| {breakpoint.mobileMax} | 767px | mobile-only cards/sliders |
| {breakpoint.tablet} | 768px | tablet layout, shell padding 32px |
| {breakpoint.desktop} | 1024px | desktop typography and larger grids |
| {breakpoint.largeDesktop} | 1280px | desktop shell expansion and home scroll scenes |
| {breakpoint.wide} | 1300px | home desktop scroll interactions |
| {breakpoint.xl} | 1536px | largest shell widths |

### Responsive Strategy

| Token | Value |
| --- | --- |
| {responsive.mobileNav} | hamburger menu below 1024px |
| {responsive.desktopNav} | horizontal dropdown nav from 1024px |
| {responsive.mobileShellPadding} | 16px |
| {responsive.tabletShellPadding} | 32px |
| {responsive.mobileCardPadding} | 20px |
| {responsive.majorSectionPadding.mobile} | 80px top/bottom typical |
| {responsive.majorSectionPadding.desktop} | 100px top / 200px bottom typical |
| {responsive.touchTarget.min} | 44px |
| {responsive.missionHistory.mobile} | heading -> mobile image slider -> timeline |
| {responsive.missionHistory.tabletDesktop} | timeline left + sticky image rail right |
| {responsive.serviceTimes.mobile} | stacked cards |
| {responsive.serviceTimes.tabletDesktop} | table with horizontal overflow |
| {responsive.locationBus.mobile} | stacked route cards |
| {responsive.locationBus.tabletDesktop} | table with horizontal overflow |

Mobile rules:

- Use cards instead of tables below {breakpoint.tablet}.
- Keep horizontal submenus scrollable and preserve active visibility.
- Avoid fixed/sticky image rails below {breakpoint.tablet}.
- Maintain page header/banner visibility on mobile static pages.

Tablet rules:

- Treat 768px-1023px as structural desktop for mission history image rail.
- Keep nav collapsed until {breakpoint.desktop}.
- Use shell padding 32px and avoid full-width text blocks longer than 680px.

Desktop rules:

- Use sticky/scroll-driven visual systems only when there is sufficient viewport width.
- Prefer two-column information architecture for content + visual rail.

## 10. Known Gaps

- {gap.colorAudit} -- many color values remain as inline arbitrary values (e.g. `text-[#3d1a46]`) rather than CSS variables or Tailwind tokens. The DESIGN.md Section 2 defines the intended consolidated palette, but the code has not been migrated to use it yet.
- {gap.tailwindTokens} -- `tailwind.config.ts` still defines stale green/blue tokens (`ink: #1f2b24`, `forest`, `sage`, `cedar: #2a4f8f`, `themeBlue`, `site-ink`) that do not reflect the actual purple/plum brand. These tokens are referenced in `site-header.tsx`, `error-page.tsx`, `public-board-renderer.tsx`, and several about-page files. They need to be replaced with plum-aligned values and the referencing files updated.
- {gap.typographyUtilities} -- some classes such as `type-body-strong` are used but not defined in `globals.css`.
- {gap.componentLibrary} -- buttons, cards, tables, and tabs are implemented per page instead of as a shared component API.
- {gap.motionTokens} -- transition durations/easings are embedded inline; only common values such as 300ms, 460ms, and 500ms are observable.
- {gap.adminEditorScope} -- admin/Tiptap editor typography exists but is not fully covered here; this document focuses on the public site.
- {gap.accessibilityAudit} -- color contrast, keyboard focus, and screen reader behavior were not exhaustively audited.
- {gap.assetRules} -- image crop positions and aspect-ratio rules are documented from current implementation but not formalized per asset category.
