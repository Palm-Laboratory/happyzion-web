import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getNavigationResponse } from "@/lib/navigation-api";
import type { StaticPageKey } from "@/features/static-pages/types";

export async function getCanonicalStaticPath(contentSiteKey: string): Promise<string | null> {
  try {
    const navigation = await getNavigationResponse();

    for (const group of navigation.groups) {
      for (const item of group.items) {
        if (item.contentSiteKey === contentSiteKey) {
          return item.href;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function getCanonicalStaticHref(
  contentSiteKey: string,
  hash?: string,
): Promise<string | null> {
  const canonicalPath = await getCanonicalStaticPath(contentSiteKey);
  if (!canonicalPath) {
    return null;
  }

  if (!hash) {
    return canonicalPath;
  }

  return `${canonicalPath}${hash.startsWith("#") ? hash : `#${hash}`}`;
}

/**
 * Returns the current published path for a static page key (from the live menu DB),
 * falling back to a hardcoded path when the nav API is unavailable.
 * Use this instead of hardcoding paths in <Link> — slugs can change when menus are edited.
 */
export async function linkToStaticPage(key: StaticPageKey, fallback: string): Promise<string> {
  const resolved = await getCanonicalStaticHref(key);
  return resolved ?? fallback;
}

export async function redirectToCanonicalStaticPathIfNeeded(
  contentSiteKey: string,
  currentPath: string,
): Promise<void> {
  const canonicalPath = await getCanonicalStaticPath(contentSiteKey);
  const headerStore = await headers();
  const requestPath = headerStore.get("x-current-path")?.trim();
  const comparePath = requestPath && requestPath.length > 0 ? requestPath : currentPath;

  if (canonicalPath && canonicalPath !== comparePath) {
    redirect(canonicalPath);
  }
}
