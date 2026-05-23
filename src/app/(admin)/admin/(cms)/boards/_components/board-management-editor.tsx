"use client";

import BoardPostEditor from "./board-post-editor";
import type { BoardManagementController } from "./use-board-management-controller";
import { formatBoardMenuOptionLabel, formatDate, getErrorMessage } from "./board-management-utils";

export function BoardManagementEditor({ controller }: { controller: BoardManagementController }) {
  const editingPost = controller.selectedPostId
    ? controller.posts.find((post) => post.id === controller.selectedPostId)
    : null;
  const canEdit = !controller.selectedPostId || (editingPost ? controller.canEditPost(editingPost) : true);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="space-y-5 px-5 py-5">
          <div className="space-y-1">
            <h2 className="text-[18px] font-semibold text-[#132033]">
              {controller.selectedPostId ? "게시글 상세" : "새 게시글 작성"}
            </h2>
            <p className="text-[12px] text-[#6d7f95]">게시판별 공지와 일반 게시글을 관리합니다.</p>
          </div>

          {editingPost && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-[#f8fafc] px-4 py-3 text-[12px] text-[#5d6f86]">
              <span><span className="font-semibold text-[#334155]">작성자</span>&nbsp;&nbsp;{editingPost.authorName}</span>
              <span><span className="font-semibold text-[#334155]">등록일</span>&nbsp;&nbsp;{formatDate(editingPost.createdAt)}</span>
              <span><span className="font-semibold text-[#334155]">수정일</span>&nbsp;&nbsp;{formatDate(editingPost.updatedAt)}</span>
            </div>
          )}

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">게시판</span>
            <select
              value={controller.selectedMenuId}
              onChange={(event) => controller.handleSelectedMenuChange(Number(event.target.value))}
              className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px] font-semibold text-[#334155]"
            >
              {controller.boardMenus.map((boardMenu) => (
                <option key={boardMenu.id} value={boardMenu.id}>
                  {formatBoardMenuOptionLabel(boardMenu)}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#334155]">제목</span>
            <input
              value={controller.draft.title}
              onChange={(event) => controller.setDraft((prev) => ({ ...prev, title: event.target.value }))}
              className="w-full rounded-lg border border-[#d5deea] px-3 py-2 text-[13px]"
            />
          </label>

          <fieldset className="rounded-xl border border-[#eef2f7] bg-[#f8fafc] px-4 py-3">
            <legend className="text-[13px] font-semibold text-[#334155]">공개 여부</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#334155]">
                <input
                  type="radio"
                  name="board-post-visibility"
                  checked={controller.draft.isPublic}
                  onChange={() => controller.setDraft((prev) => ({ ...prev, isPublic: true }))}
                />
                공개
              </label>
              <label className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#334155]">
                <input
                  type="radio"
                  name="board-post-visibility"
                  checked={!controller.draft.isPublic}
                  onChange={() => controller.setDraft((prev) => ({ ...prev, isPublic: false }))}
                />
                비공개
              </label>
            </div>
          </fieldset>

          <label className="flex items-center gap-2 rounded-xl border border-[#eef2f7] bg-[#f8fafc] px-4 py-3 text-[13px] font-semibold text-[#334155]">
            <input
              type="checkbox"
              checked={controller.draft.isPinned}
              onChange={(event) => controller.setDraft((prev) => ({ ...prev, isPinned: event.target.checked }))}
            />
            상단 고정
          </label>

          <BoardPostEditor
            key={`${controller.selectedPostId ?? "new"}:${controller.editorContentVersion}`}
            value={controller.draft.contentJson}
            onImageUpload={controller.handleUpload}
            onImageUploadError={controller.handleEditorUploadError}
            onChange={controller.handleContentChange}
            disabled={controller.saving}
          />

          {controller.hasPendingImageUpload && (
            <p className="text-[12px] text-[#b45309]">
              이미지 업로드가 진행 중입니다. 완료 후 저장해 주세요.
            </p>
          )}

          <AttachmentPanel controller={controller} />

          <div className="flex items-center justify-between gap-2 border-t border-[#edf2f7] pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={controller.handleBackToList}
                className="rounded-lg border border-[#d7e3f4] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155]"
              >
                목록으로
              </button>
              {controller.selectedPostId && canEdit ? (
                <button
                  type="button"
                  onClick={controller.handleDelete}
                  disabled={controller.saving}
                  className="rounded-lg border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-[12px] font-semibold text-[#b42318] disabled:opacity-60"
                >
                  삭제
                </button>
              ) : null}
            </div>
            {canEdit ? (
              <button
                type="button"
                onClick={controller.handleSave}
                disabled={controller.saving || controller.hasPendingImageUpload}
                className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-60"
              >
                {controller.saving ? "저장 중..." : "게시글 저장"}
              </button>
            ) : (
              <span className="text-[12px] text-[#94a3b8]">본인이 작성한 게시글만 수정할 수 있습니다.</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function AttachmentPanel({ controller }: { controller: BoardManagementController }) {
  const isUploading = controller.uploadingAttachment;
  const hasItems = controller.pendingAttachments.length > 0 || controller.attachmentAssets.length > 0;

  return (
    <div className="space-y-2 rounded-xl border border-[#eef2f7] bg-[#f8fafc] px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className={`inline-flex cursor-pointer items-center rounded-lg border border-[#d7e3f4] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155] ${isUploading || controller.saving ? "cursor-not-allowed opacity-50" : ""}`}>
          첨부 파일 업로드
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp,.zip,.rar,.7z"
            className="hidden"
            disabled={controller.saving || isUploading}
            onChange={(event) => {
              void controller.handleAttachmentUpload(event.target.files).catch((uploadError) => {
                const message = getErrorMessage(uploadError, "첨부 파일 업로드에 실패했습니다.");
                console.error(message);
              });
              event.target.value = "";
            }}
          />
        </label>
        {process.env.NODE_ENV === "development" && (
          <button
            type="button"
            disabled={isUploading || controller.saving}
            onClick={() => controller.simulateAttachmentUpload(5, 4000)}
            className="rounded-lg border border-dashed border-[#94a3b8] px-3 py-1.5 text-[11px] text-[#6d7f95] hover:bg-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            [DEV] 업로드 시뮬레이션 (5파일/4초)
          </button>
        )}
      </div>
      {hasItems && (
        <ul className="space-y-1">
          {controller.pendingAttachments.map((item) => (
            <li key={item.tempId} className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
              <p className="shrink-0 text-[12px] font-medium text-[#334155]">{item.filename}</p>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="h-full rounded-full bg-[#3f74c7] transition-all duration-200"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="shrink-0 text-[11px] tabular-nums text-[#6d7f95]">{item.progress}%</span>
              <div className="shrink-0 w-[22px]" />
            </li>
          ))}
          {controller.attachmentAssets.map((asset) => (
            <li key={asset.id} className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-[#334155]">{asset.originalFilename}</p>
                {asset.byteSize != null && (
                  <p className="text-[11px] text-[#8fa3bc]">{(asset.byteSize / 1024).toFixed(1)} KB</p>
                )}
              </div>
              <button
                type="button"
                disabled={controller.saving}
                onClick={() => controller.setAttachmentAssets((current) => current.filter((assetItem) => assetItem.id !== asset.id))}
                className="shrink-0 rounded p-1 text-[#94a3b8] transition hover:bg-[#fee2e2] hover:text-[#b91c1c] disabled:opacity-40"
                aria-label="첨부 파일 제거"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
