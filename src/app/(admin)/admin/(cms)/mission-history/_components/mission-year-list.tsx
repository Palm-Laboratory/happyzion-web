"use client";

import type { DragEvent, RefObject } from "react";
import type { MissionYear } from "./mission-history-types";
import { toneDotClass, toneTextClass } from "./mission-history-utils";

interface MissionYearListProps {
  items: MissionYear[];
  selectedId: string | null;
  newItemIds: Set<string>;
  workingCopies: Map<string, MissionYear>;
  isDirty: boolean;
  reorderedItemIds: Set<string>;
  canMoveYearUp: boolean;
  canMoveYearDown: boolean;
  draggingYearId: string | null;
  dropYearIndicatorIndex: number | null;
  listRef: RefObject<HTMLUListElement | null>;
  onAddYear: () => void;
  onSelectYear: (item: MissionYear) => void;
  onMoveYearUp: () => void;
  onMoveYearDown: () => void;
  onYearDragStart: (event: DragEvent<HTMLButtonElement>, yearId: string) => void;
  onYearDragOver: (event: DragEvent<HTMLButtonElement>, yearIndex: number) => void;
  onYearDrop: (event: DragEvent<HTMLButtonElement>) => void;
  onYearDragEnd: () => void;
  onRollbackOrder: () => void;
}

export function MissionYearList({
  items,
  selectedId,
  newItemIds,
  workingCopies,
  isDirty,
  reorderedItemIds,
  canMoveYearUp,
  canMoveYearDown,
  draggingYearId,
  dropYearIndicatorIndex,
  listRef,
  onAddYear,
  onSelectYear,
  onMoveYearUp,
  onMoveYearDown,
  onYearDragStart,
  onYearDragOver,
  onYearDrop,
  onYearDragEnd,
  onRollbackOrder,
}: MissionYearListProps) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-3 border-b border-[#eef2f7] px-4 py-3">
        <div>
          <p className="text-[13px] font-bold text-[#132033]">연도 목록</p>
          <p className="text-[11px] text-[#6d7f95]">드래그하거나 버튼으로 순서를 바꿀 수 있습니다</p>
        </div>
        <button
          type="button"
          onClick={onAddYear}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-1.5 text-[12px] font-semibold text-[#2d5da8] transition hover:bg-[#edf4ff]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          새 연도 추가
        </button>
      </div>

      {/* 순서 조작 컨트롤 */}
      <div className="flex items-center gap-2 border-b border-[#eef2f7] px-4 py-2">
        <button
          type="button"
          onClick={onMoveYearUp}
          disabled={!canMoveYearUp}
          aria-label="선택한 연도 위로 이동"
          className="flex items-center gap-1 rounded-lg border border-[#d7e3f4] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M6 9.5V2.5M2.5 6 6 2.5 9.5 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          위로
        </button>
        <button
          type="button"
          onClick={onMoveYearDown}
          disabled={!canMoveYearDown}
          aria-label="선택한 연도 아래로 이동"
          className="flex items-center gap-1 rounded-lg border border-[#d7e3f4] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M6 2.5v7M9.5 6 6 9.5 2.5 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          아래로
        </button>
        {reorderedItemIds.size > 0 && (
          <button
            type="button"
            onClick={onRollbackOrder}
            aria-label="순서 변경 취소"
            className="ml-auto flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[12px] font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 4h5.5a3 3 0 0 1 0 6H4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 2 2 4l2 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            순서 되돌리기
          </button>
        )}
      </div>

      {/* 연도 목록 */}
      <ul
        ref={listRef}
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 340px)", minHeight: 360 }}
      >
        {items.map((item, index) => {
          const isActive = item.id === selectedId;
          const hasLocalChanges =
            (item.id === selectedId ? isDirty : workingCopies.has(item.id)) ||
            reorderedItemIds.has(item.id);
          const isDragging = item.id === draggingYearId;
          const showTopDropLine = dropYearIndicatorIndex === index;
          const showBottomDropLine =
            dropYearIndicatorIndex === items.length && index === items.length - 1;

          return (
            <li key={item.id} className="relative">
              {showTopDropLine && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 right-3 top-0 z-10 h-0.5 rounded-full bg-[#3f74c7]"
                />
              )}
              <button
                type="button"
                draggable
                onClick={() => onSelectYear(item)}
                onDragStart={(event) => onYearDragStart(event, item.id)}
                onDragOver={(event) => onYearDragOver(event, index)}
                onDrop={onYearDrop}
                onDragEnd={onYearDragEnd}
                aria-grabbed={isDragging}
                className={`flex w-full items-center gap-3 border-b border-[#f1f5f9] px-4 py-3 text-left transition-colors ${
                  isDragging ? "opacity-40" : ""
                } ${
                  isActive
                    ? "border-l-2 border-[#3f74c7] bg-[#edf4ff]"
                    : "border-l-2 border-transparent hover:bg-[#f8fafc]"
                }`}
              >
                {/* 드래그 핸들 */}
                <span
                  className="flex h-5 w-4 shrink-0 cursor-grab items-center justify-center text-[#cbd5e1] active:cursor-grabbing"
                  aria-hidden="true"
                >
                  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <circle cx="2.5" cy="2.5" r="1.2" fill="currentColor" />
                    <circle cx="7.5" cy="2.5" r="1.2" fill="currentColor" />
                    <circle cx="2.5" cy="7" r="1.2" fill="currentColor" />
                    <circle cx="7.5" cy="7" r="1.2" fill="currentColor" />
                    <circle cx="2.5" cy="11.5" r="1.2" fill="currentColor" />
                    <circle cx="7.5" cy="11.5" r="1.2" fill="currentColor" />
                  </svg>
                </span>

                <span className={`h-2 w-2 shrink-0 rounded-full ${toneDotClass(item.tone)}`} />

                <span
                  className={`w-[72px] shrink-0 font-suit text-[14px] ${
                    isActive
                      ? item.tone === "gold"
                        ? "text-[#b08c49]"
                        : item.tone === "red"
                          ? "text-[#b73838]"
                          : "text-[#5d3d8a]"
                      : "text-[#132033]"
                  }`}
                  style={{ fontWeight: 800 }}
                >
                  {item.year || <span className="text-[#94a3b8]">미입력</span>}
                </span>

                <span
                  className={`min-w-0 flex-1 truncate text-[13px] ${
                    isActive
                      ? item.tone === null
                        ? "text-[#5d3d8a]"
                        : toneTextClass(item.tone)
                      : "text-[#5d6f86]"
                  }`}
                >
                  {item.caption || <span className="italic text-[#94a3b8]">캡션 없음</span>}
                </span>

                {newItemIds.has(item.id) && (
                  <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    신규
                  </span>
                )}
                {!newItemIds.has(item.id) && hasLocalChanges && (
                  <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600">
                    수정
                  </span>
                )}
              </button>

              {showBottomDropLine && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-3 right-3 z-10 h-0.5 rounded-full bg-[#3f74c7]"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
