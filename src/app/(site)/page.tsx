import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import BackgroundStage from "@/components/home/background-stage";
import MissionCtaSection from "@/components/home/mission-cta-section";
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
  const aboutCardVars = {
    "--about-card-width": "clamp(520px, 50vw, 860px)",
    "--about-card-type-scale": "clamp(468px, 45vw, 774px)",
    "--about-card-gap": "clamp(1rem, calc(var(--about-card-width) * 0.028), 1.5rem)",
    "--about-label-gap": "clamp(2.5rem, 5vw, 3.5rem)",
    "--about-card-padding": "calc(var(--about-card-type-scale) * 0.05)",
    "--about-card-eyebrow": "clamp(10px, calc(var(--about-card-type-scale) * 0.0175), 14px)",
    "--about-card-title": "clamp(20px, calc(var(--about-card-type-scale) * 0.0417), 32px)",
    "--about-card-body": "clamp(14px, calc(var(--about-card-type-scale) * 0.026), 20px)",
    "--about-card-watermark": "calc(var(--about-card-type-scale) * 0.167)",
  } as CSSProperties;

  return (
    <div className="relative">
      <section
        className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black pt-[88px]"
      >
        <div className="flex-1" />
        <div className="flex items-center justify-center pb-5">
          <div className="flex flex-col items-center gap-3">
            <p className="font-suit text-xs font-light uppercase tracking-[0.24em] text-white">SCROLL</p>
            <div className="h-[60px] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)]" />
          </div>
        </div>
      </section>

      <div className="relative">
        <BackgroundStage />

        <div className="relative z-10 -mt-[100vh]">
          <section
            data-bg-key="verse"
            className="flex min-h-screen items-center px-5 py-[240px] md:px-10 lg:px-20"
          >
            <div className="mx-auto flex w-full flex-col items-center gap-16 lg:gap-[68px]">
              <div className="flex flex-col items-center gap-4">
                <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#341936] md:text-base">
                  VERSE
                </p>
                <div className="h-px w-[60px] bg-[#3d1a46]" />
              </div>

              <div
                className="relative w-full max-w-[clamp(320px,72vw,910px)] overflow-hidden border border-[#eae2f0] bg-[rgba(246,241,248,0.7)] px-[clamp(24px,4vw,60px)] py-[clamp(48px,6vw,80px)] shadow-[0_8px_24px_rgba(242,215,255,0.2)] backdrop-blur-[40px]"
                style={
                  {
                    "--verse-card-width": "clamp(320px,72vw,910px)",
                    "--verse-watermark-size": "calc(var(--verse-card-width) * 0.158)",
                  } as CSSProperties
                }
              >
                <div className="flex flex-col items-center gap-9 text-center">
                  <p className="font-hahmlet text-[1rem] leading-[1.9] tracking-[0.01em] text-[#4f3657] md:text-[1.25rem] lg:text-[1.5rem]">
                    “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라”
                  </p>
                  <p className="font-hahmlet text-[1rem] text-[#4f3657] md:text-[1.25rem] lg:text-[1.5rem]">사도행전 1:8</p>
                </div>
                <p
                  className="pointer-events-none absolute font-corinthia uppercase text-[rgba(0,0,0,0.03)]"
                  style={{
                    bottom: "calc(var(--verse-card-width) * -0.044)",
                    right: "calc(var(--verse-card-width) * -0.022)",
                    fontSize: "var(--verse-watermark-size)",
                  }}
                >
                  VERSE
                </p>
              </div>
            </div>
          </section>

          <section
            id="about"
            data-bg-key="cream"
            className="relative min-h-screen overflow-hidden bg-[url('/images/vision/vision-cloud.png')] bg-cover bg-top bg-no-repeat px-5 py-24 md:min-h-0 md:bg-none md:px-10 lg:min-h-[1020px] lg:px-20 lg:py-[100px] max-[560px]:[--about-card-width:100%] max-[560px]:[--about-card-gap:1rem] max-[560px]:[--about-card-padding:24px] max-[560px]:[--about-card-eyebrow:10px] max-[560px]:[--about-card-title:20px] max-[560px]:[--about-card-body:14px] max-[560px]:[--about-card-watermark:78px]"
            style={aboutCardVars}
          >
            <div className="absolute inset-0 bg-white/30 md:hidden" />

            <div className="absolute hidden h-screen w-full md:block md:left-auto md:right-0 md:top-[60px] md:w-[70vw] lg:top-0 lg:h-[calc(var(--about-label-gap)+var(--about-card-width)*0.667+var(--about-card-gap)*2+20rem)]">
              <Image
                src="/images/vision/vision-cloud.png"
                alt="Vision background"
                fill
                sizes="78vw"
                className="object-cover object-top opacity-80"
              />
              <div className="absolute inset-0 bg-white/30" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col justify-center md:block md:min-h-0">
              <div className="mb-[var(--about-label-gap)] max-[767px]:mx-auto max-[767px]:w-fit">
                <p className="font-hahmlet text-sm font-extralight uppercase tracking-[0.28em] text-[#3d1a46] md:text-base max-[767px]:text-center">
                  about us
                </p>
                <div className="mt-3 h-px w-[60px] bg-[#3d1a46] max-[767px]:mx-auto" />
              </div>

              <div className="grid w-[var(--about-card-width)] gap-[var(--about-card-gap)] uppercase max-[767px]:mx-auto max-[560px]:w-full">
                {aboutCards.map((card) => (
                  <article
                    key={card.number}
                    className="relative overflow-hidden border border-white/30 bg-[rgba(255,255,255,0.7)] shadow-[4px_4px_20px_rgba(45,22,59,0.1)] backdrop-blur-[10px]"
                    style={{ padding: "var(--about-card-padding)" }}
                  >
                    <p
                      className="font-hahmlet tracking-[0.2em] text-[rgba(58,30,66,0.32)]"
                      style={{ fontSize: "var(--about-card-eyebrow)" }}
                    >
                      {card.eyebrow}
                    </p>
                    <h3
                      className="mt-1 font-hahmlet font-semibold text-[#280631] lg:mt-0"
                      style={{ fontSize: "var(--about-card-title)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-[calc(var(--about-card-width)*0.018)] font-suit leading-[1.6] tracking-[0.01em] text-[#7e6f87]"
                      style={{ fontSize: "var(--about-card-body)" }}
                    >
                      {card.body}
                    </p>
                    <p
                      className="pointer-events-none absolute font-corinthia leading-none text-[rgba(58,30,66,0.04)]"
                      style={{
                        left: "calc(var(--about-card-width) * 0.025)",
                        top: "calc(var(--about-card-width) * -0.03)",
                        fontSize: "var(--about-card-watermark)",
                      }}
                    >
                      {card.number}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <MissionStorySection />
          <MissionCountriesSection />
          <MissionCtaSection />

          <section
            id="join"
            data-bg-key="cream"
            className="px-5 py-24 md:px-10 lg:px-20 lg:py-[100px]"
          >
            <div className="mx-auto flex w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-[80px]">
              <div className="flex flex-1 flex-col lg:self-stretch lg:justify-between">
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

                <div className="mt-10 border-l-[3px] border-[#2a123c] bg-[linear-gradient(90deg,rgba(52,16,65,0.04)_0%,rgba(255,252,248,0)_100%)] px-6 py-7 md:px-10 md:py-9 lg:mt-0">
                  <p className="font-suit text-[1.2rem] leading-[2.2rem] tracking-[0.01em] text-[#3c2348]">
                    “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과
                    <br />
                    온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라”
                  </p>
                  <p className="mt-4 font-suit text-[1.2rem] text-[#3c2348]">사도행전 1:8</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:mt-0">
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
      </div>
    </div>
  );
}
