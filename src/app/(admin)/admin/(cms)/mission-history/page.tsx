import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import MissionHistoryClient from "./_components/mission-history-client";

export default async function MissionHistoryPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/mission-history");
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "사이트 관리" }, { label: "선교 이력 관리" }]} />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">선교 이력 관리</h1>
        <p className="text-[13px] text-[#5d6f86]">
          연도별 선교 이력을 추가하고 수정합니다.
        </p>
      </div>

      <MissionHistoryClient />
    </div>
  );
}
