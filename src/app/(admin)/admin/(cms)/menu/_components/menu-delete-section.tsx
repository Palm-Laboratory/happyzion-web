"use client";

import type { EditorNode } from "./menu-tree-utils";

type Props = {
  selectedNode: EditorNode;
  confirmingSelectedDelete: boolean;
  descendantIds: Set<number>;
  onRequestDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
};

export function MenuDeleteSection({
  selectedNode,
  confirmingSelectedDelete,
  descendantIds,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}: Props) {
  if (selectedNode.isAuto) return null;
  if (selectedNode.type === "STATIC") return null;

  if (confirmingSelectedDelete) {
    return (
      <div className="w-full rounded-xl border-2 border-rose-300 bg-rose-50 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-600 text-[13px] font-black text-white">
            !
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-rose-900">
              {selectedNode.label} 메뉴를 삭제합니다.
            </p>
            <p className="mt-2 text-[12px] leading-5 text-rose-800">
              이 작업은 저장 버튼과 별개로 바로 반영됩니다.
              {descendantIds.size > 0
                ? ` 하위 메뉴 ${descendantIds.size}개도 함께 삭제됩니다.`
                : ""}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onConfirmDelete}
            className="rounded-lg bg-rose-700 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-rose-800"
          >
            삭제 확정
          </button>
          <button
            type="button"
            onClick={onCancelDelete}
            className="rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-rose-700 hover:bg-rose-50"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onRequestDelete}
      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-semibold text-rose-700"
    >
      즉시 삭제
    </button>
  );
}
