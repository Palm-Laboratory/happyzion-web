"use client";

import ErrorPage from "@/components/error-page";

export default function RootError({ reset }: { reset: () => void }) {
  return <ErrorPage kind="server" minHeightClassName="min-h-screen" onRetry={reset} />;
}
