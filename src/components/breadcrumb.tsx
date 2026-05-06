"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/lib/navigation-context";
import {
  findMatchedNavigationGroup,
  findMatchedNavigationItem,
  shouldOpenNavigationInNewTab,
} from "@/lib/navigation-utils";

export default function Breadcrumb({
  hideLnb = false,
}: {
  hideLnb?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const { navMenuGroups } = useNavigation();
  const menuGroup = findMatchedNavigationGroup(pathname, navMenuGroups);
  const currentItem = findMatchedNavigationItem(pathname, menuGroup);
  const openGroupInNewTab = menuGroup
    ? shouldOpenNavigationInNewTab(menuGroup.href, {
        linkType: menuGroup.linkType,
        openInNewTab: menuGroup.openInNewTab,
      })
    : false;

  return (
    <div className="flex w-full flex-col bg-[#f8fafd]">
      <nav className="section-shell border-b border-cedar/8 py-3" aria-label="Breadcrumb">
        <ol className="type-body-small flex items-center justify-center gap-1.5">
          <li>
            <Link href="/" className="font-medium text-ink/40 transition hover:text-themeBlue">
              홈
            </Link>
          </li>

          {menuGroup && !menuGroup.hiddenInBreadcrumb && (
            <>
              <li className="text-ink/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                {menuGroup.href === pathname ? (
                  <span className={`font-medium ${currentItem ? "text-ink/40" : "text-ink/80"}`}>
                    {menuGroup.label}
                  </span>
                ) : (
                  <Link
                    href={menuGroup.href}
                    prefetch={false}
                    target={openGroupInNewTab ? "_blank" : undefined}
                    rel={openGroupInNewTab ? "noopener noreferrer" : undefined}
                    className={`font-medium transition hover:text-themeBlue ${currentItem ? "text-ink/40" : "text-ink/80"}`}
                  >
                    {menuGroup.label}
                  </Link>
                )}
              </li>
            </>
          )}

          {currentItem && !currentItem.hiddenInBreadcrumb && (
            <>
              <li className="text-ink/25" aria-hidden="true">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
              <li>
                <span className="font-semibold text-ink/80">{currentItem.label}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {!hideLnb && menuGroup && !menuGroup.hiddenInLnb && menuGroup.items.some((item) => !item.hiddenInLnb) && (
        <nav className="no-scrollbar w-full overflow-x-auto border-b border-cedar/8 bg-white" aria-label="LNB">
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
                    <span className="type-body-small block whitespace-nowrap border-b-[2.5px] border-themeBlue px-3 py-3.5 font-bold text-themeBlue md:px-4">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={false}
                      target={openItemInNewTab ? "_blank" : undefined}
                      rel={openItemInNewTab ? "noopener noreferrer" : undefined}
                      className="type-body-small block whitespace-nowrap border-b-[2.5px] border-transparent px-3 py-3.5 font-medium text-ink/65 transition-colors hover:border-themeBlue/30 hover:text-themeBlue md:px-4"
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
