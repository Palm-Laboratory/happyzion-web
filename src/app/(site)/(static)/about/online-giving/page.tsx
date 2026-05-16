import type { Metadata } from "next";
import SitePageShell from "@/components/site-page-shell";
import OnlineGivingStaticPage from "@/features/static-pages/about/pages/online-giving-page";
import { createStaticPageMetadata, resolveStaticPageShellProps } from "@/features/static-pages/static-page-route";

const PATH = "/about/online-giving";
const FALLBACK_TITLE = "교회 소개";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata(PATH, FALLBACK_TITLE);
}

export default async function Page() {
  const { title, subtitle } = await resolveStaticPageShellProps(PATH, FALLBACK_TITLE);
  return (
    <SitePageShell title={title} subtitle={subtitle}>
      <OnlineGivingStaticPage />
    </SitePageShell>
  );
}
