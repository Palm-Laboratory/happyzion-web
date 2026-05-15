import { Avatar, StageBadge, StatusBadge } from "./badges";
import type { FamilyMember } from "./types";
import { OFFICE_LABEL, RELATION_LABEL } from "./types";

export function FamilyTab({ family }: { family: FamilyMember[] }) {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#dbe4f0] bg-gradient-to-br from-purple-50/40 to-white px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#55697f]">세대 요약</p>
            <p className="text-[15px] font-bold text-[#0f1c2e]">
              연결 가족 {family.length}명
            </p>
          </div>
          <button className="h-8 rounded-lg border border-[#bfd0ea] bg-[#edf4ff] px-3 text-[11px] font-semibold text-[#2d5da8]">
            + 가족 추가
          </button>
        </div>
      </section>

      <div className="space-y-2">
        {family.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 ${item.isLinked ? "border-[#e2e8f0] bg-white" : "border-dashed border-[#d5deea] bg-[#fafcff]"}`}
          >
            <div className="flex items-start gap-4">
              {item.isLinked ? (
                <Avatar initial={item.initial} grad={item.avatarGrad} />
              ) : (
                <div className="flex h-12 w-9 items-center justify-center rounded-md bg-[#e2e8f0] text-sm font-bold text-[#8fa3bb]">?</div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-bold text-[#0f1c2e]">{item.name}</span>
                  {item.isHead ? <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">세대주</span> : null}
                  <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                    {RELATION_LABEL[item.relation]}
                  </span>
                  {item.office ? <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">{OFFICE_LABEL[item.office]}</span> : null}
                  {!item.isLinked ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">교적 미등록</span> : null}
                </div>
                <p className="mt-1 text-[12px] text-[#55697f]">
                  {item.sex === "F" ? "여" : "남"}
                  {item.birthDate ? ` · ${item.birthDate}` : ""}
                  {item.phone ? ` · ${item.phone}` : ""}
                  {item.age ? ` · ${item.age}세` : ""}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {item.status ? <StatusBadge status={item.status} /> : null}
                  {item.faithStage ? <StageBadge stage={item.faithStage} /> : null}
                  {item.groupNote ? <span className="text-[11px] text-[#8fa3bb]">· {item.groupNote}</span> : null}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button className="text-[11px] font-semibold text-[#3f74c7]">교적 보기</button>
                <button className="text-[11px] text-[#8fa3bb]">연결 해제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
