# 행복이 가득한 시온교회 디자인 시스템

범위: 이 문서는 구현된 메인 페이지와 완성된 `about` 정적 페이지(담임 목사 인사말, 교회 스토리, 부흥 조직도, 예배 안내, 오시는 길, 선교 역사, 온라인 헌금)를 기준으로 작성되었습니다.

## 1. 개요

행복이 가득한 시온교회는 에디토리얼 교회 사이트 비주얼 언어를 사용합니다. 조용한 아이보리 서피스, 깊은 플럼 필드, 골드 액센트 타이포그래피, 한국어 세리프 헤딩, 이미지 중심의 선교 스토리텔링으로 구성됩니다. 핵심 브랜드 감성은 경건함, 따뜻함, 구조적 명확성, 사역 중심입니다.

주요 특성:

- {brand.tone} -- 경건한 / 에디토리얼 / 선교 지향 / 따뜻한
- {brand.structure} -- 전체 너비 페이지 밴드 + 제한된 내부 셸
- {brand.visualWeight} -- 대형 한국어 세리프 헤딩, 얇은 대문자 레이블, 넉넉한 수직 리듬
- {brand.primaryInteraction} -- 스크롤 중심 스토리 섹션, 탭형 사역 패널, 반응형 카드/테이블 전환
- {brand.imageUsage} -- 실제 교회/선교 이미지, 풀 블리드 비디오 히어로, 데스크탑 스티키 갤러리 레일, 모바일 컴팩트 슬라이더

## 2. 색상

색상은 메인 페이지의 세 가지 배경 구역으로 구성됩니다: 크림(밝은 섹션), 소프트 퍼플(비전 섹션), 다크(선교 섹션). `globals.css`의 CSS 변수는 *로 표시합니다.

### 서피스 및 배경

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.background} | #ffffff | 기본 페이지 배경 (about 페이지, 카드, 콘텐츠 영역) |
| {colors.surface.cream} * | #fffcf8 | 메인 페이지 JOIN 섹션, JOIN 이미지 페이드 오버레이, 에러 페이지 배경 |
| {colors.surface.softPurple} | #fcf8ff | 소프트 퍼플 섹션/패널 배경 (메인 비전, 인사말 페이지, 지도 오버레이, 부흥 조직도 3번 섹션) |
| {colors.surface.photoFrame} | #f2ebf6 | 비전 포토 프레임 배경 (데스크탑 & 모바일), 선교 스토리 이미지 플레이스홀더 |
| {colors.surface.dark} | linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%) | 선교 스크롤 섹션 배경 |
| {colors.surface.footer} | #1f0f28 | 푸터 배경 |
| {colors.surface.darkHeader} | #241f25 at variable opacity | 메인 페이지 내비게이션 바(var:0.72) / 드롭다운(var:0.92) / 모바일 메뉴 패널(var:0.96) |
| {colors.surface.blockquote} | #f5f0f9 | 인용문 배경; 제자 양육 라벤더 배경 (카드, 탭 호버, 테이블 행, 훈련 과정 홀수 행) |
| {colors.surface.tableHeader} | #FAF7FF | 테이블 헤더 행 배경 (예배 안내, 오시는 길) |
| {colors.surface.ctaDark} | #2a123c | CTA 버튼/카드 배경 (다크 섹션, 제자 양육 페이지, 온라인 헌금, 인사말 비전 카드) |
| {colors.surface.greetingDark} | #1e1035 | 인사말 페이지 다크(목사님) 섹션 배경 |
| {colors.surface.greetingPurple} | #3f2551 | 인사말 페이지 퍼플(교역자) 섹션 배경 |
| {colors.surface.greetingPurpleCard} | #56385E | 인사말 페이지 교역자 카드 배경 |
| {colors.surface.greetingMosaicMid} | #9A8CA7 | 인사말 페이지 모자이크 그리드 필러 (중간 톤) |
| {colors.surface.greetingMosaicLight} | #D2C5DB | 인사말 페이지 모자이크 그리드 필러 (밝은 톤) |
| {colors.surface.revivalGradient} | bg-gradient-to-b from-[#1e1035] to-[#2f2047] | 부흥 조직도 2번 섹션 배경 |
| {colors.surface.revivalPanel} | #190b2a | 부흥 조직도 2번 섹션 탭 콘텐츠 패널 배경 |
| {colors.surface.revivalInfoPanel} | #1a1028 | 부흥 조직도 2번 섹션 인원 정보 패널 배경 |
| {colors.surface.revivalRowHeader} | #341a44 | 부흥 조직도 3번 섹션 로드맵 분기 헤더 행 배경 |
| {colors.surface.revivalCard} | #594263 | 부흥 조직도 3번 섹션 소그룹 섹션 블록 배경 |
| {colors.surface.revivalSidebar} | #fcfaff | 부흥 조직도 3번 섹션 사이드바 aside 배경 |
| {colors.surface.revivalTabContent} | #f4f0f9 | 부흥 조직도 3번 섹션 탭 콘텐츠 배경 (활성 탭 포함) |

### 라이트 배경 텍스트 색상 (잉크)

라이트 배경(흰색, 소프트 퍼플 `#fcf8ff`, 크림 `#fffcf8`) 위에서 사용하는 텍스트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.ink} | #250030 | 최우선 헤딩 (강조도 최고) |
| {colors.ink.heading2} | #33103f | 2차 헤딩, 인용문 카드 본문, 탭 제목, 테이블 상단 액센트 보더 (3px) |
| {colors.ink.subtitle} | #896B91 | 섹션 서브타이틀 |
| {colors.ink.body} | #4A3B5E | 본문 텍스트 |
| {colors.ink.soft} | #6F5576 | 부드러운 본문 텍스트 |
| {colors.ink.muted} | #928397 | 약한 2차 텍스트 |
| {colors.ink.emphasis} | #BD6FE0 | 인라인 퍼플 강조 (교회명, 주소 등) |
| {colors.ink.citation} | #510a75 | 인용문 카드 왼쪽 보더 + 성경 출처 텍스트, 링크 hover 색상 |
| {colors.ink.purple} | #8b6db5 | 퍼플 액센트 텍스트 — 라벨, 메타데이터, 로드맵 뱃지, 섹션 헤딩 라벨 |

