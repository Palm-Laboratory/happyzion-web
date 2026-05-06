export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "교회 소개", href: "#", description: "교회 소개와 비전" },
  { label: "예배 영상", href: "#", description: "예배와 선교 스토리" },
  { label: "선교", href: "#", description: "열방을 향한 선교" },
  { label: "교회 행사", href: "#", description: "함께하는 사역과 참여" },
];

export const aboutCards = [
  {
    number: "01",
    eyebrow: "Spirit-filled worship",
    title: "성령이 임재하는 예배",
    body: "하나님의 임재 안에서 드리는 예배를 통해 성도들이 변화되고 회복되는 공동체를 세워갑니다.",
  },
  {
    number: "02",
    eyebrow: "Spirit-led mission church",
    title: "성령으로 선교하는 교회",
    body: "땅 끝까지 복음을 전하라는 지상명령에 순종하여 열방을 향한 선교에 헌신합니다.",
  },
  {
    number: "03",
    eyebrow: "Spirit-united community",
    title: "성령으로 하나되는 공동체",
    body: "그리스도 안에서 서로 사랑하고 섬기며 연합하는 진정한 공동체를 이루어갑니다.",
  },
];

export const missionStories = [
  {
    id: "01",
    country: "Philippines",
    image: "/images/mission/philippines.jpg",
    message:
      "가장 오래 함께한 땅에서 우리는 복음이 사람을 변화시키고 공동체를 세워가는 과정을 깊이 경험했습니다.",
  },
  {
    id: "02",
    country: "Thailand",
    image: "/images/mission/thailand.jpg",
    message:
      "낯선 환경 속에서도 성령께서 길을 여시고, 작은 순종이 큰 열매로 이어짐을 보았습니다.",
  },
  {
    id: "03",
    country: "Malaysia",
    image: "/images/mission/malaysia.png",
    message:
      "다양한 문화 속에서 복음이 경계를 넘어 사람들을 하나로 묶는 힘을 배웠습니다.",
  },
];

export const missionCountries = [
  "Philippines",
  "Thailand",
  "Malaysia",
  "Cambodia",
  "Indonesia",
  "China",
  "Myanmar",
  "Paraguay",
  "Mongol",
];
