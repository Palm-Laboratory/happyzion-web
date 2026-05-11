import "server-only";

import { PUBLIC_MENU_REVALIDATE_OPTIONS } from "@/lib/public-cache-policy";
import { getOrSetPublicRequestCache } from "@/lib/public-request-cache";
import { serverFetchJson } from "@/lib/server-fetch";
import { toNavMenuGroups } from "@/lib/navigation-utils";
import type { NavigationResponse, NavMenuGroup } from "@/lib/navigation-types";

const FALLBACK_NAVIGATION_RESPONSE = {
  groups: [
    {
      key: "about",
      type: "FOLDER",
      label: "교회 소개",
      href: "/about/greeting",
      matchPath: "/about",
      linkType: "INTERNAL",
      contentSiteKey: null,
      openInNewTab: false,
      visible: true,
      headerVisible: true,
      mobileVisible: true,
      lnbVisible: true,
      breadcrumbVisible: true,
      defaultLandingHref: "/about/greeting",
      items: [
        createStaticNavigationItem("greeting", "인사말", "/about/greeting", "about.greeting", true),
        createStaticNavigationItem("church-story", "교회 이야기", "/about/church-story", "about.church-story"),
        createStaticNavigationItem("service-times", "예배시간 안내", "/about/service-times", "about.service-times"),
        createStaticNavigationItem("location", "오시는 길", "/about/location", "about.location"),
        createStaticNavigationItem("mission-history", "선교 이력", "/about/mission-history", "about.mission-history"),
        createStaticNavigationItem("online-giving", "온라인 헌금", "/about/online-giving", "about.online-giving"),
      ],
    },
  ],
} satisfies NavigationResponse;

function createStaticNavigationItem(
  key: string,
  label: string,
  href: string,
  contentSiteKey: string,
  defaultLanding = false,
): NavigationResponse["groups"][number]["items"][number] {
  return {
    key,
    type: "STATIC",
    label,
    href,
    matchPath: href,
    linkType: "INTERNAL",
    contentSiteKey,
    openInNewTab: false,
    visible: true,
    headerVisible: true,
    mobileVisible: true,
    lnbVisible: true,
    breadcrumbVisible: true,
    defaultLanding,
  };
}

export async function getNavigationResponse(): Promise<NavigationResponse> {
  return getOrSetPublicRequestCache("navigation-response", async () => {
    try {
      return await serverFetchJson<NavigationResponse>("/api/v1/public/menu", {
        next: PUBLIC_MENU_REVALIDATE_OPTIONS,
      });
    } catch (error) {
      console.warn("Using fallback navigation because the public menu API failed.", error);
      return FALLBACK_NAVIGATION_RESPONSE;
    }
  });
}

export async function getNavMenuGroups(): Promise<NavMenuGroup[]> {
  const navigation = await getNavigationResponse();
  return toNavMenuGroups(navigation);
}

export async function getNavigationGroupByKey(key: string): Promise<NavMenuGroup | undefined> {
  const groups = await getNavMenuGroups();
  return groups.find((group) => group.key === key);
}
