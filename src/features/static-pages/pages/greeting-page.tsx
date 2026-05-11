import Image from "next/image";

import SectionHeading from "@/components/section-heading";

const greetingTabs = [
  "인사말/비전",
  "교회 이야기",
  "부흥 조직도",
  "선교 이력",
  "오시는 길",
  "헌금 안내",
];

const visionItems = [
  {
    number: "01",
    english: "Spirit-filled worship",
    title: "성령이 임재하는 예배",
  },
  {
    number: "02",
    english: "Spirit-led mission church",
    title: "성령으로 선교하는 교회",
  },
  {
    number: "03",
    english: "Spirit-united community",
    title: "성령으로 하나되는 공동체",
  },
];

const elderTeam = [
  {
    label: "Senior pastor",
    name: "박완섭 담임목사",
    role: "교회 전체 목회 및 선교",
  },
  {
    label: "Elder",
    name: "섬김의 동역자",
    role: "예배와 공동체를 세우는 섬김",
  },
  {
    label: "Elder",
    name: "행복한 동행",
    role: "성도와 다음세대를 돌보는 사역",
  },
];

const ministryPrograms = [
  {
    english: "Next Generation",
    title: "다음세대 2040",
    description: "미래 세대와 2040을 향한 집중적인 부흥 사역",
  },
  {
    english: "Worship Ministry",
    title: "예배사역",
    description: "말씀과 기도 중심의 예배, 하나님의 임재를 경험하는 성령충만한 예배 공동체",
  },
  {
    english: "Mission",
    title: "선교 사역",
    description:
      "국내 미자립 교회 지원, 섬 선교, 필리핀과 미얀마 등 해외선교까지 이어가는 선교 사명",
  },
  {
    english: "Media & Culture",
    title: "미디어 · 문화사역",
    description: "찬양팀, 브라스밴드, 디지털 영상, SNS를 통한 복음의 문화적 확산",
  },
  {
    english: "Training",
    title: "훈련사역",
    description: "소그룹과 제자양육으로 깊이 있는 신앙 성장을 이룹니다",
  },
  {
    english: "Business Mission",
    title: "비즈니스선교",
    description: "만나쩝쩝, 경영컨설팅, 복음경제영성을 통한 일터 선교",
  },
  {
    english: "Administration",
    title: "기획과 행정",
    description: "전문성과 투명성을 갖춘 교회 행정으로 신뢰의 공동체를 세웁니다",
  },
];

