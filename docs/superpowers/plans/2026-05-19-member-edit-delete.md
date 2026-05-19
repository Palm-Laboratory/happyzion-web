# 교인 수정(상세) 및 삭제 기능 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/admin/members/[id]` 단일 페이지에 교인 상세 조회·수정·소프트 삭제·감사 로그 뷰어·REMOVED 복구 플로우를 추가한다.

**Architecture:** 기존 `MemberForm` 컴포넌트를 `mode: "create" | "edit"` + `initialValues` props로 확장해 생성·수정 모두에서 재사용. 백엔드는 변경 없이 기존 PUT/DELETE/GET/audit-logs 엔드포인트를 활용. 서버 컴포넌트가 detail + audit 페이지 0을 병렬 fetch, 클라이언트 컴포넌트가 폼·감사 로그·삭제 모달을 렌더. 수정 성공 시 `router.refresh()`로 server component를 다시 실행해 UI 일관성 유지.

**Tech Stack:** Next.js 15 App Router (server components + server actions), React 19, TypeScript, Tailwind CSS, `useActionState`, `<dialog>` element, `adminApiFetch` (자체 fetch wrapper).

**검증 방식:** 이 코드베이스는 jest/vitest 없이 TypeScript "contract test" 파일(`*-contract.test.ts`)로 컴파일 타임 시그니처를 검증한다. 각 task는 contract test 작성 → `npm run typecheck` 실패 확인 → 구현 → 재실행으로 통과 확인 → `npm run lint` → 커밋 흐름을 따른다.

**스펙 문서:** `docs/superpowers/specs/2026-05-19-member-edit-delete-design.md`

---

## File Structure

```
web/src/
├── app/(admin)/admin/(cms)/members/
│   ├── page.tsx                                    [수정 — 행 클릭 가능 처리는 client 쪽]
│   ├── actions.ts                                  [확장 — update/delete/loadMoreAuditLogs + mode]
│   ├── _components/
│   │   ├── member-list-client.tsx                  [수정 — <tr>에 onClick/aria]
│   │   ├── member-form.tsx                         [확장 — initialValues/mode/PII/birthCalendar/cellLabel]
│   │   └── member-enums.ts                         [확장 — isEditableStatus, isBirthCalendar]
│   └── [id]/                                       [신규 디렉터리]
│       ├── page.tsx                                [신규 — server: id 검증 + 병렬 fetch]
│       └── _components/
│           ├── member-detail-client.tsx
│           ├── pii-masked-input.tsx
│           ├── audit-log-list.tsx
│           ├── delete-member-button.tsx
│           └── removed-recovery-banner.tsx
└── lib/
    ├── admin-members-types.ts                      [확장 — Detail/Audit 타입]
    ├── admin-members-api.ts                        [확장 — get/update/delete/auditLogs]
    └── admin-members-mask.ts                       [신규 — maskName/maskPhone 추출]
```

각 파일의 책임:
- **mask.ts**: PII 마스킹 순수 함수 (member-list-client에서 이동, PiiMaskedInput에서도 사용)
- **types.ts**: 백엔드 응답 1:1 매핑 타입 + EDITABLE_STATUSES 상수
- **api.ts**: server-only API 클라이언트 + 친절한 에러 메시지 변환 (operationLabel 지원)
- **actions.ts**: server actions + 검증/페이로드 빌더 (mode 인자)
- **pii-masked-input.tsx**: edit 모드 한정 마스킹 + 보기 토글 (hidden mirror input으로 submit 데이터 보존)
- **member-form.tsx**: create/edit 공용 폼. mode/initialValues에 따라 분기. 수정 성공 시 router.refresh
- **removed-recovery-banner.tsx**: REMOVED 안내 노란 배너
- **audit-log-list.tsx**: 메타데이터만 렌더(diff 내용 표시 안 함) + 더 보기
- **delete-member-button.tsx**: 빨강 버튼 + 모달, 결과 객체 패턴, 성공 시 router.replace
- **member-detail-client.tsx**: 상단 배너 + 폼 + 감사 로그 + 삭제 버튼 컨테이너
- **[id]/page.tsx**: server component, id 파싱·세션·병렬 fetch·notFound

---

## Task 1: 타입 확장 (admin-members-types.ts)

**Files:**
- Modify: `src/lib/admin-members-types.ts`
- Test: `src/lib/admin-members-types-contract.test.ts` (신규)

- [ ] **Step 1: contract test 작성**

Create `src/lib/admin-members-types-contract.test.ts`:

```ts
import type {
  ChurchMemberDetail,
  ChurchMemberFaithDetail,
  ChurchMemberAuditEntry,
  ChurchMemberAuditPage,
  AuditAction,
} from "@/lib/admin-members-types";
import { EDITABLE_STATUSES } from "@/lib/admin-members-types";

// AuditAction 리터럴 검증
const _a1: AuditAction = "CREATE";
const _a2: AuditAction = "UPDATE";
const _a3: AuditAction = "DELETE";
void _a1; void _a2; void _a3;

// ChurchMemberFaithDetail 모양
const _faith: ChurchMemberFaithDetail = {
  confessDate: null, learningDate: null, baptismDate: null,
  baptismPlace: null, baptismOfficiant: null, confirmationDate: null,
  previousChurch: null, transferredInAt: null,
};
void _faith;

// ChurchMemberDetail 모양 (faith null 허용)
const _detail: ChurchMemberDetail = {
  id: 1, name: "홍길동", phone: "010-0000-0000", email: null,
  birthDate: "1990-01-01", birthCalendar: "SOLAR", sex: "M",
  address: "서울", addressDetail: null, job: null,
  memo: null, photoAssetId: null, cellLabel: null,
  status: "ACTIVE", faithStage: null,
  office: "LAY", officeAppointedAt: null,
  registeredAt: "2026-01-01",
  faith: null,
  createdAt: "2026-01-01T00:00:00+09:00", updatedAt: "2026-01-01T00:00:00+09:00",
};
void _detail;

// AuditEntry / AuditPage
const _entry: ChurchMemberAuditEntry = {
  id: 1, action: "UPDATE", actorId: 12,
  diffJson: null, createdAt: "2026-01-01T00:00:00+09:00",
};
const _page: ChurchMemberAuditPage = { items: [_entry], hasNext: false };
void _entry; void _page;

// EDITABLE_STATUSES는 REMOVED를 포함하지 않아야 함
const _editable: readonly string[] = EDITABLE_STATUSES;
const _hasRemoved = _editable.includes("REMOVED");
void _hasRemoved;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (`ChurchMemberDetail`, `EDITABLE_STATUSES` 등 모듈에 없음)

- [ ] **Step 3: 타입 구현**

Edit `src/lib/admin-members-types.ts` — 파일 맨 아래에 다음 추가:

```ts
export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export interface ChurchMemberFaithDetail {
  confessDate: string | null;
  learningDate: string | null;
  baptismDate: string | null;
  baptismPlace: string | null;
  baptismOfficiant: string | null;
  confirmationDate: string | null;
  previousChurch: string | null;
  transferredInAt: string | null;
}

