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
  dark-body-muted: "#ffffff/80"
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
  border-soft: "#3d1a46/12"
  border-purple-12: "#8b6db5/12"
  border-purple-18: "#8b6db5/18"
  border-purple-25: "#8b6db5/25"
  border-dark-purple-5: "#5d3d8a/5"
  border-dark-purple-15: "#5d3d8a/15"
  border-dark-purple-25: "#5d3d8a/25"
  border-accent-15: "#e3bfff/15"
  border-accent-50: "#e3bfff/50"
  border-quote-light: "#510a75"
  border-quote-dark: "#6d5898"

  # Focus
  focus-light: "#3d1a46"
  focus-dark: "#ffffff/50"
  focus-gold: "#c9a96e/70"

  # Footer
  footer-social: "#2c1838"
  footer-social-hover: "#3a2148"
  footer-text: "#ffffff/50"
  footer-text-muted: "#ffffff/30"

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
  quote-xs:
    fontFamily: "Hahmlet, serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: 0.01em
  label-xl:
    fontFamily: "Cormorant Infant, serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
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
  nav-md:
    fontFamily: "SUIT, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.01em
    note: "Active state overrides font-weight to 700 at component level"
  button-lg:
    fontFamily: "SUIT, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.75
    letterSpacing: 0.01em
  button-md:
    fontFamily: "SUIT, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.75
    letterSpacing: 0.01em
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

  # ─────────────────────────────────────────────
  # 네비게이션
  # ─────────────────────────────────────────────

  # 메인 페이지 — 상단 고정 헤더 (반투명 다크)
  site-nav-bar-home:
    backgroundColor: "rgba(36,31,37,0.72)"
    border: "rgba(255,255,255,0.1)"
    height: 82px
    padding: "16px 16px (mobile) / 16px 32px (tablet) / 16px 60px (desktop)"
    backdropBlur: 20px
    logo-icon-size: 50px
    logo-image-size: 36px
    logo-text-size: "14px (mobile) / 20px (desktop)"
    logo-text-tracking: 0.3em

  # 내부 페이지 — 상단 고정 헤더 (화이트)
  site-nav-bar-inner:
    backgroundColor: "rgba(255,255,255,0.95)"
    border: "{colors.border.darkPurple15}"
    height: 82px
    padding: "16px 16px (mobile) / 16px 32px (tablet) / 16px 60px (desktop)"
    backdropBlur: 20px

  # 데스크탑 — 메인 페이지 상단 메뉴 링크
  site-nav-link-home:
    textColor: "{colors.dark.heading}"
    typography: "{typography.nav-md}"
    padding: "16px 18px"
    tracking: 0.2em
  site-nav-link-home-hover:
    backgroundColor: "rgba(255,255,255,0.1)"

  # 데스크탑 — 내부 페이지 상단 메뉴 링크
  site-nav-link-inner:
    textColor: "{colors.ink}"
    typography: "{typography.nav-md}"
    padding: "16px 18px"
    tracking: 0.2em
  site-nav-link-inner-hover:
    backgroundColor: "rgba(37,0,48,0.05)"

  # 데스크탑 — 메인 페이지 드롭다운 패널
  site-nav-dropdown-home:
    backgroundColor: "rgba(36,31,37,0.92)"
    border: "rgba(255,255,255,0.1)"
    rounded: 8px
    padding: "8px 0"
    backdropBlur: 20px
    shadow: "0 18px 45px rgba(0,0,0,0.24)"

  # 데스크탑 — 내부 페이지 드롭다운 패널
  site-nav-dropdown-inner:
    backgroundColor: "{colors.background}"
    border: "{colors.border.darkPurple15}"
    rounded: 8px
    padding: "8px 0"
    backdropBlur: 20px
    shadow: "0 18px 45px rgba(0,0,0,0.12)"

  # 데스크탑 — 메인 페이지 드롭다운 항목
  site-nav-dropdown-item-home:
    textColor: "rgba(255,255,255,0.9)"
    typography: "{typography.body-sm}"
    padding: "12px 16px"
  site-nav-dropdown-item-home-hover:
    backgroundColor: "rgba(255,255,255,0.1)"

  # 데스크탑 — 내부 페이지 드롭다운 항목
  site-nav-dropdown-item-inner:
    textColor: "rgba(37,0,48,0.8)"
    typography: "{typography.body-sm}"
    padding: "12px 16px"
  site-nav-dropdown-item-inner-hover:
    backgroundColor: "rgba(37,0,48,0.05)"

  # 모바일 — 메인 페이지 전체화면 메뉴 패널
  mobile-nav-panel-home:
    backgroundColor: "rgba(36,31,37,0.96)"
    border: "rgba(255,255,255,0.1)"
    backdropBlur: 20px

  # 모바일 — 내부 페이지 전체화면 메뉴 패널
  mobile-nav-panel-inner:
    backgroundColor: "{colors.background}"
    border: "{colors.border.darkPurple15}"
    backdropBlur: 20px

  # 모바일 — 1depth 메뉴 링크
  mobile-nav-link:
    typography: "{typography.button-lg}"
    height: 56px
    padding: "16px 8px"
    border: "currentColor/10"

  # 모바일 — 2depth 메뉴 링크
  mobile-nav-child-link:
    textColor: "rgba(37,0,48,0.6)"
    typography: "{typography.body-sm}"
    padding: "8px 8px"

  # 모바일 — 햄버거 버튼
  mobile-nav-hamburger-btn:
    height: 44px
    width: 44px
    border: "currentColor/20"

  # ─────────────────────────────────────────────
  # 공통 UI
  # ─────────────────────────────────────────────

  # 모든 하위 페이지 — 브레드크럼 바
  breadcrumb-bar:
    backgroundColor: "#f7f6f8"
    border: "rgba(51,16,63,0.1)"
    padding: "12px 0"

  breadcrumb-item-active:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"

  breadcrumb-item-inactive:
    textColor: "rgba(51,16,63,0.7)"
    typography: "{typography.body-xs}"

  # 교회소개·제자양육 하위 페이지 — 탭 네비게이션 바
  lnb-tab-active:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
    borderBottom: "2.5px solid #33103f"
    padding: "14px 12px"

  lnb-tab-inactive:
    textColor: "rgba(51,16,63,0.7)"
    typography: "{typography.body-xs}"
    borderBottom: "2.5px solid transparent"
    padding: "14px 12px"
  lnb-tab-inactive-hover:
    textColor: "{colors.ink.heading2}"
    borderBottom: "2.5px solid rgba(51,16,63,0.3)"

  # 모든 하위 페이지 — 페이지 최상단 헤더 배너
  page-header:
    backgroundColor: "linear-gradient(118deg, #2e1f46 27%, #4b3473 87%)"
    height: "260px (mobile) / 360px (tablet) / 320px (desktop)"
  page-header-eyebrow:
    textColor: "{colors.gold}"
    typography: "{typography.caption-sm}"
  page-header-title:
    textColor: "{colors.dark.heading}"
    typography: "{typography.display-lg}"

  # 각 섹션 상단 소제목 블록 (아이보리 페이지)
  section-heading:
    max-width: 468px
    rule-width: 30px
    rule-height: 1px
  section-heading-eyebrow:
    textColor: "{colors.ink.purple}"
    typography: "{typography.label-lg}"
  section-heading-title:
    textColor: "{colors.ink}"
    typography: "type-heading-md"
  section-heading-description:
    textColor: "{colors.ink.purple}"
    typography: "type-subtitle-sm"

  # ─────────────────────────────────────────────
  # 버튼
  # ─────────────────────────────────────────────

  # 게시판 상세 — 목록으로 버튼, 공유 버튼 (다크 채움)
  btn-primary:
    backgroundColor: "{colors.ink.heading2}"
    textColor: "{colors.dark.heading}"
    typography: "{typography.body-xs}"
    rounded: 9999px
    height: 44px
    padding: "0 16px"
    border: "{colors.ink.heading2}"
  btn-primary-hover:
    backgroundColor: "{colors.ink.purple}"
    border: "{colors.ink.purple}"

  # 게시판 상세 — 공유 버튼 (라인 테두리)
  btn-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
    rounded: 9999px
    height: 44px
    padding: "0 16px"
    border: "rgba(139,109,181,0.2)"
  btn-secondary-hover:
    border: "{colors.ink.purple}"

  # 홈 — Join 섹션 빠른이동 버튼 (다크 카드형)
  btn-cta-dark:
    backgroundColor: "{colors.surface.ctaDark}"
    textColor: "{colors.dark.heading}"
    typography: "{typography.button-lg}"
    rounded: 8px
    padding: "20px"
    shadow: "0 4px 24px rgba(110,100,100,0.1)"
  btn-cta-dark-hover:
    transform: "translateY(-2px)"

  # 지도 — 네이버지도/카카오맵 링크 버튼
  btn-map-action:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
    rounded: 4px
    border: "{colors.border.purple18}"
    padding: "4px 8px"
    shadow: "0 10px 24px rgba(51,16,63,0.08)"
  btn-map-action-hover:
    textColor: "{colors.ink.purple}"
    border: "rgba(139,109,181,0.45)"
    transform: "translateY(-2px)"

  # 홈 미션스토리 — 모바일 이전/다음 슬라이드 버튼
  btn-slider-nav:
    height: 60px
    width: 60px
    textColor: "{colors.dark.label}"
    border: "rgba(255,255,255,0.7)"
    rounded: 9999px

  # 부흥조직도 — 모바일 탭 이전/다음 컨트롤
  btn-revival-control:
    height: 32px
    width: 32px
    rounded: 4px

  # 영상·게시판 — 더보기 버튼
  btn-load-more:
    backgroundColor: "{colors.ink.heading2}"
    textColor: "{colors.dark.heading}"
    typography: "{typography.body-sm}"
    rounded: 9999px
    padding: "12px 24px"
  btn-load-more-disabled:
    backgroundColor: "{colors.ink.muted}"

  # 온라인헌금 — 계좌번호 복사 버튼
  btn-copy-account:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.button-md}"
    border: "{colors.border.purple25}"
    padding: "8px 20px"
    height: 44px
  btn-copy-account-hover:
    backgroundColor: "{colors.surface.ctaDark}"
    textColor: "{colors.dark.heading}"

  # 첨부파일 다운로드 트리거 링크
  btn-attachment-trigger:
    textColor: "{colors.ink.purple}"
    typography: "{typography.body-xs}"
    textDecoration: underline
  btn-attachment-trigger-hover:
    textColor: "{colors.ink.heading2}"

  # ─────────────────────────────────────────────
  # 입력 / 폼
  # ─────────────────────────────────────────────

  # 게시판 — 검색 입력창
  input-search:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
    rounded: 9999px
    height: 40px
    padding: "0 16px"
    border: "rgba(139,109,181,0.15)"
  input-search-focus:
    border: "{colors.ink.purple}"

  # 게시판 — 페이지 수 선택 드롭다운
  input-select:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.body}"
    typography: "{typography.body-xs}"
    rounded: 8px
    height: 44px
    padding: "12px 36px 12px 16px"
    border: "rgba(93,61,138,0.15)"
  input-select-hover:
    border: "{colors.ink.purple}"

  # 제자양육 — 신청 폼 입력 필드
  input-apply-field:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.dark.heading}"
    typography: "{typography.body-xs}"
    rounded: 4px
    height: 36px
    padding: "0 20px"
    border: "rgba(255,255,255,0.1)"
  input-apply-field-focus:
    border: "rgba(228,185,107,0.7)"

  # 제자양육 — 신청 폼 컨테이너
  form-apply:
    backgroundColor: "rgba(255,255,255,0.04)"
    rounded: 12px
    padding: "28px 24px"

  # 제자양육 — 신청 버튼
  btn-apply-submit:
    backgroundColor: "{colors.gold.mid}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.button-md}"
    rounded: 4px
    height: 40px
    padding: "0 20px"
  btn-apply-submit-hover:
    backgroundColor: "{colors.gold.bright}"

  # ─────────────────────────────────────────────
  # 카드
  # ─────────────────────────────────────────────

  # 홈 — 비전 섹션 비전 카드
  card-vision:
    backgroundColor: "{colors.surface.softPurple}"
    border: "{colors.border.purple12}"
    rounded: 4px
    padding: "30px 24px"
    shadow: "0 4px 12px rgba(52,22,67,0.15), 4px 8px 24px rgba(44,11,64,0.2)"
  card-vision-eyebrow:
    textColor: "rgba(105,19,147,0.4)"
    typography: "{typography.label-md}"
  card-vision-title:
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  card-vision-body:
    textColor: "{colors.ink.body}"
    typography: "{typography.body-sm}"

  # 인사말 — 비전 목록 다크 카드
  card-greeting-dark:
    backgroundColor: "{colors.surface.ctaDark}"
    textColor: "{colors.dark.heading}"
    border: "rgba(255,255,255,0.05)"
    rounded: 4px
    padding: "pad-lg pad-sm"
    shadow: "0 4px 12px rgba(0,0,0,0.1)"
  card-greeting-dark-eyebrow:
    textColor: "rgba(255,255,255,0.5)"
    typography: "{typography.label-md}"
  card-greeting-dark-title:
    textColor: "{colors.dark.heading}"
    typography: "{typography.title-sm}"

  # 인사말 — 장로 인물 카드
  card-leader-person:
    backgroundColor: "{colors.surface.greetingPurpleCard}"
    border: "rgba(255,255,255,0.1)"
    rounded: 4px
    padding: "pad-md pad-sm"
  card-leader-person-photo:
    backgroundColor: "{colors.surface.photoFrame}"
    height: 88px
    width: 72px
  card-leader-person-eyebrow:
    textColor: "{colors.gold}"
    typography: "{typography.label-md}"
  card-leader-person-name:
    textColor: "{colors.dark.heading}"
    typography: "{typography.title-sm}"
  card-leader-person-role:
    textColor: "rgba(255,255,255,0.8)"
    typography: "{typography.caption-md}"

  # 인용구 — 성경말씀·인용문 카드 (아이보리 배경 페이지)
  card-blockquote:
    backgroundColor: "{colors.surface.blockquote}"
    borderLeft: "3px solid {colors.ink.citation}"
    padding: "pad-md pad-lg"
  card-blockquote-text:
    textColor: "{colors.ink.heading2}"
    typography: "type-quote-sm"
  card-blockquote-citation:
    textColor: "{colors.ink.citation}"
    typography: "type-quote-xs"

  # 교회역사·선교이력·부흥조직도 — 다크 callout 카드
  card-mission-callout:
    backgroundColor: "radial-gradient(circle at 25% 29%, #1f1035 0%, #2e1d46 100%)"
    textColor: "{colors.dark.heading}"
    rounded: 4px
    padding: "pad-lg (mobile) / pad-xxl (tablet) / pad-4xl (desktop)"
  card-mission-callout-eyebrow:
    textColor: "{colors.gold}"
    typography: "{typography.label-lg}"
  card-mission-callout-title:
    textColor: "{colors.dark.heading}"
    typography: "{typography.title-md}"

  # 예배시간·오시는길 — 모바일 예배 정보 카드
  card-service-time-mobile:
    backgroundColor: "{colors.background}"
    border: "{colors.border.purple18}"
    rounded: 8px
    padding: "pad-sm"
    shadow: "0 8px 24px rgba(16,33,63,0.06)"

  # 오시는길 — 지도 위 주소 말풍선 카드
  card-map-tooltip:
    backgroundColor: "rgba(255,255,255,0.88)"
    border: "rgba(255,255,255,0.7)"
    rounded: 4px
    backdropBlur: 12px
    shadow: "0 12px 28px rgba(51,16,63,0.14)"
    padding: "pad-3xs pad-xxs (mobile) / pad-xxs pad-xs (desktop)"

  # 홈 — Join 섹션 인용 카드
  card-join-quote:
    borderLeft: "3px solid {colors.ink.citation}"
    padding: "pad-md pad-lg"
  card-join-quote-text:
    textColor: "{colors.ink.heading2}"
    typography: "type-quote-sm"

  # 홈 — 웰컴 섹션 성경구절 카드
  card-welcome-verse:
    backgroundColor: "rgba(255,255,255,0.42)"
    border: "rgba(255,255,255,0.3)"
    rounded: 8px
    backdropBlur: 10px
    shadow: "0 8px 24px rgba(97,60,116,0.2)"

  # 홈 — 웰컴 섹션 빠른 링크 카드
  card-welcome-quicklink:
    backgroundColor: "rgba(255,255,255,0.8)"
    border: "rgba(51,20,64,0.1)"
    rounded: 12px
    shadow: "0 8px 24px rgba(0,0,0,0.15)"
    backdropBlur: 6px

  # 부흥조직도 — 소그룹 사이클 카드
  card-small-group-cycle:
    backgroundColor: "rgba(255,255,255,0.1)"
    rounded: 4px
    padding: "pad-sm"
  card-small-group-cycle-number:
    textColor: "{colors.dark.accent}"
    # Corinthia font, italic, 36px
  card-small-group-cycle-title:
    textColor: "{colors.dark.bodyAlt}"
    typography: "{typography.title-sm}"

  # 부흥조직도 — 사역팀 프로그램 카드 (라이트)
  card-ministry-program:
    backgroundColor: "{colors.background}"
    border: "{colors.border.darkPurple15}"
    padding: "pad-base"
  card-ministry-program-eyebrow:
    textColor: "{colors.ink.muted}"
    typography: "{typography.label-md}"
  card-ministry-program-title:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.title-md}"
  card-ministry-program-body:
    textColor: "{colors.ink.soft}"
    typography: "{typography.caption-md}"

  # 부흥조직도 — 로드맵 분기 헤더
  card-roadmap-quarter-header:
    backgroundColor: "#341a44"
    textColor: "{colors.gold.bright}"
    height: 40px
    padding: "0 pad-sm"
    typography: "{typography.label-md}"

  # 부흥조직도 — 로드맵 월별 카드
  card-roadmap-month:
    backgroundColor: "rgba(255,255,255,0.1)"
    border: "rgba(141,118,157,0.6)"
    padding: "pad-xs"
  card-roadmap-month-phase:
    textColor: "{colors.dark.accent}"
    typography: "{typography.label-md}"
  card-roadmap-month-title:
    textColor: "{colors.dark.bodyAlt}"
    typography: "{typography.title-xs}"

  # 영상 상세 — 설교 내용 아코디언 카드
  card-detail-accordion:
    backgroundColor: "{colors.surface.cream}"
    rounded: 16px
    padding: "0 30px"
  card-detail-accordion-summary:
    textColor: "{colors.ink.heading2}"
    height: 60px

  # 영상 상세 — 관련 영상 사이드바 패널
  card-related-video-aside:
    backgroundColor: "{colors.surface.cream}"
    border: "rgba(51,16,63,0.1)"
    rounded: 16px
    padding: "18px"

  # 온라인헌금 — 계좌 배지 (은행명)
  card-account-badge:
    backgroundColor: "{colors.surface.blockquote}"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.label-xl}"
    rounded: 6px
    height: "44px (mobile) / 54px (desktop)"
    padding: "pad-3xs pad-md"

  # ─────────────────────────────────────────────
  # 게시판
  # ─────────────────────────────────────────────

  # 게시판 목록 — 일반 게시글 행
  board-post-item-normal:
    backgroundColor: "{colors.background}"
    border: "rgba(93,61,138,0.1)"
    padding: "16px 12px (mobile) / 20px (desktop)"
  board-post-item-pinned:
    backgroundColor: "rgba(139,109,181,0.05)"
    border: "rgba(93,61,138,0.1)"

  # 게시판 목록 — 번호 셀
  board-post-number-normal:
    textColor: "{colors.ink.body}"
    typography: "{typography.body-xs}"
  board-post-number-pinned:
    backgroundColor: "{colors.ink.heading2}"
    textColor: "{colors.dark.heading}"
    rounded: 6px
    padding: "4px 10px"
    typography: "{typography.label-md}"

  # 게시판 목록 — 제목
  board-post-title:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-md}"
  board-post-title-hover:
    textColor: "{colors.ink.purple}"

  # 게시판 목록 — 메타 (날짜·조회수)
  board-post-meta:
    textColor: "{colors.ink.muted}"
    typography: "{typography.body-xs}"

  # 게시판 목록 — 빈 목록 안내
  board-empty-state:
    border: "dashed {colors.border.purple18}"
    rounded: 4px
    padding: "56px 24px"
    textColor: "{colors.ink.muted}"
    typography: "{typography.body-xs}"

  # 게시판 — 페이지네이션 이전/다음 버튼
  board-pagination-btn:
    border: "rgba(139,109,181,0.15)"
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
    rounded: 9999px
    padding: "10px 14px"
  board-pagination-btn-disabled:
    textColor: "rgba(146,131,151,0.6)"
    border: "rgba(139,109,181,0.12)"

  # 게시판 — 페이지번호 버튼
  board-pagination-page-active:
    backgroundColor: "{colors.ink.heading2}"
    textColor: "{colors.dark.heading}"
    border: "{colors.ink.heading2}"
    height: 32px
    width: 32px
    rounded: 9999px
    typography: "{typography.body-xs}"
  board-pagination-page-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.ink.heading2}"
    border: "rgba(139,109,181,0.15)"
    height: 32px
    width: 32px
    rounded: 9999px
    typography: "{typography.body-xs}"
  board-pagination-page-inactive-hover:
    backgroundColor: "rgba(139,109,181,0.06)"

  # 게시판 상세 — 이전글/다음글 카드
  board-detail-adjacent-post:
    backgroundColor: "{colors.background}"
    border: "dashed rgba(93,61,138,0.2)"
    rounded: 16px
    padding: "24px"
  board-detail-adjacent-post-hover:
    border: "{colors.ink.purple}"
  board-detail-adjacent-post-disabled:
    backgroundColor: "rgba(255,255,255,0.7)"
    border: "dashed rgba(139,109,181,0.14)"
  board-detail-adjacent-badge:
    backgroundColor: "{colors.surface.softPurple}"
    textColor: "{colors.surface.ctaDark}"
    rounded: 8px
    height: 48px
    width: 48px
  board-detail-adjacent-label:
    textColor: "{colors.ink.muted}"
    typography: "{typography.label-md}"
  board-detail-adjacent-title:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-md}"
  board-detail-adjacent-title-hover:
    textColor: "{colors.ink.purple}"

  # 게시판 상세 — 첨부파일 드롭다운 항목
  board-attachment-dropdown-item:
    rounded: 12px
    padding: "12px 16px"
  board-attachment-icon-download:
    backgroundColor: "rgba(139,109,181,0.1)"
    textColor: "{colors.ink.purple}"
    height: 36px
    width: 36px
    rounded: 9999px
  board-attachment-icon-file:
    backgroundColor: "rgba(51,16,63,0.05)"
    textColor: "rgba(51,16,63,0.7)"
    height: 36px
    width: 36px
    rounded: 9999px
  board-attachment-count-badge:
    backgroundColor: "rgba(139,109,181,0.08)"
    textColor: "{colors.ink.muted}"
    typography: "{typography.label-md}"
    rounded: 9999px
    padding: "4px 10px"

  # 게시판 게시글 본문 — 인라인 코드
  board-content-code-inline:
    backgroundColor: "rgba(139,109,181,0.08)"
    textColor: "{colors.ink.heading2}"
    rounded: 4px
    padding: "2px 6px"
  # 게시판 게시글 본문 — 코드 블록
  board-content-code-block:
    backgroundColor: "rgba(139,109,181,0.06)"
    border: "rgba(139,109,181,0.15)"
    rounded: 8px
    padding: "16px 20px"
  # 게시판 게시글 본문 — 인용구
  board-content-blockquote:
    borderLeft: "4px solid rgba(139,109,181,0.35)"
    textColor: "rgba(51,16,63,0.82)"
    padding: "0 0 0 20px"

  # ─────────────────────────────────────────────
  # 영상
  # ─────────────────────────────────────────────

  # 영상 목록/상세 — 롱폼 썸네일
  video-thumbnail-longform:
    backgroundColor: "{colors.ink.heading2}"
    height: 84px
    width: 132px
    rounded: 8px
  video-thumbnail-longform-play-btn:
    backgroundColor: "rgba(255,255,255,0.12)"
    border: "rgba(255,255,255,0.2)"
    height: 36px
    width: 36px
    rounded: 9999px

  # 영상 목록 — 롱폼 영상 제목
  video-thumbnail-longform-title:
    textColor: "{colors.ink.heading2}"
    # 20px font-bold tracking-[-0.03em]
  video-thumbnail-longform-meta:
    textColor: "rgba(51,16,63,0.6)"
    typography: "{typography.caption-sm}"

  # 영상 목록 — 숏폼 썸네일 카드
  video-thumbnail-shortform:
    backgroundColor: "{colors.ink.heading2}"
    rounded: 8px
    # aspect-ratio: 2/3
  video-thumbnail-shortform-title:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
  video-thumbnail-shortform-meta:
    textColor: "rgba(51,16,63,0.7)"
    typography: "{typography.caption-sm}"

  # 영상 상세 — 관련 영상 소형 썸네일
  video-thumbnail-related:
    backgroundColor: "{colors.ink.heading2}"
    height: 78px
    width: 120px
    rounded: 8px
  video-thumbnail-related-title:
    textColor: "{colors.ink.heading2}"
    typography: "{typography.body-xs}"
  video-thumbnail-related-meta:
    textColor: "rgba(51,16,63,0.7)"
    typography: "{typography.caption-sm}"

  # 영상 — 페이지네이션 (게시판과 동일 패턴)
  video-pagination-page-active:
    backgroundColor: "{colors.ink.heading2}"
    textColor: "{colors.dark.heading}"
    height: 32px
    width: 32px
    rounded: 9999px
  video-pagination-page-inactive:
    border: "rgba(51,16,63,0.12)"
    textColor: "{colors.ink.heading2}"
    height: 32px
    width: 32px
    rounded: 9999px
  video-pagination-page-inactive-hover:
    backgroundColor: "rgba(51,16,63,0.05)"
  video-pagination-prev-next:
    border: "rgba(51,16,63,0.12)"
    textColor: "{colors.ink.heading2}"
    rounded: 9999px
    padding: "10px 14px"
  video-pagination-prev-next-disabled:
    textColor: "rgba(51,16,63,0.35)"

  # ─────────────────────────────────────────────
  # 탭
  # ─────────────────────────────────────────────

  # 부흥조직도 — 소그룹·사역팀 탭 사이드바 (라이트 버전)
  tab-sidebar-light:
    backgroundColor: "{colors.surface.revivalSidebar}"
    width: 180px
  tab-sidebar-item-light-active:
    backgroundColor: "{colors.surface.revivalTabContent}"
    textColor: "{colors.ink.heading2}"
    borderLeft: "2px solid #340653"
    borderBottom: "{colors.border.darkPurple15}"
    padding: "pad-xxs pad-xs"
    height: 66px
  tab-sidebar-item-light-inactive:
    backgroundColor: "rgba(255,255,255,0.6)"
    textColor: "{colors.ink.heading2}"
    borderLeft: "2px solid transparent"
    borderBottom: "{colors.border.darkPurple15}"
    padding: "pad-xxs pad-xs"
    height: 66px
  tab-sidebar-item-title:
    typography: "{typography.title-xs}"
  tab-sidebar-item-subtitle:
    textColor: "{colors.ink.soft}"
    typography: "{typography.body-xs}"

  # 부흥조직도 — 사역팀 탭 사이드바 (다크 버전)
  tab-sidebar-dark:
    backgroundColor: "rgba(255,255,255,0.04)"
    width: 180px
  tab-sidebar-item-dark-active:
    backgroundColor: "{colors.surface.revivalPanel}"
    textColor: "{colors.dark.bodyAlt}"
    borderLeft: "2px solid {colors.gold}"
    borderBottom: "rgba(227,191,255,0.15)"
    padding: "pad-xxs pad-xs"
    height: 66px
  tab-sidebar-item-dark-inactive:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.dark.bodyAlt}"
    borderLeft: "2px solid transparent"
    borderBottom: "rgba(227,191,255,0.15)"
    padding: "pad-xxs pad-xs"
    height: 66px

  # 제자양육 — 커리큘럼 단계 탭
  tab-curriculum-stage-active:
    backgroundColor: "{colors.surface.ctaDark}"
    textColor: "{colors.dark.heading}"
  tab-curriculum-stage-inactive:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink.heading2}"
  tab-curriculum-stage-inactive-hover:
    backgroundColor: "{colors.surface.blockquote}"
  tab-curriculum-label-active:
    textColor: "{colors.gold.mid}"
    typography: "{typography.label-lg}"
  tab-curriculum-label-inactive:
    textColor: "{colors.ink.purple}"
    typography: "{typography.label-lg}"

  # 제자양육 — 탭 하단 진행 표시바
  tab-progress-indicator-active:
    backgroundColor: "{colors.ink.heading2}"
    height: 2px
  tab-progress-indicator-inactive:
    backgroundColor: "rgba(139,109,181,0.25)"
    height: 2px

  # ─────────────────────────────────────────────
  # 푸터
  # ─────────────────────────────────────────────

  # 모든 페이지 하단 — 푸터
  footer:
    backgroundColor: "{colors.surface.footer}"
    padding: "40px 20px (mobile) / 40px (tablet) / 60px 80px (desktop)"
  footer-site-name:
    textColor: "{colors.dark.heading}"
    typography: "{typography.title-xl}"
  footer-address:
    textColor: "rgba(255,255,255,0.5)"
    typography: "{typography.body-md}"
  footer-nav-group-title:
    textColor: "{colors.dark.heading}"
    typography: "{typography.body-md}"
  footer-nav-group-title-hover:
    textColor: "rgba(255,255,255,0.8)"
  footer-nav-child-link:
    textColor: "rgba(255,255,255,0.5)"
    typography: "{typography.body-sm}"
  footer-nav-child-link-hover:
    textColor: "{colors.dark.heading}"
  footer-divider:
    border: "rgba(255,255,255,0.2)"
  footer-copyright:
    textColor: "rgba(255,255,255,0.3)"
    typography: "{typography.body-sm}"
  footer-social-btn:
    backgroundColor: "#2c1838"
    textColor: "rgba(255,255,255,0.8)"
    height: 40px
    width: 40px
    rounded: 9999px
  footer-social-btn-hover:
    backgroundColor: "#3a2148"
    textColor: "{colors.dark.heading}"
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

