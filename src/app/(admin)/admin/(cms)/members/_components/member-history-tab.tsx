import type { MemberEvent } from "./types";
import { EmptyState } from "./member-detail-shared";
import { formatMonthBucket } from "./member-registry-utils";

export function HistoryTab({ events }: { events: MemberEvent[] }) {
  if (!events.length) {
    return <EmptyState title="이력 정보가 없습니다." />;
  }

  const groups = events.reduce<Record<string, MemberEvent[]>>((acc, event) => {
    const bucket = formatMonthBucket(event.occurredAt);
    acc[bucket] = [...(acc[bucket] ?? []), event];
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <section className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#dbe4f0] bg-[#fafcff] px-4 py-3 text-[11px] text-[#8fa3bb]">
        <span>시스템 자동 기록 중심 타임라인</span>
        <span>·</span>
        <span>등록, 상태/레벨/직분, 주소, 봉사, 교육 변동 내역</span>
      </section>

      <div className="relative pl-6">
        <div className="absolute bottom-2 left-[11px] top-2 w-px bg-[#e2e8f0]" />
        {Object.entries(groups).map(([bucket, bucketEvents]) => (
          <div key={bucket} className="mb-6">
            <p className="mb-2 -ml-6 text-[11px] font-bold text-[#55697f]">{bucket}</p>
            <div className="space-y-3">
              {bucketEvents.map((event) => (
                <div key={event.id} className="relative">
                  <div className={`absolute -left-[17px] top-1 h-3 w-3 rounded-full ${event.dotColor} ring-4 ${event.ringColor}`} />
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${event.badgeColor}`}>
                          {event.badgeLabel}
                        </span>
                        <span className="text-[13px] font-semibold text-[#0f1c2e]">{event.title}</span>
                      </div>
                      <span className="text-[11px] text-[#8fa3bb]">{event.occurredAt}</span>
                    </div>
                    {event.detail ? <p className="mt-1 text-[11px] text-[#6d7f95]">{event.detail}</p> : null}
                    {event.diff ? (
                      <div className="mt-2 rounded bg-[#f8fafc] px-3 py-2 text-[11px] font-mono">
                        <p className="text-[#8fa3bb]">- {event.diff.before}</p>
                        <p className="text-[#0f1c2e]">+ {event.diff.after}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
