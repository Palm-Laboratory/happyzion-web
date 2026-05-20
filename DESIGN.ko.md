# 행복이 가득한 시온교회 디자인 시스템

```yaml
---
version: "1.0"
name: happyzion-design-system
description: >
  경건하고 에디토리얼한 교회 사이트 비주얼 언어. 조용한 아이보리 서피스,
  깊은 플럼 필드, 골드 액센트 타이포그래피로 구성됩니다. 한국어 세리프 헤딩이
  교리적 무게를 담당하고, 얇은 대문자 레이블과 넉넉한 수직 리듬이 레이아웃을
  숨쉬게 합니다. 스크롤 중심 선교 스토리텔링, 탭형 사역 패널, 반응형
  카드/테이블 전환을 지원합니다.

colors:
  # 서피스 & 배경
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

  # 라이트 배경 잉크
  ink: "#250030"
  ink-heading2: "#33103f"
  ink-subtitle: "#896B91"
  ink-body: "#4A3B5E"
  ink-soft: "#6F5576"
  ink-muted: "#928397"
  ink-emphasis: "#BD6FE0"
  ink-citation: "#510a75"
  ink-purple: "#8b6db5"

  # 다크 배경 잉크
  dark-heading: "#FFFFFF"
  dark-subtitle: "#E2CAF5"
  dark-label: "#FDF4FF"
  dark-body: "#FFFFFF"
  dark-body-alt: "#FDF8FF"
  dark-body-muted: "rgba(255,255,255,0.8)"
  dark-accent: "#E3BFFF"

  # 포인트 컬러
  gold: "#C9A96E"
  gold-mid: "#E4B96B"
  gold-bright: "#FFD17D"
  red: "#B73838"

  # 아이콘
  icon: "#6B4A75"
  icon-circle: "#DCCEE4"

  # 보더 (주요 사용)
  border-soft: "rgba(61,26,70,0.12)"
  border-purple-12: "rgba(139,109,181,0.12)"
  border-purple-18: "rgba(139,109,181,0.18)"
  border-purple-25: "rgba(139,109,181,0.25)"
  border-dark-purple-15: "rgba(93,61,138,0.15)"
  border-accent-15: "rgba(227,191,255,0.15)"
  border-accent-50: "rgba(227,191,255,0.5)"
  border-quote-light: "#510a75"
  border-quote-dark: "#6d5898"

  # 포커스
  focus-light: "#3d1a46"
  focus-dark: "rgba(255,255,255,0.5)"
  focus-gold: "rgba(201,169,110,0.7)"

  # 푸터
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
    xl:  120px  # 페이지 마지막 섹션 하단 — 모바일
    xxl: 160px  # 페이지 마지막 섹션 하단 — 태블릿
    3xl: 200px  # 페이지 마지막 섹션 하단 — 데스크탑

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

## 개요

행복이 가득한 시온교회는 에디토리얼 교회 사이트 비주얼 언어를 사용합니다. 조용한 아이보리 서피스, 깊은 플럼 필드, 골드 액센트 타이포그래피, 한국어 세리프 헤딩, 이미지 중심의 선교 스토리텔링으로 구성됩니다. 핵심 브랜드 감성은 경건함, 따뜻함, 구조적 명확성, 사역 중심입니다.

기본 캔버스는 **흰색** (`{colors.background}` — #ffffff)으로, about 페이지와 콘텐츠 영역에서 사용됩니다. 소프트 퍼플(`{colors.surface.softPurple}` — #fcf8ff)은 비전 패널과 정보 패널에, 짙은 다크 플럼 필드(`{colors.surface.dark}`)는 선교 스크롤 섹션에 사용됩니다. 단일 주요 액션 컬러는 없으며, **플럼**(`{colors.ink.citation}` — #510a75)을 인터랙티브 강조에, **골드**(`{colors.gold}` — #C9A96E)를 다크 배경 에디토리얼 액센트에 사용합니다.

타이포그래피는 **Hahmlet**(한국어 세리프 — 교리적 무게, 헤딩, 인용문)과 **SUIT**(산세리프 — 본문, UI, 내비게이션)로 나뉩니다. 장식용 폰트 **Cormorant**와 **Corinthia**는 카운터 숫자와 스크립트 디스플레이에, **Estonia**와 **Cormorant Infant**는 서브타이틀과 레이블에 사용됩니다.

형태 언어는 **낮은 라운드와 에디토리얼** 스타일입니다. 카드는 8px(`{rounded.md}`), 컨트롤은 6px(`{rounded.sm}`), 원형 형태는 로고·점·소셜 버튼에만 사용합니다(`{rounded.full}`). 둥근 필 형태의 CTA는 없습니다.

**주요 특성:**
- 다중 서피스 시스템: 화이트(about 페이지) · 소프트 퍼플(비전 패널) · 다크 플럼(선교 섹션)
- 이중 주요 폰트 패밀리: `{font.serifKo}` 한국어 헤딩 / `{font.sans}` 본문·UI
- 골드(`{colors.gold}`)는 다크 섹션 에디토리얼 액센트 — 메타데이터, 마일스톤, 타임스탬프
- 스크롤 중심 선교 스토리텔링, 탭형 사역 패널, 반응형 카드/테이블 전환
- 실제 교회/선교 사진 — 풀 블리드 비디오 히어로, 데스크탑 스티키 갤러리 레일, 모바일 컴팩트 슬라이더

## 색상

색상은 세 가지 배경 구역으로 구성됩니다: 흰색/크림(밝은 섹션), 소프트 퍼플(비전 패널), 다크 플럼(선교 섹션). `globals.css`의 CSS 변수는 *로 표시합니다.

### 서피스 & 배경

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.background} | #ffffff | 기본 페이지 배경 — about 페이지, 카드, 콘텐츠 영역 |
| {colors.surface.cream} * | #fffcf8 | 메인 페이지 JOIN 섹션, JOIN 이미지 페이드 오버레이, 에러 페이지 배경 |
| {colors.surface.softPurple} | #fcf8ff | 비전 패널, 지도 오버레이, 부흥 조직도 3번 섹션 |
| {colors.surface.photoFrame} | #f2ebf6 | 비전 포토 프레임 배경, 선교 스토리 이미지 플레이스홀더 |
| {colors.surface.dark} | linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%) | 선교 스크롤 섹션 배경 |
| {colors.surface.footer} | #1f0f28 | 푸터 배경 |
| {colors.surface.darkHeader} | #241f25 at variable opacity | 메인 페이지 내비게이션(0.72) · 드롭다운(0.92) · 모바일 메뉴(0.96) |
| {colors.surface.blockquote} | #f5f0f9 | 인용문 배경; 제자 양육 라벤더 배경(카드, 탭 호버, 테이블 행) |
| {colors.surface.tableHeader} | #FAF7FF | 테이블 헤더 행 배경(예배 안내, 오시는 길) |
| {colors.surface.ctaDark} | #2a123c | CTA 버튼/카드 배경 — 다크 섹션, 제자 양육, 온라인 헌금 |
| {colors.surface.greetingDark} | #1e1035 | 인사말 페이지 다크(목사님) 섹션 |
| {colors.surface.greetingPurple} | #3f2551 | 인사말 페이지 퍼플(교역자) 섹션 |
| {colors.surface.greetingPurpleCard} | #56385E | 인사말 페이지 교역자 카드 |
| {colors.surface.revivalGradient} | bg-gradient-to-b from-[#1e1035] to-[#2f2047] | 부흥 조직도 2번 섹션 |
| {colors.surface.revivalPanel} | #190b2a | 부흥 조직도 2번 섹션 탭 콘텐츠 패널 |
| {colors.surface.revivalCard} | #594263 | 부흥 조직도 3번 섹션 소그룹 블록 |
| {colors.surface.revivalSidebar} | #fcfaff | 부흥 조직도 3번 섹션 사이드바 aside |
| {colors.surface.revivalTabContent} | #f4f0f9 | 부흥 조직도 3번 섹션 탭 콘텐츠 배경 |

### 라이트 배경 잉크

흰색, 소프트 퍼플(`#fcf8ff`), 크림(`#fffcf8`) 배경 위에서 사용하는 텍스트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.ink} | #250030 | 최우선 헤딩 |
| {colors.ink.heading2} | #33103f | 2차 헤딩, 인용문 카드 본문, 탭 제목, 테이블 상단 액센트 보더(3px) |
| {colors.ink.subtitle} | #896B91 | 섹션 서브타이틀 |
| {colors.ink.body} | #4A3B5E | 본문 텍스트 |
| {colors.ink.soft} | #6F5576 | 부드러운 본문 텍스트 |
| {colors.ink.muted} | #928397 | 약한 2차 텍스트 |
| {colors.ink.emphasis} | #BD6FE0 | 인라인 퍼플 강조(교회명, 주소) |
| {colors.ink.citation} | #510a75 | 인용문 카드 왼쪽 보더 · 성경 출처 · 링크 호버 색상 |
| {colors.ink.purple} | #8b6db5 | 퍼플 액센트 — 레이블, 메타데이터, 로드맵 뱃지, 섹션 헤딩 레이블 |

