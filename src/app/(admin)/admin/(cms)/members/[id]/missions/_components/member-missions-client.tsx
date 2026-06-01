"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  MISSION_TRIP_TYPE_LABELS,
  MISSION_TRIP_STATUS_LABELS,
  PARTICIPANT_ROLE_LABELS,
  PARTICIPATION_STATUS_LABELS,
  type MemberMissionParticipation,
  type MissionTripSummary,
  type ParticipantRole,
  type ParticipationStatus,
} from "@/lib/admin-missions-types";
import { addMemberParticipantAction } from "../../../../missions/actions";

const ROLES = Object.entries(PARTICIPANT_ROLE_LABELS) as [ParticipantRole, string][];
const STATUSES = Object.entries(PARTICIPATION_STATUS_LABELS) as [ParticipationStatus, string][];

interface MemberMissionsClientProps {
  memberId: number;
  initialParticipations: MemberMissionParticipation[];
  allTrips: MissionTripSummary[];
}

export default function MemberMissionsClient({
  memberId,
  initialParticipations,
  allTrips,
}: MemberMissionsClientProps) {
  const [participations, setParticipations] = useState(initialParticipations);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCount = participations.length;

  // 이미 참여 중인 여정 ID
  const joinedTripIds = new Set(participations.map((p) => p.tripId));
  const availableTrips = allTrips.filter((t) => !joinedTripIds.has(t.id));

  function handleAdded(p: MemberMissionParticipation) {
    setParticipations((prev) => [p, ...prev]);
    setShowAdd(false);
    setError(null);
  }

  return (
    <div className="space-y-4">
      {/* 요약 */}
      <div className="flex items-center gap-4 rounded-xl border border-[#e2eaf3] bg-white px-6 py-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#3f74c7]">{totalCount}</p>
          <p className="text-xs text-[#8fa3bb]">총 참여 횟수</p>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => { setShowAdd(true); setError(null); }}
            className="rounded-lg border border-[#3f74c7] px-3 py-1.5 text-xs font-medium text-[#3f74c7] transition hover:bg-[#f0f6ff]"
          >
            + 선교 참여 추가
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      {showAdd && (
        <AddParticipationPanel
          memberId={memberId}
          availableTrips={availableTrips}
          onAdded={handleAdded}
          onCancel={() => setShowAdd(false)}
          onError={setError}
        />
      )}

      {/* 이력 목록 */}
      {participations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#d0dae8] bg-white py-16 text-center text-sm text-[#8fa3bb]">
          선교 참여 이력이 없습니다.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e2eaf3] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2eaf3] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8fa3bb]">
                <th className="px-5 py-3">여정</th>
                <th className="px-4 py-3">나라/지역</th>
                <th className="px-4 py-3">기간</th>
                <th className="px-4 py-3">역할</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f9]">
              {participations.map((p) => (
                <tr key={p.participantId} className="hover:bg-[#f7f9fc]">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/missions/${p.tripId}`}
                      className="font-medium text-[#1a3152] hover:text-[#3f74c7] hover:underline"
                    >
                      {p.tripTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#4a6484]">{p.country}</td>
                  <td className="px-4 py-3 text-[#4a6484]">
                    {p.startDate.slice(0, 7)}
                    {p.endDate && <> ~ {p.endDate.slice(0, 7)}</>}
                  </td>
                  <td className="px-4 py-3 text-[#4a6484]">{PARTICIPANT_ROLE_LABELS[p.role]}</td>
                  <td className="px-4 py-3">
                    <ParticipationStatusBadge status={p.participationStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Add Panel ─────────────────────────────────────────────────────────────────

interface AddPanelProps {
  memberId: number;
  availableTrips: MissionTripSummary[];
  onAdded: (p: MemberMissionParticipation) => void;
  onCancel: () => void;
  onError: (msg: string) => void;
}

function AddParticipationPanel({ memberId, availableTrips, onAdded, onCancel, onError }: AddPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [tripId, setTripId] = useState<string>("");
  const [role, setRole] = useState<ParticipantRole>("MEMBER");
  const [status, setStatus] = useState<ParticipationStatus>("CONFIRMED");

  function handleSubmit() {
    if (!tripId) { onError("여정을 선택해 주세요."); return; }

    startTransition(async () => {
      const result = await addMemberParticipantAction(Number(tripId), memberId, role, status);
      if (result.message) {
        onError(result.message);
      } else {
        const trip = availableTrips.find((t) => t.id === Number(tripId));
        if (trip) {
          onAdded({
            participantId: Date.now(),
            tripId: trip.id,
            tripTitle: trip.title,
            country: trip.country,
            startDate: trip.startDate,
            endDate: trip.endDate,
            tripStatus: trip.status,
            role,
            participationStatus: status,
            note: null,
          });
        }
      }
    });
  }

  return (
    <div className="rounded-xl border border-[#d0e4fa] bg-[#f5f9ff] p-5">
      <p className="mb-3 text-xs font-semibold text-[#4a6484]">선교 참여 추가</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">여정 *</label>
          {availableTrips.length === 0 ? (
            <p className="text-xs text-[#8fa3bb]">추가 가능한 여정이 없습니다.</p>
          ) : (
            <select value={tripId} onChange={(e) => setTripId(e.target.value)} className={inputCls}>
              <option value="">선택</option>
              {availableTrips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.startDate.slice(0, 4)} {t.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">역할</label>
          <select value={role} onChange={(e) => setRole(e.target.value as ParticipantRole)} className={inputCls}>
            {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#4a6484]">참가 상태</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as ParticipationStatus)} className={inputCls}>
            {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending || availableTrips.length === 0}
          className="rounded-lg bg-[#3f74c7] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#2f5eaa] disabled:opacity-60"
        >
          {isPending ? "추가 중…" : "추가"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#c6d8ee] px-4 py-1.5 text-xs font-medium text-[#4a6484] transition hover:bg-white"
        >
          취소
        </button>
      </div>
    </div>
  );
}

function ParticipationStatusBadge({ status }: { status: ParticipationStatus }) {
  const styles: Record<ParticipationStatus, string> = {
    APPLIED: "bg-[#e8f2ff] text-[#3f74c7]",
    CONFIRMED: "bg-[#e8fff0] text-[#1a8a4a]",
    CANCELLED: "bg-[#f0f0f0] text-[#666]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {PARTICIPATION_STATUS_LABELS[status]}
    </span>
  );
}

const inputCls =
  "w-full rounded-lg border border-[#d0dae8] bg-white px-2.5 py-1.5 text-xs text-[#1a3152] outline-none transition focus:border-[#3f74c7]";
