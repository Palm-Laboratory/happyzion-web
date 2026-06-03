import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(here, "page.tsx");
const clientPath = path.join(here, "_components", "member-list-client.tsx");
const apiPath = path.join(here, "..", "..", "..", "..", "..", "lib", "admin-members-api.ts");

test("member list search preserves includeInactive from checkbox to API query", async () => {
  const page = await readFile(pagePath, "utf8");
  const client = await readFile(clientPath, "utf8");
  const api = await readFile(apiPath, "utf8");

  assert.match(page, /sp\.includeInactive === "true"/, "Expected page query parser to read includeInactive=true.");
  assert.match(
    client,
    /if \(includeInactiveInput\) params\.set\("includeInactive", "true"\)/,
    "Expected search button to write includeInactive=true from the checkbox.",
  );
  assert.match(
    api,
    /if \(q\.includeInactive\) params\.set\("includeInactive", "true"\)/,
    "Expected API client to forward includeInactive=true to backend.",
  );
});

test("member list pagination renders visible page numbers", async () => {
  const client = await readFile(clientPath, "utf8");

  assert.match(client, /getVisiblePageItems/, "Expected pagination to calculate visible page buttons.");
  assert.match(client, /Math\.ceil\(data\.total \/ query\.size\)/, "Expected pagination to use total count.");
  assert.match(client, /aria-current=\{isCurrent \? "page" : undefined\}/, "Expected current page to be marked.");
  assert.match(client, /총 \{data\.total\.toLocaleString\("ko-KR"\)\}명/, "Expected total count to be visible.");
});
