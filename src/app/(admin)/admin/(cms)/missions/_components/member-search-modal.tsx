"use client";

import { useEffect, useRef, useState } from "react";
import type { ChurchMemberSummary } from "@/lib/admin-members-types";

export interface SelectedMember {
  id: number;
  name: string;
}

interface MemberSearchModalProps {
  onSelect: (member: SelectedMember) => void;
  onClose: () => void;
}

export default function MemberSearchModal({ onSelect, onClose }: MemberSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChurchMemberSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 모달 열리면 인풋 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function search(name: string) {
    if (!name.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const params = new URLSearchParams({ name: name.trim(), size: "30" });
    fetch(`/api/admin/members?${params}`)
      .then((r) => r.json())
      .then((data: { items?: ChurchMemberSummary[] }) => {
        setResults(data.items ?? []);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      search(query);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex w-full max-w-md flex-col rounded-2xl bg-white shadow-xl" style={{ maxHeight: "80vh" }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-[#e2eaf3] px-5 py-4">
          <h2 className="text-base font-semibold text-[#0f1c2e]">교인 검색</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#8fa3bb] transition hover:bg-[#f0f4f9] hover:text-[#4a6484]"
            aria-label="닫기"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 검색 인풋 */}
        <div className="p-4">
          <div className="relative">
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa3bb]"
            >
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="이름으로 검색..."
              className="w-full rounded-lg border border-[#d0dae8] bg-[#f9fbfd] py-2.5 pl-9 pr-3 text-sm text-[#1a3152] placeholder-[#b0bec9] outline-none transition focus:border-[#3f74c7] focus:bg-white"
            />
            {loading && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8fa3bb]">검색 중…</span>
            )}
          </div>
        </div>

        {/* 결과 목록 */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {!searched ? (
            <p className="py-8 text-center text-sm text-[#8fa3bb]">이름을 입력하면 검색됩니다.</p>
          ) : results.length === 0 && !loading ? (
            <p className="py-8 text-center text-sm text-[#8fa3bb]">검색 결과가 없습니다.</p>
          ) : (
            <ul className="divide-y divide-[#f0f4f9] rounded-lg border border-[#e2eaf3]">
              {results.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => onSelect({ id: m.id, name: m.name })}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#f5f9ff]"
                  >
                    {/* 아바타 */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f2ff] text-xs font-semibold text-[#3f74c7]">
                      {m.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1a3152]">{m.name}</p>
                      <p className="text-xs text-[#8fa3bb]">{m.phone}</p>
                    </div>
                    {m.cellLabel && (
                      <span className="shrink-0 rounded-full bg-[#f0f4f9] px-2 py-0.5 text-xs text-[#4a6484]">
                        {m.cellLabel}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
