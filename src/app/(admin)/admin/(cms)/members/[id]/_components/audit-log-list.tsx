"use client";

import { useState } from "react";
import type {
  AuditAction,
  ChurchMemberAuditEntry,
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";
import { loadMoreAuditLogsAction } from "../../actions";

interface AuditLogListProps {
  memberId: number;
  initialPage: ChurchMemberAuditPage;
}

const ACTION_LABELS: Record<AuditAction, string> = {
  CREATE: "등록",
  UPDATE: "수정",
  DELETE: "삭제",
};

const ACTION_BADGE: Record<AuditAction, string> = {
  CREATE: "bg-emerald-50 text-emerald-600",
  UPDATE: "bg-blue-50 text-blue-600",
  DELETE: "bg-red-50 text-red-500",
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AuditLogList({ memberId, initialPage }: AuditLogListProps) {
  const [items, setItems] = useState<ChurchMemberAuditEntry[]>(initialPage.items);
  const [hasNext, setHasNext] = useState(initialPage.hasNext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLoadMore() {
    setLoading(true);
    setError(null);
    try {
      const next = await loadMoreAuditLogsAction(memberId, page + 1);
      setItems((prev) => [...prev, ...next.items]);
      setHasNext(next.hasNext);
      setPage((p) => p + 1);
    } catch {
      setError("이력을 불러오지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="border-b border-[#f0f4f8] px-6 py-4">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">변경 이력</h2>
      </div>
      {items.length === 0 ? (
        <div className="px-6 py-12 text-center text-[13px] text-[#6d7f95]">
          아직 변경 이력이 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-[#f0f4f8]">
          {items.map((entry) => (
            <li key={entry.id} className="flex items-center gap-3 px-6 py-3 text-[13px]">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${ACTION_BADGE[entry.action]}`}>
                {ACTION_LABELS[entry.action]}
              </span>
              <span className="text-[#5d6f86]">{formatDateTime(entry.createdAt)}</span>
              <span className="text-[#8fa3bb]">관리자 #{entry.actorId}</span>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className="border-t border-[#fecaca] bg-red-50 px-6 py-2 text-[12px] text-red-600">
          {error}
        </div>
      )}
      {hasNext && (
        <div className="border-t border-[#f0f4f8] px-6 py-3 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-60"
          >
            {loading ? "불러오는 중…" : "더 보기"}
          </button>
        </div>
      )}
    </section>
  );
}
