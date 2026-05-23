"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { useAdminToast } from "../../components/admin-toast-provider";
import { validateMissionYearDraft } from "./mission-history-schema";
import type { InvalidEntryFields, MissionEntry, MissionYear, ServerYear } from "./mission-history-types";
import {
  countYearChanges,
  fromServerYear,
  limitText,
  makeEntry,
  makeYear,
  sanitizeYear,
  TEXT_MAX_LENGTH,
  toPayload,
  YEAR_MAX_LENGTH,
} from "./mission-history-utils";

async function readMissionHistoryError(response: Response, fallback: string) {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message ?? fallback;
  } catch {
    return fallback;
  }
}

async function createMissionYearRequest(draft: MissionYear) {
  const response = await fetch("/api/admin/mission-history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(draft)),
  });

  if (!response.ok) {
    throw new Error(await readMissionHistoryError(response, "저장에 실패했습니다."));
  }

  return fromServerYear((await response.json()) as ServerYear);
}

async function updateMissionYearRequest(draft: MissionYear) {
  const response = await fetch(`/api/admin/mission-history/${draft.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toPayload(draft)),
  });

  if (!response.ok) {
    throw new Error(await readMissionHistoryError(response, "저장에 실패했습니다."));
  }

  return fromServerYear((await response.json()) as ServerYear);
}

async function deleteMissionYearRequest(yearId: string) {
  const response = await fetch(`/api/admin/mission-history/${yearId}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    throw new Error(await readMissionHistoryError(response, "삭제에 실패했습니다."));
  }
}

