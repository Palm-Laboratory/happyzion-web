import "server-only";

import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { PUBLIC_MENU_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import { serverFetchJson, serverFetchJsonOrNull } from "@/lib/server-fetch";
import type { components } from "@/types/api";

export type PublicNavigationItem = components["schemas"]["NavigationItemDto"];
export type PublicNavigationGroup = components["schemas"]["NavigationGroupDto"];
export type PublicNavigationResponse = components["schemas"]["PublicNavigationResponse"];
export type NavigationLinkType = PublicNavigationItem["linkType"];

type GeneratedResolvedMenuPage = components["schemas"]["PublicResolvedMenuPageResponse"];

export type PublicResolvedMenuPage = GeneratedResolvedMenuPage & {
  parentLabel: string | null;
  staticPageKey: string | null;
  boardKey: string | null;
  redirectTo: string | null;
};

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
