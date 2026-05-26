"use client";

import { useEffect, useRef, useState } from "react";

type IframeScrollGuardProps = {
  src: string;
  title: string;
  className?: string;
  allow?: string;
  allowFullScreen?: boolean;
  loading?: "lazy" | "eager";
  referrerPolicy?: React.IframeHTMLAttributes<HTMLIFrameElement>["referrerPolicy"];
};

type LenisInstance = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
  scroll: number;
  velocity: number;
};

function getLenis(): LenisInstance | undefined {
  return (window as Window & { __lenis?: LenisInstance }).__lenis;
}

/**
 * YouTube 등 크로스 오리진 iframe 위에 투명 오버레이를 올려
 * 스크롤 이벤트가 iframe에 가로채이는 문제를 방지합니다.
 *
 * [플레이 전] 오버레이가 wheel event를 { passive: false } + preventDefault()로 차단,
 *            브라우저가 iframe에 추가 dispatch하지 않도록 막습니다.
 *
 * [플레이 후] Lenis velocity가 남아있는 상태에서 커서가 iframe 위로 진입하면
 *            임시 오버레이를 올려 wheel 이벤트를 Lenis로 재전달합니다.
 *            velocity가 0에 수렴하면 오버레이를 제거해 영상 조작이 가능해집니다.
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 플레이 전: overlay에서 wheel preventDefault → iframe으로 이벤트 차단
  useEffect(() => {
    if (isActive) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    overlay.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      overlay.removeEventListener("wheel", handleWheel);
    };
  }, [isActive]);

  // 플레이 후: Lenis velocity가 있을 때 커서가 iframe 위에 있으면
  // 임시 오버레이로 wheel 이벤트를 Lenis에 재전달
  useEffect(() => {
    if (!isActive) return;

    const root = rootRef.current;
    if (!root) return;

    let tempOverlay: HTMLDivElement | null = null;
    let watchRafId = 0;

    function createTempOverlay() {
      if (tempOverlay) return;

      tempOverlay = document.createElement("div");
      tempOverlay.style.cssText = "position:absolute;inset:0;z-index:10;";

      // wheel 이벤트를 차단하고 Lenis로 재전달
      tempOverlay.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          window.dispatchEvent(
            new WheelEvent("wheel", {
              deltaX: e.deltaX,
              deltaY: e.deltaY,
              deltaMode: e.deltaMode,
              bubbles: false,
              cancelable: true,
            }),
          );
        },
        { passive: false },
      );

      root.appendChild(tempOverlay);
    }

    function removeTempOverlay() {
      cancelAnimationFrame(watchRafId);
      if (tempOverlay) {
        tempOverlay.remove();
        tempOverlay = null;
      }
    }

    // velocity가 0이 되면 오버레이 제거
    function watchVelocity() {
      const lenis = getLenis();
      if (!lenis || Math.abs(lenis.velocity) < 0.05) {
        removeTempOverlay();
        return;
      }
      watchRafId = requestAnimationFrame(watchVelocity);
    }

    function handleMouseEnter() {
      const lenis = getLenis();
      if (!lenis || Math.abs(lenis.velocity) < 0.05) return;

      createTempOverlay();
      watchRafId = requestAnimationFrame(watchVelocity);
    }

    function handleMouseLeave() {
      removeTempOverlay();
    }

    root.addEventListener("mouseenter", handleMouseEnter);
    root.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      root.removeEventListener("mouseenter", handleMouseEnter);
      root.removeEventListener("mouseleave", handleMouseLeave);
      removeTempOverlay();
    };
  }, [isActive]);

  return (
    <div ref={rootRef} className="relative h-full w-full" onClick={() => setIsActive(true)}>
      <iframe
        src={src}
        title={title}
        className={className}
        style={!isActive ? { pointerEvents: "none" } : undefined}
        allow={allow}
        allowFullScreen={allowFullScreen}
        loading={loading}
        referrerPolicy={referrerPolicy}
      />
      {!isActive && (
        <div
          ref={overlayRef}
          className="absolute inset-0 cursor-pointer"
          style={{ zIndex: 10 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
