import SectionHeading from "@/components/section-heading";
import MissionMobileGalleryHero from "@/features/static-pages/components/mission-mobile-gallery-hero";
import MissionStickyGalleryRail from "@/features/static-pages/components/mission-sticky-gallery-rail";
import { getPublicMissionHistory, type PublicMissionYear as MissionYear } from "@/lib/public-mission-history-api";

type MissionGallery = {
  countries: string[];
  images: [string, string, string];
};


const MISSION_GALLERIES: MissionGallery[] = [
  {
    countries: ["Philippines", "Malaysia", "Thailand"],
    images: [
      "/images/mission-history/philippines-main.jpg",
      "/images/mission-history/philippines-detail-1.jpg",
      "/images/mission-history/philippines-detail-2.jpg",
    ],
  },
  {
    countries: ["Cambodia", "Indonesia", "China"],
    images: [
      "/images/mission-history/cambodia-main.jpg",
      "/images/mission-history/cambodia-detail-1.jpg",
      "/images/mission-history/cambodia-detail-2.jpg",
    ],
  },
  {
    countries: ["Myanmar", "Paraguay", "Mongolia"],
    images: [
      "/images/mission-history/myanmar-main.jpg",
      "/images/mission-history/myanmar-detail-1.jpg",
      "/images/mission-history/myanmar-detail-2.jpg",
    ],
  },
];

function MissionTimelineItem({ item }: { item: MissionYear }) {
  const isGold = item.tone === "gold";
  const isRed = item.tone === "red";
  const yearColor = isRed ? "text-[#b73838]" : isGold ? "text-[#c9a96e]" : "text-[#33103f]";
  const captionColor = isRed ? "text-[#b73838]" : isGold ? "text-[#c9a96e]" : "text-[#33103f]";

  return (
    <article className="flex w-full flex-col gap-4">
      <header className="flex w-full items-end gap-5 border-b border-[#5d3d8a]/15 pb-3 text-left sm:gap-6">
        <p className={`font-serif text-[32px] font-medium italic leading-none tracking-[0] md:text-[36px] ${yearColor}`}>
          {item.year}
        </p>
        <p className={`pb-1 font-hahmlet text-base font-normal leading-6 tracking-[0.01em] ${captionColor}`}>
          {item.caption}
        </p>
      </header>
      <div className="w-full">
        {item.entries.map((entry) => (
          <div
            className="flex min-h-[42px] items-center border-t border-[#5d3d8a]/5 py-2 first:border-t-0"
            key={`${item.year}-${entry.month}-${entry.place}`}
          >
            <div className="w-[72px] shrink-0 pl-3 font-cormorant-infant text-sm uppercase leading-[26px] tracking-[0.01em] text-[#8b6db5] sm:w-[84px]">
              {entry.month}
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isGold ? "bg-[#c9a96e]" : isRed ? "bg-[#b73838]" : "bg-[#8b6db5]"}`} />
              <p className="font-suit text-base uppercase leading-[1.35] tracking-[0.01em] text-[#4a3b5e]">
                {entry.place}
              </p>
              {entry.isFirst ? (
                <span className="border border-[#c9a96e]/30 bg-[#c9a96e]/10 px-1.5 py-[3px] font-suit text-[10px] uppercase leading-none tracking-[0.08em] text-[#c9a96e]">
                  First
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function MissionCallout() {
  return (
    <section className="mt-[100px] w-full overflow-hidden rounded bg-[radial-gradient(circle_at_28%_30%,#1f1035_0%,#2e1d46_62%),radial-gradient(circle_at_68%_47%,rgba(153,63,186,0.12),rgba(153,63,186,0)_42%)] px-6 py-10 uppercase md:px-[60px] md:py-[72px]">
      <p className="mb-4 font-cormorant-infant text-sm leading-none tracking-[0.14em] text-[#c9a96e]">The Mission Continues</p>
      <h3 className="font-hahmlet text-[22px] font-semibold leading-8 tracking-[0.01em] text-white">
        변함없는 20년의 선교,
        <br />
        시온장로교회는 오늘도 달려갑니다.
      </h3>
      <p className="mt-6 font-suit text-[18px] font-medium leading-[1.8] tracking-[0.01em] text-white/80">
        &quot;오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라&quot; - 사도행전 1:8
      </p>
    </section>
  );
}

export default async function MissionHistoryStaticPage() {
  const missionHistory = await getPublicMissionHistory().catch(() => []);

  return (
    <main className="bg-white py-[70px] lg:py-[100px]">
      <div className="section-shell section-shell--narrow">
        <SectionHeading
          label="Mission History"
          title="시온장로교회 선교 이력"
          description="The Journey of Faith and Mission"
          className="mb-[60px] max-w-[540px]"
        />

        <MissionMobileGalleryHero galleries={MISSION_GALLERIES} />

        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8 lg:grid-cols-[minmax(0,560px)_400px] lg:gap-[60px]">
          <section id="mission-history-timeline-track">
            <div className="flex flex-col gap-[60px]">
              {missionHistory.map((item) => (
                <MissionTimelineItem item={item} key={item.year} />
              ))}
            </div>
          </section>
          <MissionStickyGalleryRail galleries={MISSION_GALLERIES} />
        </div>
        <MissionCallout />
      </div>
    </main>
  );
}
