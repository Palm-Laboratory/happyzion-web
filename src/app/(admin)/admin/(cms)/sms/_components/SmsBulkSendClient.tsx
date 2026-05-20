"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BulkEditorTable from "./BulkEditorTable";
import MessageEditor from "./MessageEditor";
import type { SmsBulkSendRequest, SmsSendResponse, BulkRowDto } from "@/lib/admin-sms-api";

type BulkRow = Omit<BulkRowDto, "hasIdentifier">;

function getByteLength(str: string): number {
  let bytes = 0;
  for (const char of str) {
    const code = char.codePointAt(0) ?? 0;
    bytes += code > 0x7f ? 2 : 1;
  }
  return bytes;
}

export default function SmsBulkSendClient() {
  const router = useRouter();

  const [rows, setRows] = useState<BulkRow[]>([]);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [testMode, setTestMode] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const msgType = getByteLength(body) <= 90 ? "SMS" : "LMS";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const commonBody = body.trim();
    const validRows = rows.filter(
      (r) => (r.phone || r.churchMemberId) && (r.message.trim() || commonBody),
    );

    if (!commonBody && rows.every((r) => !r.message.trim())) {
      setErrorMsg("문자 내용을 입력해 주세요.");
      return;
    }

    if (validRows.length === 0) {
      setErrorMsg("전송할 행이 없습니다. 수신번호와 메시지를 모두 입력해 주세요.");
      return;
    }

    const payload: SmsBulkSendRequest = {
      msgType,
      title: title.trim() || null,
      testMode,
      rows: validRows.map((r) => ({
        ...r,
        message: r.message.trim() || commonBody,
        hasIdentifier: Boolean(r.phone || r.churchMemberId),
      })),
    };

    setIsSending(true);
    try {
      const res = await fetch("/api/admin/sms/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json()) as { message?: string };
        setErrorMsg(data.message ?? "대량 전송에 실패했습니다.");
        return;
      }

      const result = (await res.json()) as SmsSendResponse;
      router.push(`/admin/sms/${result.smsLogId}`);
    } catch {
      setErrorMsg("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 space-y-5">
        <MessageEditor value={body} onChange={setBody} disabled={isSending} />

        {/* Title */}
        {msgType === "LMS" && (
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-[#4a6484]">
              제목 <span className="text-[#8fa3bb]">(LMS 선택 사항)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSending}
              placeholder="LMS 제목 (선택)"
              className="w-full rounded-lg border border-[#d7e3f4] px-3 py-2 text-[13px] text-[#132033] outline-none transition focus:border-[#3f74c7] focus:ring-1 focus:ring-[#3f74c7] disabled:bg-[#f8fafc]"
            />
          </div>
        )}

        <hr className="border-[#f1f5f9]" />

        {/* Bulk rows table */}
        <BulkEditorTable rows={rows} onChange={setRows} />

        <hr className="border-[#f1f5f9]" />

        {/* Test mode */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            disabled={isSending}
            className="h-4 w-4 rounded border-[#d7e3f4] accent-[#3f74c7]"
          />
          <span className="text-[13px] text-[#4a6484]">
            테스트 모드
            <span className="ml-1 text-[11px] text-[#8fa3bb]">(실제 발송 없이 결과 확인)</span>
          </span>
        </label>
      </div>

      {errorMsg && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSending || rows.length === 0 || (!body.trim() && rows.every((r) => !r.message.trim()))}
          className="flex items-center gap-2 rounded-lg bg-[#3f74c7] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2d5da8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7L12 2l-5 10-2-5-3-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          {isSending ? "전송 중..." : `${rows.length}건 전송`}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSending}
          className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#4a6484] transition hover:bg-[#f8fafc] disabled:opacity-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}
