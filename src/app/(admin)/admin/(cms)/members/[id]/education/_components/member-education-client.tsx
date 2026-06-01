"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  EDUCATION_CATEGORY_LABELS,
  ENROLLMENT_ROLE_LABELS,
  ENROLLMENT_STATUS_LABELS,
  type MemberEducationEnrollment,
  type EducationCourseSummary,
  type EnrollmentRole,
  type EnrollmentStatus,
} from "@/lib/admin-education-types";
import { addMemberEnrollmentAction } from "../../../../education/actions";

const ROLES = Object.entries(ENROLLMENT_ROLE_LABELS) as [EnrollmentRole, string][];
const STATUSES = Object.entries(ENROLLMENT_STATUS_LABELS) as [EnrollmentStatus, string][];

interface MemberEducationClientProps {
  memberId: number;
  initialEnrollments: MemberEducationEnrollment[];
  allCourses: EducationCourseSummary[];
}

export default function MemberEducationClient({
  memberId,
  initialEnrollments,
  allCourses,
}: MemberEducationClientProps) {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCount = enrollments.length;
  const completedCount = enrollments.filter((e) => e.enrollmentStatus === "COMPLETED").length;

  // 이미 등록된 과정 ID
  const joinedCourseIds = new Set(enrollments.map((e) => e.courseId));
  const availableCourses = allCourses.filter((c) => !joinedCourseIds.has(c.id));

  function handleAdded(e: MemberEducationEnrollment) {
    setEnrollments((prev) => [e, ...prev]);
    setShowAdd(false);
    setError(null);
  }

  return (
    <div className="space-y-4">
      {/* 요약 */}
      <div className="flex items-center gap-6 rounded-xl border border-[#e2eaf3] bg-white px-6 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#3f74c7]">{totalCount}</p>
          <p className="text-xs text-[#8fa3bb]">총 과정</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1a8a4a]">{completedCount}</p>
          <p className="text-xs text-[#8fa3bb]">수료</p>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => { setShowAdd(true); setError(null); }}
            className="rounded-lg border border-[#3f74c7] px-3 py-1.5 text-xs font-medium text-[#3f74c7] transition hover:bg-[#f0f6ff]"
          >
            + 교육 등록 추가
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      {showAdd && (
        <AddEnrollmentPanel
          memberId={memberId}
          availableCourses={availableCourses}
          onAdded={handleAdded}
          onCancel={() => setShowAdd(false)}
          onError={setError}
        />
      )}

      {/* 이력 목록 */}
      {enrollments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d0dae8] bg-white py-16 text-center text-sm text-[#8fa3bb]">
          교육 수강 이력이 없습니다.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e2eaf3] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2eaf3] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8fa3bb]">
                <th className="px-5 py-3">과정</th>
                <th className="px-4 py-3">분류</th>
                <th className="px-4 py-3">기간</th>
                <th className="px-4 py-3">역할</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f9]">
              {enrollments.map((e) => (
                <tr key={e.enrollmentId} className="hover:bg-[#f7f9fc]">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/education/${e.courseId}`}
                      className="font-medium text-[#1a3152] hover:text-[#3f74c7] hover:underline"
                    >
                      {e.courseTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#4a6484]">{EDUCATION_CATEGORY_LABELS[e.category]}</td>
                  <td className="px-4 py-3 text-[#4a6484]">
                    {e.startDate.slice(0, 7)}
                    {e.endDate && <> ~ {e.endDate.slice(0, 7)}</>}
                  </td>
                  <td className="px-4 py-3 text-[#4a6484]">{ENROLLMENT_ROLE_LABELS[e.role]}</td>
                  <td className="px-4 py-3">
                    <EnrollmentStatusBadge status={e.enrollmentStatus} />
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

// ── Add Panel ─────────────────────────────────────────────────────────────────

interface AddPanelProps {
  memberId: number;
  availableCourses: EducationCourseSummary[];
  onAdded: (e: MemberEducationEnrollment) => void;
  onCancel: () => void;
  onError: (msg: string) => void;
}

function AddEnrollmentPanel({ memberId, availableCourses, onAdded, onCancel, onError }: AddPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [courseId, setCourseId] = useState<string>("");
  const [role, setRole] = useState<EnrollmentRole>("STUDENT");
  const [status, setStatus] = useState<EnrollmentStatus>("ENROLLED");

  function handleSubmit() {
    if (!courseId) { onError("과정을 선택해 주세요."); return; }

    startTransition(async () => {
      const result = await addMemberEnrollmentAction(Number(courseId), memberId, role, status);
      if (result.message) {
        onError(result.message);
      } else {
        const course = availableCourses.find((c) => c.id === Number(courseId));
        if (course) {
          onAdded({
            enrollmentId: Date.now(),
            courseId: course.id,
            courseTitle: course.title,
            category: course.category,
            startDate: course.startDate,
            endDate: course.endDate,
            courseStatus: course.status,
            role,
            enrollmentStatus: status,
            note: null,
          });
        }
      }
    });
  }

  return (
    <div className="rounded-xl border border-[#d0e4fa] bg-[#f5f9ff] p-5">
      <p className="mb-3 text-xs font-semibold text-[#4a6484]">교육 등록 추가</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">과정 *</label>
          {availableCourses.length === 0 ? (
            <p className="text-xs text-[#8fa3bb]">추가 가능한 과정이 없습니다.</p>
          ) : (
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className={inputCls}>
              <option value="">선택</option>
              {availableCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.startDate.slice(0, 4)} {c.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">역할</label>
          <select value={role} onChange={(e) => setRole(e.target.value as EnrollmentRole)} className={inputCls}>
            {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">등록 상태</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as EnrollmentStatus)} className={inputCls}>
            {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending || availableCourses.length === 0}
          className="rounded-lg bg-[#3f74c7] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#2f5eaa] disabled:opacity-60"
        >
          {isPending ? "추가 중…" : "추가"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#c6d8ee] px-4 py-1.5 text-xs font-medium text-[#4a6484] transition hover:bg-white"
        >
          취소
        </button>
      </div>
    </div>
  );
}

function EnrollmentStatusBadge({ status }: { status: EnrollmentStatus }) {
  const styles: Record<EnrollmentStatus, string> = {
    APPLIED: "bg-[#e8f2ff] text-[#3f74c7]",
    ENROLLED: "bg-[#fff7e8] text-[#b07d1a]",
    COMPLETED: "bg-[#e8fff0] text-[#1a8a4a]",
    DROPPED: "bg-[#f0f0f0] text-[#666]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {ENROLLMENT_STATUS_LABELS[status]}
    </span>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#d0dae8] bg-white px-2.5 py-1.5 text-xs text-[#1a3152] outline-none transition focus:border-[#3f74c7]";
