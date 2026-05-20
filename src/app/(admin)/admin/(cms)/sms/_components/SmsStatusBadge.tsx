"use client";

type SmsStatus = "PENDING" | "SENT" | "FAILED" | "UNKNOWN";

interface SmsStatusBadgeProps {
  status: SmsStatus;
}

const STATUS_CONFIG: Record<SmsStatus, { label: string; className: string }> = {
  PENDING: {
    label: "대기",
    className: "bg-yellow-100 text-yellow-700",
  },
  SENT: {
    label: "성공",
    className: "bg-green-100 text-green-700",
  },
  FAILED: {
    label: "실패",
    className: "bg-red-100 text-red-700",
  },
  UNKNOWN: {
    label: "알 수 없음",
    className: "bg-gray-100 text-gray-600",
  },
};

export default function SmsStatusBadge({ status }: SmsStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.UNKNOWN;
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
