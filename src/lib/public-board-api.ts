import "server-only";

import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import type { TiptapDocument } from "@/lib/admin-board-editor-content";
import { PUBLIC_BOARD_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import { serverFetch, serverFetchJsonOrNull } from "@/lib/server-fetch";
import type { components } from "@/types/api";

export interface PublicBoardPostAsset {
  id: string;
  kind: "INLINE_IMAGE" | "FILE_ATTACHMENT" | string;
  originalFilename: string;
  storedPath: string;
  mimeType: string;
  byteSize: number;
  width: number | null;
  height: number | null;
  sortOrder: number;
  publicUrl?: string | null;
}

export interface PublicBoardAdjacentPost {
  id: string;
  title: string;
}

export interface PublicBoardPostSummary {
  id: string;
  boardId: string;
  menuId: string;
  title: string;
  isPublic: boolean;
  isPinned: boolean;
  authorId: string;
  authorName: string;
  viewCount: number;
  contentHtml: string;
  hasInlineImage: boolean;
  hasVideoEmbed: boolean;
  hasAttachments: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicBoardPostDetail extends PublicBoardPostSummary {
  contentJson: TiptapDocument | Record<string, unknown>;
  contentHtml: string;
  assets: PublicBoardPostAsset[];
  previousPost: PublicBoardAdjacentPost | null;
  nextPost: PublicBoardAdjacentPost | null;
}

export interface PublicBoardPostListResponse {
  items: PublicBoardPostSummary[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext?: boolean;
  searchTitle: string;
}

type BackendBoardPostAsset = components["schemas"]["PublicBoardPostAssetResponse"];
type BackendBoardAdjacentPost = components["schemas"]["PublicBoardAdjacentPostResponse"];
type BackendBoardPostSummary = components["schemas"]["PublicBoardPostSummaryResponse"];
type BackendBoardPostDetail = components["schemas"]["PublicBoardPostDetailResponse"];
type BackendBoardPostListResponse = components["schemas"]["PublicBoardListPostsResponse"];

function normalizeContentJson(value: string): TiptapDocument | Record<string, unknown> {
  try {
    return JSON.parse(value) as TiptapDocument | Record<string, unknown>;
  } catch {
    return { type: "doc", content: [] };
  }
}

function normalizeAsset(asset: BackendBoardPostAsset): PublicBoardPostAsset {
  return {
    id: String(asset.id ?? ""),
    kind: asset.kind,
    originalFilename: asset.originalFilename,
    storedPath: asset.storedPath,
    mimeType: asset.mimeType ?? "",
    byteSize: asset.byteSize,
    width: asset.width ?? null,
    height: asset.height ?? null,
    sortOrder: asset.sortOrder,
    publicUrl: asset.publicUrl ?? null,
  };
}

function normalizeAdjacentPost(post: BackendBoardAdjacentPost): PublicBoardAdjacentPost {
  return {
    id: String(post.id),
    title: post.title,
  };
}

function normalizeSummary(post: BackendBoardPostSummary): PublicBoardPostSummary {
  return {
    id: String(post.id ?? ""),
    boardId: String(post.boardId),
    menuId: String(post.menuId),
    title: post.title,
    isPublic: true,
    isPinned: post.isPinned,
    authorId: "",
    authorName: post.authorName,
    viewCount: Number(post.viewCount),
    contentHtml: post.contentHtml ?? "",
    hasInlineImage: post.hasInlineImage,
    hasVideoEmbed: post.hasVideoEmbed,
    hasAttachments: post.hasAttachments,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

function normalizeDetail(post: BackendBoardPostDetail): PublicBoardPostDetail {
  return {
    id: String(post.id ?? ""),
    boardId: String(post.boardId),
    menuId: String(post.menuId),
    title: post.title,
    isPublic: true,
    isPinned: post.isPinned,
    authorId: "",
    authorName: post.authorName,
    viewCount: Number(post.viewCount),
    contentHtml: post.contentHtml ?? "",
    hasInlineImage: false,
    hasVideoEmbed: false,
    hasAttachments: post.assets.some((a) => a.kind === "FILE_ATTACHMENT"),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    contentJson: normalizeContentJson(post.contentJson),
    assets: post.assets.map(normalizeAsset),
    previousPost: post.previousPost ? normalizeAdjacentPost(post.previousPost) : null,
    nextPost: post.nextPost ? normalizeAdjacentPost(post.nextPost) : null,
  };
}

function mapPayloadOrNull<TInput, TOutput>(payload: TInput | null, mapper: (value: TInput) => TOutput): TOutput | null {
  return payload ? mapper(payload) : null;
}

function normalizeListResponse(
  payload: BackendBoardPostListResponse,
  requestedPage: number,
  requestedSize: number,
  requestedTitle: string,
): PublicBoardPostListResponse {
  const totalItems = Number(payload.totalElements);
  const totalPages = payload.size > 0 ? Math.max(1, Math.ceil(totalItems / payload.size)) : 0;

  return {
    items: payload.posts.map(normalizeSummary),
    currentPage: payload.page + 1,
    pageSize: payload.size,
    totalItems,
    totalPages,
    hasNext: payload.hasNext,
    searchTitle: requestedTitle,
  };
}

async function fetchPublicBoardPosts(
  slug: string,
  menuId: number,
  page: number,
  size: number,
  title: string,
): Promise<PublicBoardPostListResponse | null> {
  const params = new URLSearchParams({
    menuId: String(menuId),
    page: String(page),
    size: String(size),
  });

  if (title) {
    params.set("title", title);
  }

  const payload = await serverFetchJsonOrNull<BackendBoardPostListResponse>(
    `/api/v1/public/boards/${encodeURIComponent(slug)}/posts?${params.toString()}`,
    {
      next: PUBLIC_BOARD_REVALIDATE_OPTIONS,
    },
  );

  return mapPayloadOrNull(payload, (value) => normalizeListResponse(value, page, size, title));
}

async function fetchPublicBoardPost(
  slug: string,
  menuId: number,
  postId: string,
): Promise<PublicBoardPostDetail | null> {
  const payload = await serverFetchJsonOrNull<BackendBoardPostDetail>(
    `/api/v1/public/boards/${encodeURIComponent(slug)}/posts/${encodeURIComponent(postId)}?menuId=${menuId}`,
    {
      cache: "no-store",
    },
  );

  return mapPayloadOrNull(payload, normalizeDetail);
}

export async function listPublicBoardPosts(
  slug: string,
  menuId: number,
  options: { page: number; size: number; title?: string },
): Promise<PublicBoardPostListResponse | null> {
  const normalizedTitle = options.title?.trim() ?? "";
  return getOrSetPublicRequestCache(
    `public-board-posts:${slug}:${menuId}:${options.page}:${options.size}:${normalizedTitle}`,
    () => fetchPublicBoardPosts(slug, menuId, options.page, options.size, normalizedTitle),
  );
}

export async function getPublicBoardPost(
  slug: string,
  menuId: number,
  postId: string,
): Promise<PublicBoardPostDetail | null> {
  return getOrSetPublicRequestCache(`public-board-post:${slug}:${menuId}:${postId}`, () =>
    fetchPublicBoardPost(slug, menuId, postId),
  );
}

export async function recordPublicBoardPostView(
  slug: string,
  menuId: string | number,
  postId: string,
): Promise<void> {
  await serverFetch(
    `/api/v1/public/boards/${encodeURIComponent(slug)}/posts/${encodeURIComponent(postId)}/views?menuId=${menuId}`,
    {
      method: "POST",
      cache: "no-store",
    },
  );
}
