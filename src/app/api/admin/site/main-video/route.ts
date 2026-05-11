import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  getAdminMainVideoSetting,
  toFriendlyAdminSiteSettingMessage,
  updateAdminMainVideoSetting,
  uploadAdminMainVideoSetting,
  type UpdateMainVideoSettingRequest,
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

export async function PUT(request: Request) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const payload = (await request.json()) as UpdateMainVideoSettingRequest;
    const updated = await updateAdminMainVideoSetting(payload);

    revalidateTag("site-settings");
    revalidatePath("/");
    revalidatePath("/admin/main-video");

    return NextResponse.json(updated);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      {
        code: "ADMIN_MAIN_VIDEO_UPDATE_FAILED",
        message: toFriendlyAdminSiteSettingMessage(error, "메인 영상 설정을 저장하지 못했습니다."),
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
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { code: "INVALID_FORM", message: "업로드할 영상 파일을 선택해 주세요." },
        { status: 400 },
      );
    }

    const updated = await uploadAdminMainVideoSetting(file);

    revalidateTag("site-settings");
    revalidatePath("/");
    revalidatePath("/admin/main-video");

    return NextResponse.json(updated);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      {
        code: "ADMIN_MAIN_VIDEO_UPLOAD_FAILED",
        message: toFriendlyAdminSiteSettingMessage(error, "메인 영상 업로드에 실패했습니다."),
      },
      { status },
    );
  }
}
