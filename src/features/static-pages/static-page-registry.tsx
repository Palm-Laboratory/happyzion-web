import GreetingStaticPage from "@/features/static-pages/about/pages/greeting-page";
import ChurchStoryStaticPage from "@/features/static-pages/about/pages/church-story";
import LocationStaticPage from "@/features/static-pages/about/pages/location-page";
import MissionHistoryStaticPage from "@/features/static-pages/about/pages/mission-history-page";
import OnlineGivingStaticPage from "@/features/static-pages/about/pages/online-giving-page";
import ServiceTimesStaticPage from "@/features/static-pages/about/pages/service-times-page";
import DiscipleshipCareStaticPage from "@/features/static-pages/discipleship/pages/care";
import DiscipleshipGuideStaticPage from "@/features/static-pages/discipleship/pages/guide";
import DiscipleshipTrainingStaticPage from "@/features/static-pages/discipleship/pages/training";
import type { StaticPageComponent, StaticPageKey } from "@/features/static-pages/types";
import RevivalOrganizationStaticPage from "./about/pages/revival-organization";

// Component registry — each file route in (static)/ imports the component directly.
// This table exists as a single source of truth for all registered static pages.
export const STATIC_PAGE_COMPONENTS: Record<StaticPageKey, StaticPageComponent> = {
  "about.greeting": GreetingStaticPage,
  "about.church-story": ChurchStoryStaticPage,
  "about.revival-organization": RevivalOrganizationStaticPage,
  "about.service-times": ServiceTimesStaticPage,
  "about.location": LocationStaticPage,
  "about.mission-history": MissionHistoryStaticPage,
  "about.online-giving": OnlineGivingStaticPage,
  "discipleship.guide": DiscipleshipGuideStaticPage,
  "discipleship.care": DiscipleshipCareStaticPage,
  "discipleship.training": DiscipleshipTrainingStaticPage,
};
