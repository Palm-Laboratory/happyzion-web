"use client";

import { useEffect } from "react";

type PublicBoardViewRecorderProps = {
  boardKey: string;
  menuId: string;
  postId: string;
};

export default function PublicBoardViewRecorder({
  boardKey,
  menuId,
  postId,
}: PublicBoardViewRecorderProps) {
  useEffect(() => {
    if (!boardKey || !menuId || !postId) {
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
