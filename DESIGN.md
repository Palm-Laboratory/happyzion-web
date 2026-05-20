# Happy Zion Design System

```yaml
---
version: "1.0"
name: happyzion-design-system
description: >
  A reverent, editorial church-site visual language built on quiet ivory surfaces,
  deep plum fields, and gold accent typography. Korean serif headings carry doctrinal
  weight while thin uppercase labels and generous vertical rhythm keep the layout
  breathable. The system serves scroll-driven mission storytelling, tabbed ministry
  panels, and responsive card/table switching across all static about-pages.

colors:
  # Surface & Background
  background: "#ffffff"
  surface-cream: "#fffcf8"
  surface-soft-purple: "#fcf8ff"
  surface-photo-frame: "#f2ebf6"
  surface-blockquote: "#f5f0f9"
  surface-table-header: "#FAF7FF"
  surface-cta-dark: "#2a123c"
  surface-footer: "#1f0f28"
  surface-greeting-dark: "#1e1035"
  surface-greeting-purple: "#3f2551"
  surface-greeting-purple-card: "#56385E"
  surface-revival-panel: "#190b2a"
  surface-revival-card: "#594263"
  surface-revival-sidebar: "#fcfaff"
  surface-revival-tab-content: "#f4f0f9"

  # Ink on Light
  ink: "#250030"
  ink-heading2: "#33103f"
  ink-subtitle: "#896B91"
  ink-body: "#4A3B5E"
  ink-soft: "#6F5576"
  ink-muted: "#928397"
  ink-emphasis: "#BD6FE0"
  ink-citation: "#510a75"
  ink-purple: "#8b6db5"

  # Ink on Dark
  dark-heading: "#FFFFFF"
  dark-subtitle: "#E2CAF5"
  dark-label: "#FDF4FF"
  dark-body: "#FFFFFF"
  dark-body-alt: "#FDF8FF"
  dark-body-muted: "rgba(255,255,255,0.8)"
  dark-accent: "#E3BFFF"

  # Point Colors
  gold: "#C9A96E"
  gold-mid: "#E4B96B"
  gold-bright: "#FFD17D"
  red: "#B73838"

  # Icon
  icon: "#6B4A75"
  icon-circle: "#DCCEE4"

  # Borders (commonly used)
  border-soft: "rgba(61,26,70,0.12)"
  border-purple-12: "rgba(139,109,181,0.12)"
  border-purple-18: "rgba(139,109,181,0.18)"
  border-purple-25: "rgba(139,109,181,0.25)"
  border-dark-purple-15: "rgba(93,61,138,0.15)"
  border-accent-15: "rgba(227,191,255,0.15)"
  border-accent-50: "rgba(227,191,255,0.5)"
  border-quote-light: "#510a75"
  border-quote-dark: "#6d5898"

  # Focus
  focus-light: "#3d1a46"
  focus-dark: "rgba(255,255,255,0.5)"
  focus-gold: "rgba(201,169,110,0.7)"

  # Footer
  footer-social: "#2c1838"
  footer-social-hover: "#3a2148"
  footer-text: "rgba(255,255,255,0.5)"
  footer-text-muted: "rgba(255,255,255,0.3)"

typography:
  heading-xl:
    fontFamily: "Hahmlet, serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.02em
    responsive: "46px ≥768px / 52px ≥1024px"
  heading-lg:
    fontFamily: "Hahmlet, serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.01em
    responsive: "42px ≥768px / 48px ≥1024px"
  heading-md:
    fontFamily: "Hahmlet, serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
    responsive: "32px ≥768px / 36px ≥1024px"
  subtitle-lg:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  subtitle-md:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  subtitle-sm:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.08em
  title-xxs:
    fontFamily: "Hahmlet, serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  title-xs:
    fontFamily: "Hahmlet, serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  title-sm:
    fontFamily: "Hahmlet, serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  title-md:
    fontFamily: "Hahmlet, serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  title-lg:
    fontFamily: "Hahmlet, serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  title-xl:
    fontFamily: "Hahmlet, serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.01em
  body-lg:
    fontFamily: "SUIT, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.01em
  body-md:
    fontFamily: "SUIT, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.01em
  body-sm:
    fontFamily: "SUIT, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.01em
  body-xs:
    fontFamily: "SUIT, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.01em
  quote-lg:
    fontFamily: "Hahmlet, serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: 0.01em
  quote-md:
    fontFamily: "Hahmlet, serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: 0.01em
  quote-sm:
    fontFamily: "Hahmlet, serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: 0.01em
  label-lg:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
  label-md:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
  label-sm:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 10px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
  caption-lg:
    fontFamily: "SUIT, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.01em
  caption-md:
    fontFamily: "SUIT, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.01em
  counter-sm:
    fontFamily: "Cormorant, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: 0.04em
  counter-md:
    fontFamily: "Cormorant, serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: 0.04em
  counter-lg:
    fontFamily: "Cormorant, serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: 0.04em
  script-display:
    fontFamily: "Corinthia, cursive"
    fontSize: 72px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: 0.01em
    responsive: "112px ≥768px"
  script-accent:
    fontFamily: "Estonia, cursive"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.14em
    responsive: "32px ≥768px"

spacing:
  component:
    gap:                  # Tailwind: gap-comp-{step}
      3xs:  2px
      xxs:  4px
      xs:   6px
      sm:   8px
      md:   12px
      base: 16px
      lg:   20px
      xl:   24px
      xxl:  28px
      3xl:  32px
      4xl:  36px
    padding:              # Tailwind: p{x|y}-pad-{step}
      3xs:  8px
      xxs:  12px
      xs:   16px
      sm:   20px
      md:   24px
      base: 28px
      lg:   32px
      xl:   36px
      xxl:  40px
      3xl:  44px
      4xl:  48px
  layout:                 # Tailwind: gap-layout-{step}
    xs:   2px
    sm:   16px
    base: 24px
    md:   32px
    lg:   48px
    xl:   60px
    xxl:  80px
  section:                # Tailwind: p{y|b}-section-{step}
    sm:  60px   # mobile
    md:  80px   # tablet
    lg:  100px  # desktop
    xl:  120px  # final section bottom — mobile
    xxl: 160px  # final section bottom — tablet
    3xl: 200px  # final section bottom — desktop

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

components:
  site-header:
    position: "fixed top 0"
    heightOffset: 82px
    padding-mobile: "16px 16px"
    padding-tablet: "16px 32px"
    padding-desktop: "16px 60px"
    logo-icon-size: 50px
    logo-image-size: 36px
    logo-text-size-mobile: 14px
    logo-text-size-desktop: 20px
    logo-text-tracking: 0.3em
    nav-item-padding: "16px 18px"
    nav-item-tracking: 0.2em
    mobile-button-size: 44px

  page-header:
    height-mobile: 260px
    height-tablet: 360px
    height-desktop: 320px
    gradient: "linear-gradient(118deg, #2e1f46 27%, #4b3473 87%)"

  section-heading:
    max-width: 468px
    rule-width: 30px
    rule-height: 1px

  button:
    touch-target-min: 44px
    gallery-size: 48px
    revival-control-size: 32px

  card:
    mobile-padding: 20px
    mobile-radius: 8px
    quote-border-left: 3px

  table:
    top-border: 3px
    cell-padding-mobile: "16px 20px"
    cell-padding-desktop: "20px 24px"
    header-bg: "#FAF7FF"

  mission-gallery:
    mobile-height: 32svh
    mobile-caption-bar: 64px
    rail-top: 120px
    rail-height-desktop: 880px
    rail-width-tablet: 300px
    rail-width-desktop: 400px

  footer:
    bg: "#1f0f28"
    padding-mobile: "40px 20px"
    padding-tablet: "40px"
    padding-desktop: "60px 80px"
    social-size: 40px
---
```

