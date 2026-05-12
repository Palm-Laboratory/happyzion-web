"use client";

import { useState } from "react";

import SectionHeading from "@/components/section-heading";

const coreValues = [
  {
    number: "01",
    title: "말씀 중심",
    description: "주일 설교 · 성경강해·큐티를 통해 모든 사역의 영적 기초를 확립합니다.",
  },
  {
    number: "02",
    title: "기도 문화",
    description: "새벽 4:30 기도와 중보기도를 통해 부흥의 동력을 만들어 갑니다.",
  },
  {
    number: "03",
    title: "공동체 사랑",
    description: "주일 설교 · 성경강해·큐티를 통해 모든 사역의 영적 기초를 확립합니다.",
  },
  {
    number: "04",
    title: "다음세대 품기",
    description: "2040세대를 향한 집중적 투자로 시온교회의 미래를 준비합니다.",
  },
  {
    number: "05",
    title: "선교 DNA",
    description: "국내·섬·해외 선교를 통해 하나님 나라를 확장하는 교회가 됩니다.",
  },
];

const ministryTabs = [
  { title: "예배사역팀", subtitle: "말씀 · 기도" },
  { title: "미디어 · 문화", subtitle: "찬양 · 영상 · SNS" },
  { title: "훈련사역팀", subtitle: "소그룹 · 제자양육" },
  { title: "다음세대팀", subtitle: "2040 부흥 프로젝트" },
  { title: "기획 · 행정팀", subtitle: "전문성 · 투명성" },
  { title: "비즈니스선교팀", subtitle: "만나쩝쩝 · 경제영성" },
  { title: "선교팀", subtitle: "국내 · 섬 · 해외" },
];

