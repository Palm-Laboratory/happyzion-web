"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import {
  createEducationCourse,
  updateEducationCourse,
  deleteEducationCourse,
  addEnrollment,
  updateEnrollment,
  removeEnrollment,
  toFriendlyEducationMessage,
} from "@/lib/admin-education-api";
import type {
  EducationCategory,
  EducationCourseStatus,
  EnrollmentRole,
  EnrollmentStatus,
} from "@/lib/admin-education-types";

export interface EducationCourseFormState {
  message?: string;
  success?: boolean;
}

// ── Course CRUD ─────────────────────────────────────────────────────────────

export async function createEducationCourseAction(
  _prev: EducationCourseFormState,
  formData: FormData,
): Promise<EducationCourseFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const category = formData.get("category") as EducationCategory;
  const startDate = (formData.get("startDate") as string | null)?.trim() ?? "";
  const endDate = (formData.get("endDate") as string | null)?.trim() || null;
  const status = formData.get("status") as EducationCourseStatus;
  const instructorLabel = (formData.get("instructorLabel") as string | null)?.trim() || null;
  const location = (formData.get("location") as string | null)?.trim() || null;
  const description = (formData.get("description") as string | null)?.trim() || null;

  if (!title) return { message: "제목을 입력해 주세요." };
  if (!startDate) return { message: "시작일을 입력해 주세요." };

  try {
    const course = await createEducationCourse({ title, category, startDate, endDate, status, instructorLabel, location, description });
    revalidatePath("/admin/education");
    redirect(`/admin/education/${course.id}`);
  } catch (error) {
    if ((error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) throw error;
    return { message: toFriendlyEducationMessage(error, "교육 과정 등록 중 오류가 발생했습니다.") };
  }
}

export async function updateEducationCourseAction(
  courseId: number,
  _prev: EducationCourseFormState,
  formData: FormData,
): Promise<EducationCourseFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const category = formData.get("category") as EducationCategory;
  const startDate = (formData.get("startDate") as string | null)?.trim() ?? "";
  const endDate = (formData.get("endDate") as string | null)?.trim() || null;
  const status = formData.get("status") as EducationCourseStatus;
  const instructorLabel = (formData.get("instructorLabel") as string | null)?.trim() || null;
  const location = (formData.get("location") as string | null)?.trim() || null;
  const description = (formData.get("description") as string | null)?.trim() || null;

  if (!title) return { message: "제목을 입력해 주세요." };
  if (!startDate) return { message: "시작일을 입력해 주세요." };

  try {
    await updateEducationCourse(courseId, { title, category, startDate, endDate, status, instructorLabel, location, description });
    revalidatePath(`/admin/education/${courseId}`);
    revalidatePath("/admin/education");
    return { success: true };
  } catch (error) {
    return { message: toFriendlyEducationMessage(error, "교육 과정 수정 중 오류가 발생했습니다.") };
  }
}

export async function deleteEducationCourseAction(courseId: number): Promise<EducationCourseFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await deleteEducationCourse(courseId);
    revalidatePath("/admin/education");
    redirect("/admin/education");
  } catch (error) {
    if ((error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) throw error;
    return { message: toFriendlyEducationMessage(error, "교육 과정 삭제 중 오류가 발생했습니다.") };
  }
}

// ── Enrollments ──────────────────────────────────────────────────────────────

export interface EnrollmentFormState {
  message?: string;
  success?: boolean;
}

export async function addEnrollmentAction(
  courseId: number,
  payload: {
    churchMemberId: number | null;
    externalName: string | null;
    role: EnrollmentRole;
    enrollmentStatus: EnrollmentStatus;
    note: string | null;
  },
): Promise<EnrollmentFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await addEnrollment(courseId, payload);
    revalidatePath(`/admin/education/${courseId}`);
    return { success: true };
  } catch (error) {
    return { message: toFriendlyEducationMessage(error, "교육생 추가 중 오류가 발생했습니다.") };
  }
}

export async function updateEnrollmentAction(
  courseId: number,
  enrollmentId: number,
  payload: { role: EnrollmentRole; enrollmentStatus: EnrollmentStatus; note: string | null },
): Promise<EnrollmentFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await updateEnrollment(courseId, enrollmentId, payload);
    revalidatePath(`/admin/education/${courseId}`);
    return { success: true };
  } catch (error) {
    return { message: toFriendlyEducationMessage(error, "교육생 수정 중 오류가 발생했습니다.") };
  }
}

export async function removeEnrollmentAction(
  courseId: number,
  enrollmentId: number,
): Promise<EnrollmentFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await removeEnrollment(courseId, enrollmentId);
    revalidatePath(`/admin/education/${courseId}`);
    return { success: true };
  } catch (error) {
    return { message: toFriendlyEducationMessage(error, "교육생 제거 중 오류가 발생했습니다.") };
  }
}

export async function addMemberEnrollmentAction(
  courseId: number,
  memberId: number,
  role: EnrollmentRole,
  enrollmentStatus: EnrollmentStatus,
): Promise<EnrollmentFormState> {
  return addEnrollmentAction(courseId, {
    churchMemberId: memberId,
    externalName: null,
    role,
    enrollmentStatus,
    note: null,
  });
}
