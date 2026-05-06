import { NextResponse } from "next/server";

import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  issueAdminUploadToken,
  toFriendlyAdminUploadMessage,
  type AdminUploadTokenRequest,
} from "@/lib/admin-upload-api";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const payload = (await request.json()) as AdminUploadTokenRequest;
    const token = await issueAdminUploadToken(session.user.id, payload);
    return NextResponse.json(token);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "UPLOAD_TOKEN_ISSUE_FAILED",
        message: toFriendlyAdminUploadMessage(error, "업로드 토큰을 발급하지 못했습니다."),
      },
      { status },
    );
  }
}
