import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function GET() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const res = await adminApiFetch("/api/v1/admin/finance/balance");
    return NextResponse.json(await res.json());
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "잔액을 불러오지 못했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
