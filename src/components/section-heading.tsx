/*
페이지 섹션 별 헤딩 컴포넌트
*/
import type { HTMLAttributes, ReactNode } from "react";

type SectionHeadingTitleTag = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  titleAs?: SectionHeadingTitleTag;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

function SectionHeadingEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-comp-md">
      <span className="mt-[8px] h-px w-[30px] shrink-0 bg-[#8b6db5]" />
      <p className="type-label-lg text-[#8b6db5]">{label}</p>
    </div>
  );
}

function SectionHeadingTitle({
  title,
  titleAs = "h2",
}: {
  title: ReactNode;
  titleAs?: SectionHeadingTitleTag;
}) {
  const TitleTag = titleAs;

  return (
    <TitleTag className="type-heading-md text-[#250030]">{title}</TitleTag>
  );
}

function SectionHeadingDescription({
  description,
}: {
  description: ReactNode;
}) {
  return (
    <p className="type-subtitle-sm italic text-[#8b6db5]">{description}</p>
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
    <div
      className={`flex max-w-[468px] flex-col gap-comp-lg ${className ?? ""}`}
      {...props}
    >
      <SectionHeadingEyebrow label={label} />
      <div className="flex flex-col gap-comp-sm">
        <SectionHeadingTitle title={title} titleAs={titleAs} />
        {description ? (
          <SectionHeadingDescription description={description} />
        ) : null}
      </div>
    </div>
  );
}
