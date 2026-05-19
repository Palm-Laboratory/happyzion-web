import MemberDetailClient from "@/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client";
import type { ChurchMemberAuditPage } from "@/lib/admin-members-types";
import type { MemberFormValues } from "@/app/(admin)/admin/(cms)/members/actions";

void MemberDetailClient;
type Props = Parameters<typeof MemberDetailClient>[0];

const values: MemberFormValues = {
  name: "", sex: "", birthDate: "", birthCalendar: "SOLAR", phone: "",
  email: "", address: "", addressDetail: "",
  status: "", office: "", registeredAt: "", officeAppointedAt: "",
  faithStage: "", job: "", cellLabel: "", memo: "",
  confessDate: "", learningDate: "", baptismDate: "",
  baptismPlace: "", baptismOfficiant: "", confirmationDate: "",
  previousChurch: "", transferredInAt: "",
};

const _p: Props = {
  memberId: 1,
  memberName: "홍길동",
  isRemoved: false,
  initialValues: values,
  initialAuditPage: { items: [], hasNext: false } as ChurchMemberAuditPage,
};
void _p;
