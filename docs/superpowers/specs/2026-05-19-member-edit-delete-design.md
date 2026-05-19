# 교인 수정(상세) 및 삭제 기능 설계

작성일: 2026-05-19
대상 영역: `web/src/app/(admin)/admin/(cms)/members/`
관련 백엔드: `happyzion-api` (변경 없음 — 기존 API 활용)

## 1. 배경 및 목적

관리자 어드민에 교인 등록·목록은 구현되어 있으나, 개별 교인의 **상세 조회·수정·삭제** UI가 없다. 백엔드(`ChurchMemberAdminController`)는 다음 엔드포인트를 이미 제공한다.

- `GET /api/v1/admin/members/{id}` — 상세 조회
- `PUT /api/v1/admin/members/{id}` — 전체 수정 (생성과 동일한 `ChurchMemberSaveRequest` DTO)
- `DELETE /api/v1/admin/members/{id}` — 소프트 삭제 (status → `REMOVED`, 감사 로그 기록)
- `GET /api/v1/admin/members/{id}/audit-logs` — 감사 로그 페이지네이션

이 스펙의 목표는 위 API를 활용해 프론트엔드(웹) 측에 상세=수정 단일 페이지, 감사 로그 뷰어, 삭제 모달을 추가하는 것이다. 본 작업에서 백엔드 변경은 없다.

## 2. 범위

### 포함
- `/admin/members/[id]` 단일 페이지 (상세 = 수정 폼)
- 이름·전화번호 PII 마스킹 + "보기" 토글 (**edit 모드 한정**)
- 감사 로그 뷰어 — **메타데이터만** 표시 (action / createdAt / actorId), 페이지네이션 "더 보기"
- 삭제 모달 (단순 확인 yes/no)
- 삭제된 교인(REMOVED) 상세 진입 시 명시적 복구 플로우 (Section 17 참조)
- 목록 행 → 상세 페이지로의 링크
- 기존 `MemberForm`을 `create`/`edit` 양쪽에서 재사용
- `birthCalendar`, `cellLabel`을 폼 필드로 추가 (PUT 전체 수정 시 유실 방지)

### 제외 (이번 범위 밖)
- 사진 첨부·해제 (`/photo` 엔드포인트)
- 감사 로그의 `actorId` → 관리자 이름 조회 (별도 백엔드 작업 필요)
- **감사 로그 diff 내용 표시** — 백엔드 `ChurchMemberAuditWriter`가 `encryptor.encrypt(...)`로 직접 암호화한 값을 `@Convert(EncryptedStringConverter)`가 한 번 더 암호화해 저장. 읽을 때 컨버터가 한 번만 복호화하므로 응답엔 ciphertext가 남음. diff 내용을 의미 있게 표시하려면 백엔드 수정 필요 (Section 18 참조)
- 부분 수정 PATCH 지원 (백엔드가 PUT 전체 교체 방식이므로 동일하게 처리)
- 일괄 삭제 / 목록 행 삭제 (사용자 결정: 상세 페이지 하단에만)

## 3. 디렉터리 구조

```
web/src/app/(admin)/admin/(cms)/members/
├── page.tsx                       (변경: 목록 행이 상세로 링크)
├── actions.ts                     (확장: update/delete/loadMoreAuditLogs action 추가)
├── new/page.tsx                   (변경 없음)
├── [id]/
│   ├── page.tsx                   (신규 — 서버: detail + audit page 0 fetch)
│   └── _components/
│       ├── member-detail-client.tsx
│       ├── pii-masked-input.tsx
│       ├── audit-log-list.tsx
│       └── delete-member-button.tsx
└── _components/
    ├── member-form.tsx            (변경: initialValues, mode props 추가)
    └── member-enums.ts            (변경 없음 — 라벨/배지 활용)

web/src/lib/
├── admin-members-api.ts           (확장: get/update/delete/auditLogs 추가)
├── admin-members-types.ts         (확장: Detail/AuditLog 타입 추가)
└── admin-members-mask.ts          (신규 — list와 detail이 공유)
```

## 4. 타입 (admin-members-types.ts 추가)

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
  createdAt: string;   // ISO-8601 with offset
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

