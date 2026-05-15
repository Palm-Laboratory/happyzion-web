import type { ServiceAssignment, TrainingRecord } from "./types";
import { EmptyState, InfoSection } from "./member-detail-shared";

export function ServiceTab({
  service,
}: {
  service?: {
    active: ServiceAssignment[];
    past: ServiceAssignment[];
    tags: string[];
    trainings: TrainingRecord[];
  };
}) {
  if (!service) {
    return <EmptyState title="봉사 정보가 없습니다." />;
  }

  return (
    <div className="space-y-6">
      <InfoSection title={`현재 봉사 (${service.active.length})`}>
        <div className="space-y-2">
          {service.active.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-bold text-[#0f1c2e]">{item.department}</span>
                    <span className="text-[#cbd5e1]">·</span>
                    <span className="text-[13px] text-[#55697f]">{item.role}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#8fa3bb]">시작일 {item.startedAt}</p>
                  {item.schedule ? <p className="mt-1 text-[12px] text-[#5d6f86]">{item.schedule}</p> : null}
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  진행중
                </span>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title={`과거 봉사 (${service.past.length})`}>
        <div className="space-y-2">
          {service.past.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#e2e8f0] bg-[#fafcff] p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-[13px] font-semibold text-[#55697f]">{item.department}</span>
                  <span className="ml-2 text-[11px] text-[#8fa3bb]">{item.role}</span>
                </div>
                <span className="text-[11px] text-[#8fa3bb]">
                  {item.startedAt} ~ {item.endedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>

      <InfoSection title="은사 · 달란트">
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-amber-50 px-2.5 py-1 text-[12px] text-amber-800">
              {tag}
            </span>
          ))}
        </div>
      </InfoSection>

      <InfoSection title="교육 이수">
        <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white">
          {service.trainings.map((training, index) => (
            <div
              key={training.id}
              className={`flex items-center justify-between px-4 py-3 ${index > 0 ? "border-t border-[#f0f4f8]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#8fa3bb]">{training.year}</span>
                <span className="text-[13px] font-semibold text-[#0f1c2e]">{training.programName}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">수료</span>
              </div>
              <span className="text-[11px] text-[#8fa3bb]">{training.completedAt}</span>
            </div>
          ))}
        </div>
      </InfoSection>
    </div>
  );
}
