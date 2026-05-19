import MemberDetailPage from "@/app/(admin)/admin/(cms)/members/[id]/page";

void MemberDetailPage;
type Props = Parameters<typeof MemberDetailPage>[0];
const _p: Props = { params: Promise.resolve({ id: "1" }) };
void _p;
