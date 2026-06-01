"use client";

import { useTransition } from "react";
import type { EducationCourseFormState } from "../actions";

interface DeleteCourseButtonProps {
  onDelete: () => Promise<EducationCourseFormState>;
}

export default function DeleteCourseButton({ onDelete }: DeleteCourseButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("이 교육 과정을 삭제하시겠습니까? 교육생 명단도 함께 삭제됩니다.")) return;
    startTransition(async () => {
      await onDelete();
    });
  }

  return (
    <div className="rounded-xl border border-red-100 bg-white p-5">
<div className="flex items-center justify-between">
        <p className="text-sm text-[#4a6484]">이 과정을 삭제하면 교육생 명단도 함께 삭제됩니다.</p>
        <button
          type="button"
          onClick={handleClick}
          disabled={isPending}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
        >
          {isPending ? "삭제 중…" : "과정 삭제"}
        </button>
      </div>
    </div>
  );
}
