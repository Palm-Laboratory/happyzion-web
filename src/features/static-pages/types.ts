import type { ReactNode } from "react";

export type StaticPageKey =
  | "about.greeting"
  | "about.service-times"
  | "about.location"
  | "about.history"
  | "about.online-giving";

export type StaticPageComponent = () => ReactNode;