## Overview

Happy Zion uses an editorial church-site visual language: quiet ivory surfaces, deep plum fields, gold accent typography, serif Korean headings, and image-led mission storytelling. The core brand feeling is reverent, warm, structured, and ministry-focused.

The base canvas is **white** (`{colors.background}` — #ffffff) for about pages and content areas, with soft-purple (`{colors.surface.softPurple}` — #fcf8ff) for vision and info panels, and deep dark-plum fields (`{colors.surface.dark}`) for mission scroll sections. There is no single primary action color — the system uses **plum** (`{colors.ink.citation}` — #510a75) for interactive emphasis and **gold** (`{colors.gold}` — #C9A96E) for editorial accent on dark backgrounds.

Type is split between **Hahmlet** (Korean serif — doctrinal weight, headings, quotes) and **SUIT** (sans-serif — body text, UI, navigation). Decorative families **Cormorant** and **Corinthia** carry counter numerals and script display moments; **Estonia** and **Cormorant Infant** handle subtitle and label roles. There is no single display family — the system assigns a specific family to each typographic role.

The shape language is **low-radius and editorial**. Cards are 8px (`{rounded.md}`), controls are 6px (`{rounded.sm}`), and circular shapes appear only for logos, dots, and social buttons (`{rounded.full}`). No rounded-pill CTAs exist — all button shapes are quietly rectangular.

**Key Characteristics:**
- Multi-surface system: white (about pages) · soft-purple (vision panels) · dark-plum (mission sections)
- Dual primary type families: `{font.serifKo}` for Korean headings and `{font.sans}` for body/UI
- Gold (`{colors.gold}`) as the dark-section editorial accent — metadata, milestones, timestamps
- Scroll-driven mission storytelling, tabbed ministry panels, responsive card/table switching
- Real church/mission photography — full-bleed video hero, sticky gallery rail on desktop, compact slider on mobile

## Colors

Colors are organized by the three background zones: white/cream (bright sections), soft-purple (vision panels), and dark-plum (mission sections). CSS variables in `globals.css` are marked *.

### Surface & Background

| Token | Value | Usage |
| --- | --- | --- |
| {colors.background} | #ffffff | default page background — about pages, cards, content areas |
| {colors.surface.cream} * | #fffcf8 | main page join section, join image fade overlay, error page background |
| {colors.surface.softPurple} | #fcf8ff | vision panels, location map overlay, revival org 3rd section |
| {colors.surface.photoFrame} | #f2ebf6 | vision photo frame bg, mission story image placeholder |
| {colors.surface.dark} | linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%) | mission scroll sections background |
| {colors.surface.footer} | #1f0f28 | footer background |
| {colors.surface.darkHeader} | #241f25 at variable opacity | home nav (0.72) · dropdown (0.92) · mobile menu (0.96) |
| {colors.surface.blockquote} | #f5f0f9 | blockquote bg; discipleship lavender bg (cards, tab hover, table rows) |
| {colors.surface.tableHeader} | #FAF7FF | table header row bg (service-times, location) |
| {colors.surface.ctaDark} | #2a123c | CTA button/card bg — dark sections, discipleship, online-giving |
| {colors.surface.greetingDark} | #1e1035 | greeting page dark (pastor) section |
| {colors.surface.greetingPurple} | #3f2551 | greeting page purple (church leaders) section |
| {colors.surface.greetingPurpleCard} | #56385E | greeting page church leaders card |
| {colors.surface.revivalGradient} | bg-gradient-to-b from-[#1e1035] to-[#2f2047] | revival org 2nd section |
| {colors.surface.revivalPanel} | #190b2a | revival org 2nd section tab content panel |
| {colors.surface.revivalCard} | #594263 | revival org 3rd section small group block |
| {colors.surface.revivalSidebar} | #fcfaff | revival org 3rd section sidebar aside |
| {colors.surface.revivalTabContent} | #f4f0f9 | revival org 3rd section tab content bg |

### Ink on Light

Text colors used on light backgrounds (white, soft-purple `#fcf8ff`, cream `#fffcf8`).

| Token | Value | Usage |
| --- | --- | --- |
| {colors.ink} | #250030 | high-emphasis headings |
| {colors.ink.heading2} | #33103f | secondary headings, quote card text, tab titles, table accent border (3px) |
| {colors.ink.subtitle} | #896B91 | section subtitles |
| {colors.ink.body} | #4A3B5E | body text |
| {colors.ink.soft} | #6F5576 | soft body text |
| {colors.ink.muted} | #928397 | weak secondary text |
| {colors.ink.emphasis} | #BD6FE0 | inline purple emphasis (church name, address) |
| {colors.ink.citation} | #510a75 | quote card left border · scripture citation · link hover color |
| {colors.ink.purple} | #8b6db5 | purple accent — labels, metadata, roadmap badges, section heading labels |

### Ink on Dark

Text colors used on deep purple backgrounds (`{colors.surface.dark}`, `{colors.surface.greetingDark}`, etc.).

| Token | Value | Usage |
| --- | --- | --- |
| {colors.dark.heading} | #FFFFFF | headings |
| {colors.dark.subtitle} | #E2CAF5 | subtitles |
| {colors.dark.label} | #FDF4FF | section labels |
| {colors.dark.body} | #FFFFFF | primary body text |
| {colors.dark.bodyAlt} | #FDF8FF | soft body text variant |
| {colors.dark.bodyMuted} | #ffffff at 80% | muted body / label text on dark bg |
| {colors.dark.accent} | #E3BFFF | purple point color (decorative accents, UI elements) |

### Point Colors

Gold and red accent colors used across both light and dark sections.

| Token | Value | Usage |
| --- | --- | --- |
| {colors.gold} | #C9A96E | gold — metadata, dates, milestone labels |
| {colors.gold.mid} | #E4B96B | mid gold — discipleship pages accent |
| {colors.gold.bright} | #FFD17D | bright gold — decorative numerals, quarter headers |
| {colors.red} | #B73838 | red — special period markers (e.g. COVID) |

### Borders

Purple borders dominate the system. Three base hues at varying opacity cover all border needs.

| Token | Value | Usage |
| --- | --- | --- |
| {colors.border.soft} * | #3d1a46 at 12% | global soft border (CSS var) |
| {colors.border.purple} /12 | #8b6db5 at 12% | table cell / row divider, vision card border, section divider (subtle) |
| {colors.border.purple} /18 | #8b6db5 at 18% | list divider, general card border, vertical connector line |
| {colors.border.purple} /25 | #8b6db5 at 25% | emphasized card / container border |
| {colors.border.purple} /45 | #8b6db5 at 45% | button hover border (location page) |
| {colors.border.purple} /60 | #8b6db5 at 60% | timeline date column vertical divider (church-story) |
| {colors.border.darkPurple} /5 | #5d3d8a at 5% | ultra-subtle row divider |
| {colors.border.darkPurple} /15 | #5d3d8a at 15% | tab container, card, section border, light header border |
| {colors.border.darkPurple} /25 | #5d3d8a at 25% | button border |
| {colors.border.accent} /15 | #E3BFFF at 15% | dark section tab border, ministry tag badge background |
| {colors.border.accent} /50 | #E3BFFF at 50% | ministry tag badge border, table row divider (revival) |
| {colors.border.white} /10 | #ffffff at 10% | dark bg card / input / header border |
| {colors.border.white} /20 | #ffffff at 20% | footer divider, mobile hamburger button border |
| {colors.border.quote.light} | #510a75 | quote card left border — light bg |
| {colors.border.quote.dark} | #6d5898 | quote card left border — dark bg (revival) |

### Indicator & Focus

| Token | Value | Usage |
| --- | --- | --- |
| {colors.indicator.light} | #340653 | active dot — light section slide indicator |
| {colors.indicator.light} /25 | #340653 at 25% | inactive dot — light section |
| {colors.indicator.dark} | #c9a96e | active dot — dark section slide indicator |
| {colors.indicator.dark} /30 | #c9a96e at 30% | inactive dot — dark section |
| {colors.focus.light} | #3d1a46 | focus outline on light bg |
| {colors.focus.dark} | #ffffff at 50% | focus outline on dark bg |
| {colors.focus.gold} | #c9a96e at 70% | focus outline on dark bg — gold accent |

### Footer & Timeline

| Token | Value | Usage |
| --- | --- | --- |
| {colors.footer.social} | #2c1838 | social button default |
| {colors.footer.socialHover} | #3a2148 | social button hover |
| {colors.footer.text} | #ffffff at 50% | address, child nav links |
| {colors.footer.textMuted} | #ffffff at 30% | TEL/EMAIL label prefix, copyright |
| {colors.timeline.gold} | #e4b96b | 1st segment (welcome/worship) |
| {colors.timeline.dark} | #2a123c | 2nd segment (main content) |
| {colors.timeline.purple} | #8b6db5 | 3rd segment (small group) |
| {colors.timeline.muted} | #d9d4df | 4th segment (closing) |

## Typography

### Font Families

| Token | Family | Source | Usage |
| --- | --- | --- | --- |
| {font.sans} | SUIT, sans-serif | CDN import in `globals.css` | body, nav, paragraphs, UI |
| {font.serifKo} | Hahmlet, serif | `next/font/google` | Korean headings, cards, quotes |
| {font.cormorant} | Cormorant, serif | `next/font/google` | counter numerals |
| {font.cormorantInfant} | Cormorant Infant, serif | `next/font/google` | section labels, subtitles, gallery captions |
| {font.corinthia} | Corinthia, cursive | `next/font/google` | decorative script display |
| {font.estonia} | Estonia, cursive | `next/font/google` | script subtitles |

### Type Scale

CSS classes follow the pattern `.type-{token}` (e.g. `.type-title-lg`). Heading tokens are responsive; all others are fixed. Label tokens include `text-transform: uppercase` — do not add a separate `uppercase` class.

| Token | Role | Family | Size | Weight | Line Height | Letter Spacing | Responsive |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| {type.heading.xl} | page banner title | {font.serifKo} | 40px | 600 | 1 | -0.02em | 46px ≥768px / 52px ≥1024px |
| {type.heading.lg} | section heading (large) | {font.serifKo} | 36px | 600 | 1.3 | 0.01em | 42px ≥768px / 48px ≥1024px |
| {type.heading.md} | section heading | {font.serifKo} | 28px | 600 | 1.25 | -0.02em | 32px ≥768px / 36px ≥1024px |
| {type.subtitle.lg} | section description (large) | {font.cormorantInfant} | 24px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.md} | section description | {font.cormorantInfant} | 20px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.sm} | section description (small) | {font.cormorantInfant} | 16px | 400 | 1.2 | 0.08em | — |
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
| {type.label.lg} | section eyebrow | {font.cormorantInfant} | 14px | 300 | 1.2 | 0.08em | — |
| {type.label.md} | card label | {font.cormorantInfant} | 12px | 300 | 1.2 | 0.08em | — |
| {type.label.sm} | micro label | {font.cormorantInfant} | 10px | 300 | 1.2 | 0.08em | — |
| {type.caption.lg} | caption (large) | {font.sans} | 18px | 400 | 1.5 | 0.01em | — |
| {type.caption.md} | caption | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.counter.sm} | counter numeral (small) | {font.cormorant} | 20px | 400 | 0.75 | 0.04em | — |
| {type.counter.md} | counter numeral | {font.cormorant} | 24px | 400 | 0.75 | 0.04em | — |
| {type.counter.lg} | counter numeral (large) | {font.cormorant} | 28px | 400 | 0.75 | 0.04em | — |
| {type.scriptDisplay} | decorative | {font.corinthia} | 72px | 400 | 0.9 | 0.01em | 112px ≥768px |
| {type.scriptAccent} | decorative | {font.estonia} | 24px | 400 | 1 | 0.14em | 32px ≥768px |

