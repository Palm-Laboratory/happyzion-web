import "server-only";

import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import type { components } from "@/types/api";

export type AdminUploadAssetKind = components["schemas"]["UploadTokenIssueRequest"]["kind"];
export type AdminUploadTokenResponse = components["schemas"]["UploadTokenIssueResponse"];

export interface AdminUploadTokenRequest {
  kind: AdminUploadAssetKind;
  boardId?: string;
  maxByteSize?: number;
  allowedMimeTypes?: string[];
}

const DEFAULT_MAX_BYTE_SIZE = 10_000_000;
const INLINE_IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
const FILE_ATTACHMENT_MIME_TYPES = [
  // 이미지
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  // 문서
  "application/pdf",
  "application/msword",                                                          // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",    // .docx
  "application/vnd.ms-excel",                                                   // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",          // .xlsx
  "application/vnd.ms-powerpoint",                                              // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",  // .pptx
  "application/x-hwp",                                                          // .hwp (브라우저/OS별 변형 1)
  "application/haansofthwp",                                                    // .hwp (변형 2)
  "application/vnd.hancom.hwp",                                                 // .hwp (변형 3)
  // 압축
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/vnd.rar",
  "application/x-7z-compressed",
];
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

export async function issueAdminUploadToken(payload: AdminUploadTokenRequest): Promise<AdminUploadTokenResponse> {
  const response = await adminApiFetch("/api/v1/admin/uploads/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

  return error.message || fallback;
}
