import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  createAdminBoardPost,
  getAdminBoardPosts,
  toFriendlyAdminBoardMessage,
} from "@/lib/admin-board-api";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

type BoardPostsListOptions = {
  menuId?: string | null;
  page?: number;
  size?: number;
  title?: string | null;
};

function unauthorizedResponse() {
  return NextResponse.json(
    { code: "UNAUTHORIZED", message: "관리자 로그인이 필요합니다." },
    { status: 401 },
  );
}

function readMenuId(request: Request) {
  return new URL(request.url).searchParams.get("menuId");
}

function readListOptions(request: Request): BoardPostsListOptions {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  const size = searchParams.get("size");
  const title = searchParams.get("title");

  return {
    menuId: searchParams.get("menuId"),
    page: page == null ? undefined : Number(page),
    size: size == null ? undefined : Number(size),
    title: title == null ? undefined : title,
  };
}

export async function GET(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return unauthorizedResponse();
  }

  const { slug } = await context.params;
  const options = readListOptions(request);

  try {
    const result = await getAdminBoardPosts(session.user.id, slug, options);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "ADMIN_BOARD_POSTS_FETCH_FAILED",
        message: toFriendlyAdminBoardMessage(error, "게시글 목록을 불러오지 못했습니다."),
      },
      { status },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!isAdminSession(session) || !session.user.id) {
    return unauthorizedResponse();
  }

  const { slug } = await context.params;
  const menuId = readMenuId(request);

  try {
    const payload = await request.json();
    const post = await createAdminBoardPost(session.user.id, slug, menuId ? { ...payload, menuId } : payload);
    revalidateTag("public-board");
    return NextResponse.json(post);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 400;

    return NextResponse.json(
      {
        code: "ADMIN_BOARD_POST_CREATE_FAILED",
        message: toFriendlyAdminBoardMessage(error, "게시글을 저장하지 못했습니다."),
      },
      { status },
    );
  }
}