### 다크 배경 잉크

짙은 퍼플 배경(`{colors.surface.dark}`, `{colors.surface.greetingDark}` 등) 위에서 사용하는 텍스트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.dark.heading} | #FFFFFF | 헤딩 |
| {colors.dark.subtitle} | #E2CAF5 | 서브타이틀 |
| {colors.dark.label} | #FDF4FF | 섹션 레이블 |
| {colors.dark.body} | #FFFFFF | 주요 본문 텍스트 |
| {colors.dark.bodyAlt} | #FDF8FF | 부드러운 본문 텍스트 변형 |
| {colors.dark.bodyMuted} | #ffffff at 80% | 다크 배경 보조 텍스트 |
| {colors.dark.accent} | #E3BFFF | 퍼플 포인트 색상(장식 액센트, UI 요소) |

### 포인트 컬러

라이트/다크 섹션 모두에서 사용되는 골드 및 레드 액센트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.gold} | #C9A96E | 골드 — 메타데이터, 날짜, 마일스톤 레이블 |
| {colors.gold.mid} | #E4B96B | 중간 골드 — 제자 양육 페이지 액센트 |
| {colors.gold.bright} | #FFD17D | 밝은 골드 — 장식 숫자, 분기 헤더 |
| {colors.red} | #B73838 | 레드 — 특수 기간 마커(예: COVID) |

