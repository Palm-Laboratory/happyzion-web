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
        <p className="type-body-xs text-[#6f5a7a]">
          전체 <span className="font-semibold text-[#33103f]">{totalItems.toLocaleString("ko-KR")}</span>건
        </p>
        <label className="type-body-xs flex items-center gap-2 text-site-muted">
          <select
            value={String(pageSize)}
            disabled={isPending}
            onChange={(event) => handlePageSizeChange(Number(event.target.value))}
            className="h-11 appearance-none rounded-[8px] border border-[rgba(93,61,138,0.15)] bg-white py-3 pl-4 pr-9 leading-none text-[#4a3b5e] outline-none transition hover:border-[#8b6db5] focus:border-[#8b6db5]"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}개씩
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#4a3b5e]" aria-hidden="true">
            <svg viewBox="0 0 18 18" className="h-full w-full fill-current">
              <path d="M5.03 6.53a.75.75 0 0 1 1.06 0L9 9.44l2.91-2.91a.75.75 0 1 1 1.06 1.06l-3.44 3.44a.75.75 0 0 1-1.06 0L5.03 7.59a.75.75 0 0 1 0-1.06" />
            </svg>
          </span>
        </label>
      </div>
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-[15px] md:min-w-[320px] md:justify-end">
        <input
          type="search"
          value={searchValue}
          disabled={isPending}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="게시글 검색"
          className="type-body-xs h-10 min-w-0 flex-1 rounded-full border border-[#8b6db5]/15 bg-white px-4 text-[#33103f] outline-none transition placeholder:text-[#6f5a7a]/70 hover:border-[#8b6db5] hover:bg-[#8b6db5]/6 focus:border-[#8b6db5] md:max-w-[260px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="type-body-xs inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-[#33103f] bg-[#33103f] px-[18px] font-semibold text-white transition hover:border-[#8b6db5] hover:bg-[#8b6db5] disabled:pointer-events-none disabled:opacity-60"
        >
          검색
        </button>
      </form>
    </div>
  );
}
