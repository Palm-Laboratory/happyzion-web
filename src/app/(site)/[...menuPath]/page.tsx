import { notFound, redirect } from "next/navigation";

import PublicBoardRenderer from "@/components/public-board/public-board-renderer";
import SitePageShell from "@/components/site-page-shell";
import { renderStaticPage } from "@/components/static-pages/static-page-registry";
import { getPublicBoardPost, listPublicBoardPosts } from "@/lib/public-board-api";
import { resolvePublicMenuPath, type PublicResolvedMenuPage } from "@/lib/public-menu-api";

type MenuDispatcherPageProps = {
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

export default async function MenuDispatcherPage({
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
