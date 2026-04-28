type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
};

export default function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-forest/60">{eyebrow}</p>
      <h2 className="type-section-title text-ink">{title}</h2>
      {body ? <p className="type-body text-ink/72">{body}</p> : null}
    </div>
  );
}
