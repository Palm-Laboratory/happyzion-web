"use client";

import type { BoardManagementController } from "./use-board-management-controller";
import { formatDate } from "./board-management-utils";

export function BoardManagementList({ controller }: { controller: BoardManagementController }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5" style={{ minWidth: "160px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">게시판</span>
            <select
              value={controller.boardMenuFilter}
              onChange={(event) => controller.setBoardMenuFilter(event.target.value)}
              className="h-9 rounded-lg border border-[#d5deea] bg-white px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            >
              <option value="ALL">전체</option>
              {controller.boardMenus.map((boardMenu) => (
                <option key={boardMenu.id} value={boardMenu.id}>
                  {boardMenu.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-1.5" style={{ minWidth: "180px" }}>
            <span className="text-[11px] font-semibold text-[#55697f]">제목 검색</span>
            <input
              value={controller.titleQuery}
              onChange={(event) => controller.setTitleQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && controller.handleBoardSearch()}
              placeholder="게시글 제목을 입력하세요"
              className="h-9 rounded-lg border border-[#d5deea] px-3 text-[13px] focus:border-[#3f74c7] focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={controller.handleBoardSearch}
            className="h-9 rounded-lg bg-[#3f74c7] px-5 text-[13px] font-semibold text-white transition hover:bg-[#4a82d7]"
          >
            검색
          </button>
        </div>
        {controller.disconnectedBoardMenus.length > 0 && (
          <p className="mt-3 rounded-lg bg-[#fff7ed] px-3 py-2 text-[12px] text-[#9a3412]">
            연결 게시판이 사라진 메뉴 {controller.disconnectedBoardMenus.length}개는 목록에서 제외했습니다.
            메뉴 관리에서 저장하면 메뉴 전용 게시판이 다시 생성됩니다.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf2f7] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#5d6f86]">
              전체 <span className="font-semibold text-[#132033]">{controller.filteredPosts.length}</span>건
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={controller.openNewPost}
              disabled={controller.boardMenus.length === 0}
              className="h-9 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white transition hover:bg-[#4a82d7] disabled:opacity-60"
            >
              새 게시글 등록
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#edf2f7] bg-[#f8fafc]">
                {["번호", "게시판", "제목", "공개", "고정", "작성자", "등록일", "수정일"].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-5 py-3 text-[11px] font-semibold tracking-wide text-[#55697f]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {controller.loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-[13px] text-[#6d7f95]">
                    로딩 중...
                  </td>
                </tr>
              ) : controller.filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-[13px] text-[#6d7f95]">
                    조건에 맞는 게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                controller.filteredPosts.map((post, index) => {
                  if (index < controller.pageStartIndex || index >= controller.pageEndIndex) {
                    return null;
                  }

                  return (
                    <tr
                      key={`${post.boardMenuId}-${post.id}`}
                      className={`border-b border-[#f0f4f8] last:border-0 transition ${controller.canEditPost(post) ? "cursor-pointer hover:bg-[#fafcff]" : "opacity-60"}`}
                      onClick={() => controller.canEditPost(post) && controller.openPost(post)}
                    >
                      <td className="px-5 py-4 text-[13px] text-[#5d6f86]">{index + 1}</td>
                      <td className="px-5 py-4 text-[12px] text-[#5d6f86]">{post.boardMenuLabel}</td>
                      <td className="px-5 py-4">
                        <p className="max-w-[200px] truncate text-[13px] font-semibold text-[#132033]">
                          {post.title}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            post.isPublic
                              ? "bg-[#ecfdf5] text-[#047857]"
                              : "bg-[#f8fafc] text-[#64748b]"
                          }`}
                        >
                          {post.isPublic ? "공개" : "비공개"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        {post.isPinned ? (
                          <span className="rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-[10px] font-semibold text-[#c2410c]">
                            고정
                          </span>
                        ) : (
                          <span className="text-[12px] text-[#c0cbd8]">-</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">
                        {post.authorName}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#5d6f86]">
                        {formatDate(post.updatedAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {controller.totalPages > 1 && <BoardPagination controller={controller} />}
      </section>
    </div>
  );
}

function BoardPagination({ controller }: { controller: BoardManagementController }) {
  return (
    <div className="flex items-center justify-center gap-1 border-t border-[#edf2f7] px-5 py-3">
      <button
        type="button"
        onClick={() => controller.setDisplayPage(0)}
        disabled={controller.safeDisplayPage === 0}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[12px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-30"
      >
        «
      </button>
      <button
        type="button"
        onClick={() => controller.setDisplayPage((page) => Math.max(0, page - 1))}
        disabled={controller.safeDisplayPage === 0}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[12px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-30"
      >
        ‹
      </button>
      {Array.from({ length: controller.totalPages }, (_, index) => index)
        .filter((index) => Math.abs(index - controller.safeDisplayPage) <= 2)
        .map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => controller.setDisplayPage(index)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-medium transition ${
              index === controller.safeDisplayPage
                ? "bg-[#3f74c7] text-white"
                : "text-[#5d6f86] hover:bg-[#f1f5f9]"
            }`}
          >
            {index + 1}
          </button>
        ))}
      <button
        type="button"
        onClick={() => controller.setDisplayPage((page) => Math.min(controller.totalPages - 1, page + 1))}
        disabled={controller.safeDisplayPage === controller.totalPages - 1}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[12px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-30"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => controller.setDisplayPage(controller.totalPages - 1)}
        disabled={controller.safeDisplayPage === controller.totalPages - 1}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[12px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-30"
      >
        »
      </button>
    </div>
  );
}
