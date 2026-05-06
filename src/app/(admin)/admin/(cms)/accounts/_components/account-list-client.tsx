"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminAccount, AdminAccountRole } from "@/lib/admin-accounts-api";

const ROLE_META: Record<AdminAccountRole, { label: string; cls: string }> = {
  SUPER_ADMIN: { label: "슈퍼 관리자", cls: "bg-[#dbeafe] text-[#1d4ed8]" },
  ADMIN: { label: "관리자", cls: "bg-[#ecfdf5] text-[#047857]" },
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function AccountListClient({ accounts }: { accounts: AdminAccount[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [roleInput, setRoleInput] = useState<AdminAccountRole | "ALL">("ALL");
  const [activeInput, setActiveInput] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  const [applied, setApplied] = useState<{
    search: string;
    role: AdminAccountRole | "ALL";
    active: "ALL" | "ACTIVE" | "INACTIVE";
  }>({ search: "", role: "ALL", active: "ALL" });

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      if (applied.search) {
        const q = applied.search.toLowerCase();
        if (
          !account.displayName.toLowerCase().includes(q) &&
          !account.username.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (applied.role !== "ALL" && account.role !== applied.role) return false;
      if (applied.active === "ACTIVE" && !account.active) return false;
      if (applied.active === "INACTIVE" && account.active) return false;
      return true;
    });
  }, [accounts, applied]);

  const handleSearch = () => {
    setApplied({ search: searchInput.trim(), role: roleInput, active: activeInput });
  };

  const hasActiveFilters =
    applied.search || applied.role !== "ALL" || applied.active !== "ALL";

  return (
    <div className="space-y-4">
      {/* ── 필터 ── */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5" style={{ minWidth: "180px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">검색어</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="이름, 아이디..."
              className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#55697f]">권한</span>
            <select
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value as AdminAccountRole | "ALL")}
              className="h-9 rounded-lg border border-[#d5deea] bg-white px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            >
              <option value="ALL">전체</option>
              <option value="SUPER_ADMIN">슈퍼 관리자</option>
              <option value="ADMIN">관리자</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#55697f]">상태</span>
            <select
              value={activeInput}
              onChange={(e) => setActiveInput(e.target.value as "ALL" | "ACTIVE" | "INACTIVE")}
              className="h-9 rounded-lg border border-[#d5deea] bg-white px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            >
              <option value="ALL">전체</option>
              <option value="ACTIVE">활성</option>
              <option value="INACTIVE">비활성</option>
            </select>
          </label>
          <button
            type="button"
            onClick={handleSearch}
            className="h-9 rounded-lg bg-[#3f74c7] px-5 text-[13px] font-semibold text-white transition hover:bg-[#4a82d7]"
          >
            검색
          </button>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#8fa3bb]">적용된 필터:</span>
            {applied.search && (
              <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#2d5da8]">
                &quot;{applied.search}&quot;
              </span>
            )}
            {applied.role !== "ALL" && (
              <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#2d5da8]">
                {ROLE_META[applied.role as AdminAccountRole]?.label}
              </span>
            )}
            {applied.active !== "ALL" && (
              <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#2d5da8]">
                {applied.active === "ACTIVE" ? "활성" : "비활성"}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setRoleInput("ALL");
                setActiveInput("ALL");
                setApplied({ search: "", role: "ALL", active: "ALL" });
              }}
              className="text-[11px] text-[#8fa3bb] underline-offset-2 hover:text-[#3f74c7] hover:underline"
            >
              초기화
            </button>
          </div>
        )}
      </section>

      {/* ── 테이블 ── */}
      <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf2f7] px-5 py-4">
          <span className="text-[13px] text-[#5d6f86]">
            전체 <span className="font-semibold text-[#132033]">{filteredAccounts.length}</span>건
          </span>
          <Link
            href="/admin/accounts/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4a82d7]"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            계정 추가
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#edf2f7] bg-[#f8fafc]">
                {["번호", "상태", "이름 / 아이디", "권한", "마지막 로그인", "등록일", ""].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-5 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[13px] text-[#6d7f95]">
                    조건에 맞는 계정이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account, idx) => {
                  const roleMeta = ROLE_META[account.role] ?? {
                    label: account.role,
                    cls: "bg-gray-100 text-gray-600",
                  };
                  const lastLogin = account.lastLoginAt
                    ? formatDate(account.lastLoginAt)
                    : "—";
                  return (
                    <tr
                      key={account.id}
                      className="border-b border-[#f0f4f8] last:border-0 transition hover:bg-[#fafcff]"
                    >
                      <td className="px-5 py-4 text-[13px] text-[#5d6f86]">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            account.active
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-[#f1f5f9] text-[#8fa3bb]"
                          }`}
                        >
                          {account.active ? "활성" : "비활성"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-semibold text-[#0f1c2e]">
                          {account.displayName}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-[#8fa3bb]">
                          {account.username}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${roleMeta.cls}`}
                        >
                          {roleMeta.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">
                        {lastLogin}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">
                        {formatDate(account.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/accounts/${account.id}`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-[#bfd0ea] bg-[#edf4ff] px-3 text-[12px] font-medium text-[#2d5da8] transition hover:bg-[#e4efff]"
                        >
                          상세보기
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