const ministryDetails = [
  {
    number: "01",
    english: "Worship Ministry",
    title: "예배사역팀",
    subtitle: "말씀과 기도",
    memberCount: "11",
    quote:
      "예배가 살아야 교회가 산다 — 말씀의 능력과 기도의 불꽃이 시온교회를 부흥의 불길로 이끈다",
    teams: [
      {
        title: "말씀팀",
        english: "Word Team",
        items: [
          "주일 설교 준비 및 보조",
          "성경 강해 시리즈 운영",
          "큐티·묵상 자료 제작",
          "설교자 지원 및 원고 관리",
          "S.T.O.R.Y 패턴 설교 적용",
        ],
        groups: ["말씀나눔모임", "큐티나눔방"],
      },
      {
        title: "기도팀",
        english: "Prayer Team",
        items: [
          "새벽기도 인도(4:30am)",
          "중보기도 셀그룹 운영",
          "특별기도회 기획 및 진행",
          "기도학교 (분기별 1회)",
          "부서별 기도 코디네이터",
        ],
        groups: ["새벽기도셀", "중보기도셀", "기도학교 기수모임"],
      },
    ],
    members: ["예배팀장 1명", "말씀팀 3명", "기도팀 5명", "반주·음향 2명", "총 11명"],
  },
  {
    number: "02",
    english: "MEDIA & CULTURE MINISTRY",
    title: "미디어·문화사역팀",
    subtitle: "찬양·영상·SNS",
    memberCount: "28",
    quote: "문화가 복음의 통로가 된다 — 예술과 미디어로 세상과 소통하며 시온의 이름을 높인다",
    teams: [
      {
        title: "찬양·음악팀",
        english: "Worship·Music",
        items: [
          "전문 찬양인도 팀 (리드 + 코러스)",
          "브라스밴드 운영",
          "워십밴드 (현대예배)",
          "악기 훈련 소모임",
          "찬양문화선교사 파송 (신의붕어빵팀)",
        ],
        groups: ["찬양셀", "브라스밴드 셀", "신의붕어빵팀"],
      },
      {
        title: "디지털·SNS팀",
        english: "Digital & SNS",
        items: [
          "주일예배 영상 촬영·편집",
          "유튜브 채널 운영",
          "릴스·숏폼 콘텐츠 제작",
          "SNS 계정 통합 관리",
          "교회 홍보 그래픽 제작",
        ],
        groups: ["미디어창작셀", "SNS선교셀"],
      },
    ],
    members: ["미디어팀장 1명", "찬양팀 12명", "브라스밴드 8명", "영상 4명", "SNS 3명", "총 28명"],
  },
  {
    number: "03",
    english: "TRAINING MINISTRY",
    title: "훈련사역팀",
    subtitle: "소그룹·제자양육",
    memberCount: "10",
    quote: "제자가 제자를 만든다 — 훈련된 한 사람이 시온교회 부흥의 실질적 동력이다",
    teams: [
      {
        title: "소그룹 운영팀",
        english: "Small Group",
        items: [
          "셀리더 기초·심화 훈련",
          "소그룹 교재 개발팀",
          "셀 코칭 및 멘토링",
          "소그룹 개설 지원",
          "하늘독서불패 (16년 운영)",
        ],
        groups: ["독서나눔셀", "리더십모임"],
      },
      {
        title: "제자양육팀",
        english: "Discipleship",
        items: [
          "제자훈련 1단계 (기초)",
          "제자훈련 2단계 (성숙)",
          "리더십 양성과정",
          "하나님의 DNA 강좌",
          "복음영성 훈련과정",
        ],
        groups: ["제자훈련셀", "복음영성셀", "영성훈련방"],
      },
    ],
    members: ["훈련팀장 1명", "소그룹 코치 4명", "제자양육 교사 3명", "독서진행 2명", "총 10명"],
  },
  {
    number: "04",
    english: "NEXT GENERATION MINISTRY",
    title: "다음세대팀",
    subtitle: "2040 부흥 프로젝트",
    memberCount: "11",
    quote: "청년이 모이면 교회가 살아난다 — 2040세대를 향한 집중 투자가 시온교회 10년의 미래다",
    teams: [
      {
        title: "20대 사역팀",
        english: "20's Ministry",
        items: [
          "대학부·청년부 예배 기획",
          "20대 소그룹 리더팀",
          "청년 문화선교 사역",
          "취업·진로 지원 소모임",
          "청년 기도·찬양 문화 조성",
        ],
        groups: ["청년셀", "또래모임"],
      },
      {
        title: "3040 사역팀",
        english: "30·40's Ministry",
        items: [
          "3040 전용 예배 모임 기획",
          "직장인 소그룹 운영",
          "부부·가정 셀그룹",
          "봇대형이 간다 콘텐츠 연계",
          "자녀교육·부모 모임",
        ],
        groups: ["직장인셀", "부부셀", "부모셀", "3040나눔방"],
      },
    ],
    members: ["청년팀장 1명", "20대 리더 4명", "3040 리더 4명", "콘텐츠 2명", "총 11명"],
  },
  {
    number: "05",
    english: "PLANNING & ADMINISTRATION",
    title: "기획·행정팀",
    subtitle: "전문성·투명성",
    memberCount: "7",
    quote: "전문성이 사역을 지속시키고, 투명성이 공동체를 신뢰로 세운다",
    teams: [
      {
        title: "기획팀",
        english: "Planning",
        items: [
          "연간 부흥 로드맵 수립",
          "사역 전략 기획",
          "프로그램 매뉴얼 제작",
          "사역 평가 및 피드백",
          "교회력 관리",
        ],
        groups: ["기획나눔모임"],
      },
      {
        title: "행정·재정팀",
        english: "Administration",
        items: [
          "재정 투명 보고 시스템",
          "교적 및 성도 관리",
          "봉사 스케줄 관리",
          "각종 행정 서류 처리",
          "시설 관리 및 예약",
        ],
        groups: ["행정봉사셀", "재정기도팀"],
      },
    ],
    members: ["행정간사 1명", "기획팀 3명", "행정 2명", "재정 1명", "총 7명"],
  },
  {
    number: "06",
    english: "BUSINESS MISSION",
    title: "비즈니스선교팀",
    subtitle: "만나쩝쩝·경영컨설팅·복음경제영성",
    memberCount: "8",
    quote: "비즈니스가 선교다 — 일터에서 복음을 살고, 경제 속에서 하나님 나라를 세운다",
    teams: [
      {
        title: "비즈니스사역팀",
        english: "Business Ministry",
        items: [
          "만나쩝쩝 운영 (음식+전도)",
          "경영컨설팅 사역",
          "창업 멘토링 지원",
          "비즈니스 셀 리더팀",
          "소상공인 지원모임",
        ],
        groups: ["비즈니스셀", "창업기도모임", "만나공동체"],
      },
      {
        title: "복음경제영성팀",
        english: "Gospel Economics",
        items: [
          "복음경제영성 진단 시스템",
          "6대 성경인물 훈련과정",
          "한국교회 목회지원센터 연계",
          "경제영성 소그룹 운영",
          "재정 성경교육",
        ],
        groups: ["경제영성나눔방", "직업소명셀"],
      },
    ],
    members: ["비즈선교팀장 1명", "비즈팀원 4명", "복음경제팀 3명", "총 8명"],
  },
  {
    number: "07",
    english: "MISSION",
    title: "선교팀",
    subtitle: "국내·섬·해외 선교",
    memberCount: "7",
    quote: "땅 끝까지 — 소야도 섬에서 열방까지, 시온교회가 가는 곳마다 복음의 발자국이 남는다",
    teams: [
      {
        title: "국내·섬·선교팀",
        english: "Local & Island Mission",
        items: [
          "국내 미자립교회 지원",
          "소야도 섬 선교 (신의붕어빵팀)",
          "문화선교 파송",
          "지역사회 봉사팀",
          "계절별 단기선교",
        ],
        groups: ["설교기도셀", "섬선교셀", "선교문화셀"],
      },
      {
        title: "해외선교팀",
        english: "Global Mission",
        items: [
          "해외선교 파송 지원",
          "선교사 관리 및 중보",
          "단기선교 기획 (연 1회)",
          "선교헌금 투명 관리",
          "선교사 자녀 지원",
        ],
        groups: ["해외후원모임", "파송기도팀"],
      },
    ],
    members: ["선교팀장 1명", "국내선교 2명", "섬선교 2명", "해외선교 2명", "총 7명"],
  },
];

