import { assertCanonicalStaticPage } from "@/lib/canonical-menu-path";

export default async function GreetingPage() {
  await assertCanonicalStaticPage("about.greeting", "/about/greeting");

  return <section className="min-h-[520px] bg-white" />;
}
