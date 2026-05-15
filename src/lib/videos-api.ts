import "server-only";

import { PUBLIC_VIDEO_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { type ServerFetchInit, serverFetchJsonOrNull } from "@/lib/server-fetch";
import type { components } from "@/types/api";

export type VideoContentForm = components["schemas"]["VideoPlaylistItemSummary"]["contentForm"];
export type PublicVideoSibling = components["schemas"]["PublicVideoSiblingDto"];
export type PublicPlaylistDetail = components["schemas"]["PublicVideoDetailResponse"];
export type PublicVideoSummary = components["schemas"]["VideoPlaylistItemSummary"];
export type PublicVideoList = components["schemas"]["VideoPlaylistItemsResponse"];
export type PublicVideoPlaylistLink = components["schemas"]["VideoPlaylistLink"];
export type PublicShortformPlaylistWindow = components["schemas"]["VideoShortformPlaylistWindow"];
export type PublicVideoDetail = components["schemas"]["VideoPlaylistItemDetailResponse"];

function fetchVideoResourceOrNull<T>(
  path: string,
  next: NonNullable<ServerFetchInit["next"]>,
): Promise<T | null> {
  return serverFetchJsonOrNull<T>(path, { next });
}

export async function getPublicPlaylistDetailByPath(path: string): Promise<PublicPlaylistDetail | null> {
  return getOrSetPublicRequestCache(`playlist-detail-by-path:${path}`, () =>
    fetchVideoResourceOrNull<PublicPlaylistDetail>(
      `/api/v1/public/videos?path=${encodeURIComponent(path)}`,
      PUBLIC_VIDEO_REVALIDATE_OPTIONS,
    ),
  );
}

export async function getPublicPlaylistVideoListByPath(
  path: string,
  page = 1,
  size = 6,
): Promise<PublicVideoList | null> {
  return getOrSetPublicRequestCache(`playlist-video-list-by-path:${path}:${page}:${size}`, () =>
    fetchVideoResourceOrNull<PublicVideoList>(
      `/api/v1/public/videos/items?path=${encodeURIComponent(path)}&page=${page}&size=${size}`,
      PUBLIC_VIDEO_REVALIDATE_OPTIONS,
    ),
  );
}

export async function getPublicPlaylistVideoDetailByPath(
  path: string,
  videoId: string,
): Promise<PublicVideoDetail | null> {
  return getOrSetPublicRequestCache(`playlist-video-detail-by-path:${path}:${videoId}`, () =>
    fetchVideoResourceOrNull<PublicVideoDetail>(
      `/api/v1/public/videos/detail?path=${encodeURIComponent(path)}&videoId=${encodeURIComponent(videoId)}`,
      PUBLIC_VIDEO_REVALIDATE_OPTIONS,
    ),
  );
}