### Icon

| Token | Value | Usage |
| --- | --- | --- |
| {colors.icon} | #6B4A75 | icon fill color |
| {colors.icon.circle} | #DCCEE4 | icon circle / badge background |

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
| {type.quote.xs} | quote text (x-small) | {font.serifKo} | 14px | 500 | 1.75 | 0.01em | — |
| {type.label.xl} | label (large) | {font.cormorantInfant} | 16px | 300 | 1.2 | 0.08em | uppercase |
| {type.label.lg} | section eyebrow | {font.cormorantInfant} | 14px | 300 | 1.2 | 0.08em | uppercase |
| {type.label.md} | card label | {font.cormorantInfant} | 12px | 300 | 1.2 | 0.08em | uppercase |
| {type.label.sm} | micro label | {font.cormorantInfant} | 10px | 300 | 1.2 | 0.08em | uppercase |
| {type.nav.md} | navigation link | {font.sans} | 16px | 500 | 1 | 0.01em | active: weight 700 |
| {type.button.lg} | button (large) | {font.sans} | 18px | 600 | 1.75 | 0.01em | — |
| {type.button.md} | button | {font.sans} | 16px | 600 | 1.75 | 0.01em | — |
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

Touch targets are enforced at 44px minimum for all mobile controls (`{component.button.touchTarget.min}`). Slider controls (mission gallery) use 60px circular buttons. Revival organization mobile controls use 32px square buttons.

