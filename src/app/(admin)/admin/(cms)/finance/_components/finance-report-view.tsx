"use client";

import { Fragment } from "react";
import type {
  FinanceParsedLine,
  FinanceParsedUnexecutedItem,
  FinanceParsedTotals,
} from "@/lib/admin-finance-types";
import { WON, groupByMajor, type MajorGroup } from "./finance-format";

/** 수입/지출/남은헌금 3개 요약 카드 */
export function FinanceSummaryCards({ totals }: { totals: FinanceParsedTotals }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card label="수입 합계" value={totals.incomeTotal} accent="#1d6f42" />
      <Card label="지출 합계" value={totals.expenseTotal} accent="#b3502a" />
      <Card label="남은 헌금" value={totals.balance} accent="#3f74c7" />
    </div>
  );
}

function Card({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
      <p className="text-[11px] font-semibold text-[#55697f]">{label}</p>
      <p className="mt-1 text-[20px] font-bold tabular-nums" style={{ color: accent }}>
        {WON(value)}
      </p>
    </div>
  );
}

/** 양식의 수입/지출 2단 테이블 */
export function FinanceLinesTwoColumn({ lines }: { lines: FinanceParsedLine[] }) {
  const { incomeMajors, expenseMajors } = groupByMajor(lines);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <LinesTable title="수입" majors={incomeMajors} />
      <LinesTable title="지출" majors={expenseMajors} />
    </div>
  );
}

function LinesTable({ title, majors }: { title: string; majors: MajorGroup[] }) {
  return (
    <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
      <div className="border-b border-[#e7eef7] px-5 py-3">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">{title}</h2>
      </div>
      <table className="w-full text-[13px]">
        <tbody>
          {majors.map((g) => (
            <Fragment key={g.major}>
              <tr className="border-b border-[#e7eef7] bg-[#f8fafd]">
                <td className="px-5 py-2 font-semibold text-[#0f1c2e]">{g.major}</td>
                <td className="px-5 py-2 text-right font-semibold tabular-nums text-[#0f1c2e]">
                  {WON(g.subtotal)}
                </td>
              </tr>
              {g.lines.map((l) => (
                <tr key={l.minor} className="border-b border-[#f1f5fb] last:border-b-0">
                  <td className="px-5 py-1.5 pl-9 text-[#5d6f86]">{l.minor}</td>
                  <td
                    className={`px-5 py-1.5 text-right tabular-nums ${
                      l.amount === 0 ? "text-[#a8b3c2]" : "text-[#0f1c2e]"
                    }`}
                  >
                    {WON(l.amount)}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/** 미집행 품목 테이블 */
export function FinanceUnexecutedItemsTable({
  items,
}: {
  items: FinanceParsedUnexecutedItem[];
}) {
  return (
    <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
      <div className="border-b border-[#e7eef7] px-5 py-3">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">미집행 품목</h2>
      </div>
      {items.length === 0 ? (
        <div className="px-5 py-6 text-center text-[12px] text-[#5d6f86]">없음</div>
      ) : (
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#e7eef7] text-left text-[11px] font-semibold text-[#55697f]">
              <th className="px-5 py-2">내용</th>
              <th className="px-5 py-2 text-right">금액</th>
              <th className="px-5 py-2">집행일</th>
              <th className="px-5 py-2">비고</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i} className="border-b border-[#f1f5fb] last:border-b-0">
                <td className="px-5 py-2 text-[#0f1c2e]">{it.content}</td>
                <td className="px-5 py-2 text-right tabular-nums">{WON(it.amount)}</td>
                <td className="px-5 py-2 text-[#5d6f86]">{it.executedDate ?? "-"}</td>
                <td className="px-5 py-2 text-[#5d6f86]">{it.note ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

/** 합계 불일치 경고 배너 (checksumMismatch=true일 때만 표시) */
export function FinanceChecksumWarning() {
  return (
    <div className="rounded-xl border border-[#fbb6b6] bg-[#fef4f4] px-5 py-3 text-[13px] text-[#b91c1c]">
      <strong className="font-semibold">⚠ 합계 불일치 경고</strong> — 우리가 합산한 값과 양식의
      합계셀이 다릅니다. 매핑되지 않은 항목이 있거나 양식이 변경됐을 가능성이 있어요.
    </div>
  );
}
