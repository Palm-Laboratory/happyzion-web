"use client";

import Image from "next/image";
import Link from "next/link";

import { primaryNavigation } from "@/lib/site-data";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(36,31,37,0.72)] backdrop-blur-[20px]">
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-4 md:px-8 lg:px-[60px]">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <Image
              src="/images/logo/happyzion-logo.png"
              alt="Happy Zion logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-suit text-sm font-light uppercase tracking-[0.3em] text-white md:text-xl">
            HAPPY.Zion
          </span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {primaryNavigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-[18px] py-[16px] font-suit text-base font-light uppercase tracking-[0.2em] text-white transition ${
                index === 0
                  ? "border border-white/10 bg-white/10 shadow-[0_4px_5px_rgba(255,255,255,0.08)]"
                  : "hover:text-[#f4d99a]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
