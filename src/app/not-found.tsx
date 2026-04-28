import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-forest/60">404</p>
      <h1 className="type-section-title mt-4 text-ink">페이지를 찾을 수 없습니다.</h1>
      <p className="type-body mt-4 text-ink/72">
        주소가 변경되었거나 아직 준비되지 않은 페이지입니다.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-ink"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
