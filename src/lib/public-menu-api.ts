import "server-only";

import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { PUBLIC_MENU_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import type { MenuType } from "@/lib/admin-menu-api";
import { serverFetchJson, serverFetchJsonOrNull } from "@/lib/server-fetch";

export type NavigationLinkType = "INTERNAL" | "EXTERNAL";

export interface PublicNavigationItem {
  key: string;
  type: MenuType;
  label: string;
  href: string;
  matchPath: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab: boolean;
  visible: boolean;
  headerVisible: boolean;
  mobileVisible: boolean;
  lnbVisible: boolean;
  breadcrumbVisible: boolean;
  defaultLanding: boolean;
}

export interface PublicNavigationGroup {
  key: string;
  type: MenuType;
  label: string;
  href: string;
  matchPath: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab: boolean;
  visible: boolean;
  headerVisible: boolean;
  mobileVisible: boolean;
  lnbVisible: boolean;
  breadcrumbVisible: boolean;
  defaultLandingHref: string | null;
  items: PublicNavigationItem[];
}

export interface PublicNavigationResponse {
  groups: PublicNavigationGroup[];
}

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
