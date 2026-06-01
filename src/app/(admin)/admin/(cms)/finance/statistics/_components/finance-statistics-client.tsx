"use client";

import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  FinanceStatBreakdown,
  FinanceStatGranularity,
  FinanceStatResponse,
} from "@/lib/admin-finance-types";
import { WON } from "../../_components/finance-format";

const GRANULARITIES: { value: FinanceStatGranularity; label: string }[] = [
  { value: "WEEK", label: "주별" },
  { value: "MONTH", label: "월별" },
  { value: "QUARTER", label: "분기별" },
  { value: "YEAR", label: "연별" },
];

const INCOME_COLOR = "#1d6f42";
const EXPENSE_COLOR = "#B73838";
const BALANCE_COLOR = "#3f74c7";

const PIE_COLORS = [
  "#3f74c7",
  "#1d6f42",
  "#b3502a",
  "#7c5cc4",
  "#c79a3f",
  "#3fa7b7",
  "#c34f7a",
  "#5d6f86",
  "#9aa5b8",
];

export default function FinanceStatisticsClient({ data }: { data: FinanceStatResponse }) {
  const router = useRouter();

  function navigate(next: { granularity?: FinanceStatGranularity; year?: number; month?: number }) {
    const params = new URLSearchParams();
    const granularity = next.granularity ?? data.granularity;
    const year = next.year ?? data.year;
    const month = next.month ?? data.month;
    params.set("granularity", granularity);
    if (granularity !== "YEAR" && year) params.set("year", String(year));
    if (granularity === "WEEK" && month) params.set("month", String(month));
    router.push(`/admin/finance/statistics?${params}`);
  }

  return (
    <div className="space-y-5">
      {/* 컨트롤 바 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          {/* Granularity toggle */}
          <div className="inline-flex overflow-hidden rounded-lg border border-[#d5deea]">
            {GRANULARITIES.map((g) => {
              const active = data.granularity === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => navigate({ granularity: g.value })}
                  className={`px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                    active
                      ? "bg-[#3f74c7] text-white"
                      : "bg-white text-[#5d6f86] hover:bg-[#f4f7fb]"
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          {/* Year / Month pickers */}
          {data.granularity !== "YEAR" && (
            <label className="flex items-center gap-2 text-[12px] text-[#55697f]">
              <span className="font-semibold">연도</span>
              <select
                value={data.year ?? ""}
                onChange={(e) => navigate({ year: Number(e.target.value) })}
                className="h-8 rounded-lg border border-[#d5deea] px-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
              >
                {[2024, 2025, 2026].map((y) => (
                  <option key={y} value={y}>
                    {y}년
                  </option>
                ))}
              </select>
            </label>
          )}
          {data.granularity === "WEEK" && (
            <label className="flex items-center gap-2 text-[12px] text-[#55697f]">
              <span className="font-semibold">월</span>
              <select
                value={data.month ?? ""}
                onChange={(e) => navigate({ month: Number(e.target.value) })}
                className="h-8 rounded-lg border border-[#d5deea] px-2 text-[13px] focus:border-[#3f74c7] focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="ml-auto text-[12px] text-[#5d6f86]">
            {data.previousLabel && (
              <span>
                전기 비교: <span className="font-semibold text-[#0f1c2e]">{data.previousLabel}</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 요약 카드 (전기 대비) */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryWithDelta
          label="수입 합계"
          value={data.summary.incomeTotal}
          previous={data.previousSummary?.incomeTotal ?? null}
          accent={INCOME_COLOR}
        />
        <SummaryWithDelta
          label="지출 합계"
          value={data.summary.expenseTotal}
          previous={data.previousSummary?.expenseTotal ?? null}
          accent={EXPENSE_COLOR}
        />
        <SummaryWithDelta
          label="잔액"
          value={data.summary.balance}
          previous={data.previousSummary?.balance ?? null}
          accent={BALANCE_COLOR}
        />
      </div>

      {/* 추이 차트 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
        <div className="border-b border-[#e7eef7] px-5 py-3">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">기간별 추이</h2>
        </div>
        <div className="px-3 py-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.buckets} barGap={4}>
              <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#5d6f86", fontSize: 12 }}
                axisLine={{ stroke: "#d5deea" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5d6f86", fontSize: 11 }}
                axisLine={{ stroke: "#d5deea" }}
                tickLine={false}
                tickFormatter={(v: number) => formatShort(v)}
                width={70}
              />
              <Tooltip
                formatter={(v) => WON(Number(v ?? 0))}
                contentStyle={{ borderRadius: 8, border: "1px solid #dbe4f0", fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="incomeTotal" name="수입" fill={INCOME_COLOR} radius={[3, 3, 0, 0]} />
              <Bar dataKey="expenseTotal" name="지출" fill={EXPENSE_COLOR} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 대분류별 비중 (수입/지출) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BreakdownPie title="수입 대분류 비중" data={data.incomeByMajor} />
        <BreakdownPie title="지출 대분류 비중" data={data.expenseByMajor} />
      </div>
    </div>
  );
}

function SummaryWithDelta({
  label,
  value,
  previous,
  accent,
}: {
  label: string;
  value: number;
  previous: number | null;
  accent: string;
}) {
  const hasDelta = previous != null && previous !== 0;
  const delta = hasDelta ? ((value - previous!) / Math.abs(previous!)) * 100 : null;

  return (
    <div className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
      <p className="text-[11px] font-semibold text-[#55697f]">{label}</p>
      <p className="mt-1 text-[20px] font-bold tabular-nums" style={{ color: accent }}>
        {WON(value)}
      </p>
      {hasDelta ? (
        <p className="mt-1 text-[11px] text-[#5d6f86]">
          전기 대비{" "}
          <span className="font-semibold tabular-nums text-[#0f1c2e]">
            {delta! >= 0 ? "▲" : "▼"} {Math.abs(delta!).toFixed(1)}%
          </span>{" "}
          ({WON(previous!)})
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-[#a8b3c2]">전기 데이터 없음</p>
      )}
    </div>
  );
}

function BreakdownPie({ title, data }: { title: string; data: FinanceStatBreakdown[] }) {
  const visible = data.filter((d) => d.amount > 0);
  const total = visible.reduce((s, d) => s + d.amount, 0);

  return (
    <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
      <div className="border-b border-[#e7eef7] px-5 py-3">
        <h2 className="text-[14px] font-bold text-[#0f1c2e]">{title}</h2>
      </div>
      {visible.length === 0 ? (
        <div className="p-8 text-center text-[12px] text-[#5d6f86]">데이터 없음</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 px-3 py-4 lg:grid-cols-2">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={visible}
                dataKey="amount"
                nameKey="major"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                strokeWidth={0}
              >
                {visible.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => WON(Number(v ?? 0))}
                contentStyle={{ borderRadius: 8, border: "1px solid #dbe4f0", fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="flex flex-col justify-center gap-1.5 px-2 text-[12px]">
            {visible.map((d, i) => (
              <li key={d.major} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="flex-1 text-[#5d6f86]">{d.major}</span>
                <span className="tabular-nums text-[#0f1c2e]">{WON(d.amount)}</span>
                <span className="w-12 text-right tabular-nums text-[#5d6f86]">
                  {((d.amount / total) * 100).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function formatShort(n: number): string {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억`;
  if (n >= 10_000) return `${Math.round(n / 10_000)}만`;
  return n.toLocaleString("ko-KR");
}
