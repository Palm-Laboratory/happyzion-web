import "server-only";
import { AdminApiError, adminApiFetch } from "@/lib/admin-api";
import type {
  FinanceReportDetail,
  FinanceReportListQuery,
  FinanceReportPageResponse,
  FinanceStatQuery,
  FinanceStatResponse,
} from "@/lib/admin-finance-types";

// ── 보고서 목록 ─────────────────────────────────────────────────────────────

export async function listFinanceReports(
  q: FinanceReportListQuery,
): Promise<FinanceReportPageResponse> {
  const qs = new URLSearchParams();
  if (q.year != null) qs.set("year", String(q.year));
  if (q.month != null) qs.set("month", String(q.month));
  qs.set("page", String(q.page));
  qs.set("size", String(q.size));
  const res = await adminApiFetch(`/api/v1/admin/finance/reports?${qs}`);
  return res.json() as Promise<FinanceReportPageResponse>;
}

// ── 보고서 상세 ─────────────────────────────────────────────────────────────

export async function getFinanceReport(id: number): Promise<FinanceReportDetail | null> {
  try {
    const res = await adminApiFetch(`/api/v1/admin/finance/reports/${id}`);
    return res.json() as Promise<FinanceReportDetail>;
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) return null;
    throw error;
  }
}

// ── 통계 ────────────────────────────────────────────────────────────────────

export async function getFinanceStatistics(
  q: FinanceStatQuery,
): Promise<FinanceStatResponse> {
  const qs = new URLSearchParams();
  qs.set("granularity", q.granularity);
  if (q.year != null) qs.set("year", String(q.year));
  if (q.month != null) qs.set("month", String(q.month));
  const res = await adminApiFetch(`/api/v1/admin/finance/statistics?${qs}`);
  return res.json() as Promise<FinanceStatResponse>;
}
