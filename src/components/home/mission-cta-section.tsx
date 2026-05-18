"use client";

import { useEffect, useRef, useState } from "react";

const CTA_TRANSITION_START_VIEWPORT_RATIO = 0.72;
const CTA_TRANSITION_COMPLETE_VIEWPORT_RATIO = 0.42;
const CTA_TRANSITION_MIN_BAND = 260;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export default function MissionCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [exitProgress, setExitProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const nextSection = section?.nextElementSibling as HTMLElement | null;

      if (!section || !nextSection) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const distanceToNext = nextSection.getBoundingClientRect().top;
      const transitionStartPoint = viewportHeight * CTA_TRANSITION_START_VIEWPORT_RATIO;
      const transitionEndPoint = viewportHeight * CTA_TRANSITION_COMPLETE_VIEWPORT_RATIO;
      const transitionBand = Math.max(
        transitionStartPoint - transitionEndPoint,
        CTA_TRANSITION_MIN_BAND,
      );
      const progress = smoothstep(
        clamp((transitionStartPoint - distanceToNext) / transitionBand, 0, 1),
      );

      setExitProgress(progress);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-bg-key="mission-dark"
      className="relative hidden px-5 py-[180px] md:px-10 lg:px-20 min-[1300px]:block"
    >
      <div
        className="mx-auto w-full max-w-[1200px] text-center uppercase"
        style={{
          opacity: 1 - exitProgress,
          transform: `translateY(-${exitProgress * 64}px)`,
        }}
      >
        <div className="uppercase">
          <p className="type-heading-lg pt-8 text-white">
            선교는 지금도 계속되고 있습니다
          </p>
          <p className="type-heading-lg text-white">
            이 사명에 함께하세요
          </p>
          <p className="type-subtitle-sm md:type-subtitle-md lg:type-subtitle-lg pt-3 text-[#E2CAF5]">Be Part of the Mission</p>
        </div>
      </div>
    </section>
  );
}