### 다크 배경 텍스트 색상 (잉크)

짙은 퍼플 배경(`{colors.surface.dark}`, `{colors.surface.greetingDark}`, `{colors.surface.greetingPurple}` 등) 위에서 사용하는 텍스트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.dark.heading} | #FFFFFF | 헤딩 |
| {colors.dark.subtitle} | #E2CAF5 | 서브타이틀 |
| {colors.dark.label} | #FDF4FF | 섹션 레이블 |
| {colors.dark.body} | #FFFFFF | 주요 본문 텍스트 |
| {colors.dark.bodyAlt} | #FDF8FF | 부드러운 본문 텍스트 변형 |
| {colors.dark.bodyMuted} | #ffffff at 80% | 다크 배경 보조 텍스트 (폼 라벨, revival 보조 설명, 네비 링크 등) |
| {colors.dark.accent} | #E3BFFF | 퍼플 포인트 색상 (장식 액센트, UI 요소) |

### 크림 배경

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.cream.heading} | #000000 | 크림 배경 위 헤딩 |
| {colors.cream.body} | #3C2348 | 크림 배경 위 본문 |

### 섹션 레이블

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.label.section23} | #5B3B63 | 메인 페이지 2·3번 섹션 레이블 (소프트 퍼플 배경) |
| {colors.label.section45} | #FDF4FF | 메인 페이지 4·5번 섹션 레이블 (다크 배경) |
| {colors.label.join} | #3D1A46 | 메인 페이지 JOIN 섹션 레이블 텍스트 + 레이블 아래 구분선 |
| {colors.label.purple} | #8B6DB5 | 퍼플 레이블 (서브 페이지 공통 헤더) |

### 액센트 / 디스플레이

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.accent.visionLabel} | #691393 at 40% | 메인 페이지 비전 카드 영문 아이브로우 레이블 |
| {colors.accent.visionNumber} | #691393 at 8% | 메인 페이지 비전 카드 숫자 디스플레이 |
| {colors.accent.quoteDisplay} | #4d1367 at 10% | 인용문 카드 장식용 따옴표 |

### 포인트 컬러

라이트/다크 섹션 모두에서 사용되는 골드 및 레드 액센트 색상입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.point.gold} | #C9A96E | 골드 — 메타데이터, 날짜, 마일스톤 레이블 |
| {colors.point.goldMid} | #E4B96B | 중간 골드 — 제자 양육 페이지 액센트 |
| {colors.point.goldBright} | #FFD17D | 밝은 골드 — 장식 숫자, 분기 헤더 |
| {colors.point.red} | #B73838 | 레드 — 특수 기간 마커 (예: COVID) |

### 아이콘

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.icon} | #6B4A75 | 아이콘 색상 |
| {colors.icon.circle} | #DCCEE4 | 아이콘 뒤 장식 원형 (메인 페이지 2번 섹션 좌하단) |

