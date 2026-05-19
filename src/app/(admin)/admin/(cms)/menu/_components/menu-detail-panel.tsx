"use client";

import type { AdminStaticPage, MenuStatus, MenuType } from "@/lib/admin-menu-api";
import {
  MANAGED_STATUS_OPTIONS,
  STATUS_LABEL,
} from "./menu-tree-constants";
import { MenuDeleteSection } from "./menu-delete-section";
import {
  type EditorNode,
  getMenuTypeDisplayLabel,
  getParentRuleDescription,
  hideNodeTree,
  isStaticMenuGroup,
  moveNodeWithinSiblings,
  reparentNode,
} from "./menu-tree-utils";

type Props = {
  selectedNode: EditorNode;
  items: EditorNode[];
  changedMenuCount: number;
  saving: boolean;
  descendantIds: Set<number>;
  hiddenStatusAffectsDescendants: boolean;
  confirmingSelectedDelete: boolean;
  selectedManualSlugMode: boolean;
  selectedSlugPreview: {
    value: string;
    modeLabel: string;
    isEmptyInput: boolean;
    isEmptyResult: boolean;
  } | null;
  selectedPreviewPublicRoute: string;
  parentCandidates: Array<{ node: EditorNode; depth: number }>;
  canMoveUp: boolean;
  canMoveDown: boolean;
  selectedOrderLabel: string;
  staticPages: AdminStaticPage[];
  onSave: () => void;
  onUpdateNode: (updater: (node: EditorNode) => EditorNode) => void;
  onMarkDirty: (items: EditorNode[]) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  onRequestDelete: () => void;
  onSwitchSlugMode: (manual: boolean) => void;
  onAddChild: (type: MenuType) => void;
};

