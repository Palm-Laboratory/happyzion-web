"use client";

import { useState } from "react";

import SectionHeading from "@/components/section-heading";

import { ministryTabs, ministryDetails } from "./revival-data";
import { MobileTabButton, ContentHeaderIndicator, MinistryTitle } from "./revival-ui-parts";

function MinistryDetailQuote({ quote }: { quote: string }) {
  return (
    <div className="relative w-full overflow-hidden border-l-[3px] border-[#6d5898] bg-white/[0.04] px-8 py-9 md:px-12">
      <p className="type-quote-sm relative z-10 text-white">
        &quot;{quote}&quot;
      </p>
      <p
        className="pointer-events-none absolute left-[19px] top-[-11px] h-[160px] w-[46px] text-[120px] leading-[120px] text-[#e7cff2]/10"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 leading-6">
          <h3 className="type-label-lg font-suit text-[#c9a96e]">
            {title}
          </h3>
          <p className="type-title-xl font-medium text-white">
            {english}
          </p>
        </div>
        <ul className="type-body-xs flex flex-col gap-2 text-white/80">
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
            className="type-label-md font-suit inline-flex items-center gap-1 border border-[#e3bfff]/50 bg-[#e3bfff]/15 py-1.5 pl-1.5 pr-3 tracking-[0.16em] text-[#e3bfff]"
          >
            <span className="text-xs">◆</span>
            {group}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function MinistryTeamsSection() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const activeMinistry = ministryDetails[selectedTabIndex] ?? ministryDetails[0];
  const moveMinistryTab = (direction: -1 | 1) => {
    setSelectedTabIndex((current) => (current + direction + ministryDetails.length) % ministryDetails.length);
  };

  return (
    <section className="bg-gradient-to-b from-[#1e1035] to-[#2f2047] pb-[100px] pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Ministry Teams"
          title="7대 사역팀 체계"
          description={
            <>
              <span className="inline-block !bg-transparent">담임목사 박완섭</span>{" "}
              <span className="inline-block !bg-transparent">· 팀장 7명</span>{" "}
              <span className="inline-block !bg-transparent">· 팀원 75명</span>{" "}
              <span className="inline-block !bg-transparent">· 소그룹 51개+</span>
            </>
          }
          className="w-full max-w-full [&_h2]:text-white [&_p]:max-w-full [&_p]:break-keep [&_p]:leading-[1.6] [&_p]:text-[#c9a96e] [&_span]:bg-[#c9a96e]"
        />

        <div className="flex w-full flex-col border border-[#5d3d8a]/15 lg:flex-row">
          <aside className="hidden bg-white/[0.04] text-left lg:flex lg:w-[180px] lg:flex-col">
            {ministryTabs.map((tab, index) => {
              const active = index === selectedTabIndex;

              return (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setSelectedTabIndex(index)}
                  className={`flex min-h-[66px] flex-col items-start justify-center gap-1 border-b border-l-2 border-[#e3bfff]/15 px-4 py-3.5 text-left ${active ? "border-l-[#c9a96e] bg-[#190b2a]" : "border-l-transparent bg-white/[0.08]"
                    }`}
                  aria-pressed={active}
                >
                  <span className="type-title-xs text-[#FDF8FF]">
                    {tab.title}
                  </span>
                  <span className="type-body-xs text-white/80">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-11 bg-[#190b2a] p-6 md:p-[60px]">
            <div className="flex w-full min-w-0 flex-col gap-2">
              <div className="flex w-full items-start gap-2 text-[#c9a96e]">
                <span className="type-label-lg shrink-0 -translate-y-[0.5px]">{activeMinistry.number}</span>
                <span className="type-label-lg min-w-0 flex-1">{activeMinistry.english}</span>
              </div>

              <div className="flex items-start justify-between gap-6 md:gap-8">
                <div className="min-w-0 flex-1">
                  <h2 className="type-title-xl text-white">
                    <MinistryTitle title={activeMinistry.title} />
                  </h2>
                </div>

                <div className="flex shrink-0 items-center gap-4 lg:hidden">
                  <MobileTabButton direction="previous" onClick={() => moveMinistryTab(-1)} />
                  <MobileTabButton direction="next" onClick={() => moveMinistryTab(1)} />
                </div>

                <div className="hidden flex-col items-end justify-center gap-1.5 text-center uppercase text-[#e3bfff] lg:flex">
                  <p
                    className="text-[40px] italic leading-10 tracking-[1px]"
                    style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
                  >
                    {activeMinistry.memberCount}
                  </p>
                  <p className="type-label-md">팀 인원</p>
                </div>
              </div>

              <ContentHeaderIndicator activeIndex={selectedTabIndex} count={ministryDetails.length} />
            </div>

            <MinistryDetailQuote quote={activeMinistry.quote} />

            <div className="flex flex-col">
              <div className="grid gap-0.5 md:grid-cols-2">
                {activeMinistry.teams.map((team) => (
                  <MinistryTeamPanel key={team.title} {...team} />
                ))}
              </div>

              <div className="flex flex-col gap-4 bg-[#1a1028] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="type-label-lg text-[#c9a96e]">
                  members
                </p>
                <div className="type-body-xs flex flex-wrap gap-x-3 gap-y-2 text-white/80">
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
