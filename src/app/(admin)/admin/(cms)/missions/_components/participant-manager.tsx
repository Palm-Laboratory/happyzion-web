"use client";

import { useState, useTransition } from "react";
import {
  PARTICIPANT_ROLE_LABELS,
  PARTICIPATION_STATUS_LABELS,
  type MissionParticipant,
  type ParticipantRole,
  type ParticipationStatus,
} from "@/lib/admin-missions-types";
import {
  addParticipantAction,
  updateParticipantAction,
  removeParticipantAction,
} from "../actions";
import MemberSearchModal, { type SelectedMember } from "./member-search-modal";

const ROLES = Object.entries(PARTICIPANT_ROLE_LABELS) as [ParticipantRole, string][];
const STATUSES = Object.entries(PARTICIPATION_STATUS_LABELS) as [ParticipationStatus, string][];

interface ParticipantManagerProps {
  tripId: number;
  initialParticipants: MissionParticipant[];
}

export default function ParticipantManager({ tripId, initialParticipants }: ParticipantManagerProps) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAdded(p: MissionParticipant) {
    setParticipants((prev) => [...prev, p]);
    setShowAddPanel(false);
  }

  function handleUpdated(p: MissionParticipant) {
    setParticipants((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  }

  function handleRemoved(id: number) {
    setParticipants((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div className="space-y-4 rounded-xl border border-[#e2eaf3] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#0f1c2e]">
          참가자 명단 <span className="ml-1 text-sm font-normal text-[#8fa3bb]">{participants.length}명</span>
        </h2>
        <button
          type="button"
          onClick={() => { setShowAddPanel(true); setError(null); }}
          className="rounded-lg border border-[#3f74c7] px-3 py-1.5 text-xs font-medium text-[#3f74c7] transition hover:bg-[#f0f6ff]"
        >
          + 참가자 추가
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      {showAddPanel && (
        <AddParticipantPanel
          tripId={tripId}
          onAdded={handleAdded}
          onCancel={() => setShowAddPanel(false)}
          onError={setError}
        />
      )}

      {participants.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#8fa3bb]">등록된 참가자가 없습니다.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e2eaf3]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e2eaf3] bg-[#f7f9fc] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8fa3bb]">
                <th className="px-4 py-2.5">이름</th>
                <th className="px-4 py-2.5">역할</th>
                <th className="px-4 py-2.5">상태</th>
                <th className="px-4 py-2.5">메모</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f9]">
              {participants.map((p) => (
                <ParticipantRow
                  key={p.id}
                  participant={p}
                  tripId={tripId}
                  onUpdated={handleUpdated}
                  onRemoved={handleRemoved}
                  onError={setError}
                />
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
  tripId: number;
  onAdded: (p: MissionParticipant) => void;
  onCancel: () => void;
  onError: (msg: string) => void;
}

function AddParticipantPanel({ tripId, onAdded, onCancel, onError }: AddPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<"member" | "external">("member");
  const [selectedMember, setSelectedMember] = useState<SelectedMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [externalName, setExternalName] = useState("");
  const [role, setRole] = useState<ParticipantRole>("MEMBER");
  const [participationStatus, setStatus] = useState<ParticipationStatus>("CONFIRMED");
  const [note, setNote] = useState("");

  function handleTypeChange(t: "member" | "external") {
    setType(t);
    setSelectedMember(null);
    setExternalName("");
  }

  function handleSubmit() {
    if (type === "member" && !selectedMember) {
      onError("교인을 검색해서 선택해 주세요.");
      return;
    }
    if (type === "external" && !externalName.trim()) {
      onError("이름을 입력해 주세요.");
      return;
    }

    const churchMemberId = type === "member" ? selectedMember!.id : null;
    const extName = type === "external" ? externalName.trim() : null;

    startTransition(async () => {
      const result = await addParticipantAction(tripId, {
        churchMemberId,
        externalName: extName,
        role,
        participationStatus,
        note: note.trim() || null,
      });
      if (result.message) {
        onError(result.message);
      } else if (!result.participant) {
        onError("참가자 추가 결과를 확인할 수 없습니다. 새로고침 후 다시 확인해 주세요.");
      } else {
        onAdded(result.participant);
      }
    });
  }

  return (
    <>
      {showMemberModal && (
        <MemberSearchModal
          onSelect={(m) => { setSelectedMember(m); setShowMemberModal(false); }}
          onClose={() => setShowMemberModal(false)}
        />
      )}

      <div className="rounded-lg border border-[#d0e4fa] bg-[#f5f9ff] p-4">
        <p className="mb-3 text-xs font-semibold text-[#4a6484]">참가자 추가</p>

        {/* 교인 / 외부인 탭 */}
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange("member")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${type === "member" ? "bg-[#3f74c7] text-white" : "border border-[#c6d8ee] text-[#4a6484] hover:bg-white"}`}
          >
            교인
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("external")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${type === "external" ? "bg-[#3f74c7] text-white" : "border border-[#c6d8ee] text-[#4a6484] hover:bg-white"}`}
          >
            외부인
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {type === "member" ? (
            <div>
              <label className="mb-1 block text-xs font-medium text-[#4a6484]">교인 *</label>
              {selectedMember ? (
                <div className="flex items-center gap-2 rounded-lg border border-[#3f74c7] bg-white px-3 py-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f2ff] text-xs font-semibold text-[#3f74c7]">
                    {selectedMember.name.slice(0, 1)}
                  </div>
                  <span className="flex-1 text-xs font-medium text-[#1a3152]">{selectedMember.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="text-[#8fa3bb] transition hover:text-[#4a6484]"
                    aria-label="선택 취소"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMemberModal(true)}
                  className="flex w-full items-center gap-2 rounded-lg border border-dashed border-[#a0b8d8] bg-white px-3 py-2 text-xs text-[#8fa3bb] transition hover:border-[#3f74c7] hover:text-[#3f74c7]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  교인 검색
                </button>
              )}
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-xs font-medium text-[#4a6484]">이름 *</label>
              <input
                value={externalName}
                onChange={(e) => setExternalName(e.target.value)}
                maxLength={120}
                className={inputCls}
                placeholder="홍길동"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-[#4a6484]">역할</label>
            <select value={role} onChange={(e) => setRole(e.target.value as ParticipantRole)} className={inputCls}>
              {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#4a6484]">참가 상태</label>
            <select value={participationStatus} onChange={(e) => setStatus(e.target.value as ParticipationStatus)} className={inputCls}>
              {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#4a6484]">메모</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={inputCls}
              placeholder="특이사항"
            />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
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
    </>
  );
}

// ── Row (with inline edit) ────────────────────────────────────────────────────

interface RowProps {
  participant: MissionParticipant;
  tripId: number;
  onUpdated: (p: MissionParticipant) => void;
  onRemoved: (id: number) => void;
  onError: (msg: string) => void;
}

function ParticipantRow({ participant: p, tripId, onUpdated, onRemoved, onError }: RowProps) {
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState(p.role);
  const [status, setStatus] = useState(p.participationStatus);
  const [note, setNote] = useState(p.note ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      const result = await updateParticipantAction(tripId, p.id, {
        role, participationStatus: status, note: note.trim() || null,
      });
      if (result.message) {
        onError(result.message);
      } else {
        onUpdated({ ...p, role, participationStatus: status, note: note.trim() || null });
        setEditing(false);
      }
    });
  }

  function handleRemove() {
    if (!confirm(`"${p.displayName}"을(를) 명단에서 제거하시겠습니까?`)) return;
    startTransition(async () => {
      const result = await removeParticipantAction(tripId, p.id);
      if (result.message) onError(result.message);
      else onRemoved(p.id);
    });
  }

  if (editing) {
    return (
      <tr className="bg-[#f5f9ff]">
        <td className="px-4 py-2.5 font-medium text-[#1a3152]">
          {p.displayName}
          {p.externalName && <span className="ml-1 text-xs text-[#8fa3bb]">(외부)</span>}
        </td>
        <td className="px-4 py-2.5">
          <select value={role} onChange={(e) => setRole(e.target.value as ParticipantRole)} className={`${inputCls} py-1`}>
            {ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </td>
        <td className="px-4 py-2.5">
          <select value={status} onChange={(e) => setStatus(e.target.value as ParticipationStatus)} className={`${inputCls} py-1`}>
            {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </td>
        <td className="px-4 py-2.5">
          <input value={note} onChange={(e) => setNote(e.target.value)} className={`${inputCls} py-1`} />
        </td>
        <td className="px-4 py-2.5">
          <div className="flex gap-2">
            <button type="button" onClick={handleSave} disabled={isPending} className="text-xs font-medium text-[#3f74c7] hover:underline disabled:opacity-60">
              저장
            </button>
            <button type="button" onClick={() => setEditing(false)} className="text-xs text-[#8fa3bb] hover:underline">
              취소
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="px-4 py-2.5 font-medium text-[#1a3152]">
        {p.churchMemberId ? (
          <a href={`/admin/members/${p.churchMemberId}`} className="hover:underline">{p.displayName}</a>
        ) : (
          <span>{p.displayName}<span className="ml-1 text-xs text-[#8fa3bb]">(외부)</span></span>
        )}
      </td>
      <td className="px-4 py-2.5 text-[#4a6484]">{PARTICIPANT_ROLE_LABELS[p.role]}</td>
      <td className="px-4 py-2.5">
        <StatusBadge status={p.participationStatus} />
      </td>
      <td className="px-4 py-2.5 text-xs text-[#8fa3bb]">{p.note ?? "—"}</td>
      <td className="px-4 py-2.5">
        <div className="flex gap-2">
          <button type="button" onClick={() => setEditing(true)} className="text-xs text-[#3f74c7] hover:underline">
            수정
          </button>
          <button type="button" onClick={handleRemove} disabled={isPending} className="text-xs text-red-400 hover:underline disabled:opacity-60">
            제거
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: ParticipationStatus }) {
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
