import { NextResponse } from "next/server";

import { ServerFetchError } from "@/lib/server-fetch";
import { recordPublicBoardPostView } from "@/lib/public-board-api";

interface RouteContext {
  params: Promise<{ slug: string; postId: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { slug, postId } = await context.params;
  const menuId = new URL(request.url).searchParams.get("menuId")?.trim();

  if (!menuId) {
    return NextResponse.json({ message: "menuId is required." }, { status: 400 });
  }

  try {
    await recordPublicBoardPostView(slug, menuId, postId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const status = error instanceof ServerFetchError ? error.status : 502;

    return NextResponse.json(
      {
        code: "PUBLIC_BOARD_VIEW_RECORD_FAILED",
        message: "게시글 조회수를 기록하지 못했습니다.",
      },
      { status },
    );
  }
}
