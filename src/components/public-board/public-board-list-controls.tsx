"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState, useTransition } from "react";

type PublicBoardListControlsProps = {
  totalItems: number;
  pageSize: number;
  searchTitle: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export default function PublicBoardListControls({
  totalItems,
  pageSize,
  searchTitle,
}: PublicBoardListControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchTitle);

  useEffect(() => {
    setSearchValue(searchTitle);
  }, [searchTitle]);

  function pushBoardList(nextParams: URLSearchParams) {
    const nextQuery = nextParams.toString();
    const basePath = pathname ?? "";
    const nextHref = nextQuery ? `${basePath}?${nextQuery}` : basePath;

    startTransition(() => {
      router.push(nextHref, { scroll: false });
    });
  }

  function handlePageSizeChange(nextPageSize: number) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    if (nextPageSize === 20) {
      params.delete("size");
    } else {
      params.set("size", String(nextPageSize));
    }

    params.delete("page");
    pushBoardList(params);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const normalizedSearch = searchValue.trim();

    if (normalizedSearch) {
      params.set("title", normalizedSearch);
    } else {
      params.delete("title");
    }

    params.delete("page");
    pushBoardList(params);
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-b border-cedar/12 pb-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between gap-4">
        <p className="type-body-small text-site-muted">
          전체 <span className="font-semibold text-site-ink">{totalItems.toLocaleString("ko-KR")}</span>건
        </p>
        <label className="type-body-small flex items-center gap-2 text-site-muted">
          <select
            value={String(pageSize)}
            disabled={isPending}
            onChange={(event) => handlePageSizeChange(Number(event.target.value))}
            className="h-10 rounded-full border border-cedar/12 bg-white px-4 text-site-ink outline-none transition hover:bg-cedar/6 hover:border-cedar focus:border-cedar"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}개씩
              </option>
            ))}
          </select>
        </label>
      </div>
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 md:min-w-[320px] md:justify-end">
        <input
          type="search"
          value={searchValue}
          disabled={isPending}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="게시글 검색"
          className="type-body-small h-10 min-w-0 flex-1 rounded-full border border-cedar/12 bg-white px-4 text-site-ink outline-none transition placeholder:text-site-muted/70 hover:bg-cedar/6 hover:border-cedar focus:border-cedar md:max-w-[260px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="type-body-small inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-site-ink bg-site-ink px-[18px] font-semibold text-white transition hover:border-cedar hover:bg-cedar disabled:pointer-events-none disabled:opacity-60"
        >
          검색
        </button>
      </form>
    </div>
  );
}
