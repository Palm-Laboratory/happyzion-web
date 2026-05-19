"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChurchMemberPageResponse, ChurchMemberListQuery } from "@/lib/admin-members-types";
import { maskName, maskPhone } from "@/lib/admin-members-mask";
import { STATUS_LABELS, STATUS_BADGE_COLORS } from "./member-enums";

interface MemberListClientProps {
  data: ChurchMemberPageResponse;
  query: ChurchMemberListQuery;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export default function MemberListClient({ data, query }: MemberListClientProps) {
  const [nameInput, setNameInput] = useState(query.name ?? "");
  const [phoneInput, setPhoneInput] = useState(query.phone ?? "");
  const [includeInactiveInput, setIncludeInactiveInput] = useState(query.includeInactive ?? false);
  const router = useRouter();

  function handleSearch() {
    const params = new URLSearchParams();
    if (nameInput.trim()) params.set("name", nameInput.trim());
    if (phoneInput.trim()) params.set("phone", phoneInput.trim());
    if (includeInactiveInput) params.set("includeInactive", "true");
    params.set("page", "0");
    router.push(`/admin/members?${params}`);
  }

  function handleReset() {
    setNameInput("");
    setPhoneInput("");
    setIncludeInactiveInput(false);
    router.push("/admin/members");
  }

  function goToPage(page: number) {
    const params = new URLSearchParams();
    if (query.name) params.set("name", query.name);
    if (query.phone) params.set("phone", query.phone);
    if (query.includeInactive) params.set("includeInactive", "true");
    params.set("page", String(page));
    router.push(`/admin/members?${params}`);
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
          {/* includeInactive checkbox */}
          <label className="flex cursor-pointer items-center gap-2 pb-1">
            <input
              type="checkbox"
              checked={includeInactiveInput}
              onChange={(e) => setIncludeInactiveInput(e.target.checked)}
              className="accent-[#3f74c7]"
            />
            <span className="text-[13px] text-[#374151]">비활성 포함</span>
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
        <div className="flex items-center justify-between border-t border-[#edf2f7] px-5 py-3">
          <button
            type="button"
            onClick={() => goToPage(query.page - 1)}
            disabled={query.page === 0}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dde4ef] px-3 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            이전
          </button>
          <span className="text-[13px] text-[#5d6f86]">{query.page + 1} 페이지</span>
          <button
            type="button"
            onClick={() => goToPage(query.page + 1)}
            disabled={!data.hasNext}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dde4ef] px-3 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            다음
          </button>
        </div>
      </section>
    </div>
  );
}
