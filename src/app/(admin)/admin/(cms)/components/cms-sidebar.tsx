"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  icon?: ReactNode;
  matchHrefs?: string[];
  children?: NavItem[];
  requireSuperAdmin?: boolean;
};

type NavGroup = {
  label: string;
  requireSuperAdmin?: boolean;
  items: NavItem[];
};

const NAV_GROUPS = [
  {
    label: "사이트 관리",
    items: [
      {
        href: "/admin/main-video",
        label: "메인 영상",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M3 5a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 14 5v7a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 3 12V5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="m7 6.5 3.25 2L7 10.5v-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        href: "/admin/menu",
        label: "메뉴 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M3 4.25h11M3 8.5h11M3 12.75h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/mission-history",
        label: "선교 이력 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8.5 2.75c0 0-2.5 2-2.5 5.75s2.5 5.75 2.5 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 2.75c0 0 2.5 2 2.5 5.75s-2.5 5.75-2.5 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.75 8.5h11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/videos",
        label: "영상 관리",
        exact: false,
        matchHrefs: ["/admin/videos/manage", "/admin/videos/sync"],
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M4 3.75h9a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 6.25h5M6 8.5h5M6 10.75h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
        children: [
          {
            href: "/admin/videos/manage",
            label: "컨텐츠 관리",
            exact: false,
            matchHrefs: ["/admin/videos/manage"],
          },
          {
            href: "/admin/videos/sync",
            label: "영상 싱크",
            exact: false,
          },
        ],
      },
      {
        href: "/admin/boards",
        label: "게시판 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M4 3.75h9a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.75 6.25h5.5M5.75 8.5h5.5M5.75 10.75h3.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/accounts",
        label: "관리자 계정",
        exact: false,
        requireSuperAdmin: true,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M8.5 9.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 14.3c.9-2 3.1-3.3 5.5-3.3s4.6 1.3 5.5 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "교회 관리",
    items: [
      {
        href: "/admin/members",
        label: "교인 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M6.5 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1.5 14c.8-2 2.8-3.3 5-3.3s4.2 1.3 5 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15.5 14c-.6-1.5-2-2.5-3.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/missions",
        label: "선교 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M8.5 2.5v12M2.5 8.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8.5 2.75c0 0-2 2-2 5.75s2 5.75 2 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 2.75c0 0 2 2 2 5.75s-2 5.75-2 5.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/education",
        label: "교육 관리",
        exact: false,
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M8.5 3.5 1.5 6.5l7 3 7-3-7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M4.5 8v3.5c0 0 1.5 1.5 4 1.5s4-1.5 4-1.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 6.5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/sms",
        label: "SMS 관리",
        exact: false,
        matchHrefs: ["/admin/sms/send", "/admin/sms/send-bulk"],
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <path d="M3.25 4.25A1.25 1.25 0 0 1 4.5 3h8A1.25 1.25 0 0 1 13.75 4.25v5.25a1.25 1.25 0 0 1-1.25 1.25H7.25L4 13.5v-2.75A1.25 1.25 0 0 1 3.25 9.5V4.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5.75 6.25h5.5M5.75 8.25h3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        href: "/admin/finance",
        label: "재정 관리",
        exact: false,
        matchHrefs: ["/admin/finance/upload", "/admin/finance/statistics"],
        icon: (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.25 6.5h4.5M6.25 8.5h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8.5 5.25v6.5M7 11.25l1.5 1 1.5-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
        children: [
          {
            href: "/admin/finance",
            label: "보고서",
            exact: true,
            matchHrefs: ["/admin/finance/upload"],
          },
          {
            href: "/admin/finance/statistics",
            label: "통계",
            exact: false,
          },
        ],
      },
    ],
  },
];

interface CmsSidebarProps {
  canManageAccounts: boolean;
}

export default function CmsSidebar({ canManageAccounts }: CmsSidebarProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const navGroups = (NAV_GROUPS as NavGroup[])
    .filter((group) => !group.requireSuperAdmin || canManageAccounts)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.requireSuperAdmin || canManageAccounts),
    }));

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return currentPath === href;
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const isMatching = (item: NavItem) => {
    if (item.matchHrefs?.some((href) => currentPath === href || currentPath.startsWith(`${href}/`))) {
      return true;
    }

    if (item.href === "/admin/videos/manage" && currentPath === "/admin/videos") {
      return true;
    }

    if (item.href === "/admin/videos/manage" && currentPath.startsWith("/admin/videos/") && !currentPath.startsWith("/admin/videos/sync")) {
      return true;
    }

    return isActive(item.href, item.exact ?? false);
  };

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#080f1a]">
      {/* 로고 */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.06] px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3f74c7]/20">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1L12.196 4.5V11.5L7 15L1.804 11.5V4.5L7 1Z" stroke="#6ca6f0" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-bold leading-none tracking-wide text-white">HAPPY.Zion</p>
          <p className="mt-0.5 text-[10px] leading-none text-white/35">Admin CMS</p>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label ?? "__root"} className="mb-5">
            {group.label && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isMatching(item);
                return (
                  <li key={item.href}>
                    <div className="space-y-1">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-100 ${active
                          ? "bg-[#3f74c7]/15 text-[#6ca6f0]"
                          : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
                          }`}
                      >
                        <span className={active ? "text-[#6ca6f0]" : "text-white/35"}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {item.children ? (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                            className={active ? "text-[#6ca6f0]" : "text-white/25"}
                          >
                            <path d="M3.5 4.5 6 7l2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : null}
                      </Link>

                      {item.children ? (
                        <ul className="ml-[22px] space-y-0.5 border-l border-white/[0.2] pl-3">
                          {item.children.map((child) => {
                            const childActive = isMatching(child);
                            return (
                              <li key={child.href} className="relative">
                                <span className="absolute -left-3 top-[18px] h-px w-3 bg-white/20" />
                                <Link
                                  href={child.href}
                                  className={`flex items-center rounded-lg px-3 py-2 text-[12px] font-medium transition-colors duration-100 ${childActive
                                    ? "bg-[#3f74c7]/12 text-[#6ca6f0]"
                                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                                    }`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* 하단 */}
      <div className="shrink-0 border-t border-white/[0.06] px-4 py-4">
        <p className="text-[10px] text-white/20">HAPPY ZION © 2026</p>
      </div>
    </aside>
  );
}
