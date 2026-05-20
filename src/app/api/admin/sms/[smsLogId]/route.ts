import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import { getSmsLogDetail, toFriendlySmsMessage } from "@/lib/admin-sms-api";

interface RouteContext {
  params: Promise<{ smsLogId: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const { smsLogId } = await context.params;
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "0");
  const pageSize = Number(searchParams.get("pageSize") ?? "50");

  try {
    const data = await getSmsLogDetail(Number(smsLogId), page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    return NextResponse.json(
      {
        code: "FETCH_FAILED",
        message: toFriendlySmsMessage(error, "SMS 전송 상세를 불러오지 못했습니다."),
      },
      { status },
    );
  }
}