const smallGroupTabs = [
  { title: "소그룹 원칙", subtitle: "셀 생태계 설계", label: "Small Group Ecosystem" },
  { title: "인원 배치", subtitle: "2025년 목표", label: "Member Placement" },
  { title: "리더 선발 기준", subtitle: "6가지 자격 요건", label: "Leader Selection" },
  { title: "연간 부흥 로드맵", subtitle: "12개월 캘린더", label: "Annual Roadmap" },
];

const roadmapQuarters = [
  {
    quarter: "1Q",
    summary: "1·2·3월 — 출발 · 기초 · 성장",
    months: [
      {
        phase: "출발·발대",
        month: "1월",
        items: ["신년 감사예배·목회 비전 선포", "7대 사역팀 발대식·헌신 예배"],
      },
      {
        phase: "기초·훈련",
        month: "2월",
        items: ["제자훈련 1기 개강 · 소그룹 리더 훈련", "복음경제영성 진단 프로그램"],
      },
      {
        phase: "성장·선교",
        month: "3월",
        items: ["2040 봄 집회·청년 열린예배", "소야도 1차 섬 선교 출동"],
      },
    ],
  },
  {
    quarter: "2Q",
    summary: "4·5·6월 — 부활 · 가정 · 점검",
    months: [
      {
        phase: "부활·점검",
        month: "4월",
        items: ["부활절 대예배·지역 전도 총동원", "신앙성장팀 문화선교 출동"],
      },
      {
        phase: "가정·셀",
        month: "5월",
        items: ["가정의 달·부부·가족 셀 집중", "하늘독서불패 새 시즌 개강"],
      },
      {
        phase: "점검·해외",
        month: "6월",
        items: ["상반기 사역 평가·소그룹 점검", "해외 단기선교 파송대·후원예배"],
      },
    ],
  },
  {
    quarter: "3Q",
    summary: "7·8·9월 — 여름 · 훈련 · 전도",
    months: [
      {
        phase: "여름·수련회",
        month: "7월",
        items: ["전교인 여름 수련회 (2040 집중)", "해외 단기선교 출발·현지 사역"],
      },
      {
        phase: "훈련·음악",
        month: "8월",
        items: ["제자훈련 2기 개강·기도학교", "브라스밴드 여름 정기 연주회"],
      },
      {
        phase: "전도·결실",
        month: "9월",
        items: ["전도의 달·새가족 집중 초청", "3040 가을 집회·소야도 2차 선교"],
      },
    ],
  },
  {
    quarter: "4Q",
    summary: "10·11·12월 — 부흥 · 감사 · 비전",
    months: [
      {
        phase: "부흥성회",
        month: "10월",
        items: ["부흥성회 3일·강사 초청 집회", "미니콘서트 기획 수립·전도 행사"],
      },
      {
        phase: "감사·분가",
        month: "11월",
        items: ["추수감사 대예배·선교 보고회", "소그룹 분가 축하 예배·새 셀 개설"],
      },
      {
        phase: "비전·성탄",
        month: "12월",
        items: ["성탄 문화선교·지역 나눔 사역", "나비 비전 선포 예배·사역 결산"],
      },
    ],
  },
];

