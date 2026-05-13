import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const routePath = path.join(here, "route.ts");

async function readRoute() {
  return readFile(routePath, "utf8");
}

test("admin main-video route does not expose manual URL update over PUT", async () => {
  const contents = await readRoute();

  assert.doesNotMatch(contents, /export\s+async\s+function\s+PUT\s*\(/, "Expected no PUT route handler.");
  assert.doesNotMatch(
    contents,
    /\bupdateAdminMainVideoSetting\b/,
    "Expected route handler to avoid manual main video URL update helper.",
  );
  assert.doesNotMatch(contents, /request\.json\s*\(/, "Expected main video route to avoid JSON update payloads.");
});

test("admin main-video route does not proxy multipart upload over POST", async () => {
  const contents = await readRoute();

  assert.doesNotMatch(contents, /export\s+async\s+function\s+POST\s*\(/, "Expected direct backend upload instead of a Next POST proxy.");
  assert.doesNotMatch(contents, /request\.formData\s*\(/, "Expected main video route not to buffer multipart formData().");
  assert.doesNotMatch(contents, /\buploadAdminMainVideoSetting\s*\(/, "Expected route handler not to proxy file uploads.");
});
