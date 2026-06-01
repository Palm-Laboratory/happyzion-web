import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getChurchMember } from "@/lib/admin-members-api";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import MemberDetailTabs from "./_components/member-detail-tabs";

interface MemberLayoutProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function MemberDetailLayout({ children, params }: MemberLayoutProps) {
  const { id: idStr } = await params;
  const id = Number(idStr);

  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect(`/admin/login?callbackUrl=/admin/members/${id}`);
  }

  let memberName = "교인 상세";
  try {
    const member = await getChurchMember(id);
    memberName = member.name;
  } catch {
    // 404 처리는 page.tsx에서 담당
  }

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "교인 관리", href: "/admin/members" },
          { label: memberName },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">{memberName}</h1>
      <MemberDetailTabs memberId={id} />
      {children}
    </div>
  );
}
