import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import { getEducationCourse } from "@/lib/admin-education-api";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import EducationCourseForm from "../_components/education-course-form";
import EnrollmentManager from "../_components/enrollment-manager";
import DeleteCourseButton from "../_components/delete-course-button";
import { updateEducationCourseAction, deleteEducationCourseAction } from "../actions";

export default async function EducationCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect(`/admin/login?callbackUrl=/admin/education/${id}`);

  let course;
  try {
    course = await getEducationCourse(id);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) notFound();
    throw error;
  }

  const boundUpdate = updateEducationCourseAction.bind(null, id);
  const boundDelete = deleteEducationCourseAction.bind(null, id);

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "교육 관리", href: "/admin/education" },
          { label: course.title },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">{course.title}</h1>

      <EducationCourseForm mode="edit" initialData={course} action={boundUpdate} />
      <EnrollmentManager courseId={id} initialEnrollments={course.enrollments} />
      <DeleteCourseButton onDelete={boundDelete} />
    </div>
  );
}
