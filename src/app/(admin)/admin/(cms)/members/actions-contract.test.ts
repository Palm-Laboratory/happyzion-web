import type {
  MemberFormValues, MemberFormState,
} from "@/app/(admin)/admin/(cms)/members/actions";
import type {
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";

const _v: MemberFormValues = {
  name: "", sex: "", birthDate: "", birthCalendar: "SOLAR", phone: "",
  email: "", address: "", addressDetail: "",
  status: "", office: "", registeredAt: "", officeAppointedAt: "",
  faithStage: "", job: "", cellLabel: "", memo: "",
  confessDate: "", learningDate: "", baptismDate: "",
  baptismPlace: "", baptismOfficiant: "", confirmationDate: "",
  previousChurch: "", transferredInAt: "",
};
void _v;

const _e: NonNullable<MemberFormState["errors"]> = {
  name: "", sex: "", birthDate: "", birthCalendar: "", phone: "",
  address: "", status: "", office: "", registeredAt: "",
  officeAppointedAt: "", confessDate: "", learningDate: "",
  baptismDate: "", confirmationDate: "", transferredInAt: "",
};
void _e;

type Mod = typeof import("@/app/(admin)/admin/(cms)/members/actions");
type UpdateAction = (id: number, prev: MemberFormState, formData: FormData) => Promise<MemberFormState>;
type DeleteAction = (id: number) => Promise<{ ok: true } | { ok: false; message: string }>;
type LoadMoreAuditAction = (id: number, page: number) => Promise<ChurchMemberAuditPage>;

const _u: Mod["updateChurchMemberAction"] extends UpdateAction ? true : false = true;
const _d: Mod["deleteChurchMemberAction"] extends DeleteAction ? true : false = true;
const _l: Mod["loadMoreAuditLogsAction"] extends LoadMoreAuditAction ? true : false = true;
void _u; void _d; void _l;
