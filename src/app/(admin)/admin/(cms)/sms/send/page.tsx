import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import SmsSendClient from "../_components/SmsSendClient";

export default async function SmsSendPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/sms/send");
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "SMS 관리" },
          { label: "문자 보내기" },
        ]}
      />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">문자 보내기</h1>
        <p className="text-[13px] text-[#5d6f86]">
          여러 수신자에게 동일한 SMS/LMS 본문을 전송합니다.
        </p>
      </div>

      <SmsSendClient />
    </div>
  );
}
