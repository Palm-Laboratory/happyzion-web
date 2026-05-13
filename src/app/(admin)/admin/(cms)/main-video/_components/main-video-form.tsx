"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { uploadAdminMainVideoDirect } from "@/lib/admin-upload-client";
import { useAdminToast } from "../../components/admin-toast-provider";

interface MainVideoFormProps {
  initialVideoUrl: string;
}

interface UploadProgress {
  loaded: number;
  total: number;
  startedAt: number;
}

const MAX_MAIN_VIDEO_BYTE_SIZE = 200 * 1024 * 1024;
const ALLOWED_VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

async function requestMainVideoUploadToken() {
  const response = await fetch("/api/admin/uploads/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kind: "MAIN_VIDEO",
      maxByteSize: MAX_MAIN_VIDEO_BYTE_SIZE,
      allowedMimeTypes: ALLOWED_VIDEO_MIME_TYPES,
    }),
  });
  const payload = (await response.json()) as { rawToken?: string; message?: string };

  if (!response.ok || !payload.rawToken) {
    throw new Error(payload.message || "업로드 토큰을 발급하지 못했습니다.");
  }

  return payload.rawToken;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec >= 1024 * 1024) return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`;
  if (bytesPerSec >= 1024) return `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
  return `${bytesPerSec.toFixed(0)} B/s`;
}

function formatRemaining(seconds: number): string {
  if (seconds < 60) return `약 ${Math.ceil(seconds)}초 남음`;
  return `약 ${Math.ceil(seconds / 60)}분 남음`;
}

