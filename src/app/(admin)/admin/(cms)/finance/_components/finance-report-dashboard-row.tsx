"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import type { FinanceReportSummary } from "@/lib/admin-finance-types";

const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function formatUploadedAt(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FinanceReportDashboardRow({ report }: { report: FinanceReportSummary }) {
  const router = useRouter();
  const href = `/admin/finance/${report.id}`;

  const openReport = () => {
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openReport();
    }
  };

  return (
    <tr
      role="link"
      tabIndex={0}
      onClick={openReport}
      onKeyDown={handleKeyDown}
      aria-label={`${report.year}년 ${report.month}월 ${report.week}주 재정 보고서 상세 보기`}
      className={`cursor-pointer border-b border-[#f1f5fb] transition-colors last:border-b-0 hover:bg-[#f8fafd] focus:bg-[#f8fafd] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3f74c7] ${
        report.checksumMismatch ? "bg-[#fef4f4] hover:bg-[#fce8e8] focus:bg-[#fce8e8]" : ""
      }`}
    >
      <td className="px-5 py-4">
        <span className="font-semibold text-[#0f1c2e]">
          {report.year}년 {report.month}월 {report.week}주
        </span>
        {report.checksumMismatch && (
          <span
            className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fee2e2] text-[11px] font-bold text-[#b91c1c]"
            title="합계 불일치"
          >
            !
          </span>
        )}
      </td>
      <td className="px-5 py-4 text-right tabular-nums text-[#1d6f42]">{WON(report.incomeTotal)}</td>
      <td className="px-5 py-4 text-right tabular-nums text-[#B73838]">{WON(report.expenseTotal)}</td>
      <td
        className={`px-5 py-4 text-right tabular-nums font-semibold ${
          report.balance < 0 ? "text-[#B73838]" : "text-[#0f1c2e]"
        }`}
      >
        {WON(report.balance)}
      </td>
      <td className="px-5 py-4 tabular-nums text-[#5d6f86]">{formatUploadedAt(report.uploadedAt)}</td>
      <td className="px-5 py-4 text-[#c8d6e8]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </td>
    </tr>
  );
}