// 편집 모드에서 표시되는 상태 (REMOVED 제외)
export const EDITABLE_STATUSES: ChurchMemberStatus[] = [
  "ACTIVE", "NEW", "RESTING", "LONG_ABSENT", "TRANSFERRED_OUT", "DECEASED",
];
```

**`MemberFormValues` 확장 (actions.ts)**

기존 인터페이스에 다음 두 필드 추가:
```ts
birthCalendar: string;   // "SOLAR" | "LUNAR" — 폼에선 string으로 받고 검증에서 좁힘
cellLabel: string;        // 구역/셀 라벨, optional (빈 문자열 허용)
```

`readFormValues`도 두 필드를 읽도록 확장. 기존 create 액션의 하드코딩(`birthCalendar: "SOLAR"`, `cellLabel: null`)은 제거하고 폼 값에서 가져옴.

**`MemberFormState.errors` 타입 확장**

필드별 에러 표시 대상 (모두 optional string):
```ts
errors?: Partial<Record<
  | "name" | "sex" | "birthDate" | "birthCalendar" | "phone"
  | "address" | "status" | "office" | "registeredAt"
  | "officeAppointedAt"            // optional, 형식 검증
  | "confessDate"                   // optional, 형식 검증
  | "learningDate"                  // optional, 형식 검증
  | "baptismDate"                   // optional, 형식 검증
  | "confirmationDate"              // optional, 형식 검증
  | "transferredInAt",              // optional, 형식 검증
  string
>>;
```

- 필수 필드 9개(name, sex, birthDate, birthCalendar, phone, address, status, office, registeredAt): 누락 또는 형식 오류 시 필드별 에러
- optional 날짜 6개: 값이 있을 때만 형식 검증, 잘못된 형식이면 필드별 에러
- 기존의 일괄 토스트 메시지(`"날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)"`)는 제거. 모든 날짜 형식 오류는 필드 옆에 표시.

**enum guards 확장 (`_components/member-enums.ts`)**

```ts
isCreatableStatus(value): // 기존 유지
isEditableStatus(value): value !== "REMOVED" && isStatus(value)
isBirthCalendar(value): value === "SOLAR" || value === "LUNAR"
```

## 5. API 클라이언트 (admin-members-api.ts 추가)

```ts
getChurchMember(id: number): Promise<ChurchMemberDetail>
updateChurchMember(id: number, payload: CreateChurchMemberPayload): Promise<ChurchMemberDetail>
deleteChurchMember(id: number): Promise<void>
getChurchMemberAuditLogs(id: number, page: number, size: number): Promise<ChurchMemberAuditPage>
```

모두 `adminApiFetch`를 사용해 백엔드 호출. `updateChurchMember`는 `PUT` + JSON body. `deleteChurchMember`는 응답 본문 없음. `AdminApiError`는 그대로 전파해 `toFriendlyMemberMessage`에서 변환.

**`toFriendlyMemberMessage` 시그니처 확장**

기존 함수는 5xx 시 "교인을 등록하지 못했습니다"로 고정되어 수정/삭제 컨텍스트에서 메시지가 어긋난다. 시그니처를 다음과 같이 변경:

```ts
toFriendlyMemberMessage(
  error: unknown,
  fallback: string,
  operationLabel?: "등록" | "수정" | "삭제",  // 기본 "등록"
): string
```

- 5xx 메시지: `"백엔드 서버 오류로 교인을 ${operationLabel}하지 못했습니다. ..."`
- 호출부: create는 "등록"(기본값 사용), update는 "수정", delete는 "삭제" 전달

## 6. 서버 액션 (actions.ts 확장)

**리팩토링 — 생성·수정 공유 로직 추출**

기존 `createChurchMemberAction`에 들어있는 검증·페이로드 빌더를 별도 함수로 추출. **`mode` 파라미터를 받아 상태 허용 범위가 다르도록 한다**:

```ts
function validateAndBuildPayload(
  values: MemberFormValues,
  mode: "create" | "edit",
): { errors: MemberFormState["errors"] } | { payload: CreateChurchMemberPayload }
```

- `mode === "create"`: 상태 검증에 `isCreatableStatus` 사용 (REMOVED 제외)
- `mode === "edit"`: 상태 검증에 `isEditableStatus` 사용 (REMOVED 제외, 그 외 전부 허용). REMOVED는 dropdown disabled option이라 실제 submit 값으로 도달하지 않지만, 안전망으로 reject.

`MemberFormValues`는 `birthCalendar`("SOLAR" | "LUNAR")와 `cellLabel` (string)을 추가로 포함한다. 생성·수정이 동일한 `ChurchMemberSaveRequest`를 쓰므로 페이로드 구조는 동일.

**신규 액션**

```ts
// PUT — useActionState 호환 (.bind(null, id)로 호출)
export async function updateChurchMemberAction(
  id: number,
  _prev: MemberFormState,
  formData: FormData,
): Promise<MemberFormState>

