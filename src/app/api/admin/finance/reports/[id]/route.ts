import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const res = await adminApiFetch(`/api/v1/admin/finance/reports/${id}`);
    return NextResponse.json(await res.json());
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "보고서를 불러오지 못했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  try {
    await adminApiFetch(`/api/v1/admin/finance/reports/${id}`, { method: "DELETE" });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    const message = error instanceof AdminApiError ? error.message : "보고서 삭제에 실패했습니다.";
    return NextResponse.json({ code: "FETCH_FAILED", message }, { status });
  }
}
