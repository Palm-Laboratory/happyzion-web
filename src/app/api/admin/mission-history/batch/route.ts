import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import {
  saveMissionHistoryBatch,
  toFriendlyMissionHistoryMessage,
  type MissionYearBatchUpdatePayload,
} from "@/lib/admin-mission-history-api";
import { AdminApiError } from "@/lib/admin-api";

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      years: MissionYearBatchUpdatePayload[];
      yearIds?: number[];
    };
    const years = await saveMissionHistoryBatch(payload);
    revalidateTag("mission-history");
    return NextResponse.json({ years });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      { code: "BATCH_SAVE_FAILED", message: toFriendlyMissionHistoryMessage(error, "선교 이력을 저장하지 못했습니다.") },
      { status },
    );
  }
}