// DELETE — 일반 server action (폼 아님, 클라이언트가 직접 await)
export async function deleteChurchMemberAction(id: number): Promise<void>

// 감사 로그 다음 페이지 (server-only 모듈을 클라이언트에서 직접 호출 불가)
export async function loadMoreAuditLogsAction(
  id: number,
  page: number,
): Promise<ChurchMemberAuditPage>
```

**revalidate / refresh 정책**
- `updateChurchMemberAction` 성공:
  - `revalidatePath("/admin/members")` + `revalidatePath("/admin/members/${id}")`
  - 폼 상태는 `success=true` + 토스트 메시지 반환, 리다이렉트는 하지 않음
  - **클라이언트 측 `router.refresh()` 호출 필요** — server component에서 fetch한 audit log/REMOVED 배너 등이 즉시 갱신되도록. MemberForm의 useActionState 결과를 보고 `success=true`이면 useEffect로 `router.refresh()` 트리거.
- `deleteChurchMemberAction` 성공:
  - `revalidatePath("/admin/members")` 후 **결과 객체 반환** (`{ ok: true }`)
  - server action에서 직접 `redirect()`는 호출하지 않음. 클라이언트가 `router.replace("/admin/members")`로 이동.

**에러 처리**
- 검증 실패 (필드 단위): `{ errors, values, formKey }` 반환
- 검증 실패 (일반): `buildMessageState` 메시지로 토스트
- 백엔드 4xx/5xx: `toFriendlyMemberMessage`로 변환된 메시지 (operationLabel 인자로 "수정"/"삭제" 등 전달)
- `deleteChurchMemberAction` 실패: **throw 대신 `{ ok: false, message: string }` 반환.**
  - 이유: Next.js production 빌드는 server action에서 throw된 에러 메시지를 sanitize하여 generic "An error occurred"로 대체. 클라이언트에 친절한 메시지를 안정적으로 전달하려면 결과 객체가 필수.
  - 시그니처: `Promise<{ ok: true } | { ok: false; message: string }>`

## 7. PII 마스킹 토글 (`pii-masked-input.tsx`)

**적용 범위: edit 모드 한정.** create 모드에서는 마스킹할 기존 값이 없어 UX가 어색해지므로 일반 `<input>`을 사용한다. (MemberForm이 mode에 따라 분기 렌더)

동작:
- 내부 state `revealed: boolean` (기본 false)
- 내부 state `actualValue: string` (`initialValue`로 시작)
- `revealed=false`: `<input>`이 `readOnly`, 표시값은 `maskFn(actualValue)`
- `revealed=true`: `<input>` 편집 가능, 표시값은 `actualValue` (controlled)
- Submit 데이터 정합성: hidden mirror input (`<input type="hidden" name={name} value={actualValue} />`)
- 표시 input의 `name` 속성은 비워둠 → submit에 두 번 들어가지 않음
- 토글 버튼: "보기" ↔ "숨기기"

마스킹 함수는 `admin-members-mask.ts`로 추출 (현재 `member-list-client.tsx`의 `maskName`/`maskPhone` 이동).

**Props**

```ts
interface PiiMaskedInputProps {
  id: string;
  name: string;
  initialValue: string;
  hasError?: boolean;
  maskFn: (value: string) => string;
  inputMode?: "text" | "tel";
  placeholder?: string;
}
```

## 8. MemberForm 변경 (`_components/member-form.tsx`)

**Props 확장**

```ts
interface MemberFormProps {
  action: (prev: MemberFormState, formData: FormData) => Promise<MemberFormState>;
  initialValues?: MemberFormValues;
  mode?: "create" | "edit";   // 기본 "create"
}
```

**변경 지점**
- `useActionState`의 초기 state: `initialValues ? { values: initialValues } : {}`
- 이름·전화번호 필드: `mode === "edit"`이면 `<PiiMaskedInput>`, `mode === "create"`이면 기존 일반 `<input>` 유지
- **신규 필드 추가**:
  - `birthCalendar` (radio, "양력"/"음력") — 기본값 SOLAR
  - `cellLabel` (text input, optional) — "구역/셀 라벨"
  - 위 두 필드는 create/edit 모드 모두 노출. 백엔드 PUT이 전체 교체이므로 edit에서 누락 시 기존 값이 유실되는 것을 막기 위함.
- 상태 dropdown 옵션 분기:
  - `mode === "create"`: 기존 `CREATABLE_STATUSES` 사용
  - `mode === "edit"`: `EDITABLE_STATUSES` 사용. 단, `initialValues.status === "REMOVED"`인 경우 `REMOVED` 옵션을 disabled로 dropdown 맨 위에 노출하여 현재 상태를 표시. 다른 상태로의 변경만 허용.
- 제출 버튼:
  - create: "교인 등록" / pending "등록 중…"
  - edit: "변경 저장" / pending "저장 중…"
- 취소 버튼: 양쪽 모두 `/admin/members`로 이동 (edit 모드에서 별도 변경 없음)

## 9. 상세 페이지 (`[id]/page.tsx`)

서버 컴포넌트. 흐름:

1. **id 파싱 검증**: `const id = Number(params.id);` → `Number.isSafeInteger(id) && id > 0`이 아니면 `notFound()`. (음수, NaN, 0, 거대값, 소수점 등 모두 차단)
2. `getAdminSession()` 검사 → 미인증이면 `/admin/login?callbackUrl=/admin/members/${id}` 리다이렉트
3. `Promise.all([getChurchMember(id), getChurchMemberAuditLogs(id, 0, 10)])` 병렬 호출
   - try/catch로 감싸서, **`AdminApiError`이고 `status === 404`**이면 `notFound()` 호출
   - 다른 에러는 그대로 throw → Next.js error boundary가 처리
4. `ChurchMemberDetail` → `MemberFormValues` 매핑 (null → "" 변환)
5. `AdminBreadcrumb` ("운영" / "교인 관리" / "교인 상세") + `<MemberDetailClient .../>` 렌더

**매핑 헬퍼**

```ts
function detailToFormValues(d: ChurchMemberDetail): MemberFormValues {
  return {
    name: d.name,
    sex: d.sex,
    birthDate: d.birthDate,
    birthCalendar: d.birthCalendar,    // 신규 보존
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
    cellLabel: d.cellLabel ?? "",       // 신규 보존
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
```

## 10. MemberDetailClient (`_components/member-detail-client.tsx`)

```tsx
"use client";

interface Props {
  memberId: number;
  memberName: string;           // 삭제 모달 표시용
  isRemoved: boolean;           // status === "REMOVED" 여부
  initialValues: MemberFormValues;
  initialAuditPage: ChurchMemberAuditPage;
}
```

렌더:
```tsx
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
```

**수정 성공 후 새로고침**

`MemberForm` 내부에서 `useActionState` 결과를 보고 `state.success === true` 토스트 표시 후 즉시 `router.refresh()`를 호출 (useEffect의 의존성에 `state.messageKey` 포함). 이렇게 해야 server component가 다시 실행되어 갱신된 audit log·status·배너 상태가 화면에 반영된다.

```ts
useEffect(() => {
  if (state.success) {
    toast.success(state.message);
    router.refresh();
  } else if (state.message) {
    toast.error(state.message);
  }
}, [state.messageKey]);
```

## 11. AuditLogList (`_components/audit-log-list.tsx`)

**중요**: 백엔드 `diffJson`이 이중 암호화 이슈로 의미 있는 평문이 아니므로 이번 범위에서는 **diff 내용을 표시하지 않는다**. 메타데이터만 표시.

- 카드 형태 섹션 (`기본 정보` 등과 동일한 스타일)
- 헤더: "변경 이력"
- 빈 상태: "아직 변경 이력이 없습니다."
- 행 (한 줄): `[CREATE|UPDATE|DELETE 한국어 배지] [createdAt 포맷팅] [관리자 #{actorId}]`
  - 액션 라벨: `CREATE → "등록"`, `UPDATE → "수정"`, `DELETE → "삭제"`
  - 배지 색상: 등록=초록, 수정=파랑, 삭제=빨강
- diff 내용 표시는 노출하지 않음 (Section 18 향후 작업)
- "더 보기" 버튼: `loadMoreAuditLogsAction(memberId, nextPage)` 호출
  - 반환된 `page.items`를 기존 `items` 뒤에 append
  - `page.hasNext` / `nextPage` 갱신
- `hasNext=false`이면 버튼 숨김

**state**
```ts
const [items, setItems] = useState(initialPage.items);
const [hasNext, setHasNext] = useState(initialPage.hasNext);
const [page, setPage] = useState(0);
const [loading, setLoading] = useState(false);
```

## 12. DeleteMemberButton (`_components/delete-member-button.tsx`)

- 빨간색 outline 버튼 "교인 삭제" (페이지 우하단 단독 배치)
- 클릭 → `<dialog>` 모달 오픈 (`showModal()`)
- 모달 본문: "정말 [{memberName}] 교인을 삭제하시겠습니까? 삭제 후에도 변경 이력은 보존됩니다."
- 버튼: [취소] [삭제] (삭제는 빨간색)
- 삭제 클릭 흐름:
  ```ts
  setIsDeleting(true);
  const result = await deleteChurchMemberAction(memberId);
  if (result.ok) {
    router.replace("/admin/members");
    // 페이지 언마운트되므로 toast는 호출하지 않음
  } else {
    setIsDeleting(false);
    setError(result.message);
  }
  ```
- throw/catch 사용하지 않음 (production sanitize 회피)
- 에러 메시지는 모달 내 빨간 영역에 표시, 삭제 버튼 재활성화
- REMOVED 상태에서는 이 컴포넌트 자체를 렌더하지 않음 (Section 17 참조)

## 13. 목록 페이지 연결 (`page.tsx` / `member-list-client.tsx`)

`<tbody>` 자식으로는 `<tr>`만 허용되므로 `<Link><tr>...</tr></Link>` 구조는 사용하지 않는다 (유효하지 않은 HTML + hydration 경고).

**구현 방식: `<tr>` 자체에 키보드/마우스 핸들러 부착**

```tsx
<tr
  role="link"
  tabIndex={0}
  onClick={() => router.push(`/admin/members/${member.id}`)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/admin/members/${member.id}`);
    }
  }}
  className="... cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3f74c7]"
  aria-label={`${member.name} 교인 상세 보기`}