### 보더

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.border.soft} * | #3d1a46 at 12% | 전역 소프트 보더 (CSS 변수) |
| {colors.border.link} | #331440 at 10% | 빠른 링크 카드 보더 |

<!-- #ffffff — 화이트 보더 (다크 배경) -->
| {colors.border.white} /5 | #ffffff at 5% | 장식 원형 테두리 (page-header), 다크 탭 보더 |
| {colors.border.white} /10 | #ffffff at 10% | 다크 배경 카드·입력창·헤더 보더 |
| {colors.border.white} /20 | #ffffff at 20% | 푸터 구분선, 메인 페이지 헤더 모바일 햄버거 버튼 보더 |
| {colors.border.white} /30 | #ffffff at 30% | 글래스 카드 보더 (웰컴 섹션) |
| {colors.border.white} /70 | #ffffff at 70% | 지도 주소 패널 보더, 슬라이더 버튼 보더 |

<!-- 인용문 블록 왼쪽 굵은선 (3px) -->
| {colors.border.quoteLight} | #510a75 | 인용문 카드 왼쪽 보더 — 라이트 배경 (라벤더 블록쿼트) |
| {colors.border.quoteDark} | #6d5898 | 인용문 카드 왼쪽 보더 — 다크 배경 (부흥 조직도 2번 섹션) |
| {colors.border.quoteJoin} | #2a123c | 인용문 블록 왼쪽 보더 — 홈 JOIN 섹션 |

<!-- #8b6db5 — 연한 퍼플 보더 -->
| {colors.border.purple} /12 | #8b6db5 at 12% | 테이블 셀·행 구분선, 비전 카드 보더, 섹션 구분선, 핵심가치 리스트 구분선 (극연함) |
| {colors.border.purple} /18 | #8b6db5 at 18% | 리스트 구분선, 일반 카드 테두리, 세로 커넥터 선 (로드맵·FAQ 타임라인) |
| {colors.border.purple} /25 | #8b6db5 at 25% | 강조 카드·컨테이너 테두리, 로드맵 월 카드 보더 (부흥 조직도) |
| {colors.border.purple} /45 | #8b6db5 at 45% | 버튼 hover 보더 (오시는 길 페이지) |
| {colors.border.purple} /60 | #8b6db5 at 60% | 타임라인 날짜 칸 세로 구분선 (교회 역사 페이지) |

<!-- #5d3d8a — 짙은 퍼플 보더 -->
| {colors.border.darkPurple} /5 | #5d3d8a at 5% | 극연한 행 구분선 |
| {colors.border.darkPurple} /15 | #5d3d8a at 15% | 탭 컨테이너, 카드, 섹션 테두리, 테이블 외곽 컨테이너 보더, 라이트 헤더 보더 |
| {colors.border.darkPurple} /25 | #5d3d8a at 25% | 버튼 보더 |

<!-- #e3bfff — 라이트 액센트 보더 (다크 배경) -->
| {colors.border.accent} /15 | #E3BFFF at 15% | 다크 섹션 탭 보더, 미니스트리 태그 뱃지 배경 (revival) |
| {colors.border.accent} /50 | #E3BFFF at 50% | 미니스트리 태그 뱃지 보더, 테이블 행 구분선 (revival) |


### 인디케이터 도트

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.indicator.light} | #340653 | active 도트 — 라이트 섹션 슬라이드 인디케이터 (revival) |
| {colors.indicator.light} /25 | #340653 at 25% | inactive 도트 — 라이트 섹션 슬라이드 인디케이터 (revival) |
| {colors.indicator.dark} | #c9a96e | active 도트 — 다크 섹션 슬라이드 인디케이터 (revival) |
| {colors.indicator.dark} /30 | #c9a96e at 30% | inactive 도트 — 다크 섹션 슬라이드 인디케이터 (revival) |

### 포커스 아웃라인

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.focus.light} | var(--color-plum) = #3d1a46 | 라이트 배경 포커스 아웃라인 (헤더, revival 탭, 에러 페이지 버튼) |
| {colors.focus.dark} | #ffffff at 50% | 다크 배경 포커스 아웃라인 (헤더 다크 모드, 슬라이더 버튼) |
| {colors.focus.gold} | #c9a96e at 70% | 다크 배경 포커스 아웃라인 — 골드 액센트 (revival 다크 탭 버튼) |

### 글래스 오버레이 (환영 섹션)

명명된 토큰 없이 컨텍스트별 불투명도 인라인 값으로 표현합니다.

| 요소 | 값 |
| --- | --- |
| 클라우드 이미지 워시 | #ffffff at 20% |
| 말씀 카드 배경 | #ffffff at 42% |
| 빠른 링크 카드 배경 | #ffffff at 80% |
| 지도 주소 패널 배경 | #ffffff at 88% |

