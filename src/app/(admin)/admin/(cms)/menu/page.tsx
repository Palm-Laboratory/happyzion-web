import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getAdminMenuTree, getAdminStaticPages } from "@/lib/admin-menu-api";
import MenuManagementClient from "./_components/menu-management-client";
import AdminBreadcrumb from "../components/admin-breadcrumb";

export default async function AdminMenuPage() {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/menu");
  }

  const actorId = session.user.id ?? "";
  const [menuTree, staticPages] = await Promise.all([
    getAdminMenuTree(actorId),
    getAdminStaticPages(actorId),
  ]);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "사이트 관리" }, { label: "메뉴 관리" }]} />

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#0f1c2e]">메뉴 관리</h1>
        <p className="text-[13px] text-[#5d6f86]">
          공개 사이트의 메뉴 그룹, 페이지 연결, 노출 상태와 순서를 관리합니다.
        </p>
      </div>

      <MenuManagementClient
        initialItems={menuTree.items}
        staticPages={staticPages.pages}
      />
    </div>
  );
}
