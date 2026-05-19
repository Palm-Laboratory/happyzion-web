import type { ChurchMemberStatus, ChurchMemberOffice, FaithStage, Sex } from "@/lib/admin-members-types";
import { CREATABLE_STATUSES, EDITABLE_STATUSES } from "@/lib/admin-members-types";

export const STATUS_LABELS: Record<ChurchMemberStatus, string> = {
  ACTIVE: "재적",
  NEW: "새가족",
  RESTING: "쉼",
  LONG_ABSENT: "장기결석",
  TRANSFERRED_OUT: "이명",
  DECEASED: "소천",
  REMOVED: "제적",
};

export const OFFICE_LABELS: Record<ChurchMemberOffice, string> = {
  LAY: "성도",
  DEACON_TEMP: "서리집사",
  DEACON: "안수집사",
  GWONSA: "권사",
  ELDER: "장로",
  ELDER_EMERITUS: "원로장로",
  EVANGELIST: "전도사",
  PASTOR: "목사",
};

export const FAITH_STAGE_LABELS: Record<FaithStage, string> = {
  SEEKER: "구도자",
  NEW_COMER: "새가족",
  SETTLED: "정착",
  GROWING: "성장",
  DISCIPLE: "제자",
  MINISTER: "사역자",
  LEADER: "리더",
};

export const SEX_LABELS: Record<Sex, string> = {
  M: "남",
  F: "여",
};

// Status badge colors for display in list
export const STATUS_BADGE_COLORS: Record<ChurchMemberStatus, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-600",
  NEW: "bg-blue-50 text-blue-600",
  RESTING: "bg-amber-50 text-amber-600",
  LONG_ABSENT: "bg-orange-50 text-orange-600",
  TRANSFERRED_OUT: "bg-purple-50 text-purple-600",
  DECEASED: "bg-[#f1f5f9] text-[#8fa3bb]",
  REMOVED: "bg-red-50 text-red-500",
};

// ── 타입 가드 ──────────────────────────────────────────────────────────────────

const ALL_STATUSES: ChurchMemberStatus[] = [
  "ACTIVE", "NEW", "RESTING", "LONG_ABSENT", "TRANSFERRED_OUT", "DECEASED", "REMOVED",
];
const ALL_OFFICES: ChurchMemberOffice[] = [
  "LAY", "DEACON_TEMP", "DEACON", "GWONSA", "ELDER", "ELDER_EMERITUS", "EVANGELIST", "PASTOR",
];
const ALL_FAITH_STAGES: FaithStage[] = [
  "SEEKER", "NEW_COMER", "SETTLED", "GROWING", "DISCIPLE", "MINISTER", "LEADER",
];
const ALL_SEXES: Sex[] = ["M", "F"];

export function isStatus(v: string): v is ChurchMemberStatus {
  return (ALL_STATUSES as string[]).includes(v);
}

export function isCreatableStatus(v: string): v is Exclude<ChurchMemberStatus, "REMOVED"> {
  return (CREATABLE_STATUSES as string[]).includes(v);
}

export function isOffice(v: string): v is ChurchMemberOffice {
  return (ALL_OFFICES as string[]).includes(v);
}

export function isFaithStage(v: string): v is FaithStage {
  return (ALL_FAITH_STAGES as string[]).includes(v);
}

export function isSex(v: string): v is Sex {
  return (ALL_SEXES as string[]).includes(v);
}

export function isEditableStatus(v: string): v is Exclude<ChurchMemberStatus, "REMOVED"> {
  return (EDITABLE_STATUSES as string[]).includes(v);
}

