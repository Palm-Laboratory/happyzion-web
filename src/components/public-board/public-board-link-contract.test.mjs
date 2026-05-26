import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const rendererPath = path.join(here, "public-board-renderer.tsx");

async function readRenderer() {
  return readFile(rendererPath, "utf8");
}

test("public board renderer upgrades legacy scheme-less domain links", async () => {
  const contents = await readRenderer();

  assert.match(
    contents,
    /normalizeLinkHref/,
    "Expected public board links to normalize domain-like hrefs such as tdch.co.kr.",
  );
  assert.match(
    contents,
    /url\.protocol[\s\S]{0,140}url\.href/,
    "Expected normalized public links to render as absolute href values.",
  );
});
