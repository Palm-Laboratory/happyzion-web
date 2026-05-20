"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useNavigation } from "@/lib/navigation-context";
import {
  findMatchedNavigationGroup,
  findMatchedNavigationItem,
  shouldOpenNavigationInNewTab,
} from "@/lib/navigation-utils";

const LNB_SCROLL_STORAGE_PREFIX = "happyzion:lnb-scroll:";

export default function Breadcrumb({
  hideLnb = false,
}: {
  hideLnb?: boolean;
}) {
  const lnbRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname() ?? "";
  const { navMenuGroups } = useNavigation();
  const menuGroup = findMatchedNavigationGroup(pathname, navMenuGroups);
  const currentItem = findMatchedNavigationItem(pathname, menuGroup);
  const lnbScrollStorageKey = menuGroup ? `${LNB_SCROLL_STORAGE_PREFIX}${menuGroup.key}` : null;
  const openGroupInNewTab = menuGroup
    ? shouldOpenNavigationInNewTab(menuGroup.href, {
        linkType: menuGroup.linkType,
        openInNewTab: menuGroup.openInNewTab,
      })
    : false;

  useEffect(() => {
    const lnb = lnbRef.current;

    if (!lnb || !lnbScrollStorageKey) {
      return;
    }

    const savedScrollLeft = window.sessionStorage.getItem(lnbScrollStorageKey);
    const nextScrollLeft = savedScrollLeft ? Number.parseFloat(savedScrollLeft) : 0;
    const frame = window.requestAnimationFrame(() => {
      lnb.scrollLeft = Number.isFinite(nextScrollLeft) ? nextScrollLeft : 0;
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [lnbScrollStorageKey, pathname]);

  const handleLnbScroll = () => {
    const lnb = lnbRef.current;

    if (!lnb || !lnbScrollStorageKey) {
      return;
    }

    window.sessionStorage.setItem(lnbScrollStorageKey, String(lnb.scrollLeft));
  };

  return (
    <div className="flex w-full flex-col bg-[#f7f6f8]">
      <nav className="section-shell border-b border-[#33103F]/10 py-3" aria-label="Breadcrumb">
        <ol className="type-body-xs flex items-center justify-center gap-1.5">
          <li>
            <Link href="/" className="font-medium text-[#33103F]/70 transition hover:text-[#33103F]">
              홈
            </Link>
          </li>

          {menuGroup && !menuGroup.hiddenInBreadcrumb && (
            <>
              <li className="text-[#33103F]/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                {menuGroup.href === pathname ? (
                  <span className={`font-medium ${currentItem ? "text-[#33103F]/70" : "text-[#33103F]"}`}>
                    {menuGroup.label}
                  </span>
                ) : (
                  <Link
                    href={menuGroup.href}
                    prefetch={false}
                    target={openGroupInNewTab ? "_blank" : undefined}
                    rel={openGroupInNewTab ? "noopener noreferrer" : undefined}
                    className={`font-medium transition hover:text-[#33103F] ${currentItem ? "text-[#33103F]/70" : "text-[#33103F]"}`}
                  >
                    {menuGroup.label}
                  </Link>
                )}
              </li>
            </>
          )}

          {currentItem && !currentItem.hiddenInBreadcrumb && (
            <>
              <li className="text-[#33103F]/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="font-semibold text-[#33103F]">{currentItem.label}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {!hideLnb && menuGroup && !menuGroup.hiddenInLnb && menuGroup.items.some((item) => !item.hiddenInLnb) && (
        <nav
          ref={lnbRef}
          className="no-scrollbar w-full overflow-x-auto border-b border-[#33103F]/10 bg-white"
          aria-label="LNB"
          onScroll={handleLnbScroll}
        >
          <ul className="section-shell mx-auto flex w-max min-w-max items-center justify-center gap-1 px-4">
            {menuGroup.items.filter((item) => !item.hiddenInLnb).map((item) => {
              const isActive = item === currentItem;
              const openItemInNewTab = shouldOpenNavigationInNewTab(item.href, {
                linkType: item.linkType,
                openInNewTab: item.openInNewTab,
              });

              return (
                <li key={item.key}>
                  {isActive ? (
                    <span className="type-body-xs block whitespace-nowrap border-b-[2.5px] border-[#33103F] px-3 py-3.5 font-bold text-[#33103F] md:px-4">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={false}
                      target={openItemInNewTab ? "_blank" : undefined}
                      rel={openItemInNewTab ? "noopener noreferrer" : undefined}
                      className="type-body-xs block whitespace-nowrap border-b-[2.5px] border-transparent px-3 py-3.5 font-medium text-[#33103F]/70 transition-colors hover:border-[#33103F]/30 hover:text-[#33103F] md:px-4"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
