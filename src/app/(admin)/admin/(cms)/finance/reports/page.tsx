import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { listFinanceReports } from "@/lib/admin-finance-api";
import type { FinanceReportListQuery } from "@/lib/admin-finance-types";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import FinanceReportListClient from "../_components/finance-report-list-client";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

type RawSearchParams = {
  year?: string;
  month?: string;
  page?: string;
  size?: string;
};

function parseQuery(sp: RawSearchParams): FinanceReportListQuery {
  const yearNum = Number(sp.year);
  const monthNum = Number(sp.month);
  const year = Number.isFinite(yearNum) && yearNum > 0 ? yearNum : undefined;
  const month =
    Number.isFinite(monthNum) && monthNum >= 1 && monthNum <= 12 ? monthNum : undefined;
  const page = Number.isFinite(Number(sp.page)) ? Math.max(0, Number(sp.page)) : 0;
  const rawSize = Number(sp.size);
  const size: PageSize = (PAGE_SIZE_OPTIONS as readonly number[]).includes(rawSize)
    ? (rawSize as PageSize)
    : 20;
  return { year, month, page, size };
}

export default async function FinanceReportListPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance/reports");
  }

  const sp = await searchParams;
  const query = parseQuery(sp);
  const data = await listFinanceReports(query);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[{ label: "교회 관리" }, { label: "재정 관리", href: "/admin/finance" }, { label: "보고서" }]}
      />

      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#0f1c2e]">재정 보고서</h1>
          <p className="text-[13px] text-[#5d6f86]">
            교회가 작성한 주간 재정보고서를 업로드·조회합니다.
          </p>
        </div>
        <Link
          href="/admin/finance/upload"
          className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#3461ad]"
        >
          엑셀 업로드
        </Link>
      </div>

      <FinanceReportListClient data={data} query={query} basePath="/admin/finance/reports" />
    </div>
  );
}
