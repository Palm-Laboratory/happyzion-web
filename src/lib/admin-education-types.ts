export type EducationCategory =
  | "NEW_MEMBER"
  | "BIBLE_STUDY"
  | "DISCIPLESHIP"
  | "MINISTRY_TRAINING"
  | "LEADERSHIP"
  | "TEACHER_TRAINING"
  | "OTHER";

export type EducationCourseStatus = "PLANNED" | "RECRUITING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type EnrollmentRole = "STUDENT" | "LEADER" | "ASSISTANT";
export type EnrollmentStatus = "APPLIED" | "ENROLLED" | "COMPLETED" | "DROPPED";

export const EDUCATION_CATEGORY_LABELS: Record<EducationCategory, string> = {
  NEW_MEMBER: "새가족반",
  BIBLE_STUDY: "성경공부",
  DISCIPLESHIP: "제자훈련",
  MINISTRY_TRAINING: "사역훈련",
  LEADERSHIP: "리더십훈련",
  TEACHER_TRAINING: "교사교육",
  OTHER: "기타",
};

export const EDUCATION_COURSE_STATUS_LABELS: Record<EducationCourseStatus, string> = {
  PLANNED: "계획",
  RECRUITING: "모집중",
  ONGOING: "진행중",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

export const ENROLLMENT_ROLE_LABELS: Record<EnrollmentRole, string> = {
  STUDENT: "교육생",
  LEADER: "인도자",
  ASSISTANT: "보조",
};

export const ENROLLMENT_STATUS_LABELS: Record<EnrollmentStatus, string> = {
  APPLIED: "신청",
  ENROLLED: "수강중",
  COMPLETED: "수료",
  DROPPED: "중도포기",
};

// ── Course ───────────────────────────────────────────────────────────────────

export interface EducationCourseSummary {
  id: number;
  title: string;
  category: EducationCategory;
  startDate: string;
  endDate: string | null;
  status: EducationCourseStatus;
  instructorLabel: string | null;
  enrollmentCount: number;
}

export interface EducationCourseDetail {
  id: number;
  title: string;
  category: EducationCategory;
  startDate: string;
  endDate: string | null;
  status: EducationCourseStatus;
  instructorLabel: string | null;
  location: string | null;
  description: string | null;
  coverPhotoAssetId: number | null;
  enrollments: Enrollment[];
  createdAt: string;
  updatedAt: string;
}

export interface EducationCourseListResponse {
  courses: EducationCourseSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// ── Enrollment ──────────────────────────────────────────────────────────────

export interface Enrollment {
  id: number;
  churchMemberId: number | null;
  displayName: string;
  externalName: string | null;
  role: EnrollmentRole;
  enrollmentStatus: EnrollmentStatus;
  note: string | null;
  createdAt: string;
}

// ── Member's education history ────────────────────────────────────────────────

export interface MemberEducationEnrollment {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
  category: EducationCategory;
  startDate: string;
  endDate: string | null;
  courseStatus: EducationCourseStatus;
  role: EnrollmentRole;
  enrollmentStatus: EnrollmentStatus;
  note: string | null;
}

export interface MemberEducationListResponse {
  enrollments: MemberEducationEnrollment[];
}

// ── Payloads ──────────────────────────────────────────────────────────────────

export interface EducationCourseSavePayload {
  title: string;
  category: EducationCategory;
  startDate: string;
  endDate: string | null;
  status: EducationCourseStatus;
  instructorLabel: string | null;
  location: string | null;
  description: string | null;
}

export interface AddEnrollmentPayload {
  churchMemberId: number | null;
  externalName: string | null;
  role: EnrollmentRole;
  enrollmentStatus: EnrollmentStatus;
  note: string | null;
}

export interface UpdateEnrollmentPayload {
  role: EnrollmentRole;
  enrollmentStatus: EnrollmentStatus;
  note: string | null;
}

// ── Query ─────────────────────────────────────────────────────────────────────

export interface EducationCourseListQuery {
  year?: number;
  status?: EducationCourseStatus;
  category?: EducationCategory;
  page?: number;
  size?: number;
}
