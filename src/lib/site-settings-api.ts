import "server-only";

import { serverFetchJson } from "@/lib/server-fetch";

export interface MainVideoSetting {
  videoUrl: string;
}

export async function getPublicMainVideoSetting(): Promise<MainVideoSetting> {
  return serverFetchJson<MainVideoSetting>("/api/v1/public/site/main-video", {
    next: {
      revalidate: 300,
      tags: ["site-settings"],
    },
  });
}
