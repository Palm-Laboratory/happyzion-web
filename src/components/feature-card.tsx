type FeatureCardProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function FeatureCard({ eyebrow, title, body }: FeatureCardProps) {
  return (
    <article className="surface-card rounded-[28px] p-6 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/55">{eyebrow}</p>
      <h3 className="type-card-title mt-3 text-ink">{title}</h3>
      <p className="type-body mt-3 text-ink/72">{body}</p>
    </article>
  );
}
