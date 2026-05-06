import { redirect } from "next/navigation";
import { getCanonicalStaticPath } from "@/lib/canonical-menu-path";
import { getNavigationGroupByKey } from "@/lib/navigation-api";

export default async function AboutPage() {
  // 관리자 메뉴의 about GNB를 찾음
  // 있으면 group.defaultLandingHref로 redirect
  const group = await getNavigationGroupByKey("about");

  // 없으면 getCanonicalStaticPath("about.greeting")으로 about.greeting 에 연결된 실제 경로 찾음
  // 그것도 없으면 / 로 redirect
  const fallback = (await getCanonicalStaticPath("about.greeting")) ?? "/";

  redirect(group?.defaultLandingHref ?? fallback);
}
