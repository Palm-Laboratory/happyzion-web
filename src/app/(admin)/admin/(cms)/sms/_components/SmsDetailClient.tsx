"use client";

import { useState } from "react";
import type {
  SmsLogDetailResponse,
  SmsLogRecipientDetailResponse,
} from "@/lib/admin-sms-api";
import SmsStatusBadge from "./SmsStatusBadge";

interface SmsDetailClientProps {
  initialDetail: SmsLogDetailResponse;
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function SmsDetailClient({ initialDetail }: SmsDetailClientProps) {
  const [recipients, setRecipients] = useState<SmsLogRecipientDetailResponse[]>(
    initialDetail.recipients,
  );
  const [hasNext, setHasNext] = useState(initialDetail.hasNextRecipient);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const log = initialDetail.log;

  async function loadMoreRecipients() {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `/api/admin/sms/${log.id}?page=${nextPage}&pageSize=50`,
      );
      if (res.ok) {
        const data = (await res.json()) as SmsLogDetailResponse;
        setRecipients((prev) => [...prev, ...data.recipients]);
        setHasNext(data.hasNextRecipient);
        setPage(nextPage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Summary card */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-5">
        <h2 className="mb-4 text-[14px] font-bold text-[#132033]">발송 요약</h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13px] sm:grid-cols-3">
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">발송 일시</dt>
            <dd className="mt-0.5 text-[#132033]">{formatDateTime(log.requestedAt)}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">유형</dt>
            <dd className="mt-0.5">
              <span
                className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${
                  log.msgType === "SMS"
                    ? "bg-blue-100 text-blue-700"
                    : log.msgType === "LMS"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {log.msgType}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">발신번호</dt>
            <dd className="mt-0.5 text-[#132033]">{log.sender}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">총 발송</dt>
            <dd className="mt-0.5 font-semibold text-[#132033]">{log.totalCount}건</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">성공</dt>
            <dd className="mt-0.5 font-semibold text-green-700">{log.successCount}건</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">실패</dt>
            <dd className="mt-0.5 font-semibold text-red-600">{log.errorCount}건</dd>
          </div>
          {log.title && (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">제목</dt>
              <dd className="mt-0.5 text-[#132033]">{log.title}</dd>
            </div>
          )}
          {log.testMode && (
            <div>
              <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">모드</dt>
              <dd className="mt-0.5">
                <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[11px] font-semibold text-yellow-700">
                  테스트
                </span>
              </dd>
            </div>
          )}
          {log.aligoMsgId && (
            <div>
              <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">Aligo ID</dt>
              <dd className="mt-0.5 font-mono text-[12px] text-[#5d6f86]">{log.aligoMsgId}</dd>
            </div>
          )}
          {log.aligoMessage && (
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-[11px] font-semibold uppercase text-[#8fa3bb]">Aligo 응답</dt>
              <dd className="mt-0.5 text-[12px] text-[#5d6f86]">
                [{log.aligoResultCode}] {log.aligoMessage}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Recipients table */}
      <div className="rounded-xl border border-[#e2e8f0] bg-white">
        <div className="border-b border-[#eef2f7] px-4 py-3">
          <p className="text-[13px] font-bold text-[#132033]">수신자 목록</p>
          <p className="text-[11px] text-[#6d7f95]">{recipients.length}명 표시</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-[#e2e8f0] bg-[#f8fafc]">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-[#4a6484]">수신번호</th>
                <th className="px-4 py-2.5 font-semibold text-[#4a6484]">이름</th>
                <th className="px-4 py-2.5 font-semibold text-[#4a6484]">상태</th>
                <th className="px-4 py-2.5 font-semibold text-[#4a6484]">Aligo 상태</th>
                <th className="px-4 py-2.5 font-semibold text-[#4a6484]">메시지</th>
              </tr>
            </thead>
            <tbody>
              {recipients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[13px] text-[#8fa3bb]">
                    수신자 정보가 없습니다.
                  </td>
                </tr>
              ) : (
                recipients.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#fafcff]"
                  >
                    <td className="px-4 py-2.5 font-mono text-[#132033]">{r.phoneMasked}</td>
                    <td className="px-4 py-2.5 text-[#4a6484]">
                      {r.name ?? <span className="text-[#a0b4c8]">—</span>}
                    </td>
                    <td className="px-4 py-2.5">
                      <SmsStatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-2.5 text-[#5d6f86]">
                      {r.aligoSendState ?? <span className="text-[#a0b4c8]">—</span>}
                    </td>
                    <td className="max-w-xs px-4 py-2.5">
                      <p className="truncate text-[#132033]" title={r.message}>
                        {r.message}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {hasNext && (
          <div className="border-t border-[#f1f5f9] p-4 text-center">
            <button
              type="button"
              onClick={loadMoreRecipients}
              disabled={isLoading}
              className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-2 text-[13px] font-semibold text-[#4a6484] transition hover:bg-[#f8fafc] disabled:opacity-50"
            >
              {isLoading ? "불러오는 중..." : "더 불러오기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
