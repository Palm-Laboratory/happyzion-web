"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  FinanceStatBreakdown,
  FinanceStatBucket,
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

const INCOME_COLOR = "#B73838";
const EXPENSE_COLOR = "#3a6db5";
const BALANCE_COLOR = "#1d6f42";

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

type SelectedItem = { direction: "INCOME" | "EXPENSE"; major: string } | null;

export default function FinanceStatisticsClient({ data }: { data: FinanceStatResponse }) {
  const router = useRouter();
  /** 차트의 특정 칸을 클릭하면 그 칸 라벨 저장. null이면 전체 집계. */
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [showYoy, setShowYoy] = useState(false);

// granularity/연도/월이 바뀌면 선택 해제
  useEffect(() => {
    setSelectedLabel(null);
  }, [data.granularity, data.year, data.month]);

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

  // 선택된 칸이 있으면 그 칸만, 없으면 전체 합산
  const selectedIndex = selectedLabel
    ? data.buckets.findIndex((b) => b.label === selectedLabel)
    : -1;
  const selectedBucket: FinanceStatBucket | null =
    selectedIndex >= 0 ? data.buckets[selectedIndex] : null;
  const displaySummary = selectedBucket
    ? {
        incomeTotal: selectedBucket.incomeTotal,
        expenseTotal: selectedBucket.expenseTotal,
        balance: selectedBucket.balance,
      }
    : data.summary;

  // 전체 대분류 항목 목록 (드롭다운용)
  const allIncomeMajors = Array.from(new Set(data.buckets.flatMap((b) => b.incomeByMajor.map((m) => m.major))));
  const allExpenseMajors = Array.from(new Set(data.buckets.flatMap((b) => b.expenseByMajor.map((m) => m.major))));

  // 전년 동기 차트 데이터
  const yoyChartBuckets = data.buckets.map((b) => {
    const yoy = b.yoySummary;
    if (!yoy) return { label: b.label, yoyIncome: null, yoyExpense: null };
    if (selectedItem) {
      const amount = selectedItem.direction === "INCOME"
        ? (yoy.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? null)
        : (yoy.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? null);
      return {
        label: b.label,
        yoyIncome: selectedItem.direction === "INCOME" ? amount : null,
        yoyExpense: selectedItem.direction === "EXPENSE" ? amount : null,
      };
    }
    return { label: b.label, yoyIncome: yoy.incomeTotal, yoyExpense: yoy.expenseTotal };
  });

  // hasData=false 구간은 null로 변환 (차트에서 선 끊김 처리)
  // selectedItem이 있으면 해당 항목 금액만, 없으면 전체
  const chartBuckets = data.buckets.map((b) => {
    if (!b.hasData) return { ...b, incomeTotal: null, expenseTotal: null, balance: null };
    if (selectedItem) {
      const amount = selectedItem.direction === "INCOME"
        ? (b.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0)
        : (b.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0);
      return {
        ...b,
        incomeTotal: selectedItem.direction === "INCOME" ? amount : null,
        expenseTotal: selectedItem.direction === "EXPENSE" ? amount : null,
        balance: null,
      };
    }
    return { ...b, incomeTotal: b.incomeTotal, expenseTotal: b.expenseTotal, balance: b.balance };
  }).map((b, i) => ({ ...b, ...yoyChartBuckets[i] }));

  // 전체 누적 잔액
  const totalCumulativeBalance = data.cumulativeStartBalance + data.summary.balance;

  // 누적 잔액: 기간 시작 이전 누적 잔액 + 버킷별 누적 합산
  const cumulativeBalanceData = data.buckets.reduce<{ label: string; cumulativeBalance: number | null }[]>(
    (acc, b) => {
      if (!b.hasData) {
        acc.push({ label: b.label, cumulativeBalance: null });
      } else {
        const prev = acc.findLast((a) => a.cumulativeBalance != null)?.cumulativeBalance ?? data.cumulativeStartBalance;
        acc.push({ label: b.label, cumulativeBalance: prev + b.balance });
      }
      return acc;
    },
    [],
  );

  // 선택된 구간의 누적 잔액
  const selectedCumulativeBalance = selectedIndex >= 0
    ? (cumulativeBalanceData[selectedIndex]?.cumulativeBalance ?? totalCumulativeBalance)
    : totalCumulativeBalance;

  // 누적 잔액 전기 대비: 구간 선택 시 이전 구간 누적 잔액, 미선택 시 기간 시작 이전 누적 잔액
  const previousCumulativeBalance = selectedIndex >= 0
    ? (cumulativeBalanceData.slice(0, selectedIndex).findLast((a) => a.cumulativeBalance != null)?.cumulativeBalance ?? data.cumulativeStartBalance)
    : data.cumulativeStartBalance || null;

  const cumulativePeriodLabel = selectedBucket
    ? data.granularity === "WEEK" && data.year && data.month
      ? `${data.year}년 ${data.month}월 ${selectedBucket.label} 기준`
      : `${selectedBucket.label} 기준`
    : data.granularity === "WEEK" && data.year && data.month
      ? `${data.year}년 ${data.month}월 기준`
      : (data.granularity === "MONTH" || data.granularity === "QUARTER") && data.year
      ? `${data.year}년 기준`
      : "전체 기준";

  // 요약 카드에 표시할 기간 라벨
  const summaryPeriodLabel = selectedBucket
    ? selectedBucket.label
    : data.granularity === "WEEK"
      ? `${data.year}년 ${data.month}월 전체`
      : data.granularity === "MONTH"
        ? `${data.year}년 전체`
        : data.granularity === "QUARTER"
          ? `${data.year}년 전체`
          : "전체";

  const displayPrevious = selectedBucket
    ? selectedBucket.previousSummary
    : data.previousSummary;

  const deltaLabel = (() => {
    if (data.granularity === "WEEK") return selectedBucket ? "전주 대비" : "전월 대비";
    if (data.granularity === "MONTH") return selectedBucket ? "전월 대비" : "전연도 대비";
    if (data.granularity === "QUARTER") return selectedBucket ? "전분기 대비" : "전연도 대비";
    // YEAR
    return selectedBucket ? "전연도 대비" : null;
  })();

  // 항목 선택 시 해당 방향의 합계만 계산
  const itemDisplayIncome: number | null = selectedItem
    ? selectedItem.direction === "INCOME"
      ? (selectedBucket
          ? (selectedBucket.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0)
          : data.buckets.filter((b) => b.hasData).reduce((sum, b) => sum + (b.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0), 0))
      : null
    : null;

  const itemDisplayExpense: number | null = selectedItem
    ? selectedItem.direction === "EXPENSE"
      ? (selectedBucket
          ? (selectedBucket.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0)
          : data.buckets.filter((b) => b.hasData).reduce((sum, b) => sum + (b.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0), 0))
      : null
    : null;

  // 항목 선택 시 이전 구간 해당 항목 금액 (전기 대비용)
  const prevSource = selectedBucket?.previousSummary ?? data.previousSummary;
  const itemPreviousIncome: number | null = selectedItem?.direction === "INCOME" && prevSource
    ? (prevSource.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0)
    : null;
  const itemPreviousExpense: number | null = selectedItem?.direction === "EXPENSE" && prevSource
    ? (prevSource.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? 0)
    : null;

  // 전년 동기 누적 잔액 배열 계산
  const yoyCumulativeBalanceData = data.buckets.reduce<{ label: string; cumulativeBalance: number | null }[]>(
    (acc, b) => {
      if (!b.yoySummary) {
        acc.push({ label: b.label, cumulativeBalance: null });
      } else {
        const prev = acc.findLast((a) => a.cumulativeBalance != null)?.cumulativeBalance ?? data.yoyCumulativeStartBalance;
        acc.push({ label: b.label, cumulativeBalance: prev + b.yoySummary.balance });
      }
      return acc;
    },
    [],
  );

  // yoy 누적 잔액 배열을 cumulativeBalanceData에 merge
  const mergedCumulativeData = cumulativeBalanceData.map((d, i) => ({
    ...d,
    yooCumulativeBalance: yoyCumulativeBalanceData[i]?.cumulativeBalance ?? null,
  }));

  // 전년 동기 값 계산 — 체크박스 ON + 특정 구간 선택 시에만 표시
  const yoySource = showYoy && selectedBucket ? selectedBucket.yoySummary : null;
  const yoyCumulativeBalance = showYoy && selectedIndex >= 0
    ? (yoyCumulativeBalanceData[selectedIndex]?.cumulativeBalance ?? null)
    : null;
  const yoyIncome = yoySource
    ? (selectedItem?.direction === "INCOME"
        ? (yoySource.incomeByMajor.find((m) => m.major === selectedItem.major)?.amount ?? null)
        : (selectedItem?.direction === "EXPENSE" ? null : yoySource.incomeTotal))
    : null;
  const yoyExpense = yoySource
    ? (selectedItem?.direction === "EXPENSE"
        ? (yoySource.expenseByMajor.find((m) => m.major === selectedItem.major)?.amount ?? null)
        : (selectedItem?.direction === "INCOME" ? null : yoySource.expenseTotal))
    : null;

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

        </div>
      </section>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3">
        {itemDisplayIncome === null && selectedItem ? (
          <div className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
            <p className="text-[11px] font-semibold text-[#55697f]">수입 합계</p>
            <p className="mt-1 text-[20px] font-bold text-[#c8d6e8]">— —</p>
            <p className="mt-1 text-[11px] text-[#a8b3c2]">전기 데이터 없음</p>
          </div>
        ) : (
          <SummaryWithDelta
            label="수입 합계"
            periodLabel={summaryPeriodLabel}
            value={itemDisplayIncome ?? displaySummary.incomeTotal}
            previous={itemPreviousIncome ?? (selectedItem ? null : (deltaLabel ? (displayPrevious?.incomeTotal ?? null) : null))}
            yoy={yoyIncome}
            yoyMissing={showYoy && !!selectedBucket && !yoySource}
            accent={INCOME_COLOR}
            deltaLabel={deltaLabel ?? "전기 대비"}
          />
        )}
        {itemDisplayExpense === null && selectedItem ? (
          <div className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
            <p className="text-[11px] font-semibold text-[#55697f]">지출 합계</p>
            <p className="mt-1 text-[20px] font-bold text-[#c8d6e8]">— —</p>
            <p className="mt-1 text-[11px] text-[#a8b3c2]">전기 데이터 없음</p>
          </div>
        ) : (
          <SummaryWithDelta
            label="지출 합계"
            periodLabel={summaryPeriodLabel}
            value={itemDisplayExpense ?? displaySummary.expenseTotal}
            previous={itemPreviousExpense ?? (selectedItem ? null : (deltaLabel ? (displayPrevious?.expenseTotal ?? null) : null))}
            yoy={yoyExpense}
            yoyMissing={showYoy && !!selectedBucket && !yoySource}
            accent={EXPENSE_COLOR}
            deltaLabel={deltaLabel ?? "전기 대비"}
          />
        )}
        <SummaryWithDelta
          label="누적 잔액"
          periodLabel={cumulativePeriodLabel}
          value={selectedCumulativeBalance}
          previous={deltaLabel ? previousCumulativeBalance : null}
          yoy={yoyCumulativeBalance}
          yoyMissing={showYoy && !!selectedBucket && !selectedBucket.yoySummary}
          accent={BALANCE_COLOR}
          hideDeltaIfNull
          deltaLabel={deltaLabel ?? "전기 대비"}
        />
      </div>

      {/* 추이 차트 + 누적 잔액 차트 */}
      <div className="grid grid-cols-3 gap-3">
      <section className="col-span-2 rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e7eef7] px-5 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-bold text-[#0f1c2e]">기간별 추이</h2>
            {selectedBucket && (
              <div className="flex items-center gap-2 text-[12px]">
                <span className="text-[#5d6f86]">선택된 기간:</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-3 py-1 font-semibold text-[#3f74c7]">
                  {selectedBucket.label}
                  <button
                    type="button"
                    onClick={() => setSelectedLabel(null)}
                    className="-mr-1 flex h-4 w-4 items-center justify-center rounded-full text-[#3f74c7] hover:bg-white/60"
                    aria-label="선택 해제"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-1.5 text-[12px] text-[#55697f]">
              <input
                type="checkbox"
                checked={showYoy}
                onChange={(e) => setShowYoy(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#3f74c7]"
              />
              전년 동기 비교
            </label>
            <select
            value={selectedItem ? `${selectedItem.direction}:${selectedItem.major}` : ""}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) { setSelectedItem(null); return; }
              const [direction, major] = val.split(":") as ["INCOME" | "EXPENSE", string];
              setSelectedItem({ direction, major });
            }}
            className="rounded-lg border border-[#d5deea] bg-white px-3 py-1.5 text-[12px] text-[#0f1c2e] focus:outline-none"
          >
            <option value="">전체</option>
            {allIncomeMajors.length > 0 && (
              <optgroup label="── 수입 ──">
                {allIncomeMajors.map((major) => (
                  <option key={`INCOME:${major}`} value={`INCOME:${major}`}>{major}</option>
                ))}
              </optgroup>
            )}
            {allExpenseMajors.length > 0 && (
              <optgroup label="── 지출 ──">
                {allExpenseMajors.map((major) => (
                  <option key={`EXPENSE:${major}`} value={`EXPENSE:${major}`}>{major}</option>
                ))}
              </optgroup>
            )}
          </select>
          </div>
        </div>
        <div className="px-3 py-4 [&_*]:!outline-none">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              key={`${data.granularity}-${data.year ?? "all"}-${data.month ?? "all"}`}
              data={chartBuckets}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
              onClick={(state) => {
                const raw = state?.activeLabel;
                if (raw == null) return;
                const label = String(raw);
                const bucket = data.buckets.find((b) => b.label === label);
                if (!bucket?.hasData) return;
                setSelectedLabel((cur) => (cur === label ? null : label));
              }}
              onMouseMove={(state) => {
                const raw = state?.activeLabel;
                if (raw != null) {
                  const label = String(raw);
                  const bucket = data.buckets.find((b) => b.label === label);
                  setHoveredLabel(bucket?.hasData ? label : null);
                } else {
                  setHoveredLabel(null);
                }
              }}
              onMouseLeave={() => setHoveredLabel(null)}
              style={{ cursor: "pointer" }}
            >
              <defs>
                  <linearGradient id="gradIncomeStat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={INCOME_COLOR} stopOpacity={0.45} />
                  <stop offset="30%" stopColor={INCOME_COLOR} stopOpacity={0.15} />
                  <stop offset="65%" stopColor={INCOME_COLOR} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExpenseStat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={EXPENSE_COLOR} stopOpacity={0.45} />
                  <stop offset="30%" stopColor={EXPENSE_COLOR} stopOpacity={0.15} />
                  <stop offset="65%" stopColor={EXPENSE_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#5d6f86", fontSize: 12 }}
                axisLine={{ stroke: "#d5deea" }}
                tickLine={false}
                padding={{ left: 32, right: 32 }}
              />
              {/* 각 구간 수직선: 평상시 연한 점선, hover/선택 시 진한 점선 */}
              {data.buckets.map((b) => {
                const isSelected = b.label === selectedLabel;
                const isHovered = b.label === hoveredLabel;
                return (
                  <ReferenceLine
                    key={b.label}
                    x={b.label}
                    stroke={isSelected ? "#8a9ab5" : "#c8d6e8"}
                    strokeWidth={isSelected || isHovered ? 1.5 : 1}
                    strokeDasharray="4 4"
                    strokeOpacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.5}
                    ifOverflow="extendDomain"
                  />
                );
              })}
              {/* 선택된 구간 하이라이트 배경 */}
              {selectedLabel && (
                <ReferenceLine
                  x={selectedLabel}
                  stroke="#8a9ab5"
                  strokeWidth={64}
                  strokeOpacity={0.08}
                  ifOverflow="extendDomain"
                />
              )}
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
              {(!selectedItem || selectedItem.direction === "INCOME") && (
                <Area
                  type="linear"
                  dataKey="incomeTotal"
                  name={selectedItem ? selectedItem.major : "수입"}
                  stroke={INCOME_COLOR}
                  strokeWidth={2.5}
                  fill="url(#gradIncomeStat)"
                  connectNulls={false}
                  dot={(props) => props.value == null || props.cy == null ? <g key={props.key} /> : <circle key={props.key} cx={props.cx} cy={props.cy} r={3} fill={INCOME_COLOR} strokeWidth={0} />}
                  activeDot={(props) => props.value == null ? <g /> : <circle cx={props.cx} cy={props.cy} r={5} fill={INCOME_COLOR} strokeWidth={0} />}
                />
              )}
              {(!selectedItem || selectedItem.direction === "EXPENSE") && (
                <Area
                  type="linear"
                  dataKey="expenseTotal"
                  name={selectedItem ? selectedItem.major : "지출"}
                  stroke={EXPENSE_COLOR}
                  strokeWidth={2.5}
                  fill="url(#gradExpenseStat)"
                  connectNulls={false}
                  dot={(props) => props.value == null || props.cy == null ? <g key={props.key} /> : <circle key={props.key} cx={props.cx} cy={props.cy} r={3} fill={EXPENSE_COLOR} strokeWidth={0} />}
                  activeDot={(props) => props.value == null ? <g /> : <circle cx={props.cx} cy={props.cy} r={5} fill={EXPENSE_COLOR} strokeWidth={0} />}
                />
              )}
              {showYoy && (!selectedItem || selectedItem.direction === "INCOME") && (
                <Line
                  type="linear"
                  dataKey="yoyIncome"
                  name="전년 동기 수입"
                  stroke={INCOME_COLOR}
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                  strokeOpacity={0.6}
                  dot={false}
                  connectNulls={false}
                  legendType="none"
                />
              )}
              {showYoy && (!selectedItem || selectedItem.direction === "EXPENSE") && (
                <Line
                  type="linear"
                  dataKey="yoyExpense"
                  name="전년 동기 지출"
                  stroke={EXPENSE_COLOR}
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                  strokeOpacity={0.6}
                  dot={false}
                  connectNulls={false}
                  legendType="none"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 누적 잔액 차트 */}
      <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
        <div className="border-b border-[#e7eef7] px-5 py-3">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">누적 잔액</h2>
        </div>
        <div className="px-3 py-4 [&_*]:!outline-none">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart key={`cumbal-${data.granularity}-${data.year ?? "all"}-${data.month ?? "all"}`} data={mergedCumulativeData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCumBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BALANCE_COLOR} stopOpacity={0.45} />
                  <stop offset="30%" stopColor={BALANCE_COLOR} stopOpacity={0.15} />
                  <stop offset="65%" stopColor={BALANCE_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#5d6f86", fontSize: 11 }}
                axisLine={{ stroke: "#d5deea" }}
                tickLine={false}
                padding={{ left: 16, right: 16 }}
              />
              <YAxis
                tick={{ fill: "#5d6f86", fontSize: 11 }}
                axisLine={{ stroke: "#d5deea" }}
                tickLine={false}
                tickFormatter={(v: number) => formatShort(v)}
                width={60}
                domain={
                  data.granularity === "WEEK" ? [70_000_000, 90_000_000] :
                  data.granularity === "QUARTER" ? [65_000_000, 90_000_000] :
                  data.granularity === "YEAR" ? [50_000_000, 90_000_000] :
                  ["auto", "auto"]
                }
                ticks={
                  data.granularity === "WEEK" ? [70_000_000, 75_000_000, 80_000_000, 85_000_000, 90_000_000] :
                  data.granularity === "QUARTER" ? [65_000_000, 70_000_000, 75_000_000, 80_000_000, 85_000_000, 90_000_000] :
                  data.granularity === "YEAR" ? [50_000_000, 60_000_000, 70_000_000, 80_000_000, 90_000_000] :
                  undefined
                }
              />
              <Tooltip
                formatter={(v) => WON(Number(v ?? 0))}
                contentStyle={{ borderRadius: 8, border: "1px solid #dbe4f0", fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {data.buckets.map((b) => (
                <ReferenceLine
                  key={b.label}
                  x={b.label}
                  stroke="#c8d6e8"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  ifOverflow="extendDomain"
                />
              ))}
              {selectedLabel && (
                <ReferenceLine
                  x={selectedLabel}
                  stroke="#8a9ab5"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  strokeOpacity={0.8}
                  ifOverflow="extendDomain"
                />
              )}
              <Area
                type="linear"
                dataKey="cumulativeBalance"
                name="누적 잔액"
                stroke={BALANCE_COLOR}
                strokeWidth={2.5}
                fill="url(#gradCumBalance)"
                connectNulls={false}
                dot={(props) => props.value == null || props.cy == null ? <g key={props.key} /> : <circle key={props.key} cx={props.cx} cy={props.cy} r={3} fill={BALANCE_COLOR} strokeWidth={0} />}
                activeDot={(props) => props.value == null ? <g /> : <circle cx={props.cx} cy={props.cy} r={5} fill={BALANCE_COLOR} strokeWidth={0} />}
              />
              {showYoy && (
                <Line
                  type="linear"
                  dataKey="yooCumulativeBalance"
                  name="전년 동기 누적 잔액"
                  stroke={BALANCE_COLOR}
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                  strokeOpacity={0.5}
                  dot={false}
                  connectNulls={false}
                  legendType="none"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      </div>

      {/* 대분류별 비중 (수입/지출) — 선택된 칸이 있으면 그 칸 기준, 없으면 전체 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BreakdownPie
          title="수입 대분류 비중"
          periodLabel={selectedBucket?.label}
          data={selectedBucket ? selectedBucket.incomeByMajor : data.incomeByMajor}
        />
        <BreakdownPie
          title="지출 대분류 비중"
          periodLabel={selectedBucket?.label}
          data={selectedBucket ? selectedBucket.expenseByMajor : data.expenseByMajor}
        />
      </div>
    </div>
  );
}

function DeltaLine({ value, previous, label }: { value: number; previous: number | null; label: string }) {
  if (previous == null) return null;
  if (previous === 0) return <p className="text-[11px] text-[#a8b3c2]">{label} 데이터 없음</p>;
  const delta = ((value - previous) / Math.abs(previous)) * 100;
  return (
    <p className="text-[11px] text-[#5d6f86]">
      {label}{" "}
      <span className="font-semibold tabular-nums" style={{ color: delta >= 0 ? "#e07080" : "#2471a3" }}>
        {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
      </span>{" "}
      ({WON(previous)})
    </p>
  );
}

function SummaryWithDelta({
  label,
  periodLabel,
  value,
  previous,
  yoy,
  yoyMissing = false,
  accent,
  hideDeltaIfNull = false,
  deltaLabel = "전기 대비",
}: {
  label: string;
  periodLabel?: string;
  value: number;
  previous: number | null;
  yoy?: number | null;
  yoyMissing?: boolean;
  accent: string;
  hideDeltaIfNull?: boolean;
  deltaLabel?: string;
}) {
  const hasDelta = previous != null && previous !== 0;

  return (
    <div className="rounded-2xl border border-[#dbe4f0] bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <p className="text-[11px] font-semibold text-[#55697f]">{label}</p>
        {periodLabel && (
          <span className="rounded-full bg-[#f0f4fb] px-2 py-0.5 text-[10px] font-semibold text-[#3f74c7]">
            {periodLabel}
          </span>
        )}
      </div>
      <p className="mt-1 text-[20px] font-bold tabular-nums" style={{ color: accent }}>
        {WON(value)}
      </p>
      <div className="mt-1 flex items-center gap-3">
        {hasDelta ? (
          <DeltaLine value={value} previous={previous} label={deltaLabel} />
        ) : !hideDeltaIfNull ? (
          <p className="text-[11px] text-[#a8b3c2]">전기 데이터 없음</p>
        ) : null}
        {yoy != null ? (
          <>
            {(hasDelta || !hideDeltaIfNull) && <span className="text-[11px] text-[#d5deea]">|</span>}
            <DeltaLine value={value} previous={yoy} label="전년 동기" />
          </>
        ) : yoyMissing ? (
          <>
            {(hasDelta || !hideDeltaIfNull) && <span className="text-[11px] text-[#d5deea]">|</span>}
            <p className="text-[11px] text-[#a8b3c2]">전년 동기 데이터 없음</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function BreakdownPie({ title, periodLabel, data }: { title: string; periodLabel?: string; data: FinanceStatBreakdown[] }) {
  const visible = data.filter((d) => d.amount > 0);
  const total = visible.reduce((s, d) => s + d.amount, 0);

  return (
    <section className="rounded-2xl border border-[#dbe4f0] bg-white shadow-sm">
      <div className="border-b border-[#e7eef7] px-5 py-3">
          <h2 className="text-[14px] font-bold text-[#0f1c2e]">
            {title}{periodLabel && (
              <span className="ml-1 text-[#3f74c7]">· {periodLabel}</span>
            )}
          </h2>
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
