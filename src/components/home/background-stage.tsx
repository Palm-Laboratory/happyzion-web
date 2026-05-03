"use client";

import { useEffect, useRef } from "react";

const CREAM_COLOR = "#fffcf8";
const MISSION_DARK_STOPS = ["#12091f", "#1b1032", "#170d29", "#0d0716"] as const;

const BACKGROUND_STYLES: Record<string, string> = {
  verse: "linear-gradient(180deg,#d3c0dc 0%,#fffcf8 100%)",
  cream: CREAM_COLOR,
  "mission-dark": "linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%)",
};
const MISSION_DARK_DECORATION =
  "radial-gradient(circle at 18% 10%, rgba(116,84,173,0.3) 0%, rgba(116,84,173,0.14) 18%, rgba(116,84,173,0) 42%), radial-gradient(circle at 92% 84%, rgba(46,103,150,0.16) 0%, rgba(46,103,150,0.07) 16%, rgba(46,103,150,0) 38%)";

const BACKGROUND_KEYS = Object.keys(BACKGROUND_STYLES);
const SECTION_SELECTOR = "[data-bg-key]";
const TRANSITION_START_VIEWPORT_RATIO = 1;
const CREAM_TO_MISSION_COMPLETE_VIEWPORT_RATIO = 0.38;
const MISSION_TO_CREAM_COMPLETE_VIEWPORT_RATIO = 0.5;
const TRANSITION_MIN_BAND = 360;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};
const mixChannel = (from: number, to: number, amount: number) => Math.round(from + (to - from) * amount);
const mixHex = (from: string, to: string, amount: number) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);

  return `rgb(${mixChannel(start.r, end.r, amount)}, ${mixChannel(start.g, end.g, amount)}, ${mixChannel(start.b, end.b, amount)})`;
};
const getMissionDarkGradient = (amount: number) => {
  const eased = smoothstep(clamp(amount, 0, 1));
  const [stop1, stop2, stop3, stop4] = MISSION_DARK_STOPS.map((color) => mixHex(CREAM_COLOR, color, eased));

  return `linear-gradient(180deg, ${stop1} 0%, ${stop2} 34%, ${stop3} 68%, ${stop4} 100%)`;
};

type SectionMeta = {
  key: string;
  top: number;
};

type BackgroundGroup = {
  key: string;
  top: number;
};

