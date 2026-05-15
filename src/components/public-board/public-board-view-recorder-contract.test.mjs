import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const recorderPath = path.join(here, "public-board-view-recorder.tsx");

async function readRecorder() {
  return readFile(recorderPath, "utf8");
}

test("public board view recorder deduplicates Strict Mode remounts in development", async () => {
  const contents = await readRecorder();

  assert.match(
    contents,
    /const\s+recentViewRecordAttempts\s*=\s*new\s+Map\s*</,
    "Expected a module-level Map so React Strict Mode remounts share the dedup state.",
  );
  assert.match(
    contents,
    /VIEW_RECORDING_DEDUP_TTL_MS\s*=\s*30_000/,
    "Expected a short 30 second dedup TTL.",
  );
  assert.match(
    contents,
    /process\.env\.NODE_ENV\s*!==\s*["']development["'][\s\S]*return\s+true/,
    "Expected production to keep recording attempts unchanged.",
  );
  assert.match(
    contents,
    /`\$\{boardKey\}:\$\{postId\}:\$\{menuId\}`/,
    "Expected the dedup key to include boardKey, postId, and menuId.",
  );
  assert.match(
    contents,
    /if\s*\(\s*!shouldRecordView\s*\(\s*boardKey\s*,\s*postId\s*,\s*menuId\s*\)\s*\)\s*{\s*return;\s*}/s,
    "Expected duplicate development effects to return before POSTing the view endpoint.",
  );
  assert.doesNotMatch(
    contents,
    /useRef\s*</,
    "Expected not to use useRef because Strict Mode remount creates a fresh component instance.",
  );
});
