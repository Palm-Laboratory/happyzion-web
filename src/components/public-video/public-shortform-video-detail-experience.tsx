"use client";

import Image from "next/image";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { formatLongDate } from "@/lib/format-date";
import type {
  PublicPlaylistDetail,
  PublicShortformPlaylistWindow,
  PublicVideoDetail,
  PublicVideoList,
  PublicVideoSummary,
} from "@/lib/videos-api";

interface PublicShortformVideoDetailExperienceProps {
  playlist: PublicPlaylistDetail;
  initialVideo: PublicVideoDetail;
}

interface ShortformPlaybackVideo extends PublicVideoSummary {
  description: string | null;
}

const SWIPE_THRESHOLD_PX = 70;
const CLICK_THRESHOLD_PX = 12;
const FALLBACK_PAGE_SIZE = 8;

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          host?: string;
          playerVars?: Record<string, number | string>;
          videoId?: string;
          events?: {
            onReady?: (event: { target: YouTubePlayerInstance }) => void;
          };
        },
      ) => YouTubePlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayerInstance {
  destroy(): void;
  getPlayerState(): number;
  getVolume(): number;
  isMuted(): boolean;
  loadVideoById(videoId: string): void;
  mute(): void;
  pauseVideo(): void;
  playVideo(): void;
  setVolume(volume: number): void;
  unMute(): void;
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };
  });

  return youtubeApiPromise;
}

function buildPlayerVars(videoId: string, muted: boolean) {
  return {
    autoplay: 1,
    controls: 0,
    enablejsapi: 1,
    loop: 1,
    modestbranding: 1,
    mute: muted ? 1 : 0,
    playsinline: 1,
    playlist: videoId,
    rel: 0,
  };
}

function toPlaybackVideos(
  playlist: PublicPlaylistDetail,
  playlistVideos: PublicVideoSummary[],
  initialVideo: PublicVideoDetail,
) {
  const detailFallback: ShortformPlaybackVideo = {
    contentForm: "SHORTFORM",
    description: initialVideo.summary || initialVideo.description || null,
    href: `${playlist.fullPath}/${initialVideo.videoId}`,
    preacherName: initialVideo.preacherName,
    publishedAt: initialVideo.publishedAt,
    scriptureReference: initialVideo.scriptureReference,
    summary: initialVideo.summary,
    thumbnailUrl: initialVideo.thumbnailUrl,
    title: initialVideo.title,
    videoId: initialVideo.videoId,
  };
  const uniqueVideos = new Map<string, ShortformPlaybackVideo>();

  playlistVideos.forEach((video) => {
    uniqueVideos.set(video.videoId, {
      ...video,
      description:
        video.videoId === initialVideo.videoId
          ? initialVideo.summary || initialVideo.description || null
          : video.summary || null,
    });
  });

  if (!uniqueVideos.has(initialVideo.videoId)) {
    uniqueVideos.set(initialVideo.videoId, detailFallback);
  }

  return Array.from(uniqueVideos.values());
}

function buildInitialPlaybackState(playlist: PublicPlaylistDetail, initialVideo: PublicVideoDetail) {
  const initialWindow = initialVideo.shortformPlaylist;
  const initialVideos = toPlaybackVideos(playlist, initialWindow?.items ?? [], initialVideo);
  const initialIndex = (() => {
    if (!initialWindow) {
      return Math.max(0, initialVideos.findIndex((video) => video.videoId === initialVideo.videoId));
    }

    const targetVideoId = initialVideos[initialWindow.currentIndexInWindow]?.videoId;
    if (targetVideoId === initialVideo.videoId) {
      return initialWindow.currentIndexInWindow;
    }

    return Math.max(0, initialVideos.findIndex((video) => video.videoId === initialVideo.videoId));
  })();

  return {
    currentPage: initialWindow?.currentPage ?? 1,
    initialIndex,
    pageSize: initialWindow?.pageSize ?? 8,
    totalItems: initialWindow?.totalItems ?? initialVideos.length,
    totalPages: initialWindow?.totalPages ?? 1,
    videos: initialVideos,
  };
}

