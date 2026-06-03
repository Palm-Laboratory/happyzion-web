import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const actionsPath = path.join(here, "actions.ts");
const managerPath = path.join(here, "_components", "participant-manager.tsx");

test("mission participant add flow keeps the persisted participant id", async () => {
  const actions = await readFile(actionsPath, "utf8");
  const manager = await readFile(managerPath, "utf8");

  assert.match(
    actions,
    /const participant = await addMissionParticipant\(tripId, payload\)/,
    "Expected add action to keep the API-created participant.",
  );
  assert.match(
    actions,
    /return \{ success: true, participant \}/,
    "Expected add action to return the persisted participant to the client.",
  );
  assert.match(
    manager,
    /onAdded\(result\.participant\)/,
    "Expected UI state to use the persisted participant returned by the server action.",
  );
  assert.doesNotMatch(manager, /id:\s*Date\.now\(\)/, "Expected no fake participant id in local UI state.");
});

test("mission trip actions validate date range before the API call", async () => {
  const actions = await readFile(actionsPath, "utf8");

  assert.match(actions, /hasInvalidDateRange\(startDate, endDate\)/, "Expected a date range guard.");
  assert.match(
    actions,
    /도착일은 출발일보다 빠를 수 없습니다\./,
    "Expected a user-facing date range validation message.",
  );
});
