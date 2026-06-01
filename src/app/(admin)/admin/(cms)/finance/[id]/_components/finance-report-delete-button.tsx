"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FinanceReportDeleteButton({ id, label }: { id: number; label: string }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/finance/reports/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string }).message ?? "삭제에 실패했습니다.");
      }
      router.push("/admin/finance");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "삭제에 실패했습니다.");
      setDeleting(false);
      setConfirm(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="rounded-lg border border-[#fbb6b6] px-3 py-2 text-[13px] font-medium text-[#b91c1c] hover:bg-[#fef4f4]"
      >
        삭제
      </button>

      {/* 확인 모달 */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-[15px] font-bold text-[#0f1c2e]">보고서 삭제</h2>
            <p className="mt-2 text-[13px] text-[#5d6f86]">
              <span className="font-semibold text-[#0f1c2e]">{label}</span> 보고서를 삭제합니다.
              <br />삭제된 데이터는 복구할 수 없습니다.
            </p>
            {error && (
              <p className="mt-3 rounded-lg bg-[#fef4f4] px-3 py-2 text-[12px] text-[#b91c1c]">
                {error}
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                disabled={deleting}
                className="rounded-lg border border-[#d5deea] px-4 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb] disabled:opacity-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-[#b91c1c] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#991b1b] disabled:opacity-50"
              >
                {deleting ? "삭제 중…" : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
