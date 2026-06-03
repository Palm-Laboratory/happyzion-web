export type MissionTripType = "SHORT_TERM" | "MEDICAL" | "VISION_TRIP" | "SUPPORT_VISIT" | "OTHER";
export type MissionTripStatus = "PLANNED" | "RECRUITING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type ParticipantRole = "LEADER" | "MEMBER" | "INTERPRETER" | "MEDICAL" | "SUPPORTER";
export type ParticipationStatus = "APPLIED" | "CONFIRMED" | "CANCELLED";

export const MISSION_TRIP_TYPE_LABELS: Record<MissionTripType, string> = {
  SHORT_TERM: "단기선교",
  MEDICAL: "의료선교",
  VISION_TRIP: "비전트립",
  SUPPORT_VISIT: "후원방문",
  OTHER: "기타",
};

export const MISSION_TRIP_STATUS_LABELS: Record<MissionTripStatus, string> = {
  PLANNED: "계획",
  RECRUITING: "모집중",
  ONGOING: "진행중",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

export const PARTICIPANT_ROLE_LABELS: Record<ParticipantRole, string> = {
  LEADER: "인솔자",
  MEMBER: "팀원",
  INTERPRETER: "통역",
  MEDICAL: "의료",
  SUPPORTER: "후원자",
};

export const PARTICIPATION_STATUS_LABELS: Record<ParticipationStatus, string> = {
  APPLIED: "신청",
  CONFIRMED: "확정",
  CANCELLED: "취소",
};

// ── Trip ─────────────────────────────────────────────────────────────────────

export interface MissionTripSummary {
  id: number;
  title: string;
  country: string;
  startDate: string;
  endDate: string | null;
  type: MissionTripType;
  status: MissionTripStatus;
  leaderLabel: string | null;
  participantCount: number;
}

export interface MissionTripDetail {
  id: number;
  title: string;
  country: string;
  startDate: string;
  endDate: string | null;
  type: MissionTripType;
  status: MissionTripStatus;
  leaderLabel: string | null;
  budget: number | null;
  description: string | null;
  coverPhotoAssetId: number | null;
  participants: MissionParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface MissionTripListResponse {
  trips: MissionTripSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// ── Participant ───────────────────────────────────────────────────────────────

export interface MissionParticipant {
  id: number;
  churchMemberId: number | null;
  displayName: string;
  externalName: string | null;
  role: ParticipantRole;
  participationStatus: ParticipationStatus;
  note: string | null;
  createdAt: string;
}

// ── Member's mission history ──────────────────────────────────────────────────

export interface MemberMissionParticipation {
  participantId: number;
  tripId: number;
  tripTitle: string;
  country: string;
  startDate: string;
  endDate: string | null;
  tripStatus: MissionTripStatus;
  role: ParticipantRole;
  participationStatus: ParticipationStatus;
  note: string | null;
}

export interface MemberMissionListResponse {
  participations: MemberMissionParticipation[];
}

// ── Payloads ──────────────────────────────────────────────────────────────────

export interface MissionTripSavePayload {
  title: string;
  country: string;
  startDate: string;
  endDate: string | null;
  type: MissionTripType;
  status: MissionTripStatus;
  leaderLabel: string | null;
  budget: number | null;
  description: string | null;
}

export interface AddParticipantPayload {
  churchMemberId: number | null;
  externalName: string | null;
  role: ParticipantRole;
  participationStatus: ParticipationStatus;
  note: string | null;
}

export interface UpdateParticipantPayload {
  role: ParticipantRole;
  participationStatus: ParticipationStatus;
  note: string | null;
}

// ── Query ─────────────────────────────────────────────────────────────────────

export interface MissionTripListQuery {
  year?: number;
  status?: MissionTripStatus;
  country?: string;
  page?: number;
  size?: number;
}
