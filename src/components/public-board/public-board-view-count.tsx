"use client";

import { useCallback, useEffect, useState } from "react";

import PublicBoardViewRecorder from "@/components/public-board/public-board-view-recorder";

type PublicBoardViewCountProps = {
  boardKey: string;
  menuId: string;
  postId: string;
  initialViewCount: number;
};

export default function PublicBoardViewCount({
  boardKey,
  menuId,
  postId,
  initialViewCount,
}: PublicBoardViewCountProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);

  useEffect(() => {
    setViewCount(initialViewCount);
  }, [initialViewCount, postId]);

  const handleRecorded = useCallback(() => {
    setViewCount((current) => current + 1);
  }, []);

  return (
    <>
      <span className="font-medium">{viewCount.toLocaleString("ko-KR")}</span>
      <PublicBoardViewRecorder
        boardKey={boardKey}
        menuId={menuId}
        postId={postId}
        onRecorded={handleRecorded}
      />
    </>
  );
}
