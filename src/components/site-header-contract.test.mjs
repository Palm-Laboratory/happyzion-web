import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const sourcePath = new URL("./site-header.tsx", import.meta.url);

test("site header keeps home tone for the root public layout", async () => {
  const contents = await readFile(sourcePath, "utf8");

  assert.match(
    contents,
    /useSelectedLayoutSegments/,
    "Expected SiteHeader to use layout segments as a root-route signal.",
  );
  assert.match(
    contents,
    /selectedLayoutSegments\.length\s*===\s*0/,
    "Expected root public route to keep the home header tone.",
  );
});

test("site header normalizes trailing slashes before route tone checks", async () => {
  const contents = await readFile(sourcePath, "utf8");

  assert.match(
    contents,
    /function\s+normalizePathname/,
    "Expected SiteHeader to normalize pathname values before comparing routes.",
  );
  assert.match(
    contents,
    /\.replace\(\s*\/\\\/\+\$\/\s*,\s*""\s*\)/,
    "Expected SiteHeader to strip trailing slashes before comparing routes.",
  );
});
