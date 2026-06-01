import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import FinanceUploadClient from "./_components/finance-upload-client";

export default async function FinanceUploadPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/finance/upload");
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "재정 관리", href: "/admin/finance" },
          { label: "엑셀 업로드" },
        ]}
      />

      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#0f1c2e]">엑셀 업로드</h1>
          <p className="text-[13px] text-[#5d6f86]">
            주간 재정보고 엑셀 파일을 업로드하면 자동으로 파싱하여 미리보기를 표시합니다.
          </p>
        </div>
        <Link
          href="/admin/finance"
          className="rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb]"
        >
          ← 목록으로
        </Link>
      </div>

      <FinanceUploadClient />
    </div>
  );
}
