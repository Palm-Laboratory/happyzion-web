/*
공개 사이트 영역 전체를 감싸는 Next.js App Router 레이아웃 파일
- 관리자를 제외한 일반 사용자 페이지들이 해당됨

주요 기능
1. 공개 사이트 공통 메타 데이터 설정
2. 공개 메뉴 데이터 로드
    - getNavigationResponse() 로 관리자에서 설정한 공개 메뉴 구조를 가져온다.
3. 메뉴 데이터를 전역 Provider에 주입
4. 공통 화면 구조 렌더링
*/
import type { Metadata } from "next";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { NavigationProvider } from "@/lib/navigation-context";
import { getNavigationResponse } from "@/lib/navigation-api";
import type { NavigationResponse } from "@/lib/navigation-types";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { primaryNavigation } from "@/lib/site-data";
import type { NavigationLink } from "@/types/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: "/images/logo/happyzion-logo.png",
    apple: "/images/logo/happyzion-logo.png",
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getSiteNavigation();
  const navigationItems = getSiteHeaderNavigation(navigation);

  return (
    <NavigationProvider navigation={navigation}>
      <div className="relative flex min-h-screen flex-col overflow-x-clip">
        <SiteHeader navigationItems={navigationItems} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </NavigationProvider>
  );
}

async function getSiteNavigation(): Promise<NavigationResponse> {
  return getNavigationResponse();
}

function getSiteHeaderNavigation(navigation: NavigationResponse): NavigationLink[] {
  const headerItems = navigation.groups
    .filter((group) => group.visible && group.headerVisible)
    .map((group) => ({
      label: group.label,
      href: group.defaultLandingHref ?? group.href,
      openInNewTab: group.openInNewTab,
      children: group.items
        .filter((item) => item.visible && item.headerVisible)
        .map((item) => ({
          label: item.label,
          href: item.href,
          openInNewTab: item.openInNewTab,
        })),
    }));

  return headerItems.length > 0 ? headerItems : primaryNavigation;
}
