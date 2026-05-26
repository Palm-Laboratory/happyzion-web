"use client";

import type { AdminMenuTreeNode, AdminStaticPage } from "@/lib/admin-menu-api";
import { MenuAddModal } from "./menu-add-modal";
import { MenuDetailPanel } from "./menu-detail-panel";
import { MenuTreePanel } from "./menu-tree-panel";
import { useMenuDrag } from "./use-menu-drag";
import { useMenuTree } from "./use-menu-tree";

export default function MenuManagementClient({
  initialItems,
  staticPages,
}: {
  initialItems: AdminMenuTreeNode[];
  staticPages: AdminStaticPage[];
}) {
  const tree = useMenuTree(initialItems, staticPages);
  const drag = useMenuDrag({
    itemsRef: tree.itemsRef,
    markDirty: tree.markDirty,
    setSelectedId: tree.setSelectedId,
  });

  return (
    <div className="space-y-5">
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <MenuTreePanel
          flatItems={tree.flatItems}
          items={tree.items}
          selectedId={tree.selectedId}
          expandedRootIds={tree.expandedRootIds}
          treeFocusRequest={tree.treeFocusRequest}
          changedMenuIds={tree.changedMenuIds}
          draggingMenuId={drag.draggingMenuId}
          dropIndicator={drag.dropIndicator}
          treeScrollRef={drag.treeScrollRef}
          onSelect={tree.selectNode}
          onToggleRootExpanded={tree.toggleRootExpanded}
          onAddMenu={() => tree.setShowAddModal(true)}
          onDragStart={drag.handleMenuDragStart}
          onDragOver={drag.handleMenuDragOver}
          onDrop={drag.handleMenuDrop}
          onDragEnd={drag.resetDragState}
        />

        <section className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
          <div className="space-y-4 px-5 py-5">
            {!tree.selectedNode ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf2f7] pb-4">
                  <h2 className="text-[14px] font-bold text-[#132033]">상세 편집</h2>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={tree.handleCancelChanges}
                      disabled={tree.changedMenuCount === 0 || tree.saving}
                      className="rounded-lg border border-[#d6dfeb] px-4 py-2 text-[12px] font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      변경사항 취소
                    </button>
                    <button
                      type="button"
                      onClick={tree.handleSave}
                      disabled={tree.changedMenuCount === 0 || tree.saving}
                      className="rounded-lg bg-[#3f74c7] px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-60"
                    >
                      {tree.saving
                        ? "저장 중..."
                        : `변경사항 저장${tree.changedMenuCount > 0 ? ` (${tree.changedMenuCount})` : ""}`}
                    </button>
                  </div>
                </div>
                <p className="text-[13px] text-[#6d7f95]">
                  왼쪽에서 편집할 메뉴를 선택해 주세요.
                </p>
              </>
            ) : (
              <MenuDetailPanel
                selectedNode={tree.selectedNode}
                items={tree.items}
                changedMenuCount={tree.changedMenuCount}
                saving={tree.saving}
                descendantIds={tree.descendantIds}
                hiddenStatusAffectsDescendants={tree.hiddenStatusAffectsDescendants}
                isAncestorRootHidden={tree.isAncestorRootHidden}
                confirmingSelectedDelete={tree.confirmingSelectedDelete}
                selectedManualSlugMode={tree.selectedManualSlugMode}
                selectedSlugPreview={tree.selectedSlugPreview}
                selectedPreviewPublicRoute={tree.selectedPreviewPublicRoute}
                parentCandidates={tree.parentCandidates}
                canMoveUp={tree.canMoveUp}
                canMoveDown={tree.canMoveDown}
                selectedOrderLabel={tree.selectedOrderLabel}
                staticPages={staticPages}
                onSave={tree.handleSave}
                onCancelChanges={tree.handleCancelChanges}
                onUpdateNode={tree.updateSelectedNode}
                onMarkDirty={tree.markDirty}
                onReparentNode={tree.reparentSelectedNode}
                onCancelDelete={() => tree.setDeleteConfirmId(null)}
                onConfirmDelete={tree.handleConfirmDelete}
                onRequestDelete={tree.handleRequestDelete}
                onSwitchSlugMode={tree.switchSelectedSlugMode}
                onAddChild={tree.handleAddChild}
              />
            )}
          </div>
        </section>
      </div>

      {tree.showAddModal && (
        <MenuAddModal
          onAddRoot={tree.handleAddRoot}
          onClose={() => tree.setShowAddModal(false)}
        />
      )}
    </div>
  );
}
