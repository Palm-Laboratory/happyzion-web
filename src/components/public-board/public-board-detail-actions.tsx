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
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-6 w-6">
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
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-6 w-6">
      <path d="M5 5h10M5 10h10M5 15h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-6 w-6">
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
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-6 w-6">
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
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#f4eff6] text-[#2a123c]">
      <ChevronIcon direction={direction} />
    </span>
  );
}

function getBoardPostHref(boardPath: string, postId: string) {
  return `${boardPath.replace(/\/+$/, "")}/posts/${postId}`;
}

export default function PublicBoardDetailActions({
  boardPath,
  previousPost,
  nextPost,
}: PublicBoardDetailActionsProps) {
  const pathname = usePathname() ?? boardPath;
  const [shareLabel, setShareLabel] = useState("게시글 공유");

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
          className="type-body-xs inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#8b6db5]/20 bg-white px-4 font-semibold text-[#33103f] transition hover:border-[#8b6db5] hover:bg-white sm:self-start"
        >
          {shareLabel === "링크 복사됨" ? <CopyIcon /> : <ShareIcon />}
          {shareLabel}
        </button>
        <Link
          href={boardPath}
          className="type-body-xs inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#33103f] bg-[#33103f] px-4 font-semibold text-white transition hover:border-[#8b6db5] hover:bg-[#8b6db5] sm:self-auto"
        >
          <ListIcon />
          목록으로
        </Link>
      </div>

      <div className="mt-8 space-y-3 md:grid md:grid-cols-2 md:gap-[60px] md:space-y-0">
        {previousPost ? (
          <Link
            href={getBoardPostHref(boardPath, previousPost.id)}
            className="group flex items-start gap-5 rounded-[16px] border border-dashed border-[rgba(93,61,138,0.2)] bg-white p-6 transition hover:border-[#8b6db5] hover:bg-white"
          >
            <DirectionBadge direction="left" />
            <div className="min-w-0 flex-1">
              <p className="type-label-md font-semibold tracking-[0.08em] text-site-muted">이전글</p>
              <p className="type-body-md mt-1 line-clamp-1 font-semibold text-[#33103f] transition group-hover:text-[#8b6db5]">{previousPost.title}</p>
            </div>
          </Link>
        ) : (
          <div className="flex items-start gap-5 rounded-[16px] border border-dashed border-[rgba(93,61,138,0.2)] bg-white p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#f4eff6] text-[#4a3b5e]/60">
              <ChevronIcon direction="left" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="type-label-md font-semibold tracking-[0.08em] text-site-muted">이전글</p>
              <p className="type-body-xs mt-1 text-site-muted">이전 게시글이 없습니다.</p>
            </div>
          </div>
        )}

        {nextPost ? (
          <Link
            href={getBoardPostHref(boardPath, nextPost.id)}
            className="group flex items-center justify-end gap-5 rounded-[16px] border border-dashed border-[rgba(93,61,138,0.2)] bg-white p-6 transition hover:border-[#8b6db5] hover:bg-white"
          >
            <div className="min-w-0 flex-1 text-right">
              <p className="type-label-md font-semibold tracking-[0.08em] text-site-muted">다음글</p>
              <p className="type-body-md mt-1 line-clamp-1 font-semibold text-[#33103f] transition group-hover:text-[#8b6db5]">{nextPost.title}</p>
            </div>
            <DirectionBadge direction="right" />
          </Link>
        ) : (
          <div className="flex items-center gap-4 rounded-[22px] border border-dashed border-cedar/14 bg-white/70 px-4 py-4">
            <div className="min-w-0 flex-1 text-right">
              <p className="type-label-md font-semibold tracking-[0.08em] text-site-muted">다음글</p>
              <p className="type-body-xs mt-1 text-site-muted">다음 게시글이 없습니다.</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#f4eff6] text-[#4a3b5e]/60">
              <ChevronIcon direction="right" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
