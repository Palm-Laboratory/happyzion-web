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
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
    >
      {isPending ? "삭제 중…" : "여정 삭제"}
    </button>
  );
}
