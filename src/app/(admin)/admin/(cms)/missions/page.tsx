import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { getMissionTrips } from "@/lib/admin-missions-api";
import {
  MISSION_TRIP_TYPE_LABELS,
  MISSION_TRIP_STATUS_LABELS,
  type MissionTripStatus,
} from "@/lib/admin-missions-types";
import AdminBreadcrumb from "../components/admin-breadcrumb";

type RawSearchParams = { year?: string; status?: string; country?: string; page?: string };

const PAGE_SIZE = 20;

export default async function MissionsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect("/admin/login?callbackUrl=/admin/missions");

  const sp = await searchParams;
  const year = sp.year ? Number(sp.year) : undefined;
  const status = (sp.status as MissionTripStatus) || undefined;
  const country = sp.country?.trim() || undefined;
  const pageNumber = sp.page ? Number(sp.page) : 1;
  const page = Number.isSafeInteger(pageNumber) && pageNumber > 0 ? pageNumber - 1 : 0;

  const { trips, totalElements, totalPages, page: currentPage } = await getMissionTrips({
    year,
    status,
    country,
    page,
    size: PAGE_SIZE,
  });
  if (trips.length === 0 && totalElements > 0 && totalPages > 0 && currentPage >= totalPages) {
    redirect(buildPageHref(sp, totalPages));
  }

  return (
    <div className="space-y-5">
      <AdminBreadcrumb items={[{ label: "교회 관리" }, { label: "선교 관리" }]} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0f1c2e]">선교 관리</h1>
        <Link
          href="/admin/missions/new"
          className="rounded-lg bg-[#3f74c7] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2f5eaa]"
        >
          + 여정 추가
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d0dae8] bg-white py-16 text-center text-sm text-[#8fa3bb]">
          등록된 선교 여정이 없습니다.
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-[#e2eaf3] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2eaf3] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8fa3bb]">
                  <th className="px-5 py-3">제목</th>
                  <th className="px-4 py-3">나라/지역</th>
                  <th className="px-4 py-3">기간</th>
                  <th className="px-4 py-3">유형</th>
                  <th className="px-4 py-3">상태</th>
                  <th className="px-4 py-3">참가자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f9]">
                {trips.map((trip) => (
                  <tr key={trip.id} className="group transition-colors hover:bg-[#f7f9fc]">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/missions/${trip.id}`}
                        className="font-medium text-[#1a3152] transition group-hover:text-[#3f74c7]"
                      >
                        {trip.title}
                      </Link>
                      {trip.leaderLabel && (
                        <span className="ml-2 text-xs text-[#8fa3bb]">인솔: {trip.leaderLabel}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[#4a6484]">{trip.country}</td>
                    <td className="px-4 py-3.5 text-[#4a6484]">
                      {trip.startDate}
                      {trip.endDate && <> ~ {trip.endDate}</>}
                    </td>
                    <td className="px-4 py-3.5 text-[#4a6484]">{MISSION_TRIP_TYPE_LABELS[trip.type]}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={trip.status} />
                    </td>
                    <td className="px-4 py-3.5 text-[#4a6484]">{trip.participantCount}명</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            searchParams={sp}
          />
        </>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalElements,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  searchParams: RawSearchParams;
}) {
  if (totalPages <= 1) {
    return (
      <p className="px-5 py-2 text-xs text-[#8fa3bb]">
        총 {totalElements.toLocaleString("ko-KR")}개
      </p>
    );
  }

  const pageItems = getPageItems(currentPage, totalPages);
  const previousPage = currentPage > 0 ? currentPage : null;
  const nextPage = currentPage + 2 <= totalPages ? currentPage + 2 : null;

  return (
    <div className="grid grid-cols-3 items-center px-5 py-2">
      <p className="text-xs text-[#8fa3bb]">총 {totalElements.toLocaleString("ko-KR")}개</p>
      <nav className="flex items-center justify-center gap-1" aria-label="선교 여정 페이지">
        <PageLink page={previousPage} searchParams={searchParams} label="이전" />
        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-[12px] font-semibold text-[#8fa3bb]"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <PageLink
              key={item}
              page={item}
              searchParams={searchParams}
              label={String(item)}
              active={item === currentPage + 1}
            />
          ),
        )}
        <PageLink page={nextPage} searchParams={searchParams} label="다음" />
      </nav>
      <div />
    </div>
  );
}

function PageLink({
  page,
  searchParams,
  label,
  active = false,
}: {
  page: number | null;
  searchParams: RawSearchParams;
  label: string;
  active?: boolean;
}) {
  const className = active
    ? "flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#3f74c7] px-2 text-[12px] font-semibold text-white"
    : "flex h-8 min-w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-2 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f0f6ff]";

  if (page == null) {
    return (
      <span className={`${className} pointer-events-none opacity-40`} aria-disabled="true" aria-label={`${label} 페이지`}>
        {label}
      </span>
    );
  }

  return (
    <Link
      href={buildPageHref(searchParams, page)}
      className={className}
      aria-current={active ? "page" : undefined}
      aria-label={label === "이전" || label === "다음" ? `${label} 페이지` : undefined}
    >
      {label}
    </Link>
  );
}

function buildPageHref(searchParams: RawSearchParams, page: number) {
  const params = new URLSearchParams();
  if (searchParams.year) params.set("year", searchParams.year);
  if (searchParams.status) params.set("status", searchParams.status);
  if (searchParams.country?.trim()) params.set("country", searchParams.country.trim());
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/admin/missions${qs ? `?${qs}` : ""}`;
}

function getPageItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  const current = currentPage + 1;
  const pages = new Set([1, totalPages, current - 1, current, current + 1]);
  const visiblePages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return visiblePages.flatMap((page, index) => {
    const previous = visiblePages[index - 1];
    if (previous != null && page - previous > 1) return ["ellipsis" as const, page];
    return [page];
  });
}

function StatusBadge({ status }: { status: MissionTripStatus }) {
  const styles: Record<MissionTripStatus, string> = {
    PLANNED: "bg-[#f0f4f9] text-[#4a6484]",
    RECRUITING: "bg-[#e8f2ff] text-[#3f74c7]",
    ONGOING: "bg-[#e8fff0] text-[#1a8a4a]",
    COMPLETED: "bg-[#f0f0f0] text-[#666]",
    CANCELLED: "bg-[#fff0f0] text-[#c73f3f]",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {MISSION_TRIP_STATUS_LABELS[status]}
    </span>
  );
}
