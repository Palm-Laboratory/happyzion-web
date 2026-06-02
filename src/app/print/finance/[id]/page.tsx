import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminSession, isAdminSession } from "@/auth";
import { getFinanceReport } from "@/lib/admin-finance-api";
import type { FinanceReportDetail } from "@/lib/admin-finance-types";
import { groupByMajor } from "@/app/(admin)/admin/(cms)/finance/_components/finance-format";

export const metadata: Metadata = { robots: "noindex" };

const PRINT_STYLE = `
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { background: #fff !important; }
  @page { margin: 15mm; size: A4; }
`;

const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function formatUploadedAt(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function FinanceReportPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login");

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const report = await getFinanceReport(numericId);
  if (!report) notFound();

  const periodLabel = `${report.year}년 ${report.month}월 ${report.week}주`;
  const { incomeMajors, expenseMajors } = groupByMajor(
    report.lines
      .filter((l) => l.amount !== 0)
      .map((l) => ({ ...l, detail: l.detail ?? null }))
  );

  return (
    <div className="p-8 font-sans text-[#0f1c2e]">
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLE }} />
        {/* 헤더 */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold">{periodLabel} 재정보고서</h1>
          <div className="mt-2 flex gap-8 text-sm text-gray-500">
            <span>원본 파일: <span className="font-mono text-xs">{report.sourceFilename}</span></span>
            <span>업로드: {formatUploadedAt(report.uploadedAt)}</span>
          </div>
        </div>

        {/* 합계 불일치 경고 */}
        {report.checksumMismatch && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            ⚠ 합계 불일치 — 수입: {WON(report.incomeTotal)} vs 양식 {WON(report.formIncomeTotal ?? 0)} /
            지출: {WON(report.expenseTotal)} vs 양식 {WON(report.formExpenseTotal ?? 0)}
          </div>
        )}

        {/* 합계 카드 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <SummaryCard label="수입 합계" value={report.incomeTotal} color="#1d6f42" />
          <SummaryCard label="지출 합계" value={report.expenseTotal} color="#B73838" />
          <SummaryCard label="잉여금" value={report.balance} color="#3f74c7" />
        </div>

        {/* 수입 / 지출 2단 테이블 */}
        <div className="mb-6 grid grid-cols-1 gap-4">
          <LinesTable title="수입" majors={incomeMajors} />
          <LinesTable title="지출" majors={expenseMajors} showDetail />
        </div>

        {/* 미집행 품목 */}
        <UnexecutedTable items={report.unexecutedItems} />
      </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-gray-200 px-5 py-4">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums" style={{ color }}>{WON(value)}</p>
    </div>
  );
}

type MajorGroup = { major: string; lines: { minor: string; amount: number; detail?: string | null }[]; subtotal: number };

function LinesTable({ title, majors, showDetail }: { title: string; majors: MajorGroup[]; showDetail?: boolean }) {
  const total = majors.reduce((sum, g) => sum + g.subtotal, 0);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="border-b border-gray-100 px-4 py-2">
        <h2 className="text-sm font-bold">{title}</h2>
      </div>
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
            <td className="px-4 py-1.5">계정과목</td>
            <td className="px-4 py-1.5 text-right">금액</td>
            {showDetail && <td className="px-4 py-1.5">세부내역</td>}
          </tr>
          {majors.map((g) => (
            <>
              <tr key={g.major} className="border-b border-gray-100" style={{ backgroundColor: "#eff6ff" }}>
                <td className="px-4 py-1.5 font-semibold">{g.major}</td>
                <td className="px-4 py-1.5 text-right font-semibold tabular-nums">{WON(g.subtotal)}</td>
                {showDetail && <td />}
              </tr>
              {g.lines.map((l) => (
                <tr key={l.minor} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-1 pl-8 text-gray-500">{l.minor}</td>
                  <td className={`px-4 py-1 text-right tabular-nums ${l.amount === 0 ? "text-gray-300" : ""}`}>
                    {WON(l.amount)}
                  </td>
                  {showDetail && <td className="px-4 py-1 text-gray-500">{l.detail ?? ""}</td>}
                </tr>
              ))}
            </>
          ))}
          <tr className="border-t-2 border-gray-200" style={{ backgroundColor: "#f8fafc" }}>
            <td className="px-4 py-2 font-bold">합계</td>
            <td className="px-4 py-2 text-right font-bold tabular-nums">{WON(total)}</td>
            {showDetail && <td />}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function UnexecutedTable({ items }: { items: FinanceReportDetail["unexecutedItems"] }) {
  if (items.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="border-b border-gray-100 px-4 py-2">
        <h2 className="text-sm font-bold">미집행 품목</h2>
      </div>
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
            <td className="px-4 py-1.5">내용</td>
            <td className="px-4 py-1.5 text-right">금액</td>
            <td className="px-4 py-1.5">집행일</td>
            <td className="px-4 py-1.5">비고</td>
          </tr>
          {items.map((it, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0">
              <td className="px-4 py-1.5">{it.content}</td>
              <td className="px-4 py-1.5 text-right tabular-nums">{WON(it.amount)}</td>
              <td className="px-4 py-1.5 text-gray-500">{it.executedDate ?? "-"}</td>
              <td className="px-4 py-1.5 text-gray-500">{it.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
