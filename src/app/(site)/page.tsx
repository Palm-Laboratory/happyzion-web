import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import BackgroundStage from "@/components/home/background-stage";
import JoinMissionSection from "@/components/home/join-mission-section";
import MissionCtaSection from "@/components/home/mission-cta-section";
import MissionCountriesSection from "@/components/home/mission-countries-section";
import VisionMobileGallery from "@/components/home/vision-mobile-gallery";
import MissionStorySection from "@/components/home/mission-story-section";
import ScrollFadeGroup from "@/components/home/scroll-fade-group";
import { createPageMetadata } from "@/lib/seo";
import { SITE_ALTERNATE_NAME, SITE_NAME } from "@/lib/site-config";
import { getPublicMainVideoSetting } from "@/lib/site-settings-api";
import { linkToStaticPage } from "@/lib/canonical-menu-path";

export const metadata = createPageMetadata({
  title: `${SITE_ALTERNATE_NAME} | ${SITE_NAME}`,
  path: "/",
});

export default async function HomePage() {
  const [mainVideo, greetingHref, serviceTimesHref, newcomerHref, locationHref] = await Promise.all([
    getPublicMainVideoSetting().catch(() => ({ videoUrl: "/video/sample.mp4" })),
    linkToStaticPage("about.greeting", "/about/greeting"),
    linkToStaticPage("about.service-times", "/about/service-times"),
    linkToStaticPage("discipleship.guide", "/discipleship/guide"),
    linkToStaticPage("about.location", "/about/location"),
  ]);
  const welcomeSectionVars = {
    "--welcome-scale": "clamp(0.78, calc((100vh - 7rem) / 960px), 1)",
  } as CSSProperties;
  const visionSectionVars = {
    "--vision-column-gap": "clamp(0px, calc(100vw - 1550px), 200px)",
    "--vision-right-follow": "clamp(0px, calc(80rem - 100vw), 45rem)",
  } as CSSProperties;
  const quickLinks = [
    { label: "교회 소개", href: greetingHref, icon: "church" },
    { label: "예배 안내", href: serviceTimesHref, icon: "time" },
    { label: "새가족 안내", href: newcomerHref, icon: "person" },
    { label: "오시는 길", href: locationHref, icon: "location" },
  ] as const;
  const quickLinkIconClass =
    "h-full w-full";
  const visionCards = [
    {
      number: "01",
      eyebrow: "SPIRIT-FILLED WORSHIP",
      title: "성령이 임재하는 예배",
      body: "하나님의 임재 안에서 드리는 예배를 통해 성도들이 변화되고 회복되는 공동체를 세워갑니다.",
    },
    {
      number: "02",
      eyebrow: "SPIRIT-LED MISSION CHURCH",
      title: "성령으로 선교하는 교회",
      body: "땅끝까지 복음을 전하라는 지상명령에 순종하여 열방을 향한 선교에 헌신합니다.",
    },
    {
      number: "03",
      eyebrow: "SPIRIT-UNITED COMMUNITY",
      title: "성령으로 하나되는 공동체",
      body: "그리스도 안에서 서로 사랑하고 섬기며 연합하는 진정한 공동체를 이루어갑니다.",
    },
  ] as const;

  return (
    <div className="relative">
      <section
        className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black pt-[88px]"
      >
        <video
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={mainVideo.videoUrl} />
        </video>
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="flex-1" />
        <div className="relative z-10 flex items-center justify-center pb-5">
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
            data-bg-key="verse-cloud"
            className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-visible px-5 py-20 sm:py-24 md:px-10 md:py-[140px] lg:overflow-hidden lg:px-20 lg:py-10"
            style={welcomeSectionVars}
          >
            <div
              className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 pt-6 text-center sm:gap-12 lg:gap-[calc(4rem*var(--welcome-scale))] lg:pt-[calc(2.5rem*var(--welcome-scale))]"
            >
              <div className="flex flex-col items-center gap-6 md:gap-8">
                <div className="flex flex-col items-center gap-3 lg:gap-[calc(0.9rem*var(--welcome-scale))]">
                  <p className="type-label-xl font-cormorant-infant text-[#896B91]">
                    welcome
                  </p>
                  <div className="h-px w-[60px] bg-[#896B91]" />
                </div>

                <h2 className="type-heading-lg max-w-[1000px] text-[#250030]">
                  행복이 가득한
                  <br className="min-[471px]:hidden" />
                  <span className="min-[471px]:inline hidden"> 시온장로교회에</span>
                  <span className="min-[471px]:hidden">시온장로교회에</span>
                  <span className="hidden min-[471px]:inline"> </span>
                  <br />
                  오신 것을 환영합니다
                </h2>
              </div>

              <div
                className="relative w-fit max-w-full overflow-hidden rounded-[8px] border border-white/30 bg-[rgba(255,255,255,0.42)] shadow-[0_8px_24px_rgba(97,60,116,0.2)] backdrop-blur-[10px] [--welcome-card-padding-block:32px] md:[--welcome-card-padding-block:3.25rem] lg:[--welcome-card-padding-block:3.75rem] md:max-lg:[--welcome-card-padding-inline:calc(5rem*var(--welcome-scale))] lg:[--welcome-card-padding-inline:calc(7.5rem*var(--welcome-scale))]"
                style={{
                  paddingInline: "var(--welcome-card-padding-inline, 40px)",
                  paddingBlock: "var(--welcome-card-padding-block)",
                }}
              >
                <div
                  className="flex flex-col items-center gap-7 text-center uppercase md:gap-8 lg:gap-[calc(2.25rem*var(--welcome-scale))]"
                >
                  <p
                    className="type-quote-sm md:type-quote-md lg:type-quote-lg max-w-[min(80vw,42rem)] font-hahmlet uppercase text-[#4A3B5E] md:max-w-[min(76vw,46rem)]"
                  >
                    “오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와
                    땅 끝까지 이르러 내 증인이 되리라 하시니라”
                  </p>
                  <p className="type-script-accent text-[#6f5576]">
                    Acts 1:8
                  </p>
                </div>
                <p className="type-script-display pointer-events-none absolute bottom-0 right-0 uppercase text-[rgba(255,255,255,0.35)]">
                  VERSE
                </p>
              </div>

              <div
                className="grid w-full max-w-[760px] grid-cols-2 place-items-stretch gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-x-[calc(2.5rem*var(--welcome-scale))] lg:gap-y-[calc(2.25rem*var(--welcome-scale))] min-[840px]:flex min-[840px]:flex-wrap min-[840px]:items-start min-[840px]:justify-center"
              >
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-[calc(1rem*var(--welcome-scale))] min-[840px]:w-auto"
                  >
                    <div
                      className="relative flex h-[6.875rem] w-full items-center justify-center rounded-[12px] border border-[#331440]/10 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-[6px] transition group-hover:-translate-y-0.5 min-[480px]:h-[7.5rem] lg:h-[calc(8.75rem*var(--welcome-scale))] min-[840px]:w-[calc(8.75rem*var(--welcome-scale))]"
                    >
                      <div
                        className="relative h-[3rem] w-[3rem] min-[480px]:h-[3.25rem] min-[480px]:w-[3.25rem] lg:h-[calc(3.625rem*var(--welcome-scale))] lg:w-[calc(3.625rem*var(--welcome-scale))]"
                      >
                        <div className="absolute -bottom-2 -left-2 h-10 w-10 rounded-full bg-[rgba(220,206,228,1)] min-[480px]:h-12 min-[480px]:w-12 lg:bottom-[calc(-0.6rem*var(--welcome-scale))] lg:left-[calc(-0.6rem*var(--welcome-scale))] lg:h-[calc(3rem*var(--welcome-scale))] lg:w-[calc(3rem*var(--welcome-scale))]" />
                        <div className="relative z-10 text-[#6B4A75]">
                          {item.icon === "church" ? (
                            <svg
                              viewBox="0 0 64 64"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className={quickLinkIconClass}
                            >
                              <path d="M14 52V28l18-12 18 12v24H14Z" />
                              <path d="M26 52V39h12v13" />
                              <path d="M32 4v12" />
                              <path d="M27 9h10" />
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
                              className={quickLinkIconClass}
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
                              className={quickLinkIconClass}
                            >
                              <defs>
                                <clipPath id="newcomer-back-person-clip">
                                  <rect x="37" y="8" width="19" height="44" />
                                </clipPath>
                              </defs>
                              <g clipPath="url(#newcomer-back-person-clip)">
                                <circle cx="41" cy="22" r="9" />
                                <path d="M23 49c3-9.2 10.4-14 18-14s15 4.8 18 14" />
                              </g>
                              <circle cx="29" cy="22" r="9" />
                              <path d="M11 49c3-9.2 10.4-14 18-14s15 4.8 18 14" />
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
                              className={quickLinkIconClass}
                            >
                              <path d="M32 54s18-15.2 18-28a18 18 0 1 0-36 0c0 12.8 18 28 18 28Z" />
                              <circle cx="32" cy="26" r="4.5" fill="currentColor" stroke="none" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="type-button-md text-[#4A3B5E]">
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            id="about"
            data-bg-key="vision-cream"
            className="relative px-5 py-16 md:px-10 md:py-24 lg:overflow-hidden lg:px-20 lg:py-32"
            style={visionSectionVars}
          >
            <div className="relative z-10 flex w-full flex-col justify-center gap-12 lg:flex-row lg:items-start lg:justify-start lg:gap-[var(--vision-column-gap)] min-[1750px]:justify-center">
              <div className="contents lg:flex lg:w-fit lg:flex-none lg:justify-start">
                <div className="flex w-full max-w-full flex-col gap-8 lg:w-[min(100%,min(calc(100vw-35rem),45rem))] lg:gap-16">
                  <div className="flex flex-col items-start gap-6 md:gap-8">
                    <div
                      className="flex flex-col items-start"
                      style={{
                        gap: "0.75rem",
                      }}
                    >
                      <p className="type-label-xl font-cormorant-infant text-[#896B91]">
                        our vision
                      </p>
                      <div className="h-px w-[60px] bg-[#896B91]" />
                    </div>

                    <div
                      className="flex flex-col items-start uppercase"
                      style={{
                        gap: "0.75rem",
                      }}
                    >
                      <h2 className="type-heading-lg text-[#250030]">
                        <span className="min-[1061px]:inline max-[1060px]:hidden">
                          성령 안에 하나된 교회
                        </span>
                        <span className="hidden min-[371px]:max-[1023px]:inline">
                          성령 안에 하나된 교회
                        </span>
                        <span className="hidden max-[370px]:inline">
                          성령 안에
                        </span>
                        <span className="hidden max-[370px]:block">
                          하나된 교회
                        </span>
                        <span className="hidden min-[1024px]:max-[1060px]:inline">
                          성령 안에
                        </span>
                        <span className="hidden min-[1024px]:max-[1060px]:block">
                          하나된 교회
                        </span>
                      </h2>
                      <p className="type-subtitle-sm md:type-subtitle-md lg:type-subtitle-lg text-[#896B91]">
                        ONE CHURCH · ONE SPIRIT
                      </p>
                    </div>
                  </div>

                  <VisionMobileGallery />

                  <ScrollFadeGroup
                    nextSectionId="mission"
                    className="flex flex-col"
                    style={{
                      width: "100%",
                      gap: "1.5rem",
                    }}
                  >
                    {visionCards.map((card) => (
                      <article
                        key={card.number}
                        className="relative overflow-hidden rounded-[4px] border border-[#8b6db5]/12 bg-[#fcf8ff] px-6 py-[1.875rem] shadow-[0_4px_12px_rgba(52,22,67,0.15),4px_8px_24px_rgba(44,11,64,0.2)] md:px-8"
                      >
                        <div
                          className="relative flex flex-col items-start uppercase"
                          style={{
                            gap: "0.5rem",
                          }}
                        >
                          <p
                            className="type-label-md md:type-label-lg lg:type-label-xl font-medium text-[rgba(105,19,147,0.4)]"
                          >
                            {card.eyebrow}
                          </p>
                          <h3 className="type-title-md md:type-title-lg lg:type-title-xl text-[#250030]">
                            {card.title}
                          </h3>
                          <p className="type-body-sm md:type-body-md normal-case text-[#4A3B5E]">
                            {card.body}
                          </p>
                        </div>
                        <p
                          className="type-script-display pointer-events-none absolute left-7 -top-0 md:-top-5 lg:-top-4.5 text-[rgba(105,19,147,0.08)]"
                        >
                          {card.number}
                        </p>
                      </article>
                    ))}
                  </ScrollFadeGroup>
                </div>
              </div>

              <ScrollFadeGroup
                nextSectionId="mission"
                className="relative mt-10 hidden w-full lg:mt-0 lg:flex lg:w-fit lg:flex-none lg:shrink-0 lg:justify-start lg:ml-[calc(var(--vision-right-follow)*-1)]"
              >
                <div className="relative h-[540px] w-full max-w-[620px] lg:mt-16 lg:h-[46rem] lg:w-[42rem] lg:max-w-none">
                  <div
                    className="absolute right-0 top-0 overflow-hidden bg-[#f2ebf6] shadow-[0_20px_40px_rgba(67,29,83,0.12)]"
                    style={{
                      padding: "10px",
                      transform: "rotate(1.45deg)",
                      width: "31.5rem",
                    }}
                  >
                    <div className="relative aspect-[539/359] w-full overflow-hidden">
                      <Image
                        src="/images/vision/vision-worship.png"
                        alt="Worship vision"
                        fill
                        sizes="(min-width: 1024px) 34vw, 80vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div
                    className="absolute left-[12%] top-[28%] overflow-hidden bg-[#f2ebf6] shadow-[0_20px_40px_rgba(67,29,83,0.12)]"
                    style={{
                      padding: "10px",
                      transform: "rotate(-11.11deg)",
                      width: "29rem",
                    }}
                  >
                    <div className="relative aspect-[380/260] w-full overflow-hidden">
                      <Image
                        src="/images/vision/vision-mission.png"
                        alt="Mission vision"
                        fill
                        sizes="(min-width: 1024px) 32vw, 72vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-[0%] right-[2%] overflow-hidden bg-[#f2ebf6] shadow-[0_20px_40px_rgba(67,29,83,0.12)]"
                    style={{
                      padding: "10px",
                      transform: "rotate(7.92deg)",
                      width: "29.875rem",
                    }}
                  >
                    <div className="relative aspect-[2048/1365] w-full overflow-hidden">
                      <Image
                        src="/images/vision/vision-community.png"
                        alt="Community vision"
                        fill
                        sizes="(min-width: 1024px) 32vw, 72vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </ScrollFadeGroup>
            </div>
          </section>

          <MissionStorySection />
          <MissionCountriesSection />
          <MissionCtaSection />

          <JoinMissionSection
            serviceTimesHref={serviceTimesHref}
            newcomerHref={newcomerHref}
            locationHref={locationHref}
          />
        </div>
      </div>
    </div>
  );
}
