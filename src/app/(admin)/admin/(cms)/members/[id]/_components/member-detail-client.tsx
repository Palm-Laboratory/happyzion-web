"use client";

import type { ChurchMemberAuditPage } from "@/lib/admin-members-types";
import MemberForm from "../../_components/member-form";
import type { MemberFormValues } from "../../actions";
import { updateChurchMemberAction } from "../../actions";
import AuditLogList from "./audit-log-list";
import DeleteMemberButton from "./delete-member-button";
import RemovedRecoveryBanner from "./removed-recovery-banner";

interface MemberDetailClientProps {
  memberId: number;
  memberName: string;
  isRemoved: boolean;
  initialValues: MemberFormValues;
  initialAuditPage: ChurchMemberAuditPage;
}

export default function MemberDetailClient({
  memberId, memberName, isRemoved, initialValues, initialAuditPage,
}: MemberDetailClientProps) {
  return (
    <div className="space-y-6">
      {isRemoved && <RemovedRecoveryBanner />}
      <MemberForm
        mode="edit"
        initialValues={initialValues}
        action={updateChurchMemberAction.bind(null, memberId)}
      />
      <AuditLogList memberId={memberId} initialPage={initialAuditPage} />
      {!isRemoved && (
        <DeleteMemberButton memberId={memberId} memberName={memberName} />
      )}
    </div>
  );
}
