import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const editorPath = path.join(here, "_components", "use-mission-history-editor.ts");
const adminApiPath = path.join(here, "..", "..", "..", "..", "..", "lib", "admin-mission-history-api.ts");
const batchRoutePath = path.join(here, "..", "..", "..", "..", "..", "app", "api", "admin", "mission-history", "batch", "route.ts");

test("mission history editor saves existing multi-year changes through one transactional batch route", async () => {
  const editor = await readFile(editorPath, "utf8");
  const adminApi = await readFile(adminApiPath, "utf8");
  const batchRoute = await readFile(batchRoutePath, "utf8");

  assert.match(editor, /saveMissionHistoryBatchRequest/, "Expected editor saves to call the batch helper.");
  assert.match(editor, /fetch\(["']\/api\/admin\/mission-history\/batch["']/, "Expected editor to call the local batch route.");
  assert.doesNotMatch(editor, /Promise\.all\([^)]*updateMissionYearRequest/s, "Expected no parallel per-year PUT saves.");
  assert.match(
    editor,
    /batchDrafts[\s\S]{0,260}validateMissionYearDraft/,
    "Expected every draft in the batch to be client-validated before the transactional save.",
  );
  assert.match(
    editor,
    /setSelectedId\(invalidBatchDraft\.batchDraft\.id\)/,
    "Expected invalid off-screen working copies to be selected so their field errors are visible.",
  );
  assert.match(
    adminApi,
    /\/api\/v1\/admin\/mission-history\/batch/,
    "Expected the local route to proxy to the backend transactional batch API.",
  );
  assert.match(batchRoute, /revalidateTag\(["']mission-history["']\)/, "Expected batch saves to invalidate mission history cache.");
});
