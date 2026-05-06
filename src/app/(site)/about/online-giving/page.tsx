import { assertCanonicalStaticPage } from "@/lib/canonical-menu-path";

export default async function OnlineGivingPage() {
  await assertCanonicalStaticPage("about.online-giving", "/about/online-giving");

  return <section className="min-h-[520px] bg-white" />;
}
