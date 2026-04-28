import Link from "next/link";

import FeatureCard from "@/components/feature-card";
import SectionHeading from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { homeHighlights, primaryNavigation } from "@/lib/site-data";
import { SITE_ALTERNATE_NAME, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: `${SITE_ALTERNATE_NAME} | ${SITE_NAME}`,
  path: "/",
});

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="overflow-hidden border-b border-forest/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[minmax(0,1fr),360px] lg:items-end lg:py-28">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-forest/60">
              {SITE_NAME}
            </p>
            <h1 className="type-page-title max-w-4xl text-ink">{SITE_TAGLINE}</h1>
            <p className="type-body max-w-2xl text-ink/72">
              `tdch_web`처럼 공개 사이트 기준의 라우트 구조, 공통 헤더/푸터, 설정 레이어를 먼저 갖춘 초기 베이스입니다.
            </p>
          </div>
          <div className="surface-card rounded-[32px] p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/55">
              Quick Start
            </p>
            <div className="mt-4 space-y-3">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-forest/10 px-4 py-4 transition hover:border-forest/25 hover:bg-forest/5"
                >
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="mt-1 text-sm text-ink/62">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Foundation"
          title="처음부터 다시 만들지 않도록, 프로젝트 뼈대를 먼저 맞췄습니다."
          body="페이지를 늘리거나 실제 교회 정보로 교체할 때 `src/lib`와 `src/app/(site)`를 중심으로 확장하면 됩니다."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homeHighlights.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
