"use client";

import { useRef, useState } from "react";

export default function FinanceReportPdfButton({ reportId }: { reportId: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.src = `/print/finance/${reportId}`;
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setLoading(false);
      iframe.onload = null;
    };
  }

  return (
    <>
      <iframe ref={iframeRef} className="hidden" title="print-frame" />
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border border-[#d5deea] px-3 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb] disabled:opacity-50"
      >
        {loading ? "준비 중…" : "PDF 다운로드"}
      </button>
    </>
  );
}
