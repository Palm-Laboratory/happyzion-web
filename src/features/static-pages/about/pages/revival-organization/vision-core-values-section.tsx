import SectionHeading from "@/components/section-heading";

import { coreValues } from "./revival-data";

function VisionQuote() {
  return (
    <div className="relative w-full overflow-hidden border-l-[3px] border-[#510a75] bg-[#f5f0f9] px-pad-lg py-pad-xxl md:px-pad-4xl md:py-pad-4xl">
      <p className="type-quote-md relative z-10 text-[#33103f]">
        {
          "\u201c복음으로 행하고, 말씀으로 성장하며, 사랑으로 세상을 변화시키는 교회\u201d"
        }
      </p>
      <p
        className="pointer-events-none absolute left-[19px] top-[-11px] h-[160px] w-[46px] text-[120px] leading-[120px] text-[#4d1367]/10"
        style={{ fontFamily: "var(--font-cormorant), serif" }}
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
    <article
      className={`flex flex-col items-start px-pad-sm py-pad-md shadow-[0_6px_9px_rgba(0,0,0,0.15)] [background-image:linear-gradient(171.1deg,#473367_3.35%,#413553_89.92%)] sm:min-h-[170px] ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-comp-md">
        <p
          className="w-full text-[32px] italic leading-8 text-[#c9a96e]"
          style={{ fontFamily: "var(--font-corinthia), cursive" }}
        >
          {number}
        </p>
        <div className="flex w-full flex-col items-start gap-comp-md">
          <h2 className="type-title-md font-normal text-white">{title}</h2>
          <p className="type-body-xs text-white/80">{description}</p>
        </div>
      </div>
    </article>
  );
}

function CoreValueAccordion() {
  return (
    <div className="flex w-full flex-col gap-comp-lg md:hidden">
      <h3 className="type-title-lg text-[#33103f]">5대 핵심가치</h3>
      <div className="border-[#8b6db5]/12 w-full border-y">
        {coreValues.map((value) => (
          <article
            key={value.number}
            className="border-[#8b6db5]/12 grid grid-cols-[38px_96px_minmax(0,1fr)] items-start gap-comp-base border-b py-pad-sm last:border-b-0"
          >
            <p
              className="text-[24px] italic leading-none text-[#c9a96e]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {value.number}
            </p>
            <h3 className="type-title-xs text-[#33103f]">{value.title}</h3>
            <p className="type-body-xs text-[#4a3b5e]">{value.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function VisionCoreValuesSection() {
  return (
    <section className="bg-white py-section-sm md:py-section-md lg:py-section-lg">
      <div className="section-shell section-shell--narrow flex flex-col items-start gap-layout-lg lg:gap-layout-xl">
        <SectionHeading
          label="Vision & Core Values"
          title="교회 비전 · 5대 핵심가치"
          description="What We Believe · What We Pursue"
          titleAs="h1"
        />

        <div className="flex w-full flex-col items-start gap-layout-xl lg:gap-layout-xxl">
          <div className="flex w-full flex-col items-start gap-layout-md">
            <VisionQuote />
            <div className="type-body-md w-full max-w-[900px] text-[#4a3b5e]">
              <p>
                시온교회는 복음의 기쁨이 넘치는 공동체를 만들어 지역사회와
                열방을 섬기는
                <br className="hidden min-[581px]:block" /> 부흥하는 교회로
                성장하기를 비전으로 삼습니다.
              </p>
            </div>
          </div>

          <CoreValueAccordion />

          <div className="hidden w-full gap-layout-xs md:grid md:grid-cols-6 lg:grid-cols-5">
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
