import "server-only";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import type {
  EducationCourseListQuery,
  EducationCourseListResponse,
  EducationCourseDetail,
  EducationCourseSavePayload,
  AddEnrollmentPayload,
  UpdateEnrollmentPayload,
  Enrollment,
  MemberEducationListResponse,
} from "@/lib/admin-education-types";

// ── Courses ───────────────────────────────────────────────────────────────────

export async function getEducationCourses(q: EducationCourseListQuery = {}): Promise<EducationCourseListResponse> {
  const params = new URLSearchParams();
  if (q.year) params.set("year", String(q.year));
  if (q.status) params.set("status", q.status);
  if (q.category?.trim()) params.set("category", q.category.trim());
  const qs = params.toString();
  const res = await adminApiFetch(`/api/v1/admin/education-courses${qs ? `?${qs}` : ""}`);
  return res.json() as Promise<EducationCourseListResponse>;
}

export async function getEducationCourse(id: number): Promise<EducationCourseDetail> {
  const res = await adminApiFetch(`/api/v1/admin/education-courses/${id}`);
  return res.json() as Promise<EducationCourseDetail>;
}

export async function createEducationCourse(payload: EducationCourseSavePayload): Promise<EducationCourseDetail> {
  const res = await adminApiFetch("/api/v1/admin/education-courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<EducationCourseDetail>;
}

export async function updateEducationCourse(id: number, payload: EducationCourseSavePayload): Promise<EducationCourseDetail> {
  const res = await adminApiFetch(`/api/v1/admin/education-courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<EducationCourseDetail>;
}

export async function deleteEducationCourse(id: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/education-courses/${id}`, { method: "DELETE" });
}

// ── Enrollments ────────────────────────────────────────────────────────────────

export async function addEnrollment(
  courseId: number,
  payload: AddEnrollmentPayload,
): Promise<Enrollment> {
  const res = await adminApiFetch(`/api/v1/admin/education-courses/${courseId}/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<Enrollment>;
}

export async function updateEnrollment(
  courseId: number,
  enrollmentId: number,
  payload: UpdateEnrollmentPayload,
): Promise<Enrollment> {
  const res = await adminApiFetch(
    `/api/v1/admin/education-courses/${courseId}/enrollments/${enrollmentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return res.json() as Promise<Enrollment>;
}

export async function removeEnrollment(courseId: number, enrollmentId: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/education-courses/${courseId}/enrollments/${enrollmentId}`, {
    method: "DELETE",
  });
}

// ── Member education ─────────────────────────────────────────────────────────

export async function getMemberEducation(memberId: number): Promise<MemberEducationListResponse> {
  const res = await adminApiFetch(`/api/v1/admin/members/${memberId}/education`);
  return res.json() as Promise<MemberEducationListResponse>;
}

// ── 에러 메시지 변환 ───────────────────────────────────────────────────────────

export function toFriendlyEducationMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AdminApiError)) {
    if (error instanceof Error && /fetch failed|ECONNREFUSED|Failed to fetch/i.test(error.message)) {
      return "백엔드 API 서버에 연결할 수 없습니다. API 서버 상태를 확인한 뒤 다시 시도해 주세요.";
    }
    return fallback;
  }
  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }
  if (error.status === 404) return "대상을 찾을 수 없습니다.";
  if (error.status === 409 || error.status === 400) return error.message || fallback;
  return fallback;
}
