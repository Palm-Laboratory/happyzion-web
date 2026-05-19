"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import type { MemberFormState, MemberFormValues } from "../actions";
import { useAdminToast } from "../../components/admin-toast-provider";
import {
  STATUS_LABELS, OFFICE_LABELS, FAITH_STAGE_LABELS, SEX_LABELS, BIRTH_CALENDAR_LABELS,
} from "./member-enums";
import {
  CREATABLE_STATUSES, EDITABLE_STATUSES,
  type ChurchMemberOffice, type FaithStage,
} from "@/lib/admin-members-types";
import PiiMaskedInput from "../[id]/_components/pii-masked-input";
import { maskName, maskPhone } from "@/lib/admin-members-mask";

// ── 공통 UI ───────────────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-[12px] text-red-500">
      <span aria-hidden="true">●</span>{msg}
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-[#1e2f45]">
      {children}
      {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-[13px] text-[#132033] outline-none transition focus:ring-2 focus:ring-[#3f74c7]/30 ${hasError
      ? "border-red-300 bg-red-50/40 focus:border-red-400"
      : "border-[#dde4ef] bg-white focus:border-[#3f74c7]"
    }`;
}

function DateTextInput({
  id,
  name,
  defaultValue = "",
  hasError = false,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  hasError?: boolean;
}) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      placeholder="YYYY-MM-DD"
      defaultValue={defaultValue}
      className={inputCls(hasError)}
    />
  );
}

// ── 폼 컴포넌트 ───────────────────────────────────────────────────────────────

interface MemberFormProps {
  action: (prev: MemberFormState, formData: FormData) => Promise<MemberFormState>;
  initialValues?: MemberFormValues;
  mode?: "create" | "edit";
}

export default function MemberForm({ action, initialValues, mode = "create" }: MemberFormProps) {
  const initialState: MemberFormState = initialValues ? { values: initialValues } : {};
  const [state, formAction, isPending] = useActionState<MemberFormState, FormData>(action, initialState);
  const toast = useAdminToast();
  const router = useRouter();
  const values = state.values ?? initialValues;

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.refresh();
      return;
    }
    toast.error(state.message);
  }, [state.message, state.messageKey, state.success, toast, router]);

  return (
    <form key={state.formKey ?? "empty-member-form"} action={formAction} className="space-y-6">
      {/* ── Section 1: 기본 정보 ── */}
      <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="border-b border-[#f0f4f8] px-6 py-4">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">기본 정보</h2>
        </div>
        <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
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
          {/* 성별 radio */}
          <div>
            <Label htmlFor="sex" required>성별</Label>
            <div className="flex gap-3">
              {(Object.entries(SEX_LABELS) as [string, string][]).map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#dde4ef] px-4 py-2.5 transition has-[:checked]:border-[#3f74c7] has-[:checked]:bg-[#edf4ff]">
                  <input
                    type="radio"
                    name="sex"
                    value={value}
                    defaultChecked={values?.sex === value}
                    className="accent-[#3f74c7]"
                  />
                  <span className="text-[13px] font-semibold text-[#132033]">{label}</span>
                </label>
              ))}
            </div>
            <FieldError msg={state.errors?.sex} />
          </div>
          {/* 생년월일 */}
          <div>
            <Label htmlFor="birthDate" required>생년월일</Label>
            <DateTextInput
              id="birthDate"
              name="birthDate"
              defaultValue={values?.birthDate ?? ""}
              hasError={!!state.errors?.birthDate}
            />
            <FieldError msg={state.errors?.birthDate} />
          </div>
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
        </div>
      </section>

      {/* ── Section 2: 연락·주소 ── */}
      <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="border-b border-[#f0f4f8] px-6 py-4">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">연락·주소</h2>
        </div>
        <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
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
          {/* 이메일 */}
          <div>
            <Label htmlFor="email">이메일</Label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              defaultValue={values?.email ?? ""}
              className={inputCls(false)}
            />
          </div>
          {/* 주소 */}
          <div className="sm:col-span-2">
            <Label htmlFor="address" required>주소</Label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="도로명 주소"
              defaultValue={values?.address ?? ""}
              className={inputCls(!!state.errors?.address)}
            />
            <FieldError msg={state.errors?.address} />
          </div>
          {/* 상세주소 */}
          <div className="sm:col-span-2">
            <Label htmlFor="addressDetail">상세주소</Label>
            <input
              id="addressDetail"
              name="addressDetail"
              type="text"
              placeholder="상세주소 (선택)"
              defaultValue={values?.addressDetail ?? ""}
              className={inputCls(false)}
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: 교회 정보 ── */}
      <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="border-b border-[#f0f4f8] px-6 py-4">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">교회 정보</h2>
        </div>
        <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
          {/* 상태 (mode-based options) */}
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
          {/* 직분 */}
          <div>
            <Label htmlFor="office" required>직분</Label>
            <select
              id="office"
              name="office"
              defaultValue={values?.office ?? ""}
              className={inputCls(!!state.errors?.office)}
            >
              <option value="">선택하세요</option>
              {(Object.entries(OFFICE_LABELS) as [ChurchMemberOffice, string][]).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <FieldError msg={state.errors?.office} />
          </div>
          {/* 등록일 */}
          <div>
            <Label htmlFor="registeredAt" required>등록일</Label>
            <DateTextInput
              id="registeredAt"
              name="registeredAt"
              defaultValue={values?.registeredAt ?? ""}
              hasError={!!state.errors?.registeredAt}
            />
            <FieldError msg={state.errors?.registeredAt} />
          </div>
          {/* 직분 임명일 */}
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
          {/* 신앙 단계 */}
          <div>
            <Label htmlFor="faithStage">신앙 단계</Label>
            <select
              id="faithStage"
              name="faithStage"
              defaultValue={values?.faithStage ?? ""}
              className={inputCls(false)}
            >
              <option value="">선택 안 함</option>
              {(Object.entries(FAITH_STAGE_LABELS) as [FaithStage, string][]).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          {/* 직업 */}
          <div>
            <Label htmlFor="job">직업</Label>
            <input
              id="job"
              name="job"
              type="text"
              placeholder="직업 (선택)"
              defaultValue={values?.job ?? ""}
              className={inputCls(false)}
            />
          </div>
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
          {/* 메모 */}
          <div className="sm:col-span-2">
            <Label htmlFor="memo">메모</Label>
            <textarea
              id="memo"
              name="memo"
              rows={3}
              placeholder="메모 (선택)"
              defaultValue={values?.memo ?? ""}
              className="w-full rounded-xl border border-[#dde4ef] bg-white px-4 py-2.5 text-[13px] text-[#132033] outline-none transition focus:border-[#3f74c7] focus:ring-2 focus:ring-[#3f74c7]/30"
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: 신앙 정보 (collapsible) ── */}
      <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <details className="group">
          <summary className="cursor-pointer border-b border-[#f0f4f8] px-6 py-4 list-none flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#0f1c2e]">신앙 정보 <span className="ml-1.5 text-[11px] font-normal text-[#8fa3bb]">(선택)</span></h2>
            <span className="text-[11px] text-[#8fa3bb] group-open:hidden">펼치기</span>
            <span className="text-[11px] text-[#8fa3bb] hidden group-open:block">접기</span>
          </summary>
          <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
            {/* 영접일 */}
            <div>
              <Label htmlFor="confessDate">영접일</Label>
              <DateTextInput id="confessDate" name="confessDate" defaultValue={values?.confessDate ?? ""} hasError={!!state.errors?.confessDate} />
              <FieldError msg={state.errors?.confessDate} />
            </div>
            {/* 등록교육 수료일 */}
            <div>
              <Label htmlFor="learningDate">등록교육 수료일</Label>
              <DateTextInput id="learningDate" name="learningDate" defaultValue={values?.learningDate ?? ""} hasError={!!state.errors?.learningDate} />
              <FieldError msg={state.errors?.learningDate} />
            </div>
            {/* 세례일 */}
            <div>
              <Label htmlFor="baptismDate">세례일</Label>
              <DateTextInput id="baptismDate" name="baptismDate" defaultValue={values?.baptismDate ?? ""} hasError={!!state.errors?.baptismDate} />
              <FieldError msg={state.errors?.baptismDate} />
            </div>
            {/* 세례 장소 */}
            <div>
              <Label htmlFor="baptismPlace">세례 장소</Label>
              <input
                id="baptismPlace"
                name="baptismPlace"
                type="text"
                placeholder="세례 장소"
                defaultValue={values?.baptismPlace ?? ""}
                className={inputCls(false)}
              />
            </div>
            {/* 세례 집례자 */}
            <div>
              <Label htmlFor="baptismOfficiant">세례 집례자</Label>
              <input
                id="baptismOfficiant"
                name="baptismOfficiant"
                type="text"
                placeholder="세례 집례자"
                defaultValue={values?.baptismOfficiant ?? ""}
                className={inputCls(false)}
              />
            </div>
            {/* 입교일 */}
            <div>
              <Label htmlFor="confirmationDate">입교일</Label>
              <DateTextInput id="confirmationDate" name="confirmationDate" defaultValue={values?.confirmationDate ?? ""} hasError={!!state.errors?.confirmationDate} />
              <FieldError msg={state.errors?.confirmationDate} />
            </div>
            {/* 전 교회 */}
            <div>
              <Label htmlFor="previousChurch">전 교회</Label>
              <input
                id="previousChurch"
                name="previousChurch"
                type="text"
                placeholder="이전 교회 이름"
                defaultValue={values?.previousChurch ?? ""}
                className={inputCls(false)}
              />
            </div>
            {/* 이명 접수일 */}
            <div>
              <Label htmlFor="transferredInAt">이명 접수일</Label>
              <DateTextInput id="transferredInAt" name="transferredInAt" defaultValue={values?.transferredInAt ?? ""} hasError={!!state.errors?.transferredInAt} />
              <FieldError msg={state.errors?.transferredInAt} />
            </div>
          </div>
        </details>
      </section>

      {/* ── Footer buttons ── */}
      <div className="flex items-center justify-end gap-2.5">
        <Link
          href="/admin/members"
          className="inline-flex h-9 items-center rounded-lg border border-[#dde4ef] px-4 text-[13px] text-[#5d6f86] transition hover:bg-[#f1f5f9]"
        >
          취소
        </Link>
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
      </div>
    </form>
  );
}