export interface ChurchMemberDetail {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  birthDate: string;
  birthCalendar: BirthCalendar;
  sex: Sex;
  address: string;
  addressDetail: string | null;
  job: string | null;
  memo: string | null;
  photoAssetId: number | null;
  cellLabel: string | null;
  status: ChurchMemberStatus;
  faithStage: FaithStage | null;
  office: ChurchMemberOffice;
  officeAppointedAt: string | null;
  registeredAt: string;
  faith: ChurchMemberFaithDetail | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChurchMemberAuditEntry {
  id: number;
  action: AuditAction;
  actorId: number;
  diffJson: string | null;
  createdAt: string;
}

export interface ChurchMemberAuditPage {
  items: ChurchMemberAuditEntry[];
  hasNext: boolean;
}

export const EDITABLE_STATUSES: ChurchMemberStatus[] = [
  "ACTIVE", "NEW", "RESTING", "LONG_ABSENT", "TRANSFERRED_OUT", "DECEASED",
];
```

- [ ] **Step 4: 타입체크 → 통과 확인**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 5: 린트**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add src/lib/admin-members-types.ts src/lib/admin-members-types-contract.test.ts
git commit -m "feat(members): 상세/감사로그 타입 및 EDITABLE_STATUSES 추가"
```

---

## Task 2: 마스킹 헬퍼 추출 (admin-members-mask.ts)

**Files:**
- Create: `src/lib/admin-members-mask.ts`
- Modify: `src/app/(admin)/admin/(cms)/members/_components/member-list-client.tsx` (mask 함수 import로 교체)
- Test: `src/lib/admin-members-mask-contract.test.ts` (신규)

- [ ] **Step 1: contract test 작성**

Create `src/lib/admin-members-mask-contract.test.ts`:

```ts
import { maskName, maskPhone } from "@/lib/admin-members-mask";

const _n: string = maskName("홍길동");
const _p: string = maskPhone("010-1234-5678");
void _n; void _p;

// 시그니처는 string -> string
const _f1: (s: string) => string = maskName;
const _f2: (s: string) => string = maskPhone;
void _f1; void _f2;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (`@/lib/admin-members-mask` 모듈 없음)

- [ ] **Step 3: 마스킹 헬퍼 작성**

Create `src/lib/admin-members-mask.ts`:

```ts
export function maskName(name: string): string {
  const chars = Array.from(name.trim());
  if (chars.length === 0) return "";
  if (chars.length === 1) return "*";
  if (chars.length === 2) return `${chars[0]}*`;
  return `${chars[0]}${"*".repeat(chars.length - 2)}${chars[chars.length - 1]}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return "***";
  return `${digits.slice(0, 3)}-${"*".repeat(Math.max(0, digits.length - 7))}-${digits.slice(-4)}`;
}
```

- [ ] **Step 4: member-list-client.tsx에서 import로 교체**

Edit `src/app/(admin)/admin/(cms)/members/_components/member-list-client.tsx`:
- 파일 상단 import에 `import { maskName, maskPhone } from "@/lib/admin-members-mask";` 추가
- 파일 내 로컬 `function maskName(...) {...}` 및 `function maskPhone(...) {...}` 두 함수 정의 제거 (12-29줄 부근)

- [ ] **Step 5: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add src/lib/admin-members-mask.ts src/lib/admin-members-mask-contract.test.ts src/app/\(admin\)/admin/\(cms\)/members/_components/member-list-client.tsx
git commit -m "refactor(members): PII 마스킹 헬퍼를 lib로 추출"
```

---

## Task 3: API 클라이언트 확장 (admin-members-api.ts)

**Files:**
- Modify: `src/lib/admin-members-api.ts`
- Test: `src/lib/admin-members-api-contract.test.ts` (신규)

- [ ] **Step 1: contract test 작성**

Create `src/lib/admin-members-api-contract.test.ts`:

```ts
import type {
  ChurchMemberDetail, ChurchMemberAuditPage, CreateChurchMemberPayload,
} from "@/lib/admin-members-types";

// 함수 시그니처 contract (실제 호출은 server-only라 import만 type-level로 검증)
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

// toFriendlyMemberMessage 확장 시그니처
type Friendly = (error: unknown, fallback: string, operationLabel?: "등록" | "수정" | "삭제") => string;
const _f: Mod["toFriendlyMemberMessage"] extends Friendly ? true : false = true;
void _f;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (새 export 4개와 toFriendlyMemberMessage 확장 시그니처 없음)

- [ ] **Step 3: API 함수 추가**

Edit `src/lib/admin-members-api.ts`:

기존 import에 추가:
```ts
import type {
  ChurchMemberListQuery,
  ChurchMemberPageResponse,
  CreateChurchMemberPayload,
  ChurchMemberDetail,
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";
```

`createChurchMember` 아래에 다음 함수 4개 추가:
```ts
export async function getChurchMember(id: number): Promise<ChurchMemberDetail> {
  const res = await adminApiFetch(`/api/v1/admin/members/${id}`);
  return res.json() as Promise<ChurchMemberDetail>;
}

export async function updateChurchMember(
  id: number,
  payload: CreateChurchMemberPayload,
): Promise<ChurchMemberDetail> {
  const res = await adminApiFetch(`/api/v1/admin/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<ChurchMemberDetail>;
}

export async function deleteChurchMember(id: number): Promise<void> {
  await adminApiFetch(`/api/v1/admin/members/${id}`, { method: "DELETE" });
}

export async function getChurchMemberAuditLogs(
  id: number,
  page: number,
  size: number,
): Promise<ChurchMemberAuditPage> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  const res = await adminApiFetch(`/api/v1/admin/members/${id}/audit-logs?${params}`);
  return res.json() as Promise<ChurchMemberAuditPage>;
}
```

`toFriendlyMemberMessage` 함수 시그니처 변경 (operationLabel 매개변수 추가):
```ts
export function toFriendlyMemberMessage(
  error: unknown,
  fallback: string,
  operationLabel: "등록" | "수정" | "삭제" = "등록",
): string {
  if (!(error instanceof AdminApiError)) {
    if (error instanceof Error && /fetch failed|ECONNREFUSED|Failed to fetch/i.test(error.message)) {
      return "백엔드 API 서버에 연결할 수 없습니다. API 서버 상태를 확인한 뒤 다시 시도해 주세요.";
    }
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return "권한이 없거나 로그인 정보가 만료되었습니다. 다시 로그인한 뒤 시도해 주세요.";
  }

  if (error.status >= 500) {
    return `백엔드 서버 오류로 교인을 ${operationLabel}하지 못했습니다. API 서버 로그를 확인해 주세요.`;
  }

  const message = error.message.trim();
  if (message.includes("이미 사용 중인") || message.includes("중복")) {
    return "이미 등록된 연락처이거나 중복된 정보가 있습니다.";
  }

  return message || fallback;
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/lib/admin-members-api.ts src/lib/admin-members-api-contract.test.ts
git commit -m "feat(members): 상세/수정/삭제/감사로그 API 클라이언트 추가"
```

---

## Task 4: enum guards 확장 (member-enums.ts)

**Files:**
- Modify: `src/app/(admin)/admin/(cms)/members/_components/member-enums.ts`
- Test: `src/app/(admin)/admin/(cms)/members/_components/member-enums-contract.test.ts` (신규)

- [ ] **Step 1: contract test 작성**

Create `src/app/(admin)/admin/(cms)/members/_components/member-enums-contract.test.ts`:

```ts
import {
  isEditableStatus, isBirthCalendar,
} from "@/app/(admin)/admin/(cms)/members/_components/member-enums";

// 시그니처
const _e: (v: string) => boolean = isEditableStatus;
const _b: (v: string) => boolean = isBirthCalendar;
void _e; void _b;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (`isEditableStatus`, `isBirthCalendar` export 없음)

- [ ] **Step 3: 가드 함수 추가**

Edit `src/app/(admin)/admin/(cms)/members/_components/member-enums.ts`:

기존 import 줄에 EDITABLE_STATUSES, BirthCalendar 추가:
```ts
import type { ChurchMemberStatus, ChurchMemberOffice, FaithStage, Sex, BirthCalendar } from "@/lib/admin-members-types";
import { CREATABLE_STATUSES, EDITABLE_STATUSES } from "@/lib/admin-members-types";
```

파일 끝(`isSex` 함수 다음)에 다음 추가:
```ts
export function isEditableStatus(v: string): v is Exclude<ChurchMemberStatus, "REMOVED"> {
  return (EDITABLE_STATUSES as string[]).includes(v);
}

const ALL_BIRTH_CALENDARS: BirthCalendar[] = ["SOLAR", "LUNAR"];
export function isBirthCalendar(v: string): v is BirthCalendar {
  return (ALL_BIRTH_CALENDARS as string[]).includes(v);
}

export const BIRTH_CALENDAR_LABELS: Record<BirthCalendar, string> = {
  SOLAR: "양력",
  LUNAR: "음력",
};
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/app/\(admin\)/admin/\(cms\)/members/_components/member-enums.ts src/app/\(admin\)/admin/\(cms\)/members/_components/member-enums-contract.test.ts
git commit -m "feat(members): isEditableStatus, isBirthCalendar 가드 추가"
```

---

## Task 5: actions.ts 리팩토링 + 신규 액션 추가

**Files:**
- Modify: `src/app/(admin)/admin/(cms)/members/actions.ts`
- Test: `src/app/(admin)/admin/(cms)/members/actions-contract.test.ts` (신규)

이 task는 분량이 크므로 5-1 ~ 5-6으로 나눠 진행한다.

### 5-1. MemberFormValues / MemberFormState 확장

- [ ] **Step 1: contract test 작성**

Create `src/app/(admin)/admin/(cms)/members/actions-contract.test.ts`:

```ts
import type {
  MemberFormValues, MemberFormState,
} from "@/app/(admin)/admin/(cms)/members/actions";
import type {
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";

// MemberFormValues에 birthCalendar, cellLabel 필드 존재
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

// errors 타입에 birthCalendar, optional 날짜 필드 키 존재
const _e: NonNullable<MemberFormState["errors"]> = {
  name: "", sex: "", birthDate: "", birthCalendar: "", phone: "",
  address: "", status: "", office: "", registeredAt: "",
  officeAppointedAt: "", confessDate: "", learningDate: "",
  baptismDate: "", confirmationDate: "", transferredInAt: "",
};
void _e;

// 신규 액션 시그니처
type Mod = typeof import("@/app/(admin)/admin/(cms)/members/actions");
type UpdateAction = (id: number, prev: MemberFormState, formData: FormData) => Promise<MemberFormState>;
type DeleteAction = (id: number) => Promise<{ ok: true } | { ok: false; message: string }>;
type LoadMoreAuditAction = (id: number, page: number) => Promise<ChurchMemberAuditPage>;

const _u: Mod["updateChurchMemberAction"] extends UpdateAction ? true : false = true;
const _d: Mod["deleteChurchMemberAction"] extends DeleteAction ? true : false = true;
const _l: Mod["loadMoreAuditLogsAction"] extends LoadMoreAuditAction ? true : false = true;
void _u; void _d; void _l;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (`birthCalendar`/`cellLabel` 등 누락)

### 5-2. MemberFormValues 인터페이스 갱신

- [ ] **Step 3: 인터페이스 확장 + readFormValues 확장**

Edit `src/app/(admin)/admin/(cms)/members/actions.ts`:

`MemberFormValues` 인터페이스에 두 줄 추가 (`birthDate` 다음 줄과 `job` 다음 줄):

```ts
export interface MemberFormValues {
  name: string;
  sex: string;
  birthDate: string;
  birthCalendar: string;   // 신규
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  status: string;
  office: string;
  registeredAt: string;
  officeAppointedAt: string;
  faithStage: string;
  job: string;
  cellLabel: string;       // 신규
  memo: string;
  confessDate: string;
  learningDate: string;
  baptismDate: string;
  baptismPlace: string;
  baptismOfficiant: string;
  confirmationDate: string;
  previousChurch: string;
  transferredInAt: string;
}
```

`MemberFormState.errors`의 키 union 확장:
```ts
export interface MemberFormState {
  errors?: Partial<Record<
    | "name" | "sex" | "birthDate" | "birthCalendar" | "phone"
    | "address" | "status" | "office" | "registeredAt"
    | "officeAppointedAt" | "confessDate" | "learningDate"
    | "baptismDate" | "confirmationDate" | "transferredInAt",
    string
  >>;
  values?: MemberFormValues;
  formKey?: number;
  message?: string;
  success?: boolean;
  messageKey?: number;
}
```

`readFormValues` 함수에 두 필드 추가:
```ts
function readFormValues(formData: FormData): MemberFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    sex: String(formData.get("sex") ?? "").trim(),
    birthDate: normalizeDateInput(formData.get("birthDate")),
    birthCalendar: String(formData.get("birthCalendar") ?? "").trim(),  // 신규
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    addressDetail: String(formData.get("addressDetail") ?? "").trim(),
    status: String(formData.get("status") ?? "").trim(),
    office: String(formData.get("office") ?? "").trim(),
    registeredAt: normalizeDateInput(formData.get("registeredAt")),
    officeAppointedAt: normalizeDateInput(formData.get("officeAppointedAt")),
    faithStage: String(formData.get("faithStage") ?? "").trim(),
    job: String(formData.get("job") ?? "").trim(),
    cellLabel: String(formData.get("cellLabel") ?? "").trim(),  // 신규
    memo: String(formData.get("memo") ?? "").trim(),
    confessDate: normalizeDateInput(formData.get("confessDate")),
    learningDate: normalizeDateInput(formData.get("learningDate")),
    baptismDate: normalizeDateInput(formData.get("baptismDate")),
    baptismPlace: String(formData.get("baptismPlace") ?? "").trim(),
    baptismOfficiant: String(formData.get("baptismOfficiant") ?? "").trim(),
    confirmationDate: normalizeDateInput(formData.get("confirmationDate")),
    previousChurch: String(formData.get("previousChurch") ?? "").trim(),
    transferredInAt: normalizeDateInput(formData.get("transferredInAt")),
  };
}
```

### 5-3. validateAndBuildPayload 추출 (mode 인자)

- [ ] **Step 4: 공유 검증/빌더 함수 추출**

Edit `src/app/(admin)/admin/(cms)/members/actions.ts` — 새 import 추가:
```ts
import {
  isCreatableStatus, isEditableStatus, isOffice, isFaithStage, isSex, isBirthCalendar,
} from "./_components/member-enums";
```

기존 `createChurchMemberAction` **위에** 새 함수 `validateAndBuildPayload` 추가:

```ts
function validateAndBuildPayload(
  values: MemberFormValues,
  mode: "create" | "edit",
): { errors: NonNullable<MemberFormState["errors"]> } | { payload: CreateChurchMemberPayload } {
  const errors: NonNullable<MemberFormState["errors"]> = {};

  if (!values.name) {
    errors.name = "이름을 입력해 주세요.";
  }

  if (!values.sex || !isSex(values.sex)) {
    errors.sex = "성별을 선택해 주세요.";
  }

  if (!values.birthDate) {
    errors.birthDate = "생년월일을 입력해 주세요.";
  } else if (!isDateInput(values.birthDate)) {
    errors.birthDate = "날짜 형식이 올바르지 않습니다.";
  }

  if (!values.birthCalendar || !isBirthCalendar(values.birthCalendar)) {
    errors.birthCalendar = "양력 또는 음력을 선택해 주세요.";
  }

  if (!values.phone) {
    errors.phone = "연락처를 입력해 주세요.";
  } else if (/[^0-9-]/.test(values.phone)) {
    errors.phone = "연락처는 숫자와 - 만 입력 가능합니다.";
  } else if (values.phone.replace(/\D/g, "").length < 9) {
    errors.phone = "연락처는 숫자 9자리 이상으로 입력해 주세요.";
  }

  if (!values.address) {
    errors.address = "주소를 입력해 주세요.";
  }

  // mode에 따라 허용 상태 분기
  const statusOk = mode === "create"
    ? isCreatableStatus(values.status)
    : isEditableStatus(values.status);
  if (!values.status || !statusOk) {
    errors.status = "올바른 상태를 선택해 주세요.";
  }

  if (!values.office || !isOffice(values.office)) {
    errors.office = "직분을 선택해 주세요.";
  }

  if (!values.registeredAt) {
    errors.registeredAt = "등록일을 입력해 주세요.";
  } else if (!isDateInput(values.registeredAt)) {
    errors.registeredAt = "날짜 형식이 올바르지 않습니다.";
  }

  // optional 날짜 필드 — 값이 있을 때만 형식 검증, 필드별 에러
  const optionalDates: Array<[keyof NonNullable<MemberFormState["errors"]>, string]> = [
    ["officeAppointedAt", values.officeAppointedAt],
    ["confessDate", values.confessDate],
    ["learningDate", values.learningDate],
    ["baptismDate", values.baptismDate],
    ["confirmationDate", values.confirmationDate],
    ["transferredInAt", values.transferredInAt],
  ];
  for (const [key, val] of optionalDates) {
    if (val && !isDateInput(val)) {
      errors[key] = "날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)";
    }
  }

  if (Object.keys(errors).length > 0) return { errors };

  // 페이로드 빌드
  const email = values.email || null;
  const addressDetail = values.addressDetail || null;
  const job = values.job || null;
  const cellLabel = values.cellLabel || null;
  const officeAppointedAt = values.officeAppointedAt || null;
  const memo = values.memo || null;

  const faithStage: FaithStage | null =
    values.faithStage && isFaithStage(values.faithStage) ? values.faithStage : null;

  const confessDate = values.confessDate || null;
  const learningDate = values.learningDate || null;
  const baptismDate = values.baptismDate || null;
  const baptismPlace = values.baptismPlace || null;
  const baptismOfficiant = values.baptismOfficiant || null;
  const confirmationDate = values.confirmationDate || null;
  const previousChurch = values.previousChurch || null;
  const transferredInAt = values.transferredInAt || null;

  const allFaithNull =
    confessDate === null &&
    learningDate === null &&
    baptismDate === null &&
    baptismPlace === null &&
    baptismOfficiant === null &&
    confirmationDate === null &&
    previousChurch === null &&
    transferredInAt === null;

  const faith = allFaithNull
    ? null
    : {
        confessDate, learningDate, baptismDate, baptismPlace,
        baptismOfficiant, confirmationDate, previousChurch, transferredInAt,
      };

  const payload: CreateChurchMemberPayload = {
    name: values.name,
    sex: values.sex as Sex,
    birthDate: values.birthDate,
    birthCalendar: values.birthCalendar as "SOLAR" | "LUNAR",
    phone: values.phone,
    address: values.address,
    status: values.status as ChurchMemberStatus,
    office: values.office as ChurchMemberOffice,
    registeredAt: values.registeredAt,
    email,
    addressDetail,
    job,
    cellLabel,
    faithStage: faithStage as FaithStage | null,
    officeAppointedAt,
    memo,
    faith,
  };

  return { payload };
}
```

### 5-4. createChurchMemberAction 재작성

- [ ] **Step 5: 기존 create 액션을 공유 함수 사용으로 재작성**

기존 `createChurchMemberAction` 함수 본문 전체를 다음으로 교체:

```ts
export async function createChurchMemberAction(
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const values = readFormValues(formData);

  const session = await getAdminSession();
  if (!isAdminSession(session)) return buildMessageState("로그인이 필요합니다.", false, values);

  const result = validateAndBuildPayload(values, "create");
  if ("errors" in result) return { errors: result.errors, values, formKey: Date.now() };

  try {
    await createChurchMember(result.payload);
  } catch (error) {
    return buildMessageState(
      toFriendlyMemberMessage(error, "교인을 등록하지 못했습니다. 입력한 내용을 확인한 뒤 다시 시도해 주세요.", "등록"),
      false,
      values,
    );
  }

  revalidatePath("/admin/members");
  redirect("/admin/members");
}
```

### 5-5. updateChurchMemberAction 추가

- [ ] **Step 6: 수정 액션 추가**

`src/app/(admin)/admin/(cms)/members/actions.ts` 파일 끝에 추가:

```ts
export async function updateChurchMemberAction(
  id: number,
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const values = readFormValues(formData);

  const session = await getAdminSession();
  if (!isAdminSession(session)) return buildMessageState("로그인이 필요합니다.", false, values);

  const result = validateAndBuildPayload(values, "edit");
  if ("errors" in result) return { errors: result.errors, values, formKey: Date.now() };

  try {
    const { updateChurchMember } = await import("@/lib/admin-members-api");
    await updateChurchMember(id, result.payload);
  } catch (error) {
    return buildMessageState(
      toFriendlyMemberMessage(error, "교인을 수정하지 못했습니다. 입력한 내용을 확인한 뒤 다시 시도해 주세요.", "수정"),
      false,
      values,
    );
  }

  revalidatePath("/admin/members");
  revalidatePath(`/admin/members/${id}`);

  return {
    values,
    formKey: Date.now(),
    success: true,
    message: "수정되었습니다.",
    messageKey: Date.now(),
  };
}
```

Note: 동적 `import()`을 사용해 lazy load — 이미 다른 함수에서 `createChurchMember`를 정적 import 했다면 동일 패턴으로 정적 import해도 무방. 일관성을 위해 파일 상단의 기존 import 줄에 `updateChurchMember`를 합쳐 정적 import로 전환:

```ts
import {
  createChurchMember,
  updateChurchMember,
  deleteChurchMember,
  getChurchMemberAuditLogs,
  toFriendlyMemberMessage,
} from "@/lib/admin-members-api";
```

그리고 위 함수 본문의 `const { updateChurchMember } = await import(...)` 줄을 제거.

### 5-6. deleteChurchMemberAction + loadMoreAuditLogsAction 추가

- [ ] **Step 7: 삭제/감사 로그 액션 추가**

파일 끝에 다음 추가:

```ts
export async function deleteChurchMemberAction(
  id: number,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    return { ok: false, message: "로그인이 필요합니다." };
  }

  try {
    await deleteChurchMember(id);
  } catch (error) {
    return {
      ok: false,
      message: toFriendlyMemberMessage(error, "교인을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.", "삭제"),
    };
  }

  revalidatePath("/admin/members");
  return { ok: true };
}

