import SectionHeading from "@/components/section-heading";

type TimelineItem = {
  year: string;
  month?: string;
  place: string;
  title: string;
  body: string;
  quote?: string;
  closing?: string;
  current?: boolean;
};

const beginningParagraphs = [
  "본 교회는 하나님의 부르심과 응답 속에서 시작된 교회입니다. 1997년 초, 하나님 앞에 간절히 기도하는 가운데 교회 개척에 대한 확신을 얻게 되었고, 하나님의 인도하심을 따라 1997년 7월 1일 신원당 시영아파트 14평형 가정에서 교회를 개척하게 되었습니다.",
  "가정에서 시작한 교회였기에 마음껏 기도하기도, 찬양하기도, 예배드리기도 쉽지 않은 환경이었습니다. 그러나 하나님께서는 작은 공간 속에서도 교회를 세워가게 하셨고, 더 넓은 사역의 길을 열어 주셨습니다.",
];

const timelineItems: TimelineItem[] = [
  {
    year: "1997",
    month: "Jul.",
    place: "신원당 시영아파트 · 14평",
    title: "교회 개척",
    body: "하나님의 부르심과 응답 속에서 14평 가정에서 교회를 개척했습니다. 마음껏 기도하기도, 찬양하기도 쉽지 않은 환경이었지만, 하나님께서는 작은 공간 속에서도 교회를 세워가게 하셨습니다.",
  },
  {
    year: "1997",
    month: "Nov.",
    place: "성사동 지하 · 40평",
    title: "첫 번째 이전",
    body: "기도 가운데 하나님께서 길을 열어 주셔서 성사동 지하 40평 공간으로 교회와 사택을 이전하게 되었습니다. 곰팡이와 습기가 심한 환경이었고 여러 가지 어려움이 따랐습니다. 그럼에도 불구하고 하나님께서는 그곳에서 2001년까지 교회를 지키며 사역할 수 있도록 은혜를 베풀어 주셨습니다.",
  },
  {
    year: "2001",
    place: "주교동 3층 · 40평",
    title: "두 번째 이전",
    body: "건물주의 요청으로 교회를 비워야 하는 상황이 찾아왔습니다. 당시 보증금 3,500만 원을 가지고 기도하며 새로운 장소를 찾던 가운데, 하나님께서 주교동 3층 40평 공간을 허락해 주셔서 교회와 사택을 함께 이전하게 되었습니다.",
  },
  {
    year: "2003",
    month: "Aug.",
    place: "성사동 미도상가 3층 · 30평 + 30평",
    title: "세 번째 이전 — 믿음의 기도",
    body: "약 2년의 시간이 지난 후, 다시 건물주의 사정으로 교회를 옮겨야 하는 상황이 되었습니다. 당시 보증금 3,300만 원 정도로는 지하 외에는 교회를 얻기 어려운 현실이었습니다.",
    quote: "하나님, 목사의 장기를 떼어서 팔아서라도 교회는 세워야 하겠습니다.",
    closing:
      "그 절박한 기도에 하나님께서 놀라운 은혜를 베풀어 주셨습니다. 성사동 미도상가 3층에 30평 교회, 30평 사택 및 교육관을 사용할 수 있도록 길을 열어 주셨습니다.",
  },
  {
    year: "2011",
    month: "Nov.",
    place: "현재 예배 처소 · 주교동",
    title: "현재의 자리로 — 하나님의 최종 인도",
    body: "뉴타운 개발 계획이 시작되면서 교회가 다시 이전해야 할 상황이 되었습니다. 어디로 가야 할지 몰라 방황하는 상황 속에서도 하나님께 기도하며 인도하심을 구했습니다. 마침내 2011년 11월 7일, 현재의 주교동 교회로 이전하게 되었고, 지금까지 하나님의 은혜 가운데 사역을 이어오고 있습니다.",
    current: true,
  },
];

function FoundationCard() {
  return (
    <aside className="relative h-auto w-full shrink-0 overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] p-pad-lg md:p-pad-xxl lg:p-pad-4xl text-left text-white lg:h-[320px] lg:w-[450px]">
      <div className="flex flex-col gap-comp-base">
        <p className="type-label-lg text-[#c9a96e]">Church Foundation</p>
        <h3 className="type-title-md md:type-title-lg whitespace-pre-line text-white">
          {"1997년 7월 1일\n신원당 시영아파트 (14평 가정교회)"}
        </h3>
        <p className="type-body-sm md:type-body-md whitespace-pre-line font-medium text-white/80">
          하나님의 부르심에 응답하여, 작은 가정에서 시작된 시온장로교회의 첫걸음
        </p>
      </div>
      <p
        className="pointer-events-none absolute bottom-0 right-0 translate-y-[0.14em] text-[120px] italic leading-[0.78] text-white/10 [font-variant-numeric:lining-nums_tabular-nums]"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        aria-hidden="true"
      >
        1997
      </p>
    </aside>
  );
}

