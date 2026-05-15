import "server-only";

import { serverFetchJson } from "@/lib/server-fetch";
import type { components } from "@/types/api";

export type PublicMissionEntry = components["schemas"]["MissionPublicEntryResponse"];
export type PublicMissionYear = components["schemas"]["MissionPublicYearResponse"];

export async function getPublicMissionHistory(): Promise<PublicMissionYear[]> {
  const data = await serverFetchJson<components["schemas"]["MissionPublicListYearsResponse"]>(
    "/api/v1/public/mission-history",
    { next: { revalidate: 60, tags: ["mission-history"] } },
  );
  return data.years;
}