export async function loadMoreAuditLogsAction(id: number, page: number) {
  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    throw new Error("로그인이 필요합니다.");
  }
  return getChurchMemberAuditLogs(id, page, 10);
}
```

- [ ] **Step 8: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 9: 커밋**

```bash
git add src/app/\(admin\)/admin/\(cms\)/members/actions.ts src/app/\(admin\)/admin/\(cms\)/members/actions-contract.test.ts
git commit -m "feat(members): 수정/삭제/감사로그 서버 액션 추가"
```

---

## Task 6: PiiMaskedInput 컴포넌트

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input-contract.test.ts` (신규)

- [ ] **Step 1: 디렉터리 생성**

Run: `mkdir -p "src/app/(admin)/admin/(cms)/members/[id]/_components"`

- [ ] **Step 2: contract test 작성**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input-contract.test.ts`:

```ts
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
```

- [ ] **Step 3: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL (모듈 없음)

- [ ] **Step 4: 컴포넌트 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input.tsx`:

```tsx
"use client";

import { useState } from "react";

interface PiiMaskedInputProps {
  id: string;
  name: string;
  initialValue: string;
  hasError?: boolean;
  maskFn: (value: string) => string;
  inputMode?: "text" | "tel";
  placeholder?: string;
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 pr-20 text-[13px] text-[#132033] outline-none transition focus:ring-2 focus:ring-[#3f74c7]/30 ${
    hasError
      ? "border-red-300 bg-red-50/40 focus:border-red-400"
      : "border-[#dde4ef] bg-white focus:border-[#3f74c7]"
  }`;
}

