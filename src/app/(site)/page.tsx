import Image from "next/image";
import Link from "next/link";

import MissionCountriesSection from "@/components/home/mission-countries-section";
import MissionStorySection from "@/components/home/mission-story-section";
import { createPageMetadata } from "@/lib/seo";
import { aboutCards } from "@/lib/site-data";
import { SITE_ALTERNATE_NAME, SITE_NAME } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `${SITE_ALTERNATE_NAME} | ${SITE_NAME}`,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="bg-[#fffcf8]">
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#241f25] pt-[88px]">
        <div className="flex-1" />
        <div className="flex items-center justify-center pb-5">
          <div className="flex flex-col items-center gap-3">
            <p className="font-suit text-xs font-light uppercase tracking-[0.24em] text-white">SCROLL</p>
            <div className="h-[60px] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)]" />
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#d3c0dc_0%,#fffcf8_100%)] px-5 py-[240px] md:px-10 lg:px-20">
        <div className="mx-auto flex w-full flex-col items-center gap-16 lg:gap-[68px]">
          <div className="flex flex-col items-center gap-4">
            <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#341936] md:text-base">
              VERSE
            </p>
            <div className="h-px w-[60px] bg-[#3d1a46]" />
          </div>

          <div className="relative w-full max-w-[910px] overflow-hidden border border-[#eae2f0] bg-[rgba(246,241,248,0.7)] px-8 py-14 shadow-[0_8px_24px_rgba(242,215,255,0.2)] backdrop-blur-[40px] md:px-[60px] md:py-[80px]">
            <div className="flex flex-col items-center gap-9 text-center">
              <p className="font-hahmlet text-[1.5rem] leading-[1.9] tracking-[0.01em] text-[#4f3657]">
                “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라”
              </p>
              <div className="h-px w-full max-w-[700px] bg-[linear-gradient(90deg,rgba(216,183,220,0)_0%,#845A88_50%,rgba(216,183,220,0)_100%)]" />
              <p className="font-hahmlet text-[1.5rem] text-[#4f3657]">사도행전 1:8</p>
            </div>
            <p className="pointer-events-none absolute bottom-[-8px] right-6 font-corinthia text-[72px] uppercase text-[rgba(0,0,0,0.03)] md:bottom-[-18px] md:right-8 md:text-[144px]">
              VERSE
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[#fffcf8] px-5 py-24 md:px-10 lg:px-20 lg:py-[100px]">
        <div className="absolute right-0 top-0 h-[420px] w-[82%] md:h-[520px] lg:h-[781px] lg:w-[1172px]">
          <Image
            src="/images/vision/vision-cloud.png"
            alt="Vision background"
            fill
            sizes="(max-width: 1024px) 82vw, 1172px"
            className="object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>

        <div className="relative mx-auto w-full">
          <div className="mb-14">
            <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#3d1a46] md:text-base">
              about us
            </p>
            <div className="mt-3 h-px w-[60px] bg-[#3d1a46]" />
          </div>

          <div className="grid max-w-[629px] gap-6 uppercase">
            {aboutCards.map((card) => (
              <article
                key={card.number}
                className="relative overflow-hidden border border-white/30 bg-[rgba(255,255,255,0.7)] p-8 shadow-[4px_4px_20px_rgba(45,22,59,0.1)] backdrop-blur-[10px]"
              >
                <p className="font-hahmlet text-[10px] tracking-[0.2em] text-[rgba(58,30,66,0.32)]">
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 font-hahmlet text-2xl font-semibold text-[#280631]">{card.title}</h3>
                <p className="mt-3 font-suit text-[15px] leading-[1.6] tracking-[0.01em] text-[#7e6f87]">
                  {card.body}
                </p>
                <p className="pointer-events-none absolute left-4 top-[-18px] font-corinthia text-[96px] leading-none text-[rgba(58,30,66,0.04)] md:left-6 md:top-[-24px] md:text-[128px]">
                  {card.number}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MissionStorySection />
      <MissionCountriesSection />

      <section className="bg-[#fffcf8] px-5 py-[220px] text-center uppercase md:px-10 lg:px-20 lg:py-[300px]">
        <div className="mx-auto w-full">
          <div className="space-y-4">
            <p className="font-hahmlet text-sm text-[#928397] md:text-2xl">Be Part of the Mission</p>
            <p className="font-hahmlet text-[2rem] font-semibold text-[#250030] md:text-[3.75rem]">
              선교는 지금도 계속되고 있습니다
            </p>
            <p className="font-hahmlet text-[2rem] font-semibold text-[#250030] md:text-[3.75rem]">
              이 사명에 함께하세요
            </p>
          </div>
        </div>
      </section>

      <section
        id="join"
        className="bg-[#fffcf8] px-5 py-24 md:px-10 lg:px-20 lg:py-[100px]"
      >
        <div className="mx-auto flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-[80px]">
          <div className="flex-1">
            <div className="flex flex-col gap-9">
              <div>
                <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#3d1a46] md:text-base">
                  join the mission
                </p>
                <div className="mt-3 h-px w-[60px] bg-[#3d1a46]" />
              </div>

              <h2 className="font-hahmlet text-[2.25rem] font-semibold leading-[1.3] tracking-[-0.03em] text-black md:text-[3.75rem] md:leading-[1.34]">
                예배로, 선교로, 공동체로
                <br />
                우리는 함께 걸어갑니다
              </h2>
            </div>

            <div className="mt-10 border-l-[3px] border-[#2a123c] bg-[linear-gradient(90deg,rgba(52,16,65,0.04)_0%,rgba(255,252,248,0)_100%)] px-6 py-7 md:px-10 md:py-9">
              <p className="font-suit text-lg leading-[1.75] tracking-[0.01em] text-[#3c2348] md:text-2xl">
                “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과
                <br />
                온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라”
              </p>
              <p className="mt-4 font-suit text-lg text-[#3c2348] md:text-2xl">사도행전 1:8</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "service time", title: "예배안내", href: "/worship" },
                { label: "newcomer", title: "새가족 안내", href: "/next-steps" },
                { label: "way to church", title: "오시는 길", href: "#footer" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-lg bg-[#2a123c] p-5 shadow-[0_4px_24px_rgba(110,100,100,0.1)] transition hover:-translate-y-0.5"
                >
                  <p className="font-suit text-xs uppercase tracking-[0.12em] text-[#dfd6e5]">{item.label}</p>
                  <p className="mt-2 font-suit text-xl font-semibold text-white">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[420px] self-stretch">
            <div className="relative h-[420px] overflow-hidden rounded-xl bg-white shadow-[0_16px_24px_rgba(0,0,0,0.15)] md:h-[560px] lg:h-full lg:min-h-[632px]">
              <Image
                src="/images/church/church-illustration.png"
                alt="행복이가득한 시온장로교회"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
