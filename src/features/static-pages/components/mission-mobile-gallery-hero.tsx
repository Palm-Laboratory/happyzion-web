"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MissionGallery = {
  countries: string[];
  images: [string, string, string];
};

type MissionMobileGalleryHeroProps = {
  galleries: MissionGallery[];
};

const MOBILE_RAIL_TOP_FALLBACK = 82;

export default function MissionMobileGalleryHero({ galleries }: MissionMobileGalleryHeroProps) {
  const lastImageRef = useRef<string | null>(null);
  const lastImageAltRef = useRef("");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [previousImageAlt, setPreviousImageAlt] = useState("");
  const [isPreviousImageVisible, setIsPreviousImageVisible] = useState(false);
  const activeGallery = galleries[activeGalleryIndex] ?? galleries[0];
  const activeImage = activeGallery?.images[activeImageIndex] ?? activeGallery?.images[0];
  const activeImageAlt = activeGallery ? `${activeGallery.countries.join(", ")} 선교 사진` : "";

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    if (lastImageRef.current && lastImageRef.current !== activeImage) {
      setPreviousImage(lastImageRef.current);
      setPreviousImageAlt(lastImageAltRef.current);
      setIsPreviousImageVisible(true);

      const frame = window.requestAnimationFrame(() => {
        setIsPreviousImageVisible(false);
      });
      const timeout = window.setTimeout(() => {
        setPreviousImage(null);
        setPreviousImageAlt("");
      }, 560);

      lastImageRef.current = activeImage;
      lastImageAltRef.current = activeImageAlt;

      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timeout);
      };
    }

    lastImageRef.current = activeImage;
    lastImageAltRef.current = activeImageAlt;
  }, [activeImage, activeImageAlt]);

  useEffect(() => {
    if (galleries.length <= 1) {
      return;
    }

    let frame = 0;

    const updateActiveGallery = () => {
      const track = document.getElementById("mission-history-timeline-track");

      if (track) {
        const rect = track.getBoundingClientRect();
        const rootStyles = window.getComputedStyle(document.documentElement);
        const parsedStickyTop = Number.parseFloat(rootStyles.getPropertyValue("--site-header-sticky-offset"));
        const stickyTop = Number.isFinite(parsedStickyTop) ? parsedStickyTop : MOBILE_RAIL_TOP_FALLBACK;
        const segmentHeight = rect.height / galleries.length;
        const scrolledWithinTrack = Math.min(Math.max(stickyTop - rect.top, 0), rect.height - 1);
        const nextGalleryIndex = Math.min(galleries.length - 1, Math.floor(scrolledWithinTrack / segmentHeight));

        setActiveGalleryIndex((currentGalleryIndex) => {
          if (currentGalleryIndex === nextGalleryIndex) {
            return currentGalleryIndex;
          }

          setActiveImageIndex(0);
          return nextGalleryIndex;
        });
      }

      frame = window.requestAnimationFrame(updateActiveGallery);
    };

    frame = window.requestAnimationFrame(updateActiveGallery);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [galleries.length]);

  if (!activeGallery || !activeImage) {
    return null;
  }

  const moveImage = (direction: -1 | 1) => {
    setActiveImageIndex((current) => (current + direction + activeGallery.images.length) % activeGallery.images.length);
  };

  return (
    <section
      className="sticky z-30 h-[32svh] w-full overflow-hidden bg-[#1e1035] transition-[top] duration-300 ease-out md:hidden"
      style={{ top: "var(--site-header-sticky-offset, 82px)" }}
    >
      <Image
        key={activeImage}
        className="object-cover"
        src={activeImage}
        alt={activeImageAlt}
        fill
        priority
        sizes="100vw"
      />
      {previousImage ? (
        <Image
          aria-hidden="true"
          className={`object-cover transition-opacity duration-500 ease-out ${isPreviousImageVisible ? "opacity-100" : "opacity-0"
            }`}
          src={previousImage}
          alt={previousImageAlt}
          fill
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between bg-black/70 px-5">
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/60 text-2xl leading-none text-white"
          aria-label="이전 선교 사진"
          onClick={() => moveImage(-1)}
        >
          &lt;
        </button>
        <div className="flex min-w-0 items-center gap-4 px-4">
          <p className="truncate font-cormorant-infant text-base font-medium uppercase leading-4 tracking-[0.01em] text-[#c9a96e]">
            {activeGallery.countries.join(" · ")}
          </p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {activeGallery.images.map((image, index) => (
              <span
                className={`h-1.5 w-1.5 rounded-full ${index === activeImageIndex ? "bg-[#c9a96e]" : "bg-white/40"}`}
                key={image}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/60 text-2xl leading-none text-white"
          aria-label="다음 선교 사진"
          onClick={() => moveImage(1)}
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
