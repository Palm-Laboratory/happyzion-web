"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type TrendPoint = {
  label: string;
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
  isCurrentMonth: boolean;
};

const INCOME_COLOR = "#B73838";
const EXPENSE_COLOR = "#3a6db5";

const WON = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function formatShort(n: number): string {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억`;
  if (n >= 10_000) return `${Math.round(n / 10_000)}만`;
  return n.toLocaleString("ko-KR");
}

export default function FinanceTrendMiniChart({ data, height = 200, currentLabel }: { data: TrendPoint[]; height?: number; currentLabel?: string }) {
  return (
    <div className="[&_*]:!outline-none">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={INCOME_COLOR} stopOpacity={0.45} />
              <stop offset="30%" stopColor={INCOME_COLOR} stopOpacity={0.15} />
              <stop offset="65%" stopColor={INCOME_COLOR} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
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
            padding={{ left: 32, right: 250 }}
          />
          <YAxis
            tick={{ fill: "#5d6f86", fontSize: 11 }}
            axisLine={{ stroke: "#d5deea" }}
            tickLine={false}
            tickFormatter={formatShort}
            width={70}
          />
          <Tooltip
            formatter={(v, name) => [WON(Number(v)), name]}
            contentStyle={{ borderRadius: 8, border: "1px solid #dbe4f0", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {data.map((d) => {
            const isCurrent = d.label === currentLabel;
            return (
              <ReferenceLine
                key={d.label}
                x={d.label}
                stroke={isCurrent ? "#8a9ab5" : "#c8d6e8"}
                strokeWidth={isCurrent ? 1.5 : 1}
                strokeDasharray="4 4"
                strokeOpacity={isCurrent ? 0.9 : 0.5}
                ifOverflow="extendDomain"
              />
            );
          })}
          <Area type="linear" dataKey="incomeTotal" name="수입" stroke={INCOME_COLOR} strokeWidth={2.5} fill="url(#gradIncome)" dot={{ r: 3, strokeWidth: 0, fill: INCOME_COLOR }} activeDot={{ r: 5 }} />
          <Area type="linear" dataKey="expenseTotal" name="지출" stroke={EXPENSE_COLOR} strokeWidth={2.5} fill="url(#gradExpense)" dot={{ r: 3, strokeWidth: 0, fill: EXPENSE_COLOR }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
