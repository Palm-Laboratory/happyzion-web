"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  FinanceReportListQuery,
  FinanceReportPageResponse,
} from "@/lib/admin-finance-types";

const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;
const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

function formatUploadedAt(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FinanceReportListClient({
  data,
  query,
}: {
  data: FinanceReportPageResponse;
  query: FinanceReportListQuery;
}) {
  const router = useRouter();
  const [yearInput, setYearInput] = useState<string>(query.year?.toString() ?? "");
  const [monthInput, setMonthInput] = useState<string>(query.month?.toString() ?? "");

  function buildParams(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (query.year != null) params.set("year", String(query.year));
    if (query.month != null) params.set("month", String(query.month));
    if (query.size !== 20) params.set("size", String(query.size));
    params.set("page", "0");
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    return params;
  }

  function applyFilter() {
    const params = new URLSearchParams();
    if (yearInput.trim()) params.set("year", yearInput.trim());
    if (monthInput.trim()) params.set("month", monthInput.trim());
    if (query.size !== 20) params.set("size", String(query.size));
    params.set("page", "0");
    router.push(`/admin/finance?${params}`);
  }

  function resetFilter() {
    setYearInput("");
    setMonthInput("");
    router.push("/admin/finance");
  }

  function goToPage(page: number) {
    router.push(`/admin/finance?${buildParams({ page: String(page) })}`);
  }

  function handleSizeChange(size: number) {
    router.push(
      `/admin/finance?${buildParams({
        size: size !== 20 ? String(size) : undefined,
        page: "0",
      })}`,
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / query.size));

  return (
    <div className="space-y-4">
      {/* 필터 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#55697f]">연도</span>
            <input
              type="number"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilter()}
              placeholder="예: 2026"
              className="h-9 w-28 rounded-lg border border-[#d5deea] px-3 text-[13px] tabular-nums focus:border-[#3f74c7] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#55697f]">월</span>
            <select
              value={monthInput}
              onChange={(e) => setMonthInput(e.target.value)}
              className="h-9 w-24 rounded-lg border border-[#d5deea] px-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            >
              <option value="">전체</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={applyFilter}
            className="h-9 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white hover:bg-[#3461ad]"
          >
            검색
          </button>
          <button
            type="button"
            onClick={resetFilter}
            className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb]"
          >
            초기화
          </button>
          <div className="ml-auto text-[12px] text-[#5d6f86]">
            전체 <span className="font-semibold text-[#0f1c2e]">{data.total}</span>건
          </div>
        </div>
      </section>

      {/* 테이블 */}
      <section className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
        {data.items.length === 0 ? (
          <div className="p-12 text-center text-[13px] text-[#5d6f86]">
            등록된 보고서가 없습니다. 우측 상단의 &ldquo;엑셀 업로드&rdquo;로 보고서를 추가하세요.
          </div>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e7eef7] bg-[#f8fafd] text-left text-[11px] font-semibold text-[#55697f]">
                <th className="px-5 py-2.5">기간</th>
                <th className="px-5 py-2.5 text-right">수입</th>
                <th className="px-5 py-2.5 text-right">지출</th>
                <th className="px-5 py-2.5 text-right">남은 헌금</th>
                <th className="px-5 py-2.5">파일명</th>
                <th className="px-5 py-2.5">업로드 일시</th>
                <th className="px-5 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((r) => (
                <tr
                  key={r.id}
                  className={`cursor-pointer border-b border-[#f1f5fb] transition-colors last:border-b-0 ${
                    r.checksumMismatch
                      ? "bg-[#fef4f4] hover:bg-[#fce8e8]"
                      : "hover:bg-[#f8fafd]"
                  }`}
                  onClick={() => router.push(`/admin/finance/${r.id}`)}
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/finance/${r.id}`}
                      className="font-semibold text-[#0f1c2e] hover:text-[#3f74c7]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {r.year}년 {r.month}월 {r.week}주
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#1d6f42]">
                    {WON(r.incomeTotal)}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#b3502a]">
                    {WON(r.expenseTotal)}
                  </td>
                  <td
                    className={`px-5 py-3 text-right tabular-nums font-semibold ${
                      r.balance < 0 ? "text-[#b3502a]" : "text-[#0f1c2e]"
                    }`}
                  >
                    {WON(r.balance)}
                  </td>
                  <td className="px-5 py-3 text-[#5d6f86]">
                    <span className="block max-w-[220px] truncate" title={r.sourceFilename}>
                      {r.sourceFilename}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#5d6f86] tabular-nums">
                    {formatUploadedAt(r.uploadedAt)}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {r.checksumMismatch && (
                      <span
                        title="합계 불일치 경고"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fee2e2] text-[12px] font-bold text-[#b91c1c]"
                      >
                        !
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 페이지네이션 */}
      {data.items.length > 0 && (
        <div className="flex items-center justify-between text-[12px] text-[#5d6f86]">
          <label className="flex items-center gap-2">
            <span>페이지당</span>
            <select
              value={query.size}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="h-8 rounded-lg border border-[#d5deea] px-2 text-[12px] focus:border-[#3f74c7] focus:outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}건
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goToPage(Math.max(0, query.page - 1))}
              disabled={query.page === 0}
              className="h-8 rounded-lg border border-[#d5deea] px-3 font-medium hover:bg-[#f4f7fb] disabled:opacity-40"
            >
              이전
            </button>
            <span className="px-3 tabular-nums">
              {query.page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => goToPage(query.page + 1)}
              disabled={!data.hasNext}
              className="h-8 rounded-lg border border-[#d5deea] px-3 font-medium hover:bg-[#f4f7fb] disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
