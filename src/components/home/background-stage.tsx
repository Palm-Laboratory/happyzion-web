"use client";

import { useEffect, useRef } from "react";

const BACKGROUND_STYLES: Record<string, string> = {
  hero: "#000000",
  verse: "linear-gradient(180deg,#d3c0dc 0%,#fffcf8 100%)",
  cream: "#fffcf8",
  "mission-dark": "#1E1035",
};

const BACKGROUND_KEYS = Object.keys(BACKGROUND_STYLES);
const SECTION_SELECTOR = "[data-bg-key]";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

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

    const applyOpacities = (opacities: Record<string, number>) => {
      const snapshot = BACKGROUND_KEYS.map((key) => `${key}:${opacities[key].toFixed(4)}`).join("|");
      if (snapshot === lastSnapshot) {
        return;
      }

      lastSnapshot = snapshot;

      BACKGROUND_KEYS.forEach((key) => {
        const layer = layerRefs.current[key];
        if (!layer) {
          return;
        }

        layer.style.opacity = String(opacities[key] ?? 0);
        layer.style.visibility = (opacities[key] ?? 0) > 0.001 ? "visible" : "hidden";
      });
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

      let progress = rawProgress;

      if (current.key === "cream" && next.key === "mission-dark") {
        progress = smoothstep(clamp((320 - distanceToNext) / 320, 0, 1));
      } else if (current.key === "mission-dark" && next.key === "cream") {
        progress = smoothstep(clamp((1000 - distanceToNext) / 1000, 0, 1));
      }

      const opacities = Object.fromEntries(BACKGROUND_KEYS.map((key) => [key, 0])) as Record<string, number>;

      if (current.key === next.key) {
        opacities[current.key] = 1;
      } else {
        opacities[current.key] = 1 - progress;
        opacities[next.key] = progress;
      }

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
    <div className="pointer-events-none fixed inset-0 z-0">
      {BACKGROUND_KEYS.map((key, index) => (
        <div
          key={key}
          ref={(node) => {
            layerRefs.current[key] = node;
          }}
          className="absolute inset-0 opacity-0 will-change-[opacity]"
          style={{
            background: BACKGROUND_STYLES[key],
            visibility: index === 0 ? "visible" : "hidden",
          }}
        />
      ))}
    </div>
  );
}