### 푸터

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.footer.social} | #2c1838 | 소셜 버튼 기본 |
| {colors.footer.socialHover} | #3a2148 | 소셜 버튼 호버 |
| {colors.footer.text} | #ffffff at 50% | 주소, 전화번호, 이메일, 자식 nav 링크 |
| {colors.footer.textMuted} | #ffffff at 30% | TEL/EMAIL 레이블 접두사, 저작권 텍스트 |

### 타임라인 바

제자 양육 페이지(훈련, 새가족 양육)에서 수업 구조 비중을 시각화하는 4단 비율 바입니다.

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {colors.timeline.gold} | #e4b96b | 첫 번째 세그먼트 (환영 및 교제 / 찬양) |
| {colors.timeline.dark} | #2a123c | 두 번째 세그먼트 (주요 콘텐츠) |
| {colors.timeline.purple} | #8b6db5 | 세 번째 세그먼트 (소그룹 나눔) |
| {colors.timeline.muted} | #d9d4df | 네 번째 세그먼트 (마무리 / 기도) |

## 3. 타이포그래피

### 폰트 패밀리

| 토큰 | 패밀리 | 출처 | 사용처 |
| --- | --- | --- | --- |
| {font.sans} | SUIT, sans-serif | `globals.css` CDN 임포트 | 본문, 내비게이션, 단락, UI |
| {font.serifKo} | Hahmlet, serif | `next/font/google` | 한국어 헤딩, 카드, 인용문 |
| {font.cormorant} | Cormorant, serif | `next/font/google` | 선택적 세리프 액센트 |
| {font.cormorantGaramond} | Cormorant Garamond, serif | `next/font/google` | 영문 레이블, 카운터, 사역 번호 |
| {font.cormorantInfant} | Cormorant Infant, serif | `next/font/google` | 섹션 레이블, 서브타이틀, 갤러리 캡션 |
| {font.corinthia} | Corinthia, cursive | `next/font/google` | 장식용 카운터 |
| {font.estonia} | Estonia, cursive | `next/font/google` | 스크립트 서브타이틀 |

### 전역 타입 스케일

스케일 기반 네이밍 (xl / lg / md / sm / xs). 헤딩 토큰은 반응형이며 나머지는 고정값입니다. CSS 클래스는 `.type-{토큰}` 형식 (예: `.type-heading-xl`). nav 활성 상태는 컴포넌트 레벨에서 `font-weight: 700` 오버라이드. 장식용 토큰(script-display, display-counter, script-accent)은 인라인 전용으로 스케일에 포함하지 않습니다.

| 토큰 | 역할 | 패밀리 | 크기 | 두께 | 줄 높이 | 자간 | 반응형 |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- |
| {type.heading.xl} | 페이지 배너 타이틀 | {font.serifKo} | 40px | 600 | 1 | -0.02em | 46px ≥768px / 52px ≥1024px |
| {type.heading.md} | 섹션 헤딩 | {font.serifKo} | 28px | 600 | 1.25 | -0.02em | 32px ≥768px / 36px ≥1024px |
| {type.subtitle.sm} | 섹션 설명 | {font.sans} | 16px | 400 | 1.2 | 0.02em | — |
| {type.title.xs} | 컴포넌트 소제목 | {font.serifKo} | 16px | 600 | 1.5 | 0.01em | — |
| {type.title.sm} | 카드 제목 (소) | {font.serifKo} | 18px | 600 | 1.75 | 0.01em | — |
| {type.title.md} | 카드 제목 (중) | {font.serifKo} | 20px | 600 | 1.75 | 0.01em | — |
| {type.title.lg} | 카드 제목 (대) | {font.serifKo} | 22px | 600 | 1.85 | 0.01em | — |
| {type.title.xl} | 카드 제목 (특대) | {font.serifKo} | 24px | 600 | 1.35 | 0.01em | — |
| {type.body.md} | 본문 | {font.sans} | 18px | 400 | 1.8 | 0.01em | — |
| {type.body.sm} | 본문 (소) | {font.sans} | 16px | 400 | 1.8 | 0.01em | — |
| {type.body.xs} | 본문 (극소) | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.quote.md} | 인용 텍스트 | {font.sans} | 18px | 500 | 1.8 | 0.01em | — |
| {type.quote.xs} | 인용 텍스트 (소) | {font.sans} | 14px | 500 | 1.75 | 0.01em | — |
| {type.label.xl} | 인물명 / 대형 레이블 | {font.sans} | 16px | 300 | 1.2 | 0.18em | — |
| {type.label.lg} | 섹션 아이브로 | {font.sans} | 14px | 300 | 1.2 | 0.18em | — |
| {type.label.md} | 카드 레이블 | {font.sans} | 12px | 300 | 1.2 | 0.18em | — |
| {type.label.sm} | 마이크로 레이블 | {font.sans} | 10px | 300 | 1.2 | 0.18em | — |
| {type.nav.md} | 내비게이션 / 브레드크럼 | {font.sans} | 16px | 500 | 1 | 0.01em | — |
| {type.caption.lg} | 캡션 (대) | {font.sans} | 18px | 400 | 1.5 | 0.01em | — |
| {type.caption.md} | 캡션 | {font.sans} | 14px | 400 | 1.5 | 0.01em | — |
| {type.button.md} | 버튼 레이블 | {font.sans} | 16px | 600 | 1.75 | 0.01em | — |
| {type.counter.md} | 통계 카운터 | {font.sans} | 24px | 400 | 0.75 | 0.04em | — |
| {type.scriptDisplay} | 장식용 | {font.corinthia} | 72px | 400 | 0.9 | 0.01em | 112px ≥768px |
| {type.displayCounter} | 장식용 | {font.corinthia} | 56px | 400 | 1 | 0.01em | — |
| {type.scriptAccent} | 장식용 | {font.estonia} | 24px | 400 | 1 | 0.14em | 32px ≥768px |