export function useMissionHistoryEditor(initialYears: ServerYear[]) {
  const toast = useAdminToast();
  const listRef = useRef<HTMLUListElement>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  // reorder 완료 시 토스트를 억제할지 여부.
  // 순서+내용 동시 저장, 또는 신규 항목 생성 후 chained reorder 시 true로 설정.
  // reorderMutation.onSuccess/onError에서만 false로 초기화한다.
  const suppressReorderToastRef = useRef(false);
  // 신규 항목 저장 후 chained reorder에 사용할 위치 정보.
  // create 성공 시 소비하고 null로 초기화한다.
  const pendingNewItemPositionRef = useRef<{ before: string[]; after: string[] } | null>(null);

  const [items, setItems] = useState<MissionYear[]>(() => initialYears.map(fromServerYear));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<MissionYear | null>(null);
  const [isNewYear, setIsNewYear] = useState(false);
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());
  const [workingCopies, setWorkingCopies] = useState<Map<string, MissionYear>>(new Map());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [invalidEntryFields, setInvalidEntryFields] = useState<InvalidEntryFields>(new Map());
  const [draggingEntryId, setDraggingEntryId] = useState<string | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
  const [draggingYearId, setDraggingYearId] = useState<string | null>(null);
  const [dropYearIndicatorIndex, setDropYearIndicatorIndex] = useState<number | null>(null);
  const [savedYearOrder, setSavedYearOrder] = useState<string[]>(
    () => initialYears.map((y) => String(y.id)),
  );

  const selected = items.find((item) => item.id === selectedId) ?? null;
  const isDirty = Boolean(draft && selected && JSON.stringify(draft) !== JSON.stringify(selected));
  const changeCount = countYearChanges(draft, selected);

  const selectedIndex = selectedId ? items.findIndex((i) => i.id === selectedId) : -1;
  const canMoveYearUp = selectedIndex > 0;
  const canMoveYearDown = selectedIndex !== -1 && selectedIndex < items.length - 1;

  const reorderedItemIds = new Set(
    items
      .filter((i) => !newItemIds.has(i.id))
      .filter((item, index) => item.id !== savedYearOrder[index])
      .map((i) => i.id),
  );
  const reorderedCount = reorderedItemIds.size;

  const clearAllErrors = useCallback(() => {
    setInvalidFields(new Set());
    setInvalidEntryFields(new Map());
  }, []);

  // createMutation.onSuccess에서 참조하기 위해 reorderMutation을 먼저 선언한다.
  const reorderMutation = useMutation({
    mutationFn: async (yearIds: number[]) => {
      const response = await fetch("/api/admin/mission-history/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yearIds }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(payload.message ?? "순서 저장에 실패했습니다.");
      }
    },
    onSuccess: (_, yearIds) => {
      setSavedYearOrder(yearIds.map(String));
      if (!suppressReorderToastRef.current) {
        toast.success("순서가 저장되었습니다.");
      }
      suppressReorderToastRef.current = false;
    },
    onError: (error) => {
      suppressReorderToastRef.current = false;
      toast.error(error instanceof Error ? error.message : "순서 저장 중 오류가 발생했습니다.");
    },
  });

  const createMutation = useMutation({
    mutationFn: createMissionYearRequest,
    onSuccess: (savedItem, previousDraft) => {
      setItems((prev) => prev.map((item) => (item.id === previousDraft.id ? savedItem : item)));
      setSelectedId(savedItem.id);
      setDraft(structuredClone(savedItem));
      setNewItemIds((prev) => {
        const next = new Set(prev);
        next.delete(previousDraft.id);
        return next;
      });
      setWorkingCopies((prev) => {
        const next = new Map(prev);
        next.delete(previousDraft.id);
        return next;
      });
      setIsNewYear(false);
      setShowCancelConfirm(false);
      clearAllErrors();
      toast.success("변경사항이 저장되었습니다.");

      // 신규 항목을 끝이 아닌 위치에 배치했거나 기존 순서도 바뀐 경우 → chained reorder로 반영
      const position = pendingNewItemPositionRef.current;
      if (position !== null) {
        pendingNewItemPositionRef.current = null;
        const finalOrder = [...position.before, savedItem.id, ...position.after];
        setSavedYearOrder(finalOrder); // 낙관적 업데이트: reorder 성공 시 동일 값으로 덮어씀
        suppressReorderToastRef.current = true;
        reorderMutation.mutate(finalOrder.map(Number));
      } else {
        setSavedYearOrder((prev) => [...prev, savedItem.id]);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMissionYearRequest,
    onSuccess: (savedItem) => {
      setItems((prev) => prev.map((item) => (item.id === savedItem.id ? savedItem : item)));
      setDraft(structuredClone(savedItem));
      setWorkingCopies((prev) => {
        const next = new Map(prev);
        next.delete(savedItem.id);
        return next;
      });
      setIsNewYear(false);
      setShowCancelConfirm(false);
      clearAllErrors();
      toast.success("변경사항이 저장되었습니다.");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMissionYearRequest,
    onSuccess: (_, deletedId) => {
      setItems((prev) => prev.filter((item) => item.id !== deletedId));
      setSavedYearOrder((prev) => prev.filter((id) => id !== deletedId));
      setSelectedId(null);
      setDraft(null);
      setIsNewYear(false);
      setShowDeleteConfirm(false);
      clearAllErrors();
      toast.success("삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.");
    },
  });

  const selectYear = useCallback((item: MissionYear) => {
    if (selectedId && draft) {
      if (isNewYear) {
        setItems((prev) => prev.map((current) => (current.id === selectedId ? structuredClone(draft) : current)));
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
  }, [clearAllErrors, draft, isDirty, isNewYear, newItemIds, selectedId, workingCopies]);

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

  const handleSave = useCallback(() => {
    const hasContentChange = Boolean(draft && (isDirty || isNewYear));

    // 내용 변경이 있는 경우 검증을 먼저 통과시킨 뒤 모든 저장 실행
    if (hasContentChange) {
      const validation = validateMissionYearDraft(draft!);
      setInvalidFields(validation.invalidFields);
      setInvalidEntryFields(validation.invalidEntryFields);

      if (!validation.valid) {
        toast.error("필수 항목을 모두 입력해주세요.");
        return;
      }
    }

    if (isNewYear && draft) {
      // 신규 항목: create 먼저 실행. 끝이 아닌 위치이거나 기존 순서도 바뀐 경우
      // pendingNewItemPositionRef에 위치 정보를 저장해두고 onSuccess에서 chained reorder를 호출한다.
      const newIdx = items.findIndex((i) => i.id === draft.id);
      const existingBefore = items.slice(0, newIdx).filter((i) => !newItemIds.has(i.id)).map((i) => i.id);
      const existingAfter = items.slice(newIdx + 1).filter((i) => !newItemIds.has(i.id)).map((i) => i.id);
      const needsReorder = existingAfter.length > 0 || reorderedCount > 0;

      pendingNewItemPositionRef.current = needsReorder ? { before: existingBefore, after: existingAfter } : null;
      createMutation.mutate(draft);
      return;
    }

    // 기존 항목: 순서 변경 + 내용 변경 각각 처리.
    // suppressReorderToastRef를 reorderMutation.onSuccess/onError에서만 초기화하므로
    // 내용 저장이 먼저 완료되어도 reorder 토스트가 억제된다.
    suppressReorderToastRef.current = reorderedCount > 0 && hasContentChange;

    if (reorderedCount > 0) {
      const yearIds = items.filter((i) => !newItemIds.has(i.id)).map((i) => Number(i.id));
      reorderMutation.mutate(yearIds);
    }

    if (!hasContentChange) return;
    updateMutation.mutate(draft!);
  }, [createMutation, draft, isDirty, isNewYear, items, newItemIds, reorderedCount, reorderMutation, toast, updateMutation]);

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
    setDraft((prev) => (prev ? { ...prev, [key]: nextValue } : prev));
  }, []);

  const updateEntry = useCallback((entryId: string, field: keyof MissionEntry, value: string | boolean) => {
    const nextValue = field === "place" && typeof value === "string" ? limitText(value, TEXT_MAX_LENGTH) : value;

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
      return { ...prev, entries: prev.entries.map((entry) => (entry.id === entryId ? { ...entry, [field]: nextValue } : entry)) };
    });
  }, []);

  const handleCancelNew = useCallback(() => {
    if (!selectedId) return;
    const savedItem = items.find((item) => item.id === selectedId);
    const hasContent = savedItem && (
      savedItem.year.trim() ||
      savedItem.caption.trim() ||
      savedItem.entries.some((entry) => entry.month || entry.place.trim())
    );
    if (isDirty || hasContent) {
      setShowCancelConfirm(true);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== selectedId));
    setNewItemIds((prev) => {
      const next = new Set(prev);
      next.delete(selectedId);
      return next;
    });
    setSelectedId(null);
    setDraft(null);
    setIsNewYear(false);
    clearAllErrors();
  }, [clearAllErrors, isDirty, items, selectedId]);

  const confirmCancel = useCallback(() => {
    if (!selectedId) return;
    if (isNewYear) {
      setItems((prev) => prev.filter((item) => item.id !== selectedId));
      setNewItemIds((prev) => {
        const next = new Set(prev);
        next.delete(selectedId);
        return next;
      });
      setSelectedId(null);
      setDraft(null);
      setIsNewYear(false);
    } else {
      const original = items.find((item) => item.id === selectedId);
      if (original) setDraft(structuredClone(original));
      setWorkingCopies((prev) => {
        const next = new Map(prev);
        next.delete(selectedId);
        return next;
      });
    }
    setShowCancelConfirm(false);
    clearAllErrors();
  }, [clearAllErrors, isNewYear, items, selectedId]);

  const addEntry = useCallback(() => {
    setDraft((prev) => (prev ? { ...prev, entries: [...prev.entries, makeEntry()] } : prev));
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
    setDraft((prev) => (prev ? { ...prev, entries: prev.entries.filter((entry) => entry.id !== entryId) } : prev));
  }, []);

  const handleEntryDragStart = useCallback((event: DragEvent<HTMLDivElement>, entryId: string) => {
    event.dataTransfer.effectAllowed = "move";
    setDraggingEntryId(entryId);
  }, []);

  const handleEntryDragOver = useCallback((event: DragEvent<HTMLDivElement>, entryIndex: number) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const rect = event.currentTarget.getBoundingClientRect();
    setDropIndicatorIndex(entryIndex + (event.clientY > rect.top + rect.height / 2 ? 1 : 0));
  }, []);

  const handleEntryDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!draggingEntryId || dropIndicatorIndex === null) {
      setDraggingEntryId(null);
      setDropIndicatorIndex(null);
      return;
    }
    setDraft((prev) => {
      if (!prev) return prev;
      const entries = [...prev.entries];
      const fromIndex = entries.findIndex((entry) => entry.id === draggingEntryId);
      if (fromIndex === -1) return prev;
      const insertAt = dropIndicatorIndex > fromIndex ? dropIndicatorIndex - 1 : dropIndicatorIndex;
      const [moved] = entries.splice(fromIndex, 1);
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

  const handleYearDragStart = useCallback((event: DragEvent<HTMLButtonElement>, yearId: string) => {
    event.dataTransfer.effectAllowed = "move";
    setDraggingYearId(yearId);
    setDropYearIndicatorIndex(null);
  }, []);

  const handleYearDragOver = useCallback((event: DragEvent<HTMLButtonElement>, yearIndex: number) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const rect = event.currentTarget.getBoundingClientRect();
    setDropYearIndicatorIndex(yearIndex + (event.clientY > rect.top + rect.height / 2 ? 1 : 0));
  }, []);

  const handleYearDrop = useCallback(
    (event: DragEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (draggingYearId === null || dropYearIndicatorIndex === null) {
        setDraggingYearId(null);
        setDropYearIndicatorIndex(null);
        return;
      }
      setItems((prev) => {
        const fromIndex = prev.findIndex((item) => item.id === draggingYearId);
        if (fromIndex === -1) return prev;
        const insertAt =
          dropYearIndicatorIndex > fromIndex ? dropYearIndicatorIndex - 1 : dropYearIndicatorIndex;
        if (insertAt === fromIndex) return prev;
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(insertAt, 0, moved);
        return next;
      });
      setDraggingYearId(null);
      setDropYearIndicatorIndex(null);
    },
    [draggingYearId, dropYearIndicatorIndex],
  );

  const resetYearDrag = useCallback(() => {
    setDraggingYearId(null);
    setDropYearIndicatorIndex(null);
  }, []);

  const handleMoveYearUp = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === selectedId);
      if (index <= 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, [selectedId]);

  const handleMoveYearDown = useCallback(() => {
    if (!selectedId) return;
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === selectedId);
      if (index === -1 || index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, [selectedId]);

  const handleRollbackOrder = useCallback(() => {
    setItems((prev) => {
      const itemMap = new Map(prev.map((item) => [item.id, item]));
      const restored = savedYearOrder
        .map((id) => itemMap.get(id))
        .filter((item): item is MissionYear => item !== undefined);
      const newOnes = prev.filter((i) => newItemIds.has(i.id));
      return [...restored, ...newOnes];
    });
  }, [newItemIds, savedYearOrder]);

  const isSaving = createMutation.isPending || updateMutation.isPending || reorderMutation.isPending;
  const saveDisabled = (!isDirty && !isNewYear && reorderedCount === 0) || isSaving;

  return {
    items,
    selectedId,
    draft,
    isNewYear,
    newItemIds,
    workingCopies,
    showCancelConfirm,
    showDeleteConfirm,
    isSaving,
    isDeleting: deleteMutation.isPending,
    invalidFields,
    invalidEntryFields,
    draggingEntryId,
    dropIndicatorIndex,
    listRef,
    detailScrollRef,
    isDirty,
    changeCount,
    saveDisabled,
    selectYear,
    handleAddYear,
    handleSave,
    updateDraftField,
    updateEntry,
    handleCancelNew,
    requestCancel: () => setShowCancelConfirm(true),
    dismissCancelConfirm: () => setShowCancelConfirm(false),
    confirmCancel,
    requestDelete: () => setShowDeleteConfirm(true),
    dismissDeleteConfirm: () => setShowDeleteConfirm(false),
    handleDelete: () => selectedId && deleteMutation.mutate(selectedId),
    addEntry,
    removeEntry,
    handleEntryDragStart,
    handleEntryDragOver,
    handleEntryDrop,
    resetEntryDrag,
    draggingYearId,
    dropYearIndicatorIndex,
    reorderedCount,
    reorderedItemIds,
    canMoveYearUp,
    canMoveYearDown,
    handleYearDragStart,
    handleYearDragOver,
    handleYearDrop,
    resetYearDrag,
    handleMoveYearUp,
    handleMoveYearDown,
    handleRollbackOrder,
  };
}
