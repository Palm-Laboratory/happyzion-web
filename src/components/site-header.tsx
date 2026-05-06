"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { primaryNavigation } from "@/lib/site-data";
import type { NavigationLink } from "@/types/navigation";

type SiteHeaderProps = {
  navigationItems?: NavigationLink[];
};

export default function SiteHeader({ navigationItems = primaryNavigation }: SiteHeaderProps) {
  const pathname = usePathname() ?? "/";
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const isHome = pathname === "/";
  const headerToneClass = isHome
    ? "border-white/10 bg-[rgba(36,31,37,0.72)]"
    : "border-cedar/10 bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)]";
  const logoImageClass = isHome ? "" : "brightness-0";
  const logoTextClass = isHome ? "text-white" : "text-ink";
  const navLinkClass = isHome
    ? "text-white hover:border-white/10 hover:bg-white/10 hover:shadow-[0_4px_5px_rgba(255,255,255,0.08)] focus-visible:border-white/20 focus-visible:bg-white/10"
    : "text-ink hover:border-ink/10 hover:bg-ink/5 hover:shadow-[0_4px_5px_rgba(0,0,0,0.04)] focus-visible:border-ink/20 focus-visible:bg-ink/5";
  const dropdownClass = isHome
    ? "border-white/10 bg-[rgba(36,31,37,0.92)] shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
    : "border-cedar/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.12)]";
  const dropdownLinkClass = isHome
    ? "text-white/90 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
    : "text-ink/80 hover:bg-ink/5 hover:text-ink focus-visible:bg-ink/5 focus-visible:text-ink";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= 12) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) < 8) {
        return;
      }

      setIsVisible(delta < 0);
      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-[20px] transition-transform duration-300 ease-out ${headerToneClass} ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-4 md:px-8 lg:px-[60px]">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full">
            <Image
              src="/images/logo/happyzion-logo.png"
              alt="Happy Zion logo"
              width={36}
              height={36}
              className={`absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 object-contain ${logoImageClass}`}
              priority
            />
          </div>
          <span className={`font-suit text-sm font-light uppercase tracking-[0.3em] md:text-xl ${logoTextClass}`}>
            HAPPY.Zion
          </span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex">
          {navigationItems.map((item) => (
            <div key={`${item.label}:${item.href}`} className="group relative">
              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noreferrer" : undefined}
                className={`block border border-transparent px-[18px] py-[16px] font-suit text-base font-light uppercase tracking-[0.2em] transition focus-visible:outline-none ${navLinkClass}`}
              >
                {item.label}
              </Link>

              {item.children && item.children.length > 0 && (
                <div className="pointer-events-none absolute left-1/2 top-full min-w-[220px] -translate-x-1/2 pt-3 opacity-0 transition duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                  <div className={`overflow-hidden rounded-lg border py-2 backdrop-blur-[20px] ${dropdownClass}`}>
                    {item.children.map((child) => (
                      <Link
                        key={`${child.label}:${child.href}`}
                        href={child.href}
                        target={child.openInNewTab ? "_blank" : undefined}
                        rel={child.openInNewTab ? "noreferrer" : undefined}
                        className={`block px-4 py-3 font-suit text-[14px] font-light transition focus-visible:outline-none ${dropdownLinkClass}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
