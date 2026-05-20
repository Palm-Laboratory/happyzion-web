"use client";

import { useRef } from "react";

interface MessageEditorProps {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}

/** Returns byte length treating Korean/CJK as 2 bytes each */
function getByteLength(str: string): number {
  let bytes = 0;
  for (const char of str) {
    const code = char.codePointAt(0) ?? 0;
    bytes += code > 0x7f ? 2 : 1;
  }
  return bytes;
}

export default function MessageEditor({ value, onChange, disabled }: MessageEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const byteLen = getByteLength(value);
  const msgType = byteLen <= 90 ? "SMS" : "LMS";

  function insertAtCursor(insertion: string) {
    const el = textareaRef.current;
    if (!el) {
      onChange(value + insertion);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = value.slice(0, start) + insertion + value.slice(end);
    onChange(next);
    // Restore cursor after React re-render
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + insertion.length;
      el.focus();
    });
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-semibold text-[#4a6484]">메시지 본문</label>
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
              msgType === "SMS"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {msgType}
          </span>
          <span className="text-[11px] text-[#8fa3bb]">{byteLen} bytes</span>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={6}
        placeholder="메시지 내용을 입력하세요..."
        className="w-full resize-none rounded-lg border border-[#d7e3f4] bg-white px-3 py-2.5 text-[13px] text-[#132033] placeholder-[#a0b4c8] outline-none transition focus:border-[#3f74c7] focus:ring-1 focus:ring-[#3f74c7] disabled:bg-[#f8fafc] disabled:text-[#8fa3bb]"
      />

      <button
        type="button"
        onClick={() => insertAtCursor("%고객명%")}
        disabled={disabled}
        className="flex items-center gap-1 rounded border border-[#d7e3f4] bg-[#f7fbff] px-2.5 py-1 text-[11px] font-semibold text-[#2d5da8] transition hover:bg-[#edf4ff] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
          <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        %고객명% 삽입
      </button>

      {msgType === "LMS" && (
        <p className="text-[11px] text-[#8fa3bb]">
          90 bytes 초과 — LMS로 발송됩니다. 제목을 입력하는 것을 권장합니다.
        </p>
      )}
    </div>
  );
}
