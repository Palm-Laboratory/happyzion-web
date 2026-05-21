import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  getChurchMember,
  getChurchMemberAuditLogs,
} from "@/lib/admin-members-api";
import type {
  ChurchMemberDetail,
} from "@/lib/admin-members-types";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import type { MemberFormValues } from "../actions";
import MemberDetailClient from "./_components/member-detail-client";

function detailToFormValues(d: ChurchMemberDetail): MemberFormValues {
  return {
    name: d.name,
    sex: d.sex,
    birthDate: d.birthDate,
    phone: d.phone,
    email: d.email ?? "",
    address: d.address,
    addressDetail: d.addressDetail ?? "",
    status: d.status,
    office: d.office,
    registeredAt: d.registeredAt,
    officeAppointedAt: d.officeAppointedAt ?? "",
    faithStage: d.faithStage ?? "",
    job: d.job ?? "",
    memo: d.memo ?? "",
    confessDate: d.faith?.confessDate ?? "",
    learningDate: d.faith?.learningDate ?? "",
    baptismDate: d.faith?.baptismDate ?? "",
    baptismPlace: d.faith?.baptismPlace ?? "",
    baptismOfficiant: d.faith?.baptismOfficiant ?? "",
    confirmationDate: d.faith?.confirmationDate ?? "",
    previousChurch: d.faith?.previousChurch ?? "",
    transferredInAt: d.faith?.transferredInAt ?? "",
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect(`/admin/login?callbackUrl=/admin/members/${id}`);
  }

  let detail;
  let auditPage;
  try {
    [detail, auditPage] = await Promise.all([
      getChurchMember(id),
      getChurchMemberAuditLogs(id, 0, 10),
    ]);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const initialValues = detailToFormValues(detail);
  const isRemoved = detail.status === "REMOVED";

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "교인 관리", href: "/admin/members" },
          { label: "교인 상세" },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">교인 상세</h1>
      <MemberDetailClient
        memberId={id}
        memberName={detail.name}
        isRemoved={isRemoved}
        initialValues={initialValues}
        initialAuditPage={auditPage}
      />
    </div>
  );
}
