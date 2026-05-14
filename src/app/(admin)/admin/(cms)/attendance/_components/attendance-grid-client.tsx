"use client";

export default function AttendanceGridClient() {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[#dbe4f0] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[220px] flex-1">
            <span className="mb-1.5 block text-[11px] font-semibold text-[#55697f]">공동체</span>
            <select
              defaultValue="all"
              className="h-10 w-full rounded-xl border border-[#d5deea] bg-white px-3 text-[13px] text-[#0f1c2e] outline-none focus:border-[#3f74c7]"
            >
              <option value="all">전체</option>
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-[11px] font-semibold text-[#55697f]">예배일</span>
            <input
              type="date"
              className="h-10 rounded-xl border border-[#d5deea] px-3 text-[13px] text-[#0f1c2e] outline-none focus:border-[#3f74c7]"
            />
          </label>
          <label>
            <span className="mb-1.5 block text-[11px] font-semibold text-[#55697f]">예배 종류</span>
            <select className="h-10 rounded-xl border border-[#d5deea] bg-white px-3 text-[13px] text-[#0f1c2e] outline-none focus:border-[#3f74c7]">
              <option>주일 대예배</option>
              <option>주일 2부</option>
              <option>수요 예배</option>
            </select>
          </label>
          <button
            disabled
            className="h-10 rounded-xl bg-[#9aaec9] px-5 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            저장
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#6d7f95]">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">O 출석</span>
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">△ 온라인</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">E 사유</span>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700">X 결석</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">빈칸 미입력</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-[#dbe4f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#edf2f7] px-5 py-4">
          <div>
            <p className="text-[13px] font-semibold text-[#132033]">주간 출석 입력</p>
          </div>
          <button
            disabled
            className="h-8 rounded-lg border border-[#d5deea] bg-[#f1f5f9] px-3 text-[11px] font-semibold text-[#6d7f95] disabled:cursor-not-allowed disabled:opacity-70"
          >
            엑셀 업로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] text-left">
                <th className="px-4 py-3 text-[11px] font-semibold text-[#55697f]">교인</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#55697f]">공동체</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-[#55697f]">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#edf2f7]">
                <td colSpan={3} className="px-4 py-12 text-center text-[13px] text-[#6d7f95]">
                  표시할 출석 데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
