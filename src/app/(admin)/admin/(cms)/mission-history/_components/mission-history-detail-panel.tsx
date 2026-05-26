"use client";

import type { DragEvent, RefObject } from "react";
import type { InvalidEntryFields, MissionEntry, MissionYear } from "./mission-history-types";
import { CancelConfirmPanel, EntryListSection, YearInfoSection } from "./mission-history-form-parts";

interface MissionHistoryDetailPanelProps {
  draft: MissionYear | null;
  isNewYear: boolean;
  isDirty: boolean;
  hasPendingOtherChanges: boolean;
  reorderedCount: number;
  changeCount: number;
  saveDisabled: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  showCancelConfirm: boolean;
  showDeleteConfirm: boolean;
  invalidFields: Set<string>;
  invalidEntryFields: InvalidEntryFields;
  draggingEntryId: string | null;
  dropIndicatorIndex: number | null;
  detailScrollRef: RefObject<HTMLDivElement | null>;
  onCancelNew: () => void;
  onRequestCancel: () => void;
  onDismissCancel: () => void;
  onConfirmCancel: () => void;
  onSave: () => void;
  onUpdateDraftField: <K extends keyof MissionYear>(key: K, value: MissionYear[K]) => void;
  onUpdateEntry: (entryId: string, field: keyof MissionEntry, value: string | boolean) => void;
  onAddEntry: () => void;
  onRemoveEntry: (entryId: string) => void;
  onEntryDragStart: (event: DragEvent<HTMLDivElement>, entryId: string) => void;
  onEntryDragOver: (event: DragEvent<HTMLDivElement>, entryIndex: number) => void;
  onEntryDrop: (event: DragEvent<HTMLDivElement>) => void;
  onEntryDragEnd: () => void;
  onRequestDelete: () => void;
  onDismissDelete: () => void;
  onDelete: () => void;
}

export function MissionHistoryDetailPanel({
  draft,
  isNewYear,
  isDirty,
  hasPendingOtherChanges,
  reorderedCount,
  changeCount,
  saveDisabled,
  isSaving,
  isDeleting,
  showCancelConfirm,
  showDeleteConfirm,
  invalidFields,
  invalidEntryFields,
  draggingEntryId,
  dropIndicatorIndex,
  detailScrollRef,
  onCancelNew,
  onRequestCancel,
  onDismissCancel,
  onConfirmCancel,
  onSave,
  onUpdateDraftField,
  onUpdateEntry,
  onAddEntry,
  onRemoveEntry,
  onEntryDragStart,
  onEntryDragOver,
  onEntryDrop,
  onEntryDragEnd,
  onRequestDelete,
  onDismissDelete,
  onDelete,
}: MissionHistoryDetailPanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white">
      <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
        <p className="text-[13px] font-bold text-[#132033]">{isNewYear ? "새 연도 추가" : "상세 편집"}</p>
        <div className="flex items-center gap-2">
          {draft && isNewYear && (
            <button
              type="button"
              onClick={onCancelNew}
              disabled={isSaving}
              className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              취소
            </button>
          )}
          {draft && !isNewYear && (isDirty || hasPendingOtherChanges) && (
            <button
              type="button"
              onClick={onRequestCancel}
              disabled={isSaving}
              className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              취소
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-[#3f74c7] px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#2d5da8] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={saveDisabled}
          >
            {isSaving
              ? "저장 중..."
              : isNewYear
                ? "저장"
                : "변경사항 저장"}
            {!isSaving && changeCount + reorderedCount > 0 && ` (${changeCount + reorderedCount})`}
          </button>
        </div>
      </div>

      {draft ? (
        <>
          <div ref={detailScrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {showCancelConfirm && (
              <CancelConfirmPanel isNewYear={isNewYear} onConfirm={onConfirmCancel} onDismiss={onDismissCancel} />
            )}

            <YearInfoSection draft={draft} invalidFields={invalidFields} onUpdateField={onUpdateDraftField} />

            <EntryListSection
              entries={draft.entries}
              invalidEntryFields={invalidEntryFields}
              draggingEntryId={draggingEntryId}
              dropIndicatorIndex={dropIndicatorIndex}
              onUpdateEntry={onUpdateEntry}
              onAddEntry={onAddEntry}
              onRemoveEntry={onRemoveEntry}
              onDragStart={onEntryDragStart}
              onDragOver={onEntryDragOver}
              onDrop={onEntryDrop}
              onDragEnd={onEntryDragEnd}
            />
          </div>
          {!isNewYear && (
            <DeleteMissionYearSection
              showDeleteConfirm={showDeleteConfirm}
              isDeleting={isDeleting}
              onRequestDelete={onRequestDelete}
              onDismissDelete={onDismissDelete}
              onDelete={onDelete}
            />
          )}
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center" style={{ minHeight: 420 }}>
          <p className="text-[13px] text-[#94a3b8]">왼쪽에서 편집할 연도를 선택해주세요.</p>
        </div>
      )}
    </div>
  );
}

function DeleteMissionYearSection({
  showDeleteConfirm,
  isDeleting,
  onRequestDelete,
  onDismissDelete,
  onDelete,
}: {
  showDeleteConfirm: boolean;
  isDeleting: boolean;
  onRequestDelete: () => void;
  onDismissDelete: () => void;
  onDelete: () => void;
}) {
  return (
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
                  onClick={onDelete}
                  disabled={isDeleting}
                  className="rounded-lg bg-rose-700 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? "삭제 중..." : "삭제 확정"}
                </button>
                <button
                  type="button"
                  onClick={onDismissDelete}
                  disabled={isDeleting}
                  className="rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
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
          onClick={onRequestDelete}
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-semibold text-rose-700 transition hover:bg-rose-100"
        >
          즉시 삭제
        </button>
      )}
    </div>
  );
}
