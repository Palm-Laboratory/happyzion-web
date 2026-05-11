/*
페이지 섹션 별 헤딩 컴포넌트
*/
import type { HTMLAttributes } from "react";

type SectionHeadingTitleTag = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  titleAs?: SectionHeadingTitleTag;
} & HTMLAttributes<HTMLDivElement>;

function SectionHeadingEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-[30px] shrink-0 bg-[#8b6db5]" />
      <p
        className="text-sm uppercase leading-none tracking-[0.18em] text-[#8b6db5]"
        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
      >
        {label}
      </p>
    </div>
  );
}

function SectionHeadingTitle({
  title,
  titleAs = "h2",
}: {
  title: string;
  titleAs?: SectionHeadingTitleTag;
}) {
  const TitleTag = titleAs;

  return (
    <TitleTag className="font-hahmlet text-[30px] font-semibold uppercase leading-[1.45] tracking-[0.01em] text-[#33103f] md:text-[40px] md:leading-[52px]">
      {title}
    </TitleTag>
  );
}

function SectionHeadingDescription({ description }: { description: string }) {
  return (
    <p
      className="mt-3 text-base italic leading-none tracking-[0.2em] text-[#8b6db5]"
      style={{ fontFamily: "var(--font-cormorant-infant), serif" }}
    >
      {description}
    </p>
  );
}

export default function SectionHeading({
  label,
  title,
  description,
  titleAs = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={`max-w-[468px] ${className ?? ""}`} {...props}>
      <SectionHeadingEyebrow label={label} />
      <div className="mt-5">
        <SectionHeadingTitle title={title} titleAs={titleAs} />
        {description ? <SectionHeadingDescription description={description} /> : null}
      </div>
    </div>
  );
}
