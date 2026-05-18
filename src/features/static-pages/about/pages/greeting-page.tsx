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
    english: "Worship",
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
    <div className="grid w-full gap-4">
      {visionItems.map((item) => (
        <article
          key={item.number}
          className="relative overflow-hidden rounded border border-white/5 bg-[#2a123c] px-7 py-[1.125rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <p className="type-label-md whitespace-nowrap leading-none text-white/50">
            {item.english}
          </p>
          <h3 className="type-title-sm mt-2 leading-none tracking-[0.01em] text-white">
            {item.title}
          </h3>
          <p className="type-display-counter pointer-events-none absolute left-4 -top-3.5 text-[64px] leading-none tracking-[0.01em] text-[#4d1367]/10">
            {item.number}
          </p>
        </article>
      ))}
    </div>
  );
}

function QuoteCard() {
  return (
    <aside className="relative w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-7 py-6">
      <p className="type-quote-md relative z-10 uppercase text-[#33103f]">
        우리는 예수그리스도의 복음 때문에 교회가 세워졌고, 교회는 사람 살리는 사역을 위해
        최선을 다해 선교의 사명을 감당하고 있습니다.
      </p>
      <span
        className="absolute left-[19px] top-[-11px] text-[84px] leading-[84px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        aria-hidden="true"
      >
        &quot;
      </span>
    </aside>
  );
}

function IntroSection() {
  return (
    <section id="greeting" className="section-shell section-shell--narrow py-14 md:py-20">
      <div className="flex flex-col items-start gap-10 md:gap-12">
        <SectionHeading
          label="about the church"
          title={"교회는 사람을\n살리는 곳입니다"}
          description="A Church That Brings Life to People"
          titleAs="h2"
          className="max-w-none max-[430px]:[&_h2]:whitespace-pre-line min-[431px]:[&_h2]:whitespace-normal"
        />

        <div className="flex w-full flex-col gap-10">
          <div className="grid w-full gap-10 min-[660px]:grid-cols-[minmax(0,1fr)_max-content] min-[660px]:items-start min-[660px]:gap-6 md:grid-cols-[minmax(0,1fr)_325px] md:gap-8 lg:gap-20">
            <div className="type-body-md flex min-w-0 max-w-[610px] flex-col gap-8 text-[#4A3B5E]">
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

            <div className="hidden w-full self-start justify-self-stretch min-[660px]:block min-[660px]:w-max min-[660px]:justify-self-end md:w-[325px]">
              <VisionList />
            </div>
          </div>

          <div className="w-full lg:max-w-[calc(100%-325px-5rem)]">
            <QuoteCard />
          </div>

          <div className="w-full min-[660px]:hidden">
            <VisionList />
          </div>
        </div>
      </div>
    </section>
  );
}

