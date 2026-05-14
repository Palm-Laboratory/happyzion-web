import "server-only";

import { serverFetchJson } from "@/lib/server-fetch";

export interface PublicMissionEntry {
  id: number;
  month: string | null;
  place: string;
  isFirst: boolean;
}

export interface PublicMissionYear {
  id: number;
  year: string;
  caption: string;
  tone: "gold" | "red" | null;
  entries: PublicMissionEntry[];
}

export async function getPublicMissionHistory(): Promise<PublicMissionYear[]> {
  const data = await serverFetchJson<{ years: PublicMissionYear[] }>(
    "/api/v1/public/mission-history",
    { next: { revalidate: 60, tags: ["mission-history"] } },
  );
  return data.years;
}
