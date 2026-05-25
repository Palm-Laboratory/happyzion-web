"use client";

import { useState } from "react";

type IframeScrollGuardProps = {
  src: string;
  title: string;
  className?: string;
  allow?: string;
  allowFullScreen?: boolean;
  loading?: "lazy" | "eager";
  referrerPolicy?: React.IframeHTMLAttributes<HTMLIFrameElement>["referrerPolicy"];
};

/**
 * YouTube 등 크로스 오리진 iframe 위에 투명 오버레이를 올려
 * 스크롤 이벤트가 iframe에 가로채이는 문제를 방지합니다.
 * 사용자가 클릭하면 오버레이가 제거되어 영상 조작이 가능해집니다.
 */
export default function IframeScrollGuard({
  src,
  title,
  className,
  allow,
  allowFullScreen,
  loading,
  referrerPolicy,
}: IframeScrollGuardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative h-full w-full" onClick={() => setIsActive(true)}>
      <iframe
        src={src}
        title={title}
        className={className}
        allow={allow}
        allowFullScreen={allowFullScreen}
        loading={loading}
        referrerPolicy={referrerPolicy}
      />
      {!isActive && (
        <div className="absolute inset-0 cursor-pointer" aria-hidden="true" />
      )}
    </div>
  );
}
