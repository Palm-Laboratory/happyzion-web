"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { missionStories } from "@/lib/site-data";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const getClosestIndex = (value: number, total: number) =>
  Math.min(total - 1, Math.max(0, Math.round(value)));

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

function getTeamCardState(index: number, progress: number, total: number) {
  const relPos = index + 1 - progress * total;
  const stepX = 26;
  const stepY = 58;
  const x = relPos * stepX;
  const y = relPos * stepY;
  const distance = Math.abs(relPos);
  const isActive = distance < 0.5;
  const crossfade = clamp(1 - distance, 0, 1);
  const easedCrossfade = smoothstep(crossfade);
  const opacity = 0.2 + easedCrossfade * 0.8;
  const scale = clamp(1 - distance * 0.08, 0.82, 1);
  const zIndex = 40 - Math.round(distance * 10);

  return { relPos, x, y, opacity, scale, zIndex, isActive, distance };
}

export default function MissionStorySection() {
  const { ref, progress } = useSectionProgress<HTMLElement>();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const safeProgress = hydrated ? progress : 0;
  const introProgress = clamp(safeProgress / 0.14, 0, 1);
  const introExitProgress = clamp((safeProgress - 0.16) / 0.28, 0, 1);
  const introOpacity = 1;
  const introEnterOffset = (1 - introProgress) * 30;
  const introExitOffset = introExitProgress * 56;
  const teamPhaseProgress = clamp((safeProgress - 0.46) / 0.48, 0, 1);
  const teamReveal = smoothstep(clamp((safeProgress - 0.44) / 0.10, 0, 1));
  const teamEnterOffset = (1 - teamReveal) * 18;
  const activationFloat = teamPhaseProgress * missionStories.length - 1;
  const displayIndex = getClosestIndex(activationFloat, missionStories.length);
  const counterIndex = displayIndex;
  const storyStripOffset = displayIndex * 2.45;
  const bottomCounterOffset = counterIndex * 102;
  const mobileCounterOffset = counterIndex * 68;

  return (
    <section ref={ref} id="mission" className="relative h-[300svh] bg-[#fffcf8]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto h-full w-full">
          <div
            className="absolute left-1/2 top-[42%] z-30 flex w-full max-w-[900px] -translate-x-1/2 flex-col items-center px-5 text-center uppercase md:px-10"
            style={{
              opacity: introOpacity,
              transform: `translate(-50%, calc(-50% + ${introEnterOffset}vh - ${introExitOffset}vh))`,
            }}
          >
            <p className="font-hahmlet text-sm font-extralight tracking-[0.28em] text-[#3d1a46] md:text-base">
              OUR MISSION
            </p>
            <div className="mt-3 h-px w-16 bg-[#3d1a46]" />
            <p className="mt-5 font-hahmlet text-lg text-[#928397] md:text-2xl">LIFE THROUGH THE GOSPEL</p>
            <h2 className="mt-5 font-hahmlet text-[2.25rem] font-semibold leading-[1.28] tracking-[-0.03em] text-[#250030] md:text-[3.75rem] md:leading-[1.38]">
              우리는 복음으로
              <br />
              사람을 살리는 교회입니다
            </h2>
          </div>

          <div className="absolute inset-0 z-10" style={{ opacity: teamReveal }}>
            <div className="absolute inset-0 grid place-items-center">
              {missionStories.map((story, index) => {
                const state = getTeamCardState(index, teamPhaseProgress, missionStories.length);

                return (
                  <div
                    key={story.country}
                    className="absolute"
                    style={{
                      transform: `translate(${state.x}vw, ${state.y}vh) scale(${state.scale})`,
                      opacity: state.opacity,
                      zIndex: state.zIndex,
                    }}
                  >
                    <div className="relative h-[308px] w-[224px] overflow-hidden bg-[#ece4e6] shadow-[0_16px_28px_rgba(0,0,0,0.08)] md:h-[420px] md:w-[308px] lg:h-[601px] lg:w-[671px]">
                      <div
                        className="absolute inset-0 will-change-transform"
                        style={{
                          transform: `translate(${state.relPos * -1.5}px, ${state.relPos * -1.5}px) scale(1.08)`,
                        }}
                      >
                        <Image
                          src={story.image}
                          alt={story.country}
                          fill
                          sizes="(max-width: 768px) 160px, (max-width: 1200px) 220px, 479px"
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                      <div className="absolute inset-0 bg-[rgba(16,8,18,0.16)]" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute left-0 right-0 top-[12vh] mx-auto hidden w-full justify-end px-5 md:px-10 lg:flex lg:px-[80px]">
              <div className="mr-[260px] w-full max-w-[400px]">
                <div className="grid">
                  {missionStories.map((story, index) => (
                    <p
                      key={story.country}
                      className="col-start-1 row-start-1 font-suit text-xl leading-8 tracking-[0.01em] text-[#250030]"
                      style={{
                        opacity: index === displayIndex ? 1 : 0,
                        visibility: index === displayIndex ? "visible" : "hidden",
                      }}
                    >
                      {story.message}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 lg:block lg:left-12">
              <div className="flex items-start">
                <div className="h-[300px] w-[40px] overflow-hidden">
                  <div
                    className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate3d(0, calc(6.625rem - ${storyStripOffset}rem), 0)` }}
                  >
                    {missionStories.map((story, index) => (
                      <p
                        key={story.country}
                        className="font-corinthia text-[2.375rem] leading-[40px] text-[#250030]"
                        style={{
                          opacity: index === displayIndex ? 1 : 0.1,
                        }}
                      >
                        {index + 1}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-[110px]">
                  <div className="h-px w-9 bg-[#3d1a46]" />
                  <div className="grid">
                    {missionStories.map((story, index) => (
                      <p
                        key={story.country}
                        className="col-start-1 row-start-1 text-2xl italic leading-8 tracking-[0.08em] text-[#250030]"
                        style={{
                          fontFamily: "var(--font-cormorant-garamond)",
                          opacity: index === displayIndex ? 1 : 0,
                          visibility: index === displayIndex ? "visible" : "hidden",
                        }}
                      >
                        {story.country.toUpperCase()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-[8vh] left-[calc(1.25rem+250px)] hidden lg:block lg:left-[calc(3rem+250px)]"
              style={{ transform: `translateY(${teamEnterOffset}vh)` }}
            >
              <div className="flex items-start">
                <p
                  className="font-suit text-[280px] leading-[280px] text-[#250030]"
                  style={{ fontWeight: 900 }}
                >
                  0
                </p>
                <div className="h-[280px] w-[180px] overflow-hidden">
                  <div
                    className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate3d(0, -${(bottomCounterOffset / 102) * 280}px, 0)` }}
                  >
                    {["1", "2", "3"].map((item) => (
                      <p
                        key={item}
                        className="flex h-[280px] items-center font-suit text-[280px] leading-[280px] text-[#250030]"
                        style={{ fontWeight: 900 }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[14vh] left-0 right-0 mx-auto flex w-full items-end justify-between gap-6 px-5 md:px-10 lg:px-[80px]">
              <div className="hidden lg:flex" />
              <div
                className="ml-auto w-full max-w-[320px] lg:hidden"
                style={{ transform: `translateY(${teamEnterOffset}vh)` }}
              >
                <div className="flex items-start">
                  <p
                    className="font-suit text-[56px] leading-[68px] tracking-[0.03em] text-[#250030]"
                    style={{ fontWeight: 900 }}
                  >
                    0
                  </p>
                  <div className="h-[68px] w-[34px] overflow-hidden">
                    <div
                      className="transition-transform duration-300 ease-out"
                      style={{ transform: `translate3d(0, -${mobileCounterOffset}px, 0)` }}
                    >
                      {["1", "2", "3"].map((item) => (
                        <p
                          key={item}
                          className="flex h-[68px] items-center font-suit text-[56px] leading-[68px] tracking-[0.03em] text-[#250030]"
                          style={{ fontWeight: 900 }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
