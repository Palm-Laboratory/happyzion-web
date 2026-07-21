"use client";

import type { MenuType } from "@/lib/admin-menu-api";

type Props = {
  onAddRoot: (type: MenuType) => void;
  onClose: () => void;
};

export function MenuAddModal({ onAddRoot, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[15px] font-bold text-[#0f1c2e]">상단 메뉴 추가</h3>
        <p className="mt-1 text-[12px] text-[#6d7f95]">추가할 상단 메뉴의 종류를 선택하세요</p>
        <div className="mt-4 space-y-3">
          <button
            type="button"
            onClick={() => onAddRoot("FOLDER")}
            className="w-full rounded-xl border border-[#d7e3f4] bg-[#f7fbff] p-4 text-left transition hover:border-[#3f74c7]"
          >
            <p className="text-[13px] font-bold text-[#1d3a6e]">일반 메뉴 그룹</p>
            <p className="mt-1 text-[12px] leading-5 text-[#5d6f86]">
              정적 페이지, 게시판, 외부 링크를 직접 추가해서 구성하는 일반적인 메뉴입니다.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onAddRoot("YOUTUBE_PLAYLIST_GROUP")}
            className="w-full rounded-xl border border-[#e2e8f0] bg-white p-4 text-left transition hover:border-[#3f74c7]"
          >
            <p className="text-[13px] font-bold text-[#1d3a6e]">영상 그룹</p>
            <p className="mt-1 text-[12px] leading-5 text-[#5d6f86]">
              유튜브 재생목록을 담는 전용 그룹입니다. 영상 관리에서 동기화하면 목록이 자동으로
              채워집니다.
            </p>
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-[#e2e8f0] py-2 text-[12px] font-semibold text-[#64748b] hover:bg-[#f8fafc]"
        >
          취소
        </button>
      </div>
    </div>
  );
}