### Cards

**`card-standard`** — White surface, `{radius.md}` (8px), 1px `{colors.border.darkPurple}/15` border, 20px inner padding on mobile. Used for service-times and bus-route content on mobile.

**`card-quote`** — Light lavender surface (`{colors.surface.blockquote}`), 3px left border (`{colors.border.quote.light}`), 24×28px padding on mobile. Used for scripture quotes and discipleship callout blocks.

**`card-dark`** — Dark plum surface (`{colors.surface.ctaDark}`), 32×20px padding on mobile / 40px on desktop. Used in revival organization dark sections and discipleship pages.

### Tables

**`table-desktop`** — Used for service times, bus routes, and location info. 3px top accent border in `{colors.ink.heading2}`, header row in `{colors.surface.tableHeader}`. Header cell padding: 16px (mobile) / 20px (desktop); body cell padding: 20px (mobile) / 24px (desktop). Min-width enforced (860px for service table, 680–760px for bus table) with horizontal scroll wrapper.

**`table-mobile`** — Tables collapse to stacked card layout below 768px. Each row becomes a `{component.card.standard}` with 16×20px inner padding and `{shadow.card.soft}`.

### Mission Gallery

**`mission-gallery-mobile`** — Full-width image slider at 32svh height with a 40px caption bar. Transition: transform 460ms ease-out. Shown only below 768px.

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