### 보더

퍼플 계열 보더가 시스템을 지배합니다. 세 가지 기본 색조의 다양한 불투명도로 모든 보더 요구를 충족합니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.border.soft} * | #3d1a46 at 12% | 전역 소프트 보더(CSS 변수) |
| {colors.border.purple} /12 | #8b6db5 at 12% | 테이블 셀·행 구분선, 비전 카드 보더, 섹션 구분선(극연함) |
| {colors.border.purple} /18 | #8b6db5 at 18% | 리스트 구분선, 일반 카드 테두리, 세로 커넥터 선 |
| {colors.border.purple} /25 | #8b6db5 at 25% | 강조 카드·컨테이너 테두리 |
| {colors.border.purple} /45 | #8b6db5 at 45% | 버튼 호버 보더(오시는 길 페이지) |
| {colors.border.purple} /60 | #8b6db5 at 60% | 타임라인 날짜 칸 세로 구분선(교회 스토리) |
| {colors.border.darkPurple} /5 | #5d3d8a at 5% | 극연한 행 구분선 |
| {colors.border.darkPurple} /15 | #5d3d8a at 15% | 탭 컨테이너, 카드, 섹션 테두리, 라이트 헤더 보더 |
| {colors.border.darkPurple} /25 | #5d3d8a at 25% | 버튼 보더 |
| {colors.border.accent} /15 | #E3BFFF at 15% | 다크 섹션 탭 보더, 미니스트리 태그 뱃지 배경 |
| {colors.border.accent} /50 | #E3BFFF at 50% | 미니스트리 태그 뱃지 보더, 테이블 행 구분선(revival) |
| {colors.border.white} /10 | #ffffff at 10% | 다크 배경 카드·입력창·헤더 보더 |
| {colors.border.white} /20 | #ffffff at 20% | 푸터 구분선, 모바일 햄버거 버튼 보더 |
| {colors.border.quote.light} | #510a75 | 인용문 카드 왼쪽 보더 — 라이트 배경 |
| {colors.border.quote.dark} | #6d5898 | 인용문 카드 왼쪽 보더 — 다크 배경(revival) |

### 인디케이터 & 포커스

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.indicator.light} | #340653 | active 도트 — 라이트 섹션 슬라이드 인디케이터 |
| {colors.indicator.light} /25 | #340653 at 25% | inactive 도트 — 라이트 섹션 |
| {colors.indicator.dark} | #c9a96e | active 도트 — 다크 섹션 슬라이드 인디케이터 |
| {colors.indicator.dark} /30 | #c9a96e at 30% | inactive 도트 — 다크 섹션 |
| {colors.focus.light} | #3d1a46 | 라이트 배경 포커스 아웃라인 |
| {colors.focus.dark} | #ffffff at 50% | 다크 배경 포커스 아웃라인 |
| {colors.focus.gold} | #c9a96e at 70% | 다크 배경 포커스 아웃라인 — 골드 액센트 |

### 푸터 & 타임라인

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.footer.social} | #2c1838 | 소셜 버튼 기본 |
| {colors.footer.socialHover} | #3a2148 | 소셜 버튼 호버 |
| {colors.footer.text} | #ffffff at 50% | 주소, 자식 nav 링크 |
| {colors.footer.textMuted} | #ffffff at 30% | TEL/EMAIL 레이블 접두사, 저작권 |
| {colors.timeline.gold} | #e4b96b | 1번 세그먼트(환영 및 교제/찬양) |
| {colors.timeline.dark} | #2a123c | 2번 세그먼트(주요 콘텐츠) |
| {colors.timeline.purple} | #8b6db5 | 3번 세그먼트(소그룹 나눔) |
| {colors.timeline.muted} | #d9d4df | 4번 세그먼트(마무리/기도) |

## 타이포그래피

### 폰트 패밀리

