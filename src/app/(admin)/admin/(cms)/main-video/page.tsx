import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminMainVideoSetting } from "@/lib/admin-site-settings-api";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import MainVideoForm from "./_components/main-video-form";

export default async function AdminMainVideoPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/main-video");
  }

  const setting = await getAdminMainVideoSetting();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "운영" }, { label: "메인 영상" }]} />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">메인 영상</h1>
        <p className="text-[13px] text-[#5d6f86]">사용자 공개 페이지 첫 화면에 표시되는 배경 영상을 교체합니다.</p>
      </div>

      <MainVideoForm initialVideoUrl={setting.videoUrl} />
    </div>
  );
}