export default function PiiMaskedInput({
  id, name, initialValue, hasError = false, maskFn, inputMode = "text", placeholder,
}: PiiMaskedInputProps) {
  const [revealed, setRevealed] = useState(false);
  const [actualValue, setActualValue] = useState(initialValue);

  const displayValue = revealed ? actualValue : maskFn(actualValue);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={actualValue} />
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        readOnly={!revealed}
        onChange={(e) => {
          if (revealed) setActualValue(e.target.value);
        }}
        className={inputCls(hasError)}
      />
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[11px] font-semibold text-[#3f74c7] hover:bg-[#edf4ff]"
        aria-pressed={revealed}
      >
        {revealed ? "숨기기" : "보기"}
      </button>
    </div>
  );
}
```

- [ ] **Step 5: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input.tsx" "src/app/(admin)/admin/(cms)/members/[id]/_components/pii-masked-input-contract.test.ts"
git commit -m "feat(members): PiiMaskedInput 컴포넌트 추가"
```

---

## Task 7: MemberForm 확장

**Files:**
- Modify: `src/app/(admin)/admin/(cms)/members/_components/member-form.tsx`

이 task는 7-1 ~ 7-4 단계로 나눠 진행.

### 7-1. Props 확장 + initialValues 적용

- [ ] **Step 1: Props 변경**