| 토큰 | 패밀리 | 출처 | 사용처 |
| --- | --- | --- | --- |
| {font.sans} | SUIT, sans-serif | `globals.css` CDN 임포트 | 본문, 내비게이션, 단락, UI |
| {font.serifKo} | Hahmlet, serif | `next/font/google` | 한국어 헤딩, 카드, 인용문 |
| {font.cormorant} | Cormorant, serif | `next/font/google` | 카운터 숫자 |
| {font.cormorantInfant} | Cormorant Infant, serif | `next/font/google` | 섹션 레이블, 서브타이틀, 갤러리 캡션 |
| {font.corinthia} | Corinthia, cursive | `next/font/google` | 장식용 스크립트 디스플레이 |
| {font.estonia} | Estonia, cursive | `next/font/google` | 스크립트 서브타이틀 |

### 타입 스케일

CSS 클래스는 `.type-{토큰}` 형식을 따릅니다(예: `.type-title-lg`). 헤딩 토큰은 반응형이며 나머지는 고정값입니다. label 토큰은 `text-transform: uppercase`를 포함하므로 별도 `uppercase` 클래스를 추가하지 않습니다.

| 토큰 | 역할 | 패밀리 | 크기 | 두께 | 줄 높이 | 자간 | 반응형 |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| {type.heading.xl} | 페이지 배너 타이틀 | {font.serifKo} | 40px | 600 | 1 | -0.02em | 46px ≥768px / 52px ≥1024px |
| {type.heading.lg} | 섹션 헤딩 (대) | {font.serifKo} | 36px | 600 | 1.3 | 0.01em | 42px ≥768px / 48px ≥1024px |
| {type.heading.md} | 섹션 헤딩 | {font.serifKo} | 28px | 600 | 1.25 | -0.02em | 32px ≥768px / 36px ≥1024px |
| {type.subtitle.lg} | 섹션 설명 (대) | {font.cormorantInfant} | 24px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.md} | 섹션 설명 | {font.cormorantInfant} | 20px | 400 | 1.2 | 0.08em | — |
| {type.subtitle.sm} | 섹션 설명 (소) | {font.cormorantInfant} | 16px | 400 | 1.2 | 0.08em | — |
| {type.title.xxs} | 마이크로 타이틀 / 테이블 헤더 | {font.serifKo} | 14px | 600 | 1.5 | 0.01em | — |
| {type.title.xs} | 컴포넌트 소제목 | {font.serifKo} | 16px | 600 | 1.5 | 0.01em | — |
| {type.title.sm} | 카드 제목 (소) | {font.serifKo} | 18px | 600 | 1.5 | 0.01em | — |
| {type.title.md} | 카드 제목 (중) | {font.serifKo} | 20px | 600 | 1.5 | 0.01em | — |
| {type.title.lg} | 카드 제목 (대) | {font.serifKo} | 22px | 600 | 1.5 | 0.01em | — |
| {type.title.xl} | 카드 제목 (특대) | {font.serifKo} | 24px | 600 | 1.5 | 0.01em | — |
| {type.body.lg} | 본문 (대) | {font.sans} | 20px | 400 | 1.8 | 0.01em | — |
| {type.body.md} | 본문 | {font.sans} | 18px | 400 | 1.8 | 0.01em | — |
| {type.body.sm} | 본문 (소) | {font.sans} | 16px | 400 | 1.8 | 0.01em | — |
| {type.body.xs} | 본문 (극소) | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.quote.lg} | 인용 텍스트 (대) | {font.serifKo} | 20px | 500 | 1.8 | 0.01em | — |
| {type.quote.md} | 인용 텍스트 | {font.serifKo} | 18px | 500 | 1.8 | 0.01em | — |
| {type.quote.sm} | 인용 텍스트 (소) | {font.serifKo} | 16px | 500 | 1.8 | 0.01em | — |
| {type.label.lg} | 섹션 아이브로 | {font.cormorantInfant} | 14px | 300 | 1.2 | 0.08em | — |
| {type.label.md} | 카드 레이블 | {font.cormorantInfant} | 12px | 300 | 1.2 | 0.08em | — |
| {type.label.sm} | 마이크로 레이블 | {font.cormorantInfant} | 10px | 300 | 1.2 | 0.08em | — |
| {type.caption.lg} | 캡션 (대) | {font.sans} | 18px | 400 | 1.5 | 0.01em | — |
| {type.caption.md} | 캡션 | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.counter.sm} | 카운터 숫자 (소) | {font.cormorant} | 20px | 400 | 0.75 | 0.04em | — |
| {type.counter.md} | 카운터 숫자 | {font.cormorant} | 24px | 400 | 0.75 | 0.04em | — |
| {type.counter.lg} | 카운터 숫자 (대) | {font.cormorant} | 28px | 400 | 0.75 | 0.04em | — |
| {type.scriptDisplay} | 장식용 | {font.corinthia} | 72px | 400 | 0.9 | 0.01em | 112px ≥768px |
| {type.scriptAccent} | 장식용 | {font.estonia} | 24px | 400 | 1 | 0.14em | 32px ≥768px |

