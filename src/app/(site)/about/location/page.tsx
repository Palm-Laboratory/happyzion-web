import { assertCanonicalStaticPage } from "@/lib/canonical-menu-path";

export default async function LocationPage() {
  await assertCanonicalStaticPage("about.location", "/about/location");

  return <section className="min-h-[520px] bg-white" />;
}
