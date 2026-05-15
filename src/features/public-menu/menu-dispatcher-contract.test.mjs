import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dispatcherPath = path.join(here, "menu-dispatcher.tsx");

async function readDispatcher() {
  return readFile(dispatcherPath, "utf8");
}

test("menu dispatcher recognizes explicit board post detail URLs before menu resolution fallback", async () => {
  const contents = await readDispatcher();

  assert.match(
    contents,
    /segments\.at\(-2\)\s*={2,3}\s*["']posts["']|segments\[[^\]]+\.length\s*-\s*2\]\s*={2,3}\s*["']posts["']/,
    "Expected dispatcher to detect /posts/{postId} as an explicit board detail route.",
  );
  assert.match(
    contents,
    /slice\(0,\s*-2\)\.join\(["']\/["']\)/,
    "Expected dispatcher to derive the board path by stripping /posts/{postId}.",
  );
  assert.doesNotMatch(
    contents,
    /if\s*\(!resolved\)\s*{\s*return\s+renderBoardDetailPage\(path\)/,
    "Expected detail routing not to rely only on resolvePublicMenuPath failing for /{boardPath}/{postId}.",
  );
});
