"use client";

import Link from "next/link";
import { Avatar, CellBadge, OfficeBadge, StageBadge, StatusBadge } from "./badges";
import { type FaithStage, type Member, type MemberStatus, STAGE_META, STATUS_META } from "./types";
import type { MemberRegistryController } from "./use-member-registry-controller";
import {
  communityLabel,
  stageOptions,
  statusOptions,
  type SortOption,
} from "./member-registry-utils";

interface MemberRegistryListProps {
  controller: MemberRegistryController;
  initialMembers: Member[];
  initialTotal: number;
  availableCells: Array<{ id: string; label: string }>;
  loadError?: string | null;
}

export function MemberRegistryList({
  controller,
  initialMembers,
  initialTotal,
  availableCells,
  loadError,
}: MemberRegistryListProps) {
  return (
    <>
      <SummaryCards members={initialMembers} total={initialTotal} />
      {loadError ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {loadError}
        </section>
      ) : null}
      <MemberFilters controller={controller} availableCells={availableCells} />
    </>
  );
}

function SummaryCards({ members, total }: { members: Member[]; total: number }) {
  return (
    <section className="overflow-x-auto pb-1">
      <div className="grid min-w-[1040px] grid-cols-5 gap-3">
        <SummaryCard label="전체 교인" value={total} suffix="명" accent="text-[#0f1c2e]" />
        <SummaryCard label="출석 교인" value={members.filter((member) => member.status === "ACTIVE").length} suffix="명" accent="text-emerald-600" />
        <SummaryCard label="새가족" value={members.filter((member) => member.status === "NEW").length} suffix="명" accent="text-blue-600" />
        <SummaryCard label="쉼 / 장결" value={members.filter((member) => member.status === "RESTING" || member.status === "LONG_ABSENT").length} suffix="명" accent="text-yellow-600" />
        <SummaryCard label="현재 로드" value={members.length} suffix="건" accent="text-orange-500" />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix: string;
  accent: string;
}) {
  return (
    <div className="rounded-3xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
      <p className={`text-[11px] font-semibold ${accent}`}>{label}</p>
      <p className={`mt-1 text-[22px] font-bold ${accent}`}>
        {value} <span className="text-[12px] font-normal text-[#8fa3bb]">{suffix}</span>
      </p>
    </div>
  );
}

