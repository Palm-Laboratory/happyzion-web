import { assertCanonicalStaticPage } from "@/lib/canonical-menu-path";

export default async function ServiceTimesPage() {
  await assertCanonicalStaticPage("about.service-times", "/about/service-times");

  return <section className="min-h-[520px] bg-white" />;
}
