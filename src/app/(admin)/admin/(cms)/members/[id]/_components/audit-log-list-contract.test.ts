import AuditLogList from "@/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list";
import type { ChurchMemberAuditPage } from "@/lib/admin-members-types";

void AuditLogList;
type Props = Parameters<typeof AuditLogList>[0];

const _p: Props = {
  memberId: 1,
  initialPage: { items: [], hasNext: false } as ChurchMemberAuditPage,
};
void _p;