## 4. 레이아웃

### 간격 토큰

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {spacing.0} | 0px | 촘촘한 모자이크/그리드 이음새 |
| {spacing.0_5} | 2px | 이미지/그리드 거터 |
| {spacing.1} | 4px | 마이크로 간격 |
| {spacing.1_5} | 6px | 컴팩트 인디케이터 |
| {spacing.2} | 8px | 레이블/제목 마이크로 간격 |
| {spacing.3} | 12px | 소형 간격, 구분선 |
| {spacing.4} | 16px | 기본 모바일 수평 리듬 |
| {spacing.5} | 20px | 모바일 섹션/카드 패딩 |
| {spacing.6} | 24px | 카드 패딩, 행 간격 |
| {spacing.7} | 28px | 인용문/카드 내부 패딩 |
| {spacing.8} | 32px | 데스크탑 셸 패딩 |
| {spacing.10} | 40px | 섹션/카드 간격 |
| {spacing.12} | 48px | 섹션 헤더 ~ 콘텐츠 간격 |
| {spacing.14} | 56px | 선교 그리드 간격 |
| {spacing.15} | 60px | 주요 섹션 내부 간격 |
| {spacing.16} | 64px | 중형 섹션 수직 간격 |
| {spacing.20} | 80px | 대형 섹션 그룹 간격 |
| {spacing.24} | 96px | 홈 선교 모바일 간격 |
| {spacing.25} | 100px | 데스크탑 섹션 상단/간격 |
| {spacing.32} | 128px | 목사님 섹션 수직 패딩 |
| {spacing.36} | 144px | 대형 히어로 섹션 패딩 |
| {spacing.45} | 180px | 데스크탑 CTA 수직 패딩 |
| {spacing.50} | 200px | 주요 데스크탑 하단 패딩 |

### 컨테이너 토큰

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {layout.shell.max.base} | 1120px | 기본 `section-shell` |
| {layout.shell.max.narrow.base} | 920px | about 페이지 기본 |
| {layout.shell.max.wide.base} | 1280px | 넓은 콘텐츠 레이아웃 |
| {layout.shell.padding.mobile} | 16px | `section-shell` 기본 인라인 패딩 |
| {layout.shell.padding.tablet} | 32px | `section-shell` >=768px |
| {layout.shell.max.desktop} | 1200px | `section-shell` >=1280px |
| {layout.shell.max.narrow.desktop} | 1040px | 좁은 셸 >=1280px |
| {layout.shell.max.wide.desktop} | 1360px | 넓은 셸 >=1280px |
| {layout.shell.max.xl} | 1400px | 셸 >=1536px |
| {layout.shell.max.wide.xl} | 1480px | 넓은 셸 >=1536px |

### 그리드 토큰

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {grid.missionHistory.tablet} | minmax(0, 1fr) 300px | 타임라인 + 이미지 레일 >=768px |
| {grid.missionHistory.desktop} | minmax(0, 560px) 400px | 타임라인 + 이미지 레일 >=1024px |
| {grid.location.map.mobile} | aspect-ratio 16 / 11 | 모바일 지도 |
| {grid.location.map.tablet} | aspect-ratio 16 / 8 | 태블릿 지도 |
| {grid.location.map.desktop} | aspect-ratio 16 / 7 | 데스크탑 지도 |
| {grid.serviceTable.minWidth} | 860px | 예배 테이블 스크롤 너비 |
| {grid.busTable.minWidth.tablet} | 680px | 버스 테이블 스크롤 너비 |
| {grid.busTable.minWidth.desktop} | 760px | 버스 테이블 스크롤 너비 |
| {grid.revival.tabs.desktop} | 180px + 1fr | 사이드 탭 + 콘텐츠 패널 |

