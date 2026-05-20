"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import {
  createChurchMember,
  updateChurchMember,
  deleteChurchMember,
  getChurchMemberAuditLogs,
  toFriendlyMemberMessage,
} from "@/lib/admin-members-api";
import type {
  CreateChurchMemberPayload,
  Sex,
  ChurchMemberStatus,
  ChurchMemberOffice,
  FaithStage,
} from "@/lib/admin-members-types";
import {
  isCreatableStatus, isEditableStatus, isOffice, isFaithStage, isSex,
} from "./_components/member-enums";

export interface MemberFormValues {
  name: string;
  sex: string;
  birthDate: string;
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

export interface MemberFormState {
  errors?: Partial<Record<
    | "name" | "sex" | "birthDate" | "phone"
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
  redirectTo?: string;
}

function buildMessageState(message: string, success = false, values?: MemberFormValues): MemberFormState {
  return { message, success, values, formKey: Date.now(), messageKey: Date.now() };
}

function normalizeDateInput(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  if (/^\d{8}$/.test(raw)) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  }
  return raw;
}

function isDateInput(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

function readFormValues(formData: FormData): MemberFormValues {
  return {
    name: String(formData.get("name") ?? "").trim(),
    sex: String(formData.get("sex") ?? "").trim(),
    birthDate: normalizeDateInput(formData.get("birthDate")),
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

  if (!values.phone) {
    errors.phone = "연락처를 입력해 주세요.";
  } else {
    const digits = values.phone.replace(/\D/g, "");
    if (!/^01[016789]/.test(digits)) {
      errors.phone = "올바른 휴대전화 번호를 입력해 주세요. (예: 010-1234-5678)";
    } else if (digits.length < 10 || digits.length > 11) {
      errors.phone = "휴대전화 번호는 10~11자리여야 합니다.";
    }
  }

  if (!values.address) {
    errors.address = "주소를 입력해 주세요.";
  }

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

  const email = values.email || null;
  const addressDetail = values.addressDetail || null;
  const job = values.job || null;
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
    birthCalendar: "SOLAR",
    phone: values.phone,
    address: values.address,
    status: values.status as ChurchMemberStatus,
    office: values.office as ChurchMemberOffice,
    registeredAt: values.registeredAt,
    email,
    addressDetail,
    job,
    cellLabel: null,
    faithStage: faithStage as FaithStage | null,
    officeAppointedAt,
    memo,
    faith,
  };

  return { payload };
}

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
    message: "변경 됐습니다.",
    messageKey: Date.now(),
    redirectTo: "/admin/members",
  };
}

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
