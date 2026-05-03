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
  const welcomeSectionVars = {
    "--welcome-scale": "clamp(0.78, calc((100dvh - 7rem) / 960px), 1)",
  } as CSSProperties;
  const quickLinks = [
    { label: "교회 소개", href: "/about", icon: "church" },
    { label: "예배 안내", href: "/worship", icon: "time" },
    { label: "새가족 안내", href: "/next-steps", icon: "person" },
    { label: "오시는 길", href: "#footer", icon: "location" },
  ] as const;

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
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4eef5] px-5 py-[140px] md:px-10 lg:h-screen lg:min-h-0 lg:px-20 lg:py-10"
            style={welcomeSectionVars}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/vision/vision-cloud.png"
                alt="Cloud background"
                fill
                sizes="100vw"
                className="object-cover object-center opacity-78"
              />
            </div>
            <div className="absolute inset-0 bg-white/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.3)_32%,rgba(255,255,255,0)_58%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.12)_42%,rgba(255,255,255,0.02)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,245,0.32)_0%,rgba(244,238,245,0.08)_22%,rgba(244,238,245,0.08)_78%,rgba(244,238,245,0.26)_100%)]" />

            <div
              className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center"
              style={{
                gap: "calc(3rem * var(--welcome-scale))",
                paddingTop: "calc(2.5rem * var(--welcome-scale))",
              }}
            >
              <div
                className="flex flex-col items-center"
                style={{
                  gap: "calc(0.9rem * var(--welcome-scale))",
                }}
              >
                <p className="font-hahmlet text-xs font-extralight uppercase tracking-[0.28em] text-[#5b3b63] md:text-base">
                  welcome
                </p>
                <div className="h-px w-[60px] bg-[#6d4f78]" />
              </div>

              <div className="max-w-[1000px]">
                <h2
                  className="font-hahmlet font-semibold leading-[1.28] tracking-[-0.03em] text-[#250030]"
                  style={{
                    fontSize: "clamp(2.5rem, calc(3.75rem * var(--welcome-scale)), 3.75rem)",
                  }}
                >
                  행복이 가득한 시온장로교회에
                  <br />
                  오신 것을 환영합니다
                </h2>
              </div>

              <div
                className="relative w-fit max-w-full overflow-hidden rounded-[8px] border border-white/30 bg-[rgba(255,255,255,0.42)] shadow-[0_8px_24px_rgba(97,60,116,0.2)] backdrop-blur-[10px]"
                style={{
                  paddingInline: "calc(7.5rem * var(--welcome-scale))",
                  paddingBlock: "calc(3.75rem * var(--welcome-scale))",
                }}
              >
                <div
                  className="flex flex-col items-center text-center uppercase"
                  style={{
                    gap: "calc(2.25rem * var(--welcome-scale))",
                  }}
                >
                  <p
                    className="max-w-[min(80vw,42rem)] font-hahmlet font-medium leading-[1.72] tracking-[0.01em] text-[#4f3657] md:max-w-[min(76vw,46rem)]"
                    style={{
                      fontSize: "clamp(1.05rem, calc(1.5rem * var(--welcome-scale)), 1.5rem)",
                    }}
                  >
                    “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과
                    <br className="hidden md:block" />
                    온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라 하시니라”
                  </p>
                  <p
                    className="font-estonia tracking-[0.14em] text-[#6f5576]"
                    style={{
                      fontSize: "clamp(1.5rem, calc(1.5rem * var(--welcome-scale)), 1.5rem)",
                    }}
                  >
                    Acts 1:8
                  </p>
                </div>
                <p
                  className="pointer-events-none absolute bottom-0 right-0 font-corinthia uppercase leading-none text-[rgba(255,255,255,0.35)]"
                  style={{
                    fontSize: "clamp(4.5rem, calc(8.5rem * var(--welcome-scale)), 8.5rem)",
                  }}
                >
                  VERSE
                </p>
              </div>

              <div
                className="grid w-full max-w-[760px] grid-cols-2 md:flex md:flex-wrap md:items-start md:justify-center"
                style={{
                  columnGap: "calc(2.5rem * var(--welcome-scale))",
                  rowGap: "calc(2.25rem * var(--welcome-scale))",
                }}
              >
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col items-center"
                    style={{
                      gap: "calc(1rem * var(--welcome-scale))",
                    }}
                  >
                    <div
                      className="relative flex items-center justify-center rounded-[12px] border border-[rgba(51,20,64,0.1)] bg-[rgba(255,255,255,0.72)] shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-[6px] transition group-hover:-translate-y-0.5"
                      style={{
                        width: "calc(8.75rem * var(--welcome-scale))",
                        height: "calc(8.75rem * var(--welcome-scale))",
                      }}
                    >
                      <div
                        className="absolute rounded-full bg-[rgba(183,166,196,0.58)]"
                        style={{
                          bottom: "calc(1.75rem * var(--welcome-scale))",
                          left: "calc(1.95rem * var(--welcome-scale))",
                          width: "calc(3.5rem * var(--welcome-scale))",
                          height: "calc(3.5rem * var(--welcome-scale))",
                        }}
                      />
                      <div className="relative z-10 text-[#4d2d61]">
                        {item.icon === "church" ? (
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{
                              width: "calc(3.625rem * var(--welcome-scale))",
                              height: "calc(3.625rem * var(--welcome-scale))",
                            }}
                          >
                            <path d="M14 52V28l18-12 18 12v24H14Z" />
                            <path d="M26 52V39h12v13" />
                            <path d="M32 10v12" />
                            <path d="M27 15h10" />
                            <circle cx="32" cy="29" r="2.4" fill="currentColor" stroke="none" />
                          </svg>
                        ) : item.icon === "time" ? (
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{
                              width: "calc(3.625rem * var(--welcome-scale))",
                              height: "calc(3.625rem * var(--welcome-scale))",
                            }}
                          >
                            <circle cx="32" cy="32" r="22" />
                            <path d="M32 20v14l10 8" />
                            <path d="M50 18c2 2.6 3.4 5.6 4 8.9" />
                          </svg>
                        ) : item.icon === "person" ? (
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{
                              width: "calc(3.625rem * var(--welcome-scale))",
                              height: "calc(3.625rem * var(--welcome-scale))",
                            }}
                          >
                            <circle cx="28" cy="23" r="7" />
                            <path d="M13 48c2.5-8 9.2-12 15-12s12.5 4 15 12" />
                            <path d="M49 16v14" />
                            <path d="M42 23h14" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={{
                              width: "calc(3.625rem * var(--welcome-scale))",
                              height: "calc(3.625rem * var(--welcome-scale))",
                            }}
                          >
                            <path d="M32 54s18-15.2 18-28a18 18 0 1 0-36 0c0 12.8 18 28 18 28Z" />
                            <circle cx="32" cy="26" r="4.5" fill="currentColor" stroke="none" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p
                      className="font-suit font-semibold text-[#341939]"
                      style={{
                        fontSize: "clamp(1.05rem, calc(1.35rem * var(--welcome-scale)), 1.35rem)",
                      }}
                    >
                      {item.label}
                    </p>
                  </Link>
                ))}
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
