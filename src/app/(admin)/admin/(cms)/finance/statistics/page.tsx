import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";

export default async function FinanceStatisticsPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance/statistics");
  }

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

      <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 text-center text-[13px] text-[#5d6f86]">
        통계 UI 구현 예정 (기간 토글 + 요약 카드 + 차트)
      </div>
    </div>
  );
}
