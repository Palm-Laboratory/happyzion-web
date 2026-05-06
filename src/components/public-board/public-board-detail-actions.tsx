"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { PublicBoardAdjacentPost } from "@/lib/public-board-api";

type PublicBoardDetailActionsProps = {
  boardPath: string;
  previousPost: PublicBoardAdjacentPost | null;
  nextPost: PublicBoardAdjacentPost | null;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M13.96 6.07a2.54 2.54 0 1 0-2.24-3.74 2.54 2.54 0 0 0 2.24 3.74Zm-7.92 6.47a2.54 2.54 0 1 0-2.24 3.74 2.54 2.54 0 0 0 2.24-3.74Zm10.16.17a2.54 2.54 0 1 0-.04 0ZM5.92 14.05l7.97-4.1m-7.97-4 7.97 4.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M5 5h10M5 10h10M5 15h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M7 6.25A2.25 2.25 0 0 1 9.25 4h5.5A2.25 2.25 0 0 1 17 6.25v7.5A2.25 2.25 0 0 1 14.75 16h-5.5A2.25 2.25 0 0 1 7 13.75z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.75 13.5A2.25 2.25 0 0 1 3 11.3V5.75A2.25 2.25 0 0 1 5.25 3.5h5.55"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DirectionBadge({ direction }: { direction: "left" | "right" }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cedar/7 text-cedar">
      <ChevronIcon direction={direction} />
    </span>
  );
}

export default function PublicBoardDetailActions({
  boardPath,
  previousPost,
  nextPost,
}: PublicBoardDetailActionsProps) {
  const pathname = usePathname() ?? boardPath;
  const [shareLabel, setShareLabel] = useState("게시글 공유");
  const normalizedBoardPath = boardPath.replace(/\/+$/, "");

  async function handleShare() {
    const shareUrl = typeof window !== "undefined" ? new URL(pathname, window.location.origin).toString() : pathname;
    let nextLabel: string | null = null;

    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ url: shareUrl }))) {
        await navigator.share({
          title: document.title,
          text: document.title,
          url: shareUrl,
        });
        nextLabel = "공유 완료";
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        nextLabel = "링크 복사됨";
      } else {
        throw new Error("clipboard unavailable");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          nextLabel = "링크 복사됨";
        } else {
          nextLabel = "공유 실패";
        }
      } catch {
        nextLabel = "공유 실패";
      }
    } finally {
      if (!nextLabel) {
        return;
      }

      setShareLabel(nextLabel);
      window.setTimeout(() => setShareLabel("게시글 공유"), 1800);
    }
  }

  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleShare}
          className="type-body-small inline-flex h-11 items-center justify-center gap-2 rounded-full border border-cedar/16 bg-white px-4 font-semibold text-site-ink transition hover:border-cedar hover:bg-white sm:self-start"
        >
          {shareLabel === "링크 복사됨" ? <CopyIcon /> : <ShareIcon />}
          {shareLabel}
        </button>
        <Link
          href={boardPath}
          className="type-body-small inline-flex h-11 items-center justify-center gap-2 rounded-full border border-site-ink bg-site-ink px-4 font-semibold text-white transition hover:border-cedar hover:bg-cedar sm:self-auto"
        >
          <ListIcon />
          목록으로
        </Link>
      </div>

      <div className="mt-5 space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {previousPost ? (
          <Link
            href={`${normalizedBoardPath}/${previousPost.id}`}
            className="group flex items-center gap-4 rounded-[22px] border border-cedar/12 bg-white px-4 py-4 transition hover:border-cedar hover:bg-white hover:shadow-[0_10px_24px_rgba(16,33,63,0.07)]"
          >
            <DirectionBadge direction="left" />
            <div className="min-w-0 flex-1">
              <p className="type-label font-semibold tracking-[0.08em] text-site-muted">이전글</p>
              <p className="type-body mt-1 line-clamp-1 font-semibold text-site-ink transition group-hover:text-cedar">{previousPost.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 rounded-[22px] border border-dashed border-cedar/14 bg-white/70 px-4 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cedar/5 text-site-muted">
              <ChevronIcon direction="left" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="type-label font-semibold tracking-[0.08em] text-site-muted">이전글</p>
              <p className="type-body-small mt-1 text-site-muted">이전 게시글이 없습니다.</p>
            </div>
          </div>
        )}

        {nextPost ? (
          <Link
            href={`${normalizedBoardPath}/${nextPost.id}`}
            className="group flex items-center gap-4 rounded-[22px] border border-cedar/12 bg-white px-4 py-4 transition hover:border-cedar hover:bg-white hover:shadow-[0_10px_24px_rgba(16,33,63,0.07)]"
          >
            <div className="min-w-0 flex-1 text-right">
              <p className="type-label font-semibold tracking-[0.08em] text-site-muted">다음글</p>
              <p className="type-body mt-1 line-clamp-1 font-semibold text-site-ink transition group-hover:text-cedar">{nextPost.title}</p>
            </div>
            <DirectionBadge direction="right" />
          </Link>
        ) : (
          <div className="flex items-center gap-4 rounded-[22px] border border-dashed border-cedar/14 bg-white/70 px-4 py-4">
            <div className="min-w-0 flex-1 text-right">
              <p className="type-label font-semibold tracking-[0.08em] text-site-muted">다음글</p>
              <p className="type-body-small mt-1 text-site-muted">다음 게시글이 없습니다.</p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cedar/5 text-site-muted">
              <ChevronIcon direction="right" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
