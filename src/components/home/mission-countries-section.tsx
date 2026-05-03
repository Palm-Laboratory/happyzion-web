"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { missionCountries } from "@/lib/site-data";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const mixChannel = (from: number, to: number, amount: number) => from + (to - from) * amount;
const mixColor = (amount: number) => {
  const eased = smoothstep(amount);
  const r = Math.round(mixChannel(179, 255, eased));
  const g = Math.round(mixChannel(160, 250, eased));
  const b = Math.round(mixChannel(205, 240, eased));

  return `rgb(${r}, ${g}, ${b})`;
};

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

function getArcItemState(index: number, progress: number, total: number) {
  const relIndex = index - progress * (total - 1);
  const theta = relIndex * 11 * (Math.PI / 180);
  const radius = 58;
  const x = radius * (1 - Math.cos(theta));
  const y = radius * Math.sin(theta);
  const degrees = relIndex * 11;

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
  const { ref, progress } = useSectionProgress<HTMLElement>();
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

  return (
    <section ref={ref} data-bg-key="mission-dark" className="relative h-[240svh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="relative mx-auto h-full w-full py-24"
          style={
            {
              "--countries-label-left": "clamp(32px, 5vw, 80px)",
              "--countries-arc-left": "clamp(300px, 27vw, 420px)",
              "--countries-copy-right": "clamp(32px, 5vw, 80px)",
            } as CSSProperties
          }
        >
          <div
            className="absolute left-[var(--countries-label-left)] top-1/2 z-10"
            style={hydrated ? { transform: `translateY(calc(-50% + ${headingTranslate}px))` } : undefined}
          >
            <div>
              <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#f0e8ff] md:text-base">
                mission countries
              </p>
              <div className="mt-3 h-px w-16 bg-[rgba(240,232,255,0.55)]" />
            </div>
          </div>

          <div
            className="absolute right-[var(--countries-copy-right)] top-1/2 z-10"
            style={hydrated ? { transform: `translateY(calc(-50% + ${headingTranslate}px))` } : undefined}
          >
            <p className="max-w-[360px] text-right font-suit text-base leading-8 tracking-[0.01em] text-[#f0e8ff] md:text-xl">
              필리핀부터 미얀마, 태국과 말레이시아까지, 우리는 다양한 땅에서 복음을 전하며
              선교의 사명을 이어가고 있습니다.
            </p>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="relative h-[760px] w-full">
              {missionCountries.map((country, index) => {
                const state = getArcItemState(index, arcProgress, missionCountries.length);
                const focus = smoothstep(clamp(1 - Math.abs(state.relIndex), 0, 1));
                const itemOpacity = groupOpacity * state.opacity;

                return (
                  <div
                    key={country}
                    className="absolute left-[var(--countries-arc-left)] top-1/2 whitespace-nowrap"
                    style={
                      hydrated
                        ? {
                            transform: `translate(calc(-1 * ${state.x}rem), calc(-50% + ${state.y}rem + ${headingTranslate}px)) rotate(${state.degrees}deg)`,
                            transformOrigin: "left center",
                            opacity: itemOpacity,
                            filter: `blur(${state.blur}px)`,
                          }
                        : undefined
                    }
                  >
                    <p
                      className="font-hahmlet text-[2rem] font-bold uppercase leading-none tracking-[0.02em] md:text-[4.5rem]"
                      style={hydrated ? { color: mixColor(focus) } : undefined}
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
