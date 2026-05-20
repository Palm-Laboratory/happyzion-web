"use client";

import { useState, useCallback, useEffect } from "react";

interface RawRecipient {
  phone: string;
  name?: string;
}

interface MemberResult {
  id: number;
  name: string;
  phone?: string;
}

interface RecipientPickerProps {
  churchMemberIds: number[];
  onMemberIdsChange: (ids: number[]) => void;
  rawRecipients: RawRecipient[];
  onRawRecipientsChange: (r: RawRecipient[]) => void;
}

function parseRawLines(text: string): RawRecipient[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [phone, name] = line.split(",").map((s) => s.trim());
      return { phone: phone ?? "", name: name || undefined };
    })
    .filter((r) => r.phone);
}

function rawRecipientsToText(recipients: RawRecipient[]): string {
  return recipients
    .map((r) => (r.name ? `${r.phone},${r.name}` : r.phone))
    .join("\n");
}

export default function RecipientPicker({
  churchMemberIds,
  onMemberIdsChange,
  rawRecipients,
  onRawRecipientsChange,
}: RecipientPickerProps) {
  const [activeTab, setActiveTab] = useState<"members" | "direct">("direct");
  const [searchName, setSearchName] = useState("");
  const [memberResults, setMemberResults] = useState<MemberResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [rawText, setRawText] = useState(() => rawRecipientsToText(rawRecipients));

  const searchMembers = useCallback(async (name: string) => {
    if (!name.trim()) {
      setMemberResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/admin/members?name=${encodeURIComponent(name)}&size=20`,
      );
      if (res.ok) {
        const data = (await res.json()) as { items?: MemberResult[]; content?: MemberResult[] };
        setMemberResults(data.items ?? data.content ?? []);
      } else {
        setMemberResults([]);
      }
    } catch {
      setMemberResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === "members") {
        void searchMembers(searchName);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchName, activeTab, searchMembers]);

  function toggleMember(id: number) {
    if (churchMemberIds.includes(id)) {
      onMemberIdsChange(churchMemberIds.filter((m) => m !== id));
    } else {
      onMemberIdsChange([...churchMemberIds, id]);
    }
  }

  function handleRawBlur() {
    onRawRecipientsChange(parseRawLines(rawText));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#4a6484]">수신자</span>
        <span className="text-[11px] text-[#8fa3bb]">
          교인 {churchMemberIds.length}명 + 직접 입력 {rawRecipients.length}명
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 overflow-hidden rounded-lg border border-[#d7e3f4]">
        {(["direct", "members"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-[12px] font-semibold transition ${
              activeTab === tab
                ? "bg-[#3f74c7] text-white"
                : "bg-white text-[#4a6484] hover:bg-[#f7fbff]"
            }`}
          >
            {tab === "direct" ? "직접 입력" : "교인 선택"}
          </button>
        ))}
      </div>

      {/* Direct input tab */}
      {activeTab === "direct" && (
        <div className="space-y-1.5">
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            onBlur={handleRawBlur}
            rows={6}
            placeholder={"01012345678\n01098765432,홍길동\n한 줄에 번호 하나, 쉼표로 이름 추가 가능"}
            className="w-full resize-none rounded-lg border border-[#d7e3f4] bg-white px-3 py-2.5 text-[13px] font-mono text-[#132033] placeholder-[#a0b4c8] outline-none transition focus:border-[#3f74c7] focus:ring-1 focus:ring-[#3f74c7]"
          />
          <p className="text-[11px] text-[#8fa3bb]">
            형식: 번호 또는 번호,이름 (한 줄에 한 명)
          </p>
        </div>
      )}

      {/* Members tab */}
      {activeTab === "members" && (
        <div className="space-y-2">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="이름으로 검색..."
            className="w-full rounded-lg border border-[#d7e3f4] px-3 py-2 text-[13px] text-[#132033] outline-none transition focus:border-[#3f74c7] focus:ring-1 focus:ring-[#3f74c7]"
          />

          {isSearching && (
            <p className="text-center text-[12px] text-[#8fa3bb]">검색 중...</p>
          )}

          {!isSearching && memberResults.length === 0 && searchName.trim() && (
            <p className="text-center text-[12px] text-[#8fa3bb]">
              검색 결과가 없습니다.
            </p>
          )}

          {memberResults.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg border border-[#e2e8f0]">
              {memberResults.map((member) => {
                const checked = churchMemberIds.includes(member.id);
                return (
                  <label
                    key={member.id}
                    className="flex cursor-pointer items-center gap-3 border-b border-[#f1f5f9] px-3 py-2 last:border-0 hover:bg-[#f8fafc]"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMember(member.id)}
                      className="h-4 w-4 rounded border-[#d7e3f4] accent-[#3f74c7]"
                    />
                    <span className="flex-1 text-[13px] text-[#132033]">
                      {member.name}
                    </span>
                    {member.phone && (
                      <span className="text-[11px] text-[#8fa3bb]">{member.phone}</span>
                    )}
                  </label>
                );
              })}
            </div>
          )}

          {churchMemberIds.length > 0 && (
            <p className="text-[11px] text-[#3f74c7]">
              {churchMemberIds.length}명 선택됨
            </p>
          )}
        </div>
      )}
    </div>
  );
}
