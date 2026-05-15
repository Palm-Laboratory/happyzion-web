import type { ReactNode } from "react";

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-[13px] font-bold text-[#0f1c2e]">
        <span className="h-4 w-1 rounded bg-[#3f74c7]" />
        {title}
      </h3>
      {children}
    </section>
  );
}

export function InfoGrid({
  items,
}: {
  items: Array<{ label: string; value: string; span?: 1 | 2 }>;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className={`flex flex-col gap-1 ${item.span === 2 ? "col-span-2" : ""}`}>
          <span className="text-[11px] text-[#8fa3bb]">{item.label}</span>
          <span className="text-[13px] text-[#0f1c2e]">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d5deea] bg-[#fafcff] px-4 py-6 text-center text-[12px] text-[#8fa3bb]">
      {title}
    </div>
  );
}
