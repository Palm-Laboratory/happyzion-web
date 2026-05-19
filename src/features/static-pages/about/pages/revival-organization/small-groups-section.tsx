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

function SmallGroupPanelHeader({ label, number, title }: { label: string; number: string; title: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex w-full items-start gap-2 text-[#c9a96e]">
        <span className="type-label-lg shrink-0 -translate-y-[0.5px]">{number}</span>
        <p className="type-label-lg min-w-0">{label}</p>
      </div>
      <h2 className="type-title-xl text-[#250030]">
        {title}
      </h2>
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
    <div className="flex w-full min-w-0 flex-col gap-2">
      <div className="flex items-start gap-2 text-[#c9a96e]">
        <span className="type-label-lg shrink-0 -translate-y-[0.5px]">{number}</span>
        <p className="type-label-lg min-w-0 flex-1">{label}</p>
      </div>

      <div className="flex w-full items-start justify-between gap-8">
        <h2 className="type-title-xl min-w-0 flex-1 text-[#250030]">
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-4 lg:hidden">
          <MobileTabButton direction="previous" onClick={onPrevious} tone="light" />
          <MobileTabButton direction="next" onClick={onNext} tone="light" />
        </div>
      </div>

      <ContentHeaderIndicator activeIndex={activeIndex} count={count} tone="light" />
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
    <div className={`flex w-full flex-col gap-6 rounded bg-[#594263] px-5 py-8 md:px-10 md:py-10 ${className}`}>
      <div className="flex w-full items-center justify-center gap-3">
        <p className="type-label-lg font-suit font-semibold shrink-0 text-[#ffd17d]">
          {label}
        </p>
        <span className="h-px min-w-0 flex-1 bg-[#e3bfff]/45" />
        {meta ? (
          <p className="type-body-xs shrink-0 text-[#ffd17d]">
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
          className="text-4xl font-semibold italic leading-9 tracking-[0.04em] text-[#e3bfff]"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <h3 className="type-title-sm text-[#fdf8ff]">
          {title}
        </h3>
      </div>
      <ul className="type-body-xs flex flex-col gap-2 text-[#FDF8FF]/80">
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
          <p className="type-counter-sm w-8 shrink-0 translate-y-[2px] text-center text-[#ffd17d]">
            {item.number}
          </p>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h3 className="type-title-xs text-[#fdf8ff]">
              {item.title}
            </h3>
            <p className="type-body-xs text-[#FDF8FF]/80">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Roadmap sub-components ──────────────────────────────────── */

function RoadmapQuarterHeader({ quarter, summary }: { quarter: string; summary: string }) {
  return (
    <div className="flex w-full items-center overflow-hidden rounded-t">
      <div className="flex h-10 shrink-0 items-center bg-[#341a44] pl-6 pr-4">
        <p className="type-label-md font-semibold text-[#ffd17d]">{quarter}</p>
      </div>
      <div className="flex h-10 min-w-0 flex-1 items-center bg-[#341a44] px-6 py-2.5">
        <p className="type-label-md font-suit font-semibold truncate text-[#ffd17d]">{summary}</p>
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
      <p className="type-label-md font-normal text-[#e3bfff]">{phase}</p>
      <div className="flex flex-1 flex-col gap-3.5">
        <h3 className="type-title-xs text-[#fdf8ff]">
          {month}
        </h3>
        <ul className="type-body-xs flex flex-col gap-1 text-[#fdf8ff]/80">
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

/* ── Personnel sub-components ────────────────────────────────── */

function PersonnelTable() {
  const headers = ["사역부", "팀장", "팀원", "소그룹 셀", "총 인원", "비고"];
  const totals = ["합계", "7", "75", "51개+", "82", "2025년 목표"];

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[620px] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e3bfff]/50">
            {headers.map((header) => (
              <th key={header} className="type-title-xxs font-suit px-3.5 py-5 font-normal tracking-[0.2em] text-[#ffd17d]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personnelRows.map((row) => (
            <tr key={row[0]} className="border-b border-[#e3bfff]/50 text-[#FDF8FF]">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${cell}`} className={`type-body-xs px-3.5 py-5 ${index === 0 ? "font-semibold" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b border-[#e3bfff]/50 bg-white/10 text-[#e3bfff]">
            {totals.map((cell) => (
              <td key={cell} className="type-body-xs px-3.5 py-5 font-semibold">
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

function SmallGroupPrinciplesContent({ activeIndex = 0, count = 1, onPrevious, onNext }: TabContentProps) {
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
        <SmallGroupPanelHeader label="Small Group Ecosystem" number="01" title="소그룹 운영 원칙" />
      )}

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

function PersonnelPlanContent({ activeIndex = 0, count = 1, onPrevious, onNext }: TabContentProps) {
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
        <SmallGroupPanelHeader label="personnel plan" number="02" title="인원 배치 계획" />
      )}

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

function LeaderSelectionContent({ activeIndex = 0, count = 1, onPrevious, onNext }: TabContentProps) {
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
        <SmallGroupPanelHeader label="Leader Selection" number="03" title="리더 선발 기준" />
      )}

      <SmallGroupSectionBlock label="6가지 자격 요건" className="md:pb-20">
        <PrincipleList />
      </SmallGroupSectionBlock>
    </>
  );
}

function AnnualRoadmapContent({ activeIndex = 0, count = 1, onPrevious, onNext }: TabContentProps) {
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
        <SmallGroupPanelHeader label="Annual Roadmap" number="04" title="연간 부흥 로드맵" />
      )}

      <div className="flex w-full flex-col gap-6 rounded bg-[#594263] px-5 pb-[60px] pt-8 md:px-10 md:pb-20 md:pt-10">
        <div className="flex w-full items-center justify-center gap-3">
          <p className="type-label-lg font-suit font-semibold shrink-0 text-[#ffd17d]">
            12개월 사역 캘린더 · 2026
          </p>
          <span className="h-px min-w-0 flex-1 bg-[#c5aee0]/45" />
        </div>

        <div className="flex w-full flex-col gap-6">
          {roadmapQuarters.map((quarter) => (
            <div key={quarter.quarter} className="flex w-full flex-col">
              <RoadmapQuarterHeader quarter={quarter.quarter} summary={quarter.summary} />
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
    setSelectedTabIndex((current) => (current + direction + smallGroupTabs.length) % smallGroupTabs.length);
  };
  const previousSmallGroupTab = () => moveSmallGroupTab(-1);
  const nextSmallGroupTab = () => moveSmallGroupTab(1);

  return (
    <section className="bg-[#fefbff] pb-[100px] pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Small Groups, Leaders, and Ministry"
          title={
            <>
              <span className="inline-block">소그룹과 리더,</span>{" "}
              <span className="inline-block">그리고 사역</span>
            </>
          }
          description="How We Serve Together"
          className="[&_p]:text-[#b87f16] [&>div:first-child_span]:bg-[#b87f16]"
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
                  className={`flex min-h-[66px] flex-col items-start justify-center gap-1 border-b border-l-2 border-[#5d3d8a]/15 px-4 py-3.5 text-left ${active ? "border-l-[#340653] bg-[#f4f0f9]" : "border-l-transparent bg-white/60"
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

          <div className="flex min-w-0 flex-1 flex-col gap-[60px] bg-[#f4f0f9] px-5 py-12 md:px-10 md:py-[60px] lg:border-l lg:border-[#5d3d8a]/15">
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
