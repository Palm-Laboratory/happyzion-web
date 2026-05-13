import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  getAdminMainVideoSetting,
  toFriendlyAdminSiteSettingMessage,
} from "@/lib/admin-site-settings-api";

export async function GET() {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const setting = await getAdminMainVideoSetting();
    return NextResponse.json(setting);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      {
        code: "ADMIN_MAIN_VIDEO_FETCH_FAILED",
        message: toFriendlyAdminSiteSettingMessage(error, "메인 영상 설정을 불러오지 못했습니다."),
      },
      { status },
    );
  }
}
