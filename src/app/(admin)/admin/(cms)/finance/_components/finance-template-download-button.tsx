"use client";

import { useState } from "react";

export default function FinanceTemplateDownloadButton() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/finance/template", { method: "GET" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string }).message ?? "양식 다운로드에 실패했습니다.");
      }
      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition") ?? "";
      const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
      const filename = match ? decodeURIComponent(match[1]) : "시온재정_양식.xlsx";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "양식 다운로드에 실패했습니다.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="rounded-lg border border-[#d5deea] px-4 py-2 text-[13px] font-semibold text-[#3f74c7] hover:bg-[#f4f7fb] disabled:opacity-50"
        title={error ?? undefined}
      >
        {downloading ? "다운로드 중…" : "양식 다운로드"}
      </button>
      {error && (
        <p className="absolute right-0 top-full mt-1 whitespace-nowrap text-[12px] text-[#b91c1c]">{error}</p>
      )}
    </>
  );
}
