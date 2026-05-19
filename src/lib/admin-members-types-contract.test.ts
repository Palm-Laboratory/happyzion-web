import type {
  ChurchMemberDetail,
  ChurchMemberFaithDetail,
  ChurchMemberAuditEntry,
  ChurchMemberAuditPage,
  AuditAction,
} from "@/lib/admin-members-types";
import { EDITABLE_STATUSES } from "@/lib/admin-members-types";

const _a1: AuditAction = "CREATE";
const _a2: AuditAction = "UPDATE";
const _a3: AuditAction = "DELETE";
void _a1; void _a2; void _a3;

const _faith: ChurchMemberFaithDetail = {
  confessDate: null, learningDate: null, baptismDate: null,
  baptismPlace: null, baptismOfficiant: null, confirmationDate: null,
  previousChurch: null, transferredInAt: null,
};
void _faith;

const _detail: ChurchMemberDetail = {
  id: 1, name: "홍길동", phone: "010-0000-0000", email: null,
  birthDate: "1990-01-01", birthCalendar: "SOLAR", sex: "M",
  address: "서울", addressDetail: null, job: null,
  memo: null, photoAssetId: null, cellLabel: null,
  status: "ACTIVE", faithStage: null,
  office: "LAY", officeAppointedAt: null,
  registeredAt: "2026-01-01",
  faith: null,
  createdAt: "2026-01-01T00:00:00+09:00", updatedAt: "2026-01-01T00:00:00+09:00",
};
void _detail;

const _entry: ChurchMemberAuditEntry = {
  id: 1, action: "UPDATE", actorId: 12,
  diffJson: null, createdAt: "2026-01-01T00:00:00+09:00",
};
const _page: ChurchMemberAuditPage = { items: [_entry], hasNext: false };
void _entry; void _page;

const _editable: readonly string[] = EDITABLE_STATUSES;
const _hasRemoved = _editable.includes("REMOVED");
void _hasRemoved;
