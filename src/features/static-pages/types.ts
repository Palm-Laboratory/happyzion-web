import type { ReactNode } from "react";

export type StaticPageKey =
  | "about.greeting"
  | "about.church-story"
  | "about.revival-organization"
  | "about.service-times"
  | "about.location"
  | "about.mission-history"
  | "about.online-giving"
  | "discipleship.guide"
  | "discipleship.care"
  | "discipleship.training";

export type StaticPageComponent = () => ReactNode;