export function MenuDetailPanel({
  selectedNode,
  items,
  changedMenuCount,
  saving,
  descendantIds,
  hiddenStatusAffectsDescendants,
  confirmingSelectedDelete,
  selectedManualSlugMode,
  selectedSlugPreview,
  selectedPreviewPublicRoute,
  parentCandidates,
  canMoveUp,
  canMoveDown,
  selectedOrderLabel,
  staticPages,
  onSave,
  onUpdateNode,
  onMarkDirty,
  onCancelDelete,
  onConfirmDelete,
  onRequestDelete,
  onSwitchSlugMode,
  onAddChild,
}: Props) {
  const isStaticLockedMenu = selectedNode.type === "STATIC" || isStaticMenuGroup(selectedNode);

  return (
    <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf2f7] px-5 py-4">
        <h2 className="text-[14px] font-bold text-[#132033]">상세 편집</h2>
        <button
          type="button"
          onClick={onSave}
          disabled={changedMenuCount === 0 || saving}
          className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-60"
        >
          {saving
            ? "저장 중..."
            : `변경사항 저장${changedMenuCount > 0 ? ` (${changedMenuCount})` : ""}`}
        </button>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="grid gap-5">
          {/* 기본 정보 */}
          <div className="space-y-4 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
            <div>
              <h3 className="text-[12px] font-bold text-[#132033]">기본 정보</h3>
              <p className="mt-1 text-[11px] text-[#6d7f95]">
                관리자와 사용자 사이트에 표시되는 기본 속성입니다.
              </p>
            </div>

            <label className="space-y-1.5">
              <span className="text-[12px] font-semibold text-[#334155]">메뉴 이름</span>
              <input
                value={selectedNode.label}
                onChange={(event) =>
                  onUpdateNode((node) => ({ ...node, label: event.target.value }))
                }
                className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-[12px] font-semibold text-[#334155]">타입</span>
                <input
                  value={getMenuTypeDisplayLabel(selectedNode)}
                  readOnly
                  className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-[13px]"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-[12px] font-semibold text-[#334155]">상태</span>
                <select
                  value={selectedNode.status === "DRAFT" ? "" : selectedNode.status}
                  onChange={(event) => {
                    const nextStatus = event.target.value as Extract<
                      MenuStatus,
                      "PUBLISHED" | "HIDDEN"
                    >;
                    onUpdateNode((node) => ({
                      ...(node.parentId === null && nextStatus === "HIDDEN"
                        ? hideNodeTree(node)
                        : node),
                      status: nextStatus,
                    }));
                  }}
                  disabled={selectedNode.status === "ARCHIVED"}
                  className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px] disabled:bg-[#f8fafc]"
                >
                  {selectedNode.status === "DRAFT" && (
                    <option value="" disabled>
                      {STATUS_LABEL.DRAFT}
                    </option>
                  )}
                  {selectedNode.status === "ARCHIVED" && (
                    <option value="ARCHIVED">{STATUS_LABEL.ARCHIVED}</option>
                  )}
                  {MANAGED_STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {selectedNode.status === "ARCHIVED" && (
                  <p className="text-[11px] leading-5 text-[#8fa3bb]">
                    보관 상태는 유튜브 동기화로만 해제됩니다.
                  </p>
                )}
                {hiddenStatusAffectsDescendants && (
                  <p className="text-[11px] leading-5 text-[#9a5b00]">
                    이 루트 메뉴를 숨기면 하위 메뉴 {descendantIds.size}개도 함께 숨김
                    처리됩니다.
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* 공개 경로 */}
          <div className="space-y-4 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
            <div>
              <h3 className="text-[12px] font-bold text-[#132033]">공개 경로</h3>
              <p className="mt-1 text-[11px] text-[#6d7f95]">
                사이트에서 접근할 URL 경로를 확인하고 조정합니다.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#334155]">URL 경로</span>
                  {!isStaticLockedMenu && (
                    <span className="rounded-full bg-[#e8f0fb] px-2 py-0.5 text-[10px] font-semibold text-[#2d5da8]">
                      {selectedManualSlugMode ? "직접 입력" : "자동 생성"}
                    </span>
                  )}
                  {isStaticLockedMenu && (
                    <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-semibold text-[#475569]">
                      코드 관리
                    </span>
                  )}
                </div>
                {!isStaticLockedMenu && (
                  <div className="inline-flex rounded-lg border border-[#d5deea] bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => onSwitchSlugMode(false)}
                      className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                        selectedManualSlugMode
                          ? "text-[#64748b] hover:bg-[#f8fafc]"
                          : "bg-[#3f74c7] text-white"
                      }`}
                    >
                      자동
                    </button>
                    <button
                      type="button"
                      onClick={() => onSwitchSlugMode(true)}
                      className={`rounded-md px-3 py-1.5 text-[11px] font-semibold ${
                        selectedManualSlugMode
                          ? "bg-[#3f74c7] text-white"
                          : "text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      직접 입력
                    </button>
                  </div>
                )}
              </div>
              <input
                value={selectedNode.slug}
                onChange={(event) =>
                  onUpdateNode((node) => ({
                    ...node,
                    slug: event.target.value,
                    slugCustomized: true,
                  }))
                }
                disabled={isStaticLockedMenu || !selectedManualSlugMode}
                placeholder="비워두면 저장 시 메뉴명 기준으로 자동 생성됩니다."
                className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px] disabled:bg-[#f8fafc] disabled:text-[#94a3b8]"
              />
              <p className="text-[11px] leading-5 text-[#6d7f95]">
                {isStaticLockedMenu
                  ? "정적 페이지 메뉴와 정적 GNB의 URL 경로는 코드에 등록된 라우트와 묶여 있어 어드민에서 변경할 수 없습니다."
                  : selectedManualSlugMode
                  ? selectedNode.isAuto
                    ? "저장 후 유튜브 동기화가 실행되어도 이 URL 경로를 유지합니다."
                    : "입력한 값이 공개 URL에 사용됩니다. 비워두면 저장 시 자동 생성 모드로 돌아갑니다."
                  : selectedNode.isAuto
                    ? "유튜브 원제목 기준으로 URL 경로가 동기화됩니다. 고정하려면 직접 입력으로 전환하세요."
                    : "저장 시 메뉴 이름 기준으로 URL 경로가 자동 생성됩니다."}
              </p>
              {!isStaticLockedMenu && selectedSlugPreview && (
                <div className="rounded-lg border border-[#dbe7f6] bg-white px-3 py-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-[#334155]">
                      {selectedSlugPreview.modeLabel}
                    </span>
                    <code className="max-w-full break-all rounded bg-[#f1f5f9] px-2 py-1 text-[12px] text-[#1f3f68]">
                      {selectedSlugPreview.value || "(생성 불가)"}
                    </code>
                  </div>
                  <p
                    className={`mt-2 text-[11px] leading-5 ${
                      selectedSlugPreview.isEmptyResult ? "text-[#b45309]" : "text-[#6d7f95]"
                    }`}
                  >
                    {selectedSlugPreview.isEmptyResult
                      ? selectedSlugPreview.isEmptyInput
                        ? "메뉴 이름이나 직접 입력값을 입력하면 URL 경로 미리보기가 표시됩니다."
                        : "영문, 숫자, 한글을 포함해야 URL 경로를 만들 수 있습니다."
                      : selectedManualSlugMode
                        ? "저장 시 이 변환 결과가 URL 경로로 사용됩니다."
                        : "저장 시 서버가 같은 규칙으로 URL 경로를 확정합니다."}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-[12px] font-semibold text-[#334155]">공개 주소</span>
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2">
                <code className="min-w-0 flex-1 break-all text-[13px] text-[#475569]">
                  {selectedPreviewPublicRoute}
                </code>
              </div>
              <p className="text-[11px] leading-5 text-[#6d7f95]">
                저장 전 자동 생성 경로는 저장 후 서버에서 확정됩니다.
              </p>
            </div>
          </div>

          {/* 연결 대상 */}
          <div className="space-y-4 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
            <div>
              <h3 className="text-[12px] font-bold text-[#132033]">연결 대상</h3>
              <p className="mt-1 text-[11px] text-[#6d7f95]">
                메뉴가 열어야 할 페이지, 게시판, 외부 링크 또는 영상 정보를 설정합니다.
              </p>
            </div>

            {selectedNode.type === "FOLDER" && selectedNode.parentId === null && (
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onAddChild("BOARD")}
                  className="rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-2 text-[12px] font-semibold text-[#2d5da8]"
                >
                  게시판 메뉴 추가
                </button>
                <button
                  type="button"
                  onClick={() => onAddChild("EXTERNAL_LINK")}
                  className="rounded-lg border border-[#d7e3f4] bg-[#f7fbff] px-3 py-2 text-[12px] font-semibold text-[#2d5da8]"
                >
                  외부 링크 추가
                </button>
              </div>
            )}

            {selectedNode.type === "YOUTUBE_PLAYLIST_GROUP" && (
              <div className="rounded-xl border border-[#eef2f7] bg-white p-4">
                <p className="text-[12px] font-semibold text-[#334155]">영상 그룹 안내</p>
                <p className="mt-2 text-[12px] leading-5 text-[#5d6f86]">
                  유튜브 재생목록은 수동으로 추가하지 않고, 영상 관리에서 동기화하고 그룹에
                  배정합니다.
                </p>
              </div>
            )}

            {selectedNode.type === "STATIC" && (
              <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4">
                <p className="text-[12px] font-semibold text-[#92400e]">
                  정적 페이지는 개발팀이 코드로 관리합니다
                </p>
                <p className="mt-2 text-[12px] leading-5 text-[#78350f]">
                  정적 페이지 메뉴는 실제 페이지 컴포넌트와 1:1로 묶여 있어 어드민에서{" "}
                  <b>추가·삭제·연결 페이지 변경·URL 경로 변경</b>을 할 수 없습니다. 어드민에서는{" "}
                  메뉴 이름, 노출 상태, 상위 메뉴 위치, 표시 순서만 조정할 수 있습니다.
                  새 정적 페이지가 필요하면 개발팀에 요청해 주세요.
                </p>
              </div>
            )}

            {selectedNode.type === "STATIC" && staticPages.length > 0 && (
              <label className="space-y-1.5">
                <span className="text-[12px] font-semibold text-[#334155]">연결 페이지</span>
                <select
                  value={selectedNode.staticPageKey ?? ""}
                  disabled
                  className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-[13px] text-[#475569]"
                >
                  {staticPages.map((page) => (
                    <option key={page.key} value={page.key}>
                      {page.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] leading-5 text-[#6d7f95]">
                  연결 페이지는 코드에 정의된 컴포넌트와 묶여 있어 변경할 수 없습니다.
                </p>
              </label>
            )}

            {selectedNode.type === "EXTERNAL_LINK" && (
              <>
                <label className="space-y-1.5">
                  <span className="text-[12px] font-semibold text-[#334155]">외부 URL</span>
                  <input
                    value={selectedNode.externalUrl ?? ""}
                    onChange={(event) =>
                      onUpdateNode((node) => ({ ...node, externalUrl: event.target.value }))
                    }
                    className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px]"
                  />
                </label>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#334155]">
                  <input
                    type="checkbox"
                    checked={selectedNode.openInNewTab}
                    onChange={(event) =>
                      onUpdateNode((node) => ({ ...node, openInNewTab: event.target.checked }))
                    }
                  />
                  새 탭에서 열기
                </label>
              </>
            )}

            {(selectedNode.playlistSourceTitle || selectedNode.thumbnailUrl) && (
              <div className="rounded-xl border border-[#eef2f7] bg-white p-4">
                <p className="text-[12px] font-semibold text-[#334155]">유튜브 원본 정보</p>
                <p className="mt-2 text-[13px] text-[#132033]">
                  원제목: {selectedNode.playlistSourceTitle ?? "-"}
                </p>
                <p className="mt-1 text-[12px] text-[#6d7f95]">
                  영상 수: {selectedNode.itemCount ?? 0}개
                </p>
                {selectedNode.labelCustomized && (
                  <p className="mt-2 text-[12px] font-semibold text-[#2d5da8]">
                    관리자가 표시 이름을 직접 수정한 메뉴입니다.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 배치와 순서 */}
          <div className="space-y-4 rounded-xl border border-[#eef2f7] bg-[#fbfdff] p-4">
            <div>
              <h3 className="text-[12px] font-bold text-[#132033]">배치와 순서</h3>
              <p className="mt-1 text-[11px] text-[#6d7f95]">
                상위 메뉴와 같은 단계 안의 노출 순서를 조정합니다.
              </p>
            </div>

            <label className="space-y-1.5">
              <span className="text-[12px] font-semibold text-[#334155]">상위 메뉴</span>
              <select
                value={selectedNode.parentId ?? ""}
                onChange={(event) => {
                  const rawValue = event.target.value;
                  const nextParentId = rawValue ? Number(rawValue) : null;
                  onMarkDirty(reparentNode(items, selectedNode.id, nextParentId));
                }}
                disabled={
                  selectedNode.type === "STATIC" ||
                  selectedNode.type === "FOLDER" ||
                  selectedNode.type === "YOUTUBE_PLAYLIST_GROUP"
                }
                className="w-full rounded-lg border border-[#d5deea] bg-white px-3 py-2 text-[13px] disabled:bg-[#f8fafc]"
              >
                {(selectedNode.type === "STATIC" ||
                  selectedNode.type === "FOLDER" ||
                  selectedNode.type === "YOUTUBE_PLAYLIST_GROUP") && (
                  <option value={selectedNode.parentId ?? ""}>
                    {selectedNode.type === "STATIC" ? "고정된 상위 메뉴" : "루트(GNB)"}
                  </option>
                )}
                {selectedNode.type === "YOUTUBE_PLAYLIST" && (
                  <option value="">미분류</option>
                )}
                {parentCandidates.map(({ node, depth }) => (
                  <option key={node.id} value={node.id}>
                    {"　".repeat(depth)}
                    {node.label}
                  </option>
                ))}
              </select>
              <p className="rounded-lg border border-[#e8edf5] bg-white px-3 py-2 text-[11px] leading-5 text-[#5d6f86]">
                {getParentRuleDescription(selectedNode)}
              </p>
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (canMoveUp) {
                    onMarkDirty(moveNodeWithinSiblings(items, selectedNode.id, -1));
                  }
                }}
                disabled={!canMoveUp}
                className="rounded-lg border border-[#d7e3f4] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155] disabled:cursor-not-allowed disabled:opacity-60"
              >
                위로 이동
              </button>
              <button
                type="button"
                onClick={() => {
                  if (canMoveDown) {
                    onMarkDirty(moveNodeWithinSiblings(items, selectedNode.id, 1));
                  }
                }}
                disabled={!canMoveDown}
                className="rounded-lg border border-[#d7e3f4] bg-white px-3 py-2 text-[12px] font-semibold text-[#334155] disabled:cursor-not-allowed disabled:opacity-60"
              >
                아래로 이동
              </button>
              <span className="text-[12px] font-semibold text-[#64748b]">
                {selectedOrderLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[#edf2f7] pt-4">
          <MenuDeleteSection
            selectedNode={selectedNode}
            confirmingSelectedDelete={confirmingSelectedDelete}
            descendantIds={descendantIds}
            onRequestDelete={onRequestDelete}
            onConfirmDelete={onConfirmDelete}
            onCancelDelete={onCancelDelete}
          />
        </div>
      </div>
    </section>
  );
}