### 원칙

시스템은 한국어 세리프 헤딩에 교리적·감성적 무게를 맡깁니다. Hahmlet이 전체 헤딩 스케일을 담당하며, 디스플레이 헤딩은 36–52px / 600 weight로 조용하고 경건하게 렌더링됩니다. SUIT 400으로 작성된 본문 텍스트는 긴 제자 양육 페이지에서도 편안한 가독성을 유지합니다.

시스템에서 타이포그래피적으로 가장 큰 순간은 메인 페이지 히어로의 **스크립트 디스플레이**(`{type.scriptDisplay}` — 72px/112px Corinthia)입니다. 그 외 모든 곳에서 스케일은 예측 가능하게 내려갑니다.

label 토큰(`{type.label.*}`)은 CSS 정의에 `text-transform: uppercase`를 포함합니다. label 토큰 위에 두 번째 `uppercase` 클래스를 추가하지 않습니다.

## 레이아웃

### 간격

토큰은 사용 범위에 따라 세 티어로 구분합니다. 이 목록에 없는 값은 일회성(one-off)으로 인라인 적용합니다.

Tailwind 클래스 패턴: `gap-comp-{step}` / `p{x|y}-pad-{step}` / `gap-layout-{step}` / `p{y|b}-section-{step}`

**컴포넌트 갭 (`gap-comp-*`)** — UI 요소 내부 flex/grid 간격

| 단계 | 값 | 역할 |
| --- | ---: | --- |
| 3xs | 2px | 밀집 목록 최소 간격 |
| xxs | 4px | 아이콘↔텍스트 마이크로 간격 |
| xs | 6px | 불릿 점↔텍스트 간격 |
| sm | 8px | 레이블·칩 간격, 타이틀↔설명 |

| md | 12px | 아이브로 라인·텍스트 행 간격 |
| base | 16px | 컴포넌트 기본 수직 간격 |
| lg | 20px | 카드 내부 그룹 간격, 섹션헤딩 outer |
| xl | 24px | 카드 섹션 구분 |
| xxl | 28px | 카드 내부 넓은 간격 |
| 3xl | 32px | 컴포넌트 내부 대형 간격 |
| 4xl | 36px | 컴포넌트 내부 최대 간격 |

**컴포넌트 패딩 (`p{x|y}-pad-*`)** — UI 요소 내부 패딩

| 단계 | 값 | 역할 |
| --- | ---: | --- |
| 3xs | 8px | 행 상하 패딩 (엔트리 로우) |
| xxs | 12px | 탭 사이드바 버튼 세로 패딩, 테이블 셀 가로 패딩 |
| xs | 16px | 탭 사이드바 버튼 가로 패딩 |
| sm | 20px | 소형 카드 패딩 |
| md | 24px | 기본 카드 패딩 |
| base | 28px | 카드 기본 패딩 |
| lg | 32px | 카드 패딩 (대) |
| xl | 36px | 카드 패딩 (특대) |
| xxl | 40px | 카드 패딩 (최대) |
| 3xl | 44px | 카드 패딩 (3xl) |
| 4xl | 48px | 카드 세로 패딩, 섹션 콜아웃 |

**레이아웃 (`gap-layout-*`)** — 섹션 내 컨테이너 간 간격

| 단계 | 값 | 역할 |
| --- | ---: | --- |
| xs | 2px | 구분선 마이크로 간격 |
| sm | 16px | 소형 컨테이너 간격 |
| base | 24px | 기본 컨테이너 간격 |
| md | 32px | 컨테이너 간 중간 간격 |
| lg | 48px | 섹션 헤딩 → 콘텐츠 갭 |
| xl | 60px | 주요 섹션 내부 갭 |
| xxl | 80px | 대형 섹션 그룹 갭 |

**섹션 (`p{y|b}-section-*`)** — 페이지 레벨 수직 리듬

| 단계 | 값 | 역할 |
| --- | ---: | --- |
| sm  | 60px  | 모바일 섹션 상하 패딩 |
| md  | 80px  | 태블릿 섹션 상하 패딩 |
| lg  | 100px | 데스크탑 섹션 상하 패딩 |
| xl  | 120px | 마지막 섹션 하단 여백 — 모바일 (`pb-section-xl`) |
| xxl | 160px | 마지막 섹션 하단 여백 — 태블릿 (`md:pb-section-xxl`) |
| 3xl | 200px | 마지막 섹션 하단 여백 — 데스크탑 (`lg:pb-section-3xl`) |

