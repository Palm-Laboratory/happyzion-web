import type {
  AdminBoardPostDetail,
  AdminBoardPostsPage,
  BoardPostSavePayload,
} from "@/lib/admin-board-api";
import type { AdminMenuTreeNode } from "@/lib/admin-menu-api";
import type { AdminUploadAssetKind } from "@/lib/admin-upload-client";
import {
  BOARD_POSTS_PAGE_SIZE,
  type BoardPostListItem,
} from "./board-management-types";
import {
  buildBoardPostsListUrl,
  toBoardPostListItem,
  sortPostsByUpdatedAt,
} from "./board-management-utils";

export async function requestUploadToken(boardId: string, kind: AdminUploadAssetKind) {
  const response = await fetch("/api/admin/uploads/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kind,
      boardId,
    }),
  });
  const payload = (await response.json()) as { rawToken?: string; message?: string };

  if (!response.ok || !payload.rawToken) {
    throw new Error(payload.message || "업로드 토큰을 발급하지 못했습니다.");
  }

  return payload.rawToken;
}

export async function fetchBoardPostsForMenus({
  boardMenus,
  appliedBoardMenu,
  appliedTitle,
}: {
  boardMenus: AdminMenuTreeNode[];
  appliedBoardMenu: string;
  appliedTitle: string;
}) {
  const targetMenus = appliedBoardMenu === "ALL"
    ? boardMenus
    : boardMenus.filter((boardMenu) => String(boardMenu.id) === appliedBoardMenu);
  const groupedPosts = await Promise.all(
    targetMenus.map(async (boardMenu) => {
      if (!boardMenu.boardKey) {
        return [];
      }

      const loadedPosts: BoardPostListItem[] = [];
      let page = 0;

      while (true) {
        const response = await fetch(
          buildBoardPostsListUrl(boardMenu.boardKey, {
            menuId: boardMenu.id,
            page,
            size: BOARD_POSTS_PAGE_SIZE,
            title: appliedTitle,
          }),
        );
        const payload = (await response.json()) as AdminBoardPostsPage & { message?: string };

        if (!response.ok) {
          throw new Error(payload.message || "게시글 목록을 불러오지 못했습니다.");
        }

        loadedPosts.push(...(payload.posts ?? []).map((post) => toBoardPostListItem(post, boardMenu)));

        if (!payload.hasNext) {
          break;
        }

        page += 1;
      }

      return loadedPosts;
    }),
  );

  return sortPostsByUpdatedAt(groupedPosts.flat());
}

export async function fetchBoardPostDetail({
  boardKey,
  postId,
  menuId,
}: {
  boardKey: string;
  postId: string;
  menuId: number;
}) {
  const response = await fetch(`/api/admin/boards/${boardKey}/posts/${postId}?menuId=${menuId}`);
  const payload = (await response.json()) as AdminBoardPostDetail & { message?: string };

  if (!response.ok) {
    throw new Error(payload.message || "게시글 상세를 불러오지 못했습니다.");
  }

  return payload;
}

export async function saveBoardPostRequest({
  boardSlug,
  postId,
  payload,
}: {
  boardSlug: string;
  postId: string | null;
  payload: BoardPostSavePayload;
}) {
  const response = postId
    ? await fetch(`/api/admin/boards/${boardSlug}/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    : await fetch(`/api/admin/boards/${boardSlug}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  const saved = (await response.json()) as AdminBoardPostDetail & { message?: string };

  if (!response.ok) {
    throw new Error(saved.message || "게시글을 저장하지 못했습니다.");
  }

  return saved;
}

export async function deleteBoardPostRequest({
  boardSlug,
  postId,
  menuId,
}: {
  boardSlug: string;
  postId: string;
  menuId: number;
}) {
  const response = await fetch(
    `/api/admin/boards/${boardSlug}/posts/${postId}?menuId=${menuId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const payload = (await response.json()) as { message?: string };
    throw new Error(payload.message || "게시글을 삭제하지 못했습니다.");
  }
}
