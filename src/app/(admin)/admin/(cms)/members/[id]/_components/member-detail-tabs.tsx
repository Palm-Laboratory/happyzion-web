"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  label: string;
  href: string;
  exact?: boolean;
}

export default function MemberDetailTabs({ memberId }: { memberId: number }) {
  const pathname = usePathname() ?? "";

  const tabs: Tab[] = [
    { label: "개인정보", href: `/admin/members/${memberId}`, exact: true },
    { label: "선교", href: `/admin/members/${memberId}/missions` },
    { label: "교육", href: `/admin/members/${memberId}/education` },
  ];

  function isActive(tab: Tab) {
    if (tab.exact) return pathname === tab.href;
    return pathname.startsWith(tab.href);
  }

  return (
    <div className="flex gap-0 border-b border-[#e2eaf3]">
      {tabs.map((tab) => {
        const active = isActive(tab);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative px-5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "text-[#3f74c7] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3f74c7]"
                : "text-[#8fa3bb] hover:text-[#4a6484]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
