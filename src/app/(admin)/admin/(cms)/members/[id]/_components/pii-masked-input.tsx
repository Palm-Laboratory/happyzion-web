"use client";

import { useState } from "react";

interface PiiMaskedInputProps {
  id: string;
  name: string;
  initialValue: string;
  hasError?: boolean;
  maskFn: (value: string) => string;
  inputMode?: "text" | "tel";
  placeholder?: string;
  onValueChange?: () => void;
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 pr-20 text-[13px] text-[#132033] outline-none transition focus:ring-2 focus:ring-[#3f74c7]/30 ${
    hasError
      ? "border-red-300 bg-red-50/40 focus:border-red-400"
      : "border-[#dde4ef] bg-white focus:border-[#3f74c7]"
  }`;
}

export default function PiiMaskedInput({
  id, name, initialValue, hasError = false, maskFn, inputMode = "text", placeholder, onValueChange,
}: PiiMaskedInputProps) {
  const [revealed, setRevealed] = useState(false);
  const [actualValue, setActualValue] = useState(initialValue);

  const displayValue = revealed ? actualValue : maskFn(actualValue);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={actualValue} />
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        readOnly={!revealed}
        onChange={(e) => {
          if (revealed) {
            setActualValue(e.target.value);
            onValueChange?.();
          }
        }}
        className={inputCls(hasError)}
      />
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[11px] font-semibold text-[#3f74c7] hover:bg-[#edf4ff]"
        aria-pressed={revealed}
      >
        {revealed ? "숨기기" : "보기"}
      </button>
    </div>
  );
}
