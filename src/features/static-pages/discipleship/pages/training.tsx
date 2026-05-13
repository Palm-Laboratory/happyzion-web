import SectionHeading from "@/components/section-heading";
import { cormorantGaramond } from "@/lib/fonts";

const discipleshipPrinciples = [
  {
    number: "01",
    englishTitle: "Repetition",
    title: "반복",
    details: ["듣기", "묵상", "나눔", "삶으로 실천"],
  },
  {
    number: "02",
    englishTitle: "Concentration",
    title: "집중",
    details: ["소그룹 중심", "말씀과 기도", "한 주제에 깊이 있게"],
  },
  {
    number: "03",
    englishTitle: "Sharing",
    title: "실천과 나눔",
    details: ["배운 것을 즉시 적용", "다른 사람을 세움", "섬김으로 연결"],
  },
] as const;

const roadmapItems = [
  {
    label: "NEWCOMER",
    duration: "5주",
    title: "새가족 과정",
    details: ["새가족 안내", "새가족 양육", "공동체 정착"],
  },
  {
    label: "STEP 1",
    duration: "12주",
    title: "믿음의 기초",
    details: ["구원의 확신", "말씀과 기도", "기본 신앙생활"],
  },
  {
    label: "STEP 2",
    duration: "12주",
    title: "신앙 성장",
    details: ["가정과 공동체", "은사와 섬김", "소그룹 훈련"],
  },
  {
    label: "STEP 3",
    duration: "12주",
    title: "신앙 성숙",
    details: ["일터와 세상", "선교적 삶", "다음세대와 열방"],
  },
  {
    label: "GOAL",
    duration: "평생",
    title: "사역자 / 평생 제자",
    details: ["복음으로 사람을 살리는 제자", "다른 사람을 세우는 삶"],
  },
] as const;

const curriculumStages = [
  {
    level: "1단계",
    title: "믿음의 기초",
    duration: "12주",
    target: "새가족 양육 수료자",
    objective: "구원의 확신과 기본 신앙생활 확립",
    courses: [
      "하나님은 어떤 분이신가?",
      "거듭남 - 새로운 피조물",
      "성경 - 하나님의 말씀",
      "기도 - 하나님과의 대화",
      "예배 - 하나님을 만나는 시간",
      "교제 - 함께하는 믿음",
      "성령 - 보혜사 하나님",
      "순종 - 사랑의 증거",
      "시험과 유혹",
      "영적 전쟁",
      "헌신과 청지기",
      "제자의 삶",
    ],
    requirements: ["10주 이상 출석", "매주 과제 완수", "2단계 신청"],
  },
  {
    level: "2단계",
    title: "신앙 성장",
    duration: "12주",
    target: "1단계 수료자",
    objective: "그리스도 안에서 균형 잡힌 성장",
    courses: [
      "예수님을 닮아가는 삶",
      "영적 훈련",
      "청지기의 삶",
      "그리스도인의 가정",
      "자녀와 다음세대",
      "부모 공경과 효도",
      "형제자매와 공동체",
      "은사와 부르심",
      "섬김의 리더십",
      "교회의 사명",
      "갈등 해결과 화해",
      "성장하는 제자",
    ],
    requirements: ["10주 이상 출석", "경건의 시간 정착", "교회 섬김 참여"],
  },
  {
    level: "3단계",
    title: "신앙 성숙",
    duration: "12주",
    target: "2단계 수료자",
    objective: "세상 속의 빛과 소금으로 살아가는 사명자",
    courses: [
      "빛과 소금",
      "일터에서의 신앙",
      "사회적 책임",
      "창조 세계 돌봄",
      "한국교회와 민족 복음화",
      "다음세대 세우기",
      "다문화와 이웃 사랑",
      "통일과 화해",
      "세계 선교의 비전",
      "고난과 소망",
      "재림과 영원",
      "평생 제자도",
    ],
    requirements: ["10주 이상 출석", "졸업 간증문 작성", "선교적 삶 실천"],
  },
] as const;

