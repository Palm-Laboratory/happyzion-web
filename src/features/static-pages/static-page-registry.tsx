import GreetingStaticPage from "@/features/static-pages/pages/greeting-page";
import ChurchStoryStaticPage from "@/features/static-pages/pages/church-story";
import LocationStaticPage from "@/features/static-pages/pages/location-page";
import MissionHistoryStaticPage from "@/features/static-pages/pages/mission-history-page";
import OnlineGivingStaticPage from "@/features/static-pages/pages/online-giving-page";
import ServiceTimesStaticPage from "@/features/static-pages/pages/service-times-page";
import type { StaticPageComponent, StaticPageKey } from "@/features/static-pages/types";
import RevivalOrganizationStaticPage from "./pages/revival-organization";

const STATIC_PAGE_COMPONENTS: Record<StaticPageKey, StaticPageComponent> = {
  "about.greeting": GreetingStaticPage,
  "about.church-story": ChurchStoryStaticPage,
  "about.revival-organization": RevivalOrganizationStaticPage,
  "about.service-times": ServiceTimesStaticPage,
  "about.location": LocationStaticPage,
  "about.mission-history": MissionHistoryStaticPage,
  "about.online-giving": OnlineGivingStaticPage,
};

function isStaticPageKey(value: string): value is StaticPageKey {
  return value in STATIC_PAGE_COMPONENTS;
}

export function renderStaticPage(staticPageKey: string) {
  if (!isStaticPageKey(staticPageKey)) {
    return null;
  }

  const StaticPage = STATIC_PAGE_COMPONENTS[staticPageKey];

  return <StaticPage />;
}
