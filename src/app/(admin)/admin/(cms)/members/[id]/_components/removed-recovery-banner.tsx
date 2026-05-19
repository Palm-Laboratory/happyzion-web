type Props = object;

export default function RemovedRecoveryBanner({}: Props) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
        <path
          d="M10 2l8 14H2L10 2z"
          stroke="#b45309"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 8v4M10 14h0" stroke="#b45309" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <div className="text-[13px] text-[#92400e]">
        <p className="font-semibold">이 교인은 [제적] 상태입니다.</p>
        <p className="mt-1">상태를 다른 값으로 변경한 뒤 [변경 저장]을 누르면 복구됩니다.</p>
      </div>
    </div>
  );
}
