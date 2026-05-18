import SectionHeading from "@/components/section-heading";
import ApplyForm from "@/features/static-pages/discipleship/components/apply-form";
import { cormorantGaramond } from "@/lib/fonts";

const overviewStats = [
  { title: "5주", label: "기간" },
  { title: "주 1회", label: "빈도" },
  { title: "60분", label: "수업시간" },
  { title: "무료", label: "교재" },
] as const;

const curriculumWeeks = [
  {
    week: "01",
    title: "하나님은 어떤 분이신가?",
    details: ["창조주 하나님", "사랑이신 하나님", "거룩하신 하나님"],
  },
  {
    week: "02",
    title: "인간은 어떤 존재인가?",
    details: ["하나님의 형상", "죄와 회복", "구원의 필요"],
  },
  {
    week: "03",
    title: "예수님은 누구신가?",
    details: ["그리스도", "십자가와 부활", "유일한 구원자"],
  },
  {
    week: "04",
    title: "교회란 무엇인가?",
    details: ["그리스도의 몸", "예배와 교제", "공동체 생활"],
  },
  {
    week: "05",
    title: "제자란 무엇인가?",
    details: ["말씀과 기도", "소그룹 정착", "섬김과 선교"],
  },
] as const;

const classStructure = [
  {
    minute: 10,
    title: "환영 및 교제",
    details: ["찬양", "지난주 나눔", "출석 확인"],
    widthClassName: "w-2/12",
    toneClassName: "bg-[#e4b96b]",
  },
  {
    minute: 30,
    title: "말씀 공부",
    details: ["교재 함께 읽기", "핵심 내용 설명", "질의응답"],
    widthClassName: "w-6/12",
    toneClassName: "bg-[#2a123c]",
  },
  {
    minute: 15,
    title: "나눔 및 적용",
    details: ["나눔 질문", "개인 적용", "실천 과제"],
    widthClassName: "w-3/12",
    toneClassName: "bg-[#8b6db5]",
  },
  {
    minute: 5,
    title: "기도",
    details: ["서로를 위한 기도", "파송 기도"],
    widthClassName: "w-1/12",
    toneClassName: "bg-[#d9d4df]",
  },
] as const;

const baptismMeaning = [
  "예수님과 함께 죽고 다시 사는 연합",
  "예수 그리스도를 나의 주님으로 고백하는 표지",
  "하나님의 가족이 되는 공개적인 신앙 고백",
  "교회 공동체의 정식 구성원으로 함께 서는 과정",
] as const;

const baptismSchedule = [
  "새가족 양육 과정 이후 별도 안내",
  "담임목사와 담당 교역자 상담 후 진행",
  "온 교회가 함께 축복하고 환영",
  "침례 후 공동체와 사역 연결",
] as const;

const applicationNotes = [
  "온라인 신청: 우측 양식 작성",
  "오프라인: 주일 예배 후 안내 데스크 방문",
  "담당자가 일정과 반 편성을 안내합니다.",
] as const;

