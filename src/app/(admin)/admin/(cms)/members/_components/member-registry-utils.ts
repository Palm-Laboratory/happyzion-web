import {
  type AttendanceStatus,
  type FaithStage,
  type Member,
  type MemberStatus,
  STAGE_META,
  STATUS_META,
} from "./types";

export type DrawerTab = "basic" | "family" | "service" | "history";
export type SortOption = "registered-desc" | "name-asc" | "faith-desc";

export const DRAWER_TABS: Array<{ id: DrawerTab; label: string }> = [
  { id: "basic", label: "기본정보" },
  { id: "family", label: "가족관계" },
  { id: "service", label: "봉사" },
  { id: "history", label: "이력" },
];

export const ATTENDANCE_META: Record<AttendanceStatus, { symbol: string; className: string; label: string }> = {
  ATTEND: { symbol: "●", className: "bg-emerald-500 text-white", label: "출석" },
  ABSENT: { symbol: "○", className: "bg-slate-200 text-slate-600", label: "결석" },
  EXCUSED: { symbol: "E", className: "bg-amber-400 text-white", label: "사유" },
  ONLINE: { symbol: "△", className: "bg-sky-400 text-white", label: "온라인" },
};

export const stageOptions: Array<{ value: FaithStage | "ALL"; label: string }> = [
  { value: "ALL", label: "전체" },
  ...Object.entries(STAGE_META).map(([value, meta]) => ({
    value: value as FaithStage,
    label: `Lv${meta.lv} ${meta.label}`,
  })),
];

export const statusOptions: Array<{ value: MemberStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "전체" },
  ...Object.entries(STATUS_META).map(([value, meta]) => ({
    value: value as MemberStatus,
    label: meta.label,
  })),
];

export const communityLabel = (value?: string | null) => value?.trim() || "미지정";

export const formatBirthCalendar = (calendar: Member["birthCalendar"]) => (calendar === "SOLAR" ? "양" : "음");

export const formatMonthBucket = (value: string) => value.slice(0, 7);

export function compareMembers(a: Member, b: Member, sort: SortOption) {
  if (sort === "name-asc") {
    return a.name.localeCompare(b.name, "ko");
  }

  if (sort === "faith-desc") {
    return STAGE_META[b.faithStage].lv - STAGE_META[a.faithStage].lv;
  }

  return b.registeredAt.localeCompare(a.registeredAt);
}
