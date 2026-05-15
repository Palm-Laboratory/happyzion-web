export type MissionTone = "gold" | "red" | null;

export type MissionEntry = {
  id: string;
  month: string;
  place: string;
  isFirst: boolean;
};

export type MissionYear = {
  id: string;
  year: string;
  caption: string;
  tone: MissionTone;
  entries: MissionEntry[];
};

export interface ServerEntry {
  id: number;
  month?: string | null;
  place: string;
  isFirst: boolean;
  sortOrder: number;
}

export interface ServerYear {
  id: number;
  year: string;
  caption: string;
  tone?: string | null;
  sortOrder: number;
  entries: ServerEntry[];
}

export type InvalidEntryFields = Map<string, Set<string>>;
