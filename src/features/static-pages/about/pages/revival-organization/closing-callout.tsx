export default function ClosingCallout() {
  return (
    <section className="relative w-full overflow-hidden rounded bg-[radial-gradient(circle_at_25%_29%,#1f1035_0%,#2e1d46_100%)] px-pad-lg py-pad-4xl md:px-pad-4xl md:py-pad-4xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_46%,rgba(153,63,186,0.12),rgba(153,63,186,0)_52%)]" />
      <div className="relative z-10 flex flex-col items-start gap-comp-base">
        <p className="type-label-lg text-[#c9a96e]">Isaiah 61:1</p>
        <h2 className="type-title-lg text-white">
          &ldquo;여호와의 영이 내 위에 계시니
          <br className="max-[400px]:hidden" /> 이는 가난한 자에게 복음을 전하게
          하시려고 내게 기름을 부으시고&rdquo;
        </h2>
        <p className="type-caption-lg font-medium text-white/80">
          우리가 팀을 세우고 소그룹을 훈련하고 리더를 키우는 것은 단 하나,
          복음으로 사람을 살리기 위함입니다.
        </p>
      </div>
    </section>
  );
}
