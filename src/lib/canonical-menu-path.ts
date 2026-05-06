import "server-only";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getNavigationResponse } from "@/lib/navigation-api";
import { resolvePublicMenuPath } from "@/lib/public-menu-api";

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

export async function assertCanonicalStaticPage(
  contentSiteKey: string,
  currentPath: string,
): Promise<void> {
  const headerStore = await headers();
  const requestPath = headerStore.get("x-current-path")?.trim();
  const comparePath = requestPath && requestPath.length > 0 ? requestPath : currentPath;
  const resolved = await resolvePublicMenuPath(comparePath);

  if (!resolved) {
    const canonicalPath = await getCanonicalStaticPath(contentSiteKey);

    if (canonicalPath && canonicalPath !== comparePath) {
      redirect(canonicalPath);
    }

    notFound();
  }

  if (resolved.redirectTo) {
    redirect(resolved.redirectTo);
  }

  if (resolved.type !== "STATIC" || resolved.staticPageKey !== contentSiteKey) {
    notFound();
  }
}