### Principles

The system trusts Korean serif headings for doctrinal and emotional weight. Hahmlet runs the entire heading scale — display headlines sit at 36–52px in weight 600, feeling measured and reverent rather than loud. Body copy in SUIT at weight 400 keeps reading comfortable across long discipleship pages.

The single typographically loud moment is the **script display** (`{type.scriptDisplay}` — 72px/112px Corinthia) used in the main page hero. Everywhere else the scale descends predictably — there are no aggressive weight jumps.

Label tokens (`{type.label.*}`) always carry `text-transform: uppercase` in their CSS definition. Never add a second `uppercase` class on top of a label token.

## Layout

### Spacing

Tokens are grouped into three tiers by scope. Values outside this set are one-offs and applied inline.

Tailwind class pattern: `gap-comp-{step}` / `p{x|y}-pad-{step}` / `gap-layout-{step}` / `p{y|b}-section-{step}`

**Component gap (`gap-comp-*`)** — flex/grid gap inside UI elements

| Step | Value | Role |
| --- | ---: | --- |
| 3xs | 2px | dense list minimum gap |
| xxs | 4px | icon↔text micro gap |
| xs | 6px | bullet dot↔text gap |
| sm | 8px | label/chip gap, title↔description |
| md | 12px | eyebrow line / text row gap |
| base | 16px | default component vertical gap |
| lg | 20px | card inner group gap |
| xl | 24px | card section divider |
| xxl | 28px | card wide inner gap |
| 3xl | 32px | large inner gap |
| 4xl | 36px | maximum inner gap |

