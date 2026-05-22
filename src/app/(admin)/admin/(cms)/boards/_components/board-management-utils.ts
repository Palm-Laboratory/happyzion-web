import { createEmptyTiptapDocument } from "@/lib/admin-board-editor-content";
import type {
  AdminBoardPostDetail,
  AdminBoardPostSummary,
} from "@/lib/admin-board-api";
import type { AdminMenuTreeNode } from "@/lib/admin-menu-api";
import type { AttachmentAsset, BoardPostListItem, Draft } from "./board-management-types";

/**
 * Tiptap 문서 JSON을 재귀 탐색해 imageUpload 노드가 존재하는지 확인한다.
 * imageUpload 노드는 업로드 위젯이 열려 있는 동안(업로드 진행 중 포함) 문서에 남으며,
 * 업로드가 완료·교체될 때 image 노드로 대체된다.
 */
export function hasPendingImageUploadNodes(
  node: Record<string, unknown> | null | undefined,
): boolean {
  if (!node || typeof node !== "object") return false;
  if (node.type === "imageUpload") return true;
  const content = node.content;
  if (Array.isArray(content)) {
    return (content as Record<string, unknown>[]).some(hasPendingImageUploadNodes);
  }
  return false;
}

export function createEmptyDraft(): Draft {
  const contentJson = createEmptyTiptapDocument();
  return {
    title: "",
    isPublic: true,
    isPinned: false,
    contentJson,
    contentHtml: "",
  };
}

export function createDraftFromPost(post: AdminBoardPostDetail): Draft {
  return {
    title: post.title ?? "",
    isPublic: post.isPublic ?? false,
    isPinned: post.isPinned ?? false,
    contentJson: post.contentJson ?? createEmptyTiptapDocument(),
    contentHtml: post.contentHtml ?? "",
  };
}

export function getAttachmentAssets(post: AdminBoardPostDetail): AttachmentAsset[] {
  return (post.assets ?? [])
    .filter((asset) => asset.kind === "FILE_ATTACHMENT")
    .map((asset) => ({ id: asset.id, originalFilename: asset.originalFilename, byteSize: asset.byteSize }));
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function getEditorUploadErrorMessage(error: Error) {
  if (error.message.startsWith("File size exceeds maximum allowed")) {
    return "이미지 파일은 10MB 이하만 업로드할 수 있습니다.";
  }

  if (error.message.startsWith("Maximum ")) {
    return "한 번에 업로드할 수 있는 이미지 개수를 초과했습니다.";
  }

  return error.message || "이미지 업로드에 실패했습니다.";
}

export function formatBoardMenuOptionLabel(boardMenu: AdminMenuTreeNode) {
  return boardMenu.label;
}

export function createAttachmentAssetsFromIds(ids: string[]): AttachmentAsset[] {
  return ids.map((id) => ({
    id,
    originalFilename: "",
  }));
}

export function toBoardPostListItem(
  post: AdminBoardPostSummary,
  boardMenu: AdminMenuTreeNode,
): BoardPostListItem {
  return {
    ...post,
    boardSlug: boardMenu.boardKey ?? "",
    boardMenuId: boardMenu.id,
    boardMenuLabel: boardMenu.label,
  };
}

export function sortPostsByUpdatedAt(posts: BoardPostListItem[]) {
  return [...posts].sort((left, right) => {
    if (left.isPinned !== right.isPinned) {
      return left.isPinned ? -1 : 1;
    }

    const leftTime = new Date(left.updatedAt).getTime();
    const rightTime = new Date(right.updatedAt).getTime();
    return (Number.isNaN(rightTime) ? 0 : rightTime) - (Number.isNaN(leftTime) ? 0 : leftTime);
  });
}

export function buildBoardPostsListUrl(
  boardSlug: string,
  options: {
    menuId?: number;
    page?: number;
    size?: number;
    title?: string;
  },
) {
  const params = new URLSearchParams();
  if (options.menuId != null) {
    params.set("menuId", String(options.menuId));
  }
  if (options.page != null) {
    params.set("page", String(options.page));
  }
  if (options.size != null) {
    params.set("size", String(options.size));
  }
  if (options.title && options.title.trim().length > 0) {
    params.set("title", options.title.trim());
  }
  const query = params.size > 0 ? `?${params.toString()}` : "";
  return `/api/admin/boards/${boardSlug}/posts${query}`;
}
