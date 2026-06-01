import "server-only";
import type {
  FinanceReportDetail,
  FinanceReportListQuery,
  FinanceReportPageResponse,
  FinanceReportSummary,
  FinanceStatBreakdown,
  FinanceStatBucket,
  FinanceStatQuery,
  FinanceStatResponse,
  FinanceStatSummary,
} from "@/lib/admin-finance-types";

/**
 * 백엔드 미구현 동안의 mock.
 * 실제 API: GET /api/v1/admin/finance/reports?year=&month=&page=&size=
 * 백엔드 완성 후 mockListFinanceReports를 adminApiFetch 호출로 교체.
 */
export async function listFinanceReports(
  q: FinanceReportListQuery,
): Promise<FinanceReportPageResponse> {
  return mockListFinanceReports(q);
}

// ── mock 구현 ───────────────────────────────────────────────────────────────

const MOCK_REPORTS: FinanceReportSummary[] = [
  mk(11, 2026, 5, 4, 6_800_000, 5_400_000, "시온재정_2026년5월4주.xlsx", "2026-05-25T10:12:00Z"),
  mk(10, 2026, 5, 3, 7_150_000, 5_758_000, "시온재정_2026년5월3주.xlsx", "2026-05-18T09:58:00Z"),
  mk(9, 2026, 5, 2, 5_900_000, 4_820_000, "시온재정_2026년5월2주.xlsx", "2026-05-11T10:05:00Z"),
  mk(8, 2026, 5, 1, 6_300_000, 5_120_000, "시온재정_2026년5월1주.xlsx", "2026-05-04T09:50:00Z"),
  mk(7, 2026, 4, 4, 6_500_000, 4_950_000, "시온재정_2026년4월4주.xlsx", "2026-04-27T10:00:00Z"),
  mk(6, 2026, 4, 3, 7_000_000, 6_100_000, "시온재정_2026년4월3주.xlsx", "2026-04-20T09:45:00Z", true),
  mk(5, 2026, 4, 2, 5_400_000, 4_300_000, "시온재정_2026년4월2주.xlsx", "2026-04-13T10:10:00Z"),
  mk(4, 2026, 4, 1, 5_800_000, 4_600_000, "시온재정_2026년4월1주.xlsx", "2026-04-06T09:55:00Z"),
  mk(3, 2026, 3, 4, 6_100_000, 5_050_000, "시온재정_2026년3월4주.xlsx", "2026-03-30T10:00:00Z"),
  mk(2, 2026, 3, 3, 6_400_000, 5_200_000, "시온재정_2026년3월3주.xlsx", "2026-03-23T09:50:00Z"),
  mk(1, 2026, 3, 2, 5_700_000, 4_400_000, "시온재정_2026년3월2주.xlsx", "2026-03-16T10:20:00Z"),
];

function mk(
  id: number,
  year: number,
  month: number,
  week: number,
  income: number,
  expense: number,
  file: string,
  uploadedAt: string,
  checksumMismatch = false,
): FinanceReportSummary {
  return {
    id,
    year,
    month,
    week,
    incomeTotal: income,
    expenseTotal: expense,
    balance: income - expense,
    sourceFilename: file,
    uploadedAt,
    checksumMismatch,
  };
}

async function mockListFinanceReports(
  q: FinanceReportListQuery,
): Promise<FinanceReportPageResponse> {
  let filtered = MOCK_REPORTS;
  if (q.year != null) filtered = filtered.filter((r) => r.year === q.year);
  if (q.month != null) filtered = filtered.filter((r) => r.month === q.month);
  const total = filtered.length;
  const start = q.page * q.size;
  const items = filtered.slice(start, start + q.size);
  return { items, hasNext: start + q.size < total, total };
}

/**
 * 백엔드 미구현 동안의 mock.
 * 실제 API: GET /api/v1/admin/finance/reports/{id}
 */
