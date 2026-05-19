import SectionHeading from "@/components/section-heading";
import { CHURCH_EMAIL, CHURCH_PHONE } from "@/lib/site-config";

const newcomerIntroParagraphs = [
  "행복이 가득한 시온장로교회는 예수 그리스도의 복음으로 한 영혼을 살리고, 교회 공동체 안에서 믿음의 뿌리를 내리도록 돕습니다.",
  "처음 오신 분들이 예배와 소그룹, 제자양육의 흐름 안에서 자연스럽게 정착할 수 있도록 새가족 안내와 돌봄 과정을 준비하고 있습니다.",
] as const;

const coreValues = [
  { number: "01", title: "예배", description: ["하나님의 임재를", "경험하는 공동체"] },
  { number: "02", title: "복음", description: ["사람을 살리는", "복음의 능력"] },
  { number: "03", title: "교제", description: ["서로를 세우는", "믿음의 가족"] },
  { number: "04", title: "양육", description: ["말씀 안에서 자라는", "제자의 삶"] },
  { number: "05", title: "선교", description: ["세상으로 흘려보내는", "복음의 사명"] },
] as const;

const gettingStartedSteps = [
  {
    number: "01",
    title: "첫 방문",
    details: ["주일 예배 참석", "새가족 환영", "교회 안내"],
  },
  {
    number: "02",
    title: "새가족 등록",
    details: ["등록 카드 작성", "담당자 연결", "기초 상담"],
  },
  {
    number: "03",
    title: "새가족 양육",
    details: ["교회 비전 안내", "신앙 기초 과정", "소그룹 연결"],
  },
  {
    number: "04",
    title: "공동체 정착",
    details: ["셀 모임 참여", "예배 생활 안내", "돌봄과 교제"],
  },
  {
    number: "05",
    title: "제자양육 시작",
    details: ["성장 과정 안내", "섬김 사역 연결", "제자의 삶 훈련"],
  },
] as const;

const newcomerFaqItems = [
  {
    question: "처음 방문해도 바로 예배에 참석할 수 있나요?",
    answer:
      "네. 예배 시간에 맞춰 오시면 안내팀이 예배 장소와 좌석을 도와드립니다. 예배 후에는 새가족 안내를 받으실 수 있습니다.",
  },
  {
    question: "새가족 등록은 어떻게 하나요?",
    answer:
      "예배 후 안내 데스크 또는 담당 교역자를 통해 등록하실 수 있습니다. 등록 후 교회 생활과 양육 과정에 대한 안내를 받게 됩니다.",
  },
  {
    question: "새가족 양육은 꼭 받아야 하나요?",
    answer:
      "교회 공동체를 이해하고 신앙의 기초를 세우는 과정이므로 권해드립니다. 부담 없이 참여하실 수 있도록 담당자가 일정을 안내합니다.",
  },
  {
    question: "신앙이 처음이어도 참여할 수 있나요?",
    answer:
      "물론입니다. 새가족 안내와 양육 과정은 신앙이 처음인 분도 이해할 수 있도록 복음과 교회 생활의 기초부터 함께 나눕니다.",
  },
  {
    question: "가족이나 친구와 함께 방문해도 되나요?",
    answer:
      "네. 가족, 친구와 함께 오셔도 좋습니다. 함께 오신 분들도 동일하게 예배와 새가족 안내를 받으실 수 있습니다.",
  },
] as const;

function ScriptureQuoteCard() {
  return (
    <aside className="relative w-full border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-7 py-6">
      <p className="type-quote-md relative z-10 text-[#33103f]">
        &quot;그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의
        이름으로 세례를 베풀고 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라&quot;
      </p>
      <p className="type-quote-xs relative z-10 mt-4 text-[#510a75]">
        마태복음 28:19-20
      </p>
      <span
        aria-hidden="true"
        className="absolute left-[19px] top-[-11px] text-[84px] leading-[84px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
      >
        &quot;
      </span>
    </aside>
  );
}

