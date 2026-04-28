type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-forest/10 bg-gradient-to-br from-[#f6f5f0] via-[#fbfaf6] to-[#efe8d7]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="type-label font-semibold uppercase tracking-[0.24em] text-forest/60">{eyebrow}</p>
        <h1 className="type-page-title mt-4 max-w-3xl text-ink">{title}</h1>
        <p className="type-body mt-5 max-w-2xl text-ink/72">{description}</p>
      </div>
    </section>
  );
}
