"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { FaithStage, MemberStatus } from "./types";
import type { MemberRegistryClientProps } from "./member-registry-props";
import { compareMembers, type DrawerTab, type SortOption } from "./member-registry-utils";

export function useMemberRegistryController({
  initialMembers,
  initialSelectedDetail,
  initialFilters,
}: Pick<MemberRegistryClientProps, "initialMembers" | "initialSelectedDetail" | "initialFilters">) {
  const router = useRouter();
  const pathname = usePathname() ?? "/admin/members";
  const searchParams = useSearchParams();
  const paramsString = searchParams?.toString() ?? "";

  const [query, setQuery] = useState(initialFilters.query);
  const [selectedCell, setSelectedCell] = useState<string>(initialFilters.cellId);
  const [selectedStatus, setSelectedStatus] = useState<MemberStatus | "ALL">(initialFilters.status as MemberStatus | "ALL");
  const [selectedStage, setSelectedStage] = useState<FaithStage | "ALL">(initialFilters.stage as FaithStage | "ALL");
  const [sort, setSort] = useState<SortOption>("registered-desc");

  const selectedMemberId = searchParams?.get("id") ?? null;
  const selectedTab = (searchParams?.get("tab") as DrawerTab | null) ?? "basic";

  const members = useMemo(() => {
    return [...initialMembers].sort((a, b) => compareMembers(a, b, sort));
  }, [initialMembers, sort]);

  const selectedMember = initialSelectedDetail?.member ?? members.find((member) => member.id === selectedMemberId) ?? null;

  const updateSearch = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(paramsString);

    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const href = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(href, { scroll: false });
  };

  const applyFilters = () => {
    updateSearch({
      query: query.trim() || null,
      cellId: selectedCell !== "ALL" ? selectedCell : null,
      status: selectedStatus !== "ALL" ? selectedStatus : null,
      stage: selectedStage !== "ALL" ? selectedStage : null,
      id: null,
    });
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedCell("ALL");
    setSelectedStatus("ALL");
    setSelectedStage("ALL");
    setSort("registered-desc");
    updateSearch({ query: null, cellId: null, status: null, stage: null, id: null, tab: null });
  };

  return {
    query,
    selectedCell,
    selectedStatus,
    selectedStage,
    sort,
    selectedTab,
    selectedMember,
    members,
    setQuery,
    setSelectedCell,
    setSelectedStatus,
    setSelectedStage,
    setSort,
    updateSearch,
    applyFilters,
    resetFilters,
  };
}

export type MemberRegistryController = ReturnType<typeof useMemberRegistryController>;