const classStructure = [
  {
    minute: 10,
    title: "환영 및 교제",
    details: ["찬양", "지난주 나눔", "출석 확인"],
    widthClassName: "w-2/12",
    toneClassName: "bg-[#d5b16c]",
  },
  {
    minute: 30,
    title: "말씀 공부",
    details: ["교재 함께 읽기", "핵심 내용 설명", "질의응답"],
    widthClassName: "w-6/12",
    toneClassName: "bg-[#33103f]",
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

const multiplicationStages: ReadonlyArray<{
  year: string;
  generation: string;
  items: readonly string[];
  highlight?: boolean;
}> = [
  { year: "1년차", generation: "1", items: ["제자훈련 이수", "순종하는 삶"] },
  { year: "2년차", generation: "2", items: ["리더 섬김", "제자 2-3명 양육"] },
  { year: "3년차", generation: "3", items: ["다음 리더 세움", "공동체 확장"], highlight: true },
  { year: "4년차", generation: "4", items: ["사역 재생산", "선교적 삶"], highlight: true },
] as const;

const annualSchedule = [
  ["1기", "1-3월"],
  ["2기", "4-6월"],
  ["3기", "7-9월"],
  ["4기", "10-12월"],
] as const;

const weeklySchedule = [
  ["주일 반", "예배 후"],
  ["주중 반", "반별 협의"],
] as const;

const applicationNotes = ["모든 교재 무료 제공", "이전 수료 과정 확인 후 단계 배정", "담당자가 반 편성을 안내합니다."] as const;

function QuoteCard() {
  return (
    <aside className="relative overflow-hidden rounded-[8px] bg-[radial-gradient(circle_at_20%_20%,#4a2458_0%,#33103f_58%,#24052e_100%)] px-6 py-7 shadow-[0_18px_38px_rgba(51,16,63,0.16)] md:px-9 md:py-9">
      <p className="type-quote relative z-10 text-white/90">
        또 네가 많은 증인 앞에서 내게 들은 바를 충성된 사람들에게 부탁하라 그들이 또 다른
        사람들을 가르칠 수 있으리라
      </p>
      <p className="type-caption relative z-10 mt-5 font-semibold text-[#d5b16c]">
        디모데후서 2:2
      </p>
    </aside>
  );
}

function PrincipleItem({
  number,
  englishTitle,
  title,
  details,
}: {
  number: string;
  englishTitle: string;
  title: string;
  details: readonly string[];
}) {
  return (
    <article className="flex gap-4 border-b border-[#8b6db5]/18 py-5 first:pt-0 last:border-b-0 last:pb-0 md:gap-7">
      <div className="flex items-start pt-2">
        <span
          className={`${cormorantGaramond.className} text-[2rem] leading-none tracking-[0.08em] text-[#d5b16c] md:text-[2.25rem]`}
        >
          {number}
        </span>
      </div>

      <div className="border-l border-[#8b6db5]/18 pl-4 md:pl-6">
        <p
          className={`${cormorantGaramond.className} type-body-small tracking-[0.12em] text-[#33103f]/54`}
        >
          {englishTitle}
        </p>
        <h3 className="font-hahmlet mt-2 text-[1.25rem] font-bold leading-none tracking-[0.02em] text-[#33103f]">
          {title}
        </h3>
        <p className="type-body-small mt-2 leading-[1.7] tracking-[0.02em] text-[#33103f]/62">
          {details.join(" · ")}
        </p>
      </div>
    </article>
  );
}

function Roadmap() {
  return (
    <div>
      <SectionHeading
        id="disciples-roadmap-title"
        label="full roadmap"
        title="전체 로드맵"
        className="max-w-none"
      />

      <div className="relative mt-8">
        <span className="absolute bottom-[22px] left-[21px] top-[22px] w-px bg-[#8b6db5]/20 md:left-[23px]" />

        <div className="space-y-7 md:space-y-8">
          {roadmapItems.map((item, index) => (
            <div key={item.label} className="relative flex gap-5 md:gap-7">
              <div className="relative z-10 flex w-[44px] shrink-0 justify-center md:w-[48px]">
                <span
                  className={`flex h-[44px] w-[44px] items-center justify-center rounded-full md:h-[48px] md:w-[48px] ${
                    index === 0 || index === roadmapItems.length - 1
                      ? "bg-[#d5b16c] text-[#33103f]"
                      : "border-[2px] border-[#d5b16c] bg-[#33103f] text-[#d5b16c]"
                  }`}
                >
                  <span
                    className={`${cormorantGaramond.className} text-[1.4rem] font-bold leading-none tracking-[0.08em]`}
                  >
                    {index === 0 ? "N" : index === roadmapItems.length - 1 ? "G" : `0${index}`}
                  </span>
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-3 md:pt-2">
                <p className="type-label uppercase tracking-[0.18em] text-[#33103f]/54 md:type-body-small">
                  {item.label}
                  <span className="mx-3 tracking-[0.12em]">·</span>
                  {item.duration}
                </p>
                <article
                  className={`mt-3 rounded-[8px] border px-5 py-5 shadow-[0_2px_10px_rgba(51,16,63,0.04)] md:px-7 ${
                    index === roadmapItems.length - 1
                      ? "border-[#d5b16c] bg-[#d5b16c] text-[#33103f]"
                      : "border-[#8b6db5]/18 bg-white"
                  }`}
                >
                  <h3 className="type-card-title font-bold leading-none tracking-[-0.02em] text-[#33103f]">
                    {item.title}
                  </h3>
                  <p className="type-body-small mt-3 leading-[1.6] tracking-[0.02em] text-[#33103f]/62">
                    {item.details.join(" · ")}
                  </p>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[8px] bg-[#fffcf8] px-5 py-5 text-center">
        <p className="type-body leading-[1.6] tracking-[0.02em] text-[#33103f]/62">
          총 기간: 5주 + 36주 =
          <span className="font-bold text-[#33103f]"> 41주</span>
          <span className="mx-3">·</span>
          목표: <span className="font-bold text-[#33103f]">삶으로 이어지는 제자도</span>
        </p>
      </div>
    </div>
  );
}

function CurriculumStageCard({
  stage,
  index,
}: {
  stage: (typeof curriculumStages)[number];
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#8b6db5]/24 bg-white">
      <div className={`${index === 0 ? "bg-[#33103f]" : "bg-[#fffcf8]"} px-5 py-5 md:px-6`}>
        <p className={`type-label tracking-[0.18em] ${index === 0 ? "text-[#d5b16c]" : "text-[#8b6db5]"}`}>
          {stage.level} · {stage.duration}
        </p>
        <h3 className={`type-card-title mt-2 font-bold ${index === 0 ? "text-white" : "text-[#33103f]"}`}>
          {stage.title}
        </h3>
        <p className={`type-body-small mt-3 ${index === 0 ? "text-white/72" : "text-[#33103f]/62"}`}>
          대상: {stage.target}
          <br />
          목표: {stage.objective}
        </p>
      </div>

      <div className="grid grid-cols-[56px_minmax(0,1fr)]">
        {stage.courses.map((course, courseIndex) => (
          <div key={course} className="contents">
            <div className="flex items-center justify-center border-r border-t border-[#8b6db5]/14 px-3 py-3">
              <span
                className={`${cormorantGaramond.className} text-[1.1rem] font-bold leading-none tracking-[0.08em] text-[#d5b16c]`}
              >
                {String(courseIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="border-t border-[#8b6db5]/14 px-4 py-3">
              <p className="type-body-small font-medium leading-[1.5] tracking-[0.02em] text-[#33103f]">
                {course}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-l-[3px] border-[#d5b16c] bg-[#fffcf8] px-5 py-4">
        <p className="type-body-small font-bold leading-none tracking-[0.02em] text-[#33103f]">
          수료 요건
        </p>
        <p className="type-body-small mt-3 leading-[1.7] tracking-[0.02em] text-[#33103f]/62">
          {stage.requirements.join(" · ")}
        </p>
      </div>
    </article>
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
        <span
          className={`${cormorantGaramond.className} type-section-title font-bold leading-none text-[#d5b16c]`}
        >
          {minute}
        </span>
        <span className="type-body pb-[2px] leading-none text-[#33103f]/62">분</span>
      </div>
      <h3 className="type-body font-bold leading-none tracking-[-0.01em] text-[#33103f]">
        {title}
      </h3>
      <div className="type-body-small mt-2 flex flex-col items-start gap-2 leading-none text-[#33103f]/62 md:mt-0 md:gap-1">
        {details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
    </article>
  );
}

function ClassStructureSection() {
  return (
    <section aria-labelledby="disciples-class-structure-title" className="mt-20 md:mt-[68px]">
      <SectionHeading
        id="disciples-class-structure-title"
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
                  <span className="mr-9 mt-[30px] shrink-0 text-[#d5b16c]">-&gt;</span>
                ) : null}
                <ClassStructureCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <p className="type-label mt-4 leading-none tracking-[0.02em] text-[#33103f]/62">
          총 <span className="font-bold text-[#33103f]">60분</span> · 소그룹 중심 진행
        </p>
      </div>
    </section>
  );
}

function GenerationCard({
  generation,
  items,
  highlight = false,
}: {
  generation: string;
  items: readonly string[];
  highlight?: boolean;
}) {
  return (
    <article className="flex flex-col items-center px-7 text-center">
      <div className="flex items-end justify-center gap-1">
        <span
          className={`${cormorantGaramond.className} type-section-title font-bold leading-none tracking-[0.08em] ${
            highlight ? "text-[#d5b16c]" : "text-[#33103f]"
          }`}
        >
          {generation}
        </span>
        <span className="pb-1 text-[1.125rem] tracking-[0.04em] text-[#33103f]/54">세대</span>
      </div>
      <div className="mt-3 space-y-1">
        {items.map((item) => (
          <p key={item} className="type-label leading-[1.35] tracking-[0.02em] text-[#33103f]/54">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function ScheduleCard({
  title,
  items,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <article className="rounded-[8px] bg-[#fffcf8] p-6 md:p-8">
      <h3 className="type-card-title font-bold leading-none tracking-[0.02em] text-[#33103f]">
        {title}
      </h3>
      <div className="mt-5">
        {items.map(([left, right]) => (
          <div
            key={`${left}-${right}`}
            className="flex items-center justify-between gap-6 border-b border-[#8b6db5]/16 py-3"
          >
            <span className="type-body-small tracking-[0.02em] text-[#33103f]/62">{left}</span>
            <span className="type-body-small font-semibold tracking-[0.02em] text-[#33103f]">
              {right}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ApplyForm() {
  const inputClassName =
    "h-11 w-full rounded-[6px] border border-white/16 bg-white px-3 type-body-small text-[#33103f] outline-none transition focus:border-[#d5b16c]";

  return (
    <form className="mt-8 grid flex-1 gap-4 md:mt-0 md:max-w-[520px]">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="type-caption font-semibold text-white/78">이름</span>
          <input className={inputClassName} type="text" name="name" />
        </label>
        <label className="grid gap-2">
          <span className="type-caption font-semibold text-white/78">연락처</span>
          <input className={inputClassName} type="tel" name="phone" />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="type-caption font-semibold text-white/78">희망 단계</span>
        <select className={inputClassName} name="level" defaultValue="1단계">
          <option>1단계</option>
          <option>2단계</option>
          <option>3단계</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="type-caption font-semibold text-white/78">메모</span>
        <textarea
          className="min-h-[96px] w-full rounded-[6px] border border-white/16 bg-white px-3 py-3 type-body-small text-[#33103f] outline-none transition focus:border-[#d5b16c]"
          name="memo"
        />
      </label>

      <button
        type="button"
        className="type-button h-11 rounded-[6px] bg-[#d5b16c] px-5 font-bold text-[#33103f] transition hover:bg-[#e1c27f]"
      >
        신청하기
      </button>
    </form>
  );
}

export default function DiscipleshipTrainingStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-10 pb-20 md:pt-16 md:pb-24">
      <section aria-labelledby="disciples-intro-title">
        <SectionHeading
          id="disciples-intro-title"
          label="discipleship"
          title="제자훈련"
          description="Discipleship Training"
          titleAs="h1"
        />

        <div className="mt-8">
          <QuoteCard />
        </div>
      </section>

      <section aria-labelledby="disciples-principles-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="disciples-principles-title"
          label="philosophy"
          title="제자훈련의 3대 원리"
          className="max-w-none"
        />

        <div className="mt-8">
          {discipleshipPrinciples.map((principle) => (
            <PrincipleItem key={principle.number} {...principle} />
          ))}
        </div>
      </section>

      <section aria-labelledby="disciples-roadmap-title" className="mt-20 md:mt-[68px]">
        <Roadmap />
      </section>

      <section aria-labelledby="disciples-curriculum-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="disciples-curriculum-title"
          label="curriculum"
          title="단계별 교육 과정"
          className="max-w-none"
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {curriculumStages.map((stage, index) => (
            <CurriculumStageCard key={stage.level} stage={stage} index={index} />
          ))}
        </div>
      </section>

      <ClassStructureSection />

      <section aria-labelledby="disciples-multiplication-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="disciples-multiplication-title"
          label="multiplication"
          title="4세대 재생산 시스템"
          className="max-w-none"
        />

        <div className="mt-8 overflow-hidden border-y border-[#8b6db5]/18 py-5">
          <div className="md:hidden">
            {multiplicationStages.map((stage, index) => (
              <div
                key={stage.year}
                className={`flex items-center gap-4 px-1 py-5 text-left ${
                  index === 0 ? "" : "border-t border-[#8b6db5]/12"
                }`}
              >
                <div className="w-[72px] shrink-0">
                  <span
                    className={`font-hahmlet type-body font-bold leading-none tracking-[0.02em] ${
                      stage.highlight ? "text-[#d5b16c]" : "text-[#33103f]"
                    }`}
                  >
                    {stage.generation}세대
                  </span>
                </div>
                <p className="type-body-small flex-1 leading-[1.6] tracking-[0.02em] text-[#33103f]/62">
                  {stage.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-4 md:gap-y-0">
            {multiplicationStages.map((stage, index) => (
              <div
                key={stage.year}
                className={index < multiplicationStages.length - 1 ? "border-r border-[#8b6db5]/18" : ""}
              >
                <GenerationCard {...stage} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="disciples-schedule-title" className="mt-20 md:mt-[68px]">
        <SectionHeading
          id="disciples-schedule-title"
          label="schedule"
          title="훈련 일정"
          className="max-w-none"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ScheduleCard title="연간 일정" items={annualSchedule} />
          <ScheduleCard title="주간 일정" items={weeklySchedule} />
        </div>
      </section>

      <section
        id="apply"
        aria-labelledby="disciples-apply-title"
        className="mt-20 scroll-mt-32 md:mt-[68px] md:scroll-mt-36"
      >
        <div className="rounded-[8px] bg-[#33103f] p-8 md:flex md:items-start md:justify-between md:gap-10 md:p-9">
          <div className="md:max-w-[320px] lg:max-w-[360px]">
            <SectionHeading
              id="disciples-apply-title"
              label="apply"
              title="제자훈련 신청"
              className="max-w-none [&_h2]:text-white [&_p]:text-[#d5b16c] [&_span]:bg-[#d5b16c]"
            />

            <ul className="mt-6 flex flex-col gap-3">
              {applicationNotes.map((note) => (
                <li key={note} className="type-body flex items-start gap-1 tracking-[0.02em] text-white">
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
