"use client";

import Image from "next/image";
import type { TransitionEvent } from "react";
import { useState } from "react";

type MissionGallery = {
  countries: string[];
  images: [string, string, string];
};

type MissionMobileGalleryHeroProps = {
  galleries: MissionGallery[];
};

export default function MissionMobileGalleryHero({ galleries }: MissionMobileGalleryHeroProps) {
  const slides = galleries.flatMap((gallery) =>
    gallery.images.map((image, imageIndex) => ({
      country: gallery.countries[imageIndex] ?? gallery.countries[0] ?? "",
      image,
    })),
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [isTrackResetting, setIsTrackResetting] = useState(false);
  const activeSlide = slides[activeSlideIndex] ?? slides[0];
  const activeCountry = activeSlide?.country ?? "";
  const trackSlides = slides.length > 0 ? [slides[slides.length - 1], ...slides, slides[0]] : [];

  if (!activeSlide || trackSlides.length === 0) {
    return null;
  }

  const moveImage = (direction: -1 | 1) => {
    if (isSliding) {
      return;
    }

    setActiveSlideIndex((current) => (current + direction + slides.length) % slides.length);
    setIsSliding(true);
    setTrackIndex((current) => current + direction);
  };

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (trackIndex === 0) {
      setIsTrackResetting(true);
      setTrackIndex(slides.length);
      window.setTimeout(() => {
        setIsTrackResetting(false);
        setIsSliding(false);
      }, 50);
      return;
    }

    if (trackIndex === slides.length + 1) {
      setIsTrackResetting(true);
      setTrackIndex(1);
      window.setTimeout(() => {
        setIsTrackResetting(false);
        setIsSliding(false);
      }, 50);
      return;
    }

    setIsSliding(false);
  };

  return (
    <section className="relative mb-14 h-[32svh] w-full overflow-hidden bg-[#1e1035] md:hidden">
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${trackIndex * 100}%)`,
          transition: isTrackResetting ? "none" : "transform 460ms ease-out",
        }}
        onTransitionEnd={handleTrackTransitionEnd}
      >
        {trackSlides.map((slide, index) => (
          <div className="relative h-full w-full flex-none" key={`${slide.image}-${index}`}>
            <Image
              className="object-cover"
              src={slide.image}
              alt={slide.country ? `${slide.country} 선교 사진` : "선교 사진"}
              fill
              priority={index <= 2}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
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
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4 px-4">
          <p className="truncate font-cormorant-infant text-base font-medium uppercase leading-4 tracking-[0.01em] text-[#c9a96e]">
            {activeCountry}
          </p>
          <p
            className="shrink-0 text-sm font-medium leading-4 tracking-[0.08em] text-[#c9a96e]"
            style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
          >
            {activeSlideIndex + 1}/{slides.length}
          </p>
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
