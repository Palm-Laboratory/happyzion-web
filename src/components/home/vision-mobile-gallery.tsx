"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const galleryImages = [
  {
    src: "/images/vision/vision-worship.png",
    alt: "Worship vision",
    aspectClassName: "aspect-[539/359]",
  },
  {
    src: "/images/vision/vision-mission.jpeg",
    alt: "Mission vision",
    aspectClassName: "aspect-[380/260]",
  },
  {
    src: "/images/vision/vission-community.jpeg",
    alt: "Community vision",
    aspectClassName: "aspect-[2048/1365]",
  },
] as const;

export default function VisionMobileGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const secondItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const secondItem = secondItemRef.current;

    if (!container || !secondItem) {
      return;
    }

    const centerSecondImage = () => {
      const targetLeft =
        secondItem.offsetLeft - (container.clientWidth - secondItem.clientWidth) / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "auto",
      });
    };

    const frame = window.requestAnimationFrame(centerSecondImage);
    const timeout = window.setTimeout(centerSecondImage, 120);
    window.addEventListener("resize", centerSecondImage);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", centerSecondImage);
    };
  }, []);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 lg:hidden">
      <div
        ref={containerRef}
        className="w-full overflow-x-auto overscroll-x-contain px-5 py-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto grid w-[max(100%,752px)] grid-cols-[repeat(3,minmax(240px,1fr))] gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              ref={index === 1 ? secondItemRef : null}
              className="overflow-hidden bg-[#f2ebf6] p-[10px]"
            >
              <div className={`relative ${image.aspectClassName} w-full overflow-hidden`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="33vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
