import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import MissionTripForm from "../_components/mission-trip-form";
import { createMissionTripAction } from "../actions";

export default async function MissionTripNewPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login?callbackUrl=/admin/missions/new");

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "선교 관리", href: "/admin/missions" },
          { label: "여정 추가" },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">여정 추가</h1>
      <MissionTripForm mode="create" action={createMissionTripAction} />
    </div>
  );
}