export default function MainVideoForm({ initialVideoUrl }: MainVideoFormProps) {
  const { success, error: showError } = useAdminToast();
  const [savedVideoUrl, setSavedVideoUrl] = useState(initialVideoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  const activePreviewUrl = useMemo(() => previewUrl ?? savedVideoUrl, [previewUrl, savedVideoUrl]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_VIDEO_MIME_TYPES.includes(file.type)) {
      event.target.value = "";
      setSelectedFile(null);
      showError("MP4, WebM, MOV 영상만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > MAX_MAIN_VIDEO_BYTE_SIZE) {
      event.target.value = "";
      setSelectedFile(null);
      showError("메인 영상은 200MB 이하로 업로드해 주세요.");
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      showError("업로드할 영상 파일을 선택해 주세요.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(null);

    try {
      const rawToken = await requestMainVideoUploadToken();
      const startedAt = Date.now();
      setUploadProgress({ loaded: 0, total: selectedFile.size, startedAt });

      const payload = await uploadAdminMainVideoDirect(selectedFile, rawToken, (loaded, total) => {
        setUploadProgress({ loaded, total, startedAt });
      });

      const revalidateResponse = await fetch("/api/admin/site/main-video/revalidate", {
        method: "POST",
      });

      if (!revalidateResponse.ok) {
        throw new Error("메인 영상 캐시를 갱신하지 못했습니다.");
      }

      setSavedVideoUrl(payload.videoUrl);
      setSelectedFile(null);
      success("메인 영상을 교체했습니다.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "메인 영상 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const progressPercent = uploadProgress
    ? Math.min(99, Math.round((uploadProgress.loaded / uploadProgress.total) * 100))
    : 0;
  const isServerProcessing = uploadProgress !== null && uploadProgress.loaded >= uploadProgress.total;

  const elapsedSec = uploadProgress ? (Date.now() - uploadProgress.startedAt) / 1000 : 0;
  const speed = uploadProgress && elapsedSec > 0.5 ? uploadProgress.loaded / elapsedSec : 0;
  const remainingSec =
    uploadProgress && speed > 0 ? (uploadProgress.total - uploadProgress.loaded) / speed : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-[#e3e9f3] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
      >
        <div className="space-y-5">
          <div>
            <label htmlFor="main-video-file" className="text-[13px] font-bold text-[#132033]">
              영상 파일
            </label>
            <input
              id="main-video-file"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              onChange={handleFileChange}
              className="mt-2 block w-full rounded-lg border border-[#d6dfeb] bg-white px-3 py-2.5 text-[13px] text-[#132033] file:mr-4 file:rounded-md file:border-0 file:bg-[#edf4ff] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-[#3f74c7] hover:file:bg-[#dcecff]"
            />
            <p className="mt-2 text-[12px] text-[#6d7f95]">
              MP4, WebM, MOV 파일을 업로드할 수 있습니다. 최대 용량은 200MB입니다.
            </p>
          </div>

          {isUploading && uploadProgress ? (
            <div className="overflow-hidden rounded-xl border border-[#c5d9f5] bg-gradient-to-br from-[#f0f6ff] to-[#e8f1fd] p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3f74c7] text-white shadow-[0_2px_8px_rgba(63,116,199,0.4)]">
                  {isServerProcessing ? (
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4-4 4 4" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-[#132033]">
                    {isServerProcessing ? "서버 처리 중..." : "업로드 중..."}
                  </p>
                  <p className="mt-0.5 truncate text-[12px] text-[#5d7a9c]">
                    {selectedFile?.name}
                  </p>
                </div>
                <span className="shrink-0 text-[26px] font-black tabular-nums leading-none text-[#3f74c7]">
                  {isServerProcessing ? "100" : progressPercent}%
                </span>
              </div>

              {/* 진행 바 */}
              <div className="relative h-3 overflow-hidden rounded-full bg-[#d0e3f8]">
                <div
                  className="absolute inset-y-0 left-0 rounded-r-full bg-gradient-to-r from-[#2d5db5] via-[#4a85e8] to-[#60a5fa] transition-[width] duration-500 ease-out"
                  style={{ width: `${isServerProcessing ? 100 : progressPercent}%` }}
                >
                  {!isServerProcessing && (
                    <span className="absolute inset-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  )}
                </div>
              </div>

              {/* 통계 */}
              <div className="mt-3 flex items-center justify-between text-[12px]">
                <span className="text-[#5d7a9c]">
                  {formatBytes(uploadProgress.loaded)}
                  <span className="text-[#8aa3bf]"> / {formatBytes(uploadProgress.total)}</span>
                </span>
                {isServerProcessing ? (
                  <span className="font-medium text-[#3f74c7]">업로드 완료 · 저장 중</span>
                ) : speed > 0 ? (
                  <span className="text-[#5d7a9c]">
                    <span className="font-semibold text-[#3f74c7]">{formatSpeed(speed)}</span>
                    {remainingSec !== null && ` · ${formatRemaining(remainingSec)}`}
                  </span>
                ) : null}
              </div>
            </div>
          ) : selectedFile ? (
            <div className="rounded-lg border border-[#d7e3f4] bg-[#f8fbff] p-4">
              <p className="text-[12px] font-bold text-[#334155]">선택된 파일</p>
              <p className="mt-1 break-all text-[13px] text-[#132033]">{selectedFile.name}</p>
              <p className="mt-1 text-[12px] text-[#6d7f95]">
                {(selectedFile.size / 1024 / 1024).toFixed(1)}MB
              </p>
            </div>
          ) : null}

          <div className="rounded-lg border border-[#e7edf5] bg-[#f8fafc] p-4">
            <p className="text-[12px] font-bold text-[#334155]">현재 공개 영상</p>
            <p className="mt-1 break-all font-mono text-[12px] text-[#5d6f86]">{savedVideoUrl}</p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              disabled={!selectedFile || isUploading}
              className="rounded-lg border border-[#d6dfeb] px-4 py-2 text-[13px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-45"
            >
              선택 취소
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isUploading}
              className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#345f9f] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isUploading ? "업로드 중..." : "업로드 후 교체"}
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
          <video
            key={activePreviewUrl}
            className="aspect-video w-full object-contain"
            src={activePreviewUrl}
            controls
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </section>
    </div>
  );
}
