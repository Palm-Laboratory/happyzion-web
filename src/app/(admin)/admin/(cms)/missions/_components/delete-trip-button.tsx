"use client";

import { useTransition } from "react";
import type { MissionTripFormState } from "../actions";

interface DeleteTripButtonProps {
  onDelete: () => Promise<MissionTripFormState>;
}

export default function DeleteTripButton({ onDelete }: DeleteTripButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("이 선교 여정을 삭제하시겠습니까? 참가자 명단도 함께 삭제됩니다.")) return;
    startTransition(async () => {
      await onDelete();
    });
  }

  return (
    <div className="rounded-xl border border-red-100 bg-white p-5">
      <p className="mb-3 text-sm font-semibold text-red-500">위험 구역</p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#4a6484]">이 여정을 삭제하면 참가자 명단도 함께 삭제됩니다.</p>
        <button
          type="button"
          onClick={handleClick}
          disabled={isPending}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
        >
          {isPending ? "삭제 중…" : "여정 삭제"}
        </button>
      </div>
    </div>
  );
}
