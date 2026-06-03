import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const actionsPath = path.join(here, "actions.ts");
const managerPath = path.join(here, "_components", "enrollment-manager.tsx");

test("education enrollment add flow keeps the persisted enrollment id", async () => {
  const actions = await readFile(actionsPath, "utf8");
  const manager = await readFile(managerPath, "utf8");

  assert.match(
    actions,
    /const enrollment = await addEnrollment\(courseId, payload\)/,
    "Expected add action to keep the API-created enrollment.",
  );
  assert.match(
    actions,
    /return \{ success: true, enrollment \}/,
    "Expected add action to return the persisted enrollment to the client.",
  );
  assert.match(
    manager,
    /onAdded\(result\.enrollment\)/,
    "Expected UI state to use the persisted enrollment returned by the server action.",
  );
  assert.doesNotMatch(manager, /id:\s*Date\.now\(\)/, "Expected no fake enrollment id in local UI state.");
});

test("education course actions validate date range before the API call", async () => {
  const actions = await readFile(actionsPath, "utf8");

  assert.match(actions, /hasInvalidDateRange\(startDate, endDate\)/, "Expected a date range guard.");
  assert.match(
    actions,
    /종료일은 시작일보다 빠를 수 없습니다\./,
    "Expected a user-facing date range validation message.",
  );
});
