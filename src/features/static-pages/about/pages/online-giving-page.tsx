"use client";

import { useState } from "react";
import BulletItem from "@/components/bullet-item";
import SectionHeading from "@/components/section-heading";

const DEFAULT_GIVING_BANK = "농협 217051-51-016188 예금주:시온교회";
const DEFAULT_GIVING_OWNER = "시온교회";

const senderNameExamples = {
  description: "예) 홍길동 성도가 헌금을 하는 경우",
  items: [
    { label: "주정헌금의 경우:", value: "홍길동주정" },
    { label: "십일조의 경우:", value: "홍길동십일" },
  ],
};

const offeringTypeExamples = [
  { korean: "주정헌금", code: "주정" },
  { korean: "십일조", code: "십일" },
  { korean: "감사헌금", code: "감사" },
  { korean: "선교헌금", code: "선교" },
  { korean: "절기헌금", code: "절기" },
];

function fallbackCopyText(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function normalizeGivingAccount(raw: string, ownerFallback: string) {
  const normalized = raw.replace(/\s+/g, " ").trim();
  const accountNumberMatch = normalized.match(/\d[\d-]*/);
  const accountNumber = accountNumberMatch?.[0] ?? "";
  const bankName = normalized
    .replace(/\s*예금주:.*$/, "")
    .replace(accountNumber, "")
    .trim() || "계좌 정보 확인 필요";

  const ownerMatch = normalized.match(/예금주:\s*(.+)$/);
  const owner = ownerMatch?.[1]?.trim() || ownerFallback;

  return {
    bankName,
    accountNumber,
    owner,
    copyValue: accountNumber.replace(/-/g, ""),
  };
}

function CopyAccountButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const canCopy = value.length > 0;

  const handleCopy = async () => {
    if (!canCopy) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        fallbackCopyText(value);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        fallbackCopyText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!canCopy}
      className="type-button-md relative z-10 inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center border border-[#8b6db5]/25 px-5 py-2 font-semibold text-[#33103f] transition hover:border-[#2a123c] hover:bg-[#2a123c] hover:text-white disabled:cursor-not-allowed disabled:hover:border-[#8b6db5]/25 disabled:hover:bg-white"
      aria-label="계좌번호 복사하기"
    >
      {copied ? "복사됨" : "복사하기"}
    </button>
  );
}

const givingAccount = normalizeGivingAccount(
  process.env.NEXT_PUBLIC_GIVING_BANK ?? DEFAULT_GIVING_BANK,
  process.env.NEXT_PUBLIC_GIVING_OWNER ?? DEFAULT_GIVING_OWNER,
);

export default function OnlineGivingStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-10 pb-20 md:pt-16">
      <section className="mb-4 md:mb-8">
        <SectionHeading
          label="online offering guide"
          title="온라인 헌금방법"
          description="Online Giving Information"
          titleAs="h1"
        />
        <ul className="type-body-md mt-5 space-y-3 text-[#4A3B5E]">
          <BulletItem>
            온라인 입금 시 정확한 본인 확인을 위해 아래 방법으로 입금자명을 기재해
            주세요.
          </BulletItem>
        </ul>
      </section>

      <section className="overflow-hidden border border-[#8b6db5]/18 bg-white">
        <div className="px-6 py-7 md:px-10 md:py-9">
          <p className="type-label-lg font-suit font-semibold text-[#33103f]">
            입금자명 기재 방법
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
            <span className="type-title-xl inline-flex min-h-11 items-center rounded-[6px] bg-[#2a123c] px-6 py-2 font-bold tracking-[-0.03em] text-white shadow-[0_12px_24px_rgba(51,16,63,0.14)] md:min-h-[54px] md:px-7">
              이름
            </span>
            <span className="type-title-xl font-light leading-none text-[#8b6db5]">
              +
            </span>
            <span className="type-title-xl inline-flex min-h-11 items-center rounded-[6px] bg-[#2a123c] px-6 py-2 font-bold tracking-[-0.03em] text-white shadow-[0_12px_24px_rgba(51,16,63,0.14)] md:min-h-[54px] md:px-7">
              헌금종류 앞 두 글자
            </span>
          </div>

          <div className="mt-7 border-t border-[#8b6db5]/18 pt-7 md:mt-8 md:pt-8">
            <p className="type-body-md font-medium text-[#4A3B5E]">
              {senderNameExamples.description}
            </p>

            <div className="mt-4 space-y-3">
              {senderNameExamples.items.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="mt-1.5 h-5 w-5 shrink-0 text-[#8b6db5]"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                  </svg>
                  <p className="type-body-md leading-[1.7]">
                    <span className="font-medium text-[#33103f]">{item.label}</span>{" "}
                    <strong className="font-medium text-[#bd6fe0]">{item.value}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 md:mt-8">
        <ul className="type-body-md space-y-3 text-[#4A3B5E]">
          <BulletItem>
            <span>헌금 종류 예시입니다.</span>
            <ul className="mt-3 space-y-2 text-[#4A3B5E]">
              {offeringTypeExamples.map((item) => (
                <li key={item.korean} className="flex items-start gap-3">
                  <span className="mt-[0.72rem] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b6db5]" />
                  <span>
                    {item.korean}
                    <span className="mx-2 text-black/28">-</span>
                    <strong className="font-semibold text-[#bd6fe0]">{item.code}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </BulletItem>
        </ul>
      </section>

      <section className="mt-8 border border-[#8b6db5]/12 bg-white">
        <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 md:py-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-7">
            <div className="shrink-0">
              <p className="type-title-xxs font-semibold uppercase text-[#33103f]">
                Bank Account
              </p>
              <p className="type-body-xs mt-2 font-bold text-[#33103f] md:mt-1 md:font-normal md:text-[#8b6db5]">
                온라인 계좌
              </p>
            </div>
            <div className="hidden h-14 w-px bg-[#8b6db5]/12 md:block" />
            <div className="tracking-[-0.01em] text-[#33103f] md:font-serif md:tracking-[-0.04em]">
              <p className="type-title-md font-semibold text-[#33103f]">
                {givingAccount.bankName}
                <span className="hidden md:inline"> {givingAccount.accountNumber}</span>
              </p>
              <p className="type-title-md mt-2 font-semibold text-[#33103f] md:hidden">
                {givingAccount.accountNumber}
              </p>
              <p className="type-body-xs mt-1 leading-[1.3] text-[#8b6db5]">
                예금주:{givingAccount.owner}
              </p>
            </div>
          </div>

          <CopyAccountButton value={givingAccount.copyValue} />
        </div>
      </section>
    </main>
  );
}
