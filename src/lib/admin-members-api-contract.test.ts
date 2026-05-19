import type {
  ChurchMemberDetail, ChurchMemberAuditPage, CreateChurchMemberPayload,
} from "@/lib/admin-members-types";

type GetMember = (id: number) => Promise<ChurchMemberDetail>;
type UpdateMember = (id: number, payload: CreateChurchMemberPayload) => Promise<ChurchMemberDetail>;
type DeleteMember = (id: number) => Promise<void>;
type GetAuditLogs = (id: number, page: number, size: number) => Promise<ChurchMemberAuditPage>;

type Mod = typeof import("@/lib/admin-members-api");
const _g: Mod["getChurchMember"] extends GetMember ? true : false = true;
const _u: Mod["updateChurchMember"] extends UpdateMember ? true : false = true;
const _d: Mod["deleteChurchMember"] extends DeleteMember ? true : false = true;
const _a: Mod["getChurchMemberAuditLogs"] extends GetAuditLogs ? true : false = true;
void _g; void _u; void _d; void _a;

type Friendly = (error: unknown, fallback: string, operationLabel?: "등록" | "수정" | "삭제") => string;
const _f: Mod["toFriendlyMemberMessage"] extends Friendly ? true : false = true;
void _f;