const smallGroupCycleSteps = [
  {
    number: "01",
    title: "리더 훈련",
    items: ["제자훈련 1단계 이수 필수", "셀리더 기초과정 8주", "현장 실습 코칭 2회", "리더 언약서 서명"],
  },
  {
    number: "02",
    title: "소그룹 개설",
    items: ["5~8명 구성 원칙", "모임 목표: 언약서 작성", "정기 모임일·장소 확정", "개설 예배 선포"],
  },
  {
    number: "03",
    title: "정기 코칭",
    items: ["월 1회 전체 리더 모임", "분기별 셀 건강 평가", "위기 셀 긴급 코칭", "출석·나눔 리포트 제출"],
  },
  {
    number: "04",
    title: "재생산",
    items: ["12-18개월 후 분가 원칙", "새 리더 사전 양성 의무", "분가 후 새 셀 개설 예배", "모 셀과 협력 사역 유지"],
  },
];

const smallGroupPrinciples = [
  {
    number: "01",
    title: "말씀 중심 운영",
    description: "매 모임 공식 교재 또는 주일 설교 본문을 기반으로 나눔을 진행합니다.",
  },
  {
    number: "02",
    title: "관계 최우선",
    description: "프로그램보다 사람이 중심입니다. 새가족이 셀을 통해 뿌리내리도록 합니다.",
  },
  {
    number: "03",
    title: "투명한 나눔",
    description: "재정·출석·나눔 현황을 월 1회 훈련팀에 보고합니다.",
  },
  {
    number: "04",
    title: "재생산 DNA",
    description: "모든 셀리더는 다음 리더를 양성해야 합니다. 분가는 성공의 증거입니다.",
  },
  {
    number: "05",
    title: "기도로 시작·마침",
    description: "모든 셀 모임은 기도로 시작하고 기도로 마칩니다.",
  },
  {
    number: "06",
    title: "전도·선교 연결",
    description: "각 셀은 1년에 1명 이상 새가족을 초청하는 목표를 세웁니다.",
  },
];

const personnelRows = [
  ["예배사역", "1", "10", "5개", "11", "말씀팀·기도팀"],
  ["미디어/문화", "1", "27", "15개", "28", "찬양·영상·SNS"],
  ["훈련사역", "1", "9", "8개", "10", "소그룹·제자양육"],
  ["다음세대", "1", "10", "8개", "11", "2040 부흥 프로젝트"],
  ["기획·행정", "1", "6", "4개", "7", "전문성·투명성"],
  ["비즈니스선교", "1", "7", "5개", "8", "만나쩝쩝·경제영성"],
  ["선교", "1", "6", "6개+", "7", "국내·섬·해외"],
];

const personnelBars = [
  { label: "미디어/문화", count: "28명", value: 28 },
  { label: "예배사역", count: "11명", value: 11 },
  { label: "다음세대", count: "11명", value: 11 },
  { label: "훈련사역", count: "10명", value: 10 },
  { label: "비즈니스선교", count: "8명", value: 8 },
  { label: "기획·행정", count: "7명", value: 7 },
  { label: "선교", count: "7명", value: 7 },
];

const personnelTotalCount = 82;

function VisionQuote() {
  return (
    <div className="relative w-full overflow-hidden border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-8 py-10 md:px-[60px] md:py-12">
      <p className="font-hahmlet relative z-10 text-[20px] font-normal uppercase leading-6 tracking-[1px] text-black xl:whitespace-nowrap">
        “복음으로 행하고, 말씀으로 성장하며, 사랑으로 세상을 변화시키는 교회”
      </p>
      <p
        className="pointer-events-none absolute left-[19px] top-[-11px] h-[160px] w-[46px] text-[120px] leading-[120px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        &quot;
      </p>
      <p
        className="pointer-events-none absolute left-[min(724px,74%)] top-[38px] text-[96px] leading-[96px] text-[#c5aee0]/30"
        style={{ fontFamily: "var(--font-estonia), cursive" }}
      >
        VISION
      </p>
    </div>
  );
}

function MinistryDetailQuote({ quote }: { quote: string }) {
  return (
    <div className="relative w-full overflow-hidden border-l-[3px] border-[#6d5898] bg-white/[0.04] px-8 py-9 md:px-12">
      <p className="font-hahmlet relative z-10 text-[16px] font-normal uppercase leading-7 tracking-[1px] text-white">
        &quot;{quote}&quot;
      </p>
      <p
        className="pointer-events-none absolute left-[19px] top-[-11px] h-[160px] w-[46px] text-[120px] leading-[120px] text-[#e7cff2]/10"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        &quot;
      </p>
    </div>
  );
}

