import type { AdminMemberDetailResult } from "@/lib/admin-members-api";
import type { Member } from "./types";

export interface MemberRegistryClientProps {
  initialMembers: Member[];
  initialTotal: number;
  initialHasNext: boolean;
  initialSelectedDetail: AdminMemberDetailResult | null;
  availableCells: Array<{ id: string; label: string }>;
  loadError?: string | null;
  initialFilters: {
    query: string;
    status: string;
    stage: string;
    cellId: string;
  };
}
