import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { listSmsLogs } from "@/lib/admin-sms-api";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import SmsHistoryClient from "./_components/SmsHistoryClient";

export default async function SmsPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/sms");
  }

  const initialLogs = await listSmsLogs().catch(() => ({ items: [], hasNext: false }));

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "SMS 관리" }, { label: "전송 내역" }]} />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">SMS 전송 내역</h1>
        <p className="text-[13px] text-[#5d6f86]">
          발송된 SMS/LMS 내역을 확인합니다.
        </p>
      </div>

      <SmsHistoryClient initialLogs={initialLogs} />
    </div>
  );
}
