"use client";

import { useState } from "react";

const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export type MajorGroup = {
  major: string;
  total: number;
  minors: { minor: string; amount: number }[];
};

function AccordionRow({ group }: { group: MajorGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className="cursor-pointer border-b border-[#f1f5fb] transition-colors hover:bg-[#f8fafd]"
        onClick={() => setOpen((v) => !v)}
      >
        <td className="px-5 py-3 text-[#5d6f86]">{group.major}</td>
        <td className="px-5 py-3 text-right tabular-nums text-[#0f1c2e]">{WON(group.total)}</td>
        <td className="w-8 pr-4 text-[#c8d6e8]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          >
            <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </td>
      </tr>

      {open && group.minors.map((m) => (
        <tr key={m.minor} className="border-b border-[#f1f5fb] bg-[#fafbfd] last:border-b-0">
          <td className="py-2 pl-12 pr-5 text-[12px] text-[#7a8ea8]">{m.minor}</td>
          <td className="py-2 pl-5 pr-5 text-right text-[12px] tabular-nums text-[#5d6f86]">{WON(m.amount)}</td>
          <td className="w-8" />
        </tr>
      ))}
    </>
  );
}

export default function FinanceBreakdownAccordion({
  title,
  groups,
  total,
  totalColor,
}: {
  title: string;
  groups: MajorGroup[];
  total: number;
  totalColor: string;
}) {
  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
      <div className="border-b border-[#e7eef7] px-5 py-3.5">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">{title}</h2>
      </div>
      <div className="flex-1">
        <table className="w-full text-[13px]">
          <tbody>
            {groups.map((g) => (
              <AccordionRow key={g.major} group={g} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[#dbe4f0] bg-[#f8fafd] py-3 pl-5 pr-[48px]">
        <span className="text-[13px] font-bold text-[#0f1c2e]">합계</span>
        <span className="text-[13px] font-bold tabular-nums" style={{ color: totalColor }}>{WON(total)}</span>
      </div>
    </section>
  );
}
