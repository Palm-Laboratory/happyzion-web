import "server-only";

import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { PUBLIC_MENU_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import type { MenuType } from "@/lib/admin-menu-api";
import type {
  NavigationGroupDto,
  NavigationItemDto,
  NavigationLinkType,
  NavigationResponse,
} from "@/lib/navigation-types";
import { serverFetchJson, serverFetchJsonOrNull } from "@/lib/server-fetch";

export type PublicNavigationItem = NavigationItemDto;
export type PublicNavigationGroup = NavigationGroupDto;
export type PublicNavigationResponse = NavigationResponse;
export type { NavigationLinkType };

export interface PublicResolvedMenuPage {
  menuId: number;
  type: MenuType;
  label: string;
  slug: string;
  fullPath: string;
  parentLabel: string | null;
  staticPageKey: string | null;
  boardKey: string | null;
  redirectTo: string | null;
}

export async function resolvePublicMenuPath(path: string): Promise<PublicResolvedMenuPage | null> {
  return getOrSetPublicRequestCache(`public-menu-path:${path}`, () =>
    serverFetchJsonOrNull<PublicResolvedMenuPage>(
      `/api/v1/public/menu/resolve?path=${encodeURIComponent(path)}`,
      {
        next: PUBLIC_MENU_REVALIDATE_OPTIONS,
      },
    ),
  );
}

export async function getPublicNavigation(): Promise<PublicNavigationResponse> {
  return getOrSetPublicRequestCache("public-menu-navigation", () =>
    serverFetchJson<PublicNavigationResponse>("/api/v1/public/menu", {
      next: PUBLIC_MENU_REVALIDATE_OPTIONS,
    }),
  );
}
