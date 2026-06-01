import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getFinanceReport } from "@/lib/admin-finance-api";
import type { FinanceReportDetail } from "@/lib/admin-finance-types";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import {
  FinanceChecksumWarning,
  FinanceLinesTwoColumn,
  FinanceSummaryCards,
  FinanceUnexecutedItemsTable,
} from "../_components/finance-report-view";
import FinanceReportDeleteButton from "./_components/finance-report-delete-button";

function formatUploadedAt(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

/** 백엔드 응답 → 공용 뷰 컴포넌트 props 변환 */
function toTotals(r: FinanceReportDetail) {
  return {
    incomeTotal: r.incomeTotal,
    expenseTotal: r.expenseTotal,
    balance: r.balance,
    formCellIncomeTotal: null,
    formCellExpenseTotal: null,
    checksumMismatch: r.checksumMismatch,
  };
}

function toLines(r: FinanceReportDetail) {
  return r.lines.map((l) => ({
    direction: l.direction,
    major: l.major,
    minor: l.minor,
    amount: l.amount,
  }));
}

function toUnexecuted(r: FinanceReportDetail) {
  return r.unexecutedItems.map((it) => ({
    content: it.content,
    amount: it.amount,
    executedDate: it.executedDate,
    note: it.note,
  }));
}

export default async function FinanceReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance");
  }

  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const report = await getFinanceReport(numericId);
  if (!report) notFound();

  const periodLabel = `${report.year}년 ${report.month}월 ${report.week}주`;

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "재정 관리", href: "/admin/finance" },
          { label: periodLabel },
        ]}
      />

      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#0f1c2e]">{periodLabel} 재정보고서</h1>
          <p className="text-[13px] text-[#5d6f86]">
            한 주의 수입·지출 내역과 미집행 품목을 양식과 동일한 형태로 표시합니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FinanceReportDeleteButton id={report.id} label={periodLabel} />
          <Link
            href="/admin/finance"
            className="rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb]"
          >
            ← 목록으로
          </Link>
        </div>
      </div>

      {/* 메타 정보 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 text-[13px] sm:grid-cols-2">
          <MetaItem label="원본 파일" value={report.sourceFilename} mono />
          <MetaItem label="업로드 일시" value={formatUploadedAt(report.uploadedAt)} />
        </div>
      </section>

      {/* 합계 불일치 경고 */}
      {report.checksumMismatch && (
        <FinanceChecksumWarning
          incomeTotal={report.incomeTotal}
          expenseTotal={report.expenseTotal}
          formIncomeTotal={report.formIncomeTotal}
          formExpenseTotal={report.formExpenseTotal}
        />
      )}

      {/* 합계 요약 */}
      <FinanceSummaryCards totals={toTotals(report)} />

      {/* 수입 / 지출 2단 테이블 */}
      <FinanceLinesTwoColumn lines={toLines(report)} />

      {/* 미집행 품목 */}
      <FinanceUnexecutedItemsTable items={toUnexecuted(report)} />
    </div>
  );
}

function MetaItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#55697f]">{label}</p>
      <p className={`mt-0.5 truncate text-[#0f1c2e] ${mono ? "font-mono text-[12px]" : ""}`} title={value}>
        {value}
      </p>
    </div>
  );
}
