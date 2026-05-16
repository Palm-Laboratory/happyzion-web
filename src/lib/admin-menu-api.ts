import "server-only";

import { adminApiFetch, AdminApiError } from "@/lib/admin-api";
import type { components } from "@/types/api";

export type MenuType = components["schemas"]["AdminMenuTreeNodeDto"]["type"];
export type MenuStatus = components["schemas"]["AdminMenuTreeNodeDto"]["status"];
export type YouTubeSyncStatus = NonNullable<components["schemas"]["AdminMenuTreeNodeDto"]["syncStatus"]>;
export type YouTubeContentForm = NonNullable<components["schemas"]["AdminMenuTreeNodeDto"]["playlistContentForm"]>;

export type AdminMenuTreeNode = components["schemas"]["AdminMenuTreeNodeDto"];
export type AdminMenuTreeResponse = components["schemas"]["AdminMenuTreeResponse"];
export type AdminStaticPage = components["schemas"]["AdminStaticPageDto"];
export type AdminStaticPagesResponse = components["schemas"]["AdminStaticPagesResponse"];
export type AdminYouTubePlaylist = components["schemas"]["AdminYouTubePlaylistDto"];
export type AdminYouTubePlaylistsResponse = components["schemas"]["AdminYouTubePlaylistsResponse"];
export type YouTubeSyncResponse = components["schemas"]["YouTubeSyncResponse"];

export interface MenuTreeNodePayload {
  id: number | null;
  type: MenuType;
  status: MenuStatus;
  label: string;
  slug: string;
  slugCustomized?: boolean;
  staticPageKey?: string | null;
  boardKey?: string | null;
  boardType?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean;
  isAuto?: boolean;
  playlistContentForm?: YouTubeContentForm | null;
  children: MenuTreeNodePayload[];
}

export async function getAdminMenuTree(): Promise<AdminMenuTreeResponse> {
  const response = await adminApiFetch("/api/v1/admin/menu");
  return response.json() as Promise<AdminMenuTreeResponse>;
}

function flattenMenuItems(items: AdminMenuTreeNode[]): AdminMenuTreeNode[] {
  return items.flatMap((item) => [item, ...flattenMenuItems(item.children)]);
}

export async function getAdminMenuItems(): Promise<AdminMenuTreeNode[]> {
  const tree = await getAdminMenuTree();
  return flattenMenuItems(tree.items);
}

export async function getAdminStaticPages(): Promise<AdminStaticPagesResponse> {
  const response = await adminApiFetch("/api/v1/admin/menu/static-pages");
  return response.json() as Promise<AdminStaticPagesResponse>;
}

export async function getAdminYouTubePlaylists(): Promise<AdminYouTubePlaylistsResponse> {
  const response = await adminApiFetch("/api/v1/admin/youtube/playlists");
  return response.json() as Promise<AdminYouTubePlaylistsResponse>;
}

export async function replaceAdminMenuTree(items: MenuTreeNodePayload[]): Promise<AdminMenuTreeResponse> {
  const response = await adminApiFetch("/api/v1/admin/menu/tree", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  return response.json() as Promise<AdminMenuTreeResponse>;
}

export async function syncAdminYouTube(): Promise<YouTubeSyncResponse> {
  const response = await adminApiFetch("/api/v1/admin/youtube/sync", {
    method: "POST",
  });
  return response.json() as Promise<YouTubeSyncResponse>;
}

export async function deleteAdminMenuItem(menuId: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/menu/${menuId}`, {
    method: "DELETE",
  });
}

export function toFriendlyAdminMenuMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
  }

  return error.message || fallback;
}