Edit `src/app/(admin)/admin/(cms)/members/_components/member-form.tsx`:

import에 다음 추가:
```ts
import { useRouter } from "next/navigation";
import { useEffect } from "react";  // 이미 있음 — 확인만
import PiiMaskedInput from "../[id]/_components/pii-masked-input";
import { maskName, maskPhone } from "@/lib/admin-members-mask";
import { BIRTH_CALENDAR_LABELS } from "./member-enums";
import {
  CREATABLE_STATUSES,
  EDITABLE_STATUSES,
  type ChurchMemberOffice,
  type ChurchMemberStatus,
  type FaithStage,
} from "@/lib/admin-members-types";
```

`MemberFormProps` 확장:
```ts
interface MemberFormProps {
  action: (prev: MemberFormState, formData: FormData) => Promise<MemberFormState>;
  initialValues?: MemberFormValues;
  mode?: "create" | "edit";
}
```

함수 시그니처 변경:
```ts
export default function MemberForm({ action, initialValues, mode = "create" }: MemberFormProps) {
  const initialState: MemberFormState = initialValues ? { values: initialValues } : {};
  const [state, formAction, isPending] = useActionState<MemberFormState, FormData>(action, initialState);
  const toast = useAdminToast();
  const router = useRouter();
  const values = state.values ?? initialValues;
  // ...
```

`useEffect`(토스트) 본문 교체:
```ts
useEffect(() => {
  if (!state.message) return;
  if (state.success) {
    toast.success(state.message);
    router.refresh();
    return;
  }
  toast.error(state.message);
}, [state.message, state.messageKey, state.success, toast, router]);
```

### 7-2. 이름·전화 PII 마스킹 분기

- [ ] **Step 2: 이름·전화 필드 분기**

기존 "이름" 필드 블록 (`<div>` 안의 `<input id="name" ...>`)을 다음으로 교체:

```tsx
{/* 이름 */}
<div>
  <Label htmlFor="name" required>이름</Label>
  {mode === "edit" ? (
    <PiiMaskedInput
      id="name"
      name="name"
      initialValue={values?.name ?? ""}
      hasError={!!state.errors?.name}
      maskFn={maskName}
      placeholder="홍길동"
    />
  ) : (
    <input
      id="name"
      name="name"
      type="text"
      placeholder="홍길동"
      defaultValue={values?.name ?? ""}
      className={inputCls(!!state.errors?.name)}
    />
  )}
  <FieldError msg={state.errors?.name} />
</div>
```

기존 "휴대전화" 필드 블록의 `<input id="phone" ...>`를 다음으로 교체:

```tsx
{/* 휴대전화 */}
<div>
  <Label htmlFor="phone" required>휴대전화</Label>
  {mode === "edit" ? (
    <PiiMaskedInput
      id="phone"
      name="phone"
      initialValue={values?.phone ?? ""}
      hasError={!!state.errors?.phone}
      maskFn={maskPhone}
      inputMode="tel"
      placeholder="010-0000-0000"
    />
  ) : (
    <input
      id="phone"
      name="phone"
      type="tel"
      placeholder="010-0000-0000"
      defaultValue={values?.phone ?? ""}
      className={inputCls(!!state.errors?.phone)}
    />
  )}
  <FieldError msg={state.errors?.phone} />
</div>
```

### 7-3. birthCalendar / cellLabel 필드 추가 + 상태 dropdown 분기

- [ ] **Step 3: 신규 필드 + 상태 dropdown**

"생년월일" 필드 다음 (같은 `grid` 블록 내, "기본 정보" 섹션 안)에 다음 추가:

```tsx
{/* 음양력 */}
<div>
  <Label htmlFor="birthCalendar" required>음/양력</Label>
  <div className="flex gap-3">
    {(Object.entries(BIRTH_CALENDAR_LABELS) as [string, string][]).map(([value, label]) => (
      <label key={value} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#dde4ef] px-4 py-2.5 transition has-[:checked]:border-[#3f74c7] has-[:checked]:bg-[#edf4ff]">
        <input
          type="radio"
          name="birthCalendar"
          value={value}
          defaultChecked={(values?.birthCalendar ?? "SOLAR") === value}
          className="accent-[#3f74c7]"
        />
        <span className="text-[13px] font-semibold text-[#132033]">{label}</span>
      </label>
    ))}
  </div>
  <FieldError msg={state.errors?.birthCalendar} />
</div>
```

"직업" 필드 다음 (교회 정보 섹션 내)에 추가:

```tsx
{/* 셀/구역 */}
<div>
  <Label htmlFor="cellLabel">셀/구역</Label>
  <input
    id="cellLabel"
    name="cellLabel"
    type="text"
    placeholder="셀 또는 구역 라벨 (선택)"
    defaultValue={values?.cellLabel ?? ""}
    className={inputCls(false)}
  />
</div>
```

기존 상태 dropdown 블록을 다음으로 교체:

```tsx
{/* 상태 */}
<div>
  <Label htmlFor="status" required>상태</Label>
  <select
    id="status"
    name="status"
    defaultValue={values?.status ?? ""}
    className={inputCls(!!state.errors?.status)}
  >
    <option value="">선택하세요</option>
    {mode === "edit" && values?.status === "REMOVED" && (
      <option value="REMOVED" disabled>제적 (삭제됨)</option>
    )}
    {(mode === "create" ? CREATABLE_STATUSES : EDITABLE_STATUSES).map((s) => (
      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
    ))}
  </select>
  <FieldError msg={state.errors?.status} />
</div>
```

### 7-4. optional 날짜 필드별 에러 표시 + 제출 버튼 라벨

- [ ] **Step 4: optional 날짜 필드별 에러**

기존 `DateTextInput`을 사용하는 각 optional 날짜 필드(`officeAppointedAt`, `confessDate`, `learningDate`, `baptismDate`, `confirmationDate`, `transferredInAt`)에 `hasError`와 `<FieldError>`를 추가:

각각의 패턴 (예시 — officeAppointedAt):
```tsx
<div>
  <Label htmlFor="officeAppointedAt">직분 임명일</Label>
  <DateTextInput
    id="officeAppointedAt"
    name="officeAppointedAt"
    defaultValue={values?.officeAppointedAt ?? ""}
    hasError={!!state.errors?.officeAppointedAt}
  />
  <FieldError msg={state.errors?.officeAppointedAt} />
</div>
```

`confessDate`, `learningDate`, `baptismDate`, `confirmationDate`, `transferredInAt`도 동일 패턴으로 `hasError`와 `<FieldError>` 추가.

- [ ] **Step 5: 제출 버튼 라벨 분기**

폼 하단 footer 영역의 제출 버튼 블록을 다음으로 교체:

```tsx
<button
  type="submit"
  disabled={isPending}
  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#3f74c7] px-5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#4a82d7] disabled:opacity-60"
>
  {isPending ? (
    <>
      <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 8" strokeLinecap="round" />
      </svg>
      {mode === "edit" ? "저장 중…" : "등록 중…"}
    </>
  ) : (mode === "edit" ? "변경 저장" : "교인 등록")}
</button>
```

- [ ] **Step 6: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 7: 커밋**

```bash
git add src/app/\(admin\)/admin/\(cms\)/members/_components/member-form.tsx
git commit -m "feat(members): MemberForm을 create/edit 양쪽 지원하도록 확장"
```

---

## Task 8: RemovedRecoveryBanner 컴포넌트

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner-contract.test.ts`

- [ ] **Step 1: contract test 작성**

```ts
import RemovedRecoveryBanner from "@/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner";

void RemovedRecoveryBanner;
type Props = Parameters<typeof RemovedRecoveryBanner>[0];
const _p: Props = {};
void _p;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

Run: `npm run typecheck`
Expected: FAIL