### 컨테이너

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {layout.shell.max.base} | 1120px | 기본 `section-shell` |
| {layout.shell.max.narrow} | 920px | about 페이지 기본 |
| {layout.shell.max.wide} | 1280px | 넓은 콘텐츠 레이아웃 |
| {layout.shell.padding.mobile} | 16px | `section-shell` 기본 인라인 패딩 |
| {layout.shell.padding.tablet} | 32px | `section-shell` ≥768px |
| {layout.shell.max.desktop} | 1200px | `section-shell` ≥1280px |
| {layout.shell.max.narrow.desktop} | 1040px | 좁은 셸 ≥1280px |
| {layout.shell.max.wide.desktop} | 1360px | 넓은 셸 ≥1280px |

### 그리드

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {grid.missionHistory.tablet} | minmax(0, 1fr) 300px | 타임라인 + 이미지 레일 ≥768px |
| {grid.missionHistory.desktop} | minmax(0, 560px) 400px | 타임라인 + 이미지 레일 ≥1024px |
| {grid.location.map.mobile} | 16 / 11 | 지도 비율 — 모바일 |
| {grid.location.map.tablet} | 16 / 8 | 지도 비율 — 태블릿 |
| {grid.location.map.desktop} | 16 / 7 | 지도 비율 — 데스크탑 |
| {grid.serviceTable.minWidth} | 860px | 예배 테이블 가로 스크롤 |
| {grid.busTable.minWidth} | 680px–760px | 버스 테이블 가로 스크롤 |
| {grid.revival.tabs.desktop} | 180px + 1fr | 사이드 탭 레일 + 콘텐츠 패널 |

### 여백 철학

전체 너비 섹션과 제한된 `section-shell` 내부 콘텐츠가 리듬을 만듭니다. About 페이지 섹션은 데스크탑에서 100px 상하 패딩(`section-lg`)을 기준으로 — 스캔하기에 충분히 촘촘하고 교리적 블록을 구분하기에 충분히 넉넉합니다.

긴 다중 섹션 페이지의 마지막 섹션 하단 여백은 반응형으로 적용합니다: 모바일 120px(`pb-section-xl`) / 태블릿 160px(`md:pb-section-xxl`) / 데스크탑 200px(`lg:pb-section-3xl`). 이를 통해 해상도별 푸터 전 시각적 여유를 적절히 확보합니다.

모바일 섹션은 상하 60px 기본 패딩(`section-sm`)으로 압축됩니다. 카드는 `pad-*` 토큰으로 수평·수직 내부 패딩을 관리하며 가독성을 유지합니다.

## 엘리베이션

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {shadow.soft} | 0 14px 40px rgba(20, 6, 26, 0.12) | 전역 서피스 카드 |
| {shadow.header.light} | 0 4px 20px rgba(0, 0, 0, 0.05) | 비홈 스티키 헤더 |
| {shadow.dropdown.dark} | 0 18px 45px rgba(0, 0, 0, 0.24) | 홈 데스크탑 드롭다운 |
| {shadow.dropdown.light} | 0 18px 45px rgba(0, 0, 0, 0.12) | 비홈 드롭다운 |
| {shadow.card.soft} | 0 8px 24px rgba(16, 33, 63, 0.06) | 모바일 테이블 카드 |
| {shadow.card.purple} | 0 12px 24px rgba(51, 16, 63, 0.14) | 헌금 칩, 지도 오버레이 |
| {shadow.revivalCard} | 0 6px 9px rgba(0, 0, 0, 0.15) | 부흥 조직도 가치 카드 |
| {blur.header} | 20px | 스티키 헤더 / 드롭다운 백드롭 |
| {blur.surfaceCard} | 8px | 반투명 전역 카드 |
| {blur.mapOverlay} | 12px | 지도 주소 패널 |
| {blur.welcomeCard} | 10px | 홈 환영 글래스 패널 |

시스템은 사실상 **두 가지 엘리베이션 티어**와 플랫으로 구성됩니다:
- **플랫:** 에디토리얼 밴드, 본문 섹션, 푸터 — 대부분의 서피스.
- **Raised:** 호버 시 카드, 드롭다운, 메뉴 — soft/purple 그림자 토큰 사용.
- **오버레이:** 모달형 패널(지도 주소, 모바일 메뉴) — 블러 + 강한 그림자 + 스크림.

깊이 원칙:
- 블러는 반투명 서피스에서만 사용합니다.
- 오버레이와 메뉴에 강한 그림자를 사용하고, 페이지 섹션에는 사용하지 않습니다.
- 다크 섹션은 무거운 그림자 전에 그라디언트와 불투명도 레이어로 깊이를 표현합니다.