**Component padding (`p{x|y}-pad-*`)** — internal padding of UI elements

| Step | Value | Role |
| --- | ---: | --- |
| 3xs | 8px | entry row vertical padding |
| xxs | 12px | tab sidebar button vertical padding, table cell horizontal padding |
| xs | 16px | tab sidebar button horizontal padding |
| sm | 20px | small card padding |
| md | 24px | default card padding |
| base | 28px | card base padding |
| lg | 32px | card padding (large) |
| xl | 36px | card padding (x-large) |
| xxl | 40px | card padding (max) |
| 3xl | 44px | card padding (3xl) |
| 4xl | 48px | card vertical padding, section callout |

**Layout (`gap-layout-*`)** — spacing between containers within a section

| Step | Value | Role |
| --- | ---: | --- |
| xs | 2px | micro divider gap |
| sm | 16px | small container gap |
| base | 24px | default container gap |
| md | 32px | medium container gap |
| lg | 48px | section heading → content gap |
| xl | 60px | primary section internal gap |
| xxl | 80px | large section group gap |

**Section (`p{y|b}-section-*`)** — page-level vertical rhythm

| Step | Value | Role |
| --- | ---: | --- |
| sm  | 60px  | mobile section vertical padding |
| md  | 80px  | tablet section vertical padding |
| lg  | 100px | desktop section vertical padding |
| xl  | 120px | final section bottom — mobile (`pb-section-xl`) |
| xxl | 160px | final section bottom — tablet (`md:pb-section-xxl`) |
| 3xl | 200px | final section bottom — desktop (`lg:pb-section-3xl`) |

