import type { Metadata } from "next";
import SitePageShell from "@/components/site-page-shell";
import DiscipleshipCareStaticPage from "@/features/static-pages/discipleship/pages/care";
import { createStaticPageMetadata, resolveStaticPageShellProps } from "@/features/static-pages/static-page-route";

const PATH = "/discipleship/care";
const FALLBACK_TITLE = "제자훈련";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata(PATH, FALLBACK_TITLE);
}

export default async function Page() {
  const { title, subtitle } = await resolveStaticPageShellProps(PATH, FALLBACK_TITLE);
  return (
    <SitePageShell title={title} subtitle={subtitle}>
      <DiscipleshipCareStaticPage />
    </SitePageShell>
  );
}
