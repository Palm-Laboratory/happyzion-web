import type { Metadata } from "next";

import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getPublicNavigation } from "@/lib/public-menu-api";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { primaryNavigation } from "@/lib/site-data";
import type { NavigationLink } from "@/types/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 교회 웹사이트`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 교회 웹사이트`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 교회 웹사이트`,
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
  const navigationItems = await getSiteHeaderNavigation();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <SiteHeader navigationItems={navigationItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

async function getSiteHeaderNavigation(): Promise<NavigationLink[]> {
  try {
    const navigation = await getPublicNavigation();
    const headerItems = navigation.groups
      .filter((group) => group.visible && group.headerVisible)
      .map((group) => ({
        label: group.label,
        href: group.href,
        openInNewTab: group.openInNewTab,
      }));

    return headerItems;
  } catch {
    return primaryNavigation;
  }
}
