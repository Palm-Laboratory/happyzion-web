import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const hookPath = path.join(here, "use-link-popover.ts");
const popoverPath = path.join(here, "link-popover.tsx");

async function readHook() {
  return readFile(hookPath, "utf8");
}

async function readPopover() {
  return readFile(popoverPath, "utf8");
}

test("link popover normalizes manual href input before saving or opening links", async () => {
  const contents = await readHook();

  assert.match(contents, /normalizeLinkHref/, "Expected manual link input to use the shared href normalizer.");
  assert.match(contents, /setLink\(\{\s*href\s*\}\)/, "Expected saved Tiptap link marks to receive normalized hrefs.");
  assert.match(
    contents,
    /sanitizeUrl\(\s*normalizeLinkHref\(url\)/,
    "Expected the open-link preview action to sanitize the normalized URL.",
  );
  assert.doesNotMatch(
    contents,
    /setLink\(\{\s*href:\s*url\s*\}\)/,
    "Expected manual link insertion not to store raw scheme-less URL input.",
  );
});

test("link popover does not immediately reopen after applying or manually closing a link", async () => {
  const contents = await readPopover();

  assert.match(contents, /useRef/, "Expected popover state to track manual close suppression.");
  assert.match(
    contents,
    /suppressAutoOpenRef\.current\s*=\s*true[\s\S]{0,80}setIsOpen\(false\)/,
    "Expected applying a link to suppress link-active auto-open before closing.",
  );
  assert.match(
    contents,
    /autoOpenOnLinkActive\s*&&\s*!suppressAutoOpenRef\.current/,
    "Expected link-active auto-open to respect the manual close suppression flag.",
  );
  assert.match(
    contents,
    /if\s*\(!isActive\)\s*\{[\s\S]{0,80}suppressAutoOpenRef\.current\s*=\s*false/,
    "Expected suppression to reset after the editor selection leaves a link.",
  );
});
