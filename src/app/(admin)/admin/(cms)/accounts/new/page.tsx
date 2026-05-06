import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminAccountForm from "../_components/admin-account-form";
import { createAdminAccountAction } from "../actions";
import AdminBreadcrumb from "../../components/admin-breadcrumb";

export default async function NewAdminAccountPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login?callbackUrl=/admin/accounts/new");
  if (session.user.accountRole !== "SUPER_ADMIN") redirect("/admin");

  return (
    <div className="space-y-5">
      {/* ── 경로(breadcrumb) ── */}
      <AdminBreadcrumb items={[
        { label: "운영" },
        { label: "관리자 계정", href: "/admin/accounts" },
        { label: "신규 등록" },
      ]} />

      {/* ── 페이지 헤더 ── */}
      <h1 className="text-xl font-bold text-[#0f1c2e]">관리자 계정 신규 등록</h1>

      {/* ── 폼 ── */}
      <AdminAccountForm mode="new" createAction={createAdminAccountAction} />
    </div>
  );
}
