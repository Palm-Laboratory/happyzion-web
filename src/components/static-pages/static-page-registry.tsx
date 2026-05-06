import type { ReactNode } from "react";

function GreetingStaticPage() {
  return <section className="min-h-[520px] bg-white" />;
}

function ServiceTimesStaticPage() {
  return <section className="min-h-[520px] bg-white" />;
}

function LocationStaticPage() {
  return <section className="min-h-[520px] bg-white" />;
}

function HistoryStaticPage() {
  return <section className="min-h-[520px] bg-white" />;
}

function OnlineGivingStaticPage() {
  return <section className="min-h-[520px] bg-white" />;
}

const STATIC_PAGE_COMPONENTS: Record<string, () => ReactNode> = {
  "about.greeting": GreetingStaticPage,
  "about.service-times": ServiceTimesStaticPage,
  "about.location": LocationStaticPage,
  "about.history": HistoryStaticPage,
  "about.online-giving": OnlineGivingStaticPage,
};

export function renderStaticPage(staticPageKey: string): ReactNode | null {
  const StaticPage = STATIC_PAGE_COMPONENTS[staticPageKey];

  return StaticPage ? <StaticPage /> : null;
}
