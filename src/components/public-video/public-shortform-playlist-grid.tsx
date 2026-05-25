"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatLongDate } from "@/lib/format-date";
import type { components } from "@/types/api";

type ShortformVideoItem = components["schemas"]["VideoPlaylistItemSummary"];
type ShortformVideoListResponse = components["schemas"]["VideoPlaylistItemsResponse"];

function ShortformCard({ video }: { video: ShortformVideoItem }) {
  const publishedAt = formatLongDate(video.publishedAt);

  return (
    <Link href={video.href} className="group flex flex-col gap-comp-md">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[8px] bg-[#33103f]">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1280px) 210px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#33103f]/10" />
      </div>

      <div className="flex flex-col gap-comp-sm text-[#33103f]">
        <p className="type-body-xs line-clamp-2 font-semibold leading-7">{video.title}</p>
        {publishedAt ? <p className="type-label-md text-[#33103f]/70">{publishedAt}</p> : null}
      </div>
    </Link>
  );
}

export default function PublicShortformPlaylistGrid({
  path,
  initialItems,
  initialPage,
  initialPageSize,
  initialTotalPages,
}: {
  path: string;
  initialItems: ShortformVideoItem[];
  initialPage: number;
  initialPageSize: number;
  initialTotalPages: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loadFailed, setLoadFailed] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const currentPageRef = useRef(initialPage);
  const pageSizeRef = useRef(initialPageSize);
  const totalPagesRef = useRef(initialTotalPages);
  const inFlightPageRef = useRef<number | null>(null);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    pageSizeRef.current = pageSize;
  }, [pageSize]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  const hasMore = currentPage < totalPages;

  const handleLoadMore = async () => {
    const nextPage = currentPageRef.current + 1;

    if (
      currentPageRef.current >= totalPagesRef.current ||
      isLoadingMore ||
      inFlightPageRef.current === nextPage
    ) {
      return;
    }

    inFlightPageRef.current = nextPage;
    setIsLoadingMore(true);
    setLoadFailed(false);

    try {
      const response = await fetch(
        `/api/public/videos/items?path=${encodeURIComponent(path)}&page=${nextPage}&size=${pageSizeRef.current}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        setLoadFailed(true);
        return;
      }

      const payload = (await response.json()) as ShortformVideoListResponse;

      setItems((prev) => {
        const existingIds = new Set(prev.map((video) => video.videoId));
        const nextItems = payload.items.filter((video) => !existingIds.has(video.videoId));
        return [...prev, ...nextItems];
      });
      setCurrentPage(payload.currentPage);
      setPageSize(payload.pageSize);
      setTotalPages(payload.totalPages);
    } catch {
      setLoadFailed(true);
    } finally {
      if (inFlightPageRef.current === nextPage) {
        inFlightPageRef.current = null;
      }
      setIsLoadingMore(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-[8px] border border-dashed border-[#33103f]/20 px-pad-md py-14 text-center text-[#33103f]/60">
        <p className="type-body-sm">공개된 영상이 아직 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-pad-xxl">
      <div className="grid grid-cols-2 gap-x-[14px] gap-y-comp-3xl sm:gap-x-[22px] sm:gap-y-pad-xxl lg:grid-cols-3 xl:grid-cols-4">
        {items.map((video) => (
          <ShortformCard key={video.videoId} video={video} />
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="type-body-xs inline-flex min-w-[132px] items-center justify-center rounded-full bg-[#33103f] px-pad-md py-pad-xxs font-semibold text-white transition hover:bg-[#4b1760] disabled:cursor-not-allowed disabled:bg-[#928397]"
          >
            {isLoadingMore ? `불러오는 중... (${currentPage}/${totalPages})` : `더보기 (${currentPage}/${totalPages})`}
          </button>
        </div>
      ) : null}

      {loadFailed ? (
        <p className="type-body-xs text-center text-[#9a5a00]">
          영상을 더 불러오지 못했습니다. 다시 시도해 주세요.
        </p>
      ) : null}
    </div>
  );
}
