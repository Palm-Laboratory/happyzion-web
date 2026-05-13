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
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
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
  const mobilePanelClass = isHome
    ? "border-white/10 bg-[rgba(36,31,37,0.96)] text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
    : "border-cedar/10 bg-white text-ink shadow-[0_18px_45px_rgba(0,0,0,0.12)]";
  const mobileLinkClass = isHome
    ? "border-white/10 text-white hover:bg-white/10 focus-visible:bg-white/10"
    : "border-ink/10 text-ink hover:bg-ink/5 focus-visible:bg-ink/5";
  const mobileChildLinkClass = isHome
    ? "text-white/70 hover:text-white focus-visible:text-white"
    : "text-ink/60 hover:text-ink focus-visible:text-ink";
  const mobileButtonClass = isHome
    ? "border-white/20 text-white hover:bg-white/10 focus-visible:bg-white/10"
    : "border-ink/10 text-ink hover:bg-ink/5 focus-visible:bg-ink/5";

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

      const nextIsVisible = delta < 0;
      setIsVisible(nextIsVisible);
      if (!nextIsVisible) {
        setIsMobileMenuOpen(false);
      }
      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--site-header-sticky-offset", isVisible ? "82px" : "0px");
  }, [isVisible]);

  useEffect(() => {
    setOpenMenuKey(null);
    setIsMobileMenuOpen(false);

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && headerRef.current?.contains(activeElement)) {
      activeElement.blur();
    }
  }, [pathname]);

  const closeMenu = () => {
    setOpenMenuKey(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
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

        <button
          type="button"
          className={`flex h-11 w-11 shrink-0 items-center justify-center border transition focus-visible:outline-none lg:hidden ${mobileButtonClass}`}
          aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="sr-only">{isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className={`h-px w-full bg-current transition ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-current transition ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-px w-full bg-current transition ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>

        <nav className="hidden items-center gap-3 lg:flex">
          {navigationItems.map((item) => {
            const menuKey = `${item.label}:${item.href}`;
            const isMenuOpen = openMenuKey === menuKey;

            return (
              <div
                key={menuKey}
                className="relative"
                onMouseEnter={() => {
                  setOpenMenuKey(menuKey);
                }}
                onMouseLeave={closeMenu}
                onFocus={() => {
                  setOpenMenuKey(menuKey);
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    closeMenu();
                  }
                }}
              >
                <Link
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                  onClick={closeMenu}
                  className={`block border border-transparent px-[18px] py-[16px] font-suit text-base font-light uppercase tracking-[0.2em] transition focus-visible:outline-none ${navLinkClass}`}
                >
                  {item.label}
                </Link>

                {item.children && item.children.length > 0 && (
                  <div
                    className={`absolute left-1/2 top-full min-w-[220px] -translate-x-1/2 pt-3 transition duration-150 ease-out ${
                      isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className={`overflow-hidden rounded-lg border py-2 backdrop-blur-[20px] ${dropdownClass}`}>
                      {item.children.map((child) => (
                        <Link
                          key={`${child.label}:${child.href}`}
                          href={child.href}
                          target={child.openInNewTab ? "_blank" : undefined}
                          rel={child.openInNewTab ? "noreferrer" : undefined}
                          onClick={closeMenu}
                          className={`block px-4 py-3 font-suit text-[14px] font-light transition focus-visible:outline-none ${dropdownLinkClass}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <nav
        id="site-mobile-menu"
        className={`absolute inset-x-0 top-full border-b backdrop-blur-[20px] transition duration-200 ease-out lg:hidden ${mobilePanelClass} ${
          isMobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex max-h-[calc(100svh-82px)] flex-col overflow-y-auto px-4 py-4 md:px-8">
          {navigationItems.map((item) => (
            <div className="border-b border-current/10 last:border-b-0" key={`${item.label}:${item.href}`}>
              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noreferrer" : undefined}
                onClick={closeMobileMenu}
                className={`flex min-h-14 items-center px-2 py-4 font-suit text-base font-medium uppercase tracking-[0.12em] transition focus-visible:outline-none ${mobileLinkClass}`}
              >
                {item.label}
              </Link>

              {item.children && item.children.length > 0 ? (
                <div className="grid gap-1 pb-4 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={`${item.label}:${child.label}:${child.href}`}
                      href={child.href}
                      target={child.openInNewTab ? "_blank" : undefined}
                      rel={child.openInNewTab ? "noreferrer" : undefined}
                      onClick={closeMobileMenu}
                      className={`block px-2 py-2 font-suit text-sm font-light transition focus-visible:outline-none ${mobileChildLinkClass}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
