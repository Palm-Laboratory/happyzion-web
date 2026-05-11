import Image from "next/image";
import MissionStickyGalleryRail from "@/features/static-pages/components/mission-sticky-gallery-rail";

type MissionEntry = {
  month: string;
  place: string;
  isFirst?: boolean;
};

type MissionYear = {
  year: string;
  caption: string;
  tone?: "gold" | "plum" | "red";
  entries: MissionEntry[];
};

type MissionGallery = {
  countries: string[];
  images: [string, string, string];
};

const MISSION_HISTORY: MissionYear[] = [
  { year: "2007", caption: "선교의 첫 발을 내딛다", tone: "gold", entries: [{ month: "May", place: "필리핀 팡가시난", isFirst: true }] },
  { year: "2008", caption: "두 번째 여름, 같은 땅에서", entries: [{ month: "May", place: "필리핀 팡가시난" }] },
  { year: "2009", caption: "말레이시아로 지경을 넓히다", tone: "gold", entries: [{ month: "Feb", place: "말레이시아", isFirst: true }, { month: "May", place: "필리핀" }] },
  { year: "2010", caption: "두 땅에서 복음을 전하다", entries: [{ month: "Feb", place: "말레이시아" }, { month: "May", place: "필리핀" }] },
  { year: "2011", caption: "아시아를 향한 꾸준한 발걸음", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "말레이시아" }] },
  { year: "2012", caption: "흔들림 없이, 해마다", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "말레이시아" }] },
  { year: "2013", caption: "캄보디아 첫 사역", tone: "gold", entries: [{ month: "Feb", place: "캄보디아", isFirst: true }, { month: "May", place: "필리핀 팡가시난" }] },
  { year: "2014", caption: "중국까지, 새로운 사역의 문", tone: "gold", entries: [{ month: "Feb", place: "필리핀 팡가시난" }, { month: "May", place: "말레이시아" }, { month: "Oct", place: "중국", isFirst: true }] },
  { year: "2015", caption: "선교사역은 계속되고", tone: "gold", entries: [{ month: "Feb", place: "필리핀 팡가시난" }, { month: "May", place: "태국 칸차나부리" }, { month: "Oct", place: "캄보디아", isFirst: true }] },
  { year: "2016", caption: "인도네시아로, 복음의 걸음 더하기", tone: "gold", entries: [{ month: "Feb", place: "인도네시아", isFirst: true }, { month: "May", place: "캄보디아" }, { month: "Oct", place: "중국" }] },
  { year: "2017", caption: "미얀마까지, 사역을 넓히며", tone: "gold", entries: [{ month: "Feb", place: "미얀마", isFirst: true }, { month: "May", place: "인도네시아" }, { month: "Oct", place: "중국" }] },
  { year: "2018", caption: "다음 땅을 바라보며", tone: "gold", entries: [{ month: "Feb", place: "인도네시아" }, { month: "May", place: "미얀마" }, { month: "Oct", place: "파라과이", isFirst: true }] },
  { year: "2019", caption: "다시 미얀마로", entries: [{ month: "Feb", place: "인도네시아" }, { month: "May", place: "미얀마" }, { month: "Oct", place: "필리핀" }] },
  { year: "2020-21", caption: "잠시 멈춘 기간", tone: "red", entries: [{ month: "", place: "코로나19로 인해 제한된 선교 중단" }] },
  { year: "2022", caption: "그리움 뒤 다시, 다시", tone: "gold", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "인도네시아" }, { month: "Oct", place: "필리핀" }] },
  { year: "2023", caption: "회복의 걸음을 이어가다", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "인도네시아" }, { month: "Oct", place: "파라과이" }] },
  { year: "2024", caption: "몽골까지, 땅끝을 향해", tone: "gold", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "몽골", isFirst: true }, { month: "Oct", place: "태국" }] },
  { year: "2025", caption: "변함없이, 오늘도", entries: [{ month: "Feb", place: "필리핀" }, { month: "May", place: "태국", isFirst: true }, { month: "Oct", place: "인도네시아" }] },
  { year: "2026", caption: "선교는 계속됩니다", entries: [{ month: "Feb", place: "필리핀" }] },
];

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

function MissionSectionTitle() {
  return (
    <div className="mb-[60px] flex w-full max-w-[540px] flex-col items-start gap-5">
      <div className="flex items-center gap-3">
        <span className="h-px w-[30px] bg-[#8b6db5]" />
        <p className="font-serif text-xs font-normal uppercase leading-none tracking-[0.17em] text-[#8b6db5]">
          Mission History
        </p>
      </div>
      <div className="flex flex-col items-start gap-3">
        <h2 className="font-hahmlet text-[30px] font-semibold uppercase leading-[1.45] tracking-[0.01em] text-[#33103f] md:text-[36px]">
          시온장로교회 선교 이력
        </h2>
        <p className="font-serif text-sm italic leading-none tracking-[0.2em] text-[#8b6db5]">
          The Journey of Faith and Mission
        </p>
      </div>
    </div>
  );
}

