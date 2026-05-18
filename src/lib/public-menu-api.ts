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

/**
 * Resolves a public menu path to its page metadata.
 *
 * Results are deduplicated per request via `getOrSetPublicRequestCache`. Callers that
 * need explicit per-call-site deduplication (e.g. between `generateMetadata` and page
 * render) should wrap this with React `cache()` at the usage site.
 */
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

const RENDERABLE_TYPES = new Set<string>(["BOARD", "YOUTUBE_PLAYLIST"]);

function extractInternalPaths(nav: PublicNavigationResponse): string[] {
  const paths: string[] = [];

  for (const group of nav.groups) {
    if (group.linkType === "INTERNAL" && RENDERABLE_TYPES.has(group.type)) {
      paths.push(group.href);
    }
    for (const item of group.items) {
      if (item.linkType === "INTERNAL" && RENDERABLE_TYPES.has(item.type)) {
        paths.push(item.href);
      }
    }
  }

  return [...new Set(paths)];
}

export async function fetchPublicMenuPaths(): Promise<string[]> {
  const nav = await serverFetchJson<PublicNavigationResponse>("/api/v1/public/menu", {
    cache: "no-store",
  });
  return extractInternalPaths(nav);
}
