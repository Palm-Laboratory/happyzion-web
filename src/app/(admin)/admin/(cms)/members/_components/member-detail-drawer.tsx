"use client";

import type { AdminMemberDetailResult } from "@/lib/admin-members-api";
import { Avatar, OfficeBadge, StageBadge, StatusBadge } from "./badges";
import type { Member } from "./types";
import { DRAWER_TABS, type DrawerTab } from "./member-registry-utils";
import { BasicTab } from "./member-basic-tab";
import { FamilyTab } from "./member-family-tab";
import { HistoryTab } from "./member-history-tab";
import { ServiceTab } from "./member-service-tab";

export function MemberDrawer({
  member,
  detail,
  selectedTab,
  onClose,
  onSelectTab,
}: {
  member: Member;
  detail: AdminMemberDetailResult | null;
  selectedTab: DrawerTab;
  onClose: () => void;
  onSelectTab: (tab: DrawerTab) => void;
}) {
  const family = detail?.family ?? [];
  const faith = detail?.faith;
  const service = detail?.services;
  const events = detail?.events ?? [];
  const attendance = detail?.attendance ?? [];

  return (
    <aside className="fixed inset-y-16 right-0 z-30 w-full max-w-[720px] overflow-hidden border-l border-[#dbe4f0] bg-white shadow-2xl">
      <div className="border-b border-[#e2e8f0] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <Avatar initial={member.initial} grad={member.avatarGrad} size="lg" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[22px] font-bold text-[#0f1c2e]">{member.name}</h2>
                {member.baptismName ? <span className="text-[13px] text-[#8fa3bb]">세례명: {member.baptismName}</span> : null}
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <OfficeBadge office={member.office} />
                <StatusBadge status={member.status} />
                <StageBadge stage={member.faithStage} />
                <span className="text-[11px] text-[#8fa3bb]">
                  · {member.sex === "F" ? "여" : "남"}, {member.age}세
                </span>
              </div>
              <p className="mt-1 text-[12px] text-[#6d7f95]">
                등록일 {member.registeredAt} · 신앙연수 {member.faithYears}년
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="h-8 rounded-lg border border-[#d5deea] px-3 text-[12px] font-medium text-[#55697f]">
              취소
            </button>
            <button className="h-8 rounded-lg bg-[#3f74c7] px-3 text-[12px] font-semibold text-white">
              수정
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-[#8fa3bb] hover:bg-[#f1f5f9]"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border-b border-[#e2e8f0] bg-[#fafcff] px-6">
        <div className="flex min-w-max">
          {DRAWER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`h-11 border-b-2 px-4 text-[13px] transition ${
                selectedTab === tab.id
                  ? "border-[#3f74c7] font-semibold text-[#0f1c2e]"
                  : "border-transparent text-[#8fa3bb] hover:text-[#55697f]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[calc(100vh-129px)] overflow-y-auto p-6">
        {selectedTab === "basic" ? <BasicTab member={member} faith={faith} familyCount={family.length} attendance={attendance} /> : null}
        {selectedTab === "family" ? <FamilyTab family={family} /> : null}
        {selectedTab === "service" ? <ServiceTab service={service} /> : null}
        {selectedTab === "history" ? <HistoryTab events={events} /> : null}
      </div>
    </aside>
  );
}
