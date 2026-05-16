"use client";

import ErrorPage from "@/components/error-page";

export default function BoardError({ reset }: { reset: () => void }) {
  return <ErrorPage kind="server" onRetry={reset} />;
}
