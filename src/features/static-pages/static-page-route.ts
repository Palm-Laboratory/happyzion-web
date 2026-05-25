import "server-only";

import type { Metadata } from "next";
import { resolvePublicMenuPath } from "@/lib/public-menu-api";
import { createPageMetadata } from "@/lib/seo";

function deriveSubtitle(path: string) {
  const rootSegment = path.split("/").filter(Boolean)[0];
  return rootSegment ? rootSegment.toUpperCase() : "";
}

export async function resolveStaticPageShellProps(path: string, fallbackTitle: string) {
  const resolved = await resolvePublicMenuPath(path);
  return {
    title: resolved?.parentLabel ?? resolved?.label ?? fallbackTitle,
    subtitle: deriveSubtitle(path),
  };
}

export async function createStaticPageMetadata(path: string, fallbackTitle: string): Promise<Metadata> {
  const resolved = await resolvePublicMenuPath(path);
  const title = resolved
    ? resolved.parentLabel
      ? `${resolved.label} | ${resolved.parentLabel}`
      : resolved.label
    : fallbackTitle;
  return createPageMetadata({ title, path });
}
