import type { Metadata } from "next";
import SitePageShell from "@/components/site-page-shell";
import ServiceTimesStaticPage from "@/features/static-pages/about/pages/service-times-page";
import { createStaticPageMetadata, resolveStaticPageShellProps } from "@/features/static-pages/static-page-route";

const PATH = "/about/service-times";
const FALLBACK_TITLE = "교회 소개";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata(PATH, FALLBACK_TITLE);
}

export default async function Page() {
  const { title, subtitle } = await resolveStaticPageShellProps(PATH, FALLBACK_TITLE);
  return (
    <SitePageShell title={title} subtitle={subtitle}>
      <ServiceTimesStaticPage />
    </SitePageShell>
  );
}
