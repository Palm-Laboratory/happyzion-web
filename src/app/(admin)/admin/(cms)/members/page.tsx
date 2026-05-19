import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getChurchMembers } from "@/lib/admin-members-api";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import MemberListClient from "./_components/member-list-client";

type RawSearchParams = {
  name?: string;
  phone?: string;
  includeInactive?: string;
  page?: string;
};

function parseQuery(sp: RawSearchParams) {
  const page = Number.isFinite(Number(sp.page)) ? Math.max(0, Number(sp.page)) : 0;
  const name = sp.name?.trim() || undefined;
  const phone = sp.phone?.replace(/[^0-9-]/g, "").trim() || undefined;
  const includeInactive = sp.includeInactive === "true";
  return { name, phone, includeInactive, page, size: 20 };
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin/members");
  }

  const sp = await searchParams;
  const query = parseQuery(sp);
  const data = await getChurchMembers(query);

  return (
    <div className="space-y-5">
      <AdminBreadcrumb items={[{ label: "운영" }, { label: "교인 관리" }]} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0f1c2e]">교인 관리</h1>
        <Link
          href="/admin/members/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4a82d7]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          교인 등록
        </Link>
      </div>
      <MemberListClient data={data} query={query} />
    </div>
  );
}
