import type { ReactNode } from "react";

export type StaticPageKey =
  | "about.greeting"
  | "about.church-story"
  | "about.service-times"
  | "about.location"
  | "about.mission-history"
  | "about.online-giving";

export type StaticPageComponent = () => ReactNode;
