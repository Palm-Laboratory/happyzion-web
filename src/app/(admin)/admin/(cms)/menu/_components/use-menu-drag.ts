"use client";

import { type DragEvent, useEffect, useRef, useState } from "react";
import { AUTO_SCROLL_EDGE_THRESHOLD_PX, AUTO_SCROLL_MAX_SPEED_PX } from "./menu-tree-constants";
import {
  type DropIndicator,
  type EditorNode,
  findNode,
  findSiblingList,
  moveNodeToSiblingIndex,
} from "./menu-tree-utils";

type UseMenuDragOptions = {
  itemsRef: React.RefObject<EditorNode[]>;
  markDirty: (nextItems: EditorNode[]) => void;
  setSelectedId: (id: number) => void;
};

export function useMenuDrag({ itemsRef, markDirty, setSelectedId }: UseMenuDragOptions) {
  const [draggingMenuId, setDraggingMenuId] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);

  const treeScrollRef = useRef<HTMLDivElement>(null);
  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollVelocityRef = useRef(0);

  const stopAutoScroll = () => {
    if (autoScrollFrameRef.current !== null) {
      cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
    autoScrollVelocityRef.current = 0;
  };

  const tickAutoScroll = () => {
    const container = treeScrollRef.current;
    const velocity = autoScrollVelocityRef.current;

    if (!container || velocity === 0) {
      autoScrollFrameRef.current = null;
      return;
    }

    const previousScrollTop = container.scrollTop;
    container.scrollTop += velocity;

    if (container.scrollTop === previousScrollTop) {
      autoScrollFrameRef.current = null;
      return;
    }

    autoScrollFrameRef.current = requestAnimationFrame(tickAutoScroll);
  };

  const startAutoScroll = () => {
    if (autoScrollFrameRef.current !== null) return;
    autoScrollFrameRef.current = requestAnimationFrame(tickAutoScroll);
  };

  const updateAutoScroll = (clientY: number) => {
    const container = treeScrollRef.current;
    if (!container) {
      stopAutoScroll();
      return;
    }

    const rect = container.getBoundingClientRect();
    const distanceFromTop = clientY - rect.top;
    const distanceFromBottom = rect.bottom - clientY;

    let nextVelocity = 0;

    if (distanceFromTop >= 0 && distanceFromTop < AUTO_SCROLL_EDGE_THRESHOLD_PX) {
      const ratio = (AUTO_SCROLL_EDGE_THRESHOLD_PX - distanceFromTop) / AUTO_SCROLL_EDGE_THRESHOLD_PX;
      nextVelocity = -Math.max(4, Math.round(AUTO_SCROLL_MAX_SPEED_PX * ratio));
    } else if (distanceFromBottom >= 0 && distanceFromBottom < AUTO_SCROLL_EDGE_THRESHOLD_PX) {
      const ratio = (AUTO_SCROLL_EDGE_THRESHOLD_PX - distanceFromBottom) / AUTO_SCROLL_EDGE_THRESHOLD_PX;
      nextVelocity = Math.max(4, Math.round(AUTO_SCROLL_MAX_SPEED_PX * ratio));
    }

    autoScrollVelocityRef.current = nextVelocity;

    if (nextVelocity === 0) {
      stopAutoScroll();
      return;
    }

    startAutoScroll();
  };

  const resetDragState = () => {
    stopAutoScroll();
    setDraggingMenuId(null);
    setDropIndicator(null);
  };

  const canDropOnMenu = (activeId: number | null, overId: number) => {
    const items = itemsRef.current;
    if (activeId === null || activeId === overId) return false;
    const activeNode = findNode(items, activeId);
    const overNode = findNode(items, overId);
    return Boolean(activeNode && overNode && activeNode.parentId === overNode.parentId);
  };

  const handleMenuDragStart = (event: DragEvent<HTMLButtonElement>, nodeId: number) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(nodeId));
    setDraggingMenuId(nodeId);
    setDropIndicator(null);
    updateAutoScroll(event.clientY);
  };

  const handleMenuDragOver = (
    event: DragEvent<HTMLButtonElement>,
    nodeId: number,
    currentDraggingId: number | null,
  ) => {
    updateAutoScroll(event.clientY);

    if (!canDropOnMenu(currentDraggingId, nodeId)) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const items = itemsRef.current;
    const siblings = findSiblingList(items, nodeId);
    const overIndex = siblings?.findIndex((node) => node.id === nodeId) ?? -1;

    if (!siblings || overIndex === -1) {
      setDropIndicator(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const isAfter = event.clientY > rect.top + rect.height / 2;
    setDropIndicator({
      parentId: findNode(items, nodeId)?.parentId ?? null,
      index: overIndex + (isAfter ? 1 : 0),
    });
  };

  const handleMenuDrop = (
    event: DragEvent<HTMLButtonElement>,
    nodeId: number,
    currentDraggingId: number | null,
    currentDropIndicator: DropIndicator | null,
  ) => {
    event.preventDefault();
    if (!canDropOnMenu(currentDraggingId, nodeId) || currentDraggingId === null || !currentDropIndicator) {
      resetDragState();
      return;
    }

    markDirty(moveNodeToSiblingIndex(itemsRef.current, currentDraggingId, currentDropIndicator.index));
    setSelectedId(currentDraggingId);
    resetDragState();
  };

  useEffect(() => () => stopAutoScroll(), []);

  return {
    draggingMenuId,
    dropIndicator,
    treeScrollRef,
    handleMenuDragStart,
    handleMenuDragOver,
    handleMenuDrop,
    resetDragState,
  };
}
