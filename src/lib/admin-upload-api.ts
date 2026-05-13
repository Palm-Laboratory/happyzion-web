import "server-only";

import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export type AdminUploadAssetKind = "INLINE_IMAGE" | "FILE_ATTACHMENT" | "MAIN_VIDEO";

export interface AdminUploadTokenRequest {
  kind: AdminUploadAssetKind;
  boardId?: string;
  maxByteSize?: number;
  allowedMimeTypes?: string[];
}

export interface AdminUploadTokenResponse {
  rawToken: string;
}

const DEFAULT_MAX_BYTE_SIZE = 10_000_000;
const INLINE_IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const FILE_ATTACHMENT_MIME_TYPES = [...INLINE_IMAGE_MIME_TYPES, "application/pdf"];
const MAIN_VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

function defaultAllowedMimeTypes(kind: AdminUploadAssetKind) {
  if (kind === "INLINE_IMAGE") {
    return INLINE_IMAGE_MIME_TYPES;
  }

  if (kind === "MAIN_VIDEO") {
    return MAIN_VIDEO_MIME_TYPES;
  }

  return FILE_ATTACHMENT_MIME_TYPES;
}

function buildUploadTokenPayload(payload: AdminUploadTokenRequest) {
  return {
    kind: payload.kind,
    maxByteSize:
      typeof payload.maxByteSize === "number" && payload.maxByteSize > 0
        ? payload.maxByteSize
        : DEFAULT_MAX_BYTE_SIZE,
    allowedMimeTypes:
      payload.allowedMimeTypes && payload.allowedMimeTypes.length > 0
        ? payload.allowedMimeTypes
        : defaultAllowedMimeTypes(payload.kind),
  };
}

export async function issueAdminUploadToken(
  actorId: string,
  payload: AdminUploadTokenRequest,
): Promise<AdminUploadTokenResponse> {
  const response = await adminApiFetch("/api/v1/admin/uploads/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Actor-Id": actorId,
    },
    body: JSON.stringify(buildUploadTokenPayload(payload)),
  });

  return response.json() as Promise<AdminUploadTokenResponse>;
}

export function toFriendlyAdminUploadMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }

  if (error.code === "ADMIN_SYNC_KEY_MISSING") {
    return "관리자 업로드 기능 설정이 아직 완료되지 않았습니다. 서버 설정을 확인해 주세요.";
  }

  return error.message || fallback;
}
