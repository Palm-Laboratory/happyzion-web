"use client";

import type { RefObject } from "react";
import type { MissionYear } from "./mission-history-types";
import { toneDotClass, toneTextClass } from "./mission-history-utils";

interface MissionYearListProps {
  items: MissionYear[];
  selectedId: string | null;
  newItemIds: Set<string>;
  workingCopies: Map<string, MissionYear>;
  isDirty: boolean;
  listRef: RefObject<HTMLUListElement | null>;
  onAddYear: () => void;
  onSelectYear: (item: MissionYear) => void;
}

export function MissionYearList({
  items,
  selectedId,
  newItemIds,
  workingCopies,
  isDirty,
  listRef,
  onAddYear,
  onSelectYear,
}: MissionYearListProps) {
  return (
    <div className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white">
      <div className="flex items-center justify-between border-b border-[#eef2f7] px-4 py-3">
        <div>
          <p className="text-[13px] font-bold text-[#132033]">연도 목록</p>
          <p className="text-[11px] text-[#6d7f95]">선택하면 오른쪽에서 편집할 수 있습니다</p>
        </div>
        <button
          type="button"
          onClick={onAddYear}
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
          const hasLocalChanges = item.id === selectedId ? isDirty : workingCopies.has(item.id);

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelectYear(item)}
                className={`flex w-full items-center gap-6 border-b border-[#f1f5f9] px-4 py-3 text-left transition-colors ${
                  isActive ? "border-l-2 border-[#3f74c7] bg-[#edf4ff]" : "border-l-2 border-transparent hover:bg-[#f8fafc]"
                }`}
              >
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
                <span className={`min-w-0 flex-1 truncate text-[13px] ${isActive ? (item.tone === null ? "text-[#5d3d8a]" : toneTextClass(item.tone)) : "text-[#5d6f86]"}`}>
                  {item.caption || <span className="text-[#94a3b8] italic">캡션 없음</span>}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