레이아웃 원칙:

- 전체 너비 섹션 + 제한된 `section-shell` 내부 콘텐츠를 사용합니다.
- 모바일에서는 수직 스택, 태블릿 이상에서는 2단 레이아웃을 선호합니다.
- 모바일 카드는 수평 20px, 수직 20px 패딩으로 가독성을 확보합니다.
- about 페이지에서 섹션 헤더와 주요 콘텐츠 사이의 기본 간격은 60px입니다.
- 주요 데스크탑 about 섹션은 여유로운 하단 여백을 위해 200px 하단 패딩을 사용합니다.

## 5. 엘리베이션 & 깊이

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {shadow.soft} | 0 14px 40px rgba(20, 6, 26, 0.12) | 전역 서피스 카드 |
| {shadow.header.light} | 0 4px 20px rgba(0, 0, 0, 0.05) | 비홈 스티키 헤더 |
| {shadow.dropdown.dark} | 0 18px 45px rgba(0, 0, 0, 0.24) | 홈 데스크탑 드롭다운 |
| {shadow.dropdown.light} | 0 18px 45px rgba(0, 0, 0, 0.12) | 비홈 드롭다운 |
| {shadow.mobileMenu.dark} | 0 18px 45px rgba(0, 0, 0, 0.28) | 홈 모바일 메뉴 |
| {shadow.card.soft} | 0 8px 24px rgba(16, 33, 63, 0.06) | 모바일 테이블 카드 |
| {shadow.card.purple} | 0 12px 24px rgba(51, 16, 63, 0.14) | 헌금 칩/지도 오버레이 |
| {shadow.mapOverlay} | 0 12px 28px rgba(51, 16, 63, 0.14) | 지도 주소 패널 |
| {shadow.revivalCard} | 0 6px 9px rgba(0, 0, 0, 0.15) | 부흥 조직도 가치 카드 |
| {blur.header} | 20px | 스티키 헤더/드롭다운 백드롭 |
| {blur.surfaceCard} | 8px | 반투명 전역 카드 |
| {blur.mapOverlay} | 12px | 지도 주소 패널 |
| {blur.welcomeCard} | 10px | 홈 환영 글래스 패널 |

깊이 원칙:

- 블러는 반투명 서피스에서만 사용합니다.
- 오버레이와 메뉴에 강한 그림자를 사용하고, 페이지 섹션에는 사용하지 않습니다.
- 다크 섹션은 무거운 그림자 전에 그라디언트와 불투명도 레이어로 깊이를 표현합니다.

## 6. 형태

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

- 카드는 일반적으로 {radius.md} 이하를 사용합니다.
- 에디토리얼 다크 패널은 {radius.none} 또는 {radius.xs}를 사용할 수 있습니다.
- 원형 형태는 로고, 점, 소셜 버튼, 타임라인 마커에 한합니다.

## 7. 컴포넌트

### 사이트 헤더

| 토큰 | 값 |
| --- | --- |
| {component.header.position} | fixed top 0 |
| {component.header.heightOffset} | 82px |
| {component.header.padding.mobile} | 16px 16px |
| {component.header.padding.tablet} | 16px 32px |
| {component.header.padding.desktop} | 16px 60px |
| {component.header.logoIcon} | 50px 컨테이너 / 36px 이미지 |
| {component.header.logoText.size.mobile} | 14px |
| {component.header.logoText.size.desktop} | 20px |
| {component.header.logoText.tracking} | 0.3em |
| {component.header.desktopNav.padding} | 16px 18px |
| {component.header.desktopNav.tracking} | 0.2em |
| {component.header.mobileButton.size} | 44px |
| {component.header.mobileMenu.maxHeight} | calc(100svh - 82px) |

### 페이지 헤더

| 토큰 | 값 |
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

### 섹션 헤딩

| 토큰 | 값 |
| --- | --- |
| {component.sectionHeading.maxWidth} | 468px |
| {component.sectionHeading.rule.width} | 30px |
| {component.sectionHeading.rule.height} | 1px |
| {component.sectionHeading.rule.marginTop} | 8px |
| {component.sectionHeading.eyebrow.gap} | 12px |
| {component.sectionHeading.title.marginTop} | 20px |
| {component.sectionHeading.description.marginTop} | 8px |

