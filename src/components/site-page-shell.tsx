/*
사이트 하위 페이지용 공통 레이아웃

주요 기능
1. 옵션에 따라 PageHeader 렌더링
    - title, subtitle, backgroundImageUrl
2. 옵션에 따라 BreadScrumb 렌더링

* showHeader, showBreadscrumb 기본 옵션은 true

<SitePageShell
  title="교회 소개"
  subtitle="ABOUT HAPPY ZION"
  showHeader={false}
  showBreadscrumb={false}
>
  {children}
</SitePageShell>

*/
import type { ReactNode } from "react";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/page-header";

interface SitePageShellProps {
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
  showHeader?: boolean;
  showBreadcrumb?: boolean;
  children: ReactNode;
}

export default function SitePageShell({
  title,
  subtitle,
  backgroundImageUrl,
  showHeader = true,
  showBreadcrumb = true,
  children,
}: SitePageShellProps) {
  return (
    <div className="flex w-full flex-col bg-white pt-[82px]">
      {showHeader && (
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundImageUrl={backgroundImageUrl}
        />
      )}
      {showBreadcrumb && <Breadcrumb />}
      {children}
    </div>
  );
}
