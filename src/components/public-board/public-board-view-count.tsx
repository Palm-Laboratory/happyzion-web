"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [viewCount, setViewCount] = useState(initialViewCount);

  useEffect(() => {
    setViewCount(initialViewCount);
  }, [initialViewCount, postId]);

  const handleRecorded = useCallback(() => {
    // 로컬 상태를 즉시 +1 반영하고, 백그라운드에서 서버 컴포넌트를 재렌더링한다.
    // router.refresh()는 Router Cache를 무효화하고 no-store 캐시로 DB 최신값을 가져온다.
    setViewCount((current) => current + 1);
    router.refresh();
  }, [router]);

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