export default function BackgroundStage() {
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const missionDecorationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let cachedSections: SectionMeta[] = [];
    let cachedGroups: BackgroundGroup[] = [];
    let lastSnapshot = "";

    const readSections = () => {
      cachedSections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)).map((element) => ({
        key: element.dataset.bgKey || "cream",
        top: element.getBoundingClientRect().top + window.scrollY,
      }));

      cachedGroups = cachedSections.reduce<BackgroundGroup[]>((groups, section) => {
        const lastGroup = groups[groups.length - 1];

        if (!lastGroup || lastGroup.key !== section.key) {
          groups.push({ key: section.key, top: section.top });
        }

        return groups;
      }, []);
    };

    const applyLayerStyles = (
      opacities: Record<string, number>,
      options?: {
        missionGradientProgress?: number;
        missionDecorationProgress?: number;
      },
    ) => {
      const snapshot = BACKGROUND_KEYS.map((key) => `${key}:${opacities[key].toFixed(4)}`).join("|");
      if (snapshot === lastSnapshot) {
        if (options?.missionGradientProgress === undefined && options?.missionDecorationProgress === undefined) {
          return;
        }
      }

      lastSnapshot = snapshot;

      BACKGROUND_KEYS.forEach((key) => {
        const layer = layerRefs.current[key];
        if (!layer) {
          return;
        }

        layer.style.opacity = String(opacities[key] ?? 0);
        layer.style.visibility = (opacities[key] ?? 0) > 0.001 ? "visible" : "hidden";

        if (key === "mission-dark") {
          layer.style.background =
            typeof options?.missionGradientProgress === "number"
              ? getMissionDarkGradient(options.missionGradientProgress)
              : BACKGROUND_STYLES["mission-dark"];
        }
      });

      if (missionDecorationRef.current) {
        const decorationProgress =
          typeof options?.missionDecorationProgress === "number"
            ? options.missionDecorationProgress
            : smoothstep(clamp(((opacities["mission-dark"] ?? 0) - 0.42) / 0.58, 0, 1));

        missionDecorationRef.current.style.opacity = String(decorationProgress);
        missionDecorationRef.current.style.visibility = decorationProgress > 0.001 ? "visible" : "hidden";
      }
    };

    const update = () => {
      frame = 0;

      if (cachedGroups.length === 0) {
        return;
      }

      const anchor = window.scrollY;
      let currentIndex = 0;

      for (let index = 0; index < cachedGroups.length - 1; index += 1) {
        if (anchor >= cachedGroups[index].top) {
          currentIndex = index;
        }
      }

      const nextIndex = Math.min(currentIndex + 1, cachedGroups.length - 1);
      const current = cachedGroups[currentIndex];
      const next = cachedGroups[nextIndex];
      const range = Math.max(next.top - current.top, 1);
      const rawProgress = currentIndex === nextIndex ? 0 : clamp((anchor - current.top) / range, 0, 1);
      const distanceToNext = next.top - anchor;
      const viewportHeight = window.innerHeight;
      const transitionStartPoint = viewportHeight * TRANSITION_START_VIEWPORT_RATIO;
      const creamToMissionCompletePoint = viewportHeight * CREAM_TO_MISSION_COMPLETE_VIEWPORT_RATIO;
      const missionToCreamCompletePoint = viewportHeight * MISSION_TO_CREAM_COMPLETE_VIEWPORT_RATIO;
      const creamToMissionBand = Math.max(transitionStartPoint - creamToMissionCompletePoint, TRANSITION_MIN_BAND);
      const missionToCreamBand = Math.max(transitionStartPoint - missionToCreamCompletePoint, TRANSITION_MIN_BAND);

      let progress = rawProgress;

      if (
        current.key === "cream" && next.key === "mission-dark"
      ) {
        progress = smoothstep(
          clamp(
            (transitionStartPoint - distanceToNext) / creamToMissionBand,
            0,
            1,
          ),
        );
      } else if (current.key === "mission-dark" && next.key === "cream") {
        progress = smoothstep(
          clamp(
            (transitionStartPoint - distanceToNext) / missionToCreamBand,
            0,
            1,
          ),
        );
      }

      const opacities = Object.fromEntries(BACKGROUND_KEYS.map((key) => [key, 0])) as Record<string, number>;

      if (current.key === next.key) {
        opacities[current.key] = 1;
      } else if (current.key === "cream" && next.key === "mission-dark") {
        opacities["mission-dark"] = 1;
        applyLayerStyles(opacities, {
          missionGradientProgress: progress,
          missionDecorationProgress: smoothstep(clamp((progress - 0.58) / 0.42, 0, 1)),
        });
        return;
      } else if (current.key === "mission-dark" && next.key === "cream") {
        opacities["mission-dark"] = 1;
        applyLayerStyles(opacities, {
          missionGradientProgress: 1 - progress,
          missionDecorationProgress: smoothstep(clamp(((1 - progress) - 0.58) / 0.42, 0, 1)),
        });
        return;
      } else {
        opacities[current.key] = 1 - progress;
        opacities[next.key] = progress;
      }

      applyLayerStyles(opacities);
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    const handleResize = () => {
      readSections();
      requestUpdate();
    };

    readSections();
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none sticky top-0 h-screen overflow-hidden">
      <div className="grid h-full w-full">
        {BACKGROUND_KEYS.map((key, index) => (
          <div
            key={key}
            ref={(node) => {
              layerRefs.current[key] = node;
            }}
            className="[grid-area:1/1] opacity-0 will-change-[opacity]"
            style={{
              background: BACKGROUND_STYLES[key],
              visibility: index === 0 ? "visible" : "hidden",
            }}
          />
        ))}
        <div
          ref={missionDecorationRef}
          className="[grid-area:1/1] opacity-0 will-change-[opacity]"
          style={{
            background: MISSION_DARK_DECORATION,
            visibility: "hidden",
          }}
        />
      </div>
    </div>
  );
}