function PastorSection() {
  const heading = (
    <SectionHeading
      label="pastor's greeting"
      title={
        <>
          행복이 가득한
          <br className="hidden max-[430px]:block" /> 시온장로교회에
          <br />
          오신 것을 환영합니다
        </>
      }
      description="A Church Filled With Grace and Joy"
      className="w-full max-w-none [&_h2]:text-white [&>div:first-child_span]:bg-[#c9a96e] [&_p]:text-[#c9a96e]"
    />
  );

  return (
    <section className="bg-[#1e1035] py-16 text-white md:py-32">
      <div className="section-shell section-shell--narrow flex flex-col gap-12">
        <div className="min-[1280px]:hidden">{heading}</div>

        <div className="grid gap-12 min-[660px]:grid-cols-[minmax(0,1fr)_300px] min-[660px]:items-center min-[660px]:gap-8 lg:gap-16 min-[1280px]:grid-cols-[minmax(0,1fr)_360px] min-[1280px]:gap-20">
          <div className="flex flex-col gap-[60px]">
            <div className="hidden min-[1280px]:block">{heading}</div>
            <div className="type-body-md flex flex-col gap-8 text-white/80">
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
                하나님은 지금 이 순간도 말씀하십니다. &quot;내가 여기 있나이다&quot; — 라고 응답할
                한 사람을 찾고 계십니다. 부흥은 멀리 있지 않습니다. 당신이 여기 있는 것이, 그
                시작입니다.
              </p>
            </div>
          </div>

          <figure className="flex h-full flex-col justify-self-center text-center min-[660px]:justify-self-end">
            <div className="relative h-[360px] w-[300px] shrink-0 overflow-hidden bg-[#f2ebf6] min-[1280px]:h-full min-[1280px]:min-h-[420px] min-[1280px]:w-[340px] min-[1280px]:flex-1">
              <Image
                src="/images/greeting/pastor_main.png"
                alt="박완섭 담임목사"
                fill
                sizes="(min-width: 768px) 340px, 300px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-5">
              <p className="type-title-xs text-white">박완섭 목사</p>
              <p className="type-label-xl mt-1 italic text-[#c9a96e]">
                Senior Pastor
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ElderTeamSection() {
  return (
    <section className="bg-[#3f2551] py-16 text-white md:py-[7rem]">
      <div className="section-shell section-shell--narrow min-[551px]:max-[880px]:grid min-[551px]:max-[880px]:grid-cols-[220px_minmax(0,1fr)] min-[551px]:max-[880px]:items-start min-[551px]:max-[880px]:gap-8">
        <div>
          <SectionHeading
            label="church leaders"
            title="섬기는 이"
            description="Those Who Serve"
            className="[&_*]:text-white"
          />
        </div>

        <div className="mt-10 grid min-w-0 gap-4 min-[881px]:grid-cols-3 min-[551px]:max-[880px]:mt-0">
          {elderTeam.map((person) => (
            <article
              key={`${person.label}-${person.name}`}
              className="flex min-w-0 items-center gap-5 rounded border border-white/10 bg-[#56385E] px-5 py-6"
            >
              <div className="h-[88px] w-[72px] shrink-0 bg-[#d2c5db]" />
              <div className="min-w-0">
                <p
                  className="type-label-md leading-none text-[#c9a96e]"
                  style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                >
                  {person.label}
                </p>
                <h3 className="type-title-sm mt-3 leading-tight text-white">
                  {person.name}
                </h3>
                <p className="type-caption-md mt-2 text-white/80">{person.role}</p>
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
      className={`border border-[#5d3d8a]/15 bg-white ${isStacked ? "flex items-start justify-center px-7 py-9 md:px-10 md:py-11" : "flex items-center px-7 py-7 md:px-10 md:py-7"
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
                  className="type-label-md leading-none text-[#928397]"
                  style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                >
                  {program.english}
                </p>
                <h3 className="type-title-md mt-2 leading-tight tracking-[0.01em] text-[#33103f]">
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
                className="type-label-md leading-none text-[#928397]"
                style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
              >
                {program.english}
              </p>
              <h3 className="type-title-md mt-2 leading-tight tracking-[0.01em] text-[#33103f]">
                {program.title}
              </h3>
            </>
          )}
          <p className={`type-caption-md text-[#6F5576] ${isStacked ? "" : "mt-4"}`}>
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
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          label="ministry program"
          title="사역적 핵심 프로그램"
          description="Key Ministry & Programs"
        />

        <div className="mt-12 flex flex-col gap-0.5">
          <div className="hidden gap-0.5 xl:grid xl:grid-cols-[549fr_649fr] xl:items-end">
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

          <div className="grid gap-0.5 min-[660px]:max-[767px]:hidden xl:hidden">
            <div className="grid gap-0.5 md:grid-cols-[minmax(0,1.18fr)_minmax(0,1.82fr)] md:items-stretch">
              <div className="flex flex-col gap-0.5">
                <div className="h-32 bg-[#9A8CA7] max-[659px]:hidden" />
                <MinistryProgramCard program={ministryPrograms[0]} className="min-h-[124px] flex-1" />
              </div>
              <div className="grid gap-0.5">
                <MinistryProgramCard
                  program={ministryPrograms[1]}
                  className="bg-white"
                />
                <MinistryProgramCard
                  program={ministryPrograms[2]}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="grid gap-0.5 md:grid-cols-2 min-[768px]:max-[880px]:hidden">
              <MinistryProgramCard
                program={ministryPrograms[3]}
                className="min-h-[180px] bg-white"
              />
              <MinistryProgramCard
                program={ministryPrograms[4]}
                className="min-h-[180px] bg-white"
              />
            </div>
          </div>

          <div className="hidden gap-0.5 min-[660px]:max-[767px]:grid xl:hidden">
            <div className="h-24 bg-[#9A8CA7]" />
            <div className="grid grid-cols-2 gap-0.5">
              <MinistryProgramCard program={ministryPrograms[1]} className="min-h-[164px] bg-white" />
              <MinistryProgramCard program={ministryPrograms[0]} className="min-h-[164px] bg-white" />
            </div>
            <MinistryProgramCard program={ministryPrograms[2]} className="min-h-[164px] bg-white" />
            <div className="grid grid-cols-2 gap-0.5">
              <MinistryProgramCard program={ministryPrograms[3]} className="min-h-[164px] bg-white" />
              <MinistryProgramCard program={ministryPrograms[4]} className="min-h-[164px] bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-0.5">
              <MinistryProgramCard program={ministryPrograms[5]} className="min-h-[164px] bg-white" />
              <MinistryProgramCard program={ministryPrograms[6]} className="min-h-[164px] bg-white" />
            </div>
            <div className="h-24 bg-[#D2C5DB]" />
          </div>

          <div className="hidden gap-0.5 min-[768px]:max-[880px]:grid min-[768px]:max-[880px]:grid-cols-2 xl:hidden">
            <div className="grid gap-0.5">
              <MinistryProgramCard
                program={ministryPrograms[3]}
                className="min-h-[160px] bg-white"
              />
              <MinistryProgramCard program={ministryPrograms[5]} className="min-h-[140px]" />
              <MinistryProgramCard program={ministryPrograms[6]} className="min-h-[156px] md:py-9" />
            </div>
            <div className="grid gap-0.5">
              <MinistryProgramCard
                program={ministryPrograms[4]}
                className="min-h-[132px] bg-white"
              />
              <div className="min-h-[180px] bg-[#D2C5DB]" />
            </div>
          </div>

          <div className="hidden gap-0.5 xl:grid xl:grid-cols-3">
            <MinistryProgramCard program={ministryPrograms[3]} className="min-h-[140px]" />
            <MinistryProgramCard program={ministryPrograms[4]} className="min-h-[140px]" />
            <MinistryProgramCard program={ministryPrograms[5]} className="min-h-[140px]" />
          </div>
          <div className="grid gap-0.5 min-[660px]:max-[880px]:hidden md:grid-cols-3 xl:hidden">
            <div className="contents min-[768px]:max-[880px]:grid min-[768px]:max-[880px]:gap-0.5">
              <MinistryProgramCard program={ministryPrograms[5]} className="min-h-[140px]" />
              <MinistryProgramCard program={ministryPrograms[6]} className="min-h-[156px] md:py-9" />
            </div>
            <div className="min-h-[120px] bg-[#D2C5DB] max-[659px]:hidden lg:min-h-full" />
          </div>

          <div className="hidden gap-0.5 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
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