function BeginningSection() {
  return (
    <section className="flex w-full flex-col items-start gap-layout-lg lg:gap-layout-xl">
      <SectionHeading
        label="The Beginning"
        title={
          <>
            교회 개척과
            <br className="min-[423px]:hidden" />
            <span className="hidden min-[423px]:inline"> </span>
            하나님의 인도하심
          </>
        }
        description="Founded by Faith · Guided by Grace"
        className="md:max-w-none [&_h2]:md:whitespace-nowrap"
      />
      <div className="grid w-full items-start gap-layout-lg lg:grid-cols-[minmax(0,1fr)_450px] lg:gap-layout-xl">
        <div className="type-body-sm md:type-body-md flex min-w-0 flex-col gap-layout-md text-[#4A3B5E]">
          {beginningParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <FoundationCard />
      </div>
    </section>
  );
}

function TimelineDate({ item }: { item: TimelineItem }) {
  return (
    <div className="relative flex w-[82px] shrink-0 self-stretch border-r border-[#8b6db5]/60 pl-0 pr-pad-md pt-pad-4xl md:px-pad-md">
      <div className="flex w-full flex-col items-center gap-comp-xxs">
        <p className="type-label-lg font-hahmlet font-medium text-[#8b6db5]">
          {item.year}
        </p>
        <p className="type-label-lg font-hahmlet font-medium normal-case text-[#e3bfff]">
          {item.month ?? "\u00a0"}
        </p>
      </div>
      <span
        className={`absolute top-[49px] rounded-full bg-[#8b6db5] ${
          item.current
            ? "left-[76px] size-3 shadow-[0_0_0_3px_rgba(139,109,181,0.18)]"
            : "left-[78px] size-2"
        }`}
      />
    </div>
  );
}

function TimelineTitle({ title }: { title: string }) {
  const [firstLine, secondLine] = title.split(" — ");

  if (!secondLine) {
    return <>{title}</>;
  }

  return (
    <>
      {firstLine} <span className="inline-block">— {secondLine}</span>
    </>
  );
}

function TimelinePlace({ place }: { place: string }) {
  const [firstPart, ...restParts] = place.split(" · ");

  if (restParts.length === 0) {
    return <>{place}</>;
  }

  return (
    <>
      {firstPart}{" "}
      {restParts.map((part) => (
        <span className="inline-block" key={part}>
          · {part}
        </span>
      ))}
    </>
  );
}

function TimelineContent({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  return (
    <article
      className={`flex min-w-0 flex-1 flex-col items-start gap-comp-lg pb-pad-4xl pl-pad-md pt-pad-md md:pl-pad-xxl ${
        isLast ? "" : "border-b border-[#5d3d8a/15]"
      }`}
    >
      <div className="flex flex-col gap-comp-sm">
        <p className="type-label-lg text-[#c9a96e]">
          <TimelinePlace place={item.place} />
        </p>
        <h3 className="type-title-lg md:type-title-xl font-medium text-[#250030]">
          <TimelineTitle title={item.title} />
        </h3>
      </div>
      <p className="type-body-sm text-[#4a3b5e]">{item.body}</p>
      {item.quote ? (
        <blockquote className="relative w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-pad-base py-pad-md">
          <p className="type-quote-sm md:type-quote-md relative z-10 text-[#33103f]">
            "{item.quote}"
          </p>
          <span
            className="absolute left-[19px] top-[-11px] text-[84px] leading-[84px] text-[#4d1367]/10"
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            aria-hidden="true"
          >
            &quot;
          </span>
        </blockquote>
      ) : null}
      {item.closing ? (
        <p className="type-body-sm text-[#4a3b5e]">{item.closing}</p>
      ) : null}
    </article>
  );
}

function TimelineSection() {
  return (
    <section className="flex w-full flex-col items-start gap-layout-lg lg:gap-layout-xl">
      <SectionHeading
        label="Church Timeline"
        title="걸어온 길"
        description="A Journey of Faith · 1997 — Present"
        className="md:max-w-none [&_h2]:md:whitespace-nowrap"
      />
      <div className="flex w-full flex-col items-start">
        {timelineItems.map((item, index) => (
          <div
            className="flex w-full items-start"
            key={`${item.year}-${item.month ?? "year"}-${item.title}`}
          >
            <TimelineDate item={item} />
            <TimelineContent
              item={item}
              isLast={index === timelineItems.length - 1}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ClosingCallout() {
  return (
    <section className="relative w-full overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] p-pad-lg md:p-pad-xxl lg:p-pad-4xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(153,63,186,0.12),rgba(153,63,186,0)_52%)]" />
      <div className="relative z-10 flex flex-col items-start gap-comp-base">
        <p className="type-label-lg text-[#c9a96e]">God&apos;s Faithfulness</p>
        <h2 className="type-title-md md:type-title-lg text-white">
          부흥은 멀리 있지 않습니다. 당신이 여기 있는 것이, 그 시작입니다.
        </h2>
        <div className="flex flex-col gap-comp-xxs">
          <p className="type-body-sm md:type-body-md font-medium text-white/80">
            지난 30년의 걸음 하나하나가 하나님의 인도하심이었습니다.
          </p>
          <p className="type-body-sm md:type-body-md font-medium text-white/80">
            작은 14평 가정에서 시작된 교회가 오늘도 사람을 살리는 사역을 이어가고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ChurchStoryStaticPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-section-sm pb-section-xl pt-section-sm md:gap-section-md md:pb-section-xxl md:pt-section-md lg:gap-section-lg lg:pb-section-3xl lg:pt-section-lg">
        <BeginningSection />
        <div className="h-px w-full bg-[#5d3d8a/15]" />
        <TimelineSection />
        <ClosingCallout />
      </div>
    </main>
  );
}
