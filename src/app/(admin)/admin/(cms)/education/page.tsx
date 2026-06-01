import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getEducationCourses } from "@/lib/admin-education-api";
import {
  EDUCATION_CATEGORY_LABELS,
  EDUCATION_COURSE_STATUS_LABELS,
  type EducationCategory,
  type EducationCourseStatus,
} from "@/lib/admin-education-types";
import AdminBreadcrumb from "../components/admin-breadcrumb";

type RawSearchParams = { year?: string; status?: string; category?: string };

export default async function EducationPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login?callbackUrl=/admin/education");

  const sp = await searchParams;
  const year = sp.year ? Number(sp.year) : undefined;
  const status = (sp.status as EducationCourseStatus) || undefined;
  const category = (sp.category?.trim() as EducationCategory) || undefined;

  const { courses } = await getEducationCourses({ year, status, category });

  return (
    <div className="space-y-5">
      <AdminBreadcrumb items={[{ label: "교회 관리" }, { label: "교육 관리" }]} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0f1c2e]">교육 관리</h1>
        <Link
          href="/admin/education/new"
          className="rounded-lg bg-[#3f74c7] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2f5eaa]"
        >
          + 과정 추가
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d0dae8] bg-white py-16 text-center text-sm text-[#8fa3bb]">
          등록된 교육 과정이 없습니다.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e2eaf3] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2eaf3] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8fa3bb]">
                <th className="px-5 py-3">제목</th>
                <th className="px-4 py-3">분류</th>
                <th className="px-4 py-3">기간</th>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">교육생</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f9]">
              {courses.map((course) => (
                <tr key={course.id} className="group transition-colors hover:bg-[#f7f9fc]">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/education/${course.id}`}
                      className="font-medium text-[#1a3152] transition group-hover:text-[#3f74c7]"
                    >
                      {course.title}
                    </Link>
                    {course.instructorLabel && (
                      <span className="ml-2 text-xs text-[#8fa3bb]">강사: {course.instructorLabel}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-[#4a6484]">{EDUCATION_CATEGORY_LABELS[course.category]}</td>
                  <td className="px-4 py-3.5 text-[#4a6484]">
                    {course.startDate}
                    {course.endDate && <> ~ {course.endDate}</>}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-4 py-3.5 text-[#4a6484]">{course.enrollmentCount}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: EducationCourseStatus }) {
  const styles: Record<EducationCourseStatus, string> = {
    PLANNED: "bg-[#f0f4f9] text-[#4a6484]",
    RECRUITING: "bg-[#e8f2ff] text-[#3f74c7]",
    ONGOING: "bg-[#e8fff0] text-[#1a8a4a]",
    COMPLETED: "bg-[#f0f0f0] text-[#666]",
    CANCELLED: "bg-[#fff0f0] text-[#c73f3f]",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {EDUCATION_COURSE_STATUS_LABELS[status]}
    </span>
  );
}
