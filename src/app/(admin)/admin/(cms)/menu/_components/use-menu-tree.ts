"use client";

import { useMutation } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminMenuTreeNode, AdminStaticPage, MenuType } from "@/lib/admin-menu-api";
import { useAdminToast } from "../../components/admin-toast-provider";
import { menuTreePayloadSchema } from "./menu-schema";
import {
  buildNewNode,
  buildNodeChangeSignatures,
  cloneTree,
  collectDescendantIds,
  type EditorNode,
  findManagedSiblingList,
  findNode,
  flattenVisibleTree,
  flattenTree,
  getPublicRouteSummary,
  getSlugPreview,
  hideNodeTree,
  isDetachedPlaylist,
  isManualSlugMode,
  mapTree,
  moveNodeWithinSiblings,
  reparentNode,
  removeNode,
  slugifyToAscii,
  toPayload,
} from "./menu-tree-utils";

export function useMenuTree(initialItems: AdminMenuTreeNode[], staticPages: AdminStaticPage[]) {
  const router = useRouter();
  const toast = useAdminToast();

  const [items, setItems] = useState<EditorNode[]>(() => cloneTree(initialItems));
  const [savedItems, setSavedItems] = useState<EditorNode[]>(() => cloneTree(initialItems));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tempId, setTempId] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualSlugDrafts, setManualSlugDrafts] = useState<Record<number, string>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [expandedRootIds, setExpandedRootIds] = useState<Set<number>>(() => new Set());

  const itemsRef = useRef(items);
  itemsRef.current = items;

  const allFlatItems = useMemo(() => flattenTree(items), [items]);
  const flatItems = useMemo(
    () => flattenVisibleTree(items, expandedRootIds).filter(({ node }) => !isDetachedPlaylist(node)),
    [items, expandedRootIds],
  );
  const selectedNode = selectedId !== null ? findNode(items, selectedId) : null;
  const menuById = useMemo(
    () => new Map(allFlatItems.map(({ node }) => [node.id, node])),
    [allFlatItems],
  );
  const staticPagePathByKey = useMemo(
    () => new Map(staticPages.map((page) => [page.key, page.path])),
    [staticPages],
  );
  const changedMenuIds = useMemo(() => {
    const savedSignatures = buildNodeChangeSignatures(savedItems);
    return new Set(
      Array.from(buildNodeChangeSignatures(items).entries())
        .filter(([id, signature]) => id < 0 || savedSignatures.get(id) !== signature)
        .map(([id]) => id),
    );
  }, [items, savedItems]);
  const changedMenuCount = changedMenuIds.size;
  const descendantIds = useMemo(
    () => (selectedNode ? collectDescendantIds(selectedNode) : new Set<number>()),
    [selectedNode],
  );
  const siblingNodes = useMemo(
    () => (selectedNode ? (findManagedSiblingList(items, selectedNode.id) ?? []) : []),
    [items, selectedNode],
  );
  const selectedSiblingIndex = selectedNode
    ? siblingNodes.findIndex((node) => node.id === selectedNode.id)
    : -1;
  const selectedManualSlugMode = selectedNode ? isManualSlugMode(selectedNode) : false;
  const selectedSlugPreview = selectedNode
    ? getSlugPreview(selectedNode, selectedManualSlugMode)
    : null;
  const hiddenStatusAffectsDescendants =
    Boolean(selectedNode) && selectedNode?.parentId === null && descendantIds.size > 0;
  const confirmingSelectedDelete = selectedNode ? deleteConfirmId === selectedNode.id : false;
  const selectedPublicRoute = selectedNode
    ? getPublicRouteSummary(selectedNode, menuById, staticPagePathByKey)
    : "";
  const selectedPreviewPublicRoute =
    selectedNode && selectedSlugPreview?.value
      ? getPublicRouteSummary(
          { ...selectedNode, slug: selectedSlugPreview.value },
          menuById,
          staticPagePathByKey,
        )
      : selectedPublicRoute;
  const canMoveUp = selectedSiblingIndex > 0;
  const canMoveDown =
    selectedSiblingIndex !== -1 && selectedSiblingIndex < siblingNodes.length - 1;
  const selectedOrderLabel =
    selectedSiblingIndex >= 0
      ? `현재 ${selectedSiblingIndex + 1} / ${siblingNodes.length}번째`
      : "현재 순서를 확인할 수 없습니다.";
  const parentCandidates = allFlatItems.filter(({ node }) => {
    if (!selectedNode) return false;
    if (isDetachedPlaylist(node)) return false;
    if (node.id === selectedNode.id) return false;
    if (descendantIds.has(node.id)) return false;
    if (selectedNode.type === "YOUTUBE_PLAYLIST") {
      return node.type === "YOUTUBE_PLAYLIST_GROUP" && node.parentId === null;
    }
    if (
      selectedNode.type === "STATIC" ||
      selectedNode.type === "BOARD" ||
      selectedNode.type === "EXTERNAL_LINK"
    ) {
      return node.type === "FOLDER" && node.parentId === null;
    }
    return false;
  });

  const markDirty = (nextItems: EditorNode[]) => {
    setItems(nextItems);
    setDeleteConfirmId(null);
  };

  const toggleRootExpanded = (rootId: number) => {
    setExpandedRootIds((prev) => {
      const next = new Set(prev);
      if (next.has(rootId)) {
        next.delete(rootId);
      } else {
        next.add(rootId);
      }
      return next;
    });
  };

  const updateSelectedNode = (updater: (node: EditorNode) => EditorNode) => {
    if (!selectedNode) return;
    markDirty(mapTree(items, selectedNode.id, updater));
  };

  const handleAddRoot = (type: MenuType) => {
    setShowAddModal(false);
    const nextId = tempId;
    setTempId((prev) => prev - 1);
    markDirty([...items, buildNewNode(nextId, type, staticPages)]);
    setSelectedId(nextId);
  };

  const handleAddChild = (type: MenuType) => {
    if (!selectedNode) return;
    const nextId = tempId;
    setTempId((prev) => prev - 1);
    const nextNode = buildNewNode(nextId, type, staticPages);
    markDirty(
      mapTree(items, selectedNode.id, (node) => ({
        ...node,
        children: [...node.children, { ...nextNode, parentId: selectedNode.id }],
      })),
    );
    if (selectedNode.parentId === null) {
      setExpandedRootIds((prev) => new Set(prev).add(selectedNode.id));
    }
    setSelectedId(nextId);
  };

  const switchSelectedSlugMode = (manual: boolean) => {
    if (!selectedNode) return;

    if (!manual) {
      const currentSlug = selectedNode.slug.trim();
      if (currentSlug) {
        setManualSlugDrafts((prev) => ({ ...prev, [selectedNode.id]: selectedNode.slug }));
      }
      updateSelectedNode((node) => ({ ...node, slug: "", slugCustomized: false }));
      return;
    }

    const rememberedSlug =
      manualSlugDrafts[selectedNode.id] ?? slugifyToAscii(selectedNode.label);
    updateSelectedNode((node) => ({
      ...node,
      slug: node.slug.trim() ? node.slug : rememberedSlug,
      slugCustomized: true,
    }));
  };

  const handleRequestDelete = () => {
    if (!selectedNode || selectedNode.isAuto) return;

    if (selectedNode.id < 0) {
      markDirty(removeNode(items, selectedNode.id));
      setSelectedId(null);
      return;
    }

    if (selectedNode.status === "PUBLISHED") {
      toast.error(
        "공개 중인 메뉴는 바로 삭제할 수 없습니다. 먼저 상태를 숨김으로 변경하고 저장한 뒤 삭제해 주세요.",
      );
      setDeleteConfirmId(null);
      return;
    }

    if (changedMenuCount > 0) {
      toast.error(
        "저장하지 않은 변경사항이 있습니다. 즉시 삭제 전에 먼저 저장하거나 변경을 정리해 주세요.",
      );
      setDeleteConfirmId(null);
      return;
    }

    setDeleteConfirmId(selectedNode.id);
  };

  const deleteMutation = useMutation({
    mutationFn: async (menuId: number) => {
      const response = await fetch(`/api/admin/menu/${menuId}`, { method: "DELETE" });
      const payload =
        response.status === 204
          ? null
          : ((await response.json()) as { message?: string });
      if (!response.ok) {
        throw new Error(payload?.message || "메뉴를 삭제하지 못했습니다.");
      }
    },
    onSuccess: (_, menuId) => {
      setItems((prev) => removeNode(prev, menuId));
      setSavedItems((prev) => removeNode(prev, menuId));
      setSelectedId(null);
      setDeleteConfirmId(null);
      toast.success("메뉴를 삭제했습니다.");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "메뉴를 삭제하지 못했습니다.");
      setDeleteConfirmId(null);
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: ReturnType<typeof toPayload>) => {
      const validation = menuTreePayloadSchema.safeParse({ items: payload });
      if (!validation.success) {
        const firstError = validation.error.issues[0];
        throw new Error(firstError?.message ?? "입력값을 확인해 주세요.");
      }

      const response = await fetch("/api/admin/menu/tree", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      const data = (await response.json()) as {
        items?: AdminMenuTreeNode[];
        message?: string;
      };
      if (!response.ok || !data.items) {
        throw new Error(data.message || "메뉴를 저장하지 못했습니다.");
      }
      return data.items;
    },
    onSuccess: (serverItems) => {
      const nextItems = cloneTree(serverItems);
      setItems(nextItems);
      setSavedItems(nextItems);
      setSelectedId(null);
      toast.success("메뉴 구조를 저장했습니다.");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "메뉴를 저장하지 못했습니다.");
    },
  });

  const handleConfirmDelete = () => {
    if (
      !selectedNode ||
      selectedNode.isAuto ||
      selectedNode.id < 0 ||
      deleteConfirmId !== selectedNode.id
    ) {
      return;
    }
    deleteMutation.mutate(selectedNode.id);
  };

  const handleSave = () => {
    saveMutation.mutate(toPayload(items));
  };

  return {
    items,
    itemsRef,
    selectedNode,
    allFlatItems,
    flatItems,
    menuById,
    changedMenuIds,
    changedMenuCount,
    descendantIds,
    siblingNodes,
    selectedSiblingIndex,
    selectedManualSlugMode,
    selectedSlugPreview,
    hiddenStatusAffectsDescendants,
    confirmingSelectedDelete,
    selectedPublicRoute,
    selectedPreviewPublicRoute,
    canMoveUp,
    canMoveDown,
    selectedOrderLabel,
    parentCandidates,
    selectedId,
    setSelectedId,
    expandedRootIds,
    toggleRootExpanded,
    showAddModal,
    setShowAddModal,
    deleteConfirmId,
    setDeleteConfirmId,
    saving: saveMutation.isPending || deleteMutation.isPending,
    markDirty,
    updateSelectedNode,
    handleAddRoot,
    handleAddChild,
    switchSelectedSlugMode,
    handleRequestDelete,
    handleConfirmDelete,
    handleSave,
    hideNodeTree,
    reparentNode,
    moveNodeWithinSiblings,
  };
}
