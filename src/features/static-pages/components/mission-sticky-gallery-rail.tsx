"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type MissionGallery = {
  countries: string[];
  images: [string, string, string];
};

type MissionStickyGalleryRailProps = {
  galleries: MissionGallery[];
};

type RailPosition = {
  left: number;
  mode: "before" | "fixed" | "after";
  width: number;
};

const RAIL_TOP = 120;
const RAIL_HEIGHT = 660;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MissionGalleryCard({
  activeIndex,
  gallery,
  galleryCount,
  isActive,
}: {
  activeIndex: number;
  gallery: MissionGallery;
  galleryCount: number;
  isActive: boolean;
}) {
  return (
    <figure
      aria-hidden={!isActive}
      className={`absolute inset-0 w-full overflow-hidden transition-opacity duration-500 ease-out ${
        isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-10 items-center justify-between bg-[#1e1035] px-5 py-3">
        <figcaption className="font-cormorant-infant text-sm font-medium uppercase leading-none tracking-[0.01em] text-[#c9a96e]">
          {gallery.countries.join(" · ")}
        </figcaption>
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: galleryCount }).map((_, index) => (
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                activeIndex === index ? "bg-[#ffd373]" : "bg-white/25"
              }`}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        <div className="relative col-span-2 h-[420px] w-full">
          <Image className="object-cover" src={gallery.images[0]} alt={`${gallery.countries.join(", ")} 선교 사진`} fill sizes="360px" />
        </div>
        <div className="relative h-[200px] w-full">
          <Image className="object-cover" src={gallery.images[1]} alt="" fill sizes="180px" />
        </div>
        <div className="relative h-[200px] w-full">
          <Image className="object-cover" src={gallery.images[2]} alt="" fill sizes="180px" />
        </div>
      </div>
    </figure>
  );
}

export default function MissionStickyGalleryRail({ galleries }: MissionStickyGalleryRailProps) {
  const galleryCount = galleries.length;
  const railRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railPosition, setRailPosition] = useState<RailPosition>({
    left: 0,
    mode: "before",
    width: 360,
  });

  useEffect(() => {
    let frame = 0;

    const updateRail = () => {
      const rail = railRef.current;

      if (rail) {
        const rect = rail.getBoundingClientRect();
        const mode: RailPosition["mode"] =
          rect.top > RAIL_TOP ? "before" : rect.bottom <= RAIL_TOP + RAIL_HEIGHT ? "after" : "fixed";

        setRailPosition((currentPosition) => {
          const nextPosition = {
            left: rect.left,
            mode,
            width: rect.width,
          };

          return currentPosition.left === nextPosition.left &&
            currentPosition.mode === nextPosition.mode &&
            currentPosition.width === nextPosition.width
            ? currentPosition
            : nextPosition;
        });

        const segmentHeight = rect.height / galleryCount;
        const scrolledWithinRail = clamp(RAIL_TOP - rect.top, 0, rect.height - 1);
        const nextIndex =
          mode === "after"
            ? galleryCount - 1
            : clamp(Math.floor(scrolledWithinRail / segmentHeight), 0, galleryCount - 1);

        setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
      }
      frame = window.requestAnimationFrame(updateRail);
    };

    frame = window.requestAnimationFrame(updateRail);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [galleryCount]);

  const railStyle: CSSProperties =
    railPosition.mode === "fixed"
      ? {
          left: railPosition.left,
          position: "fixed",
          top: RAIL_TOP,
          width: railPosition.width,
        }
      : railPosition.mode === "after"
        ? {
            bottom: 0,
            position: "absolute",
            width: "100%",
          }
        : {
            position: "absolute",
            top: 0,
            width: "100%",
          };

  return (
    <aside className="relative hidden min-h-[4312px] self-stretch lg:block" ref={railRef}>
      <div className="h-[660px] w-full" style={railStyle}>
        {galleries.map((gallery, index) => (
          <MissionGalleryCard
            activeIndex={activeIndex}
            gallery={gallery}
            galleryCount={galleryCount}
            isActive={activeIndex === index}
            key={gallery.countries.join("-")}
          />
        ))}
      </div>
    </aside>
  );
}
