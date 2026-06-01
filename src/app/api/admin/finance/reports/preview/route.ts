import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const res = await adminApiFetch("/api/v1/admin/finance/reports/preview", {
      method: "POST",
      body: formData,
    });
    return NextResponse.json(await res.json());
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "엑셀 파싱에 실패했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
