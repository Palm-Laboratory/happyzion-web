import "server-only";

import { adminApiFetch, AdminApiError } from "@/lib/admin-api";
import type { components } from "@/types/api";

export type MissionTone = "gold" | "red" | null;
export type MissionEntry = components["schemas"]["MissionAdminEntryResponse"];
export type MissionYear = components["schemas"]["MissionAdminYearSummaryResponse"];
export type MissionYearDetail = components["schemas"]["MissionAdminYearDetailResponse"];

export interface MissionEntryPayload {
  month: string | null;
  place: string;
  isFirst: boolean;
  sortOrder: number;
}

export interface MissionYearPayload {
  year: string;
  caption: string;
  tone: MissionTone;
  sortOrder?: number;
  entries: MissionEntryPayload[];
}

export async function listMissionYears(): Promise<MissionYear[]> {
  const response = await adminApiFetch("/api/v1/admin/mission-history");
  const data = (await response.json()) as { years: MissionYear[] };
  return data.years;
}

export async function createMissionYear(payload: MissionYearPayload): Promise<MissionYearDetail> {
  const response = await adminApiFetch("/api/v1/admin/mission-history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<MissionYearDetail>;
}

export async function updateMissionYear(yearId: number, payload: MissionYearPayload): Promise<MissionYearDetail> {
  const response = await adminApiFetch(`/api/v1/admin/mission-history/${yearId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<MissionYearDetail>;
}

export async function deleteMissionYear(yearId: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/mission-history/${yearId}`, {
    method: "DELETE",
  });
}

export function toFriendlyMissionHistoryMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) return fallback;
  if (error.status === 401 || error.status === 403) return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
  return error.message || fallback;
}
