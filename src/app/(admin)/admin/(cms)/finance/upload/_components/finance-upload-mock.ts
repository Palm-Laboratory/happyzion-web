import type { FinanceParsePreview } from "@/lib/admin-finance-types";

/**
 * 백엔드 파서가 완성되기 전 임시 mock.
 * 검증된 예시 파일(시온재정_예시작성.xlsx)의 파싱 결과를 그대로 재현한다.
 * 실제 API: POST /api/v1/admin/finance/reports/preview (multipart 업로드)
 */
export function mockParsePreview(filename: string): FinanceParsePreview {
  const incomeLines = [
    { major: "십일조", minor: "십일조", amount: 3_200_000 },
    { major: "헌금", minor: "감사헌금", amount: 850_000 },
    { major: "헌금", minor: "주정헌금", amount: 1_500_000 },
    { major: "헌금", minor: "목장헌금", amount: 300_000 },
    { major: "헌금", minor: "절기감사", amount: 0 },
    { major: "특별헌금", minor: "선교헌금", amount: 400_000 },
    { major: "특별헌금", minor: "건축헌금", amount: 600_000 },
    { major: "특별헌금", minor: "꽃헌금", amount: 100_000 },
    { major: "특별헌금", minor: "목적헌금", amount: 0 },
    { major: "찬조헌금", minor: "행사찬조", amount: 200_000 },
  ].map((l) => ({ ...l, direction: "INCOME" as const, detail: null }));

  const expenseLines = [
    { major: "목회자", minor: "십일조", amount: 0 },
    { major: "목회자", minor: "헌금", amount: 2_500_000 },
    { major: "목회자", minor: "은급비", amount: 0 },
    { major: "목회자", minor: "연금", amount: 250_000 },
    { major: "목회자", minor: "실손보험", amount: 90_000 },
    { major: "목회자", minor: "은퇴비적립", amount: 200_000 },
    { major: "목회자", minor: "자녀교육비", amount: 300_000 },
    { major: "선교비", minor: "하늘보화", amount: 0 },
    { major: "선교비", minor: "교회선교", amount: 350_000 },
    { major: "선교비", minor: "성도선교", amount: 0 },
    { major: "선교비", minor: "해외선교", amount: 500_000 },
    { major: "선교비적립", minor: "해외선교적립", amount: 200_000 },
    { major: "교회유지", minor: "세스코", amount: 88_000 },
    { major: "교회유지", minor: "화재보험", amount: 120_000 },
    { major: "교회유지", minor: "건물유지소모품비", amount: 0 },
    { major: "특별헌금", minor: "선교헌금", amount: 400_000 },
    { major: "특별헌금", minor: "건축헌금", amount: 0 },
    { major: "특별헌금", minor: "꽃헌금", amount: 0 },
    { major: "특별헌금", minor: "목적헌금", amount: 0 },
    { major: "행사비", minor: "교회행사", amount: 150_000 },
    { major: "행사비", minor: "기도원", amount: 0 },
    { major: "행사비", minor: "기타", amount: 0 },
    { major: "찬조헌금", minor: "행사찬조", amount: 0 },
    { major: "고정자산", minor: "교회비품", amount: 0 },
    { major: "카드성물", minor: "농협", amount: 230_000 },
    { major: "카드성물", minor: "삼성", amount: 0 },
    { major: "카드성물", minor: "신한", amount: 0 },
    { major: "경비", minor: "주일식사비", amount: 180_000 },
    { major: "경비", minor: "주간부식비", amount: 0 },
    { major: "경비", minor: "전도활동비", amount: 60_000 },
    { major: "경비", minor: "공과금", amount: 95_000 },
    { major: "경비", minor: "세금", amount: 0 },
    { major: "경비", minor: "노회비", amount: 0 },
    { major: "경비", minor: "통신비", amount: 45_000 },
    { major: "경비", minor: "의료비", amount: 0 },
    { major: "경비", minor: "차량유지비", amount: 0 },
    { major: "경비", minor: "소모품비", amount: 0 },
    { major: "경비", minor: "사무용품비", amount: 0 },
    { major: "경비", minor: "선물비", amount: 0 },
    { major: "경비", minor: "심방비", amount: 0 },
    { major: "경비", minor: "경조비", amount: 0 },
  ].map((l) => ({ ...l, direction: "EXPENSE" as const, detail: null }));

  const incomeTotal = incomeLines.reduce((s, l) => s + l.amount, 0);
  const expenseTotal = expenseLines.reduce((s, l) => s + l.amount, 0);

  return {
    sourceFilename: filename,
    period: { year: 2026, month: 5, week: 3 },
    periodSourceText: "2026년 5월 3주",
    isDuplicate: false,
    lines: [...incomeLines, ...expenseLines],
    unexecutedItems: [
      { content: "음향 장비 수리", amount: 300_000, executedDate: null, note: "견적 대기중" },
      { content: "교육관 의자 구입", amount: 450_000, executedDate: "2026-06-01", note: null },
    ],
    totals: {
      incomeTotal,
      expenseTotal,
      balance: incomeTotal - expenseTotal,
      formCellIncomeTotal: incomeTotal,
      formCellExpenseTotal: expenseTotal,
      checksumMismatch: false,
    },
  };
}
