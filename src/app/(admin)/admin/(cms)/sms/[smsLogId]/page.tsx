import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getSmsLogDetail } from "@/lib/admin-sms-api";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import SmsDetailClient from "../_components/SmsDetailClient";

export default async function SmsDetailPage({
  params,
}: {
  params: Promise<{ smsLogId: string }>;
}) {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/sms");
  }

  const { smsLogId } = await params;
  const initialDetail = await getSmsLogDetail(Number(smsLogId)).catch(() => null);

  if (!initialDetail) {
    redirect("/admin/sms");
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "SMS 관리" },
          { label: "전송 내역", href: "/admin/sms" },
          { label: "상세" },
        ]}
      />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">전송 결과 상세</h1>
        <p className="text-[13px] text-[#5d6f86]">
          SMS 발송 결과 및 수신자별 전송 상태를 확인합니다.
        </p>
      </div>

      <SmsDetailClient initialDetail={initialDetail} />
    </div>
  );
}