### Container

| Token | Value | Usage |
| --- | ---: | --- |
| {layout.shell.max.base} | 1120px | default `section-shell` |
| {layout.shell.max.narrow} | 920px | about pages default |
| {layout.shell.max.wide} | 1280px | wider content layouts |
| {layout.shell.padding.mobile} | 16px | `section-shell` base inline padding |
| {layout.shell.padding.tablet} | 32px | `section-shell` ≥768px |
| {layout.shell.max.desktop} | 1200px | `section-shell` ≥1280px |
| {layout.shell.max.narrow.desktop} | 1040px | narrow shell ≥1280px |
| {layout.shell.max.wide.desktop} | 1360px | wide shell ≥1280px |

### Grid

| Token | Value | Usage |
| --- | --- | --- |
| {grid.missionHistory.tablet} | minmax(0, 1fr) 300px | timeline + image rail ≥768px |
| {grid.missionHistory.desktop} | minmax(0, 560px) 400px | timeline + image rail ≥1024px |
| {grid.location.map.mobile} | 16 / 11 | map aspect ratio — mobile |
| {grid.location.map.tablet} | 16 / 8 | map aspect ratio — tablet |
| {grid.location.map.desktop} | 16 / 7 | map aspect ratio — desktop |
| {grid.serviceTable.minWidth} | 860px | worship table horizontal scroll |
| {grid.busTable.minWidth} | 680px–760px | bus table horizontal scroll |
| {grid.revival.tabs.desktop} | 180px + 1fr | side tab rail + content panel |