function QuoteCard() {
  return (
    <aside className="relative w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-7 py-6">
      <p className="font-hahmlet relative z-10 text-[18px] font-normal uppercase leading-[30px] tracking-[0.01em] text-[#33103f]">
        &quot;그러므로 누구든지 나의 이 말을 듣고 행하는 자는 그 집을 반석 위에 지은
        지혜로운 사람 같으리니&quot;
      </p>
      <p className="font-suit relative z-10 mt-4 text-sm font-semibold uppercase leading-[1.4] tracking-[0.08em] text-[#510a75]">
        마태복음 7:24
      </p>
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-[-11px] text-[84px] leading-[84px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        &quot;
      </span>
    </aside>
  );
}

function OverviewStat({ title, label }: { title: string; label: string }) {
  return (
    <article className="flex min-h-[96px] items-center justify-center rounded-[8px] bg-[#f5f0f9] px-4 py-5 text-center">
      <div className="flex flex-col items-center gap-3 tracking-[0.04em]">
        <p className="font-hahmlet text-[22px] font-bold leading-none text-[#33103f]">
          {title}
        </p>
        <p className="type-body-md leading-none text-[#6F5576]">{label}</p>
      </div>
    </article>
  );
}

function CurriculumTable() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#8b6db5]/25 bg-white">
      <div className="grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[80px_minmax(0,1fr)]">
        <div className="flex h-10 items-center bg-[#2a123c] px-4">
          <p className="type-body-xs tracking-[0.08em] text-white md:type-body-md">주차</p>
        </div>
        <div className="flex h-10 items-center bg-[#2a123c] px-4 md:px-6">
          <p className="type-body-xs tracking-[0.08em] text-white md:type-body-md">주제 및 내용</p>
        </div>
      </div>

      {curriculumWeeks.map((week, index) => {
        const isLast = index === curriculumWeeks.length - 1;
        const surfaceClassName = index % 2 === 1 ? "bg-[#f5f0f9]" : "bg-white";

        return (
          <div
            key={week.week}
            className={`grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[80px_minmax(0,1fr)] ${surfaceClassName}`}
          >
            <div
              className={`flex items-center justify-center border-r border-[#8b6db5]/12 px-3 py-5 ${
                !isLast ? "border-b border-[#8b6db5]/18" : ""
              }`}
            >
              <span
                className={`${cormorantGaramond.className} type-title-sm font-bold leading-none tracking-[0.08em] text-[#e4b96b]`}
              >
                {week.week}
              </span>
            </div>
            <div className={`px-[18px] py-[14px] md:px-6 ${!isLast ? "border-b border-[#8b6db5]/18" : ""}`}>
              <p className="type-body-xs font-bold leading-[1.3] tracking-[-0.01em] text-[#33103f] md:type-body-md">
                {week.title}
              </p>
              <p className="type-body-xs mt-[6px] leading-[1.5] tracking-[0.02em] text-[#6F5576]">
                {week.details.join(" · ")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClassStructureCard({
  minute,
  title,
  details,
}: {
  minute: number;
  title: string;
  details: readonly string[];
}) {
  return (
    <article className="relative flex flex-col items-start gap-3 text-left">
      <div className="flex items-end gap-1">
        <span className="font-cormorant-infant text-[2rem] font-bold leading-none text-[#e4b96b]">
          {minute}
        </span>
        <span className="type-body-md pb-[2px] leading-none text-[#6F5576]">분</span>
      </div>
      <h3 className="type-body-md mb-1 font-bold leading-none tracking-[-0.01em] text-[#33103f]">
        {title}
      </h3>
      <div className="type-body-xs flex flex-col items-start gap-2 leading-none text-[#6F5576]">
        {details.map((detail) => (
          <p key={detail}>· {detail}</p>
        ))}
      </div>
    </article>
  );
}

function ClassStructureSection() {
  return (
    <section aria-labelledby="newcomer-care-structure-title" className="mt-20 md:mt-[68px]">
      <SectionHeading
        id="newcomer-care-structure-title"
        label="class structure"
        title="매주 60분 수업 구조"
        className="max-w-none"
      />

      <div className="mt-8">
        <div className="flex h-[9px] w-full overflow-hidden rounded-full">
          {classStructure.map((item, index) => {
            const edgeClassName =
              index === 0 ? "rounded-l-full" : index === classStructure.length - 1 ? "rounded-r-full" : "";

            return (
              <div
                key={item.title}
                className={`${item.widthClassName} ${item.toneClassName} ${edgeClassName}`}
              />
            );
          })}
        </div>

        <div className="mt-6 border-b border-[#8b6db5]/18 pb-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:hidden">
            {classStructure.map((item) => (
              <ClassStructureCard key={item.title} {...item} />
            ))}
          </div>

          <div className="hidden items-start justify-between md:flex">
            {classStructure.map((item, index) => (
              <div key={item.title} className="flex items-start">
                {index > 0 ? (
                  <span className="mr-9 mt-[30px] shrink-0 text-[#e4b96b]">-&gt;</span>
                ) : null}
                <ClassStructureCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <p className="font-suit type-label-md mt-4 leading-none tracking-[0.02em] text-[#6F5576]">
          총 <span className="font-bold text-[#33103f]">60분</span> · 소그룹 2-5명 또는
          일대일 진행
        </p>
      </div>
    </section>
  );
}

function BulletList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className={`type-body-xs flex gap-2 ${dark ? "text-white/80" : "text-[#6F5576]"}`}>
          <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#e4b96b]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DiscipleshipCareStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-10 pb-20 md:pt-16 md:pb-24">
      <section aria-labelledby="newcomer-care-intro-title">
        <SectionHeading
          id="newcomer-care-intro-title"
          label="5 weeks"
          title="새가족 양육"
          description="Newcomer Care"
          titleAs="h1"
        />
        <div className="mt-8">
          <QuoteCard />
        </div>
      </section>

      <section aria-labelledby="newcomer-care-overview-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="newcomer-care-overview-title"
          label="overview"
          title="과정 개요"
          className="max-w-none"
        />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {overviewStats.map((stat) => (
            <OverviewStat key={stat.label} {...stat} />
          ))}
        </div>

        <p className="type-body-md mt-[18px] max-w-[727px] font-normal leading-[1.7] tracking-[0.02em] text-[#4A3B5E]">
          새롭게 신앙을 시작하시는 분들을 위한 5주 집중 양육 과정입니다.
          <br className="hidden md:block" />
          소그룹 또는 일대일로 진행되며, 예배와 공동체 안에 안정적으로 정착하는 것을 돕습니다.
        </p>
      </section>

      <section aria-labelledby="newcomer-care-curriculum-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="newcomer-care-curriculum-title"
          label="curriculum"
          title="5주 교육 일정"
          className="max-w-none"
        />

        <div className="mt-8">
          <CurriculumTable />
        </div>
      </section>

      <ClassStructureSection />

      {/*
      <section aria-labelledby="newcomer-care-baptism-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="newcomer-care-baptism-title"
          label="baptism"
          title="침례 안내"
          className="max-w-none"
        />

        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
          <article className="py-2 md:py-8">
            <h3 className="type-body-md font-bold leading-none tracking-[0.02em] text-[#33103f]">
              침례의 의미
            </h3>
            <div className="mt-4">
              <BulletList items={baptismMeaning} />
            </div>
          </article>

          <article className="rounded-[8px] bg-[#2a123c] px-6 py-8">
            <h3 className="type-body-md font-bold leading-none tracking-[0.08em] text-[#e4b96b]">
              침례 일정
            </h3>
            <div className="mt-4">
              <BulletList items={baptismSchedule} dark />
            </div>
          </article>
        </div>
      </section>
      */}

      <section
        id="apply"
        className="mt-20 scroll-mt-32 md:mt-[68px] md:scroll-mt-36"
        aria-labelledby="newcomer-care-apply-title"
      >
        <div className="rounded-[8px] bg-[#2a123c] p-8 md:flex md:items-start md:justify-between md:gap-10 md:p-9">
          <div className="md:max-w-[300px]">
            <SectionHeading
              id="newcomer-care-apply-title"
              label="apply"
              title="새가족 양육 신청"
              className="max-w-none [&_h2]:text-white [&_p]:text-[#e4b96b] [&_span]:bg-[#e4b96b]"
            />

            <ul className="mt-6 flex flex-col gap-2">
              {applicationNotes.map((note) => (
                <li key={note} className="type-body-md flex items-start gap-1 text-white/80">
                  <span aria-hidden="true">·</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <ApplyForm />
        </div>
      </section>
    </main>
  );
}
