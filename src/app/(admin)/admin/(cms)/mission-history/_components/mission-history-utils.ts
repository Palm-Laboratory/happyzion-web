import type { MissionEntry, MissionTone, MissionYear, ServerYear } from "./mission-history-types";

export const MONTHS = [
  { value: "Jan", label: "JAN - 1월" },
  { value: "Feb", label: "FEB - 2월" },
  { value: "Mar", label: "MAR - 3월" },
  { value: "Apr", label: "APR - 4월" },
  { value: "May", label: "MAY - 5월" },
  { value: "Jun", label: "JUN - 6월" },
  { value: "Jul", label: "JUL - 7월" },
  { value: "Aug", label: "AUG - 8월" },
  { value: "Sep", label: "SEP - 9월" },
  { value: "Oct", label: "OCT - 10월" },
  { value: "Nov", label: "NOV - 11월" },
  { value: "Dec", label: "DEC - 12월" },
];

export const TONE_OPTIONS: { value: MissionTone; label: string; dot: string }[] = [
  { value: null, label: "퍼플", dot: "bg-[#8b6db5]" },
  { value: "gold", label: "골드", dot: "bg-[#c9a96e]" },
  { value: "red", label: "레드", dot: "bg-[#b73838]" },
];

export const ERROR_INPUT = "border-red-400 focus:border-red-400 focus:ring-red-200";
export const NORMAL_INPUT = "border-[#d5deea] focus:border-[#3f74c7] focus:ring-[#3f74c7]/20";
export const YEAR_MAX_LENGTH = 20;
export const TEXT_MAX_LENGTH = 200;

let nextId = 1;
export function genId() {
  return `local-${nextId++}`;
}

export function makeEntry(overrides?: Partial<MissionEntry>): MissionEntry {
  return { id: genId(), month: "", place: "", isFirst: false, ...overrides };
}

export function makeYear(overrides?: Partial<MissionYear>): MissionYear {
  return { id: genId(), year: "", caption: "", tone: null, entries: [makeEntry()], ...overrides };
}

export function toPayload(draft: MissionYear) {
  return {
    year: draft.year,
    caption: draft.caption,
    tone: draft.tone,
    entries: draft.entries.map((entry, index) => ({
      month: entry.month === "" ? null : entry.month,
      place: entry.place,
      isFirst: entry.isFirst,
      sortOrder: index,
    })),
  };
}

export function fromServerYear(year: ServerYear): MissionYear {
  return {
    id: String(year.id),
    year: year.year,
    caption: year.caption,
    tone: (year.tone as MissionTone) ?? null,
    entries: year.entries.map((entry) => ({
      id: String(entry.id),
      month: entry.month ?? "",
      place: entry.place,
      isFirst: entry.isFirst,
    })),
  };
}

export function toneDotClass(tone: MissionTone) {
  if (tone === "gold") return "bg-[#c9a96e]";
  if (tone === "red") return "bg-[#b73838]";
  return "bg-[#8b6db5]";
}

export function toneTextClass(tone: MissionTone) {
  if (tone === "gold") return "text-[#b08c49]";
  if (tone === "red") return "text-[#b73838]";
  return "text-[#5d6f86]";
}

export function sanitizeYear(value: string) {
  return value.replace(/[^0-9~-]/g, "");
}

export function limitText(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

export function countYearChanges(draft: MissionYear | null, selected: MissionYear | null) {
  if (!draft || !selected) return 0;

  let count = 0;
  if (draft.year !== selected.year) count++;
  if (draft.caption !== selected.caption) count++;
  if (draft.tone !== selected.tone) count++;

  const savedEntryMap = new Map(selected.entries.map((entry) => [entry.id, entry]));
  const draftEntryMap = new Map(draft.entries.map((entry) => [entry.id, entry]));

  for (const entry of selected.entries) {
    if (!draftEntryMap.has(entry.id)) count++;
  }
  for (const entry of draft.entries) {
    const saved = savedEntryMap.get(entry.id);
    if (!saved) count++;
    else if (entry.month !== saved.month || entry.place !== saved.place || entry.isFirst !== saved.isFirst) count++;
  }

  if (draft.entries.some((entry, index) => entry.id !== selected.entries[index]?.id)) {
    count++;
  }

  return count;
}
