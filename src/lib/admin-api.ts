import "server-only";

import { joinApiUrl } from "@/lib/api-base-url";
import { SERVER_API_BASE_URL } from "@/lib/server-config";
import { getAdminSession, isAdminSession } from "@/auth";

interface UpstreamApiErrorResponse {
  code?: string;
  message?: string;
}

export class AdminApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.code = code;
  }
}

async function parseUpstreamError(response: Response) {
  try {
    const data = (await response.json()) as UpstreamApiErrorResponse;
    return {
      code: data.code || "UPSTREAM_ERROR",
      message: data.message || `관리자 API 호출에 실패했습니다. (${response.status})`,
    };
  } catch {
    return {
      code: "UPSTREAM_ERROR",
      message: `관리자 API 호출에 실패했습니다. (${response.status})`,
    };
  }
}

async function resolveAdminJwt(): Promise<string> {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.adminJwt) {
    throw new AdminApiError(401, "UNAUTHORIZED", "관리자 인증이 필요합니다.");
  }
  return session.user.adminJwt;
}

export async function adminApiFetch(path: string, init?: RequestInit) {
  const jwt = await resolveAdminJwt();

  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${jwt}`);

  const response = await fetch(joinApiUrl(SERVER_API_BASE_URL, path), {
    ...init,
    headers: Object.fromEntries(headers.entries()),
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await parseUpstreamError(response);
    throw new AdminApiError(response.status, error.code, error.message);
  }

  return response;
}

export interface AdminVideoSyncResponse {
  status: string;
  totalPlaylists: number;
  succeededPlaylists: number;
  failedPlaylists: number;
  completedAt: string;
}
