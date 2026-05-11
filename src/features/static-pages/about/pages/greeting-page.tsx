import Image from "next/image";

import SectionHeading from "@/components/section-heading";

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
    label: "Evangelist",
    name: "안승희 전도사",
    role: "전도 및 교육 사역",
  },
  {
    label: "2040 Ministry",
    name: "홍성철 목사",
    role: "2040 다음세대 사역",
  },
];

const ministryPrograms = [
  {
    english: "Next Generation",
    title: "다음세대 2040",
    description: "미래 세대와 2040을 향한 집중적인 부흥 사역",
    icon: "/images/static-pages/diversity_4.png",
  },
  {
    english: "Worship Ministry",
    title: "예배사역",
    description: "말씀과 기도 중심의 예배, 하나님의 임재를 경험하는 성령충만한 예배 공동체",
    icon: "/images/static-pages/church.png",
  },
  {
    english: "Mission",
    title: "선교 사역",
    description:
      "국내 미자립 교회 지원, 섬 선교, 필리핀·미얀마·태국·말레이시아 등 해외선교까지 — 변함없이 20년을 이어온 선교 사명",
    icon: "/images/static-pages/globe_book.png",
  },
  {
    english: "Media & Culture",
    title: "미디어 · 문화사역",
    description: "찬양팀, 브라스밴드, 디지털 영상, SNS를 통한 복음의 문화적 확산",
    icon: "/images/static-pages/subscriptions.png",
  },
  {
    english: "Training",
    title: "훈련사역",
    description: "소그룹과 제자양육으로 깊이 있는 신앙 성장을 이룹니다",
    icon: "/images/static-pages/person_text.png",
  },
  {
    english: "Business Mission",
    title: "비즈니스선교",
    description: "만나쩝쩝, 경영컨설팅, 복음경제영성을 통한 일터 선교",
    icon: "/images/static-pages/work.png",
  },
  {
    english: "Administration",
    title: "기획과 행정",
    description: "전문성과 투명성을 갖춘 교회 행정으로 신뢰의 공동체를 세웁니다",
    icon: "/images/static-pages/browse.png",
  },
];

