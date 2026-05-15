"use client";

import type { DragEvent } from "react";
import type { InvalidEntryFields, MissionEntry, MissionYear } from "./mission-history-types";
import {
  ERROR_INPUT,
  MONTHS,
  NORMAL_INPUT,
  TEXT_MAX_LENGTH,
  TONE_OPTIONS,
  YEAR_MAX_LENGTH,
} from "./mission-history-utils";

export function ErrorMessage({ message }: { message: string }) {
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

export function CancelConfirmPanel({
  isNewYear,
  onConfirm,
  onDismiss,
}: {
  isNewYear: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[13px] font-black text-white">!</span>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-amber-900">저장되지 않은 내용은 사라집니다.</p>
          <p className="mt-1 text-[12px] leading-5 text-amber-800">
            {isNewYear ? "취소하면 입력한 내용이 모두 삭제됩니다." : "변경사항을 취소하면 원래 내용으로 돌아갑니다."}
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={onConfirm} className="rounded-lg bg-amber-500 px-5 py-2.5 text-[13px] font-bold text-white hover:bg-amber-600">
              확인
            </button>
            <button type="button" onClick={onDismiss} className="rounded-lg border border-amber-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-amber-700 hover:bg-amber-50">
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function YearInfoSection({
  draft,
  invalidFields,
  onUpdateField,
}: {
  draft: MissionYear;
  invalidFields: Set<string>;
  onUpdateField: <K extends keyof MissionYear>(key: K, value: MissionYear[K]) => void;
}) {
  return (
    <div className="space-y-4 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
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
            onChange={(event) => onUpdateField("year", event.target.value)}
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
            onChange={(event) => onUpdateField("caption", event.target.value)}
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
          {TONE_OPTIONS.map((option) => {
            const isSelected = draft.tone === option.value;
            return (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => onUpdateField("tone", option.value)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition ${
                  isSelected ? "border-[#3f74c7] bg-[#edf4ff] text-[#2d5da8]" : "border-[#d5deea] bg-white text-[#5d6f86] hover:bg-[#f8fafc]"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${option.dot}`} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {invalidFields.size > 0 && (
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
  );
}

interface EntryListSectionProps {
  entries: MissionEntry[];
  invalidEntryFields: InvalidEntryFields;
  draggingEntryId: string | null;
  dropIndicatorIndex: number | null;
  onUpdateEntry: (entryId: string, field: keyof MissionEntry, value: string | boolean) => void;
  onAddEntry: () => void;
  onRemoveEntry: (entryId: string) => void;
  onDragStart: (event: DragEvent<HTMLDivElement>, entryId: string) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>, entryIndex: number) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

export function EntryListSection({
  entries,
  invalidEntryFields,
  draggingEntryId,
  dropIndicatorIndex,
  onUpdateEntry,
  onAddEntry,
  onRemoveEntry,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: EntryListSectionProps) {
  return (
    <div className="space-y-3 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
      <p className="text-[12px] font-semibold text-[#334155]">선교 목록</p>

      <div className="space-y-2">
        <div className="grid items-center gap-2" style={{ gridTemplateColumns: "20px 120px 1fr 50px 28px" }}>
          <span />
          <span className="text-[11px] font-semibold text-[#94a3b8]">월</span>
          <span className="text-[11px] font-semibold text-[#94a3b8]">나라/지역명</span>
          <span className="text-[11px] font-semibold text-[#94a3b8]">FIRST</span>
          <span />
        </div>

        {entries.map((entry, entryIndex) => (
          <EntryRow
            key={entry.id}
            entry={entry}
            entryIndex={entryIndex}
            entryCount={entries.length}
            entryErrors={invalidEntryFields.get(entry.id)}
            draggingEntryId={draggingEntryId}
            dropIndicatorIndex={dropIndicatorIndex}
            onUpdateEntry={onUpdateEntry}
            onRemoveEntry={onRemoveEntry}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddEntry}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#d5deea] py-2 text-[12px] font-medium text-[#8fa3bb] transition hover:border-[#3f74c7]/40 hover:text-[#3f74c7]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        항목 추가
      </button>

      {invalidEntryFields.size > 0 && <ErrorMessage message="나라/지역명이 입력되지 않은 항목이 있습니다." />}
    </div>
  );
}

function EntryRow({
  entry,
  entryIndex,
  entryCount,
  entryErrors,
  draggingEntryId,
  dropIndicatorIndex,
  onUpdateEntry,
  onRemoveEntry,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  entry: MissionEntry;
  entryIndex: number;
  entryCount: number;
  entryErrors?: Set<string>;
  draggingEntryId: string | null;
  dropIndicatorIndex: number | null;
  onUpdateEntry: EntryListSectionProps["onUpdateEntry"];
  onRemoveEntry: EntryListSectionProps["onRemoveEntry"];
  onDragStart: EntryListSectionProps["onDragStart"];
  onDragOver: EntryListSectionProps["onDragOver"];
  onDrop: EntryListSectionProps["onDrop"];
  onDragEnd: EntryListSectionProps["onDragEnd"];
}) {
  const isDragging = draggingEntryId === entry.id;
  const showTopLine = dropIndicatorIndex === entryIndex && draggingEntryId !== entry.id;
  const showBottomLine = dropIndicatorIndex === entryIndex + 1 && entryIndex === entryCount - 1 && draggingEntryId !== entry.id;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, entry.id)}
      onDragOver={(event) => onDragOver(event, entryIndex)}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`relative grid items-center gap-2 rounded py-1 ${isDragging ? "opacity-40" : ""}`}
      style={{ gridTemplateColumns: "20px 120px 1fr 50px 28px" }}
    >
      {showTopLine && <span aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-0.5 rounded-full bg-[#3f74c7]" />}
      {showBottomLine && <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-0.5 rounded-full bg-[#3f74c7]" />}
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
          onChange={(event) => onUpdateEntry(entry.id, "month", event.target.value)}
          className={`w-full appearance-none rounded-md border bg-white py-1.5 pl-2 pr-7 text-[12px] text-[#0f1c2e] focus:outline-none focus:ring-1 ${
            entryErrors?.has("month") ? ERROR_INPUT : NORMAL_INPUT
          }`}
        >
          <option value="">월 미표기</option>
          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>{month.label}</option>
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
        onChange={(event) => onUpdateEntry(entry.id, "place", event.target.value)}
        placeholder="나라 또는 지역명"
        className={`w-full rounded-md border bg-white px-2 py-1.5 text-[12px] text-[#0f1c2e] placeholder:text-[#b0bec9] focus:outline-none focus:ring-1 ${
          entryErrors?.has("place") ? ERROR_INPUT : NORMAL_INPUT
        }`}
      />
      <button
        type="button"
        onClick={() => onUpdateEntry(entry.id, "isFirst", !entry.isFirst)}
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
        onClick={() => onRemoveEntry(entry.id)}
        disabled={entryCount === 1}
        className="rounded-md p-1 text-[#b0bec9] transition hover:bg-[#fee2e2] hover:text-[#b73838] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="항목 삭제"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 2l9 9M11 2L2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
