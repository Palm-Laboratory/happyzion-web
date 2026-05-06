import type { MetadataRoute } from "next";

import { getPublicNavigation } from "@/lib/public-menu-api";
import { SITE_URL } from "@/lib/site-config";

function isSitemapPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("/admin");
}

function addPath(paths: Set<string>, href: string) {
  if (!isSitemapPath(href)) return;
  paths.add(href);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(["/"]);

  try {
    const navigation = await getPublicNavigation();

    for (const group of navigation.groups) {
      if (group.visible && group.linkType === "INTERNAL") {
        addPath(paths, group.href);
      }

      for (const item of group.items) {
        if (item.visible && item.linkType === "INTERNAL") {
          addPath(paths, item.href);
        }
      }
    }
  } catch {
    // Keep sitemap generation available even if the menu API is temporarily down.
  }

  return Array.from(paths).map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
