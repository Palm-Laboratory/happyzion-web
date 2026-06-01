import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getFinanceStatistics } from "@/lib/admin-finance-api";
import type {
  FinanceStatGranularity,
  FinanceStatQuery,
} from "@/lib/admin-finance-types";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import FinanceStatisticsClient from "./_components/finance-statistics-client";

const VALID_GRANULARITIES: FinanceStatGranularity[] = ["WEEK", "MONTH", "QUARTER", "YEAR"];

type RawSearchParams = {
  granularity?: string;
  year?: string;
  month?: string;
};

function parseQuery(sp: RawSearchParams): FinanceStatQuery {
  const g = VALID_GRANULARITIES.includes(sp.granularity as FinanceStatGranularity)
    ? (sp.granularity as FinanceStatGranularity)
    : "MONTH";
  const yearNum = Number(sp.year);
  const monthNum = Number(sp.month);
  const year = Number.isFinite(yearNum) && yearNum > 0 ? yearNum : 2026;
  const month =
    g === "WEEK" && Number.isFinite(monthNum) && monthNum >= 1 && monthNum <= 12
      ? monthNum
      : g === "WEEK"
        ? 5
        : undefined;
  return { granularity: g, year: g === "YEAR" ? undefined : year, month };
}

export default async function FinanceStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance/statistics");
  }

  const sp = await searchParams;
  const query = parseQuery(sp);
  const data = await getFinanceStatistics(query);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[{ label: "교회 관리" }, { label: "재정 관리" }, { label: "통계" }]}
      />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">재정 통계</h1>
        <p className="text-[13px] text-[#5d6f86]">
          주별 · 월별 · 분기별 · 연별 재정 추이를 확인합니다.
        </p>
      </div>

      <FinanceStatisticsClient data={data} />
    </div>
  );
}
