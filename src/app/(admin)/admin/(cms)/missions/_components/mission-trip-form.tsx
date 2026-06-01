"use client";

import { useActionState } from "react";
import {
  MISSION_TRIP_TYPE_LABELS,
  MISSION_TRIP_STATUS_LABELS,
  type MissionTripType,
  type MissionTripStatus,
  type MissionTripDetail,
} from "@/lib/admin-missions-types";
import type { MissionTripFormState } from "../actions";

const TRIP_TYPES = Object.entries(MISSION_TRIP_TYPE_LABELS) as [MissionTripType, string][];
const TRIP_STATUSES = Object.entries(MISSION_TRIP_STATUS_LABELS) as [MissionTripStatus, string][];

interface MissionTripFormProps {
  mode: "create" | "edit";
  initialData?: MissionTripDetail;
  action: (prev: MissionTripFormState, formData: FormData) => Promise<MissionTripFormState>;
}

export default function MissionTripForm({ mode, initialData, action }: MissionTripFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5 rounded-xl border border-[#e2eaf3] bg-white p-6">
      <h2 className="text-base font-semibold text-[#0f1c2e]">
        {mode === "create" ? "여정 정보 입력" : "여정 정보 수정"}
      </h2>

      {state.message && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {state.message}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
          저장되었습니다.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>제목 *</Label>
          <input
            name="title"
            defaultValue={initialData?.title}
            required
            maxLength={200}
            className={inputCls}
            placeholder="2025 필리핀 단기선교"
          />
        </div>

        <div>
          <Label>나라/지역 *</Label>
          <input
            name="country"
            defaultValue={initialData?.country}
            required
            maxLength={100}
            className={inputCls}
            placeholder="필리핀"
          />
        </div>

        <div>
          <Label>인솔자</Label>
          <input
            name="leaderLabel"
            defaultValue={initialData?.leaderLabel ?? ""}
            maxLength={120}
            className={inputCls}
            placeholder="000 목사"
          />
        </div>

        <div>
          <Label>출발일 *</Label>
          <input
            name="startDate"
            type="date"
            defaultValue={initialData?.startDate}
            required
            className={inputCls}
          />
        </div>

        <div>
          <Label>종료일</Label>
          <input
            name="endDate"
            type="date"
            defaultValue={initialData?.endDate ?? ""}
            className={inputCls}
          />
        </div>

        <div>
          <Label>유형 *</Label>
          <select name="type" defaultValue={initialData?.type ?? "SHORT_TERM"} className={inputCls}>
            {TRIP_TYPES.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <Label>상태 *</Label>
          <select name="status" defaultValue={initialData?.status ?? "PLANNED"} className={inputCls}>
            {TRIP_STATUSES.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <Label>예산 (원)</Label>
          <input
            name="budget"
            type="number"
            min={0}
            defaultValue={initialData?.budget ?? ""}
            className={inputCls}
            placeholder="3000000"
          />
        </div>

        <div className="sm:col-span-2">
          <Label>개요/메모</Label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="선교 일정, 준비 사항 등을 자유롭게 입력하세요."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3f74c7] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f5eaa] disabled:opacity-60"
        >
          {isPending ? "저장 중…" : mode === "create" ? "여정 등록" : "저장"}
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-[#4a6484]">{children}</label>;
}

const inputCls =
  "w-full rounded-lg border border-[#d0dae8] bg-[#f9fbfd] px-3 py-2 text-sm text-[#1a3152] placeholder-[#b0bec9] outline-none transition focus:border-[#3f74c7] focus:bg-white";
