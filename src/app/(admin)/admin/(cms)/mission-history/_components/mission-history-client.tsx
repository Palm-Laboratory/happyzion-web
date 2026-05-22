"use client";

import { MissionHistoryDetailPanel } from "./mission-history-detail-panel";
import { MissionYearList } from "./mission-year-list";
import type { ServerYear } from "./mission-history-types";
import { useMissionHistoryEditor } from "./use-mission-history-editor";

export default function MissionHistoryClient({ initialYears }: { initialYears: ServerYear[] }) {
  const editor = useMissionHistoryEditor(initialYears);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <MissionYearList
        items={editor.items}
        selectedId={editor.selectedId}
        newItemIds={editor.newItemIds}
        workingCopies={editor.workingCopies}
        isDirty={editor.isDirty}
        reorderedItemIds={editor.reorderedItemIds}
        canMoveYearUp={editor.canMoveYearUp}
        canMoveYearDown={editor.canMoveYearDown}
        draggingYearId={editor.draggingYearId}
        dropYearIndicatorIndex={editor.dropYearIndicatorIndex}
        listRef={editor.listRef}
        onAddYear={editor.handleAddYear}
        onSelectYear={editor.selectYear}
        onMoveYearUp={editor.handleMoveYearUp}
        onMoveYearDown={editor.handleMoveYearDown}
        onYearDragStart={editor.handleYearDragStart}
        onYearDragOver={editor.handleYearDragOver}
        onYearDrop={editor.handleYearDrop}
        onYearDragEnd={editor.resetYearDrag}
      />

      <MissionHistoryDetailPanel
        draft={editor.draft}
        isNewYear={editor.isNewYear}
        isDirty={editor.isDirty}
        reorderedCount={editor.reorderedCount}
        changeCount={editor.changeCount}
        saveDisabled={editor.saveDisabled}
        isSaving={editor.isSaving}
        isDeleting={editor.isDeleting}
        showCancelConfirm={editor.showCancelConfirm}
        showDeleteConfirm={editor.showDeleteConfirm}
        invalidFields={editor.invalidFields}
        invalidEntryFields={editor.invalidEntryFields}
        draggingEntryId={editor.draggingEntryId}
        dropIndicatorIndex={editor.dropIndicatorIndex}
        detailScrollRef={editor.detailScrollRef}
        onCancelNew={editor.handleCancelNew}
        onRequestCancel={editor.requestCancel}
        onDismissCancel={editor.dismissCancelConfirm}
        onConfirmCancel={editor.confirmCancel}
        onSave={editor.handleSave}
        onUpdateDraftField={editor.updateDraftField}
        onUpdateEntry={editor.updateEntry}
        onAddEntry={editor.addEntry}
        onRemoveEntry={editor.removeEntry}
        onEntryDragStart={editor.handleEntryDragStart}
        onEntryDragOver={editor.handleEntryDragOver}
        onEntryDrop={editor.handleEntryDrop}
        onEntryDragEnd={editor.resetEntryDrag}
        onRequestDelete={editor.requestDelete}
        onDismissDelete={editor.dismissDeleteConfirm}
        onDelete={editor.handleDelete}
      />
    </div>
  );
}
