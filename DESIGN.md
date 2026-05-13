# Happy Zion Design System

Scope: this document is based on the implemented main page and the completed `about` static pages: greeting, church story, revival organization, service times, location, mission history, and online giving.

## 1. Overview

Happy Zion uses an editorial church-site visual language: quiet ivory surfaces, deep plum fields, gold accent typography, serif Korean headings, and image-led mission storytelling. The core brand feeling is reverent, warm, structured, and ministry-focused.

Primary characteristics:

- {brand.tone} -- reverent / editorial / mission-oriented / warm
- {brand.structure} -- full-width page bands with constrained inner shells
- {brand.visualWeight} -- large Korean serif headings, thin uppercase labels, generous vertical rhythm
- {brand.primaryInteraction} -- scroll-driven story sections, tabbed ministry panels, responsive card/table switching
- {brand.imageUsage} -- real church/mission imagery, full-bleed video hero, sticky gallery rail on desktop, compact slider on mobile

## 2. Colors

### Core Tokens

| Token | Value | Usage |
| --- | --- | --- |
| {colors.background} | #fffcf8 | global body background, warm ivory base |
| {colors.surface} | #fffdf7 | warm surface card background |
| {colors.surface.white} | #ffffff | page content, tables, cards |
| {colors.surface.softPurple} | #fcf8ff | pale section background |
| {colors.surface.purpleMist} | #f5f0f9 | quote blocks, soft purple cards |
| {colors.ink} | #250030 | global root ink |
| {colors.ink.deepPurple} | #33103f | primary page text |
| {colors.ink.plum} | #3d1a46 | secondary brand plum |
| {colors.ink.darkPlum} | #1e1035 | dark section base |
| {colors.ink.footer} | #1f0f28 | footer background |
| {colors.muted} | #928397 | global muted text |
| {colors.muted.purple} | #7a6890 | secondary text on light pages |
| {colors.accent.purple} | #8b6db5 | primary section label and UI accent |
| {colors.accent.gold} | #c9a96e | editorial gold labels |
| {colors.accent.goldStrong} | #d5b16c | global gold accent |
| {colors.accent.goldBright} | #ffd17d | dark-panel highlight |
| {colors.accent.red} | #b73838 | mission timeline interruption state |

### Border Tokens

| Token | Value | Usage |
| --- | --- | --- |
| {colors.border.soft} | rgba(61, 26, 70, 0.12) | global soft border |
| {colors.border.purple.05} | rgba(93, 61, 138, 0.05) | subtle timeline separators |
| {colors.border.purple.12} | rgba(139, 109, 181, 0.12) | mobile cards, table rows |
| {colors.border.purple.15} | rgba(93, 61, 138, 0.15) | section panel borders |
| {colors.border.purple.20} | rgba(139, 109, 181, 0.20) | form/card borders |
| {colors.border.white.20} | rgba(255, 255, 255, 0.20) | footer and dark dividers |

### Dark Section Tokens

| Token | Value | Usage |
| --- | --- | --- |
| {colors.dark.bg.900} | #12091f | main dark scroll background start |
| {colors.dark.bg.800} | #1b1032 | main dark scroll background mid |
| {colors.dark.bg.700} | #2f2047 | revival organization gradient end |
| {colors.dark.panel} | #190b2a | ministry active content panel |
| {colors.dark.panelAlt} | #1a1028 | ministry members footer row |
| {colors.dark.card} | #594263 | small-group content block |
| {colors.dark.text} | #f0e8ff | dark-section primary text |
| {colors.dark.textMuted} | #bfaed9 | dark-section secondary text |

## 3. Typography

### Font Families

| Token | Family | Source | Usage |
| --- | --- | --- | --- |
| {font.sans} | SUIT, sans-serif | CDN import in `globals.css` | body, nav, paragraphs, UI |
| {font.serifKo} | Hahmlet, serif | `next/font/google` | Korean headings, cards, quotes |
| {font.cormorant} | Cormorant, serif | `next/font/google` | selected serif accents |
| {font.cormorantGaramond} | Cormorant Garamond, serif | `next/font/google` | English labels, counters, ministry numbers |
| {font.cormorantInfant} | Cormorant Infant, serif | `next/font/google` | section labels, subtitles, gallery captions |
| {font.corinthia} | Corinthia, cursive | `next/font/google` | decorative counters |
| {font.estonia} | Estonia, cursive | `next/font/google` | script subtitles |

### Global Type Scale

