"use client";

import { useState } from "react";

import SectionHeading from "@/components/section-heading";
import ApplyForm from "@/features/static-pages/discipleship/components/apply-form";

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
    <aside className="relative flex flex-col gap-comp-base w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-pad-base py-pad-md">
      <p className="type-quote-md relative z-10 text-[#33103f]">
        &quot;또 네가 많은 증인 앞에서 내게 들은 바를 충성된 사람들에게 부탁하라 그들이
        또 다른 사람들을 가르칠 수 있으리라&quot;
      </p>
      <p className="type-quote-xs relative z-10 text-[#510a75]">
        디모데후서 2:2
      </p>
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-[-11px] text-[84px] leading-[84px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        &quot;
      </span>
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
    <article className="flex gap-comp-base border-b border-[#8b6db5]/18 py-pad-sm first:pt-0 last:border-b-0 last:pb-0 md:gap-comp-xxl">
      <div className="flex items-center">
        <span
          className="type-counter-lg -translate-y-[4px] text-[#e4b96b]"
        >
          {number}
        </span>
      </div>

      <div className="flex flex-col gap-comp-sm border-l border-[#8b6db5]/18 pl-pad-xs md:pl-pad-md">
        <p className="type-label-md tracking-[0.12em] text-[#8b6db5]">
          {englishTitle.toUpperCase()}
        </p>
        <h3 className="type-title-md font-medium text-[#33103f]">
          {title}
        </h3>
        <p className="type-body-xs text-[#4a3b5e]">
          {details.join(" · ")}
        </p>
      </div>
    </article>
  );
}