export async function getFinanceReport(id: number): Promise<FinanceReportDetail | null> {
  const summary = MOCK_REPORTS.find((r) => r.id === id);
  if (!summary) return null;
  return {
    id: summary.id,
    period: { year: summary.year, month: summary.month, week: summary.week },
    sourceFilename: summary.sourceFilename,
    uploadedAt: summary.uploadedAt,
    uploaderName: "Happy Zion 관리자",
    totals: {
      incomeTotal: summary.incomeTotal,
      expenseTotal: summary.expenseTotal,
      balance: summary.balance,
      formCellIncomeTotal: summary.checksumMismatch ? summary.incomeTotal + 50_000 : summary.incomeTotal,
      formCellExpenseTotal: summary.expenseTotal,
      checksumMismatch: summary.checksumMismatch,
    },
    lines: scaleMockLines(summary.incomeTotal, summary.expenseTotal),
    unexecutedItems:
      summary.id % 2 === 0
        ? [
            { content: "음향 장비 수리", amount: 300_000, executedDate: null, note: "견적 대기중" },
            {
              content: "교육관 의자 구입",
              amount: 450_000,
              executedDate: "2026-06-01",
              note: null,
            },
          ]
        : [],
  };
}

/**
 * mock 라인 데이터: 보고서별 수입/지출 합계에 맞춰 예시 라인을 비례 스케일.
 * 실제로는 백엔드가 finance_report_line에서 그대로 읽어온다.
 */
function scaleMockLines(income: number, expense: number) {
  const baseIncome = [
    { major: "십일조", minor: "십일조", weight: 0.448 },
    { major: "헌금", minor: "감사헌금", weight: 0.119 },
    { major: "헌금", minor: "주정헌금", weight: 0.21 },
    { major: "헌금", minor: "목장헌금", weight: 0.042 },
    { major: "특별헌금", minor: "선교헌금", weight: 0.056 },
    { major: "특별헌금", minor: "건축헌금", weight: 0.084 },
    { major: "특별헌금", minor: "꽃헌금", weight: 0.014 },
    { major: "찬조헌금", minor: "행사찬조", weight: 0.027 },
  ];
  const baseExpense = [
    { major: "목회자", minor: "헌금", weight: 0.434 },
    { major: "목회자", minor: "연금", weight: 0.043 },
    { major: "목회자", minor: "실손보험", weight: 0.016 },
    { major: "목회자", minor: "은퇴비적립", weight: 0.035 },
    { major: "목회자", minor: "자녀교육비", weight: 0.052 },
    { major: "선교비", minor: "교회선교", weight: 0.061 },
    { major: "선교비", minor: "해외선교", weight: 0.087 },
    { major: "선교비적립", minor: "해외선교적립", weight: 0.035 },
    { major: "교회유지", minor: "세스코", weight: 0.015 },
    { major: "교회유지", minor: "화재보험", weight: 0.021 },
    { major: "특별헌금", minor: "선교헌금", weight: 0.069 },
    { major: "행사비", minor: "교회행사", weight: 0.026 },
    { major: "카드성물", minor: "농협", weight: 0.04 },
    { major: "경비", minor: "주일식사비", weight: 0.031 },
    { major: "경비", minor: "전도활동비", weight: 0.01 },
    { major: "경비", minor: "공과금", weight: 0.017 },
    { major: "경비", minor: "통신비", weight: 0.008 },
  ];
  return [
    ...baseIncome.map((l) => ({
      direction: "INCOME" as const,
      major: l.major,
      minor: l.minor,
      amount: Math.round((income * l.weight) / 1000) * 1000,
    })),
    ...baseExpense.map((l) => ({
      direction: "EXPENSE" as const,
      major: l.major,
      minor: l.minor,
      amount: Math.round((expense * l.weight) / 1000) * 1000,
    })),
  ];
}

/* ── 통계 ──────────────────────────────────────────────── */

/**
 * 백엔드 미구현 동안의 mock.
 * 실제 API: GET /api/v1/admin/finance/statistics?granularity=...&year=...&month=...
 */
export async function getFinanceStatistics(
  q: FinanceStatQuery,
): Promise<FinanceStatResponse> {
  return mockGetFinanceStatistics(q);
}

