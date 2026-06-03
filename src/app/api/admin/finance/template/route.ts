import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function GET() {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const res = await adminApiFetch("/api/v1/admin/finance/template", { method: "GET" });
    const body = await res.arrayBuffer();
    const headers = new Headers();
    headers.set(
      "Content-Type",
      res.headers.get("content-type") ??
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    const disposition = res.headers.get("content-disposition");
    if (disposition) headers.set("Content-Disposition", disposition);
    headers.set("Cache-Control", "no-store");
    return new NextResponse(body, { status: 200, headers });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "양식 다운로드에 실패했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
