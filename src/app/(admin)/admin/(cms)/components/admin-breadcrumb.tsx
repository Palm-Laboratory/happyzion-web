import { Fragment } from "react";
import Link from "next/link";

export type AdminBreadcrumbItem = {
  label: string;
  href?: string;
};

interface AdminBreadcrumbProps {
  items: AdminBreadcrumbItem[];
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mr-1">
      <path d="M1.5 7.5L7 2l5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6.5V12h3V9h2v3h3V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-[12px] text-[#8fa3bb]">
      <Link href="/admin" className="flex items-center transition hover:text-[#3f74c7]">
        <HomeIcon />
        홈
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <Fragment key={idx}>
            <Chevron />
            {item.href ? (
              <Link href={item.href} className="text-[#4a6484] transition hover:text-[#3f74c7]">
                {item.label}
              </Link>
            ) : isLast ? (
              <span className="font-medium text-[#132033]">{item.label}</span>
            ) : (
              <span className="text-[#4a6484]">{item.label}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