### Whitespace Philosophy

Full-width sections with constrained `section-shell` inner content carry the rhythm. About-page sections run 100px vertical padding on desktop — tight enough to keep the page scanning quickly, generous enough to separate doctrinal blocks.

The final section bottom padding scales responsively: 120px on mobile (`pb-section-xl`) / 160px on tablet (`md:pb-section-xxl`) / 200px on desktop (`lg:pb-section-3xl`). This gives proportional visual breathing room before the footer at every breakpoint.

Mobile sections compress to 60px typical vertical padding. Cards stay readable with `pad-*` tokens managing horizontal and vertical inner padding.

## Elevation

| Token | Value | Usage |
| --- | --- | --- |
| {shadow.soft} | 0 14px 40px rgba(20, 6, 26, 0.12) | global surface card |
| {shadow.header.light} | 0 4px 20px rgba(0, 0, 0, 0.05) | non-home sticky header |
| {shadow.dropdown.dark} | 0 18px 45px rgba(0, 0, 0, 0.24) | home desktop dropdown |
| {shadow.dropdown.light} | 0 18px 45px rgba(0, 0, 0, 0.12) | non-home dropdown |
| {shadow.card.soft} | 0 8px 24px rgba(16, 33, 63, 0.06) | mobile table cards |
| {shadow.card.purple} | 0 12px 24px rgba(51, 16, 63, 0.14) | giving chips, map overlay |
| {shadow.revivalCard} | 0 6px 9px rgba(0, 0, 0, 0.15) | revival value cards |
| {blur.header} | 20px | sticky header / dropdown backdrop |
| {blur.surfaceCard} | 8px | translucent global card |
| {blur.mapOverlay} | 12px | map address panel |
| {blur.welcomeCard} | 10px | home welcome glass panel |