function toPlaybackVideosFromList(initialVideo: PublicVideoDetail, videos: PublicVideoSummary[]) {
  return videos.map((video) => ({
    ...video,
    description:
      video.videoId === initialVideo.videoId
        ? initialVideo.summary || initialVideo.description || null
        : video.summary || null,
  }));
}

function resolvePath(href: string) {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href;
  }
}

function MuteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        fill="currentColor"
      />
      <path
        d="M17 9l6 6M23 9l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({
  className = "",
  direction,
}: {
  className?: string;
  direction: "up" | "down";
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d={direction === "up" ? "M7 14L12 9L17 14" : "M7 10L12 15L17 10"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



function ShortformPlayer({
  isMuted,
  onPointerDown,
  onPointerUp,
  playerHostRef,
  video,
}: {
  isMuted: boolean;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  playerHostRef: RefObject<HTMLDivElement | null>;
  video: ShortformPlaybackVideo;
}) {
  return (
    <div
      className="relative h-full w-full touch-none overflow-hidden bg-[#33103f] md:aspect-[9/16] md:h-[680px] md:max-h-[72vh] md:rounded-[26px] md:shadow-[0_24px_70px_rgba(20,6,26,0.24)]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      aria-label={isMuted ? "음소거된 쇼츠 영상" : "쇼츠 영상"}
    >
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          priority
          className="object-cover opacity-50"
          sizes="(min-width: 768px) 390px, 100vw"
        />
      ) : null}
      <div
        ref={playerHostRef}
        className="pointer-events-none absolute inset-0 h-full w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
      />
      <div className="absolute inset-0 z-10" />
      {isMuted ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <MuteIcon className="h-7 w-7 text-white" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VideoDescription({ activeMeta, video }: { activeMeta: string; video: ShortformPlaybackVideo }) {
  const publishedAt = formatLongDate(video.publishedAt);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desc = descRef.current;
    if (!desc) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      desc.scrollTop += e.deltaY;
    };

    desc.addEventListener("wheel", onWheel, { passive: false });
    return () => desc.removeEventListener("wheel", onWheel);
  }, [video]);

  return (
    <div className="flex h-full flex-col gap-comp-xxl">
      <div className="flex flex-col gap-comp-md">
        <p className="type-label-lg font-semibold text-[#8b6db5]">
          Shorts
        </p>
        <h1 className="type-heading-md line-clamp-3 text-[1.5rem] md:text-[1.5rem] lg:text-[1.5rem]">
          {video.title}
        </h1>
        {activeMeta ? <p className="type-body-xs text-current/72">{activeMeta}</p> : null}
        {publishedAt ? <p className="type-body-xs leading-none text-current/64">{publishedAt}</p> : null}
      </div>

      {video.description ? (
        <div ref={descRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <p className="type-body-xs whitespace-pre-line text-current/70">
            {video.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function PublicShortformVideoDetailExperience({
  playlist,
  initialVideo,
}: PublicShortformVideoDetailExperienceProps) {
  const initialPlaybackState = useMemo(
    () => buildInitialPlaybackState(playlist, initialVideo),
    [initialVideo, playlist],
  );
  const [videos, setVideos] = useState<ShortformPlaybackVideo[]>(initialPlaybackState.videos);
  const [currentIndex, setCurrentIndex] = useState(initialPlaybackState.initialIndex);
  const [loadedPageRange, setLoadedPageRange] = useState({
    end: initialPlaybackState.currentPage,
    start: initialPlaybackState.currentPage,
  });
  const [playlistWindowInfo, setPlaylistWindowInfo] = useState<Pick<
    PublicShortformPlaylistWindow,
    "pageSize" | "totalItems" | "totalPages"
  >>({
    pageSize: initialPlaybackState.pageSize,
    totalItems: initialPlaybackState.totalItems,
    totalPages: initialPlaybackState.totalPages,
  });
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const skipPushRef = useRef(true);
  const loadingPagesRef = useRef<Set<number>>(new Set());
  const playerHostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const lastLoadedVideoIdRef = useRef<string | null>(null);
  const hasActivatedAudioRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const nextState = buildInitialPlaybackState(playlist, initialVideo);
    skipPushRef.current = true;
    loadingPagesRef.current.clear();
    setVideos(nextState.videos);
    setCurrentIndex(nextState.initialIndex);
    setLoadedPageRange({
      end: nextState.currentPage,
      start: nextState.currentPage,
    });
    setPlaylistWindowInfo({
      pageSize: nextState.pageSize,
      totalItems: nextState.totalItems,
      totalPages: nextState.totalPages,
    });
  }, [initialVideo, playlist]);

  useEffect(() => {
    if (initialVideo.shortformPlaylist) {
      return;
    }

    let cancelled = false;

    const loadFallbackPlaylistWindow = async () => {
      const loadedItems: PublicVideoSummary[] = [];
      let currentPage = 1;
      let pageSize = FALLBACK_PAGE_SIZE;
      let totalItems = 0;
      let totalPages = 1;
      let foundTarget = false;

      while (!foundTarget && currentPage <= totalPages) {
        const response = await fetch(
          `/api/public/videos/items?path=${encodeURIComponent(playlist.fullPath)}&page=${currentPage}&size=${pageSize}`,
          { cache: "no-store" },
        );

        if (!response.ok || cancelled) {
          return;
        }

        const payload = (await response.json()) as PublicVideoList;
        if (payload.form !== "SHORTFORM") {
          return;
        }

        loadedItems.push(...payload.items);
        pageSize = payload.pageSize;
        totalItems = payload.totalItems;
        totalPages = payload.totalPages;
        foundTarget = loadedItems.some((video) => video.videoId === initialVideo.videoId);
        currentPage += 1;
      }

      if (cancelled) {
        return;
      }

      const dedupedItems = Array.from(
        new Map(loadedItems.map((video) => [video.videoId, video])).values(),
      );
      const playbackVideos = toPlaybackVideos(playlist, dedupedItems, initialVideo);
      const targetIndex = Math.max(
        0,
        playbackVideos.findIndex((video) => video.videoId === initialVideo.videoId),
      );

      setVideos(playbackVideos);
      setCurrentIndex(targetIndex);
      setLoadedPageRange({
        start: 1,
        end: Math.max(1, currentPage - 1),
      });
      setPlaylistWindowInfo({
        pageSize,
        totalItems: totalItems || playbackVideos.length,
        totalPages,
      });
    };

    void loadFallbackPlaylistWindow();

    return () => {
      cancelled = true;
    };
  }, [initialVideo, playlist]);

  const activeVideo = videos[currentIndex] ?? videos[0];
  const previousVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;
  const hasPreviousPage = loadedPageRange.start > 1;
  const hasNextPage = loadedPageRange.end < playlistWindowInfo.totalPages;

  useEffect(() => {
    if (!activeVideo?.videoId) {
      return undefined;
    }

    let cancelled = false;

    const syncPlayer = async () => {
      await loadYouTubeIframeApi();

      if (cancelled) {
        return;
      }

      const playerHost = playerHostRef.current;
      if (!playerHost || !window.YT?.Player) {
        return;
      }

      const shouldStartMuted = !hasActivatedAudioRef.current;

      if (!playerRef.current) {
        playerHost.replaceChildren();
        lastLoadedVideoIdRef.current = activeVideo.videoId;
        playerRef.current = new window.YT.Player(playerHost, {
          host: "https://www.youtube-nocookie.com",
          videoId: activeVideo.videoId,
          playerVars: buildPlayerVars(activeVideo.videoId, shouldStartMuted),
          events: {
            onReady: ({ target }) => {
              if (cancelled) {
                return;
              }

              if (target.getVolume() <= 0) {
                target.setVolume(100);
              }

              if (shouldStartMuted) {
                target.mute();
              } else {
                target.unMute();
              }

              target.playVideo();
              setIsMuted(target.isMuted());
            },
          },
        });
        return;
      }

      if (lastLoadedVideoIdRef.current === activeVideo.videoId) {
        return;
      }

      if (shouldStartMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }

      playerRef.current.loadVideoById(activeVideo.videoId);
      playerRef.current.playVideo();
      lastLoadedVideoIdRef.current = activeVideo.videoId;
      setIsMuted(shouldStartMuted);
    };

    void syncPlayer();

    return () => {
      cancelled = true;
    };
  }, [activeVideo?.videoId]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
      lastLoadedVideoIdRef.current = null;
    };
  }, []);

  const mergePlaybackVideos = useCallback((
    currentVideos: ShortformPlaybackVideo[],
    incomingVideos: ShortformPlaybackVideo[],
    direction: "append" | "prepend",
  ) => {
    const currentIds = new Set(currentVideos.map((video) => video.videoId));
    const nextItems = incomingVideos.filter((video) => !currentIds.has(video.videoId));

    return direction === "prepend"
      ? { insertedCount: nextItems.length, mergedVideos: [...nextItems, ...currentVideos] }
      : { insertedCount: nextItems.length, mergedVideos: [...currentVideos, ...nextItems] };
  }, []);

  const loadPlaylistPage = useCallback(async (page: number) => {
    if (
      page < 1 ||
      page > playlistWindowInfo.totalPages ||
      (page >= loadedPageRange.start && page <= loadedPageRange.end) ||
      loadingPagesRef.current.has(page)
    ) {
      return false;
    }

    loadingPagesRef.current.add(page);

    try {
      const response = await fetch(
        `/api/public/videos/items?path=${encodeURIComponent(playlist.fullPath)}&page=${page}&size=${playlistWindowInfo.pageSize}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        return false;
      }

      const payload = (await response.json()) as PublicVideoList;
      if (payload.form !== "SHORTFORM") {
        return false;
      }

      const incomingVideos = toPlaybackVideosFromList(initialVideo, payload.items);
      const direction = page < loadedPageRange.start ? "prepend" : "append";
      const { insertedCount, mergedVideos } = mergePlaybackVideos(videos, incomingVideos, direction);

      setVideos(mergedVideos);
      setLoadedPageRange({
        start: Math.min(loadedPageRange.start, page),
        end: Math.max(loadedPageRange.end, page),
      });
      setPlaylistWindowInfo({
        pageSize: payload.pageSize,
        totalItems: payload.totalItems,
        totalPages: payload.totalPages,
      });

      if (direction === "prepend" && insertedCount > 0) {
        setCurrentIndex((index) => index + insertedCount);
      }

      return true;
    } catch {
      return false;
    } finally {
      loadingPagesRef.current.delete(page);
    }
  }, [
    initialVideo,
    loadedPageRange,
    mergePlaybackVideos,
    playlist.fullPath,
    playlistWindowInfo,
    videos,
  ]);

  const moveToPrevious = useCallback(async () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      return;
    }

    if (hasPreviousPage && await loadPlaylistPage(loadedPageRange.start - 1)) {
      setCurrentIndex((index) => Math.max(0, index - 1));
    }
  }, [currentIndex, hasPreviousPage, loadPlaylistPage, loadedPageRange.start]);

  const moveToNext = useCallback(async () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    if (hasNextPage && await loadPlaylistPage(loadedPageRange.end + 1)) {
      setCurrentIndex((index) => Math.min(videos.length, index + 1));
    }
  }, [currentIndex, hasNextPage, loadPlaylistPage, loadedPageRange.end, videos.length]);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    if (skipPushRef.current) {
      skipPushRef.current = false;
      return;
    }

    const targetPath = resolvePath(activeVideo.href);
    if (targetPath !== window.location.pathname) {
      window.history.replaceState({ videoId: activeVideo.videoId }, "", targetPath);
    }
  }, [activeVideo]);

  useEffect(() => {
    const syncIndexFromLocation = () => {
      const nextIndex = videos.findIndex((video) => resolvePath(video.href) === window.location.pathname);
      if (nextIndex >= 0) {
        skipPushRef.current = true;
        setCurrentIndex(nextIndex);
      }
    };

    window.addEventListener("popstate", syncIndexFromLocation);

    return () => {
      window.removeEventListener("popstate", syncIndexFromLocation);
    };
  }, [videos]);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    if (currentIndex >= videos.length - 2 && hasNextPage) {
      void loadPlaylistPage(loadedPageRange.end + 1);
    }

    if (currentIndex <= 1 && hasPreviousPage) {
      void loadPlaylistPage(loadedPageRange.start - 1);
    }
  }, [
    activeVideo,
    currentIndex,
    hasNextPage,
    hasPreviousPage,
    loadPlaylistPage,
    loadedPageRange.end,
    loadedPageRange.start,
    videos.length,
  ]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const deltaX = event.clientX - pointerStartRef.current.x;
    const deltaY = event.clientY - pointerStartRef.current.y;

    if (Math.abs(deltaX) <= CLICK_THRESHOLD_PX && Math.abs(deltaY) <= CLICK_THRESHOLD_PX) {
      activateAudioOnTap();
      return;
    }

    if (Math.abs(deltaY) < SWIPE_THRESHOLD_PX || Math.abs(deltaY) < Math.abs(deltaX)) {
      return;
    }

    if (deltaY < 0) {
      void moveToNext();
      return;
    }

    void moveToPrevious();
  };

  const activateAudioOnTap = () => {
    if (!playerRef.current) {
      return;
    }

    if (!hasActivatedAudioRef.current) {
      hasActivatedAudioRef.current = true;
      if (playerRef.current.getVolume() <= 0) {
        playerRef.current.setVolume(100);
      }
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsMuted(false);
      return;
    }

    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  if (!activeVideo) {
    return null;
  }

  const activeMeta = [activeVideo.scriptureReference, activeVideo.preacherName]
    .filter(Boolean)
    .join(" · ");
  const canMovePrevious = Boolean(previousVideo || hasPreviousPage);
  const canMoveNext = Boolean(nextVideo || hasNextPage);

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-[#1f0f28] text-white md:static md:z-auto md:overflow-visible md:bg-white md:text-[#33103f]">
      <section className="h-full overflow-hidden md:h-auto md:overflow-visible">
        <div className="mx-auto grid h-full w-full max-w-[1180px] grid-rows-1 md:min-h-[760px] md:grid-cols-[minmax(220px,1fr)_minmax(300px,390px)_minmax(180px,1fr)] md:items-start md:gap-pad-xxl md:px-pad-lg md:py-14">
          <div className="hidden md:flex md:h-[680px] md:max-h-[72vh] md:flex-col md:overflow-hidden">
            <VideoDescription activeMeta={activeMeta} video={activeVideo} />
          </div>

          <div className="relative flex h-full min-h-0 items-center justify-center">
            <ShortformPlayer
              isMuted={isMuted}
              video={activeVideo}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              playerHostRef={playerHostRef}
            />
          </div>

          <div className="hidden md:flex md:flex-col md:items-start md:justify-center md:self-center">
            <div className="flex shrink-0 flex-col gap-comp-md">
              <button
                type="button"
                onClick={() => {
                  void moveToPrevious();
                }}
                disabled={!canMovePrevious}
                aria-label="이전 쇼츠"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/12 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35 md:h-14 md:w-14 md:border-[#33103f]/12 md:bg-transparent md:text-[#33103f] md:hover:bg-[#33103f]/5"
              >
                <ChevronIcon direction="up" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  void moveToNext();
                }}
                disabled={!canMoveNext}
                aria-label="다음 쇼츠"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/12 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35 md:h-14 md:w-14 md:border-[#33103f]/12 md:bg-transparent md:text-[#33103f] md:hover:bg-[#33103f]/5"
              >
                <ChevronIcon direction="down" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
