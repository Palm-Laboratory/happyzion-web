import type { components } from "@/types/api";

export type NavigationItemDto = components["schemas"]["NavigationItemDto"];
export type NavigationGroupDto = components["schemas"]["NavigationGroupDto"];
export type NavigationResponse = components["schemas"]["PublicNavigationResponse"];
export type NavigationLinkType = NavigationItemDto["linkType"];

export interface NavSubItem {
  key: string;
  type: NavigationItemDto["type"];
  href: string;
  label: string;
  matchPath?: string | null;
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  hiddenInHeader?: boolean;
  hiddenInMobile?: boolean;
  hiddenInLnb?: boolean;
  hiddenInBreadcrumb?: boolean;
  defaultLanding?: boolean;
}

export interface NavMenuGroup {
  key: string;
  type: NavigationItemDto["type"];
  href: string;
  label: string;
  matchPath?: string | null;
  items: NavSubItem[];
  linkType: NavigationLinkType;
  contentSiteKey?: string | null;
  openInNewTab?: boolean;
  hiddenInHeader?: boolean;
  hiddenInMobile?: boolean;
  hiddenInLnb?: boolean;
  hiddenInBreadcrumb?: boolean;
  defaultLandingHref?: string | null;
}
