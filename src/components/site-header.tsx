"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation } from "@/lib/site-data";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-forest/65">
            Happy Zion
          </span>
          <span className="font-serif text-2xl font-semibold text-ink">해피시온</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-forest text-ivory"
                    : "text-ink/75 hover:bg-forest/5 hover:text-forest"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
