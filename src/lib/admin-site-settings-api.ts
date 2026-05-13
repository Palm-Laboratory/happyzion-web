import "server-only";

import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export interface MainVideoSetting {
  videoUrl: string;
}

export async function getAdminMainVideoSetting(): Promise<MainVideoSetting> {
  const response = await adminApiFetch("/api/v1/admin/site/main-video");
  return response.json() as Promise<MainVideoSetting>;
}

export function toFriendlyAdminSiteSettingMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
  }

  return error.message || fallback;
}
