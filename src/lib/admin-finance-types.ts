// 교회 재정 관리 — API 응답/요청 타입 정의
// 백엔드 작업 시 동일한 스키마로 응답해야 함 (기획 문서 §3, §5 참조)

export type FinanceDirection = "INCOME" | "EXPENSE";

export type FinancePeriod = {
  year: number;
  month: number;
  week: number;
};

export type FinanceParsedLine = {
  direction: FinanceDirection;
  major: string;
  minor: string;
  amount: number;
};

export type FinanceParsedUnexecutedItem = {
  content: string;
  amount: number;
  /** ISO date string (YYYY-MM-DD) or null */
  executedDate: string | null;
  note: string | null;
};

export type FinanceParsedTotals = {
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
  /** 양식의 합계셀(C70) 캐시값. 실제 엑셀이면 숫자, 없으면 null */
  formCellIncomeTotal: number | null;
  /** 양식의 합계셀(G70) 캐시값 */
  formCellExpenseTotal: number | null;
  /** 우리 합산 값과 양식 합계셀이 다르면 true */
  checksumMismatch: boolean;
};

/** POST /api/v1/admin/finance/reports/preview 응답 */
export type FinanceParsePreview = {
  sourceFilename: string;
  /** A1에서 추출된 기간. 매칭 실패 시 null → 관리자가 직접 선택 */
  period: FinancePeriod | null;
  /** A1 원본 텍스트 (예: "2026년 5월 3주"). UI에 "엑셀에서 추출됨" 안내용 */
  periodSourceText: string | null;
  lines: FinanceParsedLine[];
  unexecutedItems: FinanceParsedUnexecutedItem[];
  totals: FinanceParsedTotals;
};

/** POST /api/v1/admin/finance/reports 요청 본문 */
export type FinanceReportSaveRequest = {
  period: FinancePeriod;
  sourceFilename: string;
  lines: FinanceParsedLine[];
  unexecutedItems: FinanceParsedUnexecutedItem[];
  /** 미리보기에서 받은 합계 — 서버는 신뢰하지 않고 다시 검증해도 됨 */
  totals: FinanceParsedTotals;
};

/* ── 보고서 목록 ──────────────────────────────────────── */

/** GET /api/v1/admin/finance/reports 응답의 한 행 */
export type FinanceReportSummary = {
  id: number;
  year: number;
  month: number;
  week: number;
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
  sourceFilename: string;
  uploadedAt: string; // ISO timestamp
  checksumMismatch: boolean;
};

export type FinanceReportListQuery = {
  year?: number;
  month?: number;
  page: number;
  size: number;
};

export type FinanceReportPageResponse = {
  items: FinanceReportSummary[];
  hasNext: boolean;
  total: number;
};

/** GET /api/v1/admin/finance/reports/{id} 응답 */
export type FinanceReportDetail = {
  id: number;
  period: FinancePeriod;
  sourceFilename: string;
  uploadedAt: string;
  uploaderName: string;
  totals: FinanceParsedTotals;
  lines: FinanceParsedLine[];
  unexecutedItems: FinanceParsedUnexecutedItem[];
};
