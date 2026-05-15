import { z } from "zod";
import type { InvalidEntryFields, MissionYear } from "./mission-history-types";

export const missionYearDraftSchema = z.object({
  year: z.string().trim().min(1).regex(/^[0-9~-]+$/),
  caption: z.string().trim().min(1),
  tone: z.enum(["gold", "red"]).nullable(),
  entries: z.array(
    z.object({
      id: z.string(),
      month: z.string(),
      place: z.string().trim().min(1),
      isFirst: z.boolean(),
    }),
  ).min(1),
});

export function validateMissionYearDraft(draft: MissionYear): {
  invalidFields: Set<string>;
  invalidEntryFields: InvalidEntryFields;
  valid: boolean;
} {
  const result = missionYearDraftSchema.safeParse(draft);
  const invalidFields = new Set<string>();
  const invalidEntryFields: InvalidEntryFields = new Map();

  if (!result.success) {
    for (const issue of result.error.issues) {
      const [firstPath, entryIndex, entryField] = issue.path;

      if (firstPath === "entries" && typeof entryIndex === "number" && typeof entryField === "string") {
        const entry = draft.entries[entryIndex];
        if (!entry) continue;
        const fields = invalidEntryFields.get(entry.id) ?? new Set<string>();
        fields.add(entryField);
        invalidEntryFields.set(entry.id, fields);
        continue;
      }

      if (typeof firstPath === "string") {
        invalidFields.add(firstPath);
      }
    }
  }

  return {
    invalidFields,
    invalidEntryFields,
    valid: invalidFields.size === 0 && invalidEntryFields.size === 0,
  };
}