- [ ] **Step 3: 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner.tsx`:

```tsx
export default function RemovedRecoveryBanner() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
        <path
          d="M10 2l8 14H2L10 2z"
          stroke="#b45309"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 8v4M10 14h0" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <div className="text-[13px] text-[#92400e]">
        <p className="font-semibold">이 교인은 [제적] 상태입니다.</p>
        <p className="mt-1">상태를 다른 값으로 변경한 뒤 [변경 저장]을 누르면 복구됩니다.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner.tsx" "src/app/(admin)/admin/(cms)/members/[id]/_components/removed-recovery-banner-contract.test.ts"
git commit -m "feat(members): REMOVED 상태 안내 배너 추가"
```

---

## Task 9: AuditLogList 컴포넌트

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list-contract.test.ts`

- [ ] **Step 1: contract test 작성**

```ts
import AuditLogList from "@/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list";
import type { ChurchMemberAuditPage } from "@/lib/admin-members-types";

void AuditLogList;
type Props = Parameters<typeof AuditLogList>[0];

const _p: Props = {
  memberId: 1,
  initialPage: { items: [], hasNext: false } as ChurchMemberAuditPage,
};
void _p;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

- [ ] **Step 3: 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list.tsx`:

```tsx
"use client";

import { useState } from "react";
import type {
  AuditAction,
  ChurchMemberAuditEntry,
  ChurchMemberAuditPage,
} from "@/lib/admin-members-types";
import { loadMoreAuditLogsAction } from "../../actions";

interface AuditLogListProps {
  memberId: number;
  initialPage: ChurchMemberAuditPage;
}

const ACTION_LABELS: Record<AuditAction, string> = {
  CREATE: "등록",
  UPDATE: "수정",
  DELETE: "삭제",
};

const ACTION_BADGE: Record<AuditAction, string> = {
  CREATE: "bg-emerald-50 text-emerald-600",
  UPDATE: "bg-blue-50 text-blue-600",
  DELETE: "bg-red-50 text-red-500",
};

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AuditLogList({ memberId, initialPage }: AuditLogListProps) {
  const [items, setItems] = useState<ChurchMemberAuditEntry[]>(initialPage.items);
  const [hasNext, setHasNext] = useState(initialPage.hasNext);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLoadMore() {
    setLoading(true);
    setError(null);
    try {
      const next = await loadMoreAuditLogsAction(memberId, page + 1);
      setItems((prev) => [...prev, ...next.items]);
      setHasNext(next.hasNext);
      setPage((p) => p + 1);
    } catch {
      setError("이력을 불러오지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="border-b border-[#f0f4f8] px-6 py-4">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">변경 이력</h2>
      </div>
      {items.length === 0 ? (
        <div className="px-6 py-12 text-center text-[13px] text-[#6d7f95]">
          아직 변경 이력이 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-[#f0f4f8]">
          {items.map((entry) => (
            <li key={entry.id} className="flex items-center gap-3 px-6 py-3 text-[13px]">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${ACTION_BADGE[entry.action]}`}>
                {ACTION_LABELS[entry.action]}
              </span>
              <span className="text-[#5d6f86]">{formatDateTime(entry.createdAt)}</span>
              <span className="text-[#8fa3bb]">관리자 #{entry.actorId}</span>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div className="border-t border-[#fecaca] bg-red-50 px-6 py-2 text-[12px] text-red-600">
          {error}
        </div>
      )}
      {hasNext && (
        <div className="border-t border-[#f0f4f8] px-6 py-3 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-60"
          >
            {loading ? "불러오는 중…" : "더 보기"}
          </button>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list.tsx" "src/app/(admin)/admin/(cms)/members/[id]/_components/audit-log-list-contract.test.ts"
git commit -m "feat(members): 감사 로그 목록 뷰어 추가"
```

---

## Task 10: DeleteMemberButton 컴포넌트

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button-contract.test.ts`

- [ ] **Step 1: contract test 작성**

```ts
import DeleteMemberButton from "@/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button";

void DeleteMemberButton;
type Props = Parameters<typeof DeleteMemberButton>[0];

const _p: Props = { memberId: 1, memberName: "홍길동" };
void _p;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

- [ ] **Step 3: 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteChurchMemberAction } from "../../actions";

interface DeleteMemberButtonProps {
  memberId: number;
  memberName: string;
}

export default function DeleteMemberButton({ memberId, memberName }: DeleteMemberButtonProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openModal() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    const result = await deleteChurchMemberAction(memberId);
    if (result.ok) {
      router.replace("/admin/members");
      return;
    }
    setDeleting(false);
    setError(result.message);
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex h-9 items-center rounded-lg border border-red-300 px-4 text-[13px] font-semibold text-red-600 transition hover:bg-red-50"
      >
        교인 삭제
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-2xl border border-[#e2e8f0] p-0 shadow-xl backdrop:bg-black/40"
      >
        <div className="w-[420px] p-6">
          <h3 className="text-[15px] font-bold text-[#0f1c2e]">교인 삭제 확인</h3>
          <p className="mt-3 text-[13px] text-[#374151]">
            정말 <strong>[{memberName}]</strong> 교인을 삭제하시겠습니까?
            <br />
            삭제 후에도 변경 이력은 보존됩니다.
          </p>
          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">
              {error}
            </p>
          )}
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={deleting}
              className="inline-flex h-9 items-center rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9] disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={deleting}
              className="inline-flex h-9 items-center rounded-lg bg-red-500 px-4 text-[13px] font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {deleting ? "삭제 중…" : "삭제"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button.tsx" "src/app/(admin)/admin/(cms)/members/[id]/_components/delete-member-button-contract.test.ts"
git commit -m "feat(members): 교인 삭제 모달 버튼 추가"
```

---

## Task 11: MemberDetailClient 컴포넌트

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client-contract.test.ts`

- [ ] **Step 1: contract test 작성**

```ts
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
```

- [ ] **Step 2: 타입체크 → 실패 확인**

- [ ] **Step 3: 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client.tsx`:

```tsx
"use client";

import type { ChurchMemberAuditPage } from "@/lib/admin-members-types";
import MemberForm from "../../_components/member-form";
import type { MemberFormValues } from "../../actions";
import { updateChurchMemberAction } from "../../actions";
import AuditLogList from "./audit-log-list";
import DeleteMemberButton from "./delete-member-button";
import RemovedRecoveryBanner from "./removed-recovery-banner";

interface MemberDetailClientProps {
  memberId: number;
  memberName: string;
  isRemoved: boolean;
  initialValues: MemberFormValues;
  initialAuditPage: ChurchMemberAuditPage;
}

export default function MemberDetailClient({
  memberId, memberName, isRemoved, initialValues, initialAuditPage,
}: MemberDetailClientProps) {
  return (
    <div className="space-y-6">
      {isRemoved && <RemovedRecoveryBanner />}
      <MemberForm
        mode="edit"
        initialValues={initialValues}
        action={updateChurchMemberAction.bind(null, memberId)}
      />
      <AuditLogList memberId={memberId} initialPage={initialAuditPage} />
      {!isRemoved && (
        <DeleteMemberButton memberId={memberId} memberName={memberName} />
      )}
    </div>
  );
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client.tsx" "src/app/(admin)/admin/(cms)/members/[id]/_components/member-detail-client-contract.test.ts"
git commit -m "feat(members): 상세 페이지 클라이언트 컨테이너 추가"
```

---

## Task 12: 상세 페이지 (`[id]/page.tsx`)

**Files:**
- Create: `src/app/(admin)/admin/(cms)/members/[id]/page.tsx`
- Test: `src/app/(admin)/admin/(cms)/members/[id]/page-contract.test.ts`

- [ ] **Step 1: contract test 작성**

```ts
import MemberDetailPage from "@/app/(admin)/admin/(cms)/members/[id]/page";

void MemberDetailPage;
type Props = Parameters<typeof MemberDetailPage>[0];
const _p: Props = { params: Promise.resolve({ id: "1" }) };
void _p;
```

- [ ] **Step 2: 타입체크 → 실패 확인**

- [ ] **Step 3: 구현**

Create `src/app/(admin)/admin/(cms)/members/[id]/page.tsx`:

```tsx
import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import {
  getChurchMember,
  getChurchMemberAuditLogs,
} from "@/lib/admin-members-api";
import type {
  ChurchMemberDetail,
} from "@/lib/admin-members-types";
import AdminBreadcrumb from "../components/admin-breadcrumb";
import type { MemberFormValues } from "../actions";
import MemberDetailClient from "./_components/member-detail-client";

function detailToFormValues(d: ChurchMemberDetail): MemberFormValues {
  return {
    name: d.name,
    sex: d.sex,
    birthDate: d.birthDate,
    birthCalendar: d.birthCalendar,
    phone: d.phone,
    email: d.email ?? "",
    address: d.address,
    addressDetail: d.addressDetail ?? "",
    status: d.status,
    office: d.office,
    registeredAt: d.registeredAt,
    officeAppointedAt: d.officeAppointedAt ?? "",
    faithStage: d.faithStage ?? "",
    job: d.job ?? "",
    cellLabel: d.cellLabel ?? "",
    memo: d.memo ?? "",
    confessDate: d.faith?.confessDate ?? "",
    learningDate: d.faith?.learningDate ?? "",
    baptismDate: d.faith?.baptismDate ?? "",
    baptismPlace: d.faith?.baptismPlace ?? "",
    baptismOfficiant: d.faith?.baptismOfficiant ?? "",
    confirmationDate: d.faith?.confirmationDate ?? "",
    previousChurch: d.faith?.previousChurch ?? "",
    transferredInAt: d.faith?.transferredInAt ?? "",
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const session = await getAdminSession();
  if (!isAdminSession(session)) {
    redirect(`/admin/login?callbackUrl=/admin/members/${id}`);
  }

  let detail;
  let auditPage;
  try {
    [detail, auditPage] = await Promise.all([
      getChurchMember(id),
      getChurchMemberAuditLogs(id, 0, 10),
    ]);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const initialValues = detailToFormValues(detail);
  const isRemoved = detail.status === "REMOVED";

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "운영" },
          { label: "교인 관리", href: "/admin/members" },
          { label: "교인 상세" },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">교인 상세</h1>
      <MemberDetailClient
        memberId={id}
        memberName={detail.name}
        isRemoved={isRemoved}
        initialValues={initialValues}
        initialAuditPage={auditPage}
      />
    </div>
  );
}
```

- [ ] **Step 4: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add "src/app/(admin)/admin/(cms)/members/[id]/page.tsx" "src/app/(admin)/admin/(cms)/members/[id]/page-contract.test.ts"
git commit -m "feat(members): 상세/수정 페이지 라우트 추가"
```

---

## Task 13: 목록 행 클릭 가능 처리

**Files:**
- Modify: `src/app/(admin)/admin/(cms)/members/_components/member-list-client.tsx`

- [ ] **Step 1: `<tr>` 핸들러 추가**

Edit `member-list-client.tsx` — 목록 행 렌더 부분(`data.items.map((member, idx) => ...)`)에서 기존 `<tr>` 시작 태그를 다음과 같이 교체:

```tsx
<tr
  key={member.id}
  role="link"
  tabIndex={0}
  onClick={() => router.push(`/admin/members/${member.id}`)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/admin/members/${member.id}`);
    }
  }}
  aria-label={`${member.name} 교인 상세 보기`}
  className="cursor-pointer border-b border-[#f0f4f8] last:border-0 transition hover:bg-[#fafcff] focus:outline-none focus-visible:bg-[#eff5fd] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3f74c7]"
>
```

기존 `className`에 있던 hover 스타일은 유지(중복 제거).

- [ ] **Step 2: 타입체크 + 린트**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: 커밋**

```bash
git add src/app/\(admin\)/admin/\(cms\)/members/_components/member-list-client.tsx
git commit -m "feat(members): 목록 행 클릭으로 상세 진입 가능"
```

---

## Task 14: 빌드 검증 + 수동 QA

**Files:** 없음 (검증만)

- [ ] **Step 1: 프로덕션 빌드**

Run: `npm run build`
Expected: PASS — 모든 페이지가 빌드되고 `/admin/members/[id]`가 dynamic route로 잡혀야 함

- [ ] **Step 2: dev 서버 기동**

Run: `npm run dev`
Expected: 로컬 http://localhost:3000 기동

- [ ] **Step 3: 수동 QA — 스펙 Section 15 시나리오 전체**

각 항목을 확인하고 체크:

- [ ] 목록에서 행 클릭(또는 Enter/Space) → 상세 페이지 진입, 폼이 기존 값으로 채워짐
- [ ] 이름·전화번호가 기본 마스킹 표시 (`홍*동`, `010-***-1234` 패턴), "보기" 클릭 시 평문 + 편집 가능, "숨기기" 클릭 시 마스킹 복귀
- [ ] 잘못된 날짜 형식 입력 (예: `2026-13-99`) → 저장 시 해당 필드 아래 빨간 에러 표시, 다른 값 유지
- [ ] 정상 수정 후 저장 → 토스트 "수정되었습니다" + 감사 로그에 UPDATE 행 즉시 추가 (router.refresh 동작 확인)
- [ ] 상태를 DECEASED로 변경 후 저장 → 목록 페이지에서 기본(includeInactive OFF) 시 사라짐, ON 시 보임
- [ ] 비활성 포함 ON 상태 목록에서 DECEASED 회원 클릭 → 상세 진입 OK
- [ ] 삭제 버튼 → 모달 표시 → 취소 클릭 → 모달 닫힘, 데이터 변경 없음
- [ ] 삭제 버튼 → 모달 → 삭제 클릭 → 목록으로 이동, 해당 회원이 기본 목록에서 사라짐
- [ ] 삭제된 회원의 URL 직접 진입 (`/admin/members/{id}`) → 노란 복구 안내 배너 표시, 상태 dropdown에 "제적 (삭제됨)" disabled로 선택됨, 삭제 버튼 숨겨짐
- [ ] REMOVED 회원에서 상태를 ACTIVE로 변경 후 저장 → 토스트 "수정되었습니다", 배너 사라짐, 삭제 버튼 다시 표시됨, 기본 목록에 다시 등장
- [ ] 감사 로그가 10건 이상이면 "더 보기" 동작 — 메타데이터만 보이고 diff 내용은 노출되지 않는 것 확인
- [ ] 존재하지 않는 id로 직접 URL 진입 (`/admin/members/999999`) → 404 페이지
- [ ] 부정형 id (`/admin/members/abc`, `/admin/members/-1`, `/admin/members/1.5`) → 404 페이지

- [ ] **Step 4: 빌드 산출물 정리 커밋 (필요 시)**

빌드 과정에서 자동 생성된 파일이나 lint fix가 있으면 커밋. 없으면 스킵.

---

## 완료 기준

- 모든 14개 task의 모든 step 체크 완료
- 스펙 Section 15의 모든 QA 시나리오 통과
- `npm run typecheck && npm run lint && npm run build` 무에러
- feature 브랜치(`feature/member`)에 모든 커밋 푸시
