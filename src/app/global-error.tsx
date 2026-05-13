"use client";

import ErrorPage from "@/components/error-page";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="ko">
      <body>
        <ErrorPage kind="server" minHeightClassName="min-h-screen" onRetry={reset} />
      </body>
    </html>
  );
}
