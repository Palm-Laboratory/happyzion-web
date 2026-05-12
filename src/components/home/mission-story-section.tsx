"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { missionStories } from "@/lib/site-data";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
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

function MissionStoryHeading() {
  return (
    <div className="flex w-full max-w-[900px] flex-col items-center text-center uppercase">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="type-label font-cormorant-infant text-[#f0e8ff]">OUR MISSION</p>
          <div className="h-px w-16 bg-[rgba(240,232,255,0.55)]" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="type-section-title text-[#f0e8ff]">
            우리는 복음으로
            <br />
            사람을 살리는 교회입니다.
          </h2>
          <p className="type-section-subtitle text-[#bfaed9]">LIFE THROUGH THE GOSPEL</p>
        </div>
      </div>
    </div>
  );
}

function MissionStorySectionMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [isTrackResetting, setIsTrackResetting] = useState(false);
  const activeStory = missionStories[activeIndex];
  const mobileSlides = [
    missionStories[missionStories.length - 1],
    ...missionStories,
    missionStories[0],
  ];

  const navigate = (direction: 1 | -1) => {
    if (isSliding) {
      return;
    }

    const nextIndex = (activeIndex + direction + missionStories.length) % missionStories.length;
    setActiveIndex(nextIndex);
    setIsSliding(true);
    setTrackIndex((currentIndex) => currentIndex + direction);
  };

  const handleTrackTransitionEnd = () => {
    if (trackIndex === 0) {
      setIsTrackResetting(true);
      setTrackIndex(missionStories.length);
      window.requestAnimationFrame(() => {
        setIsTrackResetting(false);
      });
    } else if (trackIndex === missionStories.length + 1) {
      setIsTrackResetting(true);
      setTrackIndex(1);
      window.requestAnimationFrame(() => {
        setIsTrackResetting(false);
      });
    }

    setIsSliding(false);
  };

  return (
    <div className="relative flex min-h-0 flex-col items-center px-5 md:px-10 min-[1300px]:hidden">
      <MissionStoryHeading />

      <div className="mt-20 flex h-fit w-full max-w-[760px] flex-col items-center">
        <div className="flex items-center gap-4 uppercase">
          <p className="type-display-counter text-[#fffaf0]">
            {String(activeIndex + 1)}
          </p>
          <div className="h-px w-9 bg-[rgba(255,250,240,0.65)]" />
          <p
            className="type-label-accent text-[#fffaf0]"
            style={{
              fontFamily: "var(--font-cormorant-infant)",
              fontStyle: "italic",
              letterSpacing: "0.025em",
            }}
          >
            {activeStory.country.toUpperCase()}
          </p>
        </div>

        <div className="mt-5 h-fit w-[min(60vw,22rem)] md:w-[min(60vw,30rem)]">
          <div className="h-fit">
            <div className="relative aspect-square overflow-hidden bg-[#ece4e6]">
              <div
                className="flex h-full w-full"
                style={{
                  transform: `translateX(-${trackIndex * 100}%)`,
                  transition: isTrackResetting ? "none" : "transform 460ms ease-out",
                }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {mobileSlides.map((story, index) => (
                  <div
                    key={`mobile-story-image-${story.id}-${index}`}
                    className="relative h-full w-full flex-none"
                  >
                    <Image
                      src={story.image}
                      alt={story.country}
                      fill
                      sizes="(max-width: 767px) 60vw, (max-width: 1023px) 60vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 w-full text-left">
              <p className="type-body text-[#f0e8ff] lg:text-xl lg:leading-8">{activeStory.message}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex w-full items-center justify-between">
          <button
            type="button"
            aria-label="Previous mission story"
            onClick={() => {
              navigate(-1);
            }}
            className="flex h-[60px] w-[60px] items-center justify-center border border-white/80 text-[#fdf4ff] transition hover:bg-white/5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex h-4 items-center gap-3">
            {missionStories.map((story, index) => {
              const active = index === activeIndex;

              return (
                <div
                  key={story.id}
                  className="h-2 w-2 rounded-full bg-white transition-opacity duration-300 ease-out"
                  style={{
                    opacity: active ? 1 : 0.35,
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next mission story"
            onClick={() => {
              navigate(1);
            }}
            className="flex h-[60px] w-[60px] items-center justify-center border border-white/80 text-[#fdf4ff] transition hover:bg-white/5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function MissionStorySectionDesktop() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const viewportWidth = useViewportWidth();
  const desktopStoryMessages = [
    "다양한 문화 속에서 복음이 경계를 넘어 사람들을 하나로 묶는 힘을 배웠습니다.",
    "낯선 환경 속에서도 성령께서 길을 여시고, 작은 순종이 큰 열매로 이어짐을 보았습니다.",
    "어려운 현실 속에서도 복음이 소망이 되어 사람들의 삶을 다시 일으키는 현장을 만났습니다.",
  ];
  const headingExit = clamp(progress / 0.24, 0, 1);
  const slideReveal = clamp((progress - 0.14) / 0.12, 0, 1);
  const trackRise = clamp((progress - 0.14) / 0.26, 0, 1);
  const diagonalProgress = clamp((progress - 0.4) / 0.6, 0, 1);
  const slideSize = Math.min(viewportWidth * 0.3, 620);
  const largeCounterSize = slideSize * (240 / 620);
  const slideGap = clamp(viewportWidth * 0.04, 48, 104);
  const slideSpacing = slideSize + slideGap;
  const diagonalStart = 0;
  const diagonalEnd = -(missionStories.length - 1) * slideSpacing;
  const trackOffset = diagonalStart + (diagonalEnd - diagonalStart) * diagonalProgress;
  const activeFloat = -trackOffset / slideSpacing;
  const focusedIndex = clamp(Math.floor(activeFloat + 0.5), 0, missionStories.length - 1);
  const entryTranslateX = (1 - trackRise) * 20;
  const entryTranslateY = (1 - trackRise) * 70;
  const dialIndex = diagonalProgress === 0 ? 0 : focusedIndex;
  const numberRowHeight = 64;
  const countryRowHeight = 40;

  return (
    <div ref={ref} className="relative hidden h-[320svh] min-[1300px]:block">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute left-1/2 top-[22%] w-full -translate-x-1/2"
          style={{
            opacity: 1 - headingExit,
            transform: `translate(-50%, -${headingExit * 24}vh)`,
          }}
        >
          <div className="mx-auto flex justify-center px-20">
            <MissionStoryHeading />
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: slideReveal,
          }}
        >
          <div
            className="absolute bottom-[4vh] left-[10vw] z-40 text-[#fffaf0]"
            style={{
              opacity: slideReveal,
            }}
          >
            <div
              className="flex items-start leading-none text-[#fffaf0]"
              style={{
                fontFamily: '"SUIT", var(--font-sans), sans-serif',
                fontSize: `${largeCounterSize}px`,
                fontWeight: 900,
              }}
            >
              <span>0</span>
              <div className="relative overflow-hidden" style={{ height: `${largeCounterSize}px` }}>
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(-${focusedIndex * largeCounterSize}px)`,
                  }}
                >
                  {missionStories.map((story, index) => (
                    <div
                      key={`${story.id}-large-counter`}
                      className="flex items-start"
                      style={{ height: `${largeCounterSize}px` }}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute right-[6vw] top-[24vh] z-40 w-[300px] text-left text-[#fffaf0]"
            style={{
              width: viewportWidth >= 2000 ? "400px" : "300px",
              opacity: slideReveal,
            }}
          >
            <div className="relative min-h-[8rem]">
              {desktopStoryMessages.map((message, index) => {
                const visible = diagonalProgress === 0 ? index === 0 : index === focusedIndex;

                return (
                  <p
                    key={`desktop-story-message-${index + 1}`}
                    className="type-body absolute inset-0 transition-opacity duration-500 ease-out lg:text-xl"
                    style={{
                      lineHeight: "36px",
                      opacity: visible ? 1 : 0,
                    }}
                  >
                    {message}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="relative h-full w-full">
            <div
              className="absolute left-20 top-1/2 z-40 flex -translate-y-1/2 items-center gap-5 text-[#fffaf0]"
              style={{
                opacity: slideReveal,
              }}
            >
              <div className="relative h-16 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(-${dialIndex * numberRowHeight}px)`,
                  }}
                >
                  {missionStories.map((story, index) => (
                    <div
                      key={`${story.id}-dial-number`}
                      className="type-display-counter flex h-16 items-center text-[#fffaf0]"
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px w-12 bg-[rgba(255,250,240,0.65)]" />

              <div className="relative h-10 overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(-${dialIndex * countryRowHeight}px)`,
                  }}
                >
                  {missionStories.map((story) => (
                    <div
                      key={`${story.id}-dial-country`}
                      className="type-label-accent flex h-10 items-center text-[#fffaf0]"
                      style={{
                        fontFamily: "var(--font-cormorant-infant)",
                        fontStyle: "italic",
                        letterSpacing: "0.025em",
                      }}
                    >
                      {story.country.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {missionStories.map((story, index) => {
              const baseScalar = index * slideSpacing;
              const scalar = baseScalar + trackOffset;
              const distance = Math.abs(scalar) / slideSpacing;
              const translateX = scalar;
              const translateY = scalar;
              const scale = clamp(1 - distance * 0.08, 0.84, 1);
              const zIndex = 30 - Math.round(distance * 10);
              const opacity =
                diagonalProgress === 0
                  ? index === 0
                    ? 0.2 + trackRise * 0.8
                    : 0.2
                  : index === focusedIndex
                    ? 1
                    : 0.2;

              return (
                <div
                  key={story.id}
                  className="absolute left-1/2 top-1/2 aspect-[21/23] w-[30vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#ece4e6] transition-[transform,opacity] duration-500 ease-out"
                  style={{
                    transform: `translate(calc(-50% + ${translateX}px + ${entryTranslateX}vw), calc(-50% + ${translateY}px + ${entryTranslateY}vh)) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <Image
                    src={story.image}
                    alt={story.country}
                    fill
                    sizes="(min-width: 2067px) 620px, (min-width: 1024px) 30vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissionStorySection() {
  return (
    <section
      id="mission"
      data-bg-key="mission-dark"
      className="relative py-24 md:py-28 min-[1300px]:py-0"
    >
      <MissionStorySectionMobile />
      <MissionStorySectionDesktop />
    </section>
  );
}
