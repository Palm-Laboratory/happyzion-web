import type { Metadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { cache } from "react";

import PublicBoardRenderer from "@/components/public-board/public-board-renderer";
import PublicVideoPlaylistDetailView from "@/components/public-video/public-video-playlist-detail-view";
import PublicVideoPlaylistView from "@/components/public-video/public-video-playlist-view";
import SitePageShell from "@/components/site-page-shell";
import { getPublicBoardPost, listPublicBoardPosts } from "@/lib/public-board-api";
import { resolvePublicMenuPath, type PublicResolvedMenuPage } from "@/lib/public-menu-api";
import { createPageMetadata } from "@/lib/seo";
import {
  getPublicPlaylistDetailByPath,
  getPublicPlaylistVideoDetailByPath,
  getPublicPlaylistVideoListByPath,
  type PublicVideoDetail,
} from "@/lib/videos-api";
import { isYouTubeVideoId } from "@/lib/youtube-id";

// cache() makes the dedupe contract explicit: generateMetadata and the page render are
// separate Next.js call paths but receive the same path argument, so they share one fetch.
const resolveMenuPath = cache(resolvePublicMenuPath);

export type MenuDispatcherPageProps = {
  params: Promise<{
    menuPath: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DEFAULT_BOARD_PAGE_SIZE = 20;
const MAX_BOARD_PAGE_SIZE = 50;
const LONGFORM_VIDEO_PAGE_SIZE = 6;
const SHORTFORM_VIDEO_PAGE_SIZE = 8;

function normalizePath(menuPath: string[]) {
  return `/${menuPath.filter(Boolean).join("/")}`;
}

function getExplicitBoardPostRoute(path: string) {
  const segments = path.split("/").filter(Boolean);
  const postId = segments.at(-1);

  if (segments.length < 3 || !postId) {
    return null;
  }

  if (segments.at(-2) === "posts") {
    return {
      boardPath: `/${segments.slice(0, -2).join("/")}`,
      postId,
    };
  }

  return null;
}

function getLegacyBoardPostRoute(path: string) {
  const segments = path.split("/").filter(Boolean);
  const postId = segments.at(-1);

  if (segments.length < 2 || !postId || !/^\d+$/.test(postId)) {
    return null;
  }

  return {
    boardPath: `/${segments.slice(0, -1).join("/")}`,
    postId,
  };
}

function getChildRoute(path: string) {
  const segments = path.split("/").filter(Boolean);
  const childId = segments.at(-1);

  if (segments.length < 2 || !childId) {
    return null;
  }

  return {
    parentPath: `/${segments.slice(0, -1).join("/")}`,
    childId,
  };
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

function parseBoardPageSize(value: string | undefined) {
  return Math.min(parsePositiveInteger(value, DEFAULT_BOARD_PAGE_SIZE), MAX_BOARD_PAGE_SIZE);
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

type VideoDetailRoute =
  | {
      kind: "found";
      playlist: PublicResolvedMenuPage;
      video: PublicVideoDetail;
    }
  | {
      kind: "missing";
      playlist: PublicResolvedMenuPage;
    }
  | {
      kind: "none";
    };

async function resolveVideoDetailRoute(path: string): Promise<VideoDetailRoute> {
  const childRoute = getChildRoute(path);

  if (!childRoute || !isYouTubeVideoId(childRoute.childId)) {
    return { kind: "none" };
  }

  const playlist = await resolveMenuPath(childRoute.parentPath);

  if (!playlist || playlist.type !== "YOUTUBE_PLAYLIST") {
    return { kind: "none" };
  }

  const video = await getPublicPlaylistVideoDetailByPath(playlist.fullPath, childRoute.childId);

  if (!video) {
    return { kind: "missing", playlist };
  }

  return { kind: "found", playlist, video };
}

export async function generateMenuDispatcherMetadata({
  params,
  searchParams,
}: MenuDispatcherPageProps): Promise<Metadata> {
  const { menuPath } = await params;
  const resolvedSearchParams = await searchParams;
  const path = normalizePath(menuPath);
  const explicitPostRoute = getExplicitBoardPostRoute(path);

  if (explicitPostRoute) {
    const board = await resolveMenuPath(explicitPostRoute.boardPath);

    if (board?.type === "BOARD" && board.boardKey) {
      const post = await getPublicBoardPost(board.boardKey, board.menuId, explicitPostRoute.postId);

      if (post) {
        return createPageMetadata({
          title: `${post.title} | ${board.label}`,
          path,
        });
      }
    }
  }

  const resolved = await resolveMenuPath(path);

  if (resolved?.redirectTo) {
    return createPageMetadata({
      title: resolved.label,
      path: resolved.redirectTo,
    });
  }

  if (resolved?.type === "YOUTUBE_PLAYLIST") {
    const requestedPage = parsePositiveInteger(getFirstSearchParam(resolvedSearchParams, "page"), 1);
    const playlist = await getPublicPlaylistDetailByPath(resolved.fullPath);

    return createPageMetadata({
      title: playlist?.title ?? getPageTitle(resolved),
      description: playlist?.description ?? undefined,
      path:
        playlist?.contentForm === "SHORTFORM" || requestedPage <= 1
          ? resolved.fullPath
          : `${resolved.fullPath}?page=${requestedPage}`,
    });
  }

  if (resolved) {
    return createPageMetadata({
      title: getPageTitle(resolved),
      path: resolved.fullPath,
    });
  }

  const videoDetailRoute = await resolveVideoDetailRoute(path);

  if (videoDetailRoute.kind === "found") {
    return createPageMetadata({
      title: `${videoDetailRoute.video.title} | ${videoDetailRoute.playlist.label}`,
      description:
        videoDetailRoute.video.summary ||
        videoDetailRoute.video.description ||
        `${videoDetailRoute.playlist.label} 영상입니다.`,
      path: `${videoDetailRoute.playlist.fullPath}/${videoDetailRoute.video.videoId}`,
    });
  }

  const legacyPostRoute = getLegacyBoardPostRoute(path);
  const board = legacyPostRoute ? await resolveMenuPath(legacyPostRoute.boardPath) : null;

  if (legacyPostRoute && board?.type === "BOARD" && board.boardKey) {
    const post = await getPublicBoardPost(board.boardKey, board.menuId, legacyPostRoute.postId);

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

async function renderBoardListPage(
  resolved: PublicResolvedMenuPage,
  searchParams: Record<string, string | string[] | undefined>,
) {
  if (!resolved.boardKey) {
    notFound();
  }

  const requestedPage = parsePositiveInteger(getFirstSearchParam(searchParams, "page"), 1);
  const pageSize = parseBoardPageSize(getFirstSearchParam(searchParams, "size"));
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

async function renderVideoListPage(
  resolved: PublicResolvedMenuPage,
  searchParams: Record<string, string | string[] | undefined>,
) {
  const playlist = await getPublicPlaylistDetailByPath(resolved.fullPath);

  if (!playlist) {
    notFound();
  }

  const requestedPage = parsePositiveInteger(getFirstSearchParam(searchParams, "page"), 1);
  const pageSize =
    playlist.contentForm === "SHORTFORM" ? SHORTFORM_VIDEO_PAGE_SIZE : LONGFORM_VIDEO_PAGE_SIZE;
  const videos = await getPublicPlaylistVideoListByPath(playlist.fullPath, requestedPage, pageSize);

  if (!videos) {
    notFound();
  }

  if (playlist.fullPath !== resolved.fullPath) {
    redirect(playlist.fullPath);
  }

  if (videos.form === "SHORTFORM" && requestedPage !== 1) {
    redirect(playlist.fullPath);
  }

  if (videos.form !== "SHORTFORM" && videos.currentPage !== requestedPage) {
    const target =
      videos.currentPage > 1 ? `${playlist.fullPath}?page=${videos.currentPage}` : playlist.fullPath;
    redirect(target);
  }

  return (
    <SitePageShell title={getShellTitle(resolved)} subtitle={getShellSubtitle(resolved.fullPath)}>
      <PublicVideoPlaylistView playlist={playlist} videos={videos} />
    </SitePageShell>
  );
}

async function renderVideoDetailPage(path: string) {
  const videoDetailRoute = await resolveVideoDetailRoute(path);

  if (videoDetailRoute.kind === "none") {
    return null;
  }

  if (videoDetailRoute.kind === "missing") {
    notFound();
  }

  const playlist = await getPublicPlaylistDetailByPath(videoDetailRoute.playlist.fullPath);

  if (!playlist) {
    notFound();
  }

  const canonicalDetailPath = `${playlist.fullPath}/${videoDetailRoute.video.videoId}`;

  if (canonicalDetailPath !== path) {
    redirect(canonicalDetailPath);
  }

  return (
    <SitePageShell
      title={getShellTitle(videoDetailRoute.playlist)}
      subtitle={getShellSubtitle(videoDetailRoute.playlist.fullPath)}
    >
      <PublicVideoPlaylistDetailView playlist={playlist} video={videoDetailRoute.video} />
    </SitePageShell>
  );
}

async function renderBoardDetailPage({
  boardPath,
  postId,
}: {
  boardPath: string;
  postId: string;
}) {
  const resolved = await resolveMenuPath(boardPath);

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
        boardKey={resolved.boardKey}
        boardLabel={resolved.label}
        boardPath={resolved.fullPath}
        post={post}
      />
    </SitePageShell>
  );
}

async function redirectLegacyBoardDetailPage(path: string): Promise<never> {
  const legacyPostRoute = getLegacyBoardPostRoute(path);

  if (!legacyPostRoute) {
    notFound();
  }

  const resolved = await resolveMenuPath(legacyPostRoute.boardPath);

  if (!resolved || resolved.type !== "BOARD") {
    notFound();
  }

  return redirect(`${resolved.fullPath.replace(/\/+$/, "")}/posts/${legacyPostRoute.postId}`);
}

type PageRenderer = (
  resolved: PublicResolvedMenuPage,
  searchParams: Record<string, string | string[] | undefined>,
) => Promise<React.ReactElement>;

const PAGE_RENDERERS: Partial<Record<string, PageRenderer>> = {
  BOARD: renderBoardListPage,
  YOUTUBE_PLAYLIST: renderVideoListPage,
  EXTERNAL_LINK: async (resolved) => {
    if (resolved.fullPath) redirect(resolved.fullPath);
    notFound();
  },
};

export async function renderMenuDispatcherPage({
  params,
  searchParams,
}: MenuDispatcherPageProps) {
  const { menuPath } = await params;
  const resolvedSearchParams = await searchParams;
  const path = normalizePath(menuPath);
  const explicitPostRoute = getExplicitBoardPostRoute(path);

  if (explicitPostRoute) {
    return renderBoardDetailPage(explicitPostRoute);
  }

  const resolved = await resolveMenuPath(path);

  if (!resolved) {
    const videoDetailPage = await renderVideoDetailPage(path);
    if (videoDetailPage) {
      return videoDetailPage;
    }

    return redirectLegacyBoardDetailPage(path);
  }

  if (resolved.redirectTo) {
    if (resolved.type === "STATIC") {
      permanentRedirect(resolved.redirectTo);
    }
    redirect(resolved.redirectTo);
  }

  const renderer = PAGE_RENDERERS[resolved.type];
  if (!renderer) notFound();
  return renderer(resolved, resolvedSearchParams);
}
