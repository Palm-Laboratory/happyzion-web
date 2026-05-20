import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") ?? "";
  const size = searchParams.get("size") ?? "20";

  try {
    const qs = new URLSearchParams({ name, size });
    const response = await adminApiFetch(`/api/v1/admin/members?${qs.toString()}`);
    const data = (await response.json()) as unknown;
    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message =
      error instanceof AdminApiError
        ? error.message
        : "교인 목록을 불러오지 못했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
