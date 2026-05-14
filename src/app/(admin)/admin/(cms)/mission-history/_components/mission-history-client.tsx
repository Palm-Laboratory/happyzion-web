"use client";

import { useState, useCallback } from "react";
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

const INITIAL_DATA: MissionYear[] = [
  { id: genId(), year: "2007", caption: "선교의 첫 발을 내딛다", tone: "gold", entries: [makeEntry({ month: "May", place: "필리핀 팡가시난", isFirst: true })] },
  { id: genId(), year: "2008", caption: "두 번째 여름, 같은 땅에서", tone: null, entries: [makeEntry({ month: "May", place: "필리핀 팡가시난" })] },
  { id: genId(), year: "2009", caption: "말레이시아로 지경을 넓히다", tone: "gold", entries: [makeEntry({ month: "Feb", place: "말레이시아", isFirst: true }), makeEntry({ month: "May", place: "필리핀" })] },
  { id: genId(), year: "2010", caption: "두 땅에서 복음을 전하다", tone: null, entries: [makeEntry({ month: "Feb", place: "말레이시아" }), makeEntry({ month: "May", place: "필리핀" })] },
  { id: genId(), year: "2011", caption: "아시아를 향한 꾸준한 발걸음", tone: null, entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "말레이시아" })] },
  { id: genId(), year: "2012", caption: "흔들림 없이, 해마다", tone: null, entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "말레이시아" })] },
  { id: genId(), year: "2013", caption: "캄보디아 첫 사역", tone: "gold", entries: [makeEntry({ month: "Feb", place: "캄보디아", isFirst: true }), makeEntry({ month: "May", place: "필리핀 팡가시난" })] },
  { id: genId(), year: "2014", caption: "중국까지, 새로운 사역의 문", tone: "gold", entries: [makeEntry({ month: "Feb", place: "필리핀 팡가시난" }), makeEntry({ month: "May", place: "말레이시아" }), makeEntry({ month: "Oct", place: "중국", isFirst: true })] },
  { id: genId(), year: "2015", caption: "선교사역은 계속되고", tone: "gold", entries: [makeEntry({ month: "Feb", place: "필리핀 팡가시난" }), makeEntry({ month: "May", place: "태국 칸차나부리" }), makeEntry({ month: "Oct", place: "캄보디아", isFirst: true })] },
  { id: genId(), year: "2016", caption: "인도네시아로, 복음의 걸음 더하기", tone: "gold", entries: [makeEntry({ month: "Feb", place: "인도네시아", isFirst: true }), makeEntry({ month: "May", place: "캄보디아" }), makeEntry({ month: "Oct", place: "중국" })] },
  { id: genId(), year: "2017", caption: "미얀마까지, 사역을 넓히며", tone: "gold", entries: [makeEntry({ month: "Feb", place: "미얀마", isFirst: true }), makeEntry({ month: "May", place: "인도네시아" }), makeEntry({ month: "Oct", place: "중국" })] },
  { id: genId(), year: "2018", caption: "다음 땅을 바라보며", tone: "gold", entries: [makeEntry({ month: "Feb", place: "인도네시아" }), makeEntry({ month: "May", place: "미얀마" }), makeEntry({ month: "Oct", place: "파라과이", isFirst: true })] },
  { id: genId(), year: "2019", caption: "다시 미얀마로", tone: null, entries: [makeEntry({ month: "Feb", place: "인도네시아" }), makeEntry({ month: "May", place: "미얀마" }), makeEntry({ month: "Oct", place: "필리핀" })] },
  { id: genId(), year: "2020-21", caption: "잠시 멈춘 기간", tone: "red", entries: [makeEntry({ month: "", place: "코로나19로 인해 제한된 선교 중단" })] },
  { id: genId(), year: "2022", caption: "그리움 뒤 다시, 다시", tone: "gold", entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "인도네시아" }), makeEntry({ month: "Oct", place: "필리핀" })] },
  { id: genId(), year: "2023", caption: "회복의 걸음을 이어가다", tone: null, entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "인도네시아" }), makeEntry({ month: "Oct", place: "파라과이" })] },
  { id: genId(), year: "2024", caption: "몽골까지, 땅끝을 향해", tone: "gold", entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "몽골", isFirst: true }), makeEntry({ month: "Oct", place: "태국" })] },
  { id: genId(), year: "2025", caption: "변함없이, 오늘도", tone: null, entries: [makeEntry({ month: "Feb", place: "필리핀" }), makeEntry({ month: "May", place: "태국", isFirst: true }), makeEntry({ month: "Oct", place: "인도네시아" })] },
  { id: genId(), year: "2026", caption: "선교는 계속됩니다", tone: null, entries: [makeEntry({ month: "Feb", place: "필리핀" })] },
];

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

