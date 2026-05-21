"use client";

import { useEffect } from "react";

/**
 * html 요소의 overflow-y를 hidden으로 잠가 ProseMirror 내부의
 * scrollRectIntoView → window.scrollTo 가 어드민 레이아웃을 밀어올리지 못하게 합니다.
 */
export function CmsScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflowY;
    html.style.overflowY = "hidden";
    return () => {
      html.style.overflowY = prev;
    };
  }, []);

  return null;
}
