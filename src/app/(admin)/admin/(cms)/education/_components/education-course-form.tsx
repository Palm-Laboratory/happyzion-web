"use client";

import { useActionState } from "react";
import {
  EDUCATION_CATEGORY_LABELS,
  EDUCATION_COURSE_STATUS_LABELS,
  type EducationCategory,
  type EducationCourseStatus,
  type EducationCourseDetail,
} from "@/lib/admin-education-types";
import type { EducationCourseFormState } from "../actions";

const CATEGORIES = Object.entries(EDUCATION_CATEGORY_LABELS) as [EducationCategory, string][];
const COURSE_STATUSES = Object.entries(EDUCATION_COURSE_STATUS_LABELS) as [EducationCourseStatus, string][];

interface EducationCourseFormProps {
  mode: "create" | "edit";
  initialData?: EducationCourseDetail;
  action: (prev: EducationCourseFormState, formData: FormData) => Promise<EducationCourseFormState>;
}

export default function EducationCourseForm({ mode, initialData, action }: EducationCourseFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5 rounded-xl border border-[#e2eaf3] bg-white p-6">
      <h2 className="text-base font-semibold text-[#0f1c2e]">
        {mode === "create" ? "과정 정보 입력" : "과정 정보 수정"}
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
            placeholder="2026 제자훈련 2기"
          />
        </div>

        <div>
          <Label>분류 *</Label>
          <select name="category" defaultValue={initialData?.category ?? "NEW_MEMBER"} className={inputCls}>
            {CATEGORIES.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <Label>강사/인도자</Label>
          <input
            name="instructorLabel"
            defaultValue={initialData?.instructorLabel ?? ""}
            maxLength={120}
            className={inputCls}
            placeholder="000 목사"
          />
        </div>

        <div>
          <Label>시작일 *</Label>
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
          <Label>상태 *</Label>
          <select name="status" defaultValue={initialData?.status ?? "PLANNED"} className={inputCls}>
            {COURSE_STATUSES.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <Label>장소</Label>
          <input
            name="location"
            defaultValue={initialData?.location ?? ""}
            maxLength={200}
            className={inputCls}
            placeholder="본당 2층 교육실"
          />
        </div>

        <div className="sm:col-span-2">
          <Label>개요/커리큘럼 메모</Label>
          <textarea
            name="description"
            defaultValue={initialData?.description ?? ""}
            rows={4}
            className={`${inputCls} resize-none`}
            placeholder="교육 일정, 커리큘럼, 준비 사항 등을 자유롭게 입력하세요."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#3f74c7] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2f5eaa] disabled:opacity-60"
        >
          {isPending ? "저장 중…" : mode === "create" ? "과정 등록" : "저장"}
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
