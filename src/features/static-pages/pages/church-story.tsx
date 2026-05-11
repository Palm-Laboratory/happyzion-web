type SectionTitleProps = {
  label: string;
  title: string;
  description: string;
};

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

function SectionTitle({ label, title, description }: SectionTitleProps) {
  return (
    <header className="flex w-full max-w-[468px] flex-col items-start gap-5 md:max-w-none">
      <div className="flex items-center gap-3">
        <span className="h-px w-[30px] bg-[#8b6db5]" />
        <p
          className="text-center text-xs uppercase leading-3 tracking-[0.1667em] text-[#8b6db5]"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          {label}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <h2 className="font-hahmlet text-[30px] font-semibold uppercase leading-[1.45] tracking-[0.01em] text-[#33103f] md:whitespace-nowrap md:text-[36px] md:leading-[52px]">
          {title}
        </h2>
        <p
          className="text-center text-sm italic leading-3 tracking-[0.2em] text-[#8b6db5]"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          {description}
        </p>
      </div>
    </header>
  );
}

function FoundationCard() {
  return (
    <aside className="relative h-auto min-h-[320px] w-full shrink-0 overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] px-7 py-9 text-white sm:px-11 sm:py-12 lg:h-[320px] lg:w-[450px]">
      <p
        className="text-center text-sm uppercase leading-[14px] tracking-[0.1429em] text-[#c9a96e]"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        Church Foundation
      </p>
      <h3 className="font-hahmlet mt-2 whitespace-pre-line text-[24px] font-medium uppercase leading-[38px] tracking-[0.01em] text-white">
        {"1997년 7월 1일\n신원당 시영아파트\n14평 가정교회"}
      </h3>
      <p className="font-hahmlet mt-2 whitespace-pre-line text-[18px] font-medium uppercase leading-[30px] tracking-[0.01em] text-white/70">
        하나님의 부르심에 응답하여, 작은 가정에서 시작된 시온장로교회의 첫걸음
      </p>
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
    <section className="flex w-full flex-col items-start gap-[60px]">
      <SectionTitle
        label="The Beginning"
        title="교회 개척과 하나님의 인도하심"
        description="Founded by Faith · Guided by Grace"
      />
      <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,1fr)_450px] lg:gap-[60px]">
        <div className="flex min-w-0 flex-col gap-8 font-suit text-[18px] font-normal uppercase leading-8 tracking-[0.01em] text-black">
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
    <div className="relative flex w-[82px] shrink-0 self-stretch border-r border-[rgba(137,107,149,0.6)] px-6 pt-12">
      <div className="flex w-full flex-col items-center gap-1">
        <p className="font-hahmlet text-sm font-normal uppercase leading-[14px] tracking-[0.01em] text-[#8b6db5]">
          {item.year}
        </p>
        <p className="font-hahmlet text-sm font-normal leading-[14px] tracking-[0.01em] text-[#c5aee0]">
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

function TimelineContent({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <article
      className={`flex min-w-0 flex-1 flex-col items-start gap-5 pb-[60px] pl-6 pt-6 md:pl-10 ${
        isLast ? "" : "border-b border-[rgba(93,61,138,0.15)]"
      }`}
    >
      <p className="font-suit text-xs font-normal uppercase leading-3 tracking-[0.1667em] text-[#c9a96e]">
        {item.place}
      </p>
      <h3 className="font-hahmlet text-[24px] font-medium uppercase leading-[38px] tracking-[0.01em] text-[#33103f]">
        {item.title}
      </h3>
      <p className="font-hahmlet text-[18px] font-normal uppercase leading-[30px] tracking-[0.01em] text-[#4a3b5e]">
        {item.body}
      </p>
      {item.quote ? (
        <blockquote className="relative w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-7 py-6">
          <p className="font-hahmlet relative z-10 text-[18px] font-light uppercase leading-[30px] tracking-[0.01em] text-black">
            “{item.quote}”
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
        <p className="font-hahmlet text-[18px] font-normal uppercase leading-[30px] tracking-[0.01em] text-[#4a3b5e]">
          {item.closing}
        </p>
      ) : null}
    </article>
  );
}

function TimelineSection() {
  return (
    <section className="flex w-full flex-col items-start gap-[60px]">
      <SectionTitle
        label="Church Timeline"
        title="걸어온 길"
        description="A Journey of Faith · 1997 — Present"
      />
      <div className="flex w-full flex-col items-start">
        {timelineItems.map((item, index) => (
          <div className="flex w-full items-start" key={`${item.year}-${item.month ?? "year"}-${item.title}`}>
            <TimelineDate item={item} />
            <TimelineContent item={item} isLast={index === timelineItems.length - 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ClosingCallout() {
  return (
    <section className="relative w-full overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] px-8 py-12 uppercase md:px-[60px] md:py-[72px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(153,63,186,0.12),rgba(153,63,186,0)_52%)]" />
      <div className="relative z-10 flex flex-col items-start gap-4">
        <p
          className="text-center text-sm leading-[14px] tracking-[0.1429em] text-[#c9a96e]"
          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
        >
          God&apos;s Faithfulness
        </p>
        <h2 className="font-hahmlet text-[28px] font-semibold leading-[1.5] tracking-[0.01em] text-white md:text-[32px] md:leading-[48px]">
          부흥은 멀리 있지 않습니다.
          <br />
          당신이 여기 있는 것이, 그 시작입니다.
        </h2>
        <p className="font-hahmlet text-[18px] font-medium leading-[30px] tracking-[0.01em] text-white/70">
          지난 30년의 걸음 하나하나가 하나님의 인도하심이었습니다.
          <br />
          작은 14평 가정에서 시작된 교회가 오늘도 사람을 살리는 사역을 이어가고 있습니다.
        </p>
      </div>
    </section>
  );
}

export default function ChurchStoryStaticPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-start gap-[100px] px-4 pb-[200px] pt-[100px] md:px-8 lg:px-0">
        <BeginningSection />
        <div className="h-px w-full bg-[rgba(93,61,138,0.15)]" />
        <TimelineSection />
        <ClosingCallout />
      </div>
    </main>
  );
}