function CoreValueList() {
  return (
    <div className="flex w-full flex-col gap-5">
      <h3 className="type-title-md text-[#33103f]">
        5대 핵심가치
      </h3>
      <div className="w-full border-y border-[#8b6db5]/12">
        {coreValues.map((value) => (
          <article
            key={value.number}
            className="grid grid-cols-[38px_72px_minmax(0,1fr)] items-start gap-4 border-b border-[#8b6db5]/12 py-5 last:border-b-0"
          >
            <p
              className="type-counter-md text-[#e4b96b]"
            >
              {value.number}
            </p>
            <h3 className="type-title-sm font-medium leading-none text-[#33103f]">
              {value.title}
            </h3>
            <div className="type-body-xs font-suit flex flex-col gap-1 text-[#6F5576]">
              {value.description.map((line, i) => (
                <p key={i}>· {line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TimelineStep({
  number,
  title,
  details,
  surfaceClassName,
  isFirst,
  isLast,
}: {
  number: string;
  title: string;
  details: readonly string[];
  surfaceClassName: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <article className="relative pl-16">
      {!isFirst ? (
        <div className="absolute bottom-1/2 left-[28.5px] top-[-16px] w-px bg-[#8b6db5]/18" />
      ) : null}
      {!isLast ? (
        <div className="absolute bottom-[-16px] left-[28.5px] top-1/2 w-px bg-[#8b6db5]/18" />
      ) : null}
      <div className="absolute left-2 top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#e4b96b] bg-[#2a123c]">
        <span
          className="type-counter-sm -translate-y-[2px] font-black text-[#e4b96b]"
        >
          {number}
        </span>
      </div>
      <div className={`rounded-[8px] px-4 py-4 md:px-6 md:py-[18px] ${surfaceClassName}`}>
        <h3 className="type-title-xs text-[#33103f]">
          {title}
        </h3>
        <p className="type-body-xs mt-2 text-[#6F5576]">
          {details.join(" · ")}
        </p>
      </div>
    </article>
  );
}

function FaqList() {
  return (
    <div className="border-t border-[#8b6db5]/18">
      {newcomerFaqItems.map((item) => (
        <details key={item.question} className="group border-b border-[#8b6db5]/18 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:hidden md:min-h-[5.1rem] md:py-5 [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="shrink-0 type-body-xs font-semibold leading-[2.0] text-[#e4b96b]">
                Q.
              </span>
              <h3 className="type-title-sm font-suit font-medium text-[#33103f]">
                {item.question}
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="flex h-5 w-5 shrink-0 items-center justify-center text-xl leading-none text-[#e4b96b] group-open:text-[#33103f]/58"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">x</span>
            </span>
          </summary>

          <div className="pb-5 pr-10 md:pb-6">
            <div className="flex items-start gap-2 md:gap-3">
              <span className="shrink-0 type-body-xs font-semibold leading-[2.0] text-[#e4b96b]">
                A.
              </span>
              <p className="type-body-xs md:type-body-sm text-[#6F5576]">
                {item.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function ContactSection() {
  return (
    <section aria-labelledby="newcomer-contact-title">
      <div className="rounded-[8px] bg-[#2a123c] px-6 py-8 md:flex md:items-end md:justify-between md:px-9 md:py-9">
        <div className="flex flex-col gap-4">
          <div>
            <p className="type-label-md font-semibold text-[#e4b96b]">
              Contact
            </p>
            <h2
              id="newcomer-contact-title"
              className="type-title-xl mt-1 font-bold text-white"
            >
              문의
            </h2>
          </div>

          <div className="type-body-md flex flex-col gap-1">
            <p>
              <span className="font-bold text-[#e4b96b]">담당</span>
              <span className="ml-2 text-white">새가족 안내팀</span>
            </p>
            <p>
              <span className="font-bold text-[#e4b96b]">전화</span>
              <span className="ml-2 text-white">{CHURCH_PHONE}</span>
            </p>
            <p>
              <span className="font-bold text-[#e4b96b]">이메일</span>
              <span className="ml-2 text-white">{CHURCH_EMAIL}</span>
            </p>
            <p>
              <span className="font-bold text-[#e4b96b]">신청</span>
              <span className="ml-2 text-white">예배 후 안내 데스크 또는 담당 교역자 문의</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DiscipleshipGuideStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-10 pb-20 md:pt-[60px] md:pb-[100px]">
      <div className="flex flex-col gap-20">
        <section aria-labelledby="newcomer-intro-title" className="flex flex-col gap-8">
          <SectionHeading
            id="newcomer-intro-title"
            label="newcomer"
            title="새가족 안내"
            description="Newcomer Guide"
            titleAs="h1"
          />

          <ScriptureQuoteCard />

          <div className="w-full">
            {newcomerIntroParagraphs.map((paragraph) => (
              <p key={paragraph} className="type-body-md text-[#4A3B5E]">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="newcomer-vision-title" className="flex flex-col gap-8">
          <SectionHeading
            id="newcomer-vision-title"
            label="church vision"
            title="행복이 가득한 시온교회는?"
            className="max-w-none"
          />

          <div className="flex flex-col gap-10">
            <p className="type-body-md max-w-[787px] text-[#4A3B5E]">
              우리는 복음으로 사람을 살리고, 성령의 임재 안에서 예배하며, 다음세대와 열방을
              향해 나아가는 교회입니다.
            </p>

            <CoreValueList />
          </div>
        </section>

        <section aria-labelledby="newcomer-getting-started-title" className="flex flex-col gap-8">
          <SectionHeading
            id="newcomer-getting-started-title"
            label="getting started"
            title="새가족을 위한 안내"
            className="max-w-none"
          />

          <div className="space-y-4 md:space-y-4">
            {gettingStartedSteps.map((step, index) => (
              <TimelineStep
                key={step.number}
                {...step}
                surfaceClassName={index % 2 === 1 ? "bg-white" : "bg-[#f5f0f9]"}
                isFirst={index === 0}
                isLast={index === gettingStartedSteps.length - 1}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="newcomer-faq-title" className="flex flex-col gap-8">
          <SectionHeading
            id="newcomer-faq-title"
            label="faq"
            title="자주 묻는 질문"
            className="max-w-none"
          />
          <FaqList />
        </section>

        <ContactSection />
      </div>
    </main>
  );
}
