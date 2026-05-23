"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  type PendingAttachmentItem,
  type ScreenMode,
} from "./board-management-types";
import {
  createDraftFromPost,
  createEmptyDraft,
  getAttachmentAssets,
  getEditorUploadErrorMessage,
  getErrorMessage,
  hasPendingImageUploadNodes,
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
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // screenMode · selectedPostId 는 URL search params 에서 파생
  // → 사이드바에서 /admin/boards 를 클릭하면 ?mode=editor 가 사라져 자동으로 list 로 전환
  const screenMode: ScreenMode = searchParams.get("mode") === "editor" ? "editor" : "list";
  const selectedPostId: string | null = searchParams.get("postId") ?? null;

  const [selectedMenuId, setSelectedMenuId] = useState(() => {
    const urlMenuId = Number(searchParams.get("menuId"));
    return boardMenus.find((m) => m.id === urlMenuId)?.id ?? initialMenuId;
  });

  // 게시글 편집 시 URL에서 읽은 원래 menuId/boardMenu (드롭다운 변경과 무관하게 고정)
  // - detailQuery(조회) 및 deletePost(삭제)는 원래 게시판 컨텍스트를 사용해야 함
  // - savePost(수정)는 목적지(selectedBoard) 컨텍스트를 사용해야 함 → re-fetch GET이 올바른 slug로 동작
  const urlMenuId = Number(searchParams.get("menuId"));
  const urlBoardMenu = (screenMode === "editor" && Boolean(selectedPostId))
    ? (boardMenus.find((m) => m.id === urlMenuId) ?? null)
    : null;

  const [posts, setPosts] = useState<BoardPostListItem[]>(() => {
    const firstMenu = boardMenus[0] ?? null;
    return firstMenu ? initialPosts.map((post) => toBoardPostListItem(post, firstMenu)) : [];
  });
  const [draft, setDraft] = useState<Draft>(initialPost ? createDraftFromPost(initialPost) : createEmptyDraft());
  const [attachmentAssets, setAttachmentAssets] = useState<AttachmentAsset[]>(initialPost ? getAttachmentAssets(initialPost) : []);
  const [editorContentVersion, setEditorContentVersion] = useState(0);
  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachmentItem[]>([]);
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

  // 에디터 문서에 imageUpload 노드가 있으면 업로드 진행 중(또는 위젯 미해제) 상태
  const hasPendingImageUpload = useMemo(
    () => hasPendingImageUploadNodes(draft.contentJson as Record<string, unknown>),
    [draft.contentJson],
  );

  const listQuery = useQuery({
    queryKey: ["admin-board-posts", boardMenusSignature, appliedBoardMenu, appliedTitle, listReloadTick],
    queryFn: () => fetchBoardPostsForMenus({ boardMenus, appliedBoardMenu, appliedTitle }),
    enabled: boardMenus.length > 0,
  });

  const detailQuery = useQuery({
    queryKey: ["admin-board-post", urlBoardMenu?.boardKey, urlMenuId, selectedPostId],
    queryFn: () =>
      fetchBoardPostDetail({
        boardKey: urlBoardMenu?.boardKey ?? "",
        postId: selectedPostId ?? "",
        menuId: urlMenuId,
      }),
    enabled: screenMode === "editor" && Boolean(urlBoardMenu?.boardKey) && Boolean(urlMenuId) && Boolean(selectedPostId),
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
      void queryClient.invalidateQueries({ queryKey: ["admin-board-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-board-post", variables.boardSlug] });
      pendingNoticeRef.current = "게시글을 저장했습니다.";
      router.push("/admin/boards");
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
      void queryClient.invalidateQueries({ queryKey: ["admin-board-posts"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-board-post", variables.boardSlug] });
      pendingNoticeRef.current = "게시글을 삭제했습니다.";
      router.push("/admin/boards");
    },
    onError: (deleteError) => {
      const message = getErrorMessage(deleteError, "게시글을 삭제하지 못했습니다.");
      setError(message);
      toast.error(message);
    },
  });

  const uploadAttachmentMutation = useMutation({
    mutationFn: async (items: { file: File; tempId: string }[]) => {
      if (!selectedBoard) {
        throw new Error("첨부 파일을 업로드할 게시판 메뉴를 먼저 선택해 주세요.");
      }

      for (const { file, tempId } of items) {
        const rawToken = await requestUploadToken(selectedBoard.id, "FILE_ATTACHMENT");

        const updateProgress = (pct: number) => {
          setPendingAttachments((current) =>
            current.map((p) => (p.tempId === tempId ? { ...p, progress: pct } : p)),
          );
        };

        let asset;
        if (process.env.NODE_ENV === "development") {
          // 로컬에서는 네트워크가 너무 빨라 XHR progress 이벤트가 눈에 안 보임.
          // fake progress 애니메이션을 실제 업로드와 병렬로 실행해 UI를 확인할 수 있게 함.
          const DEV_ANIM_MS = 1200;
          const STEPS = 12;
          let step = 0;
          const fakeTimer = setInterval(() => {
            step += 1;
            updateProgress(Math.round((step / STEPS) * 90));
            if (step >= STEPS) clearInterval(fakeTimer);
          }, DEV_ANIM_MS / STEPS);

          asset = await uploadAdminAssetDirect({ file, kind: "FILE_ATTACHMENT", rawToken });
          clearInterval(fakeTimer);
          updateProgress(100);
          await new Promise<void>((r) => setTimeout(r, 250));
        } else {
          asset = await uploadAdminAssetDirect(
            { file, kind: "FILE_ATTACHMENT", rawToken },
            (loaded, total) => updateProgress(Math.round((loaded / total) * 100)),
          );
        }

        setPendingAttachments((current) => current.filter((p) => p.tempId !== tempId));
        setAttachmentAssets((current) => {
          if (current.some((a) => a.id === asset.assetId)) return current;
          return [...current, { id: asset.assetId, originalFilename: asset.originalFilename, byteSize: asset.byteSize }];
        });
      }
    },
    onSuccess: () => {
      toast.success("첨부 파일을 저장용 자산으로 업로드했습니다.");
    },
    onError: (uploadError) => {
      setPendingAttachments([]);
      const raw = getErrorMessage(uploadError, "첨부 파일 업로드에 실패했습니다.");
      // 백엔드의 토큰 검증 오류는 보안상 의도적으로 뭉뚱그린 메시지라 그대로 노출하지 않는다.
      const message =
        raw === "유효하지 않은 업로드 토큰입니다."
          ? "지원하지 않는 파일 형식이거나 파일 크기가 제한을 초과했습니다."
          : raw;
      setError(message);
      toast.error(message);
    },
  });

  // editor → list 전환 시(뒤로 가기, 사이드바 클릭, 저장/삭제 후 이동 모두 포함)
  // draft 초기화 및 pending 알림 표시
  const prevScreenModeRef = useRef<ScreenMode>(screenMode);
  useEffect(() => {
    const prev = prevScreenModeRef.current;
    prevScreenModeRef.current = screenMode;
    if (prev === "editor" && screenMode === "list") {
      setDraft(createEmptyDraft());
      setAttachmentAssets([]);
      setPendingAttachments([]);
      setEditorContentVersion((current) => current + 1);
      setError(null);
      const msg = pendingNoticeRef.current;
      pendingNoticeRef.current = null;
      if (msg) toast.success(msg);
    }
  }, [screenMode, toast]);

  // editor 진입 시 URL 의 menuId 를 selectedMenuId 에 동기화
  const boardMenusRef = useRef(boardMenus);
  boardMenusRef.current = boardMenus;
  useEffect(() => {
    if (screenMode !== "editor") return;
    const urlMenuId = Number(searchParams.get("menuId"));
    if (!urlMenuId) return;
    const found = boardMenusRef.current.find((m) => m.id === urlMenuId);
    if (found) setSelectedMenuId(found.id);
  }, [screenMode, searchParams]);

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
    setEditorContentVersion((current) => current + 1);
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

    const fileArray = Array.from(files);
    const items = fileArray.map((file) => ({
      tempId: `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
    }));

    setPendingAttachments((current) => [
      ...current,
      ...items.map(({ tempId, file: f }) => ({
        tempId,
        filename: f.name,
        byteSize: f.size,
        progress: 0,
      })),
    ]);
    setError(null);
    await uploadAttachmentMutation.mutateAsync(items);
  }, [uploadAttachmentMutation]);

  const simulateAttachmentUpload = useCallback((fileCount: number, durationMs: number) => {
    if (process.env.NODE_ENV !== "development") return;

    const items: PendingAttachmentItem[] = Array.from({ length: fileCount }, (_, i) => ({
      tempId: `sim-${Date.now()}-${i}`,
      filename: `테스트파일_${i + 1}.pdf`,
      byteSize: (i + 1) * 512 * 1024,
      progress: 0,
    }));

    setPendingAttachments((current) => [...current, ...items]);

    const ticks = 20;
    const tickMs = durationMs / fileCount / ticks;
    let fileIdx = 0;
    let tick = 0;

    const timer = setInterval(() => {
      tick += 1;
      const progress = Math.min(100, Math.round((tick / ticks) * 100));
      const { tempId, filename, byteSize } = items[fileIdx];

      setPendingAttachments((current) =>
        current.map((p) => (p.tempId === tempId ? { ...p, progress } : p)),
      );

      if (tick >= ticks) {
        setPendingAttachments((current) => current.filter((p) => p.tempId !== tempId));
        setAttachmentAssets((current) => [
          ...current,
          { id: tempId, originalFilename: filename, byteSize },
        ]);
        fileIdx += 1;
        tick = 0;
        if (fileIdx >= fileCount) clearInterval(timer);
      }
    }, tickMs);
  }, []);

  const openNewPost = useCallback(() => {
    const preferredMenu = boardMenuFilter === "ALL"
      ? boardMenus[0]
      : boardMenus.find((boardMenu) => String(boardMenu.id) === boardMenuFilter) ?? boardMenus[0];

    const menuId = preferredMenu?.id ?? 0;
    setSelectedMenuId(menuId);
    setDraft(createEmptyDraft());
    setAttachmentAssets([]);
    setPendingAttachments([]);
    setEditorContentVersion((current) => current + 1);
    setError(null);
    toast.info("새 게시글 작성 모드입니다.");
    router.push(`/admin/boards?mode=editor${menuId ? `&menuId=${menuId}` : ""}`);
  }, [boardMenuFilter, boardMenus, router, toast]);

  const openPost = useCallback((post: BoardPostListItem) => {
    setSelectedMenuId(post.boardMenuId);
    setError(null);
    router.push(`/admin/boards?mode=editor&postId=${post.id}&menuId=${post.boardMenuId}`);
  }, [router]);

  const handleSave = useCallback(() => {
    setError(null);

    try {
      if (!selectedBoard || !selectedBoardMenu) {
        throw new Error("게시판 메뉴를 선택해 주세요.");
      }

      if (hasPendingImageUpload) {
        throw new Error("이미지 업로드가 완료되지 않았습니다. 업로드 완료 후 저장해 주세요.");
      }

      const validationMessage = validateBoardPostSavePayload(savePayload);
      if (validationMessage) {
        throw new Error(validationMessage);
      }

      // 백엔드가 postId로 게시글을 조회하므로 boardSlug는 라우팅 힌트에 불과
      // PUT을 목적지(selectedBoard) slug로 보내야 저장 후 re-fetch(GET)가 올바른 slug로 동작
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
  }, [hasPendingImageUpload, saveMutation, savePayload, selectedBoard, selectedBoardMenu, selectedPostId, toast]);

  const handleDelete = useCallback(async () => {
    if (!selectedPostId) {
      return;
    }

    // 삭제는 현재 게시글이 속한 원래 게시판 기준으로 수행 (드롭다운 변경과 무관)
    const deleteBoardSlug = urlBoardMenu?.boardKey ?? selectedBoard?.slug ?? "";
    const deleteMenuId = urlMenuId || selectedMenuId;

    if (!deleteBoardSlug) {
      return;
    }

    const confirmed = window.confirm("이 게시글을 삭제하시겠습니까?");
    if (!confirmed) {
      return;
    }

    setError(null);
    await deleteMutation.mutateAsync({
      boardSlug: deleteBoardSlug,
      postId: selectedPostId,
      menuId: deleteMenuId,
    }).catch(() => undefined);
  }, [deleteMutation, selectedBoard, selectedMenuId, selectedPostId, urlBoardMenu, urlMenuId]);

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
    // 저장 대상 게시판을 변경; 이미 입력한 내용은 유지한다
    setSelectedMenuId(menuId);
    setError(null);
  }, []);

  const handleBackToList = useCallback(() => {
    router.push("/admin/boards");
  }, [router]);

  const saving = saveMutation.isPending || deleteMutation.isPending;
  const loading = listQuery.isFetching || detailQuery.isFetching;

  return {
    error,
    hasPendingImageUpload,
    boardMenus,
    disconnectedBoardMenus,
    screenMode,
    selectedMenuId,
    selectedPostId,
    posts,
    filteredPosts,
    draft,
    editorContentVersion,
    attachmentAssets,
    totalPages,
    safeDisplayPage,
    pageStartIndex,
    pageEndIndex,
    loading,
    saving,
    uploadingAttachment: uploadAttachmentMutation.isPending,
    pendingAttachments,
    simulateAttachmentUpload,
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
