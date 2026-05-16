import type { Metadata } from "next";
import SitePageShell from "@/components/site-page-shell";
import RevivalOrganizationStaticPage from "@/features/static-pages/about/pages/revival-organization";
import { createStaticPageMetadata, resolveStaticPageShellProps } from "@/features/static-pages/static-page-route";

const PATH = "/about/revival-organization";
const FALLBACK_TITLE = "교회 소개";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata(PATH, FALLBACK_TITLE);
}

export default async function Page() {
  const { title, subtitle } = await resolveStaticPageShellProps(PATH, FALLBACK_TITLE);
  return (
    <SitePageShell title={title} subtitle={subtitle}>
      <RevivalOrganizationStaticPage />
    </SitePageShell>
  );
}
