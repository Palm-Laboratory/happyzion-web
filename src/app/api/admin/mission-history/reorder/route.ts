import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { reorderMissionYears, toFriendlyMissionHistoryMessage } from "@/lib/admin-mission-history-api";
import { AdminApiError } from "@/lib/admin-api";

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const { yearIds } = (await request.json()) as { yearIds: number[] };
    await reorderMissionYears(yearIds);
    revalidateTag("mission-history");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      { code: "REORDER_FAILED", message: toFriendlyMissionHistoryMessage(error, "순서 저장에 실패했습니다.") },
      { status },
    );
  }
}