>
```

- 텍스트 선택을 막지 않도록 onMouseDown 이벤트로 텍스트 드래그를 가로채지 않는다 (기본 onClick은 드래그 후 release되면 click으로 인식되지 않음)
- 보조: 행의 마지막 `<td>`에는 "›" 아이콘을 추가해 클릭 가능함을 시각적으로 암시
- 별도 "보기" 버튼은 추가하지 않음. 이름 자체는 `<Link>`로 감싸지 않음 (행 전체가 핸들러 갖고 있음)

## 14. 에러 처리 매트릭스

| 시나리오 | 위치 | 대응 |
|---|---|---|
| id 파라미터 부정형 (음수/NaN/소수점) | server page | `notFound()` (사전 검증) |
| 상세 GET `AdminApiError` 404 | server page | catch → `notFound()` |
| 상세 GET 401/403 | server page | `redirect("/admin/login?callbackUrl=...")` |
| 상세 GET 5xx / network | server page | throw → Next.js 에러 페이지 |
| PUT 검증 실패 (필드) | server action | `{ errors, values, formKey }` 반환 |
| PUT 4xx 일반 (중복 등) | server action | `toFriendlyMemberMessage(err, fallback, "수정")` → 토스트 |
| PUT 5xx | server action | "...수정하지 못했습니다..." 토스트 (operationLabel 사용) |
| PUT 성공 | server action | `{ success: true, message: "수정되었습니다." }` 반환 → 클라이언트 router.refresh() |
| DELETE 4xx/5xx | server action | `{ ok: false, message: toFriendlyMemberMessage(err, fallback, "삭제") }` 반환 |
| DELETE 성공 | server action | `{ ok: true }` 반환 → 클라이언트 router.replace("/admin/members") |
| 감사 로그 더 보기 실패 | client | "이력을 불러오지 못했습니다" 인라인 메시지 + 재시도 버튼 |

## 15. 검증 시나리오 (수동 QA)

1. 목록에서 행 클릭 → 상세 페이지 진입, 폼이 기존 값으로 채워짐
2. 이름·전화번호가 기본 마스킹 표시, "보기" 클릭 시 평문 + 편집 가능
3. 잘못된 날짜 형식 입력 후 저장 → 필드 에러 표시, 다른 값 유지
4. 정상 수정 후 저장 → 토스트 "수정되었습니다" + 감사 로그에 UPDATE 행 추가
5. 상태를 DECEASED로 변경 후 저장 → 기본 목록(includeInactive OFF)에서 사라짐. (참고: 백엔드 `ACTIVE_SET = {ACTIVE, NEW, RESTING, LONG_ABSENT, TRANSFERRED_OUT}` 이므로 RESTING/LONG_ABSENT/TRANSFERRED_OUT은 기본 목록에 남는다.)
6. 비활성 포함 ON 상태 목록에서 DECEASED 회원 클릭 → 상세 진입 OK
7. 삭제 버튼 → 모달 표시 → 취소 클릭 → 모달 닫힘, 데이터 변경 없음
8. 삭제 버튼 → 모달 → 삭제 클릭 → 목록으로 이동, 해당 회원이 (기본 목록에서) 사라짐
9. 삭제된 회원의 URL 직접 진입 (`/admin/members/{id}`) → 상세 페이지 열림, 상단 복구 안내 배너 노출, dropdown에 REMOVED가 disabled option으로 노출되고 선택된 상태, "교인 삭제" 버튼 숨김. 다른 상태(예: ACTIVE)로 변경 후 저장 시 복구 (Section 17 참조).
10. 감사 로그가 10건 이상이면 "더 보기" 동작 확인 — 메타데이터(action/createdAt/actorId)만 표시되고 diff 내용은 나오지 않는 것 확인

## 16. 향후 확장 (이번 범위 외)

- 사진 첨부·해제 패널 (`/photo` endpoint)
- 감사 로그 `actorId` → 관리자 이름 매핑 (백엔드에 admin account 정보를 audit 응답에 join 필요)
- 부분 수정 PATCH 지원 검토

## 17. REMOVED 교인 상세 진입 정책 (복구 플로우)

소프트 삭제 후에도 `GET /api/v1/admin/members/{id}`는 모든 상태의 교인을 반환한다(현재 백엔드). 이를 활용한 의도적 "상태 변경에 의한 복구" UX를 다음과 같이 명시한다.

**진입 경로**
- 비활성 포함 ON 목록에서 행 클릭, 또는 URL 직접 입력 (`/admin/members/{id}`)
- 권한: 일반 수정과 동일. `@AdminAuthRequired` 백엔드 + `getAdminSession` 프론트. **별도 권한 분리 없음** — 관리자라면 누구나 복구 가능. (별도 권한 분리는 향후 확장으로 둔다.)

**페이지 상단 배너**
- 상세 페이지 상단(브레드크럼 아래, 폼 위)에 **노란색 경고 배너** 노출:
  - 본문: "이 교인은 [삭제됨] 상태입니다. 상태를 다른 값으로 변경한 뒤 [변경 저장]을 누르면 복구됩니다."
  - 배너는 `status === "REMOVED"`일 때만 렌더
- 폼은 활성 상태로 유지되어 수정 가능
- "교인 삭제" 버튼은 **숨김** (이미 삭제 상태이므로 의미 없음)

**복구 동작**
- 사용자가 dropdown에서 ACTIVE/NEW/RESTING 등으로 변경 후 저장
- 서버 액션은 일반 수정과 동일한 경로 (`updateChurchMemberAction`). 별도의 "복구" 엔드포인트나 액션은 만들지 않는다.
- 백엔드 audit log에 `UPDATE` 로그가 남음 (status: REMOVED → ACTIVE)

**금지 동작**
- REMOVED 상태에서 REMOVED로 저장 시도: dropdown에서 REMOVED는 disabled여서 다른 값을 반드시 선택해야 함. 안전망으로 서버 액션 검증에서도 REMOVED 값을 reject (`isEditableStatus`).

## 18. 감사 로그 diff 표시 (이번 범위 밖, 백엔드 작업 필요)

현재 상태:
- `ChurchMemberAuditWriter.save()`가 `encryptor.encrypt(objectMapper.writeValueAsString(diff))`로 평문 JSON을 한 번 암호화
- `ChurchMemberAuditLog.diffJson`은 `@Convert(EncryptedStringConverter)`가 또 한 번 암호화 (저장 시) / 한 번 복호화 (조회 시)
- 결과: 응답 `diffJson` = ciphertext 한 겹 남음 → 프론트에서 의미 있는 파싱 불가능

**옵션 A (권장)**: 백엔드에서 `encryptor.encrypt(...)` 호출을 제거하고 컨버터에만 위임. 별도 마이그레이션으로 기존 로우의 이중 암호화를 한 겹 풀어줘야 함. 별도 task로 진행.

**옵션 B**: 컨버터의 `@Convert`를 제거하고 명시적 encrypt만 유지. 마찬가지로 별도 task.

이번 프론트 작업에서는 diff를 표시하지 않고, 후속 작업에서 정합성 확보 후 활성화한다.
