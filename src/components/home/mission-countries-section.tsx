"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { missionCountries } from "@/lib/site-data";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const mixChannel = (from: number, to: number, amount: number) => from + (to - from) * amount;
const mixColor = (amount: number) => {
  const eased = smoothstep(amount);
  const r = Math.round(mixChannel(179, 253, eased));
  const g = Math.round(mixChannel(160, 248, eased));
  const b = Math.round(mixChannel(205, 255, eased));

  return `rgb(${r}, ${g}, ${b})`;
};

const MOBILE_OUTRO_START_VIEWPORT_RATIO = 0.72;
const MOBILE_OUTRO_COMPLETE_VIEWPORT_RATIO = 0.42;
const MOBILE_OUTRO_MIN_BAND = 260;

function MissionCountriesHeading({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-16 text-center ${className}`}>
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="type-label-xl font-cormorant-infant text-[#FDF4FF]">
            mission countries
          </p>
          <div className="h-px w-[60px] bg-[#FDF4FF]" />
        </div>
        <div className="uppercase min-[1300px]:hidden">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <p className="type-heading-lg w-fit max-w-none text-white min-[481px]:w-max min-[481px]:whitespace-nowrap">
                선교는 지금도
                <br className="min-[481px]:hidden" />
                <span className="hidden min-[481px]:inline"> </span>
                계속되고 있습니다
              </p>
              <p className="type-heading-lg text-white">이 사명에 함께하세요</p>
            </div>
            <p className="type-subtitle-sm md:type-subtitle-md lg:type-subtitle-lg text-[#E2CAF5]">Be Part of the Mission</p>
          </div>
        </div>
      </div>
      <div className="type-body-md lg:type-body-lg text-[#FDF8FF]">
        <p>필리핀부터 미얀마, 태국과 말레이시아까지,</p>
        <p>
          우리는 다양한 땅에서 복음을 전하며
          <br className="min-[501px]:hidden" />
          <span className="hidden min-[501px]:inline"> </span>
          선교의 사명을 이어가고 있습니다.
        </p>
      </div>
    </div>
  );
}

function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const update = () => {
      setViewportWidth(window.innerWidth);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return viewportWidth;
}

function MissionCountriesMobile() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countriesOpacity, setCountriesOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const nextSection = document.getElementById("join");

      if (!section || !nextSection) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const distanceToNext = nextSection.getBoundingClientRect().top;
      const transitionStartPoint = viewportHeight * MOBILE_OUTRO_START_VIEWPORT_RATIO;
      const transitionEndPoint = viewportHeight * MOBILE_OUTRO_COMPLETE_VIEWPORT_RATIO;
      const transitionBand = Math.max(
        transitionStartPoint - transitionEndPoint,
        MOBILE_OUTRO_MIN_BAND,
      );
      const progress = smoothstep(
        clamp((transitionStartPoint - distanceToNext) / transitionBand, 0, 1),
      );

      setCountriesOpacity(1 - progress);
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
    <div
      ref={sectionRef}
      className="flex flex-col items-center gap-24 px-5 py-24 md:px-10 md:py-28 min-[1300px]:hidden"
    >
      <MissionCountriesHeading className="w-full max-w-[582px]" />

      <div
        className="grid w-full grid-cols-2 justify-items-center gap-x-4 gap-y-[60px] transition-opacity duration-300 ease-out min-[641px]:grid-cols-3 md:gap-x-12 md:gap-y-[100px]"
        style={{ opacity: countriesOpacity }}
      >
        {missionCountries.map((country) => (
          <p
            key={country}
            className="font-hahmlet text-[20px] min-[441px]:text-[24px] min-[801px]:text-[28px] min-[901px]:text-[32px] min-[1001px]:text-[36px] min-[1101px]:text-[40px] font-semibold uppercase leading-[1.5] tracking-[0.01em] text-[#fdf8ff] text-center whitespace-nowrap"
          >
            {country}
          </p>
        ))}
      </div>
    </div>
  );
}

function MissionCountriesDesktop() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const viewportWidth = useViewportWidth();
  const [hydrated, setHydrated] = useState(false);
  const introEnd = 0.12;
  const arcStart = introEnd;
  const outroStart = 0.88;
  const outroDuration = 1 - outroStart;
  const arcDuration = outroStart - arcStart;
  const releaseStart = outroStart - 0.04;
  const releaseDuration = 0.04;

  useEffect(() => {
    setHydrated(true);
  }, []);

  const safeProgress = hydrated ? progress : 0;
  const introProgress = clamp(safeProgress / introEnd, 0, 1);
  const arcProgress = clamp((safeProgress - arcStart) / arcDuration, 0, 1);
  const releaseProgress = clamp((safeProgress - releaseStart) / releaseDuration, 0, 1);
  const outroProgress = clamp((safeProgress - outroStart) / outroDuration, 0, 1);
  const outroOpacityProgress = smoothstep(outroProgress);
  const headingTranslate = (1 - introProgress) * 120 - releaseProgress * 24 - outroProgress * 160;
  const groupOpacity = 1 - outroOpacityProgress * 0.2;
  const arcFontSize =
    viewportWidth <= 1400 ? "3.5rem" : viewportWidth <= 1500 ? "4rem" : "4.5rem";
  const arcOffset = viewportWidth <= 1400 ? 300 : viewportWidth <= 1500 ? 320 : 340;
  const arcAngleStep = viewportWidth <= 1400 ? 9 : viewportWidth <= 1500 ? 10 : 11;
  const arcRadius = viewportWidth <= 1400 ? 50 : viewportWidth <= 1500 ? 54 : 58;

  return (
    <section ref={ref} data-bg-key="mission-dark" className="relative hidden h-[320svh] min-[1300px]:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="relative mx-auto h-full w-full py-24"
          style={
            {
              "--countries-label-left": "clamp(32px, 5vw, 80px)",
              "--countries-arc-left": `calc(var(--countries-label-left) + ${arcOffset}px)`,
              "--countries-copy-right": "clamp(32px, 5vw, 80px)",
            } as CSSProperties
          }
        >
          <div
            className="absolute left-[var(--countries-label-left)] top-1/2 z-10"
            style={hydrated ? { transform: `translateY(calc(-50% + ${headingTranslate}px))` } : undefined}
          >
            <div>
              <p className="type-label-xl font-cormorant-infant text-[#FDF4FF]">
                mission countries
              </p>
              <div className="mt-3 h-px w-16 bg-[#FDF4FF]" />
            </div>
          </div>

          <div
            className="absolute right-[var(--countries-copy-right)] top-1/2 z-10"
            style={hydrated ? { transform: `translateY(calc(-50% + ${headingTranslate}px))` } : undefined}
          >
            <p className="max-w-[360px] text-right type-body-md lg:type-body-lg text-[#FDF8FF]">
              필리핀부터 미얀마, 태국과 말레이시아까지, 우리는 다양한 땅에서 복음을 전하며
              선교의 사명을 이어가고 있습니다.
            </p>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="relative h-[760px] w-full">
              {missionCountries.map((country, index) => {
                const state = getArcItemState(
                  index,
                  arcProgress,
                  missionCountries.length,
                  arcAngleStep,
                  arcRadius,
                );
                const focus = smoothstep(clamp(1 - Math.abs(state.relIndex), 0, 1));
                const itemOpacity = groupOpacity * state.opacity;

                return (
                  <div
                    key={country}
                    className="absolute left-[var(--countries-arc-left)] top-1/2 whitespace-nowrap"
                    style={
                      hydrated
                        ? {
                          transform: `translate(calc(-1 * ${state.x}rem), calc(-50% + ${state.y}rem + ${headingTranslate}px - 8px)) rotate(${state.degrees}deg)`,
                          transformOrigin: "left center",
                          opacity: itemOpacity,
                          filter: `blur(${state.blur}px)`,
                        }
                        : undefined
                    }
                  >
                    <p
                      className="font-hahmlet text-[2rem] font-bold uppercase leading-none tracking-[0.02em]"
                      style={
                        hydrated
                          ? {
                            color: mixColor(focus),
                            fontSize: arcFontSize,
                          }
                          : { fontSize: arcFontSize }
                      }
                    >
                      {country}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    let frame = 0;
    let lastProgress = -1;

    if (!element) {
      return;
    }

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const travel = rect.height - viewport;
      const next = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;

      if (Math.abs(next - lastProgress) > 0.0005) {
        lastProgress = next;
        setProgress(next);
      }
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

  return { ref, progress };
}

function getArcItemState(
  index: number,
  progress: number,
  total: number,
  angleStep: number,
  radius: number,
) {
  const relIndex = index - progress * (total - 1);
  const theta = relIndex * angleStep * (Math.PI / 180);
  const x = radius * (1 - Math.cos(theta));
  const y = radius * Math.sin(theta);
  const degrees = relIndex * angleStep;

  let opacity = 0.1;
  let blur = 0;

  if (degrees < -60) {
    opacity = 0.6;
    blur = 8;
  } else if (degrees < -45) {
    const t = smoothstep(clamp((Math.abs(degrees) - 45) / 15, 0, 1));
    opacity = 0.8 - t * 0.2;
    blur = 6 + t * 2;
  } else if (degrees < -30) {
    const t = smoothstep(clamp((Math.abs(degrees) - 30) / 15, 0, 1));
    opacity = 1 - t * 0.2;
    blur = 4 + t * 2;
  } else if (degrees < -15) {
    const t = smoothstep(clamp((Math.abs(degrees) - 15) / 15, 0, 1));
    opacity = 1;
    blur = t * 4;
  } else if (degrees <= 0) {
    opacity = 1;
  } else if (degrees <= 15) {
    const t = smoothstep(clamp(1 - degrees / 15, 0, 1));
    opacity = 0.1 + t * 0.9;
  } else {
    opacity = 0.1;
    blur = 0;
  }

  return { x, y, degrees, opacity, blur, relIndex };
}

export default function MissionCountriesSection() {
  return (
    <>
      <section data-bg-key="mission-dark" className="relative min-[1300px]:hidden">
        <MissionCountriesMobile />
      </section>
      <MissionCountriesDesktop />
    </>
  );
}