| Token | Family | Size | Weight | Line Height | Letter Spacing | Breakpoint |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| {type.heroTitle.sm} | {font.serifKo} | 44px | 600 | 1.5 | -0.03em | base |
| {type.heroTitle.md} | {font.serifKo} | 52px | 600 | 1.5 | -0.03em | >=768px |
| {type.heroTitle.lg} | {font.serifKo} | 60px | 600 | 1.5 | -0.03em | >=1024px |
| {type.pageTitle.sm} | {font.serifKo} | 40px | 400 | 1.14 | 0 | base |
| {type.pageTitle.md} | {font.serifKo} | 68px | 400 | 1.14 | 0 | >=768px |
| {type.sectionTitle.sm} | {font.serifKo} | 32px | 600 | 1.5 | -0.03em | base |
| {type.sectionTitle.mid} | {font.serifKo} | 36px | 600 | 1.5 | -0.03em | >=670px |
| {type.sectionTitle.md} | {font.serifKo} | 48px | 600 | 1.5 | -0.03em | >=768px |
| {type.sectionTitle.lg} | {font.serifKo} | 56px | 600 | 1.5 | -0.03em | >=1024px |
| {type.sectionSubtitle.sm} | {font.serifKo} | 18px | 500 | 1.35 | 0.02em | base |
| {type.sectionSubtitle.md} | {font.serifKo} | 24px | 500 | 1.35 | 0.02em | >=768px |
| {type.cardTitle.sm} | {font.serifKo} | 20px | 600 | 1.3 | -0.01em | base |
| {type.cardTitle.md} | {font.serifKo} | 24px | 600 | 1.3 | -0.01em | >=768px |
| {type.cardTitle.lg} | {font.serifKo} | 28px | 600 | 1.3 | -0.01em | >=1024px |
| {type.body.sm} | {font.sans} | 16px | 400 | 1.8 | 0.01em | base |
| {type.body.md} | {font.sans} | 18px | 400 | 1.8 | 0.01em | >=768px |
| {type.bodySmall} | {font.sans} | 15px | 400 | 1.76 | 0.01em | base |
| {type.label.sm} | {font.serifKo} | 12px | 200 | 1.2 | 0.18em | base |
| {type.label.md} | {font.serifKo} | 14px | 200 | 1.2 | 0.18em | >=768px |
| {type.label.lg} | {font.serifKo} | 16px | 200 | 1.2 | 0.18em | >=1024px |
| {type.nav.sm} | {font.sans} | 15.2px | 300 | 1.2 | 0.2em | base |
| {type.nav.md} | {font.sans} | 16px | 300 | 1.2 | 0.2em | >=768px |
| {type.button.sm} | {font.sans} | 16px | 600 | 1.2 | 0 | base |
| {type.button.md} | {font.sans} | 17.6px | 600 | 1.2 | 0 | >=768px |
| {type.caption} | {font.sans} | 14px | 400 | 1.45 | 0.01em | base |
| {type.scriptDisplay.sm} | {font.corinthia} | 72px | 400 | 0.9 | 0.01em | base |
| {type.scriptDisplay.md} | {font.corinthia} | 112px | 400 | 0.9 | 0.01em | >=768px |
| {type.scriptAccent.sm} | {font.estonia} | 24px | 400 | 1 | 0.14em | base |
| {type.scriptAccent.md} | {font.estonia} | 32px | 400 | 1 | 0.14em | >=768px |

### Implemented Section Header Type

| Token | Value |
| --- | --- |
| {component.sectionHeading.label.size} | 14px |
| {component.sectionHeading.label.lineHeight} | 18px |
| {component.sectionHeading.label.tracking} | 0.18em |
| {component.sectionHeading.label.color} | #8b6db5 |
| {component.sectionHeading.title.size.mobile} | 30px |
| {component.sectionHeading.title.size.desktop} | 40px |
| {component.sectionHeading.title.lineHeight.mobile} | 1.25 |
| {component.sectionHeading.title.lineHeight.desktop} | 52px |
| {component.sectionHeading.title.weight} | 600 |
| {component.sectionHeading.title.tracking} | 0.01em |
| {component.sectionHeading.description.size} | 16px |
| {component.sectionHeading.description.lineHeight} | 1 |
| {component.sectionHeading.description.tracking} | 0.2em |

## 4. Layout

### Spacing Tokens

| Token | Value | Usage |
| --- | ---: | --- |
| {spacing.0} | 0px | dense mosaic/grid seams |
| {spacing.0_5} | 2px | image/grid gutters |
| {spacing.1} | 4px | micro gaps |
| {spacing.1_5} | 6px | compact indicators |
| {spacing.2} | 8px | label/title micro spacing |
| {spacing.3} | 12px | small gaps, dividers |
| {spacing.4} | 16px | default mobile horizontal rhythm |
| {spacing.5} | 20px | mobile section/card padding |
| {spacing.6} | 24px | card padding, row gap |
| {spacing.7} | 28px | quote/card internal padding |
| {spacing.8} | 32px | desktop shell padding |
| {spacing.10} | 40px | section/card gap |
| {spacing.12} | 48px | section header to content |
| {spacing.14} | 56px | mission grid gap |
| {spacing.15} | 60px | primary section internal gap |
| {spacing.16} | 64px | medium section vertical gap |
| {spacing.20} | 80px | large section group gap |
| {spacing.24} | 96px | home mission mobile gap |
| {spacing.25} | 100px | desktop section top/gap |
| {spacing.32} | 128px | pastor section vertical padding |
| {spacing.36} | 144px | large hero section padding |
| {spacing.45} | 180px | desktop CTA vertical padding |
| {spacing.50} | 200px | major desktop bottom padding |

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
- Use 200px bottom padding for major desktop about sections that need breathing room.

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
| {component.card.mobile.border} | 1px solid rgba(139, 109, 181, 0.15) | service/bus mobile cards |
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
| {component.table.border} | rgba(139, 109, 181, 0.12) | card/table separators |

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

- {gap.colorAudit} -- several one-off page colors remain outside centralized CSS variables, especially in `revival-organization.tsx`, `church-story.tsx`, and home sections.
- {gap.tailwindTokens} -- Tailwind theme colors still include older green/blue tokens that are not aligned with the current purple/gold public-site direction.
- {gap.typographyUtilities} -- some classes such as `type-body-strong` are used but not defined in `globals.css`.
- {gap.componentLibrary} -- buttons, cards, tables, and tabs are implemented per page instead of as a shared component API.
- {gap.motionTokens} -- transition durations/easings are embedded inline; only common values such as 300ms, 460ms, and 500ms are observable.
- {gap.adminEditorScope} -- admin/Tiptap editor typography exists but is not fully covered here; this document focuses on the public site.
- {gap.accessibilityAudit} -- color contrast, keyboard focus, and screen reader behavior were not exhaustively audited.
- {gap.assetRules} -- image crop positions and aspect-ratio rules are documented from current implementation but not formalized per asset category.
