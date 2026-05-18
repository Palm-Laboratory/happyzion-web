import Link from "next/link";

export type PublicErrorPageKind = "not-found" | "server" | "maintenance" | "network" | "timeout";

type ErrorPageContent = {
  status: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

const ERROR_PAGE_CONTENT: Record<PublicErrorPageKind, ErrorPageContent> = {
  "not-found": {
    status: "404",
    eyebrow: "Not Found",
    title: "페이지를 찾을 수 없습니다.",
    description: "주소가 변경되었거나 삭제된 페이지일 수 있습니다.",
    primaryHref: "/",
    primaryLabel: "홈으로 이동",
  },
  server: {
    status: "500",
    eyebrow: "Server Error",
    title: "일시적인 오류가 발생했습니다.",
    description: "요청을 처리하는 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.",
    primaryHref: "/",
    primaryLabel: "홈으로 이동",
    secondaryLabel: "다시 시도",
  },
  maintenance: {
    status: "503",
    eyebrow: "Unavailable",
    title: "잠시 이용할 수 없습니다.",
    description: "서비스 점검 중이거나 접속이 일시적으로 원활하지 않습니다.",
    primaryHref: "/",
    primaryLabel: "홈으로 이동",
    secondaryLabel: "다시 확인",
  },
  network: {
    status: "NETWORK",
    eyebrow: "Connection Error",
    title: "연결 상태를 확인해 주세요.",
    description: "인터넷 연결이 끊겼거나 서버에 연결할 수 없습니다.",
    primaryHref: "/",
    primaryLabel: "홈으로 이동",
    secondaryLabel: "다시 시도",
  },
  timeout: {
    status: "TIMEOUT",
    eyebrow: "Request Timeout",
    title: "응답 시간이 길어지고 있습니다.",
    description: "요청이 제한 시간 안에 완료되지 않았습니다. 다시 시도해 주세요.",
    primaryHref: "/",
    primaryLabel: "홈으로 이동",
    secondaryLabel: "다시 시도",
  },
};

type ErrorPageProps = {
  kind: PublicErrorPageKind;
  minHeightClassName?: string;
  onRetry?: () => void;
};

export default function ErrorPage({
  kind,
  minHeightClassName = "min-h-[68vh]",
  onRetry,
}: ErrorPageProps) {
  const content = ERROR_PAGE_CONTENT[kind];

  return (
    <section
      className={`relative isolate flex ${minHeightClassName} items-center overflow-hidden bg-[#fffcf8] px-5 py-20 text-center`}
    >
      <div
        className="absolute inset-x-0 top-0 -z-10 h-56 bg-[linear-gradient(180deg,rgba(213,177,108,0.16)_0%,rgba(255,252,248,0)_100%)]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-forest/60">
          {content.eyebrow}
        </p>
        <p className="mt-5 font-hahmlet text-[clamp(3.5rem,14vw,8rem)] font-semibold leading-none text-forest/15">
          {content.status}
        </p>
        <h1 className="type-heading-md mt-5 text-ink">{content.title}</h1>
        <p className="type-body-md mt-4 max-w-xl text-ink/72">{content.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {content.primaryHref && content.primaryLabel ? (
            <Link
              href={content.primaryHref}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-plum)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-plum)]"
            >
              {content.primaryLabel}
            </Link>
          ) : null}
          {onRetry && content.secondaryLabel ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(61,26,70,0.22)] bg-white px-6 text-sm font-semibold text-[var(--color-plum)] transition hover:border-[rgba(61,26,70,0.36)] hover:bg-[rgba(61,26,70,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-plum)]"
            >
              {content.secondaryLabel}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
