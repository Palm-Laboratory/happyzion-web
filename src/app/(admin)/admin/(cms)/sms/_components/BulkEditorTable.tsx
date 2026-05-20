"use client";

import { useRef } from "react";
import type { BulkRowDto } from "@/lib/admin-sms-api";

type BulkRow = Omit<BulkRowDto, "hasIdentifier">;

interface BulkEditorTableProps {
  rows: BulkRow[];
  onChange: (rows: BulkRow[]) => void;
}

function parseCsv(text: string): BulkRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];

  // Skip header row if it looks like a header
  const firstLine = lines[0].toLowerCase();
  const startIdx =
    firstLine.includes("phone") ||
    firstLine.includes("번호") ||
    firstLine.includes("name") ||
    firstLine.includes("이름")
      ? 1
      : 0;

  return lines
    .slice(startIdx)
    .map((line) => {
      const cols = line.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
      const phone = cols[0] ?? "";
      const name = cols[1] || undefined;
      const message = cols[2] ?? "";
      return { phone: phone || undefined, name, message };
    })
    .filter((r) => r.phone || r.message);
}

export default function BulkEditorTable({ rows, onChange }: BulkEditorTableProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsv(text);
      onChange([...rows, ...parsed]);
    };
    reader.readAsText(file);
    // Reset file input so same file can be re-uploaded
    e.target.value = "";
  }

  function updateRow(index: number, field: keyof BulkRow, value: string) {
    const next = rows.map((r, i) =>
      i === index ? { ...r, [field]: value || undefined } : r,
    );
    onChange(next);
  }

  function addRow() {
    onChange([...rows, { message: "" }]);
  }

  function removeRow(index: number) {
    onChange(rows.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-1.5 text-[12px] font-semibold text-[#2d5da8] transition hover:bg-[#edf4ff]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 2v6M3.5 5L6.5 2l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          CSV 파일 업로드
        </button>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1.5 rounded-lg border border-[#d7e3f4] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#4a6484] transition hover:bg-[#f8fafc]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          행 추가
        </button>
        <span className="ml-auto text-[11px] text-[#8fa3bb]">{rows.length}행</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      <p className="text-[11px] text-[#8fa3bb]">
        CSV 형식: 수신번호,이름,개별 메시지 (개별 메시지는 공통 본문 대신 보낼 때만 입력)
      </p>

      {rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#d7e3f4] py-8 text-center text-[13px] text-[#8fa3bb]">
          CSV를 업로드하거나 행을 추가하세요
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#e2e8f0]">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-[#e2e8f0] bg-[#f8fafc]">
              <tr>
                <th className="px-3 py-2 font-semibold text-[#4a6484]">수신번호</th>
                <th className="px-3 py-2 font-semibold text-[#4a6484]">이름</th>
                <th className="px-3 py-2 font-semibold text-[#4a6484]">개별 메시지</th>
                <th className="w-10 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#fafcff]"
                >
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row.phone ?? ""}
                      onChange={(e) => updateRow(idx, "phone", e.target.value)}
                      placeholder="01012345678"
                      className="w-full rounded border border-[#d7e3f4] px-2 py-1 text-[12px] outline-none focus:border-[#3f74c7]"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row.name ?? ""}
                      onChange={(e) => updateRow(idx, "name", e.target.value)}
                      placeholder="홍길동"
                      className="w-full rounded border border-[#d7e3f4] px-2 py-1 text-[12px] outline-none focus:border-[#3f74c7]"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={row.message}
                      onChange={(e) => updateRow(idx, "message", e.target.value)}
                      placeholder="공통 본문 사용"
                      className="w-full rounded border border-[#d7e3f4] px-2 py-1 text-[12px] outline-none focus:border-[#3f74c7]"
                    />
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      className="rounded p-1 text-[#e05252] transition hover:bg-red-50"
                      aria-label="삭제"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
