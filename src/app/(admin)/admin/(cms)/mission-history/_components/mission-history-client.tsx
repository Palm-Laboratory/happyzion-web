"use client";

import { useState, useCallback, useRef, type DragEvent } from "react";
import { useAdminToast } from "../../components/admin-toast-provider";

type MissionTone = "gold" | "red" | null;

type MissionEntry = {
  id: string;
  month: string;
  place: string;
  isFirst: boolean;
};

type MissionYear = {
  id: string;
  year: string;
  caption: string;
  tone: MissionTone;
  entries: MissionEntry[];
};

const MONTHS = [
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

let _nextId = 1;
function genId() {
  return `local-${_nextId++}`;
}

function makeEntry(overrides?: Partial<MissionEntry>): MissionEntry {
  return { id: genId(), month: "", place: "", isFirst: false, ...overrides };
}

function makeYear(overrides?: Partial<MissionYear>): MissionYear {
  return { id: genId(), year: "", caption: "", tone: null, entries: [makeEntry()], ...overrides };
}

function toPayload(draft: MissionYear) {
  return {
    year: draft.year,
    caption: draft.caption,
    tone: draft.tone,
    entries: draft.entries.map((e, i) => ({
      month: e.month === "" ? null : e.month,
      place: e.place,
      isFirst: e.isFirst,
      sortOrder: i,
    })),
  };
}

const TONE_OPTIONS: { value: MissionTone; label: string; dot: string }[] = [
  { value: null, label: "퍼플", dot: "bg-[#8b6db5]" },
  { value: "gold", label: "골드", dot: "bg-[#c9a96e]" },
  { value: "red", label: "레드", dot: "bg-[#b73838]" },
];

function toneDotClass(tone: MissionTone) {
  if (tone === "gold") return "bg-[#c9a96e]";
  if (tone === "red") return "bg-[#b73838]";
  return "bg-[#8b6db5]";
}

function toneTextClass(tone: MissionTone) {
  if (tone === "gold") return "text-[#b08c49]";
  if (tone === "red") return "text-[#b73838]";
  return "text-[#5d6f86]";
}

const ERROR_INPUT = "border-red-400 focus:border-red-400 focus:ring-red-200";
const NORMAL_INPUT = "border-[#d5deea] focus:border-[#3f74c7] focus:ring-[#3f74c7]/20";
const YEAR_MAX_LENGTH = 20;
const TEXT_MAX_LENGTH = 200;

function sanitizeYear(value: string) {
  return value.replace(/[^0-9~-]/g, "");
}

function limitText(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-red-500">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 3.5v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

interface ServerEntry {
  id: number;
  month: string | null;
  place: string;
  isFirst: boolean;
  sortOrder: number;
}

interface ServerYear {
  id: number;
  year: string;
  caption: string;
  tone: string | null;
  sortOrder: number;
  entries: ServerEntry[];
}

function fromServerYear(y: ServerYear): MissionYear {
  return {
    id: String(y.id),
    year: y.year,
    caption: y.caption,
    tone: (y.tone as MissionTone) ?? null,
    entries: y.entries.map((e) => ({
      id: String(e.id),
      month: e.month ?? "",
      place: e.place,
      isFirst: e.isFirst,
    })),
  };
}

export default function MissionHistoryClient({ initialYears }: { initialYears: ServerYear[] }) {
  const toast = useAdminToast();
  const listRef = useRef<HTMLUListElement>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<MissionYear[]>(() => initialYears.map(fromServerYear));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<MissionYear | null>(null);
  const [isNewYear, setIsNewYear] = useState(false);
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());
  const [workingCopies, setWorkingCopies] = useState<Map<string, MissionYear>>(new Map());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [invalidEntryFields, setInvalidEntryFields] = useState<Map<string, Set<string>>>(new Map());

  const selected = items.find((i) => i.id === selectedId) ?? null;
  const isDirty = !!(draft && selected && JSON.stringify(draft) !== JSON.stringify(selected));

  const clearAllErrors = useCallback(() => {
    setInvalidFields(new Set());
    setInvalidEntryFields(new Map());
  }, []);

  const selectYear = useCallback((item: MissionYear) => {
    if (selectedId && draft) {
      if (isNewYear) {
        setItems((prev) => prev.map((i) => i.id === selectedId ? structuredClone(draft) : i));
      } else if (isDirty) {
        setWorkingCopies((prev) => new Map(prev).set(selectedId, structuredClone(draft)));
      } else {
        setWorkingCopies((prev) => {
          if (!prev.has(selectedId)) return prev;
          const next = new Map(prev);
          next.delete(selectedId);
          return next;
        });
      }
    }
    const workingCopy = workingCopies.get(item.id);
    setSelectedId(item.id);
    setDraft(structuredClone(workingCopy ?? item));
    setIsNewYear(newItemIds.has(item.id));
    setShowCancelConfirm(false);
    setShowDeleteConfirm(false);
    clearAllErrors();
  }, [clearAllErrors, newItemIds, isNewYear, draft, selectedId, isDirty, workingCopies]);

  const handleAddYear = useCallback(() => {
    const newYear = makeYear();
    setItems((prev) => [...prev, newYear]);
    setSelectedId(newYear.id);
    setDraft(structuredClone(newYear));
    setIsNewYear(true);
    setShowCancelConfirm(false);
    setNewItemIds((prev) => new Set(prev).add(newYear.id));
    clearAllErrors();
    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [clearAllErrors]);

  const handleSave = useCallback(async () => {
    if (!draft) return;

    const newInvalidFields = new Set<string>();
    if (!draft.year.trim()) newInvalidFields.add("year");
    else if (!/^[0-9~-]+$/.test(draft.year)) newInvalidFields.add("year");
    if (!draft.caption.trim()) newInvalidFields.add("caption");
    setInvalidFields(newInvalidFields);

    const newInvalidEntryFields = new Map<string, Set<string>>();
    for (const e of draft.entries) {
      const fieldErrors = new Set<string>();
      if (!e.place.trim()) fieldErrors.add("place");
      if (fieldErrors.size > 0) newInvalidEntryFields.set(e.id, fieldErrors);
    }
    setInvalidEntryFields(newInvalidEntryFields);

    if (newInvalidFields.size > 0 || newInvalidEntryFields.size > 0) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = toPayload(draft);

      if (isNewYear) {
        const res = await fetch("/api/admin/mission-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = (await res.json()) as { message?: string };
          toast.error(err.message ?? "저장에 실패했습니다.");
          return;
        }
        const saved = (await res.json()) as ServerYear;
        const savedItem = fromServerYear(saved);
        setItems((prev) => prev.map((item) => item.id === draft.id ? savedItem : item));
        setSelectedId(savedItem.id);
        setDraft(structuredClone(savedItem));
        setNewItemIds((prev) => { const next = new Set(prev); next.delete(draft.id); return next; });
        setWorkingCopies((prev) => { const next = new Map(prev); next.delete(draft.id); return next; });
      } else {
        const res = await fetch(`/api/admin/mission-history/${draft.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = (await res.json()) as { message?: string };
          toast.error(err.message ?? "저장에 실패했습니다.");
          return;
        }
        const saved = (await res.json()) as ServerYear;
        const savedItem = fromServerYear(saved);
        setItems((prev) => prev.map((item) => item.id === draft.id ? savedItem : item));
        setDraft(structuredClone(savedItem));
        setWorkingCopies((prev) => { const next = new Map(prev); next.delete(draft.id); return next; });
      }

      setIsNewYear(false);
      setShowCancelConfirm(false);
      clearAllErrors();
      toast.success("변경사항이 저장되었습니다.");
    } catch {
      toast.error("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  }, [draft, isNewYear, clearAllErrors, toast]);

  const updateDraftField = useCallback(<K extends keyof MissionYear>(key: K, value: MissionYear[K]) => {
    let nextValue = value;
    if (key === "year" && typeof value === "string") {
      nextValue = limitText(sanitizeYear(value), YEAR_MAX_LENGTH) as MissionYear[K];
    }
    if (key === "caption" && typeof value === "string") {
      nextValue = limitText(value, TEXT_MAX_LENGTH) as MissionYear[K];
    }

    if ((key === "year" || key === "caption") && typeof nextValue === "string" && nextValue.trim() !== "") {
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
    setDraft((prev) => prev ? { ...prev, [key]: nextValue } : prev);
  }, []);

  const updateEntry = useCallback((entryId: string, field: keyof MissionEntry, value: string | boolean) => {
    const nextValue = field === "place" && typeof value === "string"
      ? limitText(value, TEXT_MAX_LENGTH)
      : value;

    if (typeof nextValue === "string" && nextValue !== "") {
      setInvalidEntryFields((prev) => {
        const next = new Map(prev);
        const fields = next.get(entryId);
        if (fields) {
          fields.delete(field);
          if (fields.size === 0) next.delete(entryId);
          else next.set(entryId, fields);
        }
        return next;
      });
    }
    setDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, entries: prev.entries.map((e) => e.id === entryId ? { ...e, [field]: nextValue } : e) };
    });
  }, []);

  const handleCancelNew = useCallback(() => {
    if (!selectedId) return;
    const savedItem = items.find((i) => i.id === selectedId);
    const hasContent = savedItem && (
      savedItem.year.trim() ||
      savedItem.caption.trim() ||
      savedItem.entries.some((e) => e.month || e.place.trim())
    );
    if (isDirty || hasContent) {
      setShowCancelConfirm(true);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== selectedId));
    setNewItemIds((prev) => { const next = new Set(prev); next.delete(selectedId); return next; });
    setSelectedId(null);
    setDraft(null);
    setIsNewYear(false);
    clearAllErrors();
  }, [selectedId, isDirty, items, clearAllErrors]);

  const confirmCancel = useCallback(() => {
    if (!selectedId) return;
    if (isNewYear) {
      setItems((prev) => prev.filter((item) => item.id !== selectedId));
      setNewItemIds((prev) => { const next = new Set(prev); next.delete(selectedId); return next; });
      setSelectedId(null);
      setDraft(null);
      setIsNewYear(false);
    } else {
      const original = items.find((i) => i.id === selectedId);
      if (original) setDraft(structuredClone(original));
      setWorkingCopies((prev) => { const next = new Map(prev); next.delete(selectedId); return next; });
    }
    setShowCancelConfirm(false);
    clearAllErrors();
  }, [selectedId, isNewYear, items, clearAllErrors]);

  const handleDelete = useCallback(async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/mission-history/${selectedId}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const err = (await res.json()) as { message?: string };
        toast.error(err.message ?? "삭제에 실패했습니다.");
        return;
      }
      setItems((prev) => prev.filter((item) => item.id !== selectedId));
      setSelectedId(null);
      setDraft(null);
      setIsNewYear(false);
      setShowDeleteConfirm(false);
      clearAllErrors();
      toast.success("삭제되었습니다.");
    } catch {
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId, clearAllErrors, toast]);

  const addEntry = useCallback(() => {
    setDraft((prev) => prev ? { ...prev, entries: [...prev.entries, makeEntry()] } : prev);
    setTimeout(() => {
      detailScrollRef.current?.scrollTo({ top: detailScrollRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  }, []);

  const removeEntry = useCallback((entryId: string) => {
    setInvalidEntryFields((prev) => {
      const next = new Map(prev);
      next.delete(entryId);
      return next;
    });
    setDraft((prev) => prev ? { ...prev, entries: prev.entries.filter((e) => e.id !== entryId) } : prev);
  }, []);

  const [draggingEntryId, setDraggingEntryId] = useState<string | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);

  const handleEntryDragStart = useCallback((e: DragEvent<HTMLDivElement>, entryId: string) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggingEntryId(entryId);
  }, []);

  const handleEntryDragOver = useCallback((e: DragEvent<HTMLDivElement>, entryIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const rect = e.currentTarget.getBoundingClientRect();
    const isAfter = e.clientY > rect.top + rect.height / 2;
    setDropIndicatorIndex(entryIndex + (isAfter ? 1 : 0));
  }, []);

  const handleEntryDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggingEntryId || dropIndicatorIndex === null) {
      setDraggingEntryId(null);
      setDropIndicatorIndex(null);
      return;
    }
    const fromId = draggingEntryId;
    const toIndicator = dropIndicatorIndex;
    setDraft((prev) => {
      if (!prev) return prev;
      const entries = [...prev.entries];
      const fromIdx = entries.findIndex((en) => en.id === fromId);
      if (fromIdx === -1) return prev;
      const insertAt = toIndicator > fromIdx ? toIndicator - 1 : toIndicator;
      const [moved] = entries.splice(fromIdx, 1);
      entries.splice(insertAt, 0, moved);
      return { ...prev, entries };
    });
    setDraggingEntryId(null);
    setDropIndicatorIndex(null);
  }, [draggingEntryId, dropIndicatorIndex]);

  const resetEntryDrag = useCallback(() => {
    setDraggingEntryId(null);
    setDropIndicatorIndex(null);
  }, []);

  const changeCount = (() => {
    if (!draft || !selected) return 0;
    let count = 0;
    if (draft.year !== selected.year) count++;
    if (draft.caption !== selected.caption) count++;
    if (draft.tone !== selected.tone) count++;
    const savedEntryMap = new Map(selected.entries.map((e) => [e.id, e]));
    const draftEntryMap = new Map(draft.entries.map((e) => [e.id, e]));
    for (const e of selected.entries) {
      if (!draftEntryMap.has(e.id)) count++;
    }
    for (const e of draft.entries) {
      const saved = savedEntryMap.get(e.id);
      if (!saved) count++;
      else if (e.month !== saved.month || e.place !== saved.place || e.isFirst !== saved.isFirst) count++;
    }
    const orderChanged = draft.entries.some((e, i) => e.id !== selected.entries[i]?.id);
    if (orderChanged) count++;
    return count;
  })();

  const hasEntryErrors = invalidEntryFields.size > 0;
  const hasHeaderErrors = invalidFields.size > 0;
  const saveDisabled = (!isDirty && !isNewYear) || isSaving;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      {/* 좌측: 연도 목록 */}
      <div className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white">
        <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
          <div>
            <p className="text-[13px] font-bold text-[#132033]">연도 목록</p>
            <p className="text-[11px] text-[#6d7f95]">선택하면 오른쪽에서 편집할 수 있습니다</p>
          </div>
          <button
            type="button"
            onClick={handleAddYear}
            className="flex items-center gap-1.5 rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-1.5 text-[12px] font-semibold text-[#2d5da8] transition hover:bg-[#edf4ff]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            새 연도 추가
          </button>
        </div>

        <ul ref={listRef} className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)", minHeight: 420 }}>
          {items.map((item) => {
            const isActive = item.id === selectedId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => selectYear(item)}
                  className={`flex w-full items-center gap-6 px-4 py-3 text-left transition-colors border-b border-[#f1f5f9] ${
                    isActive
                      ? "bg-[#edf4ff] border-l-2 border-[#3f74c7]"
                      : "border-l-2 border-transparent hover:bg-[#f8fafc]"
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${toneDotClass(item.tone)}`} />
                  <span className={`w-[72px] shrink-0 font-suit text-[14px] ${isActive ? (item.tone === "gold" ? "text-[#b08c49]" : item.tone === "red" ? "text-[#b73838]" : "text-[#5d3d8a]") : "text-[#132033]"}`} style={{ fontWeight: 800 }}>
                    {item.year || <span className="text-[#94a3b8]">미입력</span>}
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[13px] ${isActive ? (item.tone === null ? "text-[#5d3d8a]" : toneTextClass(item.tone)) : "text-[#5d6f86]"}`}>
                    {item.caption || <span className="text-[#94a3b8] italic">캡션 없음</span>}
                  </span>
                  {newItemIds.has(item.id) && (
                    <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                      신규
                    </span>
                  )}
                  {!newItemIds.has(item.id) && (item.id === selectedId ? isDirty : workingCopies.has(item.id)) && (
                    <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-600">
                      수정
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 우측: 상세 편집 */}
      <div className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white">
        <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
          <p className="text-[13px] font-bold text-[#132033]">{isNewYear ? "새 연도 추가" : "상세 편집"}</p>
          {draft ? (
            <div className="flex items-center gap-2">
              {isNewYear && (
                <button
                  type="button"
                  onClick={handleCancelNew}
                  disabled={isSaving}
                  className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  취소
                </button>
              )}
              {!isNewYear && isDirty && (
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(true)}
                  disabled={isSaving}
                  className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  취소
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#3f74c7] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#2d5da8] disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={saveDisabled}
              >
                {isSaving ? "저장 중..." : isNewYear ? "저장" : "변경사항 저장"}
                {!isSaving && isDirty && changeCount > 0 && ` (${changeCount})`}
              </button>
            </div>
          ) : null}
        </div>

        {draft ? (
          <>
          <div ref={detailScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 취소 확인 패널 */}
            {showCancelConfirm && (
              <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[13px] font-black text-white">!</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-amber-900">저장되지 않은 내용은 사라집니다.</p>
                    <p className="mt-1 text-[12px] leading-5 text-amber-800">{isNewYear ? "취소하면 입력한 내용이 모두 삭제됩니다." : "변경사항을 취소하면 원래 내용으로 돌아갑니다."}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={confirmCancel}
                        className="rounded-lg bg-amber-500 px-5 py-2.5 text-[13px] font-bold text-white hover:bg-amber-600"
                      >
                        확인
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCancelConfirm(false)}
                        className="rounded-lg border border-amber-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-amber-700 hover:bg-amber-50"
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 연도 정보 섹션 */}
            <div className="rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4 space-y-4">
              <p className="text-[12px] font-semibold text-[#334155]">연도 정보</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-[#5d6f86]">연도</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9~-]*"
                    maxLength={YEAR_MAX_LENGTH}
                    value={draft.year}
                    onChange={(e) => updateDraftField("year", e.target.value)}
                    placeholder="예) 2026"
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-[#0f1c2e] placeholder:text-[#b0bec9] focus:outline-none focus:ring-2 ${
                      invalidFields.has("year") ? ERROR_INPUT : NORMAL_INPUT
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold text-[#5d6f86]">캡션</label>
                  <input
                    type="text"
                    maxLength={TEXT_MAX_LENGTH}
                    value={draft.caption}
                    onChange={(e) => updateDraftField("caption", e.target.value)}
                    placeholder="예) 선교는 계속됩니다"
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-[#0f1c2e] placeholder:text-[#b0bec9] focus:outline-none focus:ring-2 ${
                      invalidFields.has("caption") ? ERROR_INPUT : NORMAL_INPUT
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#5d6f86]">색상</label>
                <div className="flex gap-2">
                  {TONE_OPTIONS.map((opt) => {
                    const isSelected = draft.tone === opt.value;
                    return (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => updateDraftField("tone", opt.value)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition ${
                          isSelected
                            ? "border-[#3f74c7] bg-[#edf4ff] text-[#2d5da8]"
                            : "border-[#d5deea] bg-white text-[#5d6f86] hover:bg-[#f8fafc]"
                        }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${opt.dot}`} />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasHeaderErrors && (
                <ErrorMessage
                  message={
                    invalidFields.has("year") && invalidFields.has("caption")
                      ? "연도와 캡션을 입력해주세요."
                      : invalidFields.has("year")
                      ? "연도는 숫자와 -, ~만 입력해주세요."
                      : "캡션을 입력해주세요."
                  }
                />
              )}
            </div>

            {/* 선교 목록 섹션 */}
            <div className="rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4 space-y-3">
              <p className="text-[12px] font-semibold text-[#334155]">선교 목록</p>

              <div className="space-y-2">
                <div className="grid items-center gap-2" style={{ gridTemplateColumns: "20px 120px 1fr 50px 28px" }}>
                  <span />
                  <span className="text-[11px] font-semibold text-[#94a3b8]">월</span>
                  <span className="text-[11px] font-semibold text-[#94a3b8]">나라/지역명</span>
                  <span className="text-[11px] font-semibold text-[#94a3b8]">FIRST</span>
                  <span />
                </div>

                {draft.entries.map((entry, entryIndex) => {
                  const entryErrors = invalidEntryFields.get(entry.id);
                  const isDragging = draggingEntryId === entry.id;
                  const showTopLine = dropIndicatorIndex === entryIndex && draggingEntryId !== entry.id;
                  const showBottomLine = dropIndicatorIndex === entryIndex + 1 && entryIndex === draft.entries.length - 1 && draggingEntryId !== entry.id;
                  return (
                    <div
                      key={entry.id}
                      draggable
                      onDragStart={(e) => handleEntryDragStart(e, entry.id)}
                      onDragOver={(e) => handleEntryDragOver(e, entryIndex)}
                      onDrop={handleEntryDrop}
                      onDragEnd={resetEntryDrag}
                      className={`relative grid items-center gap-2 py-1 rounded ${isDragging ? "opacity-40" : ""}`}
                      style={{ gridTemplateColumns: "20px 120px 1fr 50px 28px" }}
                    >
                      {showTopLine && (
                        <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-0.5 rounded-full bg-[#3f74c7]" />
                      )}
                      {showBottomLine && (
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-0.5 rounded-full bg-[#3f74c7]" />
                      )}
                      <div className="flex cursor-grab items-center justify-center text-[#c0cdd9] active:cursor-grabbing">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <circle cx="4" cy="2.5" r="1" fill="currentColor" />
                          <circle cx="8" cy="2.5" r="1" fill="currentColor" />
                          <circle cx="4" cy="6" r="1" fill="currentColor" />
                          <circle cx="8" cy="6" r="1" fill="currentColor" />
                          <circle cx="4" cy="9.5" r="1" fill="currentColor" />
                          <circle cx="8" cy="9.5" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="relative w-full">
                        <select
                          value={entry.month}
                          onChange={(e) => updateEntry(entry.id, "month", e.target.value)}
                          className={`w-full appearance-none rounded-md border bg-white pl-2 pr-7 py-1.5 text-[12px] text-[#0f1c2e] focus:outline-none focus:ring-1 ${
                            entryErrors?.has("month") ? ERROR_INPUT : NORMAL_INPUT
                          }`}
                        >
                          <option value="">월 미표기</option>
                          {MONTHS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#94a3b8]" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        maxLength={TEXT_MAX_LENGTH}
                        value={entry.place}
                        onChange={(e) => updateEntry(entry.id, "place", e.target.value)}
                        placeholder="나라 또는 지역명"
                        className={`w-full rounded-md border bg-white px-2 py-1.5 text-[12px] text-[#0f1c2e] placeholder:text-[#b0bec9] focus:outline-none focus:ring-1 ${
                          entryErrors?.has("place") ? ERROR_INPUT : NORMAL_INPUT
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => updateEntry(entry.id, "isFirst", !entry.isFirst)}
                        role="switch"
                        aria-checked={entry.isFirst}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 ${
                          entry.isFirst ? "border-emerald-500 bg-emerald-500" : "border-[#d5deea] bg-[#e8eef6]"
                        }`}
                      >
                        <span className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform duration-200 ${entry.isFirst ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        disabled={draft.entries.length === 1}
                        className="rounded-md p-1 text-[#b0bec9] transition hover:bg-[#fee2e2] hover:text-[#b73838] disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label="항목 삭제"
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                          <path d="M2 2l9 9M11 2L2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={addEntry}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#d5deea] py-2 text-[12px] font-medium text-[#8fa3bb] transition hover:border-[#3f74c7]/40 hover:text-[#3f74c7]"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                항목 추가
              </button>

              {hasEntryErrors && (
                <ErrorMessage message="나라/지역명이 입력되지 않은 항목이 있습니다." />
              )}
            </div>
          </div>
          {!isNewYear && (
            <div className="shrink-0 border-t border-[#eef2f7] px-4 py-4">
              {showDeleteConfirm ? (
                <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-600 text-[13px] font-black text-white">!</span>
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-rose-900">선교 이력을 삭제합니다.</p>
                      <p className="mt-1 text-[12px] leading-5 text-rose-800">이 작업은 저장 버튼과 별개로 바로 반영됩니다.</p>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="rounded-lg bg-rose-700 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-rose-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isDeleting ? "삭제 중..." : "삭제 확정"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={isDeleting}
                          className="rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  즉시 삭제
                </button>
              )}
            </div>
          )}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center" style={{ minHeight: 420 }}>
            <p className="text-[13px] text-[#94a3b8]">왼쪽에서 편집할 연도를 선택해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