function Roadmap() {
  return (
    <div className="flex flex-col gap-layout-md">
      <SectionHeading
        id="disciples-roadmap-title"
        label="full roadmap"
        title="전체 로드맵"
        className="max-w-none"
      />

      <div className="relative">
        <span className="absolute bottom-[22px] left-[21px] top-[22px] w-px bg-[#8b6db5]/18 md:left-[23px]" />

        <div className="flex flex-col gap-layout-sm md:gap-layout-md">
          {roadmapItems.map((item, index) => (
            <div key={item.label} className="relative flex gap-comp-lg md:gap-comp-xxl">
              <div className="relative z-10 flex w-[44px] shrink-0 justify-center md:w-[48px]">
                <span
                  className={`flex h-[44px] w-[44px] items-center justify-center rounded-full md:h-[48px] md:w-[48px] ${
                    index === 0 || index === roadmapItems.length - 1
                      ? "bg-[#2a123c] text-[rgb(228_185_107)]"
                      : "bg-[#f5f0f9] text-[#8b6db5]"
                  }`}
                >
                  <span
                    className={`type-counter-md font-bold ${index === 0 || index === roadmapItems.length - 1 ? "" : "-translate-y-0.5"}`}
                  >
                    {index === 0 ? "N" : index === roadmapItems.length - 1 ? "G" : `0${index}`}
                  </span>
                </span>
              </div>

              <div className="min-w-0 flex-1 flex flex-col gap-comp-md pt-pad-xxs md:pt-pad-3xs">
                <p className="type-label-md md:type-label-lg tracking-[0.18em] text-[#928397]">
                  {item.label}
                  <span className="mx-3 tracking-[0.12em]">·</span>
                  {item.duration}
                </p>
                <article
                  className={`flex flex-col gap-comp-xs rounded-[8px] border px-pad-sm py-pad-xs shadow-[0_2px_10px_rgba(51,16,63,0.04)] md:px-pad-base ${
                    index === roadmapItems.length - 1
                      ? "border-[#2a123c] bg-[#2a123c] text-white"
                      : "border-[#8b6db5]/18 bg-white"
                  }`}
                >
                  <h3
                    className={`type-title-xl ${
                      index === roadmapItems.length - 1 ? "text-white" : "text-[#33103f]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`type-body-xs ${
                      index === roadmapItems.length - 1 ? "text-white/80" : "text-[#4a3b5e]"
                    }`}
                  >
                    {item.details.join(" · ")}
                  </p>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-8 rounded-[8px] bg-[#f5f0f9] px-pad-sm py-pad-sm text-center">
        <p className="type-body-md text-[#6F5576]">
          총 기간: 5주 + 36주 =
          <span className="font-bold text-[#33103f]"> 41주</span>
          <span className="mx-3">·</span>
          목표: <span className="font-bold text-[#33103f]">삶으로 이어지는 제자도</span>
        </p>
      </div>
    </div>
  );
}

function CurriculumStageTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedStage = curriculumStages[selectedIndex] ?? curriculumStages[0];

  return (
    <div className="flex flex-col gap-layout-md w-full">
      <div className="flex flex-col gap-layout-sm">
        <p className="type-body-md text-[#4a3b5e]">
          대상: {selectedStage.target}
          <span className="mx-3 text-[#4a3b5e]">·</span>
          목표: <span className="font-bold text-[#33103f]">{selectedStage.objective}</span>
        </p>

        <div className="grid grid-cols-3 overflow-hidden rounded-[4px] border border-[#8b6db5]/25 bg-white">
        {curriculumStages.map((stage, index) => {
          const active = index === selectedIndex;

          return (
            <button
              key={stage.level}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex flex-col items-center justify-center gap-comp-xxs border-r border-[#8b6db5]/18 px-pad-xxs py-pad-xs text-center transition last:border-r-0 ${
                active ? "bg-[#2a123c] text-white" : "bg-white text-[#33103f] hover:bg-[#f5f0f9]"
              }`}
              aria-pressed={active}
            >
              <span
                className={`type-label-lg font-suit font-semibold tracking-[0.18em] ${
                  active ? "text-[rgb(228_185_107)]" : "text-[#8b6db5]"
                }`}
              >
                {stage.level}
              </span>
              <span className="type-title-xs md:type-title-sm">
                {stage.title}
              </span>
            </button>
          );
        })}
        </div>
      </div>

      <div className="flex flex-col gap-comp-base">
      <div className="overflow-hidden rounded-[4px] border border-[#8b6db5]/25 bg-white">
        <div className="grid grid-cols-[80px_minmax(0,1fr)] bg-[#2a123c] md:grid-cols-[96px_minmax(0,1fr)]">
          <div className="px-pad-xs py-pad-xs md:px-pad-sm">
            <p className="type-title-xxs font-suit font-bold text-white">
              주차
            </p>
          </div>
          <div className="px-pad-md py-pad-xs">
            <p className="type-title-xxs font-suit font-bold text-white">
              과목
            </p>
          </div>
        </div>

        {selectedStage.courses.map((course, courseIndex) => (
          <div
            key={course}
            className={`grid min-h-[62px] grid-cols-[80px_minmax(0,1fr)] border-b border-[#8b6db5]/18 last:border-b-0 md:grid-cols-[96px_minmax(0,1fr)] ${
              courseIndex % 2 === 0 ? "bg-[#f5f0f9]" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-start border-r border-[#8b6db5]/18 px-pad-xs py-pad-xs md:px-pad-sm">
              <span
                className="type-counter-sm -translate-y-[2px] font-bold tracking-[0.12em] text-[rgb(228_185_107)]"
              >
                {String(courseIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center px-pad-md py-pad-xs">
              <p className="type-body-sm font-medium text-[#33103f]">
                {course}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-comp-sm border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-pad-sm py-pad-xs">
        <p className="type-title-xs text-[#33103f]">
          수료 기준
        </p>
        <p className="type-body-xs text-[#4a3b5e]">
          {selectedStage.requirements.join(" · ")}
        </p>
      </div>
      </div>
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
    <article className="relative flex flex-col items-start gap-comp-md text-left">
      <div className="flex items-end gap-1">
        <span className="text-[2rem] font-bold leading-none text-[#e4b96b]" style={{ fontFamily: "var(--font-cormorant), serif" }}>
          {minute}
        </span>
        <span className="type-body-md pb-[2px] leading-none text-[#6F5576]">분</span>
      </div>
      <h3 className="type-title-xs font-medium text-[#33103f]">
        {title}
      </h3>
      <div className="type-body-xs flex flex-col items-start gap-comp-xxs text-[#6F5576]">
        {details.map((detail) => (
          <p key={detail}>· {detail}</p>
        ))}
      </div>
    </article>
  );
}

function ClassStructureSection() {
  return (
    <section aria-labelledby="disciples-class-structure-title" className="flex flex-col gap-layout-md">
      <SectionHeading
        id="disciples-class-structure-title"
        label="class structure"
        title="매주 60분 수업 구조"
        className="max-w-none"
      />

      <div className="flex flex-col gap-layout-base">
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

        <div className="border-b border-[#8b6db5]/18 pb-pad-md">
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

        <p className="type-body-xs text-[#6F5576]">
          총 <span className="font-bold text-[#33103f]">60분</span> · 소그룹 2-5명 또는
          일대일 진행
        </p>
      </div>
    </section>
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
    <article className="flex flex-col gap-comp-lg rounded-[8px] bg-[#f5f0f9] p-pad-md md:p-pad-lg">
      <h3 className="type-title-md text-[#33103f]">
        {title}
      </h3>
      <div>
        {items.map(([left, right]) => (
          <div
            key={`${left}-${right}`}
            className="flex items-center justify-between gap-comp-xl border-b border-[#8b6db5]/12 py-pad-xxs"
          >
            <span className="type-body-xs text-[#6F5576]">{left}</span>
            <span className="type-body-xs font-semibold text-[#33103f]">
              {right}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function DiscipleshipTrainingStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-section-sm pb-section-xl md:pt-section-md md:pb-section-xxl lg:pt-section-lg lg:pb-section-3xl">
      <div className="flex flex-col gap-layout-xxl">
        <section aria-labelledby="disciples-intro-title" className="flex flex-col gap-layout-md">
          <SectionHeading
            id="disciples-intro-title"
            label="discipleship"
            title="제자훈련"
            description="Discipleship Training"
            titleAs="h1"
          />

          <QuoteCard />
        </section>

        <section aria-labelledby="disciples-principles-title" className="flex flex-col gap-layout-md">
          <SectionHeading
            id="disciples-principles-title"
            label="philosophy"
            title="제자훈련의 3대 원리"
            className="max-w-none"
          />

          <div>
            {discipleshipPrinciples.map((principle) => (
              <PrincipleItem key={principle.number} {...principle} />
            ))}
          </div>
        </section>

        <section aria-labelledby="disciples-roadmap-title">
          <Roadmap />
        </section>

        <section aria-labelledby="disciples-curriculum-title" className="flex flex-col gap-layout-md">
          <SectionHeading
            id="disciples-curriculum-title"
            label="curriculum"
            title="단계별 교육 과정"
            className="max-w-none"
          />

          <CurriculumStageTabs />
        </section>

        <ClassStructureSection />

        <section aria-labelledby="disciples-schedule-title" className="flex flex-col gap-layout-md">
          <SectionHeading
            id="disciples-schedule-title"
            label="schedule"
            title="훈련 일정"
            className="max-w-none"
          />

          <div className="grid gap-layout-base md:grid-cols-2">
            <ScheduleCard title="연간 일정" items={annualSchedule} />
            <ScheduleCard title="주간 일정" items={weeklySchedule} />
          </div>
        </section>

      {/*
      <section
        id="apply"
        aria-labelledby="disciples-apply-title"
        className="mt-20 scroll-mt-32 md:mt-20 md:scroll-mt-36"
      >
        <div className="rounded-[8px] bg-[#2a123c] p-8 md:flex md:items-start md:justify-between md:gap-10 md:p-9">
          <div className="md:max-w-[320px] lg:max-w-[360px]">
            <SectionHeading
              id="disciples-apply-title"
              label="apply"
              title="제자훈련 신청"
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
      */}
      </div>
    </main>
  );
}
