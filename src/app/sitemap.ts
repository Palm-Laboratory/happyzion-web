import type { MetadataRoute } from "next";

import { getPublicNavigation } from "@/lib/public-menu-api";
import { SITE_URL } from "@/lib/site-config";

function normalizePath(href: string | null | undefined): string {
  if (!href) {
    return "";
  }

  // 사이트맵에는 페이지 기준 URL만 넣고, 페이지 내부 앵커는 제외한다.
  const basePath = href.split("#")[0]?.trim() ?? "";
  if (!basePath || !basePath.startsWith("/") || basePath.startsWith("/admin")) {
    return "";
  }

  if (basePath === "/") {
    return "/";
  }

  return basePath.replace(/\/+$/, "");
}

function addPath(paths: Set<string>, href: string | null | undefined) {
  const normalized = normalizePath(href);
  if (!normalized) return;
  paths.add(normalized);
}

function toSitemapEntry(path: string, now: Date): MetadataRoute.Sitemap[number] {
  return {
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    // 홈은 공개 사이트의 대표 진입점이라 다른 페이지보다 높은 우선순위를 둔다.
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const paths = new Set<string>(["/"]);

  try {
    // 공개 메뉴는 관리자 CMS에서 관리되며, 메뉴 태그 기반 revalidation을 사용한다.
    const navigation = await getPublicNavigation();

    for (const group of navigation.groups) {
      if (group.visible && group.linkType === "INTERNAL") {
        // 상위 메뉴는 자체 경로 대신 첫 하위 메뉴 또는 기본 랜딩 페이지를 가리킬 수 있다.
        addPath(paths, group.defaultLandingHref ?? group.href);
      }

      for (const item of group.items) {
        if (item.visible && item.linkType === "INTERNAL") {
          addPath(paths, item.href);
        }
      }
    }
  } catch {
    // 메뉴 API가 일시적으로 실패해도 최소 사이트맵 생성은 유지한다.
  }

  return Array.from(paths)
    .sort((left, right) => {
      if (left === "/") return -1;
      if (right === "/") return 1;
      return left.localeCompare(right);
    })
    .map((route) => toSitemapEntry(route, now));
}
