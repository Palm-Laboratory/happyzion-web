import { assertCanonicalStaticPage } from "@/lib/canonical-menu-path";

export default async function HistoryPage() {
  await assertCanonicalStaticPage("about.history", "/about/history");

  return <section className="min-h-[520px] bg-white" />;
}