export default function MissionHistoryClient() {
  const toast = useAdminToast();
  const [items, setItems] = useState<MissionYear[]>(INITIAL_DATA);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<MissionYear | null>(null);
  const [isNewYear, setIsNewYear] = useState(false);
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // 연도 정보 에러: 'year' | 'caption'
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  // 선교 목록 에러: entry id → 어떤 필드가 invalid인지
  const [invalidEntryFields, setInvalidEntryFields] = useState<Map<string, Set<string>>>(new Map());

  const selected = items.find((i) => i.id === selectedId) ?? null;
  const isDirty = !!(draft && selected && JSON.stringify(draft) !== JSON.stringify(selected));

  const clearAllErrors = useCallback(() => {
    setInvalidFields(new Set());
    setInvalidEntryFields(new Map());
  }, []);

  const selectYear = useCallback((item: MissionYear) => {
    setSelectedId(item.id);
    setDraft(structuredClone(item));
    setIsNewYear((prev) => newItemIds.has(item.id) ? true : false);
    setShowCancelConfirm(false);
    setShowDeleteConfirm(false);
    clearAllErrors();
  }, [clearAllErrors, newItemIds]);

  const handleAddYear = useCallback(() => {
    const newYear = makeYear();
    setItems((prev) => [...prev, newYear]);
    setSelectedId(newYear.id);
    setDraft(structuredClone(newYear));
    setIsNewYear(true);
    setShowCancelConfirm(false);
    setNewItemIds((prev) => new Set(prev).add(newYear.id));
    clearAllErrors();
  }, [clearAllErrors]);

  const handleSave = useCallback(() => {
    if (!draft) return;

    const newInvalidFields = new Set<string>();
    if (!draft.year.trim()) newInvalidFields.add("year");
    if (!draft.caption.trim()) newInvalidFields.add("caption");
    setInvalidFields(newInvalidFields);

    const newInvalidEntryFields = new Map<string, Set<string>>();
    for (const e of draft.entries) {
      const fieldErrors = new Set<string>();
      if (e.month === "") fieldErrors.add("month");
      if (!e.place.trim()) fieldErrors.add("place");
      if (fieldErrors.size > 0) newInvalidEntryFields.set(e.id, fieldErrors);
    }
    setInvalidEntryFields(newInvalidEntryFields);

    if (newInvalidFields.size > 0 || newInvalidEntryFields.size > 0) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsNewYear(false);
    setShowCancelConfirm(false);
    setNewItemIds((prev) => { const next = new Set(prev); next.delete(draft.id); return next; });
    setItems((prev) => prev.map((item) => (item.id === draft.id ? structuredClone(draft) : item)));
    toast.success("변경사항이 저장되었습니다.");
  }, [draft, toast]);

  const updateDraftField = useCallback(<K extends keyof MissionYear>(key: K, value: MissionYear[K]) => {
    if ((key === "year" || key === "caption") && typeof value === "string" && value.trim() !== "") {
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
    setDraft((prev) => prev ? { ...prev, [key]: value } : prev);
  }, []);

  const updateEntry = useCallback((entryId: string, field: keyof MissionEntry, value: string | boolean) => {
    if (typeof value === "string" && value !== "") {
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
      return { ...prev, entries: prev.entries.map((e) => e.id === entryId ? { ...e, [field]: value } : e) };
    });
  }, []);

  const handleCancelNew = useCallback(() => {
    if (!selectedId) return;
    if (isDirty) {
      setShowCancelConfirm(true);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== selectedId));
    setNewItemIds((prev) => { const next = new Set(prev); next.delete(selectedId); return next; });
    setSelectedId(null);
    setDraft(null);
    setIsNewYear(false);
    clearAllErrors();
  }, [selectedId, isDirty, clearAllErrors]);

  const confirmCancel = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((item) => item.id !== selectedId));
    setNewItemIds((prev) => { const next = new Set(prev); next.delete(selectedId); return next; });
    setSelectedId(null);
    setDraft(null);
    setIsNewYear(false);
    setShowCancelConfirm(false);
    clearAllErrors();
  }, [selectedId, clearAllErrors]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => prev.filter((item) => item.id !== selectedId));
    setSelectedId(null);
    setDraft(null);
    setIsNewYear(false);
    setShowDeleteConfirm(false);
    setNewItemIds((prev) => { const next = new Set(prev); next.delete(selectedId); return next; });
    clearAllErrors();
    toast.success("삭제되었습니다.");
  }, [selectedId, clearAllErrors, toast]);

  const addEntry = useCallback(() => {
    setDraft((prev) => prev ? { ...prev, entries: [...prev.entries, makeEntry()] } : prev);
  }, []);

  const removeEntry = useCallback((entryId: string) => {
    setInvalidEntryFields((prev) => {
      const next = new Map(prev);
      next.delete(entryId);
      return next;
    });
    setDraft((prev) => prev ? { ...prev, entries: prev.entries.filter((e) => e.id !== entryId) } : prev);
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
    return count;
  })();

  const hasEntryErrors = invalidEntryFields.size > 0;
  const hasHeaderErrors = invalidFields.size > 0;

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

        <ul className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)", minHeight: 420 }}>
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
                  className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                >
                  취소
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#3f74c7] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#2d5da8] disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!isDirty}
              >
                {isNewYear ? "저장" : "변경사항 저장"}
                {isDirty && changeCount > 0 && ` (${changeCount})`}
              </button>
            </div>
          ) : null}
        </div>

        {draft ? (
          <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 취소 확인 패널 */}
            {showCancelConfirm && (
              <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[13px] font-black text-white">!</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-amber-900">저장되지 않은 내용은 사라집니다.</p>
                    <p className="mt-1 text-[12px] leading-5 text-amber-800">취소하면 입력한 내용이 모두 삭제됩니다.</p>
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
                      ? "연도를 입력해주세요."
                      : "캡션을 입력해주세요."
                  }
                />
              )}
            </div>

            {/* 선교 목록 섹션 */}
            <div className="rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4 space-y-3">
              <p className="text-[12px] font-semibold text-[#334155]">선교 목록</p>

              <div className="space-y-2">
                <div className="grid items-center gap-2" style={{ gridTemplateColumns: "120px 1fr 50px 28px" }}>
                  <span className="text-[11px] font-semibold text-[#94a3b8]">월</span>
                  <span className="text-[11px] font-semibold text-[#94a3b8]">나라/지역명</span>
                  <span className="text-[11px] font-semibold text-[#94a3b8]">FIRST</span>
                  <span />
                </div>

                {draft.entries.map((entry) => {
                  const entryErrors = invalidEntryFields.get(entry.id);
                  return (
                    <div
                      key={entry.id}
                      className="grid items-center gap-2 py-1"
                      style={{ gridTemplateColumns: "120px 1fr 50px 28px" }}
                    >
                      <div className="relative w-full">
                        <select
                          value={entry.month}
                          onChange={(e) => updateEntry(entry.id, "month", e.target.value)}
                          className={`w-full appearance-none rounded-md border bg-white pl-2 pr-7 py-1.5 text-[12px] text-[#0f1c2e] focus:outline-none focus:ring-1 ${
                            entryErrors?.has("month") ? ERROR_INPUT : NORMAL_INPUT
                          }`}
                        >
                          <option value="">월 선택</option>
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
                <ErrorMessage message="필수 항목(월, 나라/지역명)이 입력되지 않은 항목이 있습니다." />
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
                          className="rounded-lg bg-rose-700 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-rose-800"
                        >
                          삭제 확정
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          className="rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-rose-700 hover:bg-rose-50"
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
