import PiiMaskedInput from "@/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input";

void PiiMaskedInput;

type Props = Parameters<typeof PiiMaskedInput>[0];

const _props: Props = {
  id: "name",
  name: "name",
  initialValue: "홍길동",
  maskFn: (s: string) => s,
};
void _props;

const _full: Props = {
  id: "phone",
  name: "phone",
  initialValue: "010-0000-0000",
  hasError: true,
  maskFn: (s: string) => s,
  inputMode: "tel",
  placeholder: "010-0000-0000",
};
void _full;
