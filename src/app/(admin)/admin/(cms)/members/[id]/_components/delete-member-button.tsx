"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteChurchMemberAction } from "../../actions";

interface DeleteMemberButtonProps {
  memberId: number;
  memberName: string;
}

export default function DeleteMemberButton({ memberId, memberName }: DeleteMemberButtonProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openModal() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    const result = await deleteChurchMemberAction(memberId);
    if (result.ok) {
      router.replace("/admin/members");
      return;
    }
    setDeleting(false);
    setError(result.message);
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex h-9 items-center rounded-lg border border-red-300 px-4 text-[13px] font-semibold text-red-600 transition hover:bg-red-50"
      >
        교인 삭제
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-2xl border border-[#e2e8f0] p-0 shadow-xl backdrop:bg-black/40"
      >
        <div className="w-[420px] p-6">
          <h3 className="text-[15px] font-bold text-[#0f1c2e]">교인 삭제 확인</h3>
          <p className="mt-3 text-[13px] text-[#374151]">
            정말 <strong>[{memberName}]</strong> 교인을 삭제하시겠습니까?
            <br />
            삭제 후에도 변경 이력은 보존됩니다.
          </p>
          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">
              {error}
            </p>
          )}
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={deleting}
              className="inline-flex h-9 items-center rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={deleting}
              className="inline-flex h-9 items-center rounded-lg bg-red-500 px-4 text-[13px] font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {deleting ? "삭제 중…" : "삭제"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