### 버튼

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {component.button.touchTarget.min} | 44px | 모바일 메뉴, 복사 버튼 |
| {component.button.gallery.size} | 48px | 선교 모바일 슬라이더 |
| {component.button.revivalControl.size} | 32px | 부흥 조직도 모바일 콘텐츠 컨트롤 |
| {component.button.map.radius} | 4px | 지도 외부 링크 버튼 |
| {component.button.copy.paddingX} | 20px | 온라인 헌금 복사 버튼 |
| {component.button.copy.paddingY} | 8px | 온라인 헌금 복사 버튼 |

버튼 원칙:

- 모바일 터치 타깃은 최소 44px이어야 합니다.
- 내비게이션 및 슬라이더 버튼은 터치 기기에서 hover 배경이 고정되지 않도록 합니다.
- 에디토리얼 컨트롤에는 보더 기반 버튼을 사용하고, 강한 액션/칩에만 채워진 플럼 버튼을 사용합니다.

### 카드

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {component.card.mobile.padding} | 20px | 예배/버스 모바일 카드 |
| {component.card.mobile.radius} | 8px | 예배/버스 모바일 카드 |
| {component.card.mobile.border} | 1px solid #8b6db5 at 15% | 예배/버스 모바일 카드 |
| {component.card.quote.borderLeft} | 3px | 인용문 콜아웃 |
| {component.card.quote.padding.mobile} | 24px 28px | 인용문 콜아웃 |
| {component.card.dark.padding.mobile} | 32px 20px | 부흥 조직도 다크 카드 |
| {component.card.dark.padding.desktop} | 40px | 부흥 조직도 다크 카드 |

### 테이블

| 토큰 | 값 | 사용처 |
| --- | --- | --- |
| {component.table.topBorder} | 3px | 예배/버스 데스크탑 테이블 |
| {component.table.cell.padding.mobile} | 16px 20px | 모바일 카드 행 |
| {component.table.cell.padding.desktop} | 20px 24px | 데스크탑 테이블 행 |
| {component.table.header.bg} | #FAF7FF | 데스크탑 테이블 헤더 |
| {component.table.border} | #8b6db5 at 12% | 카드/테이블 구분선 |

### 선교 갤러리

| 토큰 | 값 |
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

### 푸터

| 토큰 | 값 |
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

### 해야 할 것

- 라이트 페이지 주요 본문 텍스트에 {colors.ink.deepPurple}을 사용합니다.
- 라이트 페이지 레이블, 마커, 링크, 섬세한 UI 액센트에 {colors.accent.purple}을 사용합니다.
- 다크 섹션 레이블과 에디토리얼 메타데이터에 {colors.accent.gold}를 사용합니다.
- 한국어 헤딩에는 {font.serifKo}, 본문/UI에는 {font.sans}를 사용합니다.
- `section-shell`을 기본 페이지 너비 시스템으로 유지합니다.
- 정적 페이지 섹션 제목에는 `SectionHeading`을 사용합니다.
- 선교/교회 스토리텔링에 실제 이미지를 사용합니다.
- 모바일에서 밀도 높은 데스크탑 테이블을 카드로 전환합니다.
- 모바일 컨트롤은 {component.button.touchTarget.min} 이상으로 유지합니다.

### 하지 말아야 할 것

- 퍼플 토큰이 이미 있는 공개 교회 페이지에 블루/네이비 액센트를 도입하지 않습니다.
- 큰 카드 안에 또 다른 둥근 장식 카드를 넣지 않습니다.
- 그라디언트 오브를 독립적인 장식으로 사용하지 않습니다.
- 폰트 크기를 뷰포트 너비에 직접 비례해서 조절하지 않습니다.
- 모바일에서 탭/포커스 후 hover 상태가 시각적으로 고정되지 않도록 합니다.
- 스티키 모바일 미디어 뒤에 실제 페이지 콘텐츠를 숨기지 않습니다.
- 정적 정보 페이지에 랜딩 페이지 스타일의 마케팅 히어로를 만들지 않습니다.
- 아이보리/골드/텍스트 대비 없이 단색 팔레트를 사용하지 않습니다.

## 9. 반응형

### 브레이크포인트

| 토큰 | 값 | 사용처 |
| --- | ---: | --- |
| {breakpoint.mobileMax} | 767px | 모바일 전용 카드/슬라이더 |
| {breakpoint.tablet} | 768px | 태블릿 레이아웃, 셸 패딩 32px |
| {breakpoint.desktop} | 1024px | 데스크탑 타이포그래피 및 더 큰 그리드 |
| {breakpoint.largeDesktop} | 1280px | 데스크탑 셸 확장 및 홈 스크롤 씬 |
| {breakpoint.wide} | 1300px | 홈 데스크탑 스크롤 인터랙션 |
| {breakpoint.xl} | 1536px | 가장 넓은 셸 너비 |

