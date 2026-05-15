export function MobileTabButton({
  direction,
  onClick,
  tone = "dark",
}: {
  direction: "previous" | "next";
  onClick: () => void;
  tone?: "dark" | "light";
}) {
  const buttonClass =
    tone === "dark"
      ? "border-[#c9a96e]/45 text-[#c9a96e] focus-visible:outline-[#c9a96e]/70"
      : "border-[#5d3d8a]/25 text-[#340653] focus-visible:outline-[#340653]/45";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-8 shrink-0 items-center justify-center border text-sm leading-none [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden ${buttonClass}`}
      aria-label={direction === "previous" ? "이전 탭" : "다음 탭"}
    >
      {direction === "previous" ? "<" : ">"}
    </button>
  );
}

export function ContentHeaderIndicator({
  activeIndex,
  count,
  tone = "dark",
}: {
  activeIndex: number;
  count: number;
  tone?: "dark" | "light";
}) {
  const activeClass = tone === "dark" ? "bg-[#c9a96e]" : "bg-[#340653]";
  const inactiveClass = tone === "dark" ? "bg-[#c9a96e]/30" : "bg-[#340653]/25";

  return (
    <div className="flex items-center gap-1.5 lg:hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${index === activeIndex ? activeClass : inactiveClass}`}
        />
      ))}
    </div>
  );
}

export function MinistryTitle({ title }: { title: string }) {
  const [firstPart, ...restParts] = title.split("·");

  if (restParts.length === 0) {
    return <>{title}</>;
  }

  return (
    <>
      {firstPart}
      {restParts.map((part) => (
        <span className="inline-block" key={part}>
          ·{part}
        </span>
      ))}
    </>
  );
}
