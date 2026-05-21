import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import MemberForm from "../_components/member-form";
import { createChurchMemberAction } from "../actions";

export default async function NewMemberPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/members/new");
  }

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "교인 관리", href: "/admin/members" },
          { label: "교인 등록" },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">교인 등록</h1>
      <MemberForm action={createChurchMemberAction} />
    </div>
  );
}
