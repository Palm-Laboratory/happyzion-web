"use client";

import type { DragEvent, RefObject } from "react";
import { useEffect } from "react";
import { STATUS_LABEL, STATUS_META } from "./menu-tree-constants";
import {
  type DropIndicator,
  type EditorNode,
  findSiblingList,
  getMenuTypeDisplayLabel,
} from "./menu-tree-utils";

type Props = {
  flatItems: Array<{ node: EditorNode; depth: number }>;
  items: EditorNode[];
  selectedId: number | null;
  expandedRootIds: Set<number>;
  treeFocusRequest: { id: number; token: number } | null;
  changedMenuIds: Set<number>;
  draggingMenuId: number | null;
  dropIndicator: DropIndicator | null;
  treeScrollRef: RefObject<HTMLDivElement | null>;
  onSelect: (id: number) => void;
  onToggleRootExpanded: (id: number) => void;
  onAddMenu: () => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>, nodeId: number) => void;
  onDragOver: (
    event: DragEvent<HTMLButtonElement>,
    nodeId: number,
    draggingId: number | null,
  ) => void;
  onDrop: (
    event: DragEvent<HTMLButtonElement>,
    nodeId: number,
    draggingId: number | null,
    indicator: DropIndicator | null,
  ) => void;
  onDragEnd: () => void;
};

function canDropOnMenu(
  items: EditorNode[],
  activeId: number | null,
  overId: number,
): boolean {
  if (activeId === null || activeId === overId) return false;

  const findNodeLocal = (nodes: EditorNode[], id: number): EditorNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const child = findNodeLocal(node.children, id);
      if (child) return child;
    }
    return null;
  };

  const activeNode = findNodeLocal(items, activeId);
  const overNode = findNodeLocal(items, overId);
  return Boolean(activeNode && overNode && activeNode.parentId === overNode.parentId);
}

