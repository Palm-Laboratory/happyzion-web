import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getFinanceBalance, getFinanceReport, getFinanceStatistics, listFinanceReports } from "@/lib/admin-finance-api";
import type { FinanceStatSummary } from "@/lib/admin-finance-types";
import FinanceTrendMiniChart, { type TrendPoint } from "./_components/finance-trend-mini-chart";
import FinanceBreakdownAccordion, { type MajorGroup } from "./_components/finance-breakdown-accordion";
import AdminBreadcrumb from "../components/admin-breadcrumb";

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

function DeltaBadge({ current, previous }: { current: number; previous: number | null }) {
  if (previous == null || previous === 0) {
    return <span className="text-[12px] text-[#a8b3c2]">— 전주 데이터 없음</span>;
  }
  const delta = ((current - previous) / Math.abs(previous)) * 100;
  const up = delta >= 0;
  return (
    <span className="text-[12px] text-[#5d6f86]">
      전주 대비{" "}
      <span className={`font-semibold tabular-nums ${up ? "text-[#e07080]" : "text-[#2471a3]"}`}>
        {up ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
      </span>
      {" "}
      <span className="tabular-nums">({WON(previous)})</span>
    </span>
  );
}

function SummaryCard({
  label,
  periodLabel,
  value,
  previous,
  accent,
}: {
  label: string;
  periodLabel: string;
  value: number;
  previous: number | null;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#dbe4f0] bg-white px-6 py-5 shadow-sm">
      <div>
        <p className="text-[12px] font-semibold text-[#55697f]">{label}</p>
        <p className="text-[10px] text-[#a8b3c2]">{periodLabel}</p>
      </div>
      <p className="text-[28px] font-bold tabular-nums leading-none" style={{ color: accent }}>
        {WON(value)}
      </p>
      <DeltaBadge current={value} previous={previous} />
    </div>
  );
}

export default async function FinanceDashboardPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance");
  }

  // 최신 보고서 1건으로 기준 주차 확인
  const latestPage = await listFinanceReports({ page: 0, size: 1 }).catch(() => null);
  const latest = latestPage?.items[0] ?? null;

  let currentSummary: FinanceStatSummary = { incomeTotal: 0, expenseTotal: 0, balance: 0 };
  let prevSummary: FinanceStatSummary | null = null;
  let periodLabel = "데이터 없음";
  let recentFourWeeks: TrendPoint[] = [];
  let incomeMajorGroups: MajorGroup[] = [];
  let expenseMajorGroups: MajorGroup[] = [];
  let totalBalance: { incomeTotal: number; expenseTotal: number; balance: number } | null = null;

  if (latest) {
    const prevMonth = latest.month === 1 ? 12 : latest.month - 1;
    const prevYear = latest.month === 1 ? latest.year - 1 : latest.year;

    const [fetchedBalance, currentStats, prevStats] = await Promise.all([
    getFinanceBalance().catch(() => null),
      getFinanceStatistics({ granularity: "WEEK", year: latest.year, month: latest.month }).catch(() => null),
      getFinanceStatistics({ granularity: "WEEK", year: prevYear, month: prevMonth }).catch(() => null),
    ]);

    totalBalance = fetchedBalance;
    const currentBucket = currentStats?.buckets.find((b) => b.label === `${latest.week}주`) ?? null;
    if (currentBucket) {
      currentSummary = { incomeTotal: currentBucket.incomeTotal, expenseTotal: currentBucket.expenseTotal, balance: currentBucket.balance };
      prevSummary = currentBucket.previousSummary;
    }
    periodLabel = `${latest.year}년 ${latest.month}월 ${latest.week}주`;

    // 최근 4주: 전월 주차 + 현월 주차 합쳐서 마지막 4개
    const prevPoints: TrendPoint[] = (prevStats?.buckets ?? []).map((b) => ({
      label: `${prevMonth}/${b.label}`,
      incomeTotal: b.incomeTotal,
      expenseTotal: b.expenseTotal,
      balance: b.balance,
      isCurrentMonth: false,
    }));
    const currentPoints: TrendPoint[] = (currentStats?.buckets ?? [])
      .filter((b) => {
        const weekNum = parseInt(b.label);
        return weekNum <= latest.week;
      })
      .map((b) => ({
        label: `${latest.month}/${b.label}`,
        incomeTotal: b.incomeTotal,
        expenseTotal: b.expenseTotal,
        balance: b.balance,
        isCurrentMonth: true,
      }));
    recentFourWeeks = [...prevPoints, ...currentPoints].slice(-4);
  }

  // 최신 보고서 상세 → 대분류/소분류 그룹핑
  if (latest) {
    const detail = await getFinanceReport(latest.id).catch(() => null);
    if (detail) {
      const groupLines = (direction: "INCOME" | "EXPENSE"): MajorGroup[] => {
        const map = new Map<string, MajorGroup>();
        for (const line of detail.lines.filter((l) => l.direction === direction && l.amount > 0)) {
          let g = map.get(line.major);
          if (!g) { g = { major: line.major, total: 0, minors: [] }; map.set(line.major, g); }
          g.total += line.amount;
          g.minors.push({ minor: line.minor, amount: line.amount });
        }
        return Array.from(map.values());
      };
      incomeMajorGroups = groupLines("INCOME");
      expenseMajorGroups = groupLines("EXPENSE");
    }
  }

  // 최근 4주 보고서
  const recentReports = await listFinanceReports({ page: 0, size: 4 }).catch(() => ({ items: [], hasNext: false, total: 0 }));

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[{ label: "교회 관리" }, { label: "재정 관리" }, { label: "대시보드" }]}
      />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">재정 대시보드</h1>
        <p className="text-[13px] text-[#5d6f86]">
          {latest ? `${periodLabel} 기준 수입·지출 현황입니다.` : "업로드된 보고서가 없습니다."}
        </p>
      </div>

      {/* 요약 카드 3개 + 트렌드 차트 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard label="수입 합계" periodLabel={periodLabel} value={currentSummary.incomeTotal} previous={prevSummary?.incomeTotal ?? null} accent="#B73838" />
        <SummaryCard label="지출 합계" periodLabel={periodLabel} value={currentSummary.expenseTotal} previous={prevSummary?.expenseTotal ?? null} accent="#3a6db5" />
      </div>

      {/* 수입/지출 대분류 아코디언 */}
      {(incomeMajorGroups.length > 0 || expenseMajorGroups.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          <FinanceBreakdownAccordion title="수입 항목" groups={incomeMajorGroups} total={currentSummary.incomeTotal} totalColor="#B73838" />
          <FinanceBreakdownAccordion title="지출 항목" groups={expenseMajorGroups} total={currentSummary.expenseTotal} totalColor="#3a6db5" />
        </div>
      )}

      {/* 최근 4주 추이 */}
      {recentFourWeeks.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
          <div className="border-b border-[#e7eef7] px-5 py-3.5">
            <h2 className="text-[14px] font-bold text-[#0f1c2e]">최근 4주 수입 · 지출 추이</h2>
          </div>
          <div className="px-4 py-4">
            <FinanceTrendMiniChart data={recentFourWeeks} height={200} currentLabel={latest ? `${latest.month}/${latest.week}주` : undefined} />
          </div>
        </section>
      )}

      {/* 최근 4주 보고서 */}
      <section className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e7eef7] px-5 py-3.5">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">최근 보고서</h2>
          <Link
            href="/admin/finance/reports"
            className="flex items-center gap-1 text-[12px] font-semibold text-[#3f74c7] hover:underline"
          >
            전체 보기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {recentReports.items.length === 0 ? (
          <div className="p-12 text-center text-[13px] text-[#5d6f86]">
            등록된 보고서가 없습니다.{" "}
            <Link href="/admin/finance/upload" className="font-semibold text-[#3f74c7] hover:underline">
              엑셀 업로드
            </Link>
            로 보고서를 추가하세요.
          </div>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e7eef7] bg-[#f8fafd] text-left text-[11px] font-semibold text-[#55697f]">
                <th className="px-5 py-2.5">기간</th>
                <th className="px-5 py-2.5 text-right">수입</th>
                <th className="px-5 py-2.5 text-right">지출</th>
                <th className="px-5 py-2.5 text-right">잉여금</th>
                <th className="px-5 py-2.5">업로드 일시</th>
                <th className="px-5 py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {recentReports.items.map((r) => (
                <Link key={r.id} href={`/admin/finance/${r.id}`} className="contents">
                  <tr className={`cursor-pointer border-b border-[#f1f5fb] transition-colors last:border-b-0 hover:bg-[#f8fafd] ${r.checksumMismatch ? "bg-[#fef4f4] hover:bg-[#fce8e8]" : ""}`}>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#0f1c2e]">
                        {r.year}년 {r.month}월 {r.week}주
                      </span>
                      {r.checksumMismatch && (
                        <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fee2e2] text-[11px] font-bold text-[#b91c1c]" title="합계 불일치">!</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-[#1d6f42]">{WON(r.incomeTotal)}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-[#B73838]">{WON(r.expenseTotal)}</td>
                    <td className={`px-5 py-4 text-right tabular-nums font-semibold ${r.balance < 0 ? "text-[#B73838]" : "text-[#0f1c2e]"}`}>{WON(r.balance)}</td>
                    <td className="px-5 py-4 tabular-nums text-[#5d6f86]">{formatUploadedAt(r.uploadedAt)}</td>
                    <td className="px-5 py-4 text-[#c8d6e8]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
