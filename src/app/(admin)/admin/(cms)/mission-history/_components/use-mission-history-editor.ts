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

  const selected = items.find((item) => item.id === selectedId) ?? null;
  const isDirty = Boolean(draft && selected && JSON.stringify(draft) !== JSON.stringify(selected));
  const changeCount = countYearChanges(draft, selected);

  const clearAllErrors = useCallback(() => {
    setInvalidFields(new Set());
    setInvalidEntryFields(new Map());
  }, []);

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
    if (!draft) return;

    const validation = validateMissionYearDraft(draft);
    setInvalidFields(validation.invalidFields);
    setInvalidEntryFields(validation.invalidEntryFields);

    if (!validation.valid) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (isNewYear) {
      createMutation.mutate(draft);
    } else {
      updateMutation.mutate(draft);
    }
  }, [createMutation, draft, isNewYear, toast, updateMutation]);

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

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const saveDisabled = (!isDirty && !isNewYear) || isSaving;

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
  };
}