function MinistryTeamPanel({
  title,
  english,
  items,
  groups,
}: {
  title: string;
  english: string;
  items: string[];
  groups: string[];
}) {
  return (
    <article className="flex flex-col gap-6 bg-white/[0.04] p-7 md:p-9">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 leading-6">
          <h3 className="font-hahmlet text-sm font-light uppercase tracking-[2px] text-[#c9a96e]">
            {title}
          </h3>
          <p
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
          >
            {english}
          </p>
        </div>
        <ul className="font-suit flex flex-col gap-3 text-sm leading-4 text-white/70">
          {items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="text-white">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px w-full bg-white/16" />

      <div className="flex flex-wrap gap-3">
        {groups.map((group) => (
          <span
            key={group}
            className="font-suit inline-flex items-center gap-1 border border-[#c5aee0]/50 bg-[#8b6db5]/15 py-1.5 pl-1.5 pr-3 text-[13px] font-light uppercase leading-[14px] tracking-[2px] text-[#c5aee0]"
          >
            <span className="text-xs">◆</span>
            {group}
          </span>
        ))}
      </div>
    </article>
  );
}

function MinistryTeamsSection() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const activeMinistry = ministryDetails[selectedTabIndex] ?? ministryDetails[0];

  return (
    <section className="bg-gradient-to-b from-[#1e1035] to-[#2f2047] pb-24 pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Ministry Teams"
          title="7대 사역팀 체계"
          description="담임목사 박완섭 · 팀장 7명 · 팀원 75명 · 소그룹 51개+"
          className="[&_h2]:text-white [&_p]:whitespace-nowrap [&_p]:text-[#c9a96e] [&_span]:bg-[#c9a96e]"
        />

        <div className="flex w-full flex-col border border-[#5d3d8a]/15 lg:flex-row">
          <aside className="flex flex-col bg-white/[0.04] text-left lg:w-[180px]">
            {ministryTabs.map((tab, index) => {
              const active = index === selectedTabIndex;

              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setSelectedTabIndex(index)}
                  className={`flex min-h-[66px] flex-col items-start justify-center gap-3 border-b border-[#bdaad6]/15 px-4 py-3.5 text-left ${active ? "border-l-2 border-l-[#c9a96e] bg-[#190b2a]" : "bg-white/[0.08]"
                    }`}
                  aria-pressed={active}
                >
                  <span className="font-hahmlet text-[15px] font-semibold leading-4 tracking-[0.01em] text-[#efe3ff]">
                    {tab.title}
                  </span>
                  <span className="font-suit text-xs leading-3 tracking-[0.01em] text-[#7a6890]">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-11 bg-[#190b2a] p-6 md:p-[60px]">
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col gap-3">
                <p
                  className="text-base uppercase leading-[10px] tracking-[1px] text-[#c9a96e]"
                  style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                >
                  {activeMinistry.number} ·{" "}
                  <span className="text-xs leading-3 tracking-[2px]">{activeMinistry.english}</span>
                </p>
                <div className="flex flex-col gap-3">
                  <h2 className="font-hahmlet text-2xl font-semibold uppercase leading-6 tracking-[0.01em] text-[#f2e7f5]">
                    {activeMinistry.title}
                  </h2>
                  <p className="font-suit text-sm leading-3 tracking-[2.8px] text-[#c9a96e]">
                    {activeMinistry.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end justify-center gap-1.5 text-center uppercase text-[#b49bd8]">
                <p
                  className="text-[40px] italic leading-10 tracking-[1px]"
                  style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                >
                  {activeMinistry.memberCount}
                </p>
                <p className="font-suit text-xs leading-3 tracking-[2px]">팀 인원</p>
              </div>
            </div>

            <MinistryDetailQuote quote={activeMinistry.quote} />

            <div className="flex flex-col">
              <div className="grid gap-0.5 md:grid-cols-2">
                {activeMinistry.teams.map((team) => (
                  <MinistryTeamPanel key={team.title} {...team} />
                ))}
              </div>

              <div className="flex flex-col gap-4 bg-[#1a1028] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <p
                  className="text-xs uppercase leading-3 tracking-[2px] text-[#c9a96e]"
                  style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                >
                  members
                </p>
                <div className="font-suit flex flex-wrap gap-x-3 gap-y-2 text-[13px] uppercase leading-3 tracking-[1px] text-white/70">
                  {activeMinistry.members.map((member, index) => (
                    <span
                      key={member}
                      className={index === activeMinistry.members.length - 1 ? "text-[#c9a96e]" : ""}
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallGroupPanelHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center justify-center gap-1.5">
        <span className="h-px w-4 bg-[#c9a96e]" />
        <p
          className="text-xs uppercase leading-3 tracking-[2px] text-[#c9a96e]"
          style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
        >
          {label}
        </p>
      </div>
      <h2 className="font-hahmlet text-2xl font-semibold uppercase leading-6 tracking-[0.01em] text-[#33103f]">
        {title}
      </h2>
    </div>
  );
}

function RoadmapQuarterHeader({ quarter, summary }: { quarter: string; summary: string }) {
  return (
    <div className="flex w-full items-center overflow-hidden rounded-t">
      <div className="flex h-10 shrink-0 items-center bg-[#341a44] pl-6 pr-4">
        <p className="font-hahmlet text-xs leading-3 tracking-[1px] text-[#ffd17d]">{quarter}</p>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center bg-[#341a44] px-6 py-2.5">
        <p className="font-suit truncate text-xs leading-3 tracking-[1px] text-[#ffd17d]">{summary}</p>
      </div>
    </div>
  );
}

function RoadmapMonthCard({
  phase,
  month,
  items,
}: {
  phase: string;
  month: string;
  items: string[];
}) {
  return (
    <article className="flex min-h-[168px] flex-col gap-2 border-b border-r border-[#8d769d]/60 bg-white/10 p-4">
      <p className="font-suit text-xs uppercase leading-3 tracking-[2px] text-[#c798d9]">{phase}</p>
      <div className="flex flex-1 flex-col gap-3.5">
        <h3 className="font-hahmlet text-base font-semibold uppercase leading-6 tracking-[0.01em] text-[#f6e4fc]">
          {month}
        </h3>
        <ul className="font-suit flex flex-col gap-1 text-[13px] leading-[18px] text-[#f6e4fc]/70">
          {items.map((item) => (
            <li key={item} className="flex gap-1.5">
              <span className="text-sm leading-[22px]">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function SmallGroupSectionBlock({
  label,
  meta,
  children,
  className = "",
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex w-full flex-col gap-6 rounded bg-[#594263] px-5 py-8 md:px-10 md:py-10 ${className}`}>
      <div className="flex w-full items-center justify-center gap-3">
        <p className="font-hahmlet shrink-0 text-sm leading-3 tracking-[2.8px] text-[#ffd17d]">
          {label}
        </p>
        <span className="h-px min-w-0 flex-1 bg-[#c5aee0]/45" />
        {meta ? (
          <p className="font-suit shrink-0 text-sm leading-3 tracking-[0.01em] text-[#ffd17d]">
            {meta}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SmallGroupCycleCard({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="flex flex-col gap-5 rounded bg-white/10 p-5">
      <div className="flex flex-col gap-2">
        <p
          className="text-4xl font-semibold italic leading-9 tracking-[0.04em] text-[#c798d9]/60"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <h3 className="font-hahmlet text-lg font-semibold leading-[18px] tracking-[0.01em] text-[#fdf8ff]">
          {title}
        </h3>
      </div>
      <ul className="font-suit flex flex-col gap-3 text-sm leading-[14px] text-[#fdf8ff]/70">
        {items.map((item) => (
          <li key={item} className="flex gap-1.5">
            <span className="tracking-[2.8px]">·</span>
            <span className="tracking-[0.01em]">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PrincipleList({ items = smallGroupPrinciples }: { items?: typeof smallGroupPrinciples }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {items.map((item) => (
        <div key={item.number} className="flex gap-6">
          <p
            className="w-8 shrink-0 text-center text-sm leading-3 tracking-[0.04em] text-[#ffdea0]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {item.number}
          </p>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h3 className="font-hahmlet text-base font-medium leading-4 tracking-[0.01em] text-[#fdf8ff]">
              {item.title}
            </h3>
            <p className="font-suit text-sm font-light leading-5 tracking-[0.01em] text-[#fdf8ff]/70">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SmallGroupPrinciplesContent() {
  return (
    <>
      <SmallGroupPanelHeader label="Small Group Ecosystem" title="소그룹 운영 원칙" />

      <div className="flex w-full flex-col gap-11">
        <SmallGroupSectionBlock label="4단계 사이클">
          <div className="grid gap-4 md:grid-cols-2">
            {smallGroupCycleSteps.map((step) => (
              <SmallGroupCycleCard key={step.number} {...step} />
            ))}
          </div>
        </SmallGroupSectionBlock>

        <SmallGroupSectionBlock label="6대 원칙" className="md:pb-20">
          <PrincipleList />
        </SmallGroupSectionBlock>
      </div>
    </>
  );
}

function PersonnelTable() {
  const headers = ["사역부", "팀장", "팀원", "소그룹 셀", "총 인원", "비고"];
  const totals = ["합계", "7", "75", "51개+", "82", "2025년 목표"];

  return (
    <div className="w-full overflow-x-auto">
      <table className="font-suit min-w-[620px] w-full border-collapse text-left text-sm tracking-[0.01em]">
        <thead>
          <tr className="border-b border-[#d4b1eb]/50">
            {headers.map((header) => (
              <th key={header} className="px-3.5 py-5 font-normal tracking-[0.2em] text-[#ffd17d]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personnelRows.map((row) => (
            <tr key={row[0]} className="border-b border-[#d4b1eb]/50 text-[#f4f0fb]">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${cell}`} className={`px-3.5 py-5 ${index === 0 ? "font-semibold" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b border-[#d4b1eb]/50 bg-white/10 text-[#e3bfff]">
            {totals.map((cell) => (
              <td key={cell} className="px-3.5 py-5 font-semibold">
                {cell}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function PersonnelBars() {
  return (
    <div className="flex w-full flex-col gap-3">
      {personnelBars.map((bar) => (
        <div key={bar.label} className="flex w-full flex-col gap-3">
          <div className="font-suit flex items-center justify-between text-sm tracking-[0.01em] text-[#f3ecfc]">
            <span>{bar.label}</span>
            <span>{bar.count}</span>
          </div>
          <div className="h-[3px] w-full bg-[#c5aee0]/35">
            <div
              className="h-full bg-[#d79cff]"
              style={{ width: `${(bar.value / personnelTotalCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PersonnelPlanContent() {
  return (
    <>
      <SmallGroupPanelHeader label="personnel plan" title="인원 배치 계획" />

      <div className="flex w-full flex-col gap-11">
        <SmallGroupSectionBlock label="TEAM OVERVIEW" className="md:pb-20">
          <PersonnelTable />
        </SmallGroupSectionBlock>

        <SmallGroupSectionBlock label="사역부별 인원 비중" meta="총 82명" className="md:pb-20">
          <PersonnelBars />
        </SmallGroupSectionBlock>
      </div>
    </>
  );
}

function LeaderSelectionContent() {
  return (
    <>
      <SmallGroupPanelHeader label="Leader Selection" title="리더 선발 기준" />

      <SmallGroupSectionBlock label="6가지 자격 요건" className="md:pb-20">
        <PrincipleList />
      </SmallGroupSectionBlock>
    </>
  );
}

function AnnualRoadmapContent() {
  return (
    <>
      <SmallGroupPanelHeader label="Annual Roadmap" title="연간 부흥 로드맵" />

      <div className="flex w-full flex-col gap-6 rounded bg-[#594263] px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10">
        <div className="flex w-full items-center justify-center gap-3">
          <p className="font-hahmlet shrink-0 text-sm leading-3 tracking-[2.8px] text-[#ffd17d]">
            12개월 사역 캘린더 · 2026
          </p>
          <span className="h-px min-w-0 flex-1 bg-[#c5aee0]/45" />
        </div>

        <div className="flex w-full flex-col gap-6">
          {roadmapQuarters.map((quarter) => (
            <div key={quarter.quarter} className="flex w-full flex-col">
              <RoadmapQuarterHeader quarter={quarter.quarter} summary={quarter.summary} />
              <div className="grid overflow-hidden rounded-b md:grid-cols-3">
                {quarter.months.map((month, index) => (
                  <RoadmapMonthCard key={month.month} {...month} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SmallGroupsMinistrySection() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <section className="bg-[#fefbff] pb-24 pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Small Groups, Leaders, and Ministry"
          title="소그룹과 리더, 그리고 사역"
          description="How We Serve Together"
          className="[&_p]:text-[#b87f16] [&_span]:bg-[#b87f16]"
        />

        <div className="flex w-full flex-col border border-[#5d3d8a]/15 lg:flex-row">
          <aside className="flex flex-col bg-[#fcfaff] text-left lg:w-[180px]">
            {smallGroupTabs.map((tab, index) => {
              const active = index === selectedTabIndex;

              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setSelectedTabIndex(index)}
                  className={`flex min-h-[66px] flex-col items-start justify-center gap-3 border-b border-[#5d3d8a]/15 px-4 py-3.5 text-left ${active ? "border-l-2 border-l-[#340653] bg-[#f4f0f9]" : "bg-white/60"
                    }`}
                  aria-pressed={active}
                >
                  <span className="font-hahmlet text-[15px] font-semibold leading-4 tracking-[0.01em] text-[#1e1035]">
                    {tab.title}
                  </span>
                  <span className="font-suit text-xs leading-3 tracking-[0.01em] text-[#7a6890]">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-[60px] border-l border-[#5d3d8a]/15 bg-[#f4f0f9] px-5 py-12 md:px-10 md:py-[60px]">
            {selectedTabIndex === 0 ? <SmallGroupPrinciplesContent /> : null}
            {selectedTabIndex === 1 ? <PersonnelPlanContent /> : null}
            {selectedTabIndex === 2 ? <LeaderSelectionContent /> : null}
            {selectedTabIndex === 3 ? <AnnualRoadmapContent /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreValueCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="flex min-h-[170px] flex-col items-start px-5 py-6 shadow-[0_6px_9px_rgba(0,0,0,0.15)] [background-image:linear-gradient(171.1deg,#473367_3.35%,#413553_89.92%)]">
      <div className="flex w-full flex-col items-start gap-3">
        <p
          className="w-full text-[32px] italic leading-8 text-[#c9a96e]"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <div className="flex w-full flex-col items-start gap-[14px]">
          <h2 className="font-hahmlet text-[20px] font-normal leading-5 text-white">{title}</h2>
          <p className="font-suit text-sm leading-[22px] text-white/70">{description}</p>
        </div>
      </div>
    </article>
  );
}

function VisionCoreValuesSection() {
  return (
    <section className="bg-white pb-24 pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Vision & Core Values"
          title="교회 비전 · 5대 핵심가치"
          description="What We Believe · What We Pursue"
          titleAs="h1"
        />

        <div className="flex w-full flex-col items-start gap-20">
          <div className="flex w-full flex-col items-start gap-10">
            <VisionQuote />
            <div className="font-suit w-full max-w-[900px] text-[18px] font-normal uppercase leading-[30px] tracking-[0.01em] text-[#4a3b5e]">
              <p>시온교회는 복음의 기쁨이 넘치는 공동체를 만들어 지역사회와 열방을 섬기는</p>
              <p>부흥하는 교회로 성장하기를 비전으로 삼습니다.</p>
            </div>
          </div>

          <div className="grid w-full gap-0.5 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((value) => (
              <CoreValueCard key={value.number} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCallout() {
  return (
    <section className="relative w-full overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] px-8 py-12 uppercase md:px-[60px] md:py-[72px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(153,63,186,0.12),rgba(153,63,186,0)_52%)]" />
      <div className="relative z-10 flex flex-col items-start gap-4">
        <p
          className="text-center text-sm leading-[14px] tracking-[0.1429em] text-[#c9a96e]"
          style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
        >
          Isaiah 61:1
        </p>
        <h2 className="font-hahmlet text-2xl font-semibold leading-10 tracking-[0.01em] text-white">
          “여호와의 영이 내 위에 계시니
          <br />
          이는 가난한 자에게 복음을 전하게 하시려고 내게 기름을 부으시고”
        </h2>
        <p className="font-hahmlet text-base font-medium leading-7 tracking-[0.01em] text-white/70">
          우리가 팀을 세우고 소그룹을 훈련하고 리더를 키우는 것은 단 하나, 복음으로 사람을
          살리기 위함입니다.
        </p>
      </div>
    </section>
  );
}

export default function RevivalOrganizationStaticPage() {
  return (
    <main className="min-h-[520px] w-full overflow-x-hidden bg-white">
      <VisionCoreValuesSection />
      <MinistryTeamsSection />
      <SmallGroupsMinistrySection />
      <section className="bg-[#fefbff] pb-[200px]">
        <div className="section-shell section-shell--narrow">
          <ClosingCallout />
        </div>
      </section>
    </main>
  );
}
