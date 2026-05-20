"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  collectAssetIdsFromTiptapDocument,
  normalizeTiptapDocumentImageMetadata,
} from "@/lib/admin-board-editor-content";
import type { BoardPostSavePayload } from "@/lib/admin-board-api";
import {
  uploadAdminAssetDirect,
  type AdminUploadAssetMetadata,
} from "@/lib/admin-upload-client";
import { useAdminToast } from "../../components/admin-toast-provider";
import {
  deleteBoardPostRequest,
  fetchBoardPostDetail,
  fetchBoardPostsForMenus,
  requestUploadToken,
  saveBoardPostRequest,
} from "./board-management-api";
import { validateBoardPostSavePayload } from "./board-management-schema";
import {
  type AttachmentAsset,
  type BoardManagementClientProps,
  type BoardPostListItem,
  type Draft,
  type ScreenMode,
} from "./board-management-types";
import {
  createAttachmentAssetsFromIds,
  createDraftFromPost,
  createEmptyDraft,
  getAttachmentAssets,
  getEditorUploadErrorMessage,
  getErrorMessage,
  sortPostsByUpdatedAt,
  toBoardPostListItem,
} from "./board-management-utils";

export function useBoardManagementController({
  initialBoards,
  initialBoardMenus,
  initialPosts = [],
  initialPost = null,
  currentUserId,
  currentUserRole,
}: BoardManagementClientProps) {
  const toast = useAdminToast();
  const queryClient = useQueryClient();
  const editorPushedRef = useRef(false);
  const pendingNoticeRef = useRef<string | null>(null);
  const boardsBySlug = useMemo(
    () => new Map(initialBoards.map((board) => [board.slug, board])),
    [initialBoards],
  );
  const disconnectedBoardMenus = useMemo(
    () =>
      initialBoardMenus.filter(
        (boardMenu) =>
          boardMenu.type === "BOARD" &&
          Boolean(boardMenu.boardKey) &&
          !boardMenu.isAuto &&
          !boardsBySlug.has(boardMenu.boardKey ?? ""),
      ),
    [boardsBySlug, initialBoardMenus],
  );
  const boardMenus = useMemo(
    () =>
      initialBoardMenus.filter(
        (boardMenu) =>
          boardMenu.type === "BOARD" &&
          Boolean(boardMenu.boardKey) &&
          !boardMenu.isAuto &&
          boardsBySlug.has(boardMenu.boardKey ?? ""),
      ),
    [boardsBySlug, initialBoardMenus],
  );
  const initialMenuId = boardMenus[0]?.id ?? 0;
  const [screenMode, setScreenMode] = useState<ScreenMode>("list");
  const [selectedMenuId, setSelectedMenuId] = useState(initialMenuId);
  const [posts, setPosts] = useState<BoardPostListItem[]>(() => {
    const firstMenu = boardMenus[0] ?? null;
    return firstMenu ? initialPosts.map((post) => toBoardPostListItem(post, firstMenu)) : [];
  });
  const [selectedPostId, setSelectedPostId] = useState<string | null>(initialPost?.id ?? null);
  const [draft, setDraft] = useState<Draft>(initialPost ? createDraftFromPost(initialPost) : createEmptyDraft());
  const [attachmentAssets, setAttachmentAssets] = useState<AttachmentAsset[]>(initialPost ? getAttachmentAssets(initialPost) : []);
  const [error, setError] = useState<string | null>(null);
  const [boardMenuFilter, setBoardMenuFilter] = useState("ALL");
  const [titleQuery, setTitleQuery] = useState("");
  const [appliedBoardMenu, setAppliedBoardMenu] = useState("ALL");
  const [appliedTitle, setAppliedTitle] = useState("");
  const [listReloadTick, setListReloadTick] = useState(0);
  const [displayPage, setDisplayPage] = useState(0);
  const [displayPageSize, setDisplayPageSize] = useState(20);

  const canEditPost = useCallback(
    (post: { authorId: string }) => currentUserRole === "SUPER_ADMIN" || post.authorId === currentUserId,
    [currentUserId, currentUserRole],
  );
  const selectedBoardMenu = useMemo(
    () => boardMenus.find((boardMenu) => boardMenu.id === selectedMenuId) ?? boardMenus[0] ?? null,
    [boardMenus, selectedMenuId],
  );
  const selectedBoard = useMemo(
    () => initialBoards.find((board) => board.slug === selectedBoardMenu?.boardKey) ?? null,
    [initialBoards, selectedBoardMenu],
  );
  const filteredPosts = posts;
  const attachmentAssetIds = attachmentAssets.map((asset) => asset.id);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / displayPageSize));
  const safeDisplayPage = Math.min(displayPage, totalPages - 1);
  const pageStartIndex = safeDisplayPage * displayPageSize;
  const pageEndIndex = pageStartIndex + displayPageSize;
  const boardMenusSignature = boardMenus.map((boardMenu) => `${boardMenu.id}:${boardMenu.boardKey ?? ""}`).join("|");

  const savePayload = useMemo<BoardPostSavePayload>(() => {
    const contentJson = normalizeTiptapDocumentImageMetadata(draft.contentJson);

    return {
      menuId: selectedMenuId,
      title: (draft.title ?? "").trim(),
      contentJson,
      contentHtml: draft.contentHtml,
      isPublic: draft.isPublic,
      isPinned: draft.isPinned,
      assetIds: [...new Set([
        ...collectAssetIdsFromTiptapDocument(contentJson),
        ...attachmentAssetIds,
      ])],
    };
  }, [attachmentAssetIds, draft, selectedMenuId]);

  const setAttachmentAssetIds = useCallback((ids: string[]) => {
    setAttachmentAssets((current) => {
      if (ids.length === 0) {
        return [];
      }

      const currentById = new Map(current.map((asset) => [asset.id, asset]));
      return ids.map((id) => currentById.get(id) ?? createAttachmentAssetsFromIds([id])[0]);
    });
  }, []);

  const listQuery = useQuery({
    queryKey: ["admin-board-posts", boardMenusSignature, appliedBoardMenu, appliedTitle, listReloadTick],
    queryFn: () => fetchBoardPostsForMenus({ boardMenus, appliedBoardMenu, appliedTitle }),
    enabled: boardMenus.length > 0,
  });

  const detailQuery = useQuery({
    queryKey: ["admin-board-post", selectedBoardMenu?.boardKey, selectedMenuId, selectedPostId],
    queryFn: () =>
      fetchBoardPostDetail({
        boardKey: selectedBoardMenu?.boardKey ?? "",
        postId: selectedPostId ?? "",
        menuId: selectedMenuId,
      }),
    enabled: screenMode === "editor" && Boolean(selectedBoardMenu?.boardKey) && Boolean(selectedMenuId) && Boolean(selectedPostId),
  });

  const saveMutation = useMutation({
    mutationFn: saveBoardPostRequest,
    onSuccess: (savedPost, variables) => {
      const savedBoardMenu = boardMenus.find((boardMenu) => boardMenu.id === Number(variables.payload.menuId)) ?? selectedBoardMenu!;
      const nextPost = toBoardPostListItem(savedPost, savedBoardMenu);
      setPosts((current) => {
        const exists = current.some((post) => post.id === savedPost.id);
        return sortPostsByUpdatedAt(
          exists
            ? current.map((post) => (post.id === savedPost.id ? nextPost : post))
            : [nextPost, ...current],
        );
      });
      setListReloadTick((current) => current + 1);
      setSelectedPostId(null);
      setDraft(createEmptyDraft());
      setAttachmentAssetIds([]);
      setScreenMode("list");
      void queryClient.invalidateQueries({ queryKey: ["admin-board-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-board-post", variables.boardSlug] });
      if (editorPushedRef.current) {
        pendingNoticeRef.current = "게시글을 저장했습니다.";
        window.history.back();
      } else {
        toast.success("게시글을 저장했습니다.");
      }
    },
    onError: (saveError) => {
      const message = getErrorMessage(saveError, "게시글을 저장하지 못했습니다.");
      setError(message);
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBoardPostRequest,
    onSuccess: (_, variables) => {
      setPosts((current) => current.filter((post) => post.id !== variables.postId));
      setListReloadTick((current) => current + 1);
      setSelectedPostId(null);
      setDraft(createEmptyDraft());
      setAttachmentAssetIds([]);
      void queryClient.invalidateQueries({ queryKey: ["admin-board-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-board-post", variables.boardSlug] });
      if (editorPushedRef.current) {
        pendingNoticeRef.current = "게시글을 삭제했습니다.";
        window.history.back();
      } else {
        setScreenMode("list");
        toast.success("게시글을 삭제했습니다.");
      }
    },
    onError: (deleteError) => {
      const message = getErrorMessage(deleteError, "게시글을 삭제하지 못했습니다.");
      setError(message);
      toast.error(message);
    },
  });

  const uploadAttachmentMutation = useMutation({
    mutationFn: async (files: File[]) => {
      if (!selectedBoard) {
        throw new Error("첨부 파일을 업로드할 게시판 메뉴를 먼저 선택해 주세요.");
      }

      const uploaded: AttachmentAsset[] = [];
      for (const file of files) {
        const rawToken = await requestUploadToken(selectedBoard.id, "FILE_ATTACHMENT");
        const asset = await uploadAdminAssetDirect({
          file,
          kind: "FILE_ATTACHMENT",
          rawToken,
        });
        uploaded.push({ id: asset.assetId, originalFilename: asset.originalFilename, byteSize: asset.byteSize });
      }

      return uploaded;
    },
    onSuccess: (uploaded) => {
      setAttachmentAssets((current) => {
        const existingIds = new Set(current.map((asset) => asset.id));
        return [...current, ...uploaded.filter((asset) => !existingIds.has(asset.id))];
      });
      toast.success("첨부 파일을 저장용 자산으로 업로드했습니다.");
    },
    onError: (uploadError) => {
      const message = getErrorMessage(uploadError, "첨부 파일 업로드에 실패했습니다.");
      setError(message);
      toast.error(message);
    },
  });

  useEffect(() => {
    const handlePopState = () => {
      if (!editorPushedRef.current) return;
      editorPushedRef.current = false;
      const msg = pendingNoticeRef.current;
      pendingNoticeRef.current = null;
      setScreenMode("list");
      setSelectedPostId(null);
      setDraft(createEmptyDraft());
      setAttachmentAssets([]);
      setError(null);
      if (msg) {
        toast.success(msg);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [toast]);

  useEffect(() => {
    if (boardMenus.length === 0) {
      setPosts([]);
      return;
    }

    if (listQuery.data) {
      setPosts(listQuery.data);
      setDisplayPage(0);
    }
  }, [boardMenus.length, listQuery.data]);

  useEffect(() => {
    if (listQuery.error) {
      const message = getErrorMessage(listQuery.error, "게시글 목록을 불러오지 못했습니다.");
      setError(message);
      toast.error(message);
    }
  }, [listQuery.error, toast]);

  useEffect(() => {
    if (screenMode !== "editor" || !selectedPostId || !detailQuery.data) {
      return;
    }

    setDraft(createDraftFromPost(detailQuery.data));
    setAttachmentAssets(getAttachmentAssets(detailQuery.data));
  }, [detailQuery.data, screenMode, selectedPostId]);

  useEffect(() => {
    if (detailQuery.error) {
      const message = getErrorMessage(detailQuery.error, "게시글 상세를 불러오지 못했습니다.");
      setError(message);
      toast.error(message);
    }
  }, [detailQuery.error, toast]);

  const handleBoardSearch = useCallback(() => {
    setAppliedBoardMenu(boardMenuFilter);
    setAppliedTitle(titleQuery);
    setDisplayPage(0);
  }, [boardMenuFilter, titleQuery]);

  const handleUpload = useCallback(async (file: File): Promise<AdminUploadAssetMetadata> => {
    if (!selectedBoard) {
      throw new Error("이미지를 업로드할 게시판 메뉴를 먼저 선택해 주세요.");
    }

    const rawToken = await requestUploadToken(selectedBoard.id, "INLINE_IMAGE");
    return uploadAdminAssetDirect({
      file,
      kind: "INLINE_IMAGE",
      rawToken,
    });
  }, [selectedBoard]);

  const handleAttachmentUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const MAX_SIZE = 20 * 1024 * 1024;
    const ALLOWED_EXTENSIONS = new Set([
      "jpg", "jpeg", "png", "gif", "webp",
      "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "hwp",
      "zip", "rar", "7z",
    ]);

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        setError(`허용되지 않는 파일 형식입니다: ${file.name}`);
        return;
      }
      if (file.size > MAX_SIZE) {
        setError(`파일 크기는 20MB를 초과할 수 없습니다: ${file.name}`);
        return;
      }
    }

    setError(null);
    await uploadAttachmentMutation.mutateAsync(Array.from(files));
  }, [uploadAttachmentMutation]);

  const openNewPost = useCallback(() => {
    const preferredMenu = boardMenuFilter === "ALL"
      ? boardMenus[0]
      : boardMenus.find((boardMenu) => String(boardMenu.id) === boardMenuFilter) ?? boardMenus[0];

    setSelectedMenuId(preferredMenu?.id ?? 0);
    setSelectedPostId(null);
    setDraft(createEmptyDraft());
    setAttachmentAssetIds([]);
    setScreenMode("editor");
    setError(null);
    toast.info("새 게시글 작성 모드입니다.");
    window.history.pushState({ boardEditor: true }, "");
    editorPushedRef.current = true;
  }, [boardMenuFilter, boardMenus, setAttachmentAssetIds, toast]);

  const openPost = useCallback((post: BoardPostListItem) => {
    setSelectedMenuId(post.boardMenuId);
    setSelectedPostId(post.id);
    setScreenMode("editor");
    setError(null);
    window.history.pushState({ boardEditor: true }, "");
    editorPushedRef.current = true;
  }, []);

  const handleSave = useCallback(() => {
    setError(null);

    try {
      if (!selectedBoard || !selectedBoardMenu) {
        throw new Error("게시판 메뉴를 선택해 주세요.");
      }

      const validationMessage = validateBoardPostSavePayload(savePayload);
      if (validationMessage) {
        throw new Error(validationMessage);
      }

      saveMutation.mutate({
        boardSlug: selectedBoard.slug,
        postId: selectedPostId,
        payload: savePayload,
      });
    } catch (saveError) {
      const message = getErrorMessage(saveError, "게시글을 저장하지 못했습니다.");
      setError(message);
      toast.error(message);
    }
  }, [saveMutation, savePayload, selectedBoard, selectedBoardMenu, selectedPostId, toast]);

  const handleDelete = useCallback(async () => {
    if (!selectedBoard || !selectedPostId) {
      return;
    }

    const confirmed = window.confirm("이 게시글을 삭제하시겠습니까?");
    if (!confirmed) {
      return;
    }

    setError(null);
    await deleteMutation.mutateAsync({
      boardSlug: selectedBoard.slug,
      postId: selectedPostId,
      menuId: selectedMenuId,
    }).catch(() => undefined);
  }, [deleteMutation, selectedBoard, selectedMenuId, selectedPostId]);

  const handleEditorUploadError = useCallback((uploadError: Error) => {
    const message = getEditorUploadErrorMessage(uploadError);
    setError(message);
    toast.error(message);
  }, [toast]);

  const handleContentChange = useCallback((contentJson: Draft["contentJson"], contentHtml: string) => {
    setDraft((prev) => ({
      ...prev,
      contentJson,
      contentHtml,
    }));
  }, []);

  const handleSelectedMenuChange = useCallback((menuId: number) => {
    setSelectedMenuId(menuId);
    setSelectedPostId(null);
    setDraft(createEmptyDraft());
    setAttachmentAssets([]);
    setError(null);
  }, []);

  const handleBackToList = useCallback(() => {
    if (editorPushedRef.current) {
      window.history.back();
      return;
    }

    setScreenMode("list");
    setSelectedPostId(null);
    setDraft(createEmptyDraft());
    setAttachmentAssets([]);
  }, []);

  const saving = saveMutation.isPending || deleteMutation.isPending;
  const loading = listQuery.isFetching || detailQuery.isFetching;

  return {
    error,
    boardMenus,
    disconnectedBoardMenus,
    screenMode,
    selectedMenuId,
    selectedPostId,
    posts,
    filteredPosts,
    draft,
    attachmentAssets,
    totalPages,
    safeDisplayPage,
    pageStartIndex,
    pageEndIndex,
    loading,
    saving,
    uploadingAttachment: uploadAttachmentMutation.isPending,
    boardMenuFilter,
    titleQuery,
    canEditPost,
    setBoardMenuFilter,
    setTitleQuery,
    setDisplayPage,
    displayPageSize,
    setDisplayPageSize: (size: number) => { setDisplayPageSize(size); setDisplayPage(0); },
    setDraft,
    setAttachmentAssets,
    handleBoardSearch,
    handleUpload,
    handleAttachmentUpload,
    openNewPost,
    openPost,
    handleSave,
    handleDelete,
    handleEditorUploadError,
    handleContentChange,
    handleSelectedMenuChange,
    handleBackToList,
  };
}

export type BoardManagementController = ReturnType<typeof useBoardManagementController>;