## 형태

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {radius.none} | 0px | 테이블 행, 에디토리얼 레일, 정사각 이미지 그리드 |
| {radius.xs} | 4px | 지도 버튼, 지도 주소 오버레이, 소형 컨트롤 |
| {radius.sm} | 6px | 헌금 칩, 폼 컨트롤 |
| {radius.md} | 8px | 표준 카드, 섹션 콜아웃 |
| {radius.lg} | 12px | 홈 빠른 링크 아이콘 카드 |
| {radius.xl} | 16px | 대형 미디어 카드 |
| {radius.full} | 9999px | 로고 프레임, 점, 소셜 버튼 |

형태 원칙:
- 카드는 `{radius.md}` 이하를 사용합니다 — 둥근 필 형태 없음.
- 에디토리얼 다크 패널은 `{radius.none}` 또는 `{radius.xs}`를 선호합니다.
- 원형 형태는 로고, 점, 소셜 버튼, 타임라인 마커에 한합니다.

## 컴포넌트

### 사이트 헤더

**`site-header`** — 고정 상단 바. 메인 페이지에서는 투명한 다크 스크림(`{colors.surface.darkHeader}` at 0.72 opacity, 20px blur)으로 렌더링되고, 다른 모든 페이지에서는 소프트 화이트 서피스와 가벼운 그림자를 사용합니다. 높이 오프셋은 82px — 모든 앵커 섹션의 `scroll-mt`로 사용됩니다. 로고는 50px 원형 프레임 안에 36px 브랜드 이미지가 들어가고, 교회명은 20px / 0.3em tracking으로 표시됩니다.

데스크탑 내비게이션 항목은 `{type.nav.md}`에 0.2em tracking, 16×18px 패딩을 사용합니다. 드롭다운은 호버 시 `{shadow.dropdown}`과 함께 나타납니다. 모바일에서는 최소 터치 타깃인 44px 햄버거 버튼으로 모든 것을 접습니다.

### 페이지 헤더

**`page-header`** — 모든 정적 서브 페이지의 비주얼 리드로 사용되는 그라디언트 배너입니다. 그라디언트: `{component.pageHeader.gradient}`. 높이: 260px 모바일 → 360px 태블릿 → 320px 데스크탑. 제목은 `{type.heading.xl}`(반응형 40→46→52px), 서브타이틀은 12px / 0.16em tracking 레이블을 사용합니다.

### 섹션 헤딩

**`section-heading`** — 모든 주요 페이지 섹션 상단에 사용하는 공통 헤딩 블록입니다. 구성: 대문자 아이브로 레이블(`{type.label.lg}`) + 30px×1px 구분선, 섹션 제목(`{type.heading.lg}` 또는 `{type.heading.md}`), 선택적 이탤릭 설명(`{type.subtitle.md}`). 최대 너비 468px로 제한해 헤딩 줄을 간결하게 유지합니다.

### 버튼

**`button-primary`** — 짙은 플럼 배경(`{colors.surface.ctaDark}`), 흰색 텍스트, 8px 라운드, `{type.button.md}`. 라이트 및 소프트 퍼플 섹션의 강한 CTA에 사용됩니다.

**`button-map`** — 4px 라운드 외부 링크 버튼(오시는 길 페이지). 보더 기반, 잉크 텍스트.

모든 모바일 컨트롤의 터치 타깃은 최소 44px(`{component.button.touchTarget.min}`)입니다. 슬라이더 컨트롤(선교 갤러리)은 48px 원형 버튼, 부흥 조직도 모바일 컨트롤은 32px 정사각형 버튼을 사용합니다.

### 카드

**`card-standard`** — 화이트 서피스, `{radius.md}`(8px), 1px `{colors.border.darkPurple}/15` 보더, 모바일 20px 내부 패딩. 예배 안내 및 버스 노선 콘텐츠의 모바일 카드로 사용됩니다.

**`card-quote`** — 라벤더 서피스(`{colors.surface.blockquote}`), 3px 왼쪽 보더(`{colors.border.quote.light}`), 모바일 24×28px 패딩. 성경 인용문과 제자 양육 콜아웃 블록에 사용됩니다.

**`card-dark`** — 짙은 플럼 서피스(`{colors.surface.ctaDark}`), 모바일 32×20px / 데스크탑 40px 패딩. 부흥 조직도 다크 섹션과 제자 양육 페이지에 사용됩니다.

### 테이블

**`table-desktop`** — 예배 안내, 버스 노선, 오시는 길 정보에 사용됩니다. 3px 상단 액센트 보더(`{colors.ink.heading2}`), 헤더 행(`{colors.surface.tableHeader}`), 셀 패딩 20×24px. 최소 너비 적용(예배 테이블 860px, 버스 테이블 680–760px) 및 가로 스크롤 래퍼.

**`table-mobile`** — 768px 미만에서 테이블이 스택 카드 레이아웃으로 전환됩니다. 각 행이 `{component.card.standard}`이 되며 16×20px 내부 패딩과 `{shadow.card.soft}` 적용.

