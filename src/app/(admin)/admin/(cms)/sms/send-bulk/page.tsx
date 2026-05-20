import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import SmsBulkSendClient from "../_components/SmsBulkSendClient";

export default async function SmsSendBulkPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/sms/send-bulk");
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
	          { label: "SMS 관리" },
	          { label: "개별 내용 보내기" },
	        ]}
	      />

	      <div className="space-y-1">
	        <h1 className="text-xl font-bold text-[#0f1c2e]">개별 내용 보내기</h1>
	        <p className="text-[13px] text-[#5d6f86]">
	          공통 본문을 기본으로 쓰고, 필요한 수신자만 개별 본문으로 덮어씁니다.
	        </p>
	      </div>

      <SmsBulkSendClient />
    </div>
  );
}
