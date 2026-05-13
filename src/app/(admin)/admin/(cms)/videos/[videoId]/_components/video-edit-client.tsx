"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminVideoDetail, UpdateAdminVideoMetaRequest } from "@/lib/admin-videos-api";
import { useAdminToast } from "../../../components/admin-toast-provider";

type VideoDraft = {
  displayTitle: string;
  preacherName: string;
  displayPublishedAt: string;
  hidden: boolean;
  scriptureReference: string;
  scriptureBody: string;
  messageBody: string;
  summary: string;
  thumbnailOverrideUrl: string;
};

function pad(value: number) {
  return `${value}`.padStart(2, "0");
}

function formatDateTime(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toDateTimeLocalValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function createDraft(detail: AdminVideoDetail): VideoDraft {
  return {
    displayTitle: detail.title === detail.sourceTitle ? "" : detail.title,
    preacherName: detail.preacherName ?? "",
    displayPublishedAt:
      detail.publishedAt && detail.publishedAt !== detail.sourcePublishedAt
        ? toDateTimeLocalValue(detail.publishedAt)
        : "",
    hidden: detail.hidden,
    scriptureReference: detail.scriptureReference ?? "",
    scriptureBody: detail.scriptureBody ?? "",
    messageBody: detail.messageBody ?? "",
    summary: detail.summary ?? "",
    thumbnailOverrideUrl: detail.thumbnailOverrideUrl ?? "",
  };
}

function toUpdatePayload(draft: VideoDraft): UpdateAdminVideoMetaRequest {
  return {
    displayTitle: draft.displayTitle.trim() || null,
    preacherName: draft.preacherName.trim() || null,
    displayPublishedAt: draft.displayPublishedAt
      ? new Date(draft.displayPublishedAt).toISOString()
      : null,
    hidden: draft.hidden,
    scriptureReference: draft.scriptureReference.trim() || null,
    scriptureBody: draft.scriptureBody.trim() || null,
    messageBody: draft.messageBody.trim() || null,
    summary: draft.summary.trim() || null,
    thumbnailOverrideUrl: draft.thumbnailOverrideUrl.trim() || null,
  };
}

export default function VideoEditClient({ initialDetail }: { initialDetail: AdminVideoDetail }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [detail, setDetail] = useState<AdminVideoDetail>(initialDetail);
  const [draft, setDraft] = useState<VideoDraft>(() => createDraft(initialDetail));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await fetch(
        `/api/admin/videos/${encodeURIComponent(detail.videoId)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toUpdatePayload(draft)),
        },
      );

      const payload = (await response.json()) as AdminVideoDetail & { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "영상 메타를 저장하지 못했습니다.");
      }

      setDetail(payload);
      setDraft(createDraft(payload));
      toast.success("저장됐습니다.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "영상 메타를 저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const set = <K extends keyof VideoDraft>(key: K, value: VideoDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      {/* 원본 정보 */}
      <section className="rounded-2xl border border-[#eef2f7] bg-[#f8fafc] p-5">
        <h2 className="mb-4 text-[13px] font-bold text-[#334155]">원본 정보 (YouTube)</h2>
        <dl className="grid gap-3 text-[12px] text-[#5d6f86] sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-[#334155]">원본 제목</dt>
            <dd className="mt-1">{detail.sourceTitle}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#334155]">형식</dt>
            <dd className="mt-1">{detail.contentForm === "SHORTFORM" ? "숏폼" : "롱폼"}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#334155]">원본 공개일</dt>
            <dd className="mt-1">{formatDateTime(detail.sourcePublishedAt)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#334155]">현재 공개일</dt>
            <dd className="mt-1">{formatDateTime(detail.publishedAt)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-[#334155]">원본 설명</dt>
            <dd className="mt-1 whitespace-pre-wrap leading-6">{detail.sourceDescription || "—"}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-[#334155]">원본 썸네일</dt>
            <dd className="mt-1 break-all">
              {detail.sourceThumbnailUrl ? (
                <a
                  href={detail.sourceThumbnailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2d5da8] underline-offset-2 hover:underline"
                >
                  {detail.sourceThumbnailUrl}
                </a>
              ) : "—"}
            </dd>
          </div>
        </dl>
      </section>

      {/* 편집 필드 */}
      <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-[13px] font-bold text-[#334155]">편집</h2>
        <div className="grid gap-5">
          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">표시 제목</span>
            <input
              value={draft.displayTitle}
              onChange={(e) => set("displayTitle", e.target.value)}
              placeholder={detail.sourceTitle}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
            <p className="text-[11px] text-[#8fa3bb]">비우면 유튜브 원본 제목을 그대로 사용합니다.</p>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-[12px] font-semibold text-[#334155]">발행자</span>
              <input
                value={draft.preacherName}
                onChange={(e) => set("preacherName", e.target.value)}
                className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-[12px] font-semibold text-[#334155]">표시 공개일</span>
              <input
                type="datetime-local"
                value={draft.displayPublishedAt}
                onChange={(e) => set("displayPublishedAt", e.target.value)}
                className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
              />
              <p className="text-[11px] text-[#8fa3bb]">비우면 원본 공개일을 사용합니다.</p>
            </label>
          </div>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">본문 레퍼런스</span>
            <input
              value={draft.scriptureReference}
              onChange={(e) => set("scriptureReference", e.target.value)}
              placeholder="예: 요한복음 3:16-21"
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">요약</span>
            <textarea
              value={draft.summary}
              onChange={(e) => set("summary", e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">본문 말씀</span>
            <textarea
              value={draft.scriptureBody}
              onChange={(e) => set("scriptureBody", e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">상세 내용</span>
            <textarea
              value={draft.messageBody}
              onChange={(e) => set("messageBody", e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">썸네일 Override URL</span>
            <input
              value={draft.thumbnailOverrideUrl}
              onChange={(e) => set("thumbnailOverrideUrl", e.target.value)}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
            <p className="text-[11px] text-[#8fa3bb]">비우면 유튜브 원본 썸네일을 사용합니다.</p>
          </label>

          <label className="flex items-center gap-2.5 rounded-xl border border-[#eef2f7] bg-[#f8fafc] px-4 py-3">
            <input
              type="checkbox"
              checked={draft.hidden}
              onChange={(e) => set("hidden", e.target.checked)}
              className="h-4 w-4 accent-[#3f74c7]"
            />
            <span className="text-[13px] font-semibold text-[#334155]">
              공개 영상 목록과 상세에서 숨김 처리
            </span>
          </label>
        </div>
      </section>

      {/* 액션 바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4 shadow-sm">
        <div />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDraft(createDraft(detail))}
            className="rounded-lg border border-[#d7e3f4] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f0f6ff]"
          >
            변경 취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#4a82d7] disabled:opacity-60"
          >
            {saving ? "저장 중..." : "메타 저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
