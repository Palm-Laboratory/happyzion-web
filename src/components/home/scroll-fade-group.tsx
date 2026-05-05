"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const TRANSITION_START_VIEWPORT_RATIO = 0.9;
const TRANSITION_COMPLETE_VIEWPORT_RATIO = 0.46;
const TRANSITION_MIN_BAND = 320;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export default function ScrollFadeGroup({
  children,
  nextSectionId,
  className,
  style,
}: {
  children: ReactNode;
  nextSectionId: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [fadeProgress, setFadeProgress] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const nextSection = document.getElementById(nextSectionId);

      if (!nextSection) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const distanceToNext = nextSection.getBoundingClientRect().top;
      const transitionStartPoint = viewportHeight * TRANSITION_START_VIEWPORT_RATIO;
      const transitionEndPoint = viewportHeight * TRANSITION_COMPLETE_VIEWPORT_RATIO;
      const transitionBand = Math.max(
        transitionStartPoint - transitionEndPoint,
        TRANSITION_MIN_BAND,
      );
      const progress = smoothstep(
        clamp((transitionStartPoint - distanceToNext) / transitionBand, 0, 1),
      );

      setFadeProgress(progress);
    };

    const requestUpdate = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [nextSectionId]);

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: 1 - fadeProgress,
        transform: `translateY(${-32 * fadeProgress}px)`,
        visibility: fadeProgress > 0.995 ? "hidden" : "visible",
      }}
    >
      {children}
    </div>
  );
}
