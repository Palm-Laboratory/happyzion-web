"use client";

import { useState } from "react";
import Link from "next/link";
import type { SmsLogPageResponse, SmsLogSummaryResponse } from "@/lib/admin-sms-api";

interface SmsHistoryClientProps {
  initialLogs: SmsLogPageResponse;
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function SmsHistoryClient({ initialLogs }: SmsHistoryClientProps) {
  const [items, setItems] = useState<SmsLogSummaryResponse[]>(initialLogs.items);
  const [hasNext, setHasNext] = useState(initialLogs.hasNext);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/admin/sms?page=${nextPage}&pageSize=20`);
      if (res.ok) {
        const data = (await res.json()) as SmsLogPageResponse;
        setItems((prev) => [...prev, ...data.items]);
        setHasNext(data.hasNext);
        setPage(nextPage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#5d6f86]">
          총 <span className="font-semibold text-[#132033]">{items.length}</span>건
        </p>
        <div className="flex gap-2">
          <Link
            href="/admin/sms/send"
            className="flex items-center gap-1.5 rounded-lg border border-[#d7e3f4] bg-[#3f74c7] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#2d5da8]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5L11 2l-4.5 9-1.5-4.5L2 6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            문자 보내기
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-[#e2e8f0] bg-[#f8fafc]">
            <tr>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">발송일시</th>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">유형</th>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">발신번호</th>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">발송건수</th>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">성공/오류</th>
              <th className="px-4 py-3 font-semibold text-[#4a6484]">테스트</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-[13px] text-[#8fa3bb]"
                >
                  전송 내역이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#fafcff]"
                >
                  <td className="px-4 py-3 text-[#132033]">
                    {formatDateTime(log.requestedAt)}
                  </td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3 text-[#4a6484]">{log.sender}</td>
                  <td className="px-4 py-3 text-[#132033]">{log.totalCount}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-700">{log.successCount}</span>
                    <span className="text-[#8fa3bb]"> / </span>
                    <span className="text-red-600">{log.errorCount}</span>
                  </td>
                  <td className="px-4 py-3">
                    {log.testMode ? (
                      <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[11px] font-semibold text-yellow-700">
                        테스트
                      </span>
                    ) : (
                      <span className="text-[#8fa3bb]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/sms/${log.id}`}
                      className="text-[12px] font-semibold text-[#3f74c7] transition hover:text-[#2d5da8]"
                    >
                      상세 보기
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasNext && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="rounded-lg border border-[#d7e3f4] bg-white px-4 py-2 text-[13px] font-semibold text-[#4a6484] transition hover:bg-[#f8fafc] disabled:opacity-50"
          >
            {isLoading ? "불러오는 중..." : "더 불러오기"}
          </button>
        </div>
      )}
    </div>
  );
}