function VisionList() {
  return (
    <div className="grid gap-4 sm:max-w-[360px]">
      {visionItems.map((item) => (
        <article
          key={item.number}
          className="relative overflow-hidden rounded border border-white/5 bg-[#403254] px-7 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <p className="type-card-label leading-none tracking-[0.18em] text-[#faf0ff]/30">
            {item.english}
          </p>
          <h3 className="type-card-title mt-1 text-lg leading-none tracking-[0.01em] text-[#f5f0f6] md:text-lg">
            {item.title}
          </h3>
          <p className="type-display-counter pointer-events-none absolute left-4 -top-3.5 text-[64px] leading-none tracking-[0.01em] text-[#dcc7e7]/10">
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
      <p className="type-section-subtitle relative z-10 text-[18px] uppercase leading-[2] tracking-[0.01em] text-white md:text-xl md:leading-[35px]">
        우리는 예수그리스도의 복음 때문에 교회가 세워졌고, 교회는 사람 살리는 사역을 위해
        최선을 다해 선교의 사명을 감당하고 있습니다.
      </p>
      <p
        className="pointer-events-none absolute left-5 top-0 text-[160px] leading-[160px] text-white/10"
        style={{
          fontFamily: "var(--font-cormorant-garamond), serif",
          fontStyle: "normal",
        }}
      >
        &quot;
      </p>
    </aside>
  );
}

function IntroSection() {
  return (
    <section id="greeting" className="section-shell section-shell--narrow py-14 md:py-20">
      <div className="flex flex-col items-start gap-10 md:gap-12">
        <SectionHeading
          label="about the church"
          title="교회는 사람을 살리는 곳입니다"
          description="A Church That Brings Life to People"
          titleAs="h2"
          className="max-w-none"
        />

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_325px] lg:items-start lg:gap-20">
          <div className="flex flex-col gap-6">
            <div className="type-body flex max-w-[610px] flex-col gap-8 text-[#33103f]/78">
              <p>
                행복이 가득한 시온교회는 사람 살리는 일에 최선을 다하는 교회입니다. 우리가
                믿는 복음이 진짜복음이라면 우리는 복음의 치료제를 가지고 죽어가는 영혼을 살리는
                일에 목숨을 거는 교회입니다.
              </p>
              <p>
                한 영혼이 주님께 돌아오는 일, 목마른 영혼에게 복음의 생수를 나누어 주는 일,
                복음이 필요한 곳에 우리를 불러 준다면 최선을 다해 달려가는 교회입니다.
              </p>
              <p>
                누군가 교회를 향해 교회의 존재이유와 어떤 사역을 하느냐고 물어본다면 우리는
                이렇게 말할 수 있습니다.
              </p>
            </div>

            <div className="mt-10 w-full">
              <QuoteCard />
            </div>
          </div>

          <div className="self-start justify-self-center lg:justify-self-end">
            <VisionList />
          </div>
        </div>
      </div>
    </section>
  );
}

function PastorSection() {
  return (
    <section className="bg-[#1f102f] py-16 text-white md:py-32">
      <div className="section-shell section-shell--narrow grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-[60px]">
          <SectionHeading
            label="pastor's greeting"
            title={"행복이 가득한 시온 장로교회에\n오신 것을 환영합니다"}
            description="A Church Filled With Grace and Joy"
            className="w-full max-w-none [&_h2]:whitespace-pre-line [&_h2]:text-white lg:[&_h2]:whitespace-pre [&_p]:text-[#c9a96e] [&_span]:bg-[#c9a96e]"
          />
          <div className="type-body flex flex-col gap-8 text-white/68">
            <p>
              하나님은 프로그램이 아니라 사람을 찾으십니다. 화려한 무대가 아니라, 무릎 꿇은 한
              사람의 기도를 찾으십니다. 저희 시온교회는 그 믿음 하나로 1997년 문을 열었습니다.
            </p>
            <p>
              지난 30년, 부흥을 구하며 기도했고, 성령의 일하심을 붙들며 이 자리까지
              걸어왔습니다. 이제 우리의 눈은 다음세대 2040을 향합니다. 한 사람의 변화가 가정을
              살리고, 교회를 깨우고, 이 세대를 바꿀 수 있기 때문입니다.
            </p>
            <p>
              하나님은 지금 이 순간도 말씀하십니다. &quot;내가 여기 있나이다&quot; — <br /> 라고 응답할
              한 사람을 찾고 계십니다. 부흥은 멀리 있지 않습니다. 당신이 여기 있는 것이, 그
              시작입니다.
            </p>
          </div>
        </div>

        <figure className="flex h-full flex-col justify-self-center text-center">
          <div className="relative h-full min-h-[360px] w-[300px] flex-1 overflow-hidden bg-[#2a1739] md:min-h-[420px] md:w-[340px]">
            <Image
              src="/images/greeting/pastor_main.png"
              alt="박완섭 담임목사"
              fill
              sizes="(min-width: 768px) 340px, 300px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-5">
            <p className="type-card-title text-base text-white md:text-base">박완섭 목사</p>
            <p
              className="type-caption mt-1 text-base italic text-[#c9a96e]"
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
    <section className="bg-[#56305f] py-16 text-white md:py-[7rem]">
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          label="church leaders"
          title="섬기는 이"
          description="Those Who Serve"
          className="[&_*]:text-white"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {elderTeam.map((person) => (
            <article
              key={`${person.label}-${person.name}`}
              className="flex items-center gap-5 rounded border border-white/10 bg-[#56385E] px-5 py-6"
            >
              <div className="h-[88px] w-[72px] shrink-0 bg-[#d2c5db]" />
              <div className="min-w-0">
                <p
                  className="type-card-label text-xs leading-none tracking-[0.16em] text-[#c9a96e]"
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                >
                  {person.label}
                </p>
                <h3 className="type-card-title mt-3 text-lg leading-tight text-white md:text-lg">
                  {person.name}
                </h3>
                <p className="type-caption mt-1 text-sm leading-6 text-white/60">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MinistryProgramCard({
  program,
  layout = "horizontal",
  className = "",
}: {
  program: (typeof ministryPrograms)[number];
  layout?: "horizontal" | "stacked";
  className?: string;
}) {
  const isStacked = layout === "stacked";

  return (
    <article
      className={`border border-[#5d3d8a]/20 bg-[#fefdff] ${isStacked ? "flex items-start justify-center px-7 py-9 md:px-10 md:py-11" : "flex items-center px-7 py-7 md:px-10 md:py-7"
        } ${className}`}
    >
      <div className={isStacked ? "flex min-w-0 flex-col gap-9" : "flex min-w-0 gap-7"}>
        <div className={isStacked ? "flex items-center gap-7" : "relative h-12 w-12 shrink-0"}>
          {isStacked ? (
            <>
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src={program.icon}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p
                  className="type-card-label text-xs leading-none tracking-[0.16em] text-[#8b6db5]"
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                >
                  {program.english}
                </p>
                <h3 className="type-card-title mt-4 text-xl leading-tight tracking-[0.01em] text-[#220b29] md:text-xl">
                  {program.title}
                </h3>
              </div>
            </>
          ) : (
            <Image
              src={program.icon}
              alt=""
              fill
              sizes="48px"
              className="object-contain"
            />
          )}
        </div>

        <div className="min-w-0">
          {!isStacked && (
            <>
              <p
                className="type-card-label text-xs leading-none tracking-[0.16em] text-[#8b6db5]"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              >
                {program.english}
              </p>
              <h3 className="type-card-title mt-4 text-xl leading-tight tracking-[0.01em] text-[#220b29] md:text-xl">
                {program.title}
              </h3>
            </>
          )}
          <p className={`type-caption text-sm leading-[22px] tracking-[0.01em] text-[#7a6890] ${isStacked ? "" : "mt-4"}`}>
            {program.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function MinistryProgramSection() {
  return (
    <section className="bg-[#fcf8ff] py-16 md:pb-48 md:pt-32">
      <div className="section-shell section-shell--wide">
        <SectionHeading
          label="ministry program"
          title="사역적 핵심 프로그램"
          description="Key Ministry & Programs"
        />

        <div className="mt-12 flex flex-col gap-0.5">
          <div className="grid gap-0.5 xl:grid-cols-[549fr_649fr] xl:items-end">
            <div className="flex flex-col gap-0.5 xl:h-[254px]">
              <div className="h-24 bg-[#9A8CA7] xl:h-[108px]" />
              <MinistryProgramCard program={ministryPrograms[0]} className="min-h-[146px] flex-1" />
            </div>
            <div className="grid gap-0.5 md:grid-cols-2 xl:h-[254px]">
              <MinistryProgramCard
                program={ministryPrograms[1]}
                layout="stacked"
                className="min-h-[220px] bg-white xl:min-h-0"
              />
              <MinistryProgramCard
                program={ministryPrograms[2]}
                layout="stacked"
                className="min-h-[220px] bg-white xl:min-h-0"
              />
            </div>
          </div>

          <div className="grid gap-0.5 md:grid-cols-3">
            <MinistryProgramCard program={ministryPrograms[3]} className="min-h-[140px]" />
            <MinistryProgramCard program={ministryPrograms[4]} className="min-h-[140px]" />
            <MinistryProgramCard program={ministryPrograms[5]} className="min-h-[140px]" />
          </div>

          <div className="grid gap-0.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <MinistryProgramCard program={ministryPrograms[6]} className="min-h-[156px] md:py-9" />
            <div className="min-h-[120px] bg-[#D2C5DB] lg:min-h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GreetingStaticPage() {
  return (
    <main className="min-h-[520px] w-full overflow-x-hidden bg-white">
      <IntroSection />
      <PastorSection />
      <ElderTeamSection />
      <MinistryProgramSection />
    </main>
  );
}
