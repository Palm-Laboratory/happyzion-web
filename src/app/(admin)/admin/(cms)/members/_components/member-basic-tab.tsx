import Link from "next/link";
import type { AttendanceWeek, FaithProfile, Member } from "./types";
import { OFFICE_LABEL, STAGE_META } from "./types";
import { ATTENDANCE_META, communityLabel, formatBirthCalendar } from "./member-registry-utils";
import { InfoGrid, InfoSection } from "./member-detail-shared";

export function BasicTab({
  member,
  faith,
  familyCount,
  attendance,
}: {
  member: Member;
  faith?: FaithProfile;
  familyCount: number;
  attendance: AttendanceWeek[];
}) {
  const completedWeeks = attendance.filter((item) => item.status !== null);
  const attendedWeeks = attendance.filter((item) => item.status === "ATTEND" || item.status === "ONLINE");
  const attendanceRate = completedWeeks.length ? Math.round((attendedWeeks.length / completedWeeks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#dbe4f0] bg-gradient-to-br from-[#edf4ff] to-white px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-bold text-[#0f1c2e]">최근 4주 출석</h3>
          <Link href="/admin/attendance" className="text-[11px] font-semibold text-[#3f74c7]">
            전체 출석 이력 보기 →
          </Link>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            {attendance.map((item) => {
              const meta = item.status ? ATTENDANCE_META[item.status] : null;
              return (
                <div key={item.date} className="flex flex-col items-center">
                  <div
                    title={meta?.label ?? "미입력"}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shadow-sm ${
                      meta
                        ? meta.className
                        : "border-2 border-dashed border-[#d5deea] bg-white text-[#8fa3bb]"
                    }`}
                  >
                    {meta?.symbol ?? "-"}
                  </div>
                  <p className="mt-1 text-[10px] text-[#55697f]">{item.date}</p>
                </div>
              );
            })}
          </div>
          <div className="lg:ml-auto lg:text-right">
            <p className="text-[11px] text-[#55697f]">출석률 (4주)</p>
            <p className="text-[20px] font-bold text-emerald-600">{attendanceRate}%</p>
            <p className="text-[10px] text-[#8fa3bb]">
              마지막 출석 {attendance.findLast((item) => item.status)?.date ?? "기록 없음"}
            </p>
          </div>
        </div>
      </section>

      <InfoSection title="인적사항">
        <InfoGrid
          items={[
            { label: "이름 (영문)", value: `${member.name}${member.nameEn ? ` (${member.nameEn})` : ""}` },
            { label: "성별 / 생년월일", value: `${member.sex === "F" ? "여" : "남"} / ${member.birthDate} (${formatBirthCalendar(member.birthCalendar)})` },
            { label: "연락처 (본인)", value: member.phone },
            { label: "비상 연락망", value: member.emergencyPhone ? `${member.emergencyPhone}${member.emergencyRelation ? ` (${member.emergencyRelation})` : ""}` : "미등록" },
            { label: "이메일", value: member.email ?? "미등록" },
            { label: "직업", value: member.job ?? "미등록" },
            { label: "주소", value: `${member.address}${member.addressDetail ? `, ${member.addressDetail}` : ""}`, span: 2 },
            { label: "공동체", value: communityLabel(member.cellLabel) },
            { label: "가족 구성", value: `${familyCount}명 연결` },
          ]}
        />
        {member.memo ? (
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3">
            <p className="mb-1 text-[10px] font-semibold text-[#55697f]">관리자 비공개 메모</p>
            <p className="text-[12px] leading-relaxed text-[#5d6f86]">{member.memo}</p>
          </div>
        ) : null}
      </InfoSection>

      <InfoSection title="신앙 정보">
        <InfoGrid
          items={[
            { label: "신앙 레벨", value: `Lv${STAGE_META[member.faithStage].lv} ${STAGE_META[member.faithStage].label}` },
            { label: "직분", value: OFFICE_LABEL[member.office] },
            { label: "고백일", value: faith?.confessDate ?? "미기록" },
            { label: "학습일", value: faith?.learningDate ?? "미기록" },
            { label: "세례일", value: faith?.baptismDate ?? "미기록" },
            { label: "세례 장소", value: faith?.baptismPlace ?? "미기록" },
            { label: "집례자", value: faith?.baptismOfficiant ?? "미기록" },
            { label: "이전 교회", value: faith?.previousChurch ?? "미기록" },
          ]}
        />
        {faith?.ministryTags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {faith.ministryTags.map((tag) => (
              <span key={tag} className="rounded-md bg-amber-50 px-2.5 py-1 text-[12px] text-amber-800">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </InfoSection>
    </div>
  );
}