const INCOME_MAJORS = ["십일조", "헌금", "특별헌금", "찬조헌금"] as const;
const INCOME_WEIGHTS = [0.448, 0.371, 0.154, 0.027];
const EXPENSE_MAJORS = [
  "목회자",
  "선교비",
  "선교비적립",
  "교회유지",
  "특별헌금",
  "행사비",
  "고정자산",
  "카드성물",
  "경비",
] as const;
const EXPENSE_WEIGHTS = [0.58, 0.148, 0.035, 0.036, 0.069, 0.026, 0.0, 0.04, 0.066];

function sumReports(reports: FinanceReportSummary[]): FinanceStatSummary {
  return reports.reduce(
    (acc, r) => ({
      incomeTotal: acc.incomeTotal + r.incomeTotal,
      expenseTotal: acc.expenseTotal + r.expenseTotal,
      balance: acc.balance + r.balance,
    }),
    { incomeTotal: 0, expenseTotal: 0, balance: 0 },
  );
}

function breakdown(
  total: number,
  majors: readonly string[],
  weights: number[],
): FinanceStatBreakdown[] {
  return majors.map((m, i) => ({
    major: m,
    amount: Math.round((total * weights[i]) / 1000) * 1000,
  }));
}

function mockGetFinanceStatistics(q: FinanceStatQuery): FinanceStatResponse {
  const year = q.year ?? 2026;
  let buckets: FinanceStatBucket[] = [];
  let scopeReports: FinanceReportSummary[] = [];
  let previousSummary: FinanceStatSummary | null = null;
  let previousLabel: string | null = null;

  if (q.granularity === "WEEK") {
    const month = q.month ?? 5;
    scopeReports = MOCK_REPORTS.filter((r) => r.year === year && r.month === month);
    buckets = [1, 2, 3, 4, 5].map((w) => {
      const r = scopeReports.find((x) => x.week === w);
      return {
        label: `${w}주`,
        incomeTotal: r?.incomeTotal ?? 0,
        expenseTotal: r?.expenseTotal ?? 0,
        balance: r?.balance ?? 0,
      };
    });
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prev = MOCK_REPORTS.filter((r) => r.year === prevYear && r.month === prevMonth);
    if (prev.length) {
      previousSummary = sumReports(prev);
      previousLabel = `${prevYear}년 ${prevMonth}월`;
    }
  } else if (q.granularity === "MONTH") {
    scopeReports = MOCK_REPORTS.filter((r) => r.year === year);
    buckets = Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
      const monthReports = scopeReports.filter((r) => r.month === m);
      const s = sumReports(monthReports);
      return { label: `${m}월`, ...s };
    });
    const prev = MOCK_REPORTS.filter((r) => r.year === year - 1);
    if (prev.length) {
      previousSummary = sumReports(prev);
      previousLabel = `${year - 1}년`;
    }
  } else if (q.granularity === "QUARTER") {
    scopeReports = MOCK_REPORTS.filter((r) => r.year === year);
    buckets = [1, 2, 3, 4].map((q4) => {
      const months = [q4 * 3 - 2, q4 * 3 - 1, q4 * 3];
      const qReports = scopeReports.filter((r) => months.includes(r.month));
      const s = sumReports(qReports);
      return { label: `${q4}분기`, ...s };
    });
    const prev = MOCK_REPORTS.filter((r) => r.year === year - 1);
    if (prev.length) {
      previousSummary = sumReports(prev);
      previousLabel = `${year - 1}년`;
    }
  } else {
    // YEAR
    const years = Array.from(new Set(MOCK_REPORTS.map((r) => r.year))).sort();
    buckets = years.map((y) => {
      const yReports = MOCK_REPORTS.filter((r) => r.year === y);
      const s = sumReports(yReports);
      return { label: `${y}년`, ...s };
    });
    scopeReports = MOCK_REPORTS;
  }

  const summary = sumReports(scopeReports);

  return {
    granularity: q.granularity,
    year: q.granularity === "YEAR" ? undefined : year,
    month: q.granularity === "WEEK" ? (q.month ?? 5) : undefined,
    buckets,
    summary,
    previousSummary,
    previousLabel,
    incomeByMajor: breakdown(summary.incomeTotal, INCOME_MAJORS, INCOME_WEIGHTS),
    expenseByMajor: breakdown(summary.expenseTotal, EXPENSE_MAJORS, EXPENSE_WEIGHTS),
  };
}
