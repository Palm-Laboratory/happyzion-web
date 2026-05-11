"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useAdminToast } from "../../components/admin-toast-provider";

interface MainVideoFormProps {
  initialVideoUrl: string;
}

async function readErrorMessage(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string };
    return payload.message;
  } catch {
    return undefined;
  }
}

function isLikelyVideoUrl(value: string) {
  return /^\/.+|^https?:\/\/.+/i.test(value.trim()) && !value.trim().startsWith("//");
}

export default function MainVideoForm({ initialVideoUrl }: MainVideoFormProps) {
  const { success, error: showError } = useAdminToast();
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [savedVideoUrl, setSavedVideoUrl] = useState(initialVideoUrl);
  const [isSaving, setIsSaving] = useState(false);

  const normalizedVideoUrl = videoUrl.trim();
  const canPreview = useMemo(() => isLikelyVideoUrl(normalizedVideoUrl), [normalizedVideoUrl]);
  const isDirty = normalizedVideoUrl !== savedVideoUrl;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLikelyVideoUrl(normalizedVideoUrl)) {
      showError("메인 영상 URL은 /로 시작하는 경로 또는 http(s) URL이어야 합니다.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/site/main-video", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl: normalizedVideoUrl }),
      });

      if (!response.ok) {
        throw new Error((await readErrorMessage(response)) || "메인 영상 설정을 저장하지 못했습니다.");
      }

      const payload = (await response.json()) as { videoUrl: string };
      setSavedVideoUrl(payload.videoUrl);
      setVideoUrl(payload.videoUrl);
      success("메인 영상 설정을 저장했습니다.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "메인 영상 설정을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-[#e3e9f3] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="main-video-url" className="text-[13px] font-bold text-[#132033]">
              영상 URL
            </label>
            <input
              id="main-video-url"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              placeholder="/video/sample.mp4"
              className="mt-2 w-full rounded-lg border border-[#d6dfeb] px-3 py-2.5 text-[13px] text-[#132033] outline-none transition focus:border-[#3f74c7] focus:ring-2 focus:ring-[#3f74c7]/15"
            />
            <p className="mt-2 text-[12px] text-[#6d7f95]">
              공개 사이트에서 접근 가능한 MP4/WebM 경로나 URL을 입력하세요.
            </p>
          </div>

          <div className="rounded-lg border border-[#e7edf5] bg-[#f8fafc] p-4">
            <p className="text-[12px] font-bold text-[#334155]">현재 저장된 값</p>
            <p className="mt-1 break-all font-mono text-[12px] text-[#5d6f86]">{savedVideoUrl}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setVideoUrl(savedVideoUrl)}
              disabled={!isDirty || isSaving}
              className="rounded-lg border border-[#d6dfeb] px-4 py-2 text-[13px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-45"
            >
              되돌리기
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSaving}
              className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#345f9f] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </form>

      <section className="rounded-lg border border-[#e3e9f3] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-[#132033]">미리보기</h2>
          <span className="rounded-full bg-[#edf4ff] px-2.5 py-1 text-[11px] font-semibold text-[#3f74c7]">
            Main
          </span>
        </div>
        <div className="overflow-hidden rounded-lg bg-black">
          {canPreview ? (
            <video
              key={normalizedVideoUrl}
              className="aspect-video w-full object-contain"
              src={normalizedVideoUrl}
              controls
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center px-6 text-center text-[13px] text-white/65">
              영상 URL을 입력하면 미리보기가 표시됩니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
