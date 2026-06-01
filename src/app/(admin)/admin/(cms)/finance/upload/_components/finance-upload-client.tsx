"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FinanceParsePreview, FinancePeriod } from "@/lib/admin-finance-types";
import {
  FinanceChecksumWarning,
  FinanceLinesTwoColumn,
  FinanceSummaryCards,
  FinanceUnexecutedItemsTable,
} from "../../_components/finance-report-view";

type Step = "idle" | "parsing" | "preview" | "confirming" | "saving";

export default function FinanceUploadClient() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("idle");
  const [preview, setPreview] = useState<FinanceParsePreview | null>(null);
  const [period, setPeriod] = useState<Partial<FinancePeriod>>({});
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.name.match(/\.xlsx$/i)) {
      setError(".xlsx 파일만 업로드 가능합니다.");
      return;
    }
    setError(null);
    setStep("parsing");
    fileRef.current = file;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/finance/reports/preview", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string }).message ?? "파싱에 실패했습니다.");
      }
      const result = (await res.json()) as FinanceParsePreview;
      setPreview(result);
      setPeriod(result.period ?? {});
      setStep("preview");
    } catch (e) {
      setError(e instanceof Error ? e.message : "파싱에 실패했습니다.");
      setStep("idle");
    }
  }

  function reset() {
    setStep("idle");
    setPreview(null);
    setPeriod({});
    setError(null);
    fileRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validatePeriod() {
    const { year, month, week } = period;
    if (!year || !month || !week) return "연/월/주를 모두 입력해주세요.";
    if (month < 1 || month > 12) return "월은 1~12 사이여야 합니다.";
    if (week < 1 || week > 5) return "주는 1~5 사이여야 합니다.";
    return null;
  }

  function handleSaveClick() {
    const validationError = validatePeriod();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (preview?.isDuplicate) {
      setStep("confirming");
    } else {
      void doSave();
    }
  }

  async function doSave() {
    if (!preview || !fileRef.current) return;
    const { year, month, week } = period;
    setStep("saving");
    try {
      const formData = new FormData();
      formData.append("file", fileRef.current);
      formData.append("year", String(year));
      formData.append("month", String(month));
      formData.append("week", String(week));
      const res = await fetch("/api/admin/finance/reports", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string }).message ?? "저장에 실패했습니다.");
      }
      router.push("/admin/finance");
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
      setStep("preview");
    }
  }

  return (
    <div className="space-y-5">
      {step === "idle" && (
        <FileDropZone
          onFile={handleFile}
          inputRef={fileInputRef}
          error={error}
        />
      )}

      {step === "parsing" && (
        <div className="rounded-2xl border border-[#dbe4f0] bg-white p-12 text-center text-[13px] text-[#5d6f86] shadow-sm">
          엑셀 파일 분석 중…
        </div>
      )}

      {step !== "idle" && step !== "parsing" && preview && (
        <PreviewPanel
          preview={preview}
          period={period}
          setPeriod={setPeriod}
          onReset={reset}
          onSave={handleSaveClick}
          onConfirm={() => void doSave()}
          onCancelConfirm={() => setStep("preview")}
          confirming={step === "confirming"}
          saving={step === "saving"}
          error={error}
        />
      )}
    </div>
  );
}

/* ───────────────────────── File drop zone ───────────────────────── */

function FileDropZone({
  onFile,
  inputRef,
  error,
}: {
  onFile: (f: File) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  error: string | null;
}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) onFile(file);
        }}
        className={`rounded-2xl border-2 border-dashed bg-white p-12 text-center transition-colors ${
          dragging ? "border-[#3f74c7] bg-[#eef4ff]" : "border-[#cbd5e1]"
        }`}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="mx-auto mb-3 text-[#7c8fa8]">
          <path d="M18 6v18M11 13l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 24v3a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[14px] font-semibold text-[#0f1c2e]">엑셀 파일을 드래그하거나 클릭해서 선택하세요</p>
        <p className="mt-1 text-[12px] text-[#5d6f86]">.xlsx 형식, 교회 주간 재정보고 양식 (시온재정.xlsx)</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 rounded-lg bg-[#3f74c7] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#3461ad]"
        >
          파일 선택
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>
      {error && (
        <div className="rounded-lg border border-[#fcd5cb] bg-[#fef2ed] px-4 py-2 text-[13px] text-[#b3502a]">{error}</div>
      )}
    </div>
  );
}

