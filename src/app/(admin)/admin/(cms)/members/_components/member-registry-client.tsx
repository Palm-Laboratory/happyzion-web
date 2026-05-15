"use client";

import { MemberDrawer } from "./member-detail-drawer";
import type { MemberRegistryClientProps } from "./member-registry-props";
import { MemberRegistryList, MemberTable } from "./member-registry-list";
import { useMemberRegistryController } from "./use-member-registry-controller";

export default function MemberRegistryClient({
  initialMembers,
  initialTotal,
  initialHasNext,
  initialSelectedDetail,
  availableCells,
  loadError,
  initialFilters,
}: MemberRegistryClientProps) {
  const controller = useMemberRegistryController({
    initialMembers,
    initialSelectedDetail,
    initialFilters,
  });

  return (
    <div className="space-y-5">
      <MemberRegistryList
        controller={controller}
        initialMembers={initialMembers}
        initialTotal={initialTotal}
        availableCells={availableCells}
        loadError={loadError}
      />

      <div className={`relative ${controller.selectedMember ? "xl:pr-[752px]" : ""}`}>
        {controller.selectedMember ? (
          <button
            type="button"
            aria-label="상세 닫기"
            onClick={() => controller.updateSearch({ id: null, tab: null })}
            className="fixed inset-0 z-20 bg-[#08121f]/28 backdrop-blur-[1px]"
          />
        ) : null}

        <MemberTable
          controller={controller}
          initialTotal={initialTotal}
          initialHasNext={initialHasNext}
        />

        {controller.selectedMember ? (
          <MemberDrawer
            member={controller.selectedMember}
            detail={initialSelectedDetail}
            selectedTab={controller.selectedTab}
            onClose={() => controller.updateSearch({ id: null, tab: null })}
            onSelectTab={(tab) => controller.updateSearch({ id: controller.selectedMember?.id ?? null, tab })}
          />
        ) : null}
      </div>
    </div>
  );
}
