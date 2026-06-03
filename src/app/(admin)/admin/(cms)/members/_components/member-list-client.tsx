"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChurchMemberPageResponse, ChurchMemberListQuery, ChurchMemberStatus } from "@/lib/admin-members-types";
import { maskName, maskPhone } from "@/lib/admin-members-mask";
import { STATUS_LABELS, STATUS_BADGE_COLORS } from "./member-enums";

interface MemberListClientProps {
  data: ChurchMemberPageResponse;
  query: ChurchMemberListQuery;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";
type StatusFilterValue = ChurchMemberStatus | "ALL" | "";
const STATUS_OPTIONS = Object.entries(STATUS_LABELS) as [ChurchMemberStatus, string][];

export function getVisiblePageItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index);

  const pages = new Set<number>([0, totalPages - 1]);
  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 0 && page < totalPages - 1) pages.add(page);
  }

  if (currentPage <= 2) {
    pages.add(1);
    pages.add(2);
    pages.add(3);
  }

  if (currentPage >= totalPages - 3) {
    pages.add(totalPages - 4);
    pages.add(totalPages - 3);
    pages.add(totalPages - 2);
  }

  const sorted = Array.from(pages).filter((page) => page >= 0 && page < totalPages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  for (const page of sorted) {
    const previous = items.at(-1);
    if (typeof previous === "number" && page - previous > 1) {
      items.push(page < totalPages - 1 ? "ellipsis-start" : "ellipsis-end");
    }
    items.push(page);
  }
  return items;
}

export default function MemberListClient({ data, query }: MemberListClientProps) {
  const [nameInput, setNameInput] = useState(query.name ?? "");
  const [phoneInput, setPhoneInput] = useState(query.phone ?? "");
  const [statusInput, setStatusInput] = useState<StatusFilterValue>(
    query.status ?? (query.includeInactive ? "ALL" : "ACTIVE"),
  );
  const router = useRouter();
  const totalPages = Math.max(1, Math.ceil(data.total / query.size));
  const currentPage = Math.min(Math.max(query.page, 0), totalPages - 1);
  const visiblePageItems = getVisiblePageItems(currentPage, totalPages);
  const firstVisibleNumber = data.items.length === 0 ? 0 : query.page * query.size + 1;
  const lastVisibleNumber = data.items.length === 0 ? 0 : Math.min(data.total, query.page * query.size + data.items.length);

  function buildParams(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (query.name) params.set("name", query.name);
    if (query.phone) params.set("phone", query.phone);
    if (query.status) params.set("status", query.status);
    if (query.includeInactive) params.set("includeInactive", "true");
    if (query.size !== 20) params.set("size", String(query.size));
    params.set("page", "0");
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    return params;
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (nameInput.trim()) params.set("name", nameInput.trim());
    if (phoneInput.trim()) params.set("phone", phoneInput.trim());
    if (statusInput === "ALL") params.set("includeInactive", "true");
    else if (statusInput && statusInput !== "ACTIVE") params.set("status", statusInput);
    if (query.size !== 20) params.set("size", String(query.size));
    params.set("page", "0");
    router.push(`/admin/members?${params}`);
  }

  function handleReset() {
    setNameInput("");
    setPhoneInput("");
    setStatusInput("ACTIVE");
    router.push("/admin/members");
  }

  function goToPage(page: number) {
    const nextPage = Math.min(Math.max(page, 0), totalPages - 1);
    router.push(`/admin/members?${buildParams({ page: String(nextPage) })}`);
  }

  function handleSizeChange(size: number) {
    router.push(`/admin/members?${buildParams({ size: size !== 20 ? String(size) : undefined, page: "0" })}`);
  }

  return (
    <div className="space-y-4">
      {/* Filter section */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          {/* Name input */}
          <label className="flex min-w-0 flex-1 flex-col gap-1.5" style={{ minWidth: "160px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">이름</span>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="이름 검색..."
              className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>
          {/* Phone input */}
          <label className="flex min-w-0 flex-1 flex-col gap-1.5" style={{ minWidth: "160px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">연락처</span>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="010-0000-0000"
              className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>
          {/* Status select */}
          <label className="flex min-w-0 flex-col gap-1.5" style={{ minWidth: "150px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">상태</span>
            <select
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value as StatusFilterValue)}
              className="h-9 rounded-lg border border-[#d5deea] bg-white px-3 text-[13px] text-[#374151] focus:border-[#3f74c7] focus:outline-none"
            >
              <option value="ALL">전체 상태</option>
              {STATUS_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          {/* Search button */}
          <button
            type="button"
            onClick={handleSearch}
            className="h-9 rounded-lg bg-[#3f74c7] px-5 text-[13px] font-semibold text-white transition hover:bg-[#4a82d7]"
          >
            검색
          </button>
          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="h-9 rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9]"
          >
            초기화
          </button>
        </div>
      </section>

      {/* Table section */}
      <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf2f7] px-5 py-4">
          <span className="text-[13px] text-[#5d6f86]">
            총 {data.total.toLocaleString("ko-KR")}명
            {data.total > 0 && (
              <span className="ml-2 text-[#8fa3bb]">
                {firstVisibleNumber.toLocaleString("ko-KR")}-{lastVisibleNumber.toLocaleString("ko-KR")}번 표시
              </span>
            )}
          </span>
          <select
            value={query.size}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="h-8 rounded-lg border border-[#d5deea] bg-white px-2 text-[12px] font-semibold text-[#334155] focus:border-[#3f74c7] focus:outline-none"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}개</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#edf2f7] bg-[#f8fafc]">
                {["번호", "이름", "연락처", "상태", "등록일"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-5 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-[#6d7f95]">
                    조건에 맞는 교인이 없습니다.
                  </td>
                </tr>
              ) : (
                data.items.map((member, idx) => (
                  <tr
                    key={member.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push(`/admin/members/${member.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/admin/members/${member.id}`);
                      }
                    }}
                    aria-label={`${member.name} 교인 상세 보기`}
                    className="cursor-pointer border-b border-[#f0f4f8] last:border-0 transition hover:bg-[#fafcff] focus:outline-none focus-visible:bg-[#eff5fd] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3f74c7]"
                  >
                    <td className="px-5 py-4 text-[13px] text-[#5d6f86]">{query.page * query.size + idx + 1}</td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-[#0f1c2e]">{maskName(member.name)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-[13px] text-[#374151]">{maskPhone(member.phone)}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE_COLORS[member.status]}`}>
                        {STATUS_LABELS[member.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">{formatDate(member.registeredAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="grid grid-cols-3 items-center border-t border-[#edf2f7] px-5 py-4">
          <div />
          <nav className="flex items-center justify-center gap-1" aria-label="교인 목록 페이지">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#334155] transition hover:bg-[#f0f6ff] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="이전 페이지"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7.5 2.5l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {visiblePageItems.map((item) => {
              if (typeof item !== "number") {
                return (
                  <span
                    key={item}
                    className="flex h-8 w-8 items-center justify-center text-[12px] font-semibold text-[#8fa3bb]"
                    aria-hidden="true"
                  >
                    ...
                  </span>
                );
              }
              const isCurrent = item === currentPage;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToPage(item)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[12px] font-semibold transition ${
                    isCurrent
                      ? "bg-[#3f74c7] text-white"
                      : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f0f6ff]"
                  }`}
                >
                  {item + 1}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#334155] transition hover:bg-[#f0f6ff] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="다음 페이지"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </nav>
          <div className="flex justify-end">
            <Link
              href="/admin/members/new"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4a82d7]"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              교인 등록
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
