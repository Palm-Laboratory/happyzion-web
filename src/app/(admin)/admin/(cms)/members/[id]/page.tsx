import { notFound } from "next/navigation";
import { AdminApiError } from "@/lib/admin-api";
import {
  getChurchMember,
  getChurchMemberAuditLogs,
} from "@/lib/admin-members-api";
import type {
  ChurchMemberDetail,
} from "@/lib/admin-members-types";
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
    <MemberDetailClient
      memberId={id}
      memberName={detail.name}
      isRemoved={isRemoved}
      initialValues={initialValues}
      initialAuditPage={auditPage}
    />
  );
}