The system has essentially **two elevation tiers** plus flat:
- **Flat:** editorial bands, body sections, footers — the majority of surfaces.
- **Raised:** cards on hover, dropdowns, menus — uses the soft/purple shadow tokens.
- **Overlay:** modal-style panels (map address, mobile menu) — blur + stronger shadow + scrim.

Depth rules:
- Use blur only with translucent surfaces.
- Use stronger shadows on overlays and menus, not on page sections.
- Dark sections should express depth with gradients and opacity layers before heavy shadow.

## Shapes

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
- Cards use `{radius.md}` or less — no large pill shapes.
- Editorial dark panels prefer `{radius.none}` or `{radius.xs}`.
- Circular shapes are reserved for logos, dots, social buttons, and timeline markers.

## Components

### Site Header

**`site-header`** — Fixed top bar. On the home page it renders on a transparent dark scrim (`{colors.surface.darkHeader}` at 0.72 opacity with 20px blur); on all other pages it uses a soft-white surface with a light shadow. Height offset is 82px — used as `scroll-mt` on all anchored sections. Logo is a 50px circular frame with a 36px brand image inside, paired with the church name in 20px / 0.3em tracking.

Desktop nav items use `{type.nav.md}` with 0.2em tracking and 16×18px padding. Dropdowns appear on hover with `{shadow.dropdown}`. Mobile collapses everything into a 44px hamburger button (minimum touch target).

### Page Header

**`page-header`** — A gradient banner used as the visual lead on all static sub-pages. Gradient is `{component.pageHeader.gradient}`. Height steps: 260px mobile → 360px tablet → 320px desktop. Title uses `{type.heading.xl}` (responsive 40→46→52px), subtitle uses 12px / 0.16em tracking label.

### Section Heading

**`section-heading`** — The common heading block used at the top of every major page section. Composed of: an uppercase eyebrow label (`{type.label.lg}`) with a 30px × 1px rule beneath, a section title (`{type.heading.lg}` or `{type.heading.md}`), and an optional italic description in `{type.subtitle.md}`. Max-width constrained to 468px to keep the heading line tight.

### Buttons

**`button-primary`** — Dark plum fill (`{colors.surface.ctaDark}`), white text, 8px radius, `{type.button.md}`. Used for strong CTAs on light and soft-purple sections.

**`button-map`** — 4px radius external link buttons on the location page. Border-based with ink text.

Touch targets are enforced at 44px minimum for all mobile controls (`{component.button.touchTarget.min}`). Slider controls (mission gallery) use 48px circular buttons. Revival organization mobile controls use 32px square buttons.

### Cards

**`card-standard`** — White surface, `{radius.md}` (8px), 1px `{colors.border.darkPurple}/15` border, 20px inner padding on mobile. Used for service-times and bus-route content on mobile.

**`card-quote`** — Light lavender surface (`{colors.surface.blockquote}`), 3px left border (`{colors.border.quote.light}`), 24×28px padding on mobile. Used for scripture quotes and discipleship callout blocks.

