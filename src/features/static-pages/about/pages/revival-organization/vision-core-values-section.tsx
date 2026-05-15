import SectionHeading from "@/components/section-heading";

import { coreValues } from "./revival-data";

function VisionQuote() {
  return (
    <div className="relative w-full overflow-hidden border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-8 py-10 md:px-[60px] md:py-12">
      <p className="font-hahmlet relative z-10 text-[20px] font-normal uppercase leading-[1.85rem] tracking-[1px] text-black xl:whitespace-nowrap">
        {"\u201c복음으로 행하고, 말씀으로 성장하며, 사랑으로 세상을 변화시키는 교회\u201d"}
      </p>
      <p
        className="pointer-events-none absolute left-[19px] top-[-11px] h-[160px] w-[46px] text-[120px] leading-[120px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        &quot;
      </p>
      <p
        className="pointer-events-none absolute left-[min(724px,74%)] top-[38px] text-[96px] leading-[96px] text-[#c5aee0]/30"
        style={{ fontFamily: "var(--font-estonia), cursive" }}
      >
        VISION
      </p>
    </div>
  );
}

function CoreValueCard({
  number,
  title,
  description,
  className = "",
}: {
  number: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article className={`flex flex-col items-start px-5 py-6 shadow-[0_6px_9px_rgba(0,0,0,0.15)] [background-image:linear-gradient(171.1deg,#473367_3.35%,#413553_89.92%)] sm:min-h-[170px] ${className}`}>
      <div className="flex w-full flex-col items-start gap-3">
        <p
          className="w-full text-[32px] italic leading-8 text-[#c9a96e]"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <div className="flex w-full flex-col items-start gap-[14px]">
          <h2 className="font-hahmlet text-[20px] font-normal leading-5 text-white">{title}</h2>
          <p className="font-suit text-sm leading-[22px] text-white/70">{description}</p>
        </div>
      </div>
    </article>
  );
}

function CoreValueAccordion() {
  return (
    <div className="flex w-full flex-col gap-5 md:hidden">
      <h3 className="font-hahmlet text-xl font-semibold leading-6 tracking-[0.01em] text-[#1e1035]">
        5대 핵심가치
      </h3>
      <div className="w-full border-y border-[#33103f]/10">
        {coreValues.map((value) => (
          <article
            key={value.number}
            className="grid grid-cols-[38px_96px_minmax(0,1fr)] items-start gap-4 border-b border-[#33103f]/10 py-5 last:border-b-0"
          >
            <p
              className="text-[24px] italic leading-none text-[#c9a96e]"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              {value.number}
            </p>
            <h3 className="font-hahmlet text-base font-medium leading-6 tracking-[0.01em] text-[#1e1035]">
              {value.title}
            </h3>
            <p className="font-suit text-sm leading-6 tracking-[0.01em] text-[#4a3b5e]/68">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function VisionCoreValuesSection() {
  return (
    <section className="bg-white pb-24 pt-20 md:pb-[200px] md:pt-[100px]">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-[60px]">
        <SectionHeading
          label="Vision & Core Values"
          title="교회 비전 · 5대 핵심가치"
          description="What We Believe · What We Pursue"
          titleAs="h1"
        />

        <div className="flex w-full flex-col items-start gap-20">
          <div className="flex w-full flex-col items-start gap-10">
            <VisionQuote />
            <div className="font-suit w-full max-w-[900px] text-[18px] font-normal uppercase leading-[30px] tracking-[0.01em] text-[#4a3b5e]">
              <p>
                시온교회는 복음의 기쁨이 넘치는 공동체를 만들어 지역사회와 열방을 섬기는
                <br className="hidden min-[581px]:block" /> 부흥하는 교회로 성장하기를 비전으로
                삼습니다.
              </p>
            </div>
          </div>

          <CoreValueAccordion />

          <div className="hidden w-full gap-0.5 md:grid md:grid-cols-6 lg:grid-cols-5">
            {coreValues.map((value, index) => (
              <CoreValueCard
                key={value.number}
                {...value}
                className={`${index === 4 ? "sm:col-span-2 md:col-span-3" : index < 3 ? "md:col-span-2" : "md:col-span-3"} lg:col-span-1`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
