import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  deleteAdminBoardPost,
  getAdminBoardPost,
  toFriendlyAdminBoardMessage,
  updateAdminBoardPost,
} from "@/lib/admin-board-api";

interface RouteContext {
  params: Promise<{ slug: string; postId: string }>;
}

function unauthorizedResponse() {
  return NextResponse.json(
    { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
    { status: 401 },
  );
}

function readMenuId(request: Request) {
  return new URL(request.url).searchParams.get("menuId");
}

export async function GET(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return unauthorizedResponse();
  }

  const { slug, postId } = await context.params;
  const menuId = readMenuId(request);

  try {
    const post = await getAdminBoardPost(session.user.id, slug, postId, menuId);
    return NextResponse.json(post);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "ADMIN_BOARD_POST_FETCH_FAILED",
        message: toFriendlyAdminBoardMessage(error, "게시글 상세를 불러오지 못했습니다."),
      },
      { status },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return unauthorizedResponse();
  }

  const { slug, postId } = await context.params;
  const menuId = readMenuId(request);

  try {
    const payload = await request.json();
    const post = await updateAdminBoardPost(session.user.id, slug, postId, menuId ? { ...payload, menuId } : payload);
    revalidateTag("public-board");
    return NextResponse.json(post);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "ADMIN_BOARD_POST_UPDATE_FAILED",
        message: toFriendlyAdminBoardMessage(error, "게시글을 저장하지 못했습니다."),
      },
      { status },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return unauthorizedResponse();
  }

  const { slug, postId } = await context.params;
  const menuId = readMenuId(request);

  try {
    await deleteAdminBoardPost(session.user.id, slug, postId, menuId);
    revalidateTag("public-board");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "ADMIN_BOARD_POST_DELETE_FAILED",
        message: toFriendlyAdminBoardMessage(error, "게시글을 삭제하지 못했습니다."),
      },
      { status },
    );
  }
}