**`card-dark`** — Dark plum surface (`{colors.surface.ctaDark}`), 32×20px padding on mobile / 40px on desktop. Used in revival organization dark sections and discipleship pages.

### Tables

**`table-desktop`** — Used for service times, bus routes, and location info. 3px top accent border in `{colors.ink.heading2}`, header row in `{colors.surface.tableHeader}`, cell padding 20×24px. Min-width enforced (860px for service table, 680–760px for bus table) with horizontal scroll wrapper.

**`table-mobile`** — Tables collapse to stacked card layout below 768px. Each row becomes a `{component.card.standard}` with 16×20px inner padding and `{shadow.card.soft}`.

### Mission Gallery

**`mission-gallery-mobile`** — Full-width image slider at 32svh height with a 64px caption bar. Transition: transform 460ms ease-out. Shown only below 768px.

**`mission-gallery-rail`** — A sticky right-column image layout shown from 768px upward. Rail is 300px wide at tablet / 400px at desktop, positioned sticky at 120px from top, total height 880px. Main image is 420px (tablet) / 600px (desktop); two detail images are 160px (tablet) / 240px (desktop).

### Footer

**`footer`** — Dark plum surface (`{colors.surface.footer}` — #1f0f28), 40×20px padding mobile / 40px tablet / 60×80px desktop. Church name in 28px / 1.25 line-height. Social buttons are 40px circles in `{colors.footer.social}` with `{radius.full}`. Address and child links in `{colors.footer.text}` (white 50%); copyright in `{colors.footer.textMuted}` (white 30%).

## Responsive

### Breakpoints

| Token | Value | Usage |
| --- | ---: | --- |
| {breakpoint.tablet} | 768px | tablet layout, shell padding 32px |
| {breakpoint.desktop} | 1024px | desktop typography, larger grids |
| {breakpoint.largeDesktop} | 1280px | shell expansion, home scroll scenes |
| {breakpoint.wide} | 1300px | home desktop scroll interactions |
| {breakpoint.xl} | 1536px | largest shell widths |

### Responsive Strategy

| Pattern | Mobile | Tablet+ |
| --- | --- | --- |
| Navigation | hamburger (below 1024px) | horizontal dropdown nav |
| Mission history | heading → mobile slider → timeline | timeline left + sticky image rail right |
| Service times | stacked cards | table with horizontal overflow |
| Bus routes | stacked route cards | table with horizontal overflow |
| Revival org | swipeable tab panels | side tab rail + content panel |
| Section padding | 60px typical / 120px final bottom | 80–100px top / 160–200px final bottom |
| Shell padding | 16px | 32px |

Mobile rules:
- Use cards instead of tables below `{breakpoint.tablet}`.
- Keep horizontal submenus scrollable and preserve active tab visibility.
- Avoid fixed/sticky image rails below `{breakpoint.tablet}`.
- Maintain touch targets at or above 44px.

Tablet rules:
- Treat 768–1023px as structural desktop for the mission history image rail.
- Keep nav collapsed until `{breakpoint.desktop}`.
- Avoid full-width text blocks longer than 680px.

Desktop rules:
- Use sticky/scroll-driven systems only at sufficient viewport width.
- Prefer two-column information architecture for content + visual rail.

## Known Gaps

- {gap.colorAudit} — many color values remain as inline arbitrary values (e.g. `text-[#3d1a46]`) rather than CSS variables. Section 2 defines the intended palette; the code migration is pending.
- {gap.tailwindTokens} — `tailwind.config.ts` still defines stale green/blue tokens (`forest`, `sage`, `cedar`, `themeBlue`) that do not reflect the actual purple/plum brand. Referencing files: `site-header.tsx`, `error-page.tsx`, `public-board-renderer.tsx`.
- {gap.componentLibrary} — buttons, cards, tables, and tabs are implemented per page instead of as a shared component API.
- {gap.motionTokens} — transition durations and easings are embedded inline; common values are 300ms, 460ms, and 500ms.
- {gap.accessibilityAudit} — color contrast, keyboard focus, and screen reader behavior were not exhaustively audited.
- {gap.adminEditorScope} — admin/Tiptap editor typography exists but is not covered here; this document focuses on the public site.
