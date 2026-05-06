import type { NavigationResponse, NavMenuGroup } from "@/lib/navigation-types";

interface NavigationMatchTarget {
  href: string;
  matchPath?: string | null;
}

function normalizePath(path: string | null | undefined): string {
  if (!path) {
    return "";
  }

  return path.split("#")[0] ?? path;
}

function getNavigationMatchScore(pathname: string, target: NavigationMatchTarget): number {
  const normalizedPath = normalizePath(target.matchPath ?? target.href);
  if (!normalizedPath) {
    return -1;
  }

  if (pathname === normalizedPath) {
    return normalizedPath.length + 10_000;
  }

  if (pathname.startsWith(`${normalizedPath}/`)) {
    return normalizedPath.length;
  }

  return -1;
}

function findBestNavigationTarget<T extends NavigationMatchTarget>(
  pathname: string,
  targets: readonly T[],
): T | undefined {
  let bestTarget: T | undefined;
  let bestScore = -1;

  for (const target of targets) {
    const targetScore = getNavigationMatchScore(pathname, target);
    if (targetScore > bestScore) {
      bestTarget = target;
      bestScore = targetScore;
    }
  }

  return bestTarget;
}

export function findMatchedNavigationGroup(
  pathname: string,
  groups: NavMenuGroup[],
): NavMenuGroup | undefined {
  let bestGroup: NavMenuGroup | undefined;
  let bestScore = -1;

  for (const group of groups) {
    const groupScore = getNavigationMatchScore(pathname, group);
    const matchedItem = findBestNavigationTarget(pathname, group.items);
    const itemScore = matchedItem ? getNavigationMatchScore(pathname, matchedItem) : -1;
    const candidateScore = Math.max(groupScore, itemScore);

    if (candidateScore > bestScore) {
      bestGroup = group;
      bestScore = candidateScore;
    }
  }

  return bestGroup;
}

export function findMatchedNavigationItem(
  pathname: string,
  group: NavMenuGroup | undefined,
) {
  return group ? findBestNavigationTarget(pathname, group.items) : undefined;
}

export function toNavMenuGroups(navigation: NavigationResponse): NavMenuGroup[] {
  return navigation.groups.map((group) => ({
    key: group.key,
    type: group.type,
    href: group.defaultLandingHref ?? group.href,
    label: group.label,
    matchPath: group.matchPath,
    linkType: group.linkType,
    contentSiteKey: group.contentSiteKey,
    openInNewTab: group.openInNewTab,
    hiddenInHeader: !group.headerVisible,
    hiddenInMobile: !group.mobileVisible,
    hiddenInLnb: !group.lnbVisible,
    hiddenInBreadcrumb: !group.breadcrumbVisible,
    defaultLandingHref: group.defaultLandingHref,
    items: group.items.map((item) => ({
      key: item.key,
      type: item.type,
      href: item.href,
      label: item.label,
      matchPath: item.matchPath,
      linkType: item.linkType,
      contentSiteKey: item.contentSiteKey,
      openInNewTab: item.openInNewTab,
      hiddenInHeader: !item.headerVisible,
      hiddenInMobile: !item.mobileVisible,
      hiddenInLnb: !item.lnbVisible,
      hiddenInBreadcrumb: !item.breadcrumbVisible,
      defaultLanding: item.defaultLanding,
    })),
  }));
}

export function isExternalNavigationHref(href: string): boolean {
  return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(href) || /^[a-z][a-z\d+\-.]*:/i.test(href);
}

export function shouldOpenNavigationInNewTab(
  href: string,
  options?: {
    linkType?: NavigationResponse["groups"][number]["linkType"];
    openInNewTab?: boolean;
  },
): boolean {
  return options?.openInNewTab === true || options?.linkType === "EXTERNAL" || isExternalNavigationHref(href);
}
