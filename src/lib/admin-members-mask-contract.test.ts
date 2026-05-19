import { maskName, maskPhone } from "@/lib/admin-members-mask";

const _n: string = maskName("홍길동");
const _p: string = maskPhone("010-1234-5678");
void _n; void _p;

const _f1: (s: string) => string = maskName;
const _f2: (s: string) => string = maskPhone;
void _f1; void _f2;
