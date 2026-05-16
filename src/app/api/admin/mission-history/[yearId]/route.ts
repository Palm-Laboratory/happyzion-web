import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { updateMissionYear, deleteMissionYear, toFriendlyMissionHistoryMessage, MissionYearPayload } from "@/lib/admin-mission-history-api";
import { AdminApiError } from "@/lib/admin-api";

interface RouteContext {
  params: Promise<{ yearId: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const { yearId } = await context.params;

  try {
    const payload = (await request.json()) as MissionYearPayload;
    const result = await updateMissionYear(Number(yearId), payload);
    revalidateTag("mission-history");
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      { code: "UPDATE_FAILED", message: toFriendlyMissionHistoryMessage(error, "선교 이력을 수정하지 못했습니다.") },
      { status },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  const { yearId } = await context.params;

  try {
    await deleteMissionYear(Number(yearId));
    revalidateTag("mission-history");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      { code: "DELETE_FAILED", message: toFriendlyMissionHistoryMessage(error, "선교 이력을 삭제하지 못했습니다.") },
      { status },
    );
  }
}
