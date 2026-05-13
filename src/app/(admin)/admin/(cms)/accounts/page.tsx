import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminAccounts } from "@/lib/admin-accounts-api";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import AccountListClient from "./_components/account-list-client";

export default async function AdminAccountsPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/accounts");
  }
  if (session.user.accountRole !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const { accounts } = await getAdminAccounts(session.user.id ?? "");

  return (
    <div className="space-y-5">
      <AdminBreadcrumb items={[{ label: "운영" }, { label: "관리자 계정" }]} />
      <h1 className="text-xl font-bold text-[#0f1c2e]">관리자 계정</h1>
      <AccountListClient accounts={accounts} />
    </div>
  );
}
