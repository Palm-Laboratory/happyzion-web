"use client";

import { useEffect, useRef } from "react";

const SECTION_SELECTOR = "[data-bg-key]";
const CREAM_COLOR = "#fffcf8";
const VISION_CREAM_COLOR = "#fcf8ff";
const MISSION_DARK_BACKGROUND =
  "linear-gradient(180deg, #12091f 0%, #1b1032 34%, #170d29 68%, #0d0716 100%)";
const MISSION_DARK_DECORATION =
  "radial-gradient(circle at 18% 10%, rgba(116,84,173,0.3) 0%, rgba(116,84,173,0.14) 18%, rgba(116,84,173,0) 42%), radial-gradient(circle at 92% 84%, rgba(46,103,150,0.16) 0%, rgba(46,103,150,0.07) 16%, rgba(46,103,150,0) 38%)";
const TRANSITION_START_VIEWPORT_RATIO = 1;
const TRANSITION_COMPLETE_VIEWPORT_RATIO = 0.56;
const TRANSITION_MIN_BAND = 320;

const LAYER_KEYS = ["verse-cloud", "vision-cream", "mission-dark", "join-cream"] as const;
type LayerKey = (typeof LAYER_KEYS)[number];

type SectionMeta = {
  key: LayerKey;
  top: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export default function BackgroundStage() {
  const layerRefs = useRef<Record<LayerKey, HTMLDivElement | null>>({
    "verse-cloud": null,
    "vision-cream": null,
    "mission-dark": null,
    "join-cream": null,
  });
  const missionDecorationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let sections: SectionMeta[] = [];

    const readSections = () => {
      const nextSections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR))
        .map((element) => {
          const key = element.dataset.bgKey as LayerKey | undefined;
          if (!key || !LAYER_KEYS.includes(key)) {
            return null;
          }

          return {
            key,
            top: element.getBoundingClientRect().top + window.scrollY,
          };
        })
        .filter((section): section is SectionMeta => section !== null);

      sections = nextSections.reduce<SectionMeta[]>((groups, section) => {
        const lastGroup = groups[groups.length - 1];

        if (!lastGroup || lastGroup.key !== section.key) {
          groups.push(section);
        }

        return groups;
      }, []);
    };

    const applyOpacities = (opacities: Record<LayerKey, number>) => {
      LAYER_KEYS.forEach((key) => {
        const layer = layerRefs.current[key];
        if (!layer) {
          return;
        }

        const opacity = clamp(opacities[key] ?? 0, 0, 1);
        layer.style.opacity = String(opacity);
        layer.style.visibility = opacity > 0.001 ? "visible" : "hidden";
      });

      if (missionDecorationRef.current) {
        const missionOpacity = clamp(opacities["mission-dark"] ?? 0, 0, 1);
        missionDecorationRef.current.style.opacity = String(missionOpacity);
        missionDecorationRef.current.style.visibility = missionOpacity > 0.001 ? "visible" : "hidden";
      }
    };

    const update = () => {
      frame = 0;

      if (sections.length === 0) {
        return;
      }

      const scrollY = window.scrollY;
      let currentIndex = 0;

      for (let index = 0; index < sections.length - 1; index += 1) {
        if (scrollY >= sections[index].top) {
          currentIndex = index;
        }
      }

      const current = sections[currentIndex];
      const next = sections[Math.min(currentIndex + 1, sections.length - 1)];
      const viewportHeight = window.innerHeight;
      const distanceToNext = next.top - scrollY;
      const transitionStartPoint = viewportHeight * TRANSITION_START_VIEWPORT_RATIO;
      const transitionEndPoint = viewportHeight * TRANSITION_COMPLETE_VIEWPORT_RATIO;
      const transitionBand = Math.max(transitionStartPoint - transitionEndPoint, TRANSITION_MIN_BAND);
      const progress =
        current.key === next.key
          ? 0
          : smoothstep(clamp((transitionStartPoint - distanceToNext) / transitionBand, 0, 1));

      const currentLayerIndex = LAYER_KEYS.indexOf(current.key);
      const opacities = Object.fromEntries(
        LAYER_KEYS.map((key, index) => {
          if (index < currentLayerIndex) {
            return [key, 0];
          }

          if (index === currentLayerIndex) {
            return [key, current.key === next.key ? 1 : 1 - progress];
          }

          return [key, 1];
        }),
      ) as Record<LayerKey, number>;

      applyOpacities(opacities);
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
      <div className="relative h-full w-full">
        <div
          ref={(node) => {
            layerRefs.current["join-cream"] = node;
          }}
          className="absolute inset-0 will-change-[opacity]"
          style={{ background: CREAM_COLOR }}
        />

        <div
          ref={(node) => {
            layerRefs.current["mission-dark"] = node;
          }}
          className="absolute inset-0 will-change-[opacity]"
          style={{ background: MISSION_DARK_BACKGROUND }}
        >
          <div
            ref={missionDecorationRef}
            className="absolute inset-0 will-change-[opacity]"
            style={{ background: MISSION_DARK_DECORATION }}
          />
        </div>

        <div
          ref={(node) => {
            layerRefs.current["vision-cream"] = node;
          }}
          className="absolute inset-0 will-change-[opacity]"
          style={{ background: VISION_CREAM_COLOR }}
        />

        <div
          ref={(node) => {
            layerRefs.current["verse-cloud"] = node;
          }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: "url('/images/vision/vision-cloud.png')" }}
          />
          <div className="absolute inset-0 bg-white/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.3)_32%,rgba(255,255,255,0)_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.12)_42%,rgba(255,255,255,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,245,0.32)_0%,rgba(244,238,245,0.08)_22%,rgba(244,238,245,0.08)_78%,rgba(244,238,245,0.26)_100%)]" />
        </div>
      </div>
    </div>
  );
}
