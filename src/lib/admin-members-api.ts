import "server-only";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import type {
  ChurchMemberListQuery,
  ChurchMemberPageResponse,
  CreateChurchMemberPayload,
  ChurchMemberDetail,
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";

// ── API ───────────────────────────────────────────────────────────────────────

export async function getChurchMembers(q: ChurchMemberListQuery): Promise<ChurchMemberPageResponse> {
  const params = new URLSearchParams();
  if (q.name?.trim()) params.set("name", q.name.trim());
  if (q.phone?.trim()) params.set("phone", q.phone.trim());
  if (q.includeInactive) params.set("includeInactive", "true");
  params.set("page", String(q.page));
  params.set("size", String(q.size));
  const res = await adminApiFetch(`/api/v1/admin/members?${params}`);
  return res.json() as Promise<ChurchMemberPageResponse>;
}

export async function createChurchMember(payload: CreateChurchMemberPayload): Promise<{ id: number }> {
  const res = await adminApiFetch("/api/v1/admin/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<{ id: number }>;
}

export async function getChurchMember(id: number): Promise<ChurchMemberDetail> {
  const res = await adminApiFetch(`/api/v1/admin/members/${id}`);
  return res.json() as Promise<ChurchMemberDetail>;
}

export async function updateChurchMember(
  id: number,
  payload: CreateChurchMemberPayload,
): Promise<ChurchMemberDetail> {
  const res = await adminApiFetch(`/api/v1/admin/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<ChurchMemberDetail>;
}

export async function deleteChurchMember(id: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/members/${id}`, { method: "DELETE" });
}

export async function getChurchMemberAuditLogs(
  id: number,
  page: number,
  size: number,
): Promise<ChurchMemberAuditPage> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  const res = await adminApiFetch(`/api/v1/admin/members/${id}/audit-logs?${params}`);
  return res.json() as Promise<ChurchMemberAuditPage>;
}

// ── 에러 메시지 변환 ───────────────────────────────────────────────────────────

export function toFriendlyMemberMessage(
  error: unknown,
  fallback: string,
  operationLabel: "등록" | "수정" | "삭제" = "등록",
): string {
  if (!(error instanceof AdminApiError)) {
    if (error instanceof Error && /fetch failed|ECONNREFUSED|Failed to fetch/i.test(error.message)) {
      return "백엔드 API 서버에 연결할 수 없습니다. API 서버 상태를 확인한 뒤 다시 시도해 주세요.";
    }
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }

  if (error.status >= 500) {
    return `백엔드 서버 오류로 교인을 ${operationLabel}하지 못했습니다. API 서버 로그를 확인해 주세요.`;
  }

  const message = error.message.trim();
  if (message.includes("이미 사용 중인") || message.includes("중복")) {
    return "이미 등록된 연락처이거나 중복된 정보가 있습니다.";
  }

  return message || fallback;
}
