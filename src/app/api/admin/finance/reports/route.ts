import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const qs = new URLSearchParams();
  if (searchParams.get("year")) qs.set("year", searchParams.get("year")!);
  if (searchParams.get("month")) qs.set("month", searchParams.get("month")!);
  qs.set("page", searchParams.get("page") ?? "0");
  qs.set("size", searchParams.get("size") ?? "20");

  try {
    const res = await adminApiFetch(`/api/v1/admin/finance/reports?${qs}`);
    return NextResponse.json(await res.json());
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "재정 보고서 목록을 불러오지 못했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    // multipart 그대로 백엔드로 전달
    const formData = await request.formData();
    const res = await adminApiFetch("/api/v1/admin/finance/reports", {
      method: "POST",
      body: formData,
    });
    return NextResponse.json(await res.json());
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "보고서 저장에 실패했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
