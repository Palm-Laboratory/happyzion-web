import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminSession } from "@/auth";

export async function POST() {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
      { status: 401 },
    );
  }

  revalidateTag("site-settings");
  revalidatePath("/");
  revalidatePath("/admin/main-video");

  return NextResponse.json({ ok: true });
}