### 반응형 전략

| 토큰 | 값 |
| --- | --- |
| {responsive.mobileNav} | 1024px 미만 햄버거 메뉴 |
| {responsive.desktopNav} | 1024px부터 수평 드롭다운 내비게이션 |
| {responsive.mobileShellPadding} | 16px |
| {responsive.tabletShellPadding} | 32px |
| {responsive.mobileCardPadding} | 20px |
| {responsive.majorSectionPadding.mobile} | 상하 80px 기본 |
| {responsive.majorSectionPadding.desktop} | 상단 100px / 하단 200px 기본 |
| {responsive.touchTarget.min} | 44px |
| {responsive.missionHistory.mobile} | 헤딩 → 모바일 이미지 슬라이더 → 타임라인 |
| {responsive.missionHistory.tabletDesktop} | 타임라인 좌측 + 스티키 이미지 레일 우측 |
| {responsive.serviceTimes.mobile} | 스택 카드 |
| {responsive.serviceTimes.tabletDesktop} | 가로 스크롤 테이블 |
| {responsive.locationBus.mobile} | 스택 노선 카드 |
| {responsive.locationBus.tabletDesktop} | 가로 스크롤 테이블 |

모바일 원칙:

- {breakpoint.tablet} 미만에서는 테이블 대신 카드를 사용합니다.
- 수평 서브메뉴는 스크롤 가능하게 하고 활성 항목 가시성을 유지합니다.
- {breakpoint.tablet} 미만에서 고정/스티키 이미지 레일을 피합니다.
- 모바일 정적 페이지에서 페이지 헤더/배너 가시성을 유지합니다.

태블릿 원칙:

- 768px–1023px 구간은 선교 역사 이미지 레일에 대해 구조적 데스크탑으로 처리합니다.
- {breakpoint.desktop}까지 내비게이션을 접힌 상태로 유지합니다.
- 셸 패딩 32px을 사용하고 680px 이상의 전체 너비 텍스트 블록을 피합니다.

데스크탑 원칙:

- 스티키/스크롤 기반 시각 시스템은 충분한 뷰포트 너비가 있을 때만 사용합니다.
- 콘텐츠 + 비주얼 레일의 2단 정보 구조를 선호합니다.

## 10. 알려진 미완성 사항

- {gap.colorAudit} -- 많은 색상 값이 CSS 변수나 Tailwind 토큰 대신 인라인 임의 값(예: `text-[#3d1a46]`)으로 남아 있습니다. DESIGN.md 섹션 2는 의도된 통합 팔레트를 정의하지만, 코드는 아직 이를 사용하도록 마이그레이션되지 않았습니다.
- {gap.tailwindTokens} -- `tailwind.config.ts`에 실제 퍼플/플럼 브랜드를 반영하지 않는 구식 초록/파랑 토큰(`ink: #1f2b24`, `forest`, `sage`, `cedar: #2a4f8f`, `themeBlue`, `site-ink`)이 여전히 정의되어 있습니다. 이 토큰들은 `site-header.tsx`, `error-page.tsx`, `public-board-renderer.tsx`, 여러 about 페이지 파일에서 참조되고 있으며, 플럼 계열 값으로 교체하고 참조 파일도 업데이트해야 합니다.
- {gap.typographyUtilities} -- `type-body-strong` 같은 일부 클래스가 사용되지만 `globals.css`에 정의되지 않았습니다.
- {gap.componentLibrary} -- 버튼, 카드, 테이블, 탭이 공유 컴포넌트 API 대신 페이지별로 구현되어 있습니다.
- {gap.motionTokens} -- 트랜지션 지속 시간/이징이 인라인에 내장되어 있으며, 300ms, 460ms, 500ms 같은 공통 값만 관찰 가능합니다.
- {gap.adminEditorScope} -- 관리자/Tiptap 에디터 타이포그래피가 존재하지만 여기서는 완전히 다루지 않습니다. 이 문서는 공개 사이트에 집중합니다.
- {gap.accessibilityAudit} -- 색상 대비, 키보드 포커스, 스크린 리더 동작은 철저히 감사되지 않았습니다.
- {gap.assetRules} -- 이미지 크롭 위치와 aspect-ratio 규칙은 현재 구현에서 문서화되었지만 자산 카테고리별로 공식화되지 않았습니다.
