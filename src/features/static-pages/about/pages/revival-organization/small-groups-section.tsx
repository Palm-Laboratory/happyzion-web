"use client";

import { useState } from "react";

import SectionHeading from "@/components/section-heading";

import {
  smallGroupTabs,
  roadmapQuarters,
  smallGroupCycleSteps,
  smallGroupPrinciples,
  personnelRows,
  personnelBars,
  personnelTotalCount,
} from "./revival-data";
import { MobileTabButton, ContentHeaderIndicator } from "./revival-ui-parts";

/* ── Shared sub-components ───────────────────────────────────── */

function SmallGroupPanelHeader({
  label,
  number,
  title,
}: {
  label: string;
  number: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-start gap-comp-xxs">
      <div className="flex w-full items-start gap-comp-sm text-[#c9a96e]">
        <span className="type-label-lg shrink-0 -translate-y-[0.5px]">
          {number}
        </span>
        <p className="type-label-lg min-w-0">{label}</p>
      </div>
      <h2 className="type-title-xl text-[#250030]">{title}</h2>
    </div>
  );
}

function SmallGroupPanelHeaderWithControls({
  activeIndex,
  count,
  label,
  number,
  title,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  count: number;
  label: string;
  number: string;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-comp-sm">
      <div className="flex items-start gap-comp-sm text-[#c9a96e]">
        <span className="type-label-lg shrink-0 -translate-y-[0.5px]">
          {number}
        </span>
        <p className="type-label-lg min-w-0 flex-1">{label}</p>
      </div>

      <div className="flex w-full items-start justify-between gap-comp-3xl">
        <h2 className="type-title-xl min-w-0 flex-1 text-[#250030]">{title}</h2>
        <div className="flex shrink-0 items-center gap-comp-base lg:hidden">
          <MobileTabButton
            direction="previous"
            onClick={onPrevious}
            tone="light"
          />
          <MobileTabButton direction="next" onClick={onNext} tone="light" />
        </div>
      </div>

      <ContentHeaderIndicator
        activeIndex={activeIndex}
        count={count}
        tone="light"
      />
    </div>
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
    <div
      className={`flex w-full flex-col gap-comp-xl rounded bg-[#594263] px-pad-sm py-pad-lg md:px-pad-xxl md:py-pad-xxl ${className}`}
    >
      <div className="flex w-full items-center justify-center gap-comp-md">
        <p className="type-label-lg font-suit shrink-0 font-semibold text-[#ffd17d]">
          {label}
        </p>
        <span className="h-px min-w-0 flex-1 bg-[#e3bfff]/45" />
        {meta ? (
          <p className="type-body-xs shrink-0 text-[#ffd17d]">{meta}</p>
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
    <article className="flex flex-col gap-comp-lg rounded bg-white/10 p-pad-sm">
      <div className="flex flex-col gap-comp-sm">
        <p
          className="text-4xl font-semibold italic leading-9 tracking-[0.04em] text-[#e3bfff]"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <h3 className="type-title-sm text-[#fdf8ff]">{title}</h3>
      </div>
      <ul className="type-body-xs flex flex-col gap-comp-sm text-[#FDF8FF]/80">
        {items.map((item) => (
          <li key={item} className="flex gap-comp-xs">
            <span className="tracking-[2.8px]">·</span>
            <span className="tracking-[0.01em]">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PrincipleList({
  items = smallGroupPrinciples,
}: {
  items?: typeof smallGroupPrinciples;
}) {
  return (
    <div className="flex w-full flex-col gap-comp-base">
      {items.map((item) => (
        <div key={item.number} className="flex gap-comp-xl">
          <p className="type-counter-sm w-8 shrink-0 translate-y-[2px] text-center text-[#ffd17d]">
            {item.number}
          </p>
          <div className="flex min-w-0 flex-1 flex-col gap-comp-md">
            <h3 className="type-title-xs text-[#fdf8ff]">{item.title}</h3>
            <p className="type-body-xs text-[#FDF8FF]/80">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Roadmap sub-components ──────────────────────────────────── */

function RoadmapQuarterHeader({
  quarter,
  summary,
}: {
  quarter: string;
  summary: string;
}) {
  return (
    <div className="flex w-full items-center overflow-hidden rounded-t">
      <div className="flex h-10 shrink-0 items-center bg-[#341a44] pl-pad-sm pr-pad-sm">
        <p className="type-label-md font-semibold text-[#ffd17d]">{quarter}</p>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center bg-[#341a44] px-pad-md py-pad-xxs">
        <p className="type-label-md font-suit truncate font-semibold text-[#ffd17d]">
          {summary}
        </p>
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
    <article className="flex min-h-[168px] flex-col gap-2 border-b border-r border-[#8d769d]/60 bg-white/10 p-pad-xs">
      <p className="type-label-md font-normal text-[#e3bfff]">{phase}</p>
      <div className="flex flex-1 flex-col gap-comp-md">
        <h3 className="type-title-xs text-[#fdf8ff]">{month}</h3>
        <ul className="type-body-xs flex flex-col gap-comp-sm text-[#fdf8ff]/80">
          {items.map((item) => (
            <li key={item} className="flex gap-comp-xs">
              <span className="text-sm leading-[22px]">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ── Personnel sub-components ────────────────────────────────── */

function PersonnelTable() {
  const headers = ["사역부", "팀장", "팀원", "소그룹 셀", "총 인원", "비고"];
  const totals = ["합계", "7", "75", "51개+", "82", "2025년 목표"];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e3bfff]/50">
            {headers.map((header) => (
              <th
                key={header}
                className="type-title-xxs font-suit px-pad-xxs py-pad-sm font-normal tracking-[0.2em] text-[#ffd17d]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personnelRows.map((row) => (
            <tr
              key={row[0]}
              className="border-b border-[#e3bfff]/50 text-[#FDF8FF]"
            >
              {row.map((cell, index) => (
                <td
                  key={`${row[0]}-${cell}`}
                  className={`type-body-xs px-pad-xxs py-pad-sm ${index === 0 ? "font-semibold" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b border-[#e3bfff]/50 bg-white/10 text-[#e3bfff]">
            {totals.map((cell) => (
              <td
                key={cell}
                className="type-body-xs px-pad-xxs py-pad-sm font-semibold"
              >
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
    <div className="flex w-full flex-col gap-comp-md">
      {personnelBars.map((bar) => (
        <div key={bar.label} className="flex w-full flex-col gap-comp-md">
          <div className="type-body-xs flex items-center justify-between text-[#f3ecfc]">
            <span>{bar.label}</span>
            <span>{bar.count}</span>
          </div>
          <div className="h-[3px] w-full bg-[#e3bfff]/35">
            <div
              className="h-full bg-[#e3bfff]"
              style={{ width: `${(bar.value / personnelTotalCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Tab content panels ──────────────────────────────────────── */

interface TabContentProps {
  activeIndex?: number;
  count?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

function SmallGroupPrinciplesContent({
  activeIndex = 0,
  count = 1,
  onPrevious,
  onNext,
}: TabContentProps) {
  return (
    <>
      {onPrevious && onNext ? (
        <SmallGroupPanelHeaderWithControls
          activeIndex={activeIndex}
          count={count}
          label="Small Group Ecosystem"
          number="01"
          title="소그룹 운영 원칙"
          onPrevious={onPrevious}
          onNext={onNext}
        />
      ) : (
        <SmallGroupPanelHeader
          label="Small Group Ecosystem"
          number="01"
          title="소그룹 운영 원칙"
        />
      )}

      <div className="flex w-full flex-col gap-layout-lg">
        <SmallGroupSectionBlock label="4단계 사이클">
          <div className="grid gap-comp-base md:grid-cols-2">
            {smallGroupCycleSteps.map((step) => (
              <SmallGroupCycleCard key={step.number} {...step} />
            ))}
          </div>
        </SmallGroupSectionBlock>

        <SmallGroupSectionBlock label="6대 원칙" className="md:pb-layout-xxl">
          <PrincipleList />
        </SmallGroupSectionBlock>
      </div>
    </>
  );
}

function PersonnelPlanContent({
  activeIndex = 0,
  count = 1,
  onPrevious,
  onNext,
}: TabContentProps) {
  return (
    <>
      {onPrevious && onNext ? (
        <SmallGroupPanelHeaderWithControls
          activeIndex={activeIndex}
          count={count}
          label="personnel plan"
          number="02"
          title="인원 배치 계획"
          onPrevious={onPrevious}
          onNext={onNext}
        />
      ) : (
        <SmallGroupPanelHeader
          label="personnel plan"
          number="02"
          title="인원 배치 계획"
        />
      )}

      <div className="flex w-full flex-col gap-layout-lg">
        <SmallGroupSectionBlock
          label="TEAM OVERVIEW"
          className="md:pb-layout-xxl"
        >
          <PersonnelTable />
        </SmallGroupSectionBlock>

        <SmallGroupSectionBlock
          label="사역부별 인원 비중"
          meta="총 82명"
          className="md:pb-layout-xxl"
        >
          <PersonnelBars />
        </SmallGroupSectionBlock>
      </div>
    </>
  );
}

function LeaderSelectionContent({
  activeIndex = 0,
  count = 1,
  onPrevious,
  onNext,
}: TabContentProps) {
  return (
    <>
      {onPrevious && onNext ? (
        <SmallGroupPanelHeaderWithControls
          activeIndex={activeIndex}
          count={count}
          label="Leader Selection"
          number="03"
          title="리더 선발 기준"
          onPrevious={onPrevious}
          onNext={onNext}
        />
      ) : (
        <SmallGroupPanelHeader
          label="Leader Selection"
          number="03"
          title="리더 선발 기준"
        />
      )}

      <SmallGroupSectionBlock
        label="6가지 자격 요건"
        className="md:pb-layout-xxl"
      >
        <PrincipleList />
      </SmallGroupSectionBlock>
    </>
  );
}

function AnnualRoadmapContent({
  activeIndex = 0,
  count = 1,
  onPrevious,
  onNext,
}: TabContentProps) {
  return (
    <>
      {onPrevious && onNext ? (
        <SmallGroupPanelHeaderWithControls
          activeIndex={activeIndex}
          count={count}
          label="Annual Roadmap"
          number="04"
          title="연간 부흥 로드맵"
          onPrevious={onPrevious}
          onNext={onNext}
        />
      ) : (
        <SmallGroupPanelHeader
          label="Annual Roadmap"
          number="04"
          title="연간 부흥 로드맵"
        />
      )}

      <div className="flex w-full flex-col gap-layout-base rounded bg-[#594263] px-pad-sm pb-pad-4xl pt-pad-lg md:px-pad-xxl md:pb-layout-xxl md:pt-pad-xxl">
        <div className="flex w-full items-center justify-center gap-comp-md">
          <p className="type-label-lg font-suit shrink-0 font-semibold text-[#ffd17d]">
            12개월 사역 캘린더 · 2026
          </p>
          <span className="h-px min-w-0 flex-1 bg-[#c5aee0]/45" />
        </div>

        <div className="flex w-full flex-col gap-layout-base">
          {roadmapQuarters.map((quarter) => (
            <div key={quarter.quarter} className="flex w-full flex-col">
              <RoadmapQuarterHeader
                quarter={quarter.quarter}
                summary={quarter.summary}
              />
              <div className="grid overflow-hidden rounded-b md:grid-cols-3">
                {quarter.months.map((month) => (
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

/* ── Main section export ─────────────────────────────────────── */

export default function SmallGroupsMinistrySection() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const moveSmallGroupTab = (direction: -1 | 1) => {
    setSelectedTabIndex(
      (current) =>
        (current + direction + smallGroupTabs.length) % smallGroupTabs.length,
    );
  };
  const previousSmallGroupTab = () => moveSmallGroupTab(-1);
  const nextSmallGroupTab = () => moveSmallGroupTab(1);

  return (
    <section className="bg-[#fefbff] py-section-sm md:py-section-md lg:py-section-lg">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-layout-lg lg:gap-layout-xl">
        <SectionHeading
          label="Small Groups, Leaders, and Ministry"
          title={
            <>
              <span className="inline-block">소그룹과 리더,</span>{" "}
              <span className="inline-block">그리고 사역</span>
            </>
          }
          description="How We Serve Together"
          className="[&>div:first-child_span]:bg-[#b87f16] [&_p]:text-[#b87f16]"
        />

        <div className="flex w-full flex-col border border-[#5d3d8a]/15 lg:flex-row">
          <aside className="hidden bg-[#fcfaff] text-left lg:flex lg:w-[180px] lg:flex-col">
            {smallGroupTabs.map((tab, index) => {
              const active = index === selectedTabIndex;

              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setSelectedTabIndex(index)}
                  className={`flex min-h-[66px] flex-col items-start justify-center gap-comp-xxs border-b border-l-2 border-[#5d3d8a]/15 px-pad-xs py-pad-xxs text-left ${
                    active
                      ? "border-l-[#340653] bg-[#f4f0f9]"
                      : "border-l-transparent bg-white/60"
                  }`}
                  aria-pressed={active}
                >
                  <span className="type-title-xs text-[#33103f]">
                    {tab.title}
                  </span>
                  <span className="type-body-xs text-[#6F5576]">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-layout-lg bg-[#f4f0f9] p-pad-lg md:px-pad-xxl md:py-pad-4xl lg:border-l lg:border-[#5d3d8a]/15">
            {selectedTabIndex === 0 ? (
              <SmallGroupPrinciplesContent
                activeIndex={selectedTabIndex}
                count={smallGroupTabs.length}
                onPrevious={previousSmallGroupTab}
                onNext={nextSmallGroupTab}
              />
            ) : null}
            {selectedTabIndex === 1 ? (
              <PersonnelPlanContent
                activeIndex={selectedTabIndex}
                count={smallGroupTabs.length}
                onPrevious={previousSmallGroupTab}
                onNext={nextSmallGroupTab}
              />
            ) : null}
            {selectedTabIndex === 2 ? (
              <LeaderSelectionContent
                activeIndex={selectedTabIndex}
                count={smallGroupTabs.length}
                onPrevious={previousSmallGroupTab}
                onNext={nextSmallGroupTab}
              />
            ) : null}
            {selectedTabIndex === 3 ? (
              <AnnualRoadmapContent
                activeIndex={selectedTabIndex}
                count={smallGroupTabs.length}
                onPrevious={previousSmallGroupTab}
                onNext={nextSmallGroupTab}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