export function MenuTreePanel({
  flatItems,
  items,
  selectedId,
  expandedRootIds,
  treeFocusRequest,
  changedMenuIds,
  draggingMenuId,
  dropIndicator,
  treeScrollRef,
  onSelect,
  onToggleRootExpanded,
  onAddMenu,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: Props) {
  useEffect(() => {
    if (!treeFocusRequest || !treeScrollRef.current) return;

    const frame = window.requestAnimationFrame(() => {
      const target = treeScrollRef.current?.querySelector<HTMLButtonElement>(
        `[data-menu-tree-node-id="${treeFocusRequest.id}"]`,
      );
      target?.scrollIntoView({ block: "nearest" });
      target?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [treeFocusRequest, treeScrollRef]);

  return (
    <section className="flex max-h-[calc(100vh-220px)] min-h-[520px] flex-col rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#edf2f7] px-5 py-4">
        <div>
          <h2 className="text-[14px] font-bold text-[#132033]">메뉴 트리</h2>
          <p className="mt-1 text-[11px] text-[#6d7f95]">
            같은 단계의 메뉴는 드래그해서 순서를 바꿀 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddMenu}
          className="rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-2 text-[12px] font-semibold text-[#2d5da8]"
        >
          상단 메뉴 추가
        </button>
      </div>

      <div ref={treeScrollRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {flatItems.length === 0 ? (
          <p className="px-3 py-6 text-[13px] text-[#6d7f95]">등록된 메뉴가 없습니다.</p>
        ) : (
          <ul className="space-y-1">
            {flatItems.map(({ node, depth }) => {
              const canToggle = depth === 0 && node.children.length > 0;
              const isExpanded = expandedRootIds.has(node.id);
              const typeLabel = getMenuTypeDisplayLabel(node);
              const isStaticTypeLabel = typeLabel === "정적 페이지 그룹" || node.type === "STATIC";
              const siblings = findSiblingList(items, node.id);
              const siblingIndex = siblings?.findIndex((item) => item.id === node.id) ?? -1;
              const showTopDropLine =
                Boolean(dropIndicator) &&
                dropIndicator?.parentId === node.parentId &&
                dropIndicator?.index === siblingIndex;
              const showBottomDropLine =
                Boolean(dropIndicator) &&
                dropIndicator?.parentId === node.parentId &&
                siblings !== null &&
                dropIndicator?.index === siblings.length &&
                siblingIndex === siblings.length - 1;
              const dropDisabled =
                draggingMenuId !== null &&
                draggingMenuId !== node.id &&
                !canDropOnMenu(items, draggingMenuId, node.id);

              return (
                <li key={node.id}>
                  <button
                    type="button"
                    data-menu-tree-node-id={node.id}
                    draggable
                    onClick={() => onSelect(node.id)}
                    onDragStart={(event) => onDragStart(event, node.id)}
                    onDragOver={(event) => onDragOver(event, node.id, draggingMenuId)}
                    onDrop={(event) => onDrop(event, node.id, draggingMenuId, dropIndicator)}
                    onDragEnd={onDragEnd}
                    aria-grabbed={draggingMenuId === node.id}
                    className={`relative flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                      draggingMenuId === node.id ? "opacity-50" : ""
                    } ${dropDisabled ? "opacity-35 grayscale" : ""} ${
                      selectedId === node.id
                        ? "bg-[#edf4ff] text-[#132033]"
                        : "text-[#334155] hover:bg-[#f8fafc]"
                    }`}
                    style={{ paddingLeft: `${depth * 18 + 12}px` }}
                  >
                    {showTopDropLine && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 right-3 top-0 z-10 h-1 rounded-full bg-[#f59e0b]"
                      />
                    )}
                    {showBottomDropLine && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-3 right-3 z-10 h-1 rounded-full bg-[#f59e0b]"
                      />
                    )}
                    <span className="flex min-w-0 items-center gap-2">
                      {canToggle ? (
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`${node.label} ${isExpanded ? "접기" : "펼치기"}`}
                          aria-expanded={isExpanded}
                          onClick={(event) => {
                            event.stopPropagation();
                            onToggleRootExpanded(node.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key !== "Enter" && event.key !== " ") return;
                            event.preventDefault();
                            event.stopPropagation();
                            onToggleRootExpanded(node.id);
                          }}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#d7e3f4] bg-white text-[#64748b] transition hover:bg-[#f1f5f9]"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            aria-hidden="true"
                          >
                            <path
                              d="M4.25 2.5L7.75 6L4.25 9.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="h-6 w-6 shrink-0" aria-hidden="true" />
                      )}
                      <span
                        className="flex h-7 w-5 shrink-0 items-center justify-center rounded-md text-[#94a3b8]"
                        aria-hidden="true"
                      >
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                          <circle cx="3" cy="3" r="1.2" fill="currentColor" />
                          <circle cx="9" cy="3" r="1.2" fill="currentColor" />
                          <circle cx="3" cy="8" r="1.2" fill="currentColor" />
                          <circle cx="9" cy="8" r="1.2" fill="currentColor" />
                          <circle cx="3" cy="13" r="1.2" fill="currentColor" />
                          <circle cx="9" cy="13" r="1.2" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold">
                          {node.label}
                        </span>
                        <span
                          className={`mt-0.5 block truncate text-[11px] ${
                            isStaticTypeLabel ? "font-semibold text-[#d9ab06]" : "text-[#8fa3bb]"
                          }`}
                        >
                          {typeLabel}
                        </span>
                      </span>
                    </span>
                    <span className="ml-3 flex items-center gap-2">
                      {changedMenuIds.has(node.id) && (
                        <span className="rounded-full bg-[#fff4d6] px-2 py-0.5 text-[10px] font-semibold text-[#9a5b00]">
                          {node.id < 0 ? "신규" : "수정됨"}
                        </span>
                      )}
                      {node.isAuto && (
                        <span className="rounded-full bg-[#e2e8f0] px-2 py-0.5 text-[10px] font-semibold text-[#475569]">
                          자동
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_META[node.status]}`}
                      >
                        {STATUS_LABEL[node.status]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
