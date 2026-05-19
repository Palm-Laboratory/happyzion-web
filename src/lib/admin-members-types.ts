export type Sex = "M" | "F";
export type BirthCalendar = "SOLAR" | "LUNAR";
export type ChurchMemberStatus =
  | "ACTIVE"
  | "NEW"
  | "RESTING"
  | "LONG_ABSENT"
  | "TRANSFERRED_OUT"
  | "DECEASED"
  | "REMOVED";
export type ChurchMemberOffice =
  | "LAY"
  | "DEACON_TEMP"
  | "DEACON"
  | "GWONSA"
  | "ELDER"
  | "ELDER_EMERITUS"
  | "EVANGELIST"
  | "PASTOR";
export type FaithStage =
  | "SEEKER"
  | "NEW_COMER"
  | "SETTLED"
  | "GROWING"
  | "DISCIPLE"
  | "MINISTER"
  | "LEADER";

export interface ChurchMemberSummary {
  id: number;
  name: string;
  phone: string;
  status: ChurchMemberStatus;
  cellLabel: string | null;
  registeredAt: string;
}

export interface ChurchMemberPageResponse {
  items: ChurchMemberSummary[];
  hasNext: boolean;
}

export interface ChurchMemberFaithInput {
  confessDate?: string | null;
  learningDate?: string | null;
  baptismDate?: string | null;
  baptismPlace?: string | null;
  baptismOfficiant?: string | null;
  confirmationDate?: string | null;
  previousChurch?: string | null;
  transferredInAt?: string | null;
}

export interface CreateChurchMemberPayload {
  name: string;
  sex: Sex;
  birthDate: string;
  birthCalendar: BirthCalendar;
  phone: string;
  address: string;
  status: ChurchMemberStatus;
  office: ChurchMemberOffice;
  registeredAt: string;
  email?: string | null;
  addressDetail?: string | null;
  job?: string | null;
  cellLabel?: string | null;
  faithStage?: FaithStage | null;
  officeAppointedAt?: string | null;
  memo?: string | null;
  faith?: ChurchMemberFaithInput | null;
}

export interface ChurchMemberListQuery {
  name?: string;
  phone?: string;
  includeInactive?: boolean;
  page: number;
  size: number;
}

export const CREATABLE_STATUSES: ChurchMemberStatus[] = [
  "ACTIVE",
  "NEW",
  "RESTING",
  "LONG_ABSENT",
  "TRANSFERRED_OUT",
  "DECEASED",
];

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export interface ChurchMemberFaithDetail {
  confessDate: string | null;
  learningDate: string | null;
  baptismDate: string | null;
  baptismPlace: string | null;
  baptismOfficiant: string | null;
  confirmationDate: string | null;
  previousChurch: string | null;
  transferredInAt: string | null;
}

export interface ChurchMemberDetail {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  birthDate: string;
  birthCalendar: BirthCalendar;
  sex: Sex;
  address: string;
  addressDetail: string | null;
  job: string | null;
  memo: string | null;
  photoAssetId: number | null;
  cellLabel: string | null;
  status: ChurchMemberStatus;
  faithStage: FaithStage | null;
  office: ChurchMemberOffice;
  officeAppointedAt: string | null;
  registeredAt: string;
  faith: ChurchMemberFaithDetail | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChurchMemberAuditEntry {
  id: number;
  action: AuditAction;
  actorId: number;
  diffJson: string | null;
  createdAt: string;
}

export interface ChurchMemberAuditPage {
  items: ChurchMemberAuditEntry[];
  hasNext: boolean;
}

export const EDITABLE_STATUSES: ChurchMemberStatus[] = [
  "ACTIVE", "NEW", "RESTING", "LONG_ABSENT", "TRANSFERRED_OUT", "DECEASED",
];
