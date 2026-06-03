import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getChurchMembers } from "@/lib/admin-members-api";
import { CHURCH_MEMBER_STATUSES, type ChurchMemberStatus } from "@/lib/admin-members-types";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import MemberListClient from "./_components/member-list-client";

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
type MemberPageSize = typeof PAGE_SIZE_OPTIONS[number];

type RawSearchParams = {
  name?: string;
  phone?: string;
  status?: string;
  includeInactive?: string;
  page?: string;
  size?: string;
};

function parseStatus(value: string | undefined): ChurchMemberStatus | undefined {
  if (!value) return undefined;
  return (CHURCH_MEMBER_STATUSES as string[]).includes(value) ? value as ChurchMemberStatus : undefined;
}

function parseQuery(sp: RawSearchParams) {
  const page = Number.isFinite(Number(sp.page)) ? Math.max(0, Number(sp.page)) : 0;
  const rawSize = Number(sp.size);
  const size: MemberPageSize = (PAGE_SIZE_OPTIONS as readonly number[]).includes(rawSize) ? rawSize as MemberPageSize : 20;
  const name = sp.name?.trim() || undefined;
  const phone = sp.phone?.replace(/[^0-9-]/g, "").trim() || undefined;
  const status = parseStatus(sp.status);
  const includeInactive = sp.includeInactive === "true";
  return { name, phone, status, includeInactive, page, size };
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
      <AdminBreadcrumb items={[{ label: "교회 관리" }, { label: "교인 관리" }]} />
      <h1 className="text-xl font-bold text-[#0f1c2e]">교인 관리</h1>
      <MemberListClient data={data} query={query} />
    </div>
  );
}
