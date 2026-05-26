import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const syncClientPath = path.join(here, "_components", "video-sync-client.tsx");

test("video sync playlist visibility uses the menu-management style switch", async () => {
  const contents = await readFile(syncClientPath, "utf8");

  assert.match(contents, /role="switch"/, "Expected playlist visibility to render as an accessible switch.");
  assert.match(contents, /aria-checked=\{isStatusSwitchOn\}/, "Expected switch checked state to follow published status.");
  assert.match(contents, /status:\s*isStatusSwitchOn\s*\?\s*["']HIDDEN["']\s*:\s*["']PUBLISHED["']/, "Expected the switch to toggle hidden and published statuses.");
  assert.match(contents, /playlist\.status\s*===\s*["']ARCHIVED["']/, "Expected archived playlists to disable the switch.");
  assert.match(contents, /playlist\.syncStatus\s*===\s*["']REMOVED["']/, "Expected removed playlists to disable publishing.");
  assert.doesNotMatch(contents, />\s*공개\s*<\/button>[\s\S]{0,400}>\s*숨김\s*<\/button>/, "Expected separate public/hidden quick-action buttons to be removed.");
});
