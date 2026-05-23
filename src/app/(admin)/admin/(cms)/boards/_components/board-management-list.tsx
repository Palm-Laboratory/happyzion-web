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
          <span className="text-[13px] text-[#5d6f86]">
            전체 <span className="font-semibold text-[#132033]">{controller.filteredPosts.length}</span>건
          </span>
          <select
            value={controller.displayPageSize}
            onChange={(e) => controller.setDisplayPageSize(Number(e.target.value))}
            className="h-8 rounded-lg border border-[#d5deea] bg-white px-2 text-[12px] font-semibold text-[#334155] focus:border-[#3f74c7] focus:outline-none"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}개</option>
            ))}
          </select>
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
                      <td className="px-5 py-4 text-[13px] text-[#5d6f86]">{controller.filteredPosts.length - index}</td>
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

        <BoardPagination controller={controller} />
      </section>
    </div>
  );
}

function BoardPagination({ controller }: { controller: BoardManagementController }) {
  const current = controller.safeDisplayPage;
  const total = controller.totalPages;

  const getPageNumbers = (): number[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    if (current <= 3) return [0, 1, 2, 3, 4, -1, total - 1];
    if (current >= total - 4) return [0, -1, total - 5, total - 4, total - 3, total - 2, total - 1];
    return [0, -1, current - 1, current, current + 1, -2, total - 1];
  };

  return (
    <div className="grid grid-cols-3 items-center border-t border-[#edf2f7] px-5 py-4">
      <div />
      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => controller.setDisplayPage((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#334155] transition hover:bg-[#f0f6ff] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="이전 페이지"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M7.5 2.5l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {getPageNumbers().map((index, i) =>
          index < 0 ? (
            <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-[12px] text-[#8fa3bb]">…</span>
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => controller.setDisplayPage(index)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-semibold transition ${
                index === current
                  ? "bg-[#3f74c7] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#334155] hover:bg-[#f0f6ff]"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => controller.setDisplayPage((p) => Math.min(total - 1, p + 1))}
          disabled={current === total - 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#334155] transition hover:bg-[#f0f6ff] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="다음 페이지"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={controller.openNewPost}
          disabled={controller.boardMenus.length === 0}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#3f74c7] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4a82d7] disabled:opacity-60"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          새 게시글 등록
        </button>
      </div>
    </div>
  );
}