function MissionTimelineItem({ item }: { item: MissionYear }) {
  const isGold = item.tone === "gold";
  const isRed = item.tone === "red";
  const yearColor = isRed ? "text-[#b73838]" : isGold ? "text-[#c9a96e]" : "text-[#1e1035]";
  const captionColor = isRed ? "text-[#b73838]" : isGold ? "text-[#b08c49]" : "text-[#7a6890]";

  return (
    <article className="flex w-full flex-col gap-4">
      <header className="flex w-full items-end gap-5 border-b border-[#5d3d8a]/15 pb-3 text-left sm:gap-6">
        <p className={`font-serif text-[32px] font-medium italic leading-none tracking-[0.01em] md:text-[36px] ${yearColor}`}>
          {item.year}
        </p>
        <p className={`pb-1 font-hahmlet text-xs font-normal leading-6 tracking-[0.01em] ${captionColor}`}>
          {item.caption}
        </p>
      </header>
      <div className="w-full">
        {item.entries.map((entry) => (
          <div
            className="flex min-h-[42px] items-center border-t border-[#5d3d8a]/5 py-2 first:border-t-0"
            key={`${item.year}-${entry.month}-${entry.place}`}
          >
            <div className="w-[72px] shrink-0 pl-3 font-serif text-sm uppercase leading-[26px] tracking-[0.01em] text-[#8b6db5] sm:w-[84px]">
              {entry.month}
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isGold ? "bg-[#c9a96e]" : isRed ? "bg-[#b73838]" : "bg-[#8b6db5]"}`} />
              <p className="font-suit text-sm uppercase leading-[1.35] tracking-[0.01em] text-[#4a3b5e]">
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

function MissionGalleryCard({ gallery }: { gallery: MissionGallery }) {
  return (
    <figure className="w-full overflow-hidden">
      <div className="flex h-10 items-center justify-between bg-[#1e1035] px-5 py-3">
        <figcaption className="font-serif text-xs font-medium uppercase leading-none tracking-[0.01em] text-[#c9a96e]">
          {gallery.countries.join(" · ")}
        </figcaption>
        <span className="h-1 w-5 bg-[#c9a96e]" />
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        <div className="relative col-span-2 h-[360px] w-full md:h-[420px]">
          <Image className="object-cover" src={gallery.images[0]} alt={`${gallery.countries.join(", ")} 선교 사진`} fill sizes="(min-width: 1024px) 360px, 100vw" />
        </div>
        <div className="relative h-[180px] w-full md:h-[200px]">
          <Image className="object-cover" src={gallery.images[1]} alt="" fill sizes="(min-width: 1024px) 180px, 50vw" />
        </div>
        <div className="relative h-[180px] w-full md:h-[200px]">
          <Image className="object-cover" src={gallery.images[2]} alt="" fill sizes="(min-width: 1024px) 180px, 50vw" />
        </div>
      </div>
    </figure>
  );
}

function MissionCallout() {
  return (
    <section className="mt-[100px] w-full overflow-hidden rounded bg-[radial-gradient(circle_at_28%_30%,#1f1035_0%,#2e1d46_62%),radial-gradient(circle_at_68%_47%,rgba(153,63,186,0.12),rgba(153,63,186,0)_42%)] px-6 py-10 uppercase md:px-[60px] md:py-[72px]">
      <p className="mb-4 font-serif text-sm leading-none tracking-[0.14em] text-[#c9a96e]">The Mission Continues</p>
      <h3 className="font-hahmlet text-[26px] font-semibold leading-[1.5] tracking-[0.01em] text-white md:text-[32px]">
        변함없는 20년의 선교,
        <br />
        시온장로교회는 오늘도 달려갑니다.
      </h3>
      <p className="mt-6 font-hahmlet text-base font-medium leading-[1.8] tracking-[0.01em] text-white/70 md:text-lg">
        &quot;오직 성령이 너희에게 임하시면 너희가 권능을 받고 예루살렘과 온 유대와 사마리아와 땅 끝까지 이르러 내 증인이 되리라&quot; - 사도행전 1:8
      </p>
    </section>
  );
}

export default function MissionHistoryStaticPage() {
  return (
    <main className="bg-white py-[70px] md:py-[100px]">
      <div className="section-shell section-shell--narrow">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,540px)_360px] lg:gap-[60px]">
          <section>
            <MissionSectionTitle />
            <div className="flex flex-col gap-[60px]">
              {MISSION_HISTORY.map((item) => (
                <MissionTimelineItem item={item} key={item.year} />
              ))}
            </div>
          </section>
          <MissionStickyGalleryRail galleries={MISSION_GALLERIES} />
          <section className="grid gap-10 lg:hidden">
            {MISSION_GALLERIES.map((gallery) => (
              <MissionGalleryCard gallery={gallery} key={`mobile-${gallery.countries.join("-")}`} />
            ))}
          </section>
        </div>
        <MissionCallout />
      </div>
    </main>
  );
}
