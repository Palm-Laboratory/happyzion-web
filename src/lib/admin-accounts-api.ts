import "server-only";

import { joinApiUrl } from "@/lib/api-base-url";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import { SERVER_API_BASE_URL } from "@/lib/server-config";
import type { components } from "@/types/api";

// ── 타입 ──────────────────────────────────────────────────────────────────────

export type AdminAccountRole = components["schemas"]["AdminAccountDto"]["role"];
export type AuthenticatedAdminAccount = components["schemas"]["AdminAuthenticatedAccountDto"];
export type AdminAccount = components["schemas"]["AdminAccountDto"];
export type AdminAccountsResponse = components["schemas"]["AdminAccountsResponse"];
export type CreateAdminAccountPayload = components["schemas"]["AdminAccountCreateRequest"];
export type UpdateAdminAccountPayload = components["schemas"]["AdminAccountUpdateRequest"];

// ── 인증 ──────────────────────────────────────────────────────────────────────

export async function authenticateAdminCredentials(
  username: string,
  password: string,
): Promise<AuthenticatedAdminAccount> {
  const response = await fetch(joinApiUrl(SERVER_API_BASE_URL, "/api/v1/admin/auth/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  if (!response.ok) {
    let errorCode = "ADMIN_AUTH_FAILED";
    let errorMessage = "관리자 인증에 실패했습니다.";

    try {
      const payload = (await response.json()) as { code?: string; message?: string };
      errorCode = payload.code || errorCode;
      errorMessage = payload.message || errorMessage;
    } catch {
      // ignore parse failures
    }

    throw new AdminApiError(response.status, errorCode, errorMessage);
  }

  return response.json() as Promise<AuthenticatedAdminAccount>;
}

export async function getCurrentAdminAccount(): Promise<AuthenticatedAdminAccount> {
  const response = await adminApiFetch("/api/v1/admin/auth/me");
  return response.json() as Promise<AuthenticatedAdminAccount>;
}

// ── 조회 ──────────────────────────────────────────────────────────────────────

export async function getAdminAccounts(): Promise<AdminAccountsResponse> {
  const response = await adminApiFetch("/api/v1/admin/accounts");
  return response.json() as Promise<AdminAccountsResponse>;
}

export async function getAdminAccount(id: number): Promise<AdminAccount> {
  const response = await adminApiFetch(`/api/v1/admin/accounts/${id}`);
  return response.json() as Promise<AdminAccount>;
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

export async function createAdminAccount(payload: CreateAdminAccountPayload): Promise<AdminAccount> {
  const response = await adminApiFetch("/api/v1/admin/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<AdminAccount>;
}

export async function updateAdminAccount(id: number, payload: UpdateAdminAccountPayload): Promise<AdminAccount> {
  const response = await adminApiFetch(`/api/v1/admin/accounts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<AdminAccount>;
}

export async function deleteAdminAccount(id: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/accounts/${id}`, {
    method: "DELETE",
  });
}

// ── 에러 메시지 변환 ───────────────────────────────────────────────────────────

export function toFriendlyAdminAccountMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }

  const message = error.message.trim();

  if (message.includes("이미 사용 중인 관리자 아이디")) {
    return "이미 사용 중인 관리자 아이디입니다.";
  }

  if (message.includes("8자 이상")) {
    return "비밀번호는 8자 이상으로 입력해 주세요.";
  }

  if (message.includes("아이디, 이름, 비밀번호만 변경")) {
    return "본인 계정에서는 아이디, 이름, 비밀번호만 변경할 수 있습니다.";
  }

  if (message.includes("자기 자신") || message.includes("본인")) {
    return "본인 계정은 수정하거나 삭제할 수 없습니다.";
  }

  if (message.includes("슈퍼 관리자") && message.includes("삭제")) {
    return "슈퍼 관리자 계정은 삭제할 수 없습니다.";
  }

  return fallback;
}
