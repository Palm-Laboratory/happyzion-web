export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "소개", href: "/about", description: "교회 소개와 비전" },
  { label: "예배", href: "/worship", description: "예배 시간과 안내" },
  { label: "새가족", href: "/next-steps", description: "처음 오신 분 안내" },
  { label: "소식", href: "/news", description: "공지와 최근 소식" },
];

export const homeHighlights = [
  {
    eyebrow: "Vision",
    title: "함께 머물고, 함께 자라는 공동체",
    body: "메인 히어로, 소개 섹션, 연결 동선이 자연스럽게 이어지는 `tdch` 스타일의 시작점입니다.",
  },
  {
    eyebrow: "Structure",
    title: "확장 가능한 App Router 구조",
    body: "공개 사이트 라우트 그룹과 공통 컴포넌트, 설정 레이어를 먼저 분리해 두었습니다.",
  },
  {
    eyebrow: "Content",
    title: "실제 내용으로 바로 교체 가능한 더미 데이터",
    body: "사이트 이름, 주소, 메뉴, SEO는 `src/lib`에서 한 번에 관리할 수 있습니다.",
  },
];
