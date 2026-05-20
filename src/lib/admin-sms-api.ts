import "server-only";

import { adminApiFetch, AdminApiError } from "@/lib/admin-api";
import type { components } from "@/types/api";

// Type aliases from generated api.d.ts
export type SmsSendRequest = components["schemas"]["SmsSendRequest"];
export type SmsBulkSendRequest = components["schemas"]["SmsBulkSendRequest"];
export type BulkRowDto = components["schemas"]["BulkRowDto"];
export type RawRecipientDto = components["schemas"]["RawRecipientDto"];
export type SmsSendResponse = components["schemas"]["SmsSendResponse"];
export type SmsLogPageResponse = components["schemas"]["SmsLogPageResponse"];
export type SmsLogSummaryResponse = components["schemas"]["SmsLogSummaryResponse"];
export type SmsLogDetailResponse = components["schemas"]["SmsLogDetailResponse"];
export type SmsLogRecipientDetailResponse = components["schemas"]["SmsLogRecipientDetailResponse"];

export async function sendSms(payload: SmsSendRequest): Promise<SmsSendResponse> {
  const response = await adminApiFetch("/api/v1/admin/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<SmsSendResponse>;
}

export async function sendSmsBulk(payload: SmsBulkSendRequest): Promise<SmsSendResponse> {
  const response = await adminApiFetch("/api/v1/admin/sms/send-bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<SmsSendResponse>;
}

export async function listSmsLogs(page = 0, pageSize = 20): Promise<SmsLogPageResponse> {
  const response = await adminApiFetch(
    `/api/v1/admin/sms?page=${page}&size=${pageSize}`,
  );
  return response.json() as Promise<SmsLogPageResponse>;
}

export async function getSmsLogDetail(
  smsLogId: number,
  page = 0,
  pageSize = 50,
): Promise<SmsLogDetailResponse> {
  const response = await adminApiFetch(
    `/api/v1/admin/sms/${smsLogId}?page=${page}&size=${pageSize}`,
  );
  return response.json() as Promise<SmsLogDetailResponse>;
}

export function toFriendlySmsMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) return fallback;
  if (error.status === 401 || error.status === 403)
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인해 주세요.";
  return error.message || fallback;
}