/* ───────────────────────── Preview ───────────────────────── */

function PreviewPanel({
  preview,
  period,
  setPeriod,
  onReset,
  onSave,
  onConfirm,
  onCancelConfirm,
  confirming,
  saving,
  error,
}: {
  preview: FinanceParsePreview;
  period: Partial<FinancePeriod>;
  setPeriod: (p: Partial<FinancePeriod>) => void;
  onReset: () => void;
  onSave: () => void;
  onConfirm: () => void;
  onCancelConfirm: () => void;
  confirming: boolean;
  saving: boolean;
  error: string | null;
}) {
  const { totals } = preview;

  return (
    <div className="space-y-5">
      {/* 파일 정보 */}
      <div className="flex items-center justify-between rounded-xl border border-[#dbe4f0] bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-3 text-[13px]">
          <span className="rounded bg-[#eef4ff] px-2 py-0.5 text-[11px] font-semibold text-[#3f74c7]">파일</span>
          <span className="font-medium text-[#0f1c2e]">{preview.sourceFilename}</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-[#d5deea] px-3 py-1.5 text-[12px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb]"
        >
          다시 선택
        </button>
      </div>

      {/* 기간 확인 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">보고 기간 확인</h2>
          {preview.periodSourceText && (
            <span className="text-[11px] text-[#5d6f86]">
              엑셀 A1셀에서 추출: <span className="font-semibold text-[#0f1c2e]">{preview.periodSourceText}</span>
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <PeriodInput
            label="연"
            value={period.year}
            onChange={(v) => setPeriod({ ...period, year: v })}
            min={2020}
            max={2100}
            width={90}
          />
          <PeriodInput
            label="월"
            value={period.month}
            onChange={(v) => setPeriod({ ...period, month: v })}
            min={1}
            max={12}
            width={70}
          />
          <PeriodInput
            label="주"
            value={period.week}
            onChange={(v) => setPeriod({ ...period, week: v })}
            min={1}
            max={5}
            width={70}
          />
          <p className="text-[12px] text-[#5d6f86]">자동 추출값을 확인하고, 틀리면 수정한 뒤 저장하세요.</p>
        </div>
      </section>

      {/* 합계 교차검증 경고 */}
      {totals.checksumMismatch && (
        <FinanceChecksumWarning
          incomeTotal={totals.incomeTotal}
          expenseTotal={totals.expenseTotal}
          formIncomeTotal={totals.formCellIncomeTotal}
          formExpenseTotal={totals.formCellExpenseTotal}
        />
      )}

      {/* 합계 요약 */}
      <FinanceSummaryCards totals={totals} />

      {/* 수입 / 지출 2단 테이블 */}
      <FinanceLinesTwoColumn lines={preview.lines} />

      {/* 미집행 품목 */}
      <FinanceUnexecutedItemsTable items={preview.unexecutedItems} />

      {error && (
        <div className="rounded-lg border border-[#fcd5cb] bg-[#fef2ed] px-4 py-2 text-[13px] text-[#b3502a]">{error}</div>
      )}

      {/* 중복 덮어쓰기 확인 */}
      {confirming && (
        <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] px-5 py-4 space-y-3">
          <p className="text-[13px] text-[#92400e]">
            이미 <span className="font-semibold">{period.year}년 {period.month}월 {period.week}주차</span> 재정 데이터가 있습니다.
            확인 버튼을 누르시면 기존 데이터가 덮어 씌워집니다.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onCancelConfirm}
              className="rounded-lg border border-[#d5deea] px-4 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-[#d97706] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#b45309]"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 액션 */}
      {!confirming && (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            className="rounded-lg border border-[#d5deea] px-4 py-2 text-[13px] font-medium text-[#5d6f86] hover:bg-[#f4f7fb] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-lg bg-[#3f74c7] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#3461ad] disabled:opacity-50"
          >
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      )}
    </div>
  );
}

function PeriodInput({
  label,
  value,
  onChange,
  min,
  max,
  width,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  min: number;
  max: number;
  width: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold text-[#55697f]">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value ?? ""}
        onChange={(e) => {
          const n = e.target.value === "" ? undefined : Number(e.target.value);
          onChange(Number.isFinite(n) ? n : undefined);
        }}
        className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] tabular-nums focus:border-[#3f74c7] focus:outline-none"
        style={{ width }}
      />
    </label>
  );
}


