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
    image: "/images/mission/philippines.jpeg",
    imagePosition: "85% center",
    message:
      "낯선 땅에서 만난 사람들과의 작은 만남 속에서, 하나님의 사랑이 전해지는 모습을 보며 복음이 언어와 문화를 넘어 사람의 마음을 잇는 사랑의 언어임을 경험했습니다.",
  },
  {
    id: "02",
    country: "Thailand",
    image: "/images/mission/thailand.jpeg",
    message:
      "따뜻한 환대와 밝은 미소 속에서, 우리는 하나님께서 이미 이곳에서 일하고 계심을 보았습니다. 우리가 전하기 전에 먼저 역사하시는 하나님의 손길이 이 공동체 곳곳에 스며들어 있었습니다.",
  },
  {
    id: "03",
    country: "Malaysia",
    image: "/images/mission/malaysia.jpeg",
    message:
      "어려운 현실 속에서도 미소를 잃지 않는 사람들을 만나며, 우리는 작은 사랑의 나눔이 희망의 씨앗이 되어 삶을 변화시키는 모습을 보았습니다.",
  },
  {
    id: "04",
    country: "Indonesia",
    image: "/images/mission/indonesia.jpeg",
    message:
      "수천 개의 섬으로 이루어진 땅에서, 복음은 파도처럼 퍼져나갔습니다. 각기 다른 언어와 문화를 가진 이들이 한 하나님 앞에 모이는 모습은 천국의 예표였습니다.",
  },
  {
    id: "05",
    country: "Myanmar",
    image: "/images/mission/myanmar.jpeg",
    message:
      "고난 속에서도 믿음을 붙잡고 살아가는 이들 곁에서, 우리는 오히려 더 큰 위로와 도전을 받았습니다. 그들의 기도와 찬양 속에서 하나님의 임재를 깊이 경험했습니다.",
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
  "Mongolia",
];
