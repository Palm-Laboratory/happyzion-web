import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import PublicBoardRenderer from "@/components/public-board/public-board-renderer";
import SitePageShell from "@/components/site-page-shell";
import { renderStaticPage } from "@/features/static-pages/static-page-registry";
import { getPublicBoardPost, listPublicBoardPosts } from "@/lib/public-board-api";
import { resolvePublicMenuPath, type PublicResolvedMenuPage } from "@/lib/public-menu-api";
import { createPageMetadata } from "@/lib/seo";

export type MenuDispatcherPageProps = {
  params: Promise<{
    menuPath: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_BOARD_PAGE_SIZE = 20;

function normalizePath(menuPath: string[]) {
  return `/${menuPath.filter(Boolean).join("/")}`;
}

function getFirstSearchParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function getShellTitle(resolved: PublicResolvedMenuPage) {
  return resolved.parentLabel ?? resolved.label;
}

function getShellSubtitle(path: string) {
  const rootSegment = path.split("/").filter(Boolean)[0];
  return rootSegment ? `${rootSegment.toUpperCase()} HAPPY ZION` : "HAPPY ZION";
}

function getPageTitle(resolved: PublicResolvedMenuPage) {
  return resolved.parentLabel ? `${resolved.label} | ${resolved.parentLabel}` : resolved.label;
}

export async function generateMenuDispatcherMetadata({
  params,
}: Omit<MenuDispatcherPageProps, "searchParams">): Promise<Metadata> {
  const { menuPath } = await params;
  const path = normalizePath(menuPath);
  const resolved = await resolvePublicMenuPath(path);

  if (resolved?.redirectTo) {
    return createPageMetadata({
      title: resolved.label,
      path: resolved.redirectTo,
    });
  }

  if (resolved) {
    return createPageMetadata({
      title: getPageTitle(resolved),
      path: resolved.fullPath,
    });
  }

  const segments = path.split("/").filter(Boolean);
  const boardPath = segments.length >= 2 ? `/${segments.slice(0, -1).join("/")}` : "";
  const postId = segments.at(-1);
  const board = boardPath ? await resolvePublicMenuPath(boardPath) : null;

  if (board?.type === "BOARD" && board.boardKey && postId) {
    const post = await getPublicBoardPost(board.boardKey, board.menuId, postId);

    if (post) {
      return createPageMetadata({
        title: `${post.title} | ${board.label}`,
        path,
      });
    }
  }

  return createPageMetadata({
    title: "페이지를 찾을 수 없습니다",
    path,
  });
}

async function renderStaticMenuPage(resolved: PublicResolvedMenuPage) {
  if (!resolved.staticPageKey) {
    notFound();
  }

  const content = renderStaticPage(resolved.staticPageKey);

  if (!content) {
    notFound();
  }

  return (
    <SitePageShell title={getShellTitle(resolved)} subtitle={getShellSubtitle(resolved.fullPath)}>
      {content}
    </SitePageShell>
  );
}

async function renderBoardListPage(
  resolved: PublicResolvedMenuPage,
  searchParams: Record<string, string | string[] | undefined>,
) {
  if (!resolved.boardKey) {
    notFound();
  }

  const requestedPage = parsePositiveInteger(getFirstSearchParam(searchParams, "page"), 1);
  const pageSize = parsePositiveInteger(
    getFirstSearchParam(searchParams, "size"),
    DEFAULT_BOARD_PAGE_SIZE,
  );
  const title = getFirstSearchParam(searchParams, "title")?.trim() ?? "";
  const posts = await listPublicBoardPosts(resolved.boardKey, resolved.menuId, {
    page: requestedPage - 1,
    size: pageSize,
    title,
  });

  if (!posts) {
    notFound();
  }

  return (
    <SitePageShell title={getShellTitle(resolved)} subtitle={getShellSubtitle(resolved.fullPath)}>
      <PublicBoardRenderer
        mode="list"
        boardLabel={resolved.label}
        boardPath={resolved.fullPath}
        posts={posts.items}
        currentPage={posts.currentPage}
        pageSize={posts.pageSize}
        totalItems={posts.totalItems}
        totalPages={posts.totalPages}
        searchTitle={posts.searchTitle}
      />
    </SitePageShell>
  );
}

async function renderBoardDetailPage(path: string) {
  const segments = path.split("/").filter(Boolean);

  if (segments.length < 2) {
    notFound();
  }

  const postId = segments.at(-1);
  const boardPath = `/${segments.slice(0, -1).join("/")}`;

  if (!postId) {
    notFound();
  }

  const resolved = await resolvePublicMenuPath(boardPath);

  if (!resolved || resolved.type !== "BOARD" || !resolved.boardKey) {
    notFound();
  }

  const post = await getPublicBoardPost(resolved.boardKey, resolved.menuId, postId);

  if (!post) {
    notFound();
  }

  return (
    <SitePageShell title={getShellTitle(resolved)} subtitle={getShellSubtitle(resolved.fullPath)}>
      <PublicBoardRenderer
        mode="detail"
        boardLabel={resolved.label}
        boardPath={resolved.fullPath}
        post={post}
      />
    </SitePageShell>
  );
}

export async function renderMenuDispatcherPage({
  params,
  searchParams,
}: MenuDispatcherPageProps) {
  const { menuPath } = await params;
  const resolvedSearchParams = await searchParams;
  const path = normalizePath(menuPath);
  const resolved = await resolvePublicMenuPath(path);

  if (!resolved) {
    return renderBoardDetailPage(path);
  }

  if (resolved.redirectTo) {
    redirect(resolved.redirectTo);
  }

  if (resolved.type === "STATIC") {
    return renderStaticMenuPage(resolved);
  }

  if (resolved.type === "BOARD") {
    return renderBoardListPage(resolved, resolvedSearchParams);
  }

  if (resolved.type === "EXTERNAL_LINK" && resolved.fullPath) {
    redirect(resolved.fullPath);
  }

  notFound();
}
