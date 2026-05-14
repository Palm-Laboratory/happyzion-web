import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";
import { listMissionYears, createMissionYear, toFriendlyMissionHistoryMessage, MissionYearPayload } from "@/lib/admin-mission-history-api";
import { AdminApiError } from "@/lib/admin-api";

export async function GET() {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const years = await listMissionYears(session.user.id);
    return NextResponse.json({ years });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    return NextResponse.json(
      { code: "FETCH_FAILED", message: toFriendlyMissionHistoryMessage(error, "선교 이력을 불러오지 못했습니다.") },
      { status },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json({ code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as MissionYearPayload;
    const result = await createMissionYear(session.user.id, payload);
    revalidateTag("mission-history");
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;
    return NextResponse.json(
      { code: "CREATE_FAILED", message: toFriendlyMissionHistoryMessage(error, "선교 이력을 추가하지 못했습니다.") },
      { status },
    );
  }
}
