import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  listSmsLogs,
  sendSms,
  toFriendlySmsMessage,
  SmsSendRequest,
} from "@/lib/admin-sms-api";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "0");
  const pageSize = Number(searchParams.get("pageSize") ?? "20");

  try {
    const data = await listSmsLogs(page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    return NextResponse.json(
      {
        code: "FETCH_FAILED",
        message: toFriendlySmsMessage(error, "SMS 전송 내역을 불러오지 못했습니다."),
      },
      { status },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const payload = (await request.json()) as SmsSendRequest;
    const result = await sendSms(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      {
        code: "SEND_FAILED",
        message: toFriendlySmsMessage(error, "SMS 전송에 실패했습니다."),
      },
      { status },
    );
  }
}