function GreetingTabs() {
  return (
    <nav className="border-y border-[#33103f]/10 bg-white" aria-label="교회 소개 하위 메뉴">
      <div className="section-shell flex min-w-0 justify-start overflow-x-auto md:justify-center">
        <div className="flex min-w-max items-center">
          {greetingTabs.map((tab, index) => (
            <a
              key={tab}
              href="#greeting"
              className={`flex h-[50px] items-center justify-center px-4 text-center text-sm tracking-[0.07em] transition hover:text-[#33103f] ${
                index === 0
                  ? "border-b-[3px] border-[#33103f] font-semibold text-[#33103f]"
                  : "font-medium text-[#33103f]/70"
              }`}
            >
              {tab}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function VisionList() {
  return (
    <div className="grid gap-4 sm:max-w-[360px]">
      {visionItems.map((item) => (
        <article
          key={item.number}
          className="relative overflow-hidden rounded border border-white/5 bg-[#403254] px-7 py-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <p className="text-[10px] uppercase leading-none tracking-[0.18em] text-[#faf0ff]/40">
            {item.english}
          </p>
          <h3 className="mt-2 font-hahmlet text-lg font-semibold leading-none tracking-[0.01em] text-[#f5f0f6]">
            {item.title}
          </h3>
          <p className="font-corinthia pointer-events-none absolute -left-1 -top-2 text-[72px] leading-none tracking-[0.01em] text-[#dcc7e7]/20">
            {item.number}
          </p>
        </article>
      ))}
    </div>
  );
}

function QuoteCard() {
  return (
    <aside className="relative overflow-hidden rounded bg-[radial-gradient(circle_at_25%_28%,#2f1d47_0%,#1f1035_62%,#1b0d24_100%)] px-8 py-9 shadow-[0_18px_38px_rgba(31,16,53,0.18)] md:px-11 md:py-12">
      <p className="font-hahmlet relative z-10 text-[18px] font-medium uppercase leading-[1.85] tracking-[0.01em] text-white md:text-xl">
        우리는 예수그리스도의 복음 때문에 교회가 세워졌고, 교회는 사람 살리는 사역을 위해
        최선을 다해 선교의 사명을 감당하고 있습니다.
      </p>
      <p className="pointer-events-none absolute left-5 top-0 font-serif text-[150px] leading-none text-white/10">
        &quot;
      </p>
    </aside>
  );
}

function IntroSection() {
  return (
    <section id="greeting" className="section-shell section-shell--narrow py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_325px] lg:items-start">
        <div>
          <SectionHeading
            label="about the church"
            title="교회는 사람을 살리는 곳입니다"
            description="A Church That Brings Life to People"
            titleAs="h2"
          />

          <div className="mt-8 max-w-[610px] space-y-4 text-[15px] leading-[1.85] tracking-[0.01em] text-[#33103f]/78">
            <p>
              행복이가득한 시온장로교회는 예수 그리스도의 복음 안에서 세워진 교회입니다.
              우리는 성령의 임재를 사모하며 예배하고, 복음의 능력으로 사람을 살리는 사역에
              마음을 모읍니다.
            </p>
            <p>
              이 땅의 한 영혼을 귀하게 여기며, 다음세대와 가정과 지역사회가 하나님의 사랑
              안에서 회복되도록 기도합니다. 국내외 선교와 섬김의 자리에서도 주님께 받은
              사명을 변함없이 감당하고자 합니다.
            </p>
            <p>
              누구든지 주님의 품 안에서 쉼과 회복을 누리고, 함께 예배하며 자라가는 공동체가
              되기를 소망합니다.
            </p>
          </div>

          <div className="mt-10 max-w-[430px]">
            <QuoteCard />
          </div>
        </div>

        <VisionList />
      </div>
    </section>
  );
}

function PastorSection() {
  return (
    <section className="bg-[#1f102f] py-16 text-white md:py-24">
      <div className="section-shell section-shell--narrow grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
        <div>
          <p
            className="text-xs uppercase leading-none tracking-[0.2em] text-[#c9a96e]"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
          >
            pastor&apos;s greeting
          </p>
          <h2 className="mt-5 font-hahmlet text-[28px] font-semibold uppercase leading-[1.55] tracking-[0.01em] text-white md:text-[36px]">
            행복이 가득한 시온장로교회에
            <br />
            오신 것을 환영합니다
          </h2>
          <div className="mt-8 space-y-4 text-[15px] leading-[1.9] tracking-[0.01em] text-white/68">
            <p>
              하나님의 은혜 가운데 예배하고, 복음으로 살아가는 공동체로 여러분을 초대합니다.
              우리 교회는 성령의 임재를 사모하며 말씀과 기도 안에서 한 영혼을 세워갑니다.
            </p>
            <p>
              삶의 자리마다 주님의 사랑이 흘러가도록, 선교와 섬김으로 지역과 열방을 품는
              교회가 되겠습니다.
            </p>
          </div>
          <div className="mt-8 text-sm leading-7 text-[#c9a96e]">
            <p>행복이가득한 시온장로교회</p>
            <p className="font-semibold text-white/82">담임목사 박완섭</p>
          </div>
        </div>

        <figure className="justify-self-center text-center">
          <div className="relative h-[360px] w-[300px] overflow-hidden bg-[#2a1739] md:h-[420px] md:w-[340px]">
            <Image
              src="/images/static-pages/greeting-pastor.png"
              alt="박완섭 담임목사"
              fill
              sizes="(min-width: 768px) 340px, 300px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-5">
            <p className="font-hahmlet text-base font-semibold text-white">박완섭 목사</p>
            <p
              className="mt-1 text-xs text-[#c9a96e]"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              Senior Pastor
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ElderTeamSection() {
  return (
    <section className="bg-[#56305f] py-14 text-white md:py-20">
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          label="serving elders"
          title="섬기는 이"
          description="Servants in Christ"
          className="[&_*]:text-white"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {elderTeam.map((person) => (
            <article
              key={`${person.label}-${person.name}`}
              className="flex items-center gap-5 rounded border border-white/10 bg-white/[0.08] px-5 py-6"
            >
              <div className="h-[88px] w-[72px] shrink-0 bg-[#d2c5db]" />
              <div className="min-w-0">
                <p
                  className="text-xs uppercase leading-none tracking-[0.16em] text-[#c9a96e]"
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                >
                  {person.label}
                </p>
                <h3 className="mt-3 font-hahmlet text-lg font-semibold leading-tight text-white">
                  {person.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinistryProgramSection() {
  return (
    <section className="bg-[#fcf8ff] py-16 md:py-24">
      <div className="section-shell section-shell--wide">
        <SectionHeading
          label="ministry program"
          title="사역적 핵심 프로그램"
          description="Key Ministry & Programs"
        />

        <div className="mt-12 grid border-l border-t border-[#5d3d8a]/20 bg-white md:grid-cols-2 lg:grid-cols-3">
          {ministryPrograms.map((program, index) => (
            <article
              key={program.title}
              className={`min-h-[178px] border-b border-r border-[#5d3d8a]/20 p-7 md:p-9 ${
                index === 0 ? "bg-[#fefdff] lg:col-span-1" : "bg-white"
              } ${index === ministryPrograms.length - 1 ? "lg:col-span-2" : ""}`}
            >
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8b6db5]/10 text-sm font-semibold text-[#8b6db5]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p
                    className="text-xs uppercase leading-none tracking-[0.16em] text-[#8b6db5]"
                    style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  >
                    {program.english}
                  </p>
                  <h3 className="mt-4 font-hahmlet text-xl font-semibold leading-tight tracking-[0.01em] text-[#220b29]">
                    {program.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.7] tracking-[0.01em] text-[#7a6890]">
                    {program.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GreetingStaticPage() {
  return (
    <main className="min-h-[520px] w-full overflow-x-hidden bg-white">
      <GreetingTabs />
      <IntroSection />
      <PastorSection />
      <ElderTeamSection />
      <MinistryProgramSection />
    </main>
  );
}
