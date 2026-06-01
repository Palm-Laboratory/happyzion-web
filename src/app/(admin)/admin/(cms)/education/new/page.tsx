import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import EducationCourseForm from "../_components/education-course-form";
import { createEducationCourseAction } from "../actions";

export default async function EducationCourseNewPage() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login?callbackUrl=/admin/education/new");

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "교육 관리", href: "/admin/education" },
          { label: "과정 추가" },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">과정 추가</h1>
      <EducationCourseForm mode="create" action={createEducationCourseAction} />
    </div>
  );
}