function MemberFilters({
  controller,
  availableCells,
}: {
  controller: MemberRegistryController;
  availableCells: Array<{ id: string; label: string }>;
}) {
  return (
    <section className="rounded-3xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="검색어" className="min-w-[240px] flex-1">
          <input
            value={controller.query}
            onChange={(event) => controller.setQuery(event.target.value)}
            placeholder="이름, 연락처, 주소"
            className="h-10 w-full rounded-xl border border-[#d5deea] px-3 text-[13px] text-[#0f1c2e] outline-none transition focus:border-[#3f74c7]"
          />
        </Field>

        <Field label="공동체">
          <select
            value={controller.selectedCell}
            onChange={(event) => controller.setSelectedCell(event.target.value)}
            className="h-10 rounded-xl border border-[#d5deea] bg-white px-3 text-[13px] text-[#0f1c2e] outline-none transition focus:border-[#3f74c7]"
          >
            <option value="ALL">전체</option>
            {availableCells.map((cell) => (
              <option key={cell.id} value={cell.id}>
                {cell.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="상태">
          <select
            value={controller.selectedStatus}
            onChange={(event) => controller.setSelectedStatus(event.target.value as MemberStatus | "ALL")}
            className="h-10 rounded-xl border border-[#d5deea] bg-white px-3 text-[13px] text-[#0f1c2e] outline-none transition focus:border-[#3f74c7]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="신앙 레벨">
          <select
            value={controller.selectedStage}
            onChange={(event) => controller.setSelectedStage(event.target.value as FaithStage | "ALL")}
            className="h-10 rounded-xl border border-[#d5deea] bg-white px-3 text-[13px] text-[#0f1c2e] outline-none transition focus:border-[#3f74c7]"
          >
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <button type="button" onClick={controller.applyFilters} className="h-10 rounded-xl bg-[#3f74c7] px-5 text-[13px] font-semibold text-white">
          검색
        </button>
        <button
          type="button"
          onClick={controller.resetFilters}
          className="h-10 rounded-xl border border-[#d5deea] bg-white px-4 text-[12px] font-medium text-[#55697f]"
        >
          초기화
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {controller.selectedCell !== "ALL" ? (
          <FilterBadge label={`공동체: ${availableCells.find((cell) => cell.id === controller.selectedCell)?.label ?? controller.selectedCell}`} />
        ) : null}
        {controller.selectedStatus !== "ALL" ? <FilterBadge label={`상태: ${STATUS_META[controller.selectedStatus].label}`} /> : null}
        {controller.selectedStage !== "ALL" ? <FilterBadge label={`레벨: Lv${STAGE_META[controller.selectedStage].lv} ${STAGE_META[controller.selectedStage].label}`} /> : null}
      </div>
    </section>
  );
}

export function MemberTable({
  controller,
  initialTotal,
  initialHasNext,
}: {
  controller: MemberRegistryController;
  initialTotal: number;
  initialHasNext: boolean;
}) {
  return (
    <section className={`relative z-10 overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm transition ${controller.selectedMember ? "xl:opacity-70" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf2f7] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#5d6f86]">
            전체 <span className="font-semibold text-[#132033]">{initialTotal}</span>건
          </span>
          <span className="text-[11px] text-[#8fa3bb]">{initialHasNext ? "추가 페이지 있음" : "현재 결과 마지막 페이지"}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 text-[11px] text-[#55697f]">
            정렬
            <select
              value={controller.sort}
              onChange={(event) => controller.setSort(event.target.value as SortOption)}
              className="h-8 rounded-lg border border-[#d5deea] bg-white px-2 text-[11px]"
            >
              <option value="registered-desc">등록일 ↓</option>
              <option value="name-asc">이름 가나다</option>
              <option value="faith-desc">신앙 레벨 ↓</option>
            </select>
          </label>
          <Link href="/admin/members/new" className="inline-flex h-8 items-center rounded-lg bg-[#3f74c7] px-3 text-[11px] font-semibold text-white">
            + 새 교인 등록
          </Link>
          <Link href="/admin/attendance" className="inline-flex h-8 items-center rounded-lg border border-[#bfd0ea] bg-[#edf4ff] px-3 text-[11px] font-semibold text-[#2d5da8]">
            출석 관리
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1120px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#edf2f7] bg-[#f8fafc]">
              <th className="w-[80px] px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">사진</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">이름</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">연락처</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">주소</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">공동체</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">신앙 레벨</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">등록일</th>
              <th className="px-4 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">상태</th>
            </tr>
          </thead>
          <tbody>
            {controller.members.map((member) => (
              <MemberRow key={member.id} member={member} controller={controller} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MemberRow({ member, controller }: { member: Member; controller: MemberRegistryController }) {
  const isSelected = controller.selectedMember?.id === member.id;

  return (
    <tr
      className={`cursor-pointer border-b border-[#f0f4f8] transition hover:bg-[#f8fbff] ${isSelected ? "bg-[#edf4ff]/50" : ""}`}
      onClick={() => controller.updateSearch({ id: member.id, tab: controller.selectedTab })}
    >
      <td className="px-4 py-3">
        <Avatar initial={member.initial} grad={member.avatarGrad} size="sm" />
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[13px] font-semibold ${isSelected ? "text-[#2d5da8]" : "text-[#0f1c2e]"}`}>
            {member.name}
          </span>
          <OfficeBadge office={member.office} />
        </div>
        <div className="mt-1 text-[11px] text-[#8fa3bb]">
          {member.baptismName ? `세례명 ${member.baptismName} · ` : ""}
          {member.age}세
        </div>
      </td>
      <td className="px-4 py-3 text-[12px] text-[#55697f]">{member.phone}</td>
      <td className="px-4 py-3 text-[12px] text-[#55697f]">{member.address}</td>
      <td className="px-4 py-3">
        <CellBadge label={communityLabel(member.cellLabel)} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <StageBadge stage={member.faithStage} />
          {member.faithStageSuggestion ? (
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
              제안
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-4 py-3 text-[12px] text-[#55697f]">{member.registeredAt}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={member.status} />
          {member.statusSuggestion ? <span className="h-2 w-2 rounded-full bg-amber-400" /> : null}
        </div>
      </td>
    </tr>
  );
}

function FilterBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#2d5da8]">
      {label}
    </span>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[11px] font-semibold text-[#55697f]">{label}</span>
      {children}
    </label>
  );
}
