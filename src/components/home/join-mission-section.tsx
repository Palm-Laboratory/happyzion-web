"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const IMAGE_REVEAL_TRIGGER_VIEWPORT_RATIO = 0.5;
const CONTENT_REVEAL_START_VIEWPORT_RATIO = 0.64;
const CONTENT_REVEAL_COMPLETE_VIEWPORT_RATIO = 0.34;
const CONTENT_REVEAL_MIN_BAND = 260;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);

export default function JoinMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [contentReveal, setContentReveal] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const distanceToSection = section.getBoundingClientRect().top;
      const imageRevealTriggerPoint = viewportHeight * IMAGE_REVEAL_TRIGGER_VIEWPORT_RATIO;
      const contentTransitionStartPoint = viewportHeight * CONTENT_REVEAL_START_VIEWPORT_RATIO;
      const contentTransitionEndPoint = viewportHeight * CONTENT_REVEAL_COMPLETE_VIEWPORT_RATIO;
      const contentTransitionBand = Math.max(
        contentTransitionStartPoint - contentTransitionEndPoint,
        CONTENT_REVEAL_MIN_BAND,
      );
      const contentProgress = smoothstep(
        clamp((contentTransitionStartPoint - distanceToSection) / contentTransitionBand, 0, 1),
      );

      setIsImageVisible(distanceToSection <= imageRevealTriggerPoint);
      setContentReveal(contentProgress);
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

  return (
    <section
      ref={sectionRef}
      id="join"
      data-bg-key="join-cream"
      className="relative overflow-hidden px-5 pt-8 pb-40 md:px-10 lg:px-20 lg:pb-[200px]"
    >
      <div
        className="relative z-10 mx-auto w-full min-[768px]:relative min-[768px]:h-[560px] min-[1024px]:h-[632px] min-[1281px]:flex min-[1281px]:h-auto min-[1281px]:flex-row min-[1281px]:items-stretch min-[1281px]:justify-center min-[1281px]:gap-[var(--join-column-gap)]"
        style={{
          ["--join-column-gap" as string]: "clamp(100px, calc(100vw - 1550px), 200px)",
          ["--join-button-width" as string]: "min(calc((100vw - 712px) / 3), 300px)",
        }}
      >
        <div
          className="relative z-10 flex w-fit max-w-full flex-col gap-12 transition-[opacity,transform] duration-500 ease-out min-[768px]:h-[560px] min-[768px]:justify-between min-[768px]:max-w-[620px] min-[1024px]:h-[632px] min-[1281px]:h-auto min-[1281px]:max-w-full min-[1281px]:self-stretch min-[1281px]:gap-0"
          style={{
            opacity: contentReveal,
            transform: `translateY(${(1 - contentReveal) * 32}px)`,
          }}
        >
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <p className="type-label text-[#3d1a46]">JOIN THE MISSION</p>
              <div className="mt-3 h-px w-[60px] bg-[#3d1a46]" />
            </div>

            <h2 className="type-section-title text-black">
              예배로, 선교로, 공동체로
              <br />
              우리는 함께 걸어갑니다
            </h2>
          </div>

          <div className="border-l-[3px] border-[#2a123c] bg-[linear-gradient(90deg,rgba(52,16,65,0.04)_0%,rgba(255,252,248,0)_100%)] px-6 py-7 md:px-10 md:py-9">
            <p className="type-body text-[#3c2348]">
              주님을 깊이 알아가고, 성령 안에서 하나 되어
              <br />
              사랑의 공동체로 함께 이 길을 걷기를 소망합니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 min-[1281px]:w-fit">
            {[
              { label: "service time", title: "예배안내", href: "/worship" },
              { label: "newcomer", title: "새가족 안내", href: "/next-steps" },
              { label: "way to church", title: "오시는 길", href: "#footer" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-lg bg-[#2a123c] p-5 shadow-[0_4px_24px_rgba(110,100,100,0.1)] transition hover:-translate-y-0.5 min-[1281px]:w-[var(--join-button-width)]"
              >
                <p className="type-caption uppercase tracking-[0.12em] text-[#dfd6e5]">
                  {item.label}
                </p>
                <p className="type-button mt-2 text-white">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden w-full max-w-[420px] self-stretch min-[768px]:absolute min-[768px]:right-0 min-[768px]:top-1/2 min-[768px]:z-0 min-[768px]:block min-[768px]:w-[421px] min-[768px]:max-w-none min-[768px]:-translate-y-1/2 min-[1281px]:relative min-[1281px]:right-auto min-[1281px]:top-auto min-[1281px]:z-auto min-[1281px]:w-full min-[1281px]:max-w-[420px] min-[1281px]:translate-y-0">
          <div
            className="relative h-[420px] overflow-hidden rounded-xl bg-white transition-[transform,opacity] duration-500 ease-out min-[768px]:shadow-none min-[1281px]:shadow-[0_16px_24px_rgba(0,0,0,0.15)] md:h-[560px] lg:h-full lg:min-h-[632px]"
            style={{
              opacity: isImageVisible ? 1 : 0,
              transform: `translateY(${isImageVisible ? 0 : 56}px)`,
            }}
          >
            <Image
              src="/images/church/church-illustration.png"
              alt="행복이가득한 시온장로교회"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 min-[768px]:bg-[linear-gradient(90deg,#FFFCF8_20%,rgba(255,252,248,0)_100%)] min-[901px]:bg-[linear-gradient(90deg,#FFFCF8_0%,rgba(255,252,248,0)_100%)] min-[1281px]:bg-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
