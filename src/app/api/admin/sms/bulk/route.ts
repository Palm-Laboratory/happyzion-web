import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import { sendSmsBulk, toFriendlySmsMessage, SmsBulkSendRequest } from "@/lib/admin-sms-api";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const payload = (await request.json()) as SmsBulkSendRequest;
    const result = await sendSmsBulk(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      {
        code: "BULK_SEND_FAILED",
        message: toFriendlySmsMessage(error, "대량 SMS 전송에 실패했습니다."),
      },
      { status },
    );
  }
}
