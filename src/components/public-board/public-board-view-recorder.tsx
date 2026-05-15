"use client";

import { useEffect } from "react";

type PublicBoardViewRecorderProps = {
  boardKey: string;
  menuId: string;
  postId: string;
};

const VIEW_RECORDING_DEDUP_TTL_MS = 30_000;
const recentViewRecordAttempts = new Map<string, number>();

function pruneExpiredViewRecordAttempts(now: number) {
  recentViewRecordAttempts.forEach((recordedAt, key) => {
    if (now - recordedAt > VIEW_RECORDING_DEDUP_TTL_MS) {
      recentViewRecordAttempts.delete(key);
    }
  });
}

function shouldRecordView(boardKey: string, postId: string, menuId: string): boolean {
  if (process.env.NODE_ENV !== "development") {
    return true;
  }

  const now = Date.now();
  const key = `${boardKey}:${postId}:${menuId}`;
  const recordedAt = recentViewRecordAttempts.get(key);

  pruneExpiredViewRecordAttempts(now);

  if (recordedAt !== undefined && now - recordedAt <= VIEW_RECORDING_DEDUP_TTL_MS) {
    return false;
  }

  recentViewRecordAttempts.set(key, now);
  return true;
}

export default function PublicBoardViewRecorder({
  boardKey,
  menuId,
  postId,
}: PublicBoardViewRecorderProps) {
  useEffect(() => {
    if (!boardKey || !menuId || !postId) {
      return;
    }

    if (!shouldRecordView(boardKey, postId, menuId)) {
      return;
    }

    const params = new URLSearchParams({ menuId });
    const url = `/api/public/boards/${encodeURIComponent(boardKey)}/posts/${encodeURIComponent(postId)}/views?${params.toString()}`;

    void fetch(url, {
      method: "POST",
      keepalive: true,
    }).catch(() => {
      // View recording should never interrupt reading the post.
    });
  }, [boardKey, menuId, postId]);

  return null;
}