### 선교 갤러리

**`mission-gallery-mobile`** — 32svh 높이의 전체 너비 이미지 슬라이더, 64px 캡션 바. 트랜지션: transform 460ms ease-out. 768px 미만에서만 표시됩니다.

**`mission-gallery-rail`** — 768px 이상에서 보이는 스티키 오른쪽 컬럼 이미지 레이아웃. 레일 너비: 태블릿 300px / 데스크탑 400px. 상단 120px에서 스티키 고정, 전체 높이 880px. 메인 이미지: 태블릿 420px / 데스크탑 600px; 세부 이미지 2장: 태블릿 160px / 데스크탑 240px.

### 푸터

**`footer`** — 짙은 플럼 서피스(`{colors.surface.footer}` — #1f0f28), 패딩 40×20px 모바일 / 40px 태블릿 / 60×80px 데스크탑. 교회명 28px / 1.25 줄 높이. 소셜 버튼은 40px 원형, `{colors.footer.social}`, `{radius.full}` 적용. 주소·링크는 `{colors.footer.text}`(흰색 50%), 저작권은 `{colors.footer.textMuted}`(흰색 30%).

## 반응형

### 브레이크포인트

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {breakpoint.tablet} | 768px | 태블릿 레이아웃, 셸 패딩 32px |
| {breakpoint.desktop} | 1024px | 데스크탑 타이포그래피, 더 큰 그리드 |
| {breakpoint.largeDesktop} | 1280px | 셸 확장, 홈 스크롤 씬 |
| {breakpoint.wide} | 1300px | 홈 데스크탑 스크롤 인터랙션 |
| {breakpoint.xl} | 1536px | 가장 넓은 셸 너비 |

### 반응형 전략

| 패턴 | 모바일 | 태블릿 이상 |
| --- | --- | --- |
| 내비게이션 | 햄버거(1024px 미만) | 수평 드롭다운 내비게이션 |
| 선교 역사 | 헤딩 → 모바일 슬라이더 → 타임라인 | 타임라인 좌측 + 스티키 이미지 레일 우측 |
| 예배 안내 | 스택 카드 | 가로 스크롤 테이블 |
| 버스 노선 | 스택 노선 카드 | 가로 스크롤 테이블 |
| 부흥 조직도 | 스와이프 탭 패널 | 사이드 탭 레일 + 콘텐츠 패널 |
| 섹션 패딩 | 상하 60px 기본 / 마지막 하단 120px | 상단 80–100px / 마지막 하단 160–200px |
| 셸 패딩 | 16px | 32px |

모바일 원칙:
- `{breakpoint.tablet}` 미만에서는 테이블 대신 카드를 사용합니다.
- 수평 서브메뉴는 스크롤 가능하게 하고 활성 탭 가시성을 유지합니다.
- 터치 타깃은 44px 이상을 유지합니다.

태블릿 원칙:
- 768–1023px 구간은 선교 역사 이미지 레일에 대해 구조적 데스크탑으로 처리합니다.
- `{breakpoint.desktop}`까지 내비게이션을 접힌 상태로 유지합니다.
- 680px 이상의 전체 너비 텍스트 블록을 피합니다.

데스크탑 원칙:
- 스티키/스크롤 기반 시각 시스템은 충분한 뷰포트 너비가 있을 때만 사용합니다.
- 콘텐츠 + 비주얼 레일의 2단 정보 구조를 선호합니다.

## 알려진 미완성 사항

- {gap.colorAudit} — 많은 색상 값이 CSS 변수나 Tailwind 토큰 대신 인라인 임의 값(예: `text-[#3d1a46]`)으로 남아 있습니다. 색상 섹션이 의도된 통합 팔레트를 정의하지만 코드 마이그레이션은 미완성입니다.
- {gap.tailwindTokens} — `tailwind.config.ts`에 실제 브랜드를 반영하지 않는 구식 초록/파랑 토큰(`forest`, `sage`, `cedar`, `themeBlue`)이 남아 있습니다. 참조 파일: `site-header.tsx`, `error-page.tsx`, `public-board-renderer.tsx`.
- {gap.componentLibrary} — 버튼, 카드, 테이블, 탭이 공유 컴포넌트 API 대신 페이지별로 구현되어 있습니다.
- {gap.motionTokens} — 트랜지션 지속 시간·이징이 인라인에 내장되어 있으며, 300ms·460ms·500ms 공통 값만 관찰 가능합니다.
- {gap.accessibilityAudit} — 색상 대비, 키보드 포커스, 스크린 리더 동작은 철저히 감사되지 않았습니다.
- {gap.adminEditorScope} — 관리자/Tiptap 에디터 타이포그래피는 이 문서에서 다루지 않습니다. 공개 사이트에 집중합니다.
