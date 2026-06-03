"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import {
  createMissionTrip,
  updateMissionTrip,
  deleteMissionTrip,
  addMissionParticipant,
  updateMissionParticipant,
  removeMissionParticipant,
  toFriendlyMissionMessage,
} from "@/lib/admin-missions-api";
import type {
  MissionParticipant,
  MissionTripType,
  MissionTripStatus,
  ParticipantRole,
  ParticipationStatus,
} from "@/lib/admin-missions-types";

export interface MissionTripFormState {
  message?: string;
  success?: boolean;
}

function hasInvalidDateRange(startDate: string, endDate: string | null): boolean {
  return endDate != null && endDate < startDate;
}

// ── Trip CRUD ─────────────────────────────────────────────────────────────────

export async function createMissionTripAction(
  _prev: MissionTripFormState,
  formData: FormData,
): Promise<MissionTripFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const country = (formData.get("country") as string | null)?.trim() ?? "";
  const startDate = (formData.get("startDate") as string | null)?.trim() ?? "";
  const endDate = (formData.get("endDate") as string | null)?.trim() || null;
  const type = formData.get("type") as MissionTripType;
  const status = formData.get("status") as MissionTripStatus;
  const leaderLabel = (formData.get("leaderLabel") as string | null)?.trim() || null;
  const budgetRaw = (formData.get("budget") as string | null)?.trim();
  const budget = budgetRaw ? Number(budgetRaw) : null;
  const description = (formData.get("description") as string | null)?.trim() || null;

  if (!title) return { message: "제목을 입력해 주세요." };
  if (!country) return { message: "나라/지역을 입력해 주세요." };
  if (!startDate) return { message: "출발일을 입력해 주세요." };
  if (hasInvalidDateRange(startDate, endDate)) return { message: "도착일은 출발일보다 빠를 수 없습니다." };

  try {
    const trip = await createMissionTrip({ title, country, startDate, endDate, type, status, leaderLabel, budget, description });
    revalidatePath("/admin/missions");
    redirect(`/admin/missions/${trip.id}`);
  } catch (error) {
    if ((error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) throw error;
    return { message: toFriendlyMissionMessage(error, "선교 여정 등록 중 오류가 발생했습니다.") };
  }
}

export async function updateMissionTripAction(
  tripId: number,
  _prev: MissionTripFormState,
  formData: FormData,
): Promise<MissionTripFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const country = (formData.get("country") as string | null)?.trim() ?? "";
  const startDate = (formData.get("startDate") as string | null)?.trim() ?? "";
  const endDate = (formData.get("endDate") as string | null)?.trim() || null;
  const type = formData.get("type") as MissionTripType;
  const status = formData.get("status") as MissionTripStatus;
  const leaderLabel = (formData.get("leaderLabel") as string | null)?.trim() || null;
  const budgetRaw = (formData.get("budget") as string | null)?.trim();
  const budget = budgetRaw ? Number(budgetRaw) : null;
  const description = (formData.get("description") as string | null)?.trim() || null;

  if (!title) return { message: "제목을 입력해 주세요." };
  if (!country) return { message: "나라/지역을 입력해 주세요." };
  if (!startDate) return { message: "출발일을 입력해 주세요." };
  if (hasInvalidDateRange(startDate, endDate)) return { message: "도착일은 출발일보다 빠를 수 없습니다." };

  try {
    await updateMissionTrip(tripId, { title, country, startDate, endDate, type, status, leaderLabel, budget, description });
    revalidatePath(`/admin/missions/${tripId}`);
    revalidatePath("/admin/missions");
    return { success: true };
  } catch (error) {
    return { message: toFriendlyMissionMessage(error, "선교 여정 수정 중 오류가 발생했습니다.") };
  }
}

export async function deleteMissionTripAction(tripId: number): Promise<MissionTripFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await deleteMissionTrip(tripId);
    revalidatePath("/admin/missions");
    redirect("/admin/missions");
  } catch (error) {
    if ((error as { digest?: string }).digest?.startsWith("NEXT_REDIRECT")) throw error;
    return { message: toFriendlyMissionMessage(error, "선교 여정 삭제 중 오류가 발생했습니다.") };
  }
}

// ── Participants ──────────────────────────────────────────────────────────────

export interface ParticipantFormState {
  message?: string;
  success?: boolean;
  participant?: MissionParticipant;
}

export async function addParticipantAction(
  tripId: number,
  payload: {
    churchMemberId: number | null;
    externalName: string | null;
    role: ParticipantRole;
    participationStatus: ParticipationStatus;
    note: string | null;
  },
): Promise<ParticipantFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    const participant = await addMissionParticipant(tripId, payload);
    revalidatePath(`/admin/missions/${tripId}`);
    return { success: true, participant };
  } catch (error) {
    return { message: toFriendlyMissionMessage(error, "참가자 추가 중 오류가 발생했습니다.") };
  }
}

export async function updateParticipantAction(
  tripId: number,
  participantId: number,
  payload: { role: ParticipantRole; participationStatus: ParticipationStatus; note: string | null },
): Promise<ParticipantFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await updateMissionParticipant(tripId, participantId, payload);
    revalidatePath(`/admin/missions/${tripId}`);
    return { success: true };
  } catch (error) {
    return { message: toFriendlyMissionMessage(error, "참가자 수정 중 오류가 발생했습니다.") };
  }
}

export async function removeParticipantAction(
  tripId: number,
  participantId: number,
): Promise<ParticipantFormState> {
  const session = await getAdminSession();
  if (!isAdminSession(session)) return { message: "로그인이 필요합니다." };

  try {
    await removeMissionParticipant(tripId, participantId);
    revalidatePath(`/admin/missions/${tripId}`);
    return { success: true };
  } catch (error) {
    return { message: toFriendlyMissionMessage(error, "참가자 제거 중 오류가 발생했습니다.") };
  }
}

// 교인 상세 → 선교 탭에서 참여 추가 시 사용
export async function addMemberParticipantAction(
  tripId: number,
  memberId: number,
  role: ParticipantRole,
  participationStatus: ParticipationStatus,
): Promise<ParticipantFormState> {
  return addParticipantAction(tripId, {
    churchMemberId: memberId,
    externalName: null,
    role,
    participationStatus,
    note: null,
  });
}
