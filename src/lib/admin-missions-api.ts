import "server-only";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import type {
  MissionTripListQuery,
  MissionTripListResponse,
  MissionTripDetail,
  MissionTripSavePayload,
  AddParticipantPayload,
  UpdateParticipantPayload,
  MissionParticipant,
  MemberMissionListResponse,
} from "@/lib/admin-missions-types";

// ── Trips ─────────────────────────────────────────────────────────────────────

export async function getMissionTrips(q: MissionTripListQuery = {}): Promise<MissionTripListResponse> {
  const params = new URLSearchParams();
  if (q.year) params.set("year", String(q.year));
  if (q.status) params.set("status", q.status);
  if (q.country?.trim()) params.set("country", q.country.trim());
  const qs = params.toString();
  const res = await adminApiFetch(`/api/v1/admin/mission-trips${qs ? `?${qs}` : ""}`);
  return res.json() as Promise<MissionTripListResponse>;
}

export async function getMissionTrip(id: number): Promise<MissionTripDetail> {
  const res = await adminApiFetch(`/api/v1/admin/mission-trips/${id}`);
  return res.json() as Promise<MissionTripDetail>;
}

export async function createMissionTrip(payload: MissionTripSavePayload): Promise<MissionTripDetail> {
  const res = await adminApiFetch("/api/v1/admin/mission-trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<MissionTripDetail>;
}

export async function updateMissionTrip(id: number, payload: MissionTripSavePayload): Promise<MissionTripDetail> {
  const res = await adminApiFetch(`/api/v1/admin/mission-trips/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<MissionTripDetail>;
}

export async function deleteMissionTrip(id: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/mission-trips/${id}`, { method: "DELETE" });
}

// ── Participants ──────────────────────────────────────────────────────────────

export async function addMissionParticipant(
  tripId: number,
  payload: AddParticipantPayload,
): Promise<MissionParticipant> {
  const res = await adminApiFetch(`/api/v1/admin/mission-trips/${tripId}/participants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<MissionParticipant>;
}

export async function updateMissionParticipant(
  tripId: number,
  participantId: number,
  payload: UpdateParticipantPayload,
): Promise<MissionParticipant> {
  const res = await adminApiFetch(
    `/api/v1/admin/mission-trips/${tripId}/participants/${participantId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return res.json() as Promise<MissionParticipant>;
}

export async function removeMissionParticipant(tripId: number, participantId: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/mission-trips/${tripId}/participants/${participantId}`, {
    method: "DELETE",
  });
}

// ── Member missions ───────────────────────────────────────────────────────────

export async function getMemberMissions(memberId: number): Promise<MemberMissionListResponse> {
  const res = await adminApiFetch(`/api/v1/admin/members/${memberId}/missions`);
  return res.json() as Promise<MemberMissionListResponse>;
}

// ── 에러 메시지 변환 ───────────────────────────────────────────────────────────

export function toFriendlyMissionMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    if (error instanceof Error && /fetch failed|ECONNREFUSED|Failed to fetch/i.test(error.message)) {
      return "백엔드 API 서버에 연결할 수 없습니다. API 서버 상태를 확인한 뒤 다시 시도해 주세요.";
    }
    return fallback;
  }
  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }
  if (error.status === 404) return "대상을 찾을 수 없습니다.";
  if (error.status === 409 || error.status === 400) return error.message || fallback;
  return fallback;
}
