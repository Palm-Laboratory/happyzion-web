import { notFound } from "next/navigation";
import { AdminApiError } from "@/lib/admin-api";
import { getMemberEducation, getEducationCourses } from "@/lib/admin-education-api";
import MemberEducationClient from "./_components/member-education-client";

export default async function MemberEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  let enrollments;
  let allCourses;
  try {
    [enrollments, allCourses] = await Promise.all([
      getMemberEducation(id),
      getEducationCourses({ size: 100 }),
    ]);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <MemberEducationClient
      memberId={id}
      initialEnrollments={enrollments.enrollments}
      allCourses={allCourses.courses}
    />
  );
}
